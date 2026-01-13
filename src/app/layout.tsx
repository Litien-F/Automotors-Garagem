import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../frontend/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Automotors Garagem - Autopeças para Carros, Motos e Caminhões',
  description: 'E-commerce especializado em autopeças de reposição para veículos nacionais e importados. Encontre peças para carros antigos e modernos.',
  keywords: 'autopeças, peças automotivas, carros antigos, reposição, garagem',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
