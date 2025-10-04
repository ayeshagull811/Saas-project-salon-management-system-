/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["encrypted-tbn0.gstatic.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "beautycastleparlour.com",
        pathname: "/uploads/**",
      },
    ],
  },
  experimental: {
    optimizeCss: false, // disable lightningcss
    // turbo: false, // agar TurboPack disable karna ho toh uncomment karo
  },
};

export default nextConfig;
