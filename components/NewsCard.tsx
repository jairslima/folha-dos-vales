import Link from 'next/link'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Noticia } from '@/lib/supabase'
import NewsImage from './NewsImage'

function ImagemFallback({ regiao, cidade }: { regiao: string; cidade?: string }) {
  const icones: Record<string, string> = {
    'Vale do Paranhana': '🏔️',
    'Vale dos Sinos': '🏭',
    'Vale das Hortências': '🌸',
  }
  const icone = icones[regiao] || '📰'

  return (
    <div className="h-44 w-full flex flex-col items-center justify-center bg-gradient-to-br from-azul to-azul-claro text-white">
      <span className="text-4xl mb-2">{icone}</span>
      <span className="font-serif text-sm font-semibold text-dourado">{cidade || regiao}</span>
      <span className="text-xs text-blue-200 mt-1">Folha dos Vales</span>
    </div>
  )
}

export default function NewsCard({ noticia }: { noticia: Noticia }) {
  const data = new Date(noticia.data_publicacao)
  const dataFormatada = format(data, "d 'de' MMMM 'de' yyyy", { locale: ptBR })
  const cidade = Array.isArray(noticia.cidades) ? noticia.cidades[0] : undefined

  const extrato = noticia.conteudo
    .split('\n')
    .filter(p => p.trim().length > 0 && !p.startsWith('Para ler a notícia'))
    .slice(0, 2)
    .join(' ')
    .slice(0, 200)

  const IMAGENS_BLOQUEADAS = [
    'news.google.com', 'lh3.google', 'ge.globo', 'globo.com/ge',
    'placeholder', 'default-image', 'logo', 'favicon',
    's.glbimg.com/es/ge', 'i.s3.glbimg'
  ]
  const temImagem = noticia.imagem_url &&
    !IMAGENS_BLOQUEADAS.some(b => noticia.imagem_url!.includes(b))

  return (
    <Link href={`/noticia/${noticia.id}`} className="news-card block group">
      <div className="relative h-44 w-full overflow-hidden">
        {temImagem ? (
          <NewsImage src={noticia.imagem_url!} alt={noticia.titulo} />
        ) : (
          <ImagemFallback regiao={noticia.regiao} cidade={cidade} />
        )}
      </div>

      <div className="p-4">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="region-label">{noticia.regiao}</span>
          {Array.isArray(noticia.cidades) && noticia.cidades.slice(0, 2).map(c => (
            <span key={c} className="city-tag">{c}</span>
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
