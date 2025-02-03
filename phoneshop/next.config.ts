import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Skips ESLint checks during build
  },
  typescript: {
    ignoreBuildErrors: true, // Skips TypeScript errors
  },
};

export default nextConfig;
