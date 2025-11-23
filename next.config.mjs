/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com', // Amazon Images allow
      },
      {
        protocol: 'https',
        hostname: 'placehold.co', // Placeholder images allow
      },
    ],
  },
};

export default nextConfig;
