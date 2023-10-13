/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/loader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cloudfront.net",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/applications",
        destination: `${process.env.PAYLOAD_SERVER_URL}/api/applications`,
      },
      {
        source: "/api/form-submissions",
        destination: `${process.env.PAYLOAD_SERVER_URL}/api/form-submissions`,
      },
    ];
  },
}

module.exports = nextConfig
