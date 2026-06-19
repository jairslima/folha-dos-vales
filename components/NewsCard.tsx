import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Noticia } from '@/lib/supabase'

export default function NewsCard({ noticia }: { noticia: Noticia }) {
  const data = new Date(noticia.data_publicacao)
  const dataFormatada = format(data, "d 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })

  const extrato = noticia.conteudo
    .split('\n')
    .filter(p => p.trim().length > 0 && !p.startsWith('Para ler a notícia'))
    .slice(0, 2)
    .join(' ')
    .slice(0, 220)

  return (
    <Link href={`/noticia/${noticia.id}`} className="news-card block group">
      {noticia.imagem_url && (
        <div className="relative h-44 w-full overflow-hidden bg-gray-100">
          <Image
            src={noticia.imagem_url}
            alt={noticia.titulo}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="region-label">{noticia.regiao}</span>
          {noticia.cidades?.slice(0, 2).map(cidade => (
            <span key={cidade} className="city-tag">{cidade}</span>
          ))}
        </div>

        <h2 className="font-serif text-base font-semibold text-gray-900 leading-snug mb-2 group-hover:text-azul transition-colors line-clamp-3">
          {noticia.titulo}
        </h2>

        {extrato && (
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-3">
            {extrato}...
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-gray-400 mt-auto">
          <span>{dataFormatada}</span>
          <span className="text-dourado font-medium">{noticia.fonte_nome}</span>
        </div>
      </div>
    </Link>
  )
}
