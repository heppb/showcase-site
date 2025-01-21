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
  async headers() {
    return [
      {
        // Match all routes
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'none'; 
              style-src 'unsafe-inline'; 
              img-src 'self' data: https://i.discogs.com; 
              connect-src 'self' https://api.discogs.com; 
              script-src 'self';
            `.replace(/\n/g, ""), // Minimize whitespace
          },
        ],
      },
    ];
  },
  env: {
    BASE_URL: process.env.BASE_URL || "http://localhost:3000", // Fallback to localhost if not set
    DISCOG_TOKEN: process.env.DISCOG_TOKEN, // Use local environment variable or fallback
    USER: process.env.USER || "DrFrappuccino", // Default to "DrFrappuccino" for local testing
  },
};

export default nextConfig;
