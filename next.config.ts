import { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "images.pexels.com" }],
  },
};

module.exports = nextConfig;
