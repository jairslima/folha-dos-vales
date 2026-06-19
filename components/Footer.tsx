import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-azul-escuro text-blue-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-white text-lg mb-2">Folha dos Vales</h3>
            <p className="text-sm leading-relaxed">
              Notícias 100% locais do Vale do Paranhana, Vale dos Sinos e Vale das Hortências (RS).
              Publicamos três vezes ao dia, todos os dias.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Regiões</h4>
            <ul className="text-sm space-y-1">
              <li>Vale do Paranhana</li>
              <li>Vale dos Sinos</li>
              <li>Vale das Hortências</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Contato</h4>
            <ul className="text-sm space-y-2">
              <li>
                <a href="mailto:afolhadosvales@gmail.com" className="hover:text-white transition-colors">
                  afolhadosvales@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com/folhadosvales"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-800 mt-6 pt-4 text-xs text-center text-blue-400">
          © {new Date().getFullYear()} Folha dos Vales · Três Coroas, RS · Notícias locais dos três vales
        </div>
      </div>
    </footer>
  )
}
