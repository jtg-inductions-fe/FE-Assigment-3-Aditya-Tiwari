import type { NextConfig } from "next";
import { ROUTES } from "@/constants/routes";

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
  async redirects() {
    return [
      {
        source: ROUTES.HOME,
        destination: ROUTES.LOGIN,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
