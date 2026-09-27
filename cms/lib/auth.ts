import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { allowedEmails, isWhitelisted } from "./whitelist";

/**
 * Very small in-memory brute-force guard for the credentials login form.
 *
 * This only protects a single running instance — on serverless hosts with
 * multiple concurrent instances it won't share state across them. It's a
 * cheap first line of defense, not a substitute for a shared store
 * (Redis/Upstash) or a rate limit at the edge/WAF if you need real
 * guarantees at scale.
 */
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const failedAttempts = new Map<string, { count: number; firstAttemptAt: number }>();

function isLockedOut(key: string): boolean {
  const entry = failedAttempts.get(key);
  if (!entry) return false;
  if (Date.now() - entry.firstAttemptAt > WINDOW_MS) {
    failedAttempts.delete(key);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

function recordFailure(key: string) {
  const entry = failedAttempts.get(key);
  if (!entry || Date.now() - entry.firstAttemptAt > WINDOW_MS) {
    failedAttempts.set(key, { count: 1, firstAttemptAt: Date.now() });
  } else {
    entry.count += 1;
  }
}

function recordSuccess(key: string) {
  failedAttempts.delete(key);
}

// Only register the GitHub provider if it's actually configured — with the
// old `!` non-null assertions, a missing GITHUB_ID/GITHUB_SECRET would throw
// at import time and take down auth (and therefore the whole admin) even
// for sites that only want email/password login.
const providers = [];

if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
  providers.push(
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  );
}

providers.push(
  Credentials({
    name: "Email and password",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) return null;

      const email = String(credentials.email).toLowerCase().trim();

      if (isLockedOut(email)) {
        throw new Error(
          "Too many failed attempts. Please wait a few minutes and try again."
        );
      }

      const { verifyAdminCredentials } = await import("./admins");
      // Already validated against the "admins" collection - if this
      // returns null, NextAuth rejects the sign-in.
      const user = await verifyAdminCredentials(email, String(credentials.password));

      if (!user) {
        recordFailure(email);
        return null;
      }

      recordSuccess(email);
      return user;
    },
  })
);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,

  pages: {
    signIn: "/admin/login",
  },

  session: { strategy: "jwt" },

  callbacks: {
    // Runs for EVERY provider, including GitHub.
    async signIn({ user, account }) {
      if (!user.email) return false;

      // Optional hard allowlist — see lib/whitelist.ts. Skipped entirely
      // when ALLOWED_ADMIN_EMAILS isn't set.
      if (allowedEmails.length > 0 && !isWhitelisted(user.email)) {
        return false;
      }

      if (account?.provider === "github") {
        const {
          findAdminByEmail,
          countAdmins,
          createAdminEmailOnly,
          claimFirstAdminSetup,
          releaseFirstAdminSetup,
        } = await import("./admins");
        const existing = await findAdminByEmail(user.email);
        if (existing) return true;

        // Bootstrap: nobody has ever signed in - the first person through
        // the door (GitHub or the register form) becomes the first admin.
        // Uses the same claim/release lock as the /admin/register form so
        // two people racing to sign in first can't both slip through the
        // countAdmins() === 0 check and both end up as the first admin.
        const total = await countAdmins();
        if (total === 0) {
          const claimed = await claimFirstAdminSetup();
          if (!claimed) return false; // someone else is bootstrapping right now

          try {
            const recheck = await countAdmins();
            if (recheck > 0) return false; // lost the race, registration is closed
            await createAdminEmailOnly(user.email, user.name ?? undefined);
            return true;
          } finally {
            await releaseFirstAdminSetup();
          }
        }

        return false; // not an existing user, and registration is closed
      }

      // Credentials provider already checked the "admins" collection in
      // authorize() above - if we got a user object back, it's legitimate.
      return true;
    },
  },
});
