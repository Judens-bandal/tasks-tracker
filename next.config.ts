import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // allowedDevOrigins: ["192.168.20.8"],
  allowedDevOrigins: ["192.168.20.8", "http://192.168.20.8:3000"], // [CHANGED] added full origin

  reactCompiler: true,
  turbopack: {},

  experimental: {
    serverActions: {
      allowedOrigins: ["192.168.20.8:3000"],
    },
  },
};

export default nextConfig;
