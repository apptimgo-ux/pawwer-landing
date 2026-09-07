import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    // El panel del editor vive en public/admin/index.html
    return [{ source: '/admin', destination: '/admin/index.html' }];
  },
};

export default nextConfig;
