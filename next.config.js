/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/staywarm-app',
  assetPrefix: '/staywarm-app',
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
