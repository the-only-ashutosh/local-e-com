import { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.pexels.com" },
      { hostname: "idoxd8d.sufydely.com" },
    ],
  },
};

module.exports = nextConfig;
