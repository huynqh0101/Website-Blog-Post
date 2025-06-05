/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
  typescript: {
    // Bỏ qua lỗi TypeScript khi build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Bỏ qua lỗi ESLint khi build
    ignoreDuringBuilds: true,
    // Xóa dòng ignoreDuringDevs vì nó không được hỗ trợ
  },
};

// Nếu đang dùng file .mjs
export default nextConfig;
