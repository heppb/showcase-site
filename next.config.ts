/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath:'/showcase-site',
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
    BASE_URL: process.env.BASE_URL || "http://localhost:3000", // Fallback to localhost if not set
    DISCOG_TOKEN: process.env.DISCOG_TOKEN, // Use local environment variable or fallback
    USER: process.env.USER || "DrFrappuccino", // Default to "DrFrappuccino" for local testing
  },
};

export default nextConfig;
