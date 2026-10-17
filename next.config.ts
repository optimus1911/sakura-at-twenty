
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/sakura-at-twenty",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
