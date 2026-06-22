import { buscarNoticias, buscarNoticiaDestaque, Noticia } from '@/lib/supabase'
import NewsCard from '@/components/NewsCard'
import Destaque from '@/components/Destaque'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  let noticias: Noticia[] = []
  let destaque: Noticia | null = null
  try {
    ;[noticias, destaque] = await Promise.all([buscarNoticias(30), buscarNoticiaDestaque()])
  } catch {
    noticias = []
    destaque = null
  }

  const noticiasSemDestaque = destaque
    ? noticias.filter(n => n.id !== destaque!.id)
    : noticias

  return (
    <div>
      {destaque && <Destaque noticia={destaque} />}

      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-azul">Últimas Notícias</h1>
        <p className="text-sm text-gray-500 mt-1">
          Notícias locais dos três vales publicadas hoje e nos últimos dias
        </p>
      </div>

      {noticiasSemDestaque.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">Em breve as primeiras notícias.</p>
          <p className="text-sm mt-2">Publicamos às 7h, 12h e 19h todos os dias.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {noticiasSemDestaque.map(n => (
            <NewsCard key={n.id} noticia={n} />
          ))}
        </div>
      )}
    </div>
  )
}
