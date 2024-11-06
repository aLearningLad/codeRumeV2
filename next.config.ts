import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
};

export default nextConfig;
