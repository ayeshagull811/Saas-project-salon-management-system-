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
     experimental: {
    optimizeCss: false, // disable lightningcss
  },
  },
  // Turbopack ko disable karke Webpack use karne ke liye
  // experimental: {
  //   turbo: false,
  // },
};
export default nextConfig;
