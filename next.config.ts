import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.20.8"],
  reactCompiler: true,
  turbopack: {},
};

export default nextConfig;
