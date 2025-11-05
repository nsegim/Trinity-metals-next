import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

   //i18n, // 👈 Important — pass i18n to Next.js config
   reactStrictMode: true,
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'contents.trinity-metals.com',
        pathname: '/**',
      },
    ],
  }
   
};

export default nextConfig;
