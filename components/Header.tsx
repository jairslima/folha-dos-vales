'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-azul text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 relative flex-shrink-0">
            <Image src="/logo.png" alt="Folha dos Vales" fill className="object-contain" />
          </div>
          <div>
            <div className="font-serif text-xl font-bold leading-tight text-white group-hover:text-dourado transition-colors">
              Folha dos Vales
            </div>
            <div className="text-xs text-blue-200 leading-tight hidden sm:block">
              Vale do Paranhana · Vale dos Sinos · Vale das Hortências
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="hover:text-dourado transition-colors">Início</Link>
          <Link href="/sobre" className="hover:text-dourado transition-colors">Sobre</Link>
          <Link
            href="https://facebook.com/folhadosvales"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-dourado transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </Link>
          <a
            href="mailto:afolhadosvales@gmail.com"
            className="bg-dourado hover:bg-dourado-claro text-white px-3 py-1.5 rounded text-sm transition-colors"
          >
            Contato
          </a>
        </nav>

        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-azul-escuro border-t border-blue-700 px-4 py-3 flex flex-col gap-3 text-sm">
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-dourado">Início</Link>
          <Link href="/sobre" onClick={() => setMenuOpen(false)} className="hover:text-dourado">Sobre</Link>
          <a href="https://facebook.com/folhadosvales" target="_blank" rel="noopener noreferrer" className="hover:text-dourado">Facebook</a>
          <a href="mailto:afolhadosvales@gmail.com" className="hover:text-dourado">Contato: afolhadosvales@gmail.com</a>
        </div>
      )}
    </header>
  )
}
