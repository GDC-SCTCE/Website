import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "*.vercel.app","*.devtunnels.ms"],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'inryqnniponjlvypumkw.supabase.co',
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https://inryqnniponjlvypumkw.supabase.co; connect-src 'self' https://inryqnniponjlvypumkw.supabase.co wss://inryqnniponjlvypumkw.supabase.co;"
          }
        ]
      }
    ];
  },
};

export default nextConfig;
