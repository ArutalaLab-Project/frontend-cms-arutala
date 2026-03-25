import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lulaegxnujoisnjopzkr.storage.supabase.co",
        pathname: "/**",
      },
    ],
  },
  // Skip type checking during build for faster performance
  // (Ensure this is run in your CI/CD pipeline instead)
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
