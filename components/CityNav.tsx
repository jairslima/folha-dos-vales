'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CIDADES, REGIOES } from '@/lib/cidades'

export default function CityNav() {
  const pathname = usePathname()

  const cidadeAtiva = pathname.startsWith('/cidade/')
    ? pathname.split('/cidade/')[1]
    : null

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2">
          <Link
            href="/"
            className={`flex-shrink-0 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              !cidadeAtiva
                ? 'bg-azul text-white'
                : 'text-gray-600 hover:text-azul hover:bg-gray-100'
            }`}
          >
            Todas
          </Link>

          {REGIOES.map(regiao => (
            <div key={regiao} className="flex items-center gap-1 flex-shrink-0">
              <span className="text-gray-300 px-1 text-sm">|</span>
              <span className="text-xs text-dourado font-semibold uppercase tracking-wide px-1 flex-shrink-0">
                {regiao.replace('Vale d', '').replace('o ', '').replace('as ', '').trim()}
              </span>
              {CIDADES.filter(c => c.regiao === regiao).map(cidade => (
                <Link
                  key={cidade.slug}
                  href={`/cidade/${cidade.slug}`}
                  className={`flex-shrink-0 px-3 py-1.5 rounded text-sm transition-colors ${
                    cidadeAtiva === cidade.slug
                      ? 'bg-azul text-white'
                      : 'text-gray-600 hover:text-azul hover:bg-gray-100'
                  }`}
                >
                  {cidade.nome}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}
