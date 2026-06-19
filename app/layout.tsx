import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import CityNav from '@/components/CityNav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Folha dos Vales — Notícias Locais do Vale do Paranhana, Vale dos Sinos e Vale das Hortências',
  description: 'Notícias 100% locais do Vale do Paranhana, Vale dos Sinos e Vale das Hortências (RS). Publicamos três vezes ao dia, todos os dias.',
  keywords: 'notícias, Três Coroas, Taquara, Parobé, Igrejinha, Novo Hamburgo, Gramado, Vale do Paranhana, Vale dos Sinos, Vale das Hortências, RS',
  openGraph: {
    title: 'Folha dos Vales',
    description: 'Notícias 100% locais dos três vales do RS',
    url: 'https://folhadosvales.com.br',
    siteName: 'Folha dos Vales',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <CityNav />
        <main className="max-w-7xl mx-auto px-4 py-6 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
