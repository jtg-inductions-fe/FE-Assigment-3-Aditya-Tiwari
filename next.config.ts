import type { NextConfig } from "next";
import { ROUTES } from "@/constants/routes";

const nextConfig: NextConfig = {
  experimental: {
    webVitalsAttribution: ["CLS", "LCP"],
    useLightningcss: true,
  },
  logging: {
    fetches: {
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
