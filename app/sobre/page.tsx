import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre — Folha dos Vales',
  description: 'Conheça a Folha dos Vales, agência de notícias locais dos três vales do Rio Grande do Sul.',
}

export default function SobrePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-serif text-3xl font-bold text-azul mb-6">Sobre a Folha dos Vales</h1>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
        <p>
          A <strong>Folha dos Vales</strong> nasceu com um propósito simples: trazer as notícias que
          realmente importam para quem vive no Vale do Paranhana, no Vale dos Sinos e no Vale das
          Hortências, no Rio Grande do Sul.
        </p>
        <p>
          Nada de notícias nacionais ou internacionais. Aqui você encontra o que acontece em
          Três Coroas, Taquara, Parobé, Igrejinha, Rolante, Riozinho, Novo Hamburgo, São Leopoldo,
          Campo Bom, Gramado, Canela, Nova Petrópolis e em toda a região.
        </p>
        <p>
          Publicamos <strong>três vezes ao dia, todos os dias</strong>: uma notícia de manhã,
          uma ao meio-dia e uma à noite. Sempre a mais relevante do momento, sempre com o link
          para você ler a íntegra na fonte original.
        </p>
        <p>
          Nossa missão é ser o maior banco de notícias locais dos três vales, organizadas por
          cidade, para que você encontre facilmente o que acontece na sua cidade.
        </p>

        <h2 className="font-serif text-xl font-bold text-azul mt-8">Cidades cobertas</h2>
        <div className="grid grid-cols-2 gap-4 not-prose">
          {[
            { regiao: 'Vale do Paranhana', cidades: ['Três Coroas', 'Taquara', 'Parobé', 'Igrejinha', 'Rolante', 'Riozinho'] },
            { regiao: 'Vale dos Sinos', cidades: ['Novo Hamburgo', 'São Leopoldo', 'Campo Bom', 'Sapiranga', 'Dois Irmãos', 'Estância Velha', 'Ivoti', 'Nova Hartz', 'Portão'] },
            { regiao: 'Vale das Hortências', cidades: ['Gramado', 'Canela', 'Nova Petrópolis', 'São Francisco de Paula'] },
          ].map(r => (
            <div key={r.regiao} className="bg-gray-50 rounded-lg p-4 col-span-2 sm:col-span-1">
              <h3 className="font-semibold text-azul text-sm uppercase tracking-wide mb-2">{r.regiao}</h3>
              <ul className="text-sm text-gray-600 space-y-0.5">
                {r.cidades.map(c => <li key={c}>· {c}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <h2 className="font-serif text-xl font-bold text-azul mt-8">Contato</h2>
        <p>
          Para sugestões de pauta, correções ou informações:{' '}
          <a href="mailto:afolhadosvales@gmail.com" className="text-azul hover:text-dourado underline">
            afolhadosvales@gmail.com
          </a>
        </p>
        <p>
          Siga também nas redes:{' '}
          <a href="https://facebook.com/folhadosvales" target="_blank" rel="noopener noreferrer" className="text-azul hover:text-dourado underline">
            facebook.com/folhadosvales
          </a>
        </p>
      </div>
    </div>
  )
}
