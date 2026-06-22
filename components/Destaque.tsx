import Link from 'next/link'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Noticia } from '@/lib/supabase'
import NewsImage from './NewsImage'

const IMAGENS_BLOQUEADAS = [
  'news.google.com', 'lh3.google', 'ge.globo', 'globo.com/ge',
  'placeholder', 'default-image', 'logo', 'favicon',
  's.glbimg.com/es/ge', 'i.s3.glbimg',
]

export default function Destaque({ noticia }: { noticia: Noticia }) {
  const data = new Date(noticia.data_publicacao)
  const dataFormatada = format(data, "d 'de' MMMM 'de' yyyy", { locale: ptBR })
  const cidade = Array.isArray(noticia.cidades) ? noticia.cidades[0] : undefined

  const extrato = noticia.conteudo
    .split('\n')
    .filter(p => p.trim().length > 0 && !p.startsWith('Para ler a notícia'))
    .slice(0, 3)
    .join(' ')
    .slice(0, 400)

  const temImagem = noticia.imagem_url &&
    !IMAGENS_BLOQUEADAS.some(b => noticia.imagem_url!.includes(b))

  return (
    <div className="mb-8 rounded-lg overflow-hidden shadow-lg border border-dourado/30">
      <div className="bg-azul px-4 py-2 flex items-center gap-2">
        <span className="text-dourado text-sm font-bold uppercase tracking-wide">
          ★ Destaque do dia
        </span>
        {cidade && <span className="city-tag">{cidade}</span>}
        <span className="region-label">{noticia.regiao}</span>
      </div>

      <Link href={`/noticia/${noticia.id}`} className="block group">
        <div className="relative h-[260px] sm:h-[400px] w-full overflow-hidden bg-azul-claro">
          {temImagem ? (
            <NewsImage src={noticia.imagem_url!} alt={noticia.titulo} />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-white">
              <span className="font-serif text-lg">{noticia.regiao}</span>
            </div>
          )}
        </div>

        <div className="p-5 bg-white">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 leading-snug mb-3 group-hover:text-azul transition-colors">
            {noticia.titulo}
          </h2>

          {extrato && (
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              {extrato}...
            </p>
          )}

          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>{dataFormatada}</span>
            <span className="text-dourado font-medium">{noticia.fonte_nome}</span>
          </div>
        </div>
      </Link>

      {noticia.youtube_url && (
        <a
          href={noticia.youtube_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-3 transition-colors"
        >
          ▶ Assista a narração no YouTube
        </a>
      )}
    </div>
  )
}
