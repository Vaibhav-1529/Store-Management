import type { NextConfig } from "next";
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",   // 👈 recommended, otherwise type error
        hostname: "**",
      },
    ],
  },

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }
    return config;
  },
};

export default nextConfig;
