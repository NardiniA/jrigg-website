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
  async redirects() {
    return [
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/delivery",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/currentjobs",
        destination: "/current-projects",
        permanent: true,
      },
      {
        source: "/projects",
        destination: "/gallery",
        permanent: true,
      },
      {
        source: "/project/stanton",
        destination: "/gallery/stanton",
        permanent: true,
      },
      {
        source: "/project/broadway",
        destination: "/gallery",
        permanent: true,
      },
      {
        source: "/project/willersey",
        destination: "/gallery",
        permanent: true,
      },
      {
        source: "/project/chastleton",
        destination: "/gallery/chastleton",
        permanent: true,
      },
      {
        source: "/project/dumbleton",
        destination: "/gallery",
        permanent: true,
      },
      {
        source: "/project/pershore",
        destination: "/gallery/pershore",
        permanent: true,
      },
      {
        source: "/currentjobs/pershore",
        destination: "/gallery/pershore",
        permanent: true,
      },
      {
        source: "/project/monmouth",
        destination: "/gallery",
        permanent: true,
      },
      {
        source: "/project/winchcombe",
        destination: "/gallery/winchcombe",
        permanent: true,
      }, 
      {
        source: "/currentjobs/winchcombe",
        destination: "/gallery/winchcombe",
        permanent: true,
      },
      {
        source: "/project/chipping-campden",
        destination: "/gallery/chipping-campden",
        permanent: true,
      },
      {
        source: "/currentjobs/chipping-campden",
        destination: "/gallery/chipping-campden",
        permanent: true,
      },
      {
        source: "/project/heythrop-2",
        destination: "/gallery",
        permanent: true,
      },
      {
        source: "/project/chipping-norton",
        destination: "/gallery/chipping-norton",
        permanent: true,
      },
      {
        source: "/project/moreton-in-marsh",
        destination: "/gallery",
        permanent: true,
      },
    ];
  }
}

module.exports = nextConfig
