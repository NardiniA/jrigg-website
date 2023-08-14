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
        source: "/api/applicaitons",
        destination: `${process.env.PAYLOAD_SERVER_URL}/api/applications`,
      },
    ];
  },
}

module.exports = nextConfig
