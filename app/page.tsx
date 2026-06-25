import { buscarNoticias, buscarNoticiaDestaque, buscarNoticiasPorTermo, contarNoticiasPorTermo, Noticia } from '@/lib/supabase'
import NewsCard from '@/components/NewsCard'
import Destaque from '@/components/Destaque'
import SearchForm from '@/components/SearchForm'

export const dynamic = 'force-dynamic'

type HomePageProps = {
  searchParams?: Promise<{ q?: string | string[] }>
}

function normalizarBusca(valor?: string | string[]): string {
  const termo = Array.isArray(valor) ? valor[0] : valor
  return (termo ?? '').replace(/\s+/g, ' ').trim().slice(0, 80)
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = searchParams ? await searchParams : {}
  const termoBusca = normalizarBusca(params.q)
  const pesquisando = termoBusca.length > 0
  let noticias: Noticia[] = []
  let destaque: Noticia | null = null
  let totalBusca = 0
  try {
    if (pesquisando) {
      ;[noticias, totalBusca] = await Promise.all([
        buscarNoticiasPorTermo(termoBusca, 60),
        contarNoticiasPorTermo(termoBusca),
      ])
    } else {
      ;[noticias, destaque] = await Promise.all([buscarNoticias(30), buscarNoticiaDestaque()])
    }
  } catch {
    noticias = []
    destaque = null
    totalBusca = 0
  }

  const noticiasSemDestaque = !pesquisando && destaque
    ? noticias.filter(n => n.id !== destaque!.id)
    : noticias

  return (
    <div>
      {!pesquisando && destaque && <Destaque noticia={destaque} />}

      <div className="mb-6 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
        <SearchForm defaultValue={termoBusca} />
      </div>

      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-azul">
          {pesquisando ? `Resultados para "${termoBusca}"` : 'Últimas Notícias'}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {pesquisando
            ? totalBusca > 0
              ? `${totalBusca} notícia${totalBusca !== 1 ? 's' : ''} encontrada${totalBusca !== 1 ? 's' : ''}`
              : 'Nenhuma notícia encontrada com esse termo'
            : 'Notícias locais dos três vales publicadas hoje e nos últimos dias'}
        </p>
      </div>

      {noticiasSemDestaque.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">
            {pesquisando ? 'Nenhuma notícia encontrada.' : 'Em breve as primeiras notícias.'}
          </p>
          <p className="text-sm mt-2">
            {pesquisando ? 'Tente pesquisar por uma cidade, fonte ou tema.' : 'Publicamos às 7h, 12h e 19h todos os dias.'}
          </p>
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
