/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    dangerouslyAllowSVG: true, // 🔥 यह लाइन SVG एरर ठीक करेगी
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // एक्स्ट्रा सुरक्षा
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
};

export default nextConfig;