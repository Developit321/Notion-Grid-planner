/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow embedding in iframes (for Notion embed)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL",
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors *",
          },
        ],
      },
    ];
  },
  // Allow images from Notion's S3 storage and other common sources
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "**.notion.so",
      },
      {
        protocol: "https",
        hostname: "notion.so",
      },
      {
        protocol: "https",
        hostname: "**.unsplash.com",
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
