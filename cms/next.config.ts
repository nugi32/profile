import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't advertise "Next.js" (and implicitly its version) to every client
  // via the X-Powered-By response header — minor info-disclosure hardening.
  poweredByHeader: false,
};

export default nextConfig;
