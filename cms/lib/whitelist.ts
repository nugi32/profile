/**
 * Optional extra allowlist. If ALLOWED_ADMIN_EMAILS is set, ONLY those
 * emails may sign in to /admin — whether they come through the
 * email/password form or GitHub OAuth. Both providers are checked against
 * this in lib/auth.ts's `signIn` callback.
 *
 * If it's left unset (the default), this check is skipped entirely and
 * access control falls back to the "admins" collection alone (i.e. someone
 * must already have an admin account, or be the very first person to sign
 * in). Set this env var if you want a hard allowlist on top of that.
 */
const raw = process.env.ALLOWED_ADMIN_EMAILS || "";

export const allowedEmails = raw
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export function isWhitelisted(email?: string | null): boolean {
  if (!email) return false;
  return allowedEmails.includes(email.toLowerCase());
}
