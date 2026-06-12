import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "*.devtunnels.ms"],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ansperazeazzjpjmzwtt.supabase.co',
      },
    ],
  },
};

export default nextConfig;
