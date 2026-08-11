import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.34"],
  output: "export",
  basePath: "/my-portfolio",
  images: { unoptimized: true },
};

export default nextConfig;
