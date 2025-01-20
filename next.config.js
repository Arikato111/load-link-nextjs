/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/api/main",
      },
    ];
  },
  reactStrictMode: true,
  eslint: {
    dirs: ["./pages", "./components", "./backend"],
  },
};

module.exports = nextConfig;
