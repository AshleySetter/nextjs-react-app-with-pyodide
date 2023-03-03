// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: "/users",
          destination: "https://reqres.in/api/users",
        },
      ];
    },
  };
module.exports = nextConfig;