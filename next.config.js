/** @type {import('next').NextConfig} */
// const withPlugins = require("next-compose-plugins");
// const withImages = require("next-images");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "raw.githubusercontent.com",
      "archives.bulbagarden.net",
      "eskipaper.com",
      "image.pngaaa.com",
    ],
  },
};

module.exports = nextConfig;
// export default nextConfig;
