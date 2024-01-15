/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
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
