/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.discogs.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    DISCOG_TOKEN: process.env.DISCOG_TOKEN,
    USER: process.env.USER,
  },
};

module.exports = nextConfig;