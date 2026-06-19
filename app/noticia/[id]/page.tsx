import { buscarNoticiaPorId } from '@/lib/supabase'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    const { id } = await params
    const n = await buscarNoticiaPorId(id)
    return {
      title: `${n.titulo} — Folha dos Vales`,
      description: n.conteudo.slice(0, 160),
      openGraph: { images: n.imagem_url ? [n.imagem_url] : [] },
    }
  } catch {
    return {}
  }
}

export default async function NoticiaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let noticia
  try {
    noticia = await buscarNoticiaPorId(id)
  } catch {
    notFound()
  }

  const data = new Date(noticia.data_publicacao)
  const dataFormatada = format(data, "EEEE, d 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })

  const paragrafos = noticia.conteudo
    .split('\n')
    .filter(p => p.trim().length > 0)

  return (
    <article className="max-w-2xl mx-auto">
      <Link href="/" className="text-sm text-azul hover:text-dourado flex items-center gap-1 mb-4">
        ← Voltar às notícias
      </Link>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="region-label">{noticia.regiao}</span>
        {Array.isArray(noticia.cidades) && noticia.cidades.map(c => (
          <Link key={c} href={`/cidade/${c.toLowerCase().replace(/\s/g, '-').normalize('NFD').replace(/[̀-ͯ]/g, '')}`}>
            <span className="city-tag hover:bg-azul-claro cursor-pointer">{c}</span>
          </Link>
        ))}
      </div>

      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-3">
        {noticia.titulo}
      </h1>

      <div className="flex items-center gap-3 text-sm text-gray-500 mb-6 pb-4 border-b border-gray-200">
        <time dateTime={noticia.data_publicacao} className="capitalize">{dataFormatada}</time>
        <span>·</span>
        <span className="text-dourado font-medium">{noticia.fonte_nome}</span>
      </div>

      {noticia.imagem_url && (
        <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden mb-6 bg-gray-100">
          <Image
            src={noticia.imagem_url}
            alt={noticia.titulo}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        {paragrafos.map((p, i) => {
          const ehUltimo = p.startsWith('Para ler a notícia completa')
          return (
            <p
              key={i}
              className={`leading-relaxed mb-4 ${ehUltimo
                ? 'text-sm text-gray-500 border-t border-gray-200 pt-4 mt-6'
                : 'text-gray-800'
              }`}
            >
              {ehUltimo
                ? p.replace(/acesse (https?:\/\/\S+)/, (_, url) => '').trim() + ' '
                : p
              }
              {ehUltimo && noticia.url_fonte && (
                <a
                  href={noticia.url_fonte}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-azul hover:text-dourado underline"
                >
                  {noticia.fonte_nome}
                </a>
              )}
            </p>
          )
        })}
      </div>

      <div className="mt-8 pt-4 border-t border-gray-200 flex gap-4 text-sm">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://folhadosvales.com.br/noticia/${noticia.id}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-azul hover:text-dourado transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Compartilhar
        </a>
        <Link href="/" className="text-gray-500 hover:text-azul transition-colors">
          Ver mais notícias
        </Link>
      </div>
    </article>
  )
}
