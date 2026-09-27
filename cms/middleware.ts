import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Security headers, applied to every response.
 *
 * The Content-Security-Policy uses a per-request nonce for scripts instead
 * of 'unsafe-inline', so the one inline <script> we ship (the theme-flash
 * guard in app/layout.tsx) still runs, but any script injected some other
 * way will not.
 *
 * DEV vs PROD
 * In development React reconstructs call stacks with eval(), and Next's
 * HMR talks over a websocket. A strict production CSP blocks both, which
 * surfaces as: "eval() is not supported in this environment ... make sure
 * that `unsafe-eval` is included". So in dev — and ONLY in dev — we allow
 * 'unsafe-eval' and ws:. Production keeps the strict policy (React never
 * uses eval() in production mode).
 */
function buildCsp(nonce: string): string {
  const directives = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'", // next/font injects inline @font-face <style> tags
    "img-src 'self' data: blob: https:", // images can live on Vercel Blob / any https host
    "font-src 'self' data:",
    `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ];
  // Forcing https on http://localhost breaks dev asset loading.
  if (!isDev) directives.push("upgrade-insecure-requests");
  return directives.join("; ");
}

function applySecurityHeaders(response: NextResponse, nonce: string) {
  response.headers.set("Content-Security-Policy", buildCsp(nonce));
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  );
  // Only has effect over HTTPS (production); harmless over local HTTP dev.
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  return response;
}

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const nonce = crypto.randomUUID().replace(/-/g, "");

  // Forward the nonce to Server Components via a request header so
  // app/layout.tsx can stamp its inline script with it.
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-nonce", nonce);

  const isPublicAdminPage =
    pathname === "/admin/login" || pathname === "/admin/register";

  if (pathname.startsWith("/admin") && !isPublicAdminPage && !req.auth) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return applySecurityHeaders(NextResponse.redirect(loginUrl), nonce);
  }

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  return applySecurityHeaders(response, nonce);
});

export const config = {
  // Run on every route so every response gets the security headers above;
  // the admin-auth redirect only fires for /admin paths.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
