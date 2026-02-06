import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  typescript: {
    ignoreBuildErrors: true,
  },

  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 2,
  },

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
