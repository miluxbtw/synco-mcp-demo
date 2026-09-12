import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The dev server is reached over a forwarded localhost port, which Next
  // otherwise rejects for HMR requests.
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
