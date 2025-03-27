/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.luongtuan.xyz",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};
module.exports = nextConfig;
