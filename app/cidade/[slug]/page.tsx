import { buscarNoticiasPorCidade, contarNoticiasPorCidade, Noticia } from '@/lib/supabase'
import { slugParaCidade, CIDADES } from '@/lib/cidades'
import NewsCard from '@/components/NewsCard'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const cidade = slugParaCidade(slug)
  if (!cidade) return {}
  return {
    title: `Notícias de ${cidade.nome} — Folha dos Vales`,
    description: `Últimas notícias de ${cidade.nome} (${cidade.regiao}), publicadas pela Folha dos Vales.`,
  }
}

export default async function CidadePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cidade = slugParaCidade(slug)
  if (!cidade) notFound()

  let noticias: Noticia[] = []
  let total = 0
  try {
    noticias = await buscarNoticiasPorCidade(cidade.nome, 30)
    total = await contarNoticiasPorCidade(cidade.nome)
  } catch {
    noticias = []
  }

  return (
    <div>
      <div className="mb-6">
        <span className="region-label">{cidade.regiao}</span>
        <h1 className="font-serif text-2xl font-bold text-azul mt-1">
          Notícias de {cidade.nome}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {total > 0 ? `${total} notícia${total !== 1 ? 's' : ''} publicada${total !== 1 ? 's' : ''}` : 'Nenhuma notícia ainda'}
          {' · '}mais recentes primeiro
        </p>
      </div>

      {noticias.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">Nenhuma notícia encontrada para {cidade.nome}.</p>
          <p className="text-sm mt-2">Novas notícias são publicadas às 7h, 12h e 19h.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {noticias.map(n => (
            <NewsCard key={n.id} noticia={n} />
          ))}
        </div>
      )}
    </div>
  )
}
