const withOptimizedImages = require("next-optimized-images");

/** @type {import('next').NextConfig} */
const nextConfig = withOptimizedImages({
  handleImages: ["*"],

  reactStrictMode: true,
  swcMinify: true,
});

module.exports = nextConfig;
