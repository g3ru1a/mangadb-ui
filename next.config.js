/** @type {import('next').NextConfig} */

let path = '/api/:path*'

if (!process.env.NEXT_PUBLIC_ENVIRONMENT === 'local') {
  path = '/:path*'
}

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_BACKEND_URL + path,
      },
    ]
  },
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
