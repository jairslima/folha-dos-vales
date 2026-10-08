/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/eleicoes-2026', destination: '/eleicoes-2026/index.html' },
      { source: '/auditoria-2026', destination: '/auditoria-2026/index.html' },
    ]
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
}

export default nextConfig
