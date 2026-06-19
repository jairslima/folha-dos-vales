export const CIDADES = [
  // Vale do Paranhana
  { nome: 'Três Coroas', slug: 'tres-coroas', regiao: 'Vale do Paranhana' },
  { nome: 'Taquara', slug: 'taquara', regiao: 'Vale do Paranhana' },
  { nome: 'Parobé', slug: 'parobe', regiao: 'Vale do Paranhana' },
  { nome: 'Igrejinha', slug: 'igrejinha', regiao: 'Vale do Paranhana' },
  { nome: 'Rolante', slug: 'rolante', regiao: 'Vale do Paranhana' },
  { nome: 'Riozinho', slug: 'riozinho', regiao: 'Vale do Paranhana' },
  // Vale dos Sinos
  { nome: 'Novo Hamburgo', slug: 'novo-hamburgo', regiao: 'Vale dos Sinos' },
  { nome: 'São Leopoldo', slug: 'sao-leopoldo', regiao: 'Vale dos Sinos' },
  { nome: 'Campo Bom', slug: 'campo-bom', regiao: 'Vale dos Sinos' },
  { nome: 'Sapiranga', slug: 'sapiranga', regiao: 'Vale dos Sinos' },
  { nome: 'Dois Irmãos', slug: 'dois-irmaos', regiao: 'Vale dos Sinos' },
  { nome: 'Estância Velha', slug: 'estancia-velha', regiao: 'Vale dos Sinos' },
  { nome: 'Ivoti', slug: 'ivoti', regiao: 'Vale dos Sinos' },
  { nome: 'Nova Hartz', slug: 'nova-hartz', regiao: 'Vale dos Sinos' },
  { nome: 'Portão', slug: 'portao', regiao: 'Vale dos Sinos' },
  { nome: 'Araricá', slug: 'ararica', regiao: 'Vale dos Sinos' },
  // Vale das Hortências
  { nome: 'Gramado', slug: 'gramado', regiao: 'Vale das Hortências' },
  { nome: 'Canela', slug: 'canela', regiao: 'Vale das Hortências' },
  { nome: 'Nova Petrópolis', slug: 'nova-petropolis', regiao: 'Vale das Hortências' },
  { nome: 'São Francisco de Paula', slug: 'sao-francisco-de-paula', regiao: 'Vale das Hortências' },
]

export const REGIOES = [
  'Vale do Paranhana',
  'Vale dos Sinos',
  'Vale das Hortências',
]

export function slugParaCidade(slug: string) {
  return CIDADES.find(c => c.slug === slug)
}

export function nomeParaSlug(nome: string) {
  return CIDADES.find(c => c.nome.toLowerCase() === nome.toLowerCase())?.slug
}
