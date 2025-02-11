/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  //basePath:'/showcase-site', //Don't need this for Vercel deployment
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.discogs.com",
        port: "",
        pathname: "/**",
      },
    ],
    domains: ["img.discogs.com", "st.discogs.com"],
  },
  env: {
    BASE_URL: process.env.BASE_URL || "http://localhost:3000", // Fallback to localhost if not set
    DISCOG_TOKEN: process.env.DISCOG_TOKEN, // Use local environment variable or fallback
    USER: process.env.USER || "DrFrappuccino", // Default to "DrFrappuccino" for local testing
  },
};

export default nextConfig;
