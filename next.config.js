/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['placehold.co'], // Adicione domínios de imagens aqui
    formats: ['image/avif', 'image/webp'],
  },
  // Otimizações de produção
  swcMinify: true,
  // Configuração de ambiente
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
}

module.exports = nextConfig
