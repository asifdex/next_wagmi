/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://*.pages.dev https://secure-mobile.walletconnect.com https://*.ngrok-free.app;"
          }
        ]
      }
    ];
  },
};

export default nextConfig;
