'use client'

import Link from 'next/link'

type SearchFormProps = {
  defaultValue?: string
  compact?: boolean
  className?: string
}

export default function SearchForm({ defaultValue = '', compact = false, className = '' }: SearchFormProps) {
  return (
    <form action="/" method="get" role="search" className={`flex items-center gap-2 ${className}`}>
      <label htmlFor={compact ? 'busca-header' : 'busca-home'} className="sr-only">
        Pesquisar notícias
      </label>
      <input
        id={compact ? 'busca-header' : 'busca-home'}
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder={compact ? 'Pesquisar' : 'Pesquisar por cidade, tema ou fonte'}
        maxLength={80}
        className={
          compact
            ? 'h-9 min-w-0 flex-1 rounded border border-white/20 bg-white/10 px-3 text-sm text-white placeholder:text-blue-100 outline-none focus:border-dourado focus:bg-white/15'
            : 'h-11 w-full rounded border border-gray-200 bg-white px-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-dourado focus:ring-2 focus:ring-dourado/20'
        }
      />
      <button
        type="submit"
        className={
          compact
            ? 'h-9 rounded bg-dourado px-3 text-sm font-medium text-white transition-colors hover:bg-dourado-claro'
            : 'h-11 rounded bg-azul px-4 text-sm font-medium text-white transition-colors hover:bg-azul-claro'
        }
      >
        Buscar
      </button>
      {!compact && defaultValue && (
        <Link href="/" className="h-11 rounded border border-gray-200 px-4 py-2.5 text-sm text-gray-600 hover:text-azul">
          Limpar
        </Link>
      )}
    </form>
  )
}
