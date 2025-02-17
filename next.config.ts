import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  /* config options here */
  async headers() {
    return [
      {
        source: "/api/socket",
        headers: [
          {
            key: "Connection",
            value: "Upgrade",
          },
        ],
      },
    ];
  },
  images: {
    domains: ["img.clerk.com"], // Add allowed domains here
  },
};

export default nextConfig;
