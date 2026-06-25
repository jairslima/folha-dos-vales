import { createClient, SupabaseClient } from '@supabase/supabase-js'

export type Noticia = {
  id: string
  titulo: string
  conteudo: string
  url_fonte: string
  fonte_nome: string
  regiao: string
  cidades: string[]
  imagem_url: string | null
  data_publicacao: string
  turno: string
  score: number
  publicada_facebook: boolean
  destaque_em?: string | null
  youtube_url?: string | null
}

let _client: SupabaseClient | null = null

function getClient(): SupabaseClient | null {
  if (_client) return _client
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  _client = createClient(url, key)
  return _client
}

export async function buscarNoticias(limite = 20, offset = 0): Promise<Noticia[]> {
  const client = getClient()
  if (!client) return []
  const { data, error } = await client
    .from('noticias')
    .select('*')
    .order('data_publicacao', { ascending: false })
    .range(offset, offset + limite - 1)
  if (error) return []
  return (data ?? []) as Noticia[]
}

function escaparLike(valor: string): string {
  return valor.replace(/[%_\\]/g, c => '\\' + c)
}

// Allowlist: apenas letras, números, espaços, hífen e apóstrofo.
function sanitizarCidade(cidade: string): string | null {
  if (!/^[\p{L}\p{N} \-']{1,64}$/u.test(cidade)) return null
  return escaparLike(cidade)
}

function sanitizarBusca(termo: string): string | null {
  const normalizado = termo.replace(/\s+/g, ' ').trim()
  if (!normalizado || normalizado.length > 80) return null
  if (!/^[\p{L}\p{N} \-']{1,80}$/u.test(normalizado)) return null
  return escaparLike(normalizado)
}

export async function buscarNoticiasPorTermo(termo: string, limite = 30, offset = 0): Promise<Noticia[]> {
  const client = getClient()
  if (!client) return []
  const safe = sanitizarBusca(termo)
  if (!safe) return []
  const filtro = `titulo.ilike.%${safe}%,conteudo.ilike.%${safe}%,fonte_nome.ilike.%${safe}%,regiao.ilike.%${safe}%`
  const { data, error } = await client
    .from('noticias')
    .select('*')
    .or(filtro)
    .order('data_publicacao', { ascending: false })
    .range(offset, offset + limite - 1)
  if (error) return []
  return (data ?? []) as Noticia[]
}

export async function contarNoticiasPorTermo(termo: string): Promise<number> {
  const client = getClient()
  if (!client) return 0
  const safe = sanitizarBusca(termo)
  if (!safe) return 0
  const filtro = `titulo.ilike.%${safe}%,conteudo.ilike.%${safe}%,fonte_nome.ilike.%${safe}%,regiao.ilike.%${safe}%`
  const { count, error } = await client
    .from('noticias')
    .select('*', { count: 'exact', head: true })
    .or(filtro)
  if (error) return 0
  return count ?? 0
}

export async function buscarNoticiasPorCidade(cidade: string, limite = 20, offset = 0): Promise<Noticia[]> {
  const client = getClient()
  if (!client) return []
  const safe = sanitizarCidade(cidade)
  if (!safe) return []
  const { data, error } = await client
    .from('noticias')
    .select('*')
    .or(`titulo.ilike.%${safe}%,conteudo.ilike.%${safe}%`)
    .order('data_publicacao', { ascending: false })
    .range(offset, offset + limite - 1)
  if (error) return []
  return (data ?? []) as Noticia[]
}

export async function contarNoticiasPorCidade(cidade: string): Promise<number> {
  const client = getClient()
  if (!client) return 0
  const safe = sanitizarCidade(cidade)
  if (!safe) return 0
  const { count, error } = await client
    .from('noticias')
    .select('*', { count: 'exact', head: true })
    .or(`titulo.ilike.%${safe}%,conteudo.ilike.%${safe}%`)
  if (error) return 0
  return count ?? 0
}

export async function buscarNoticiasPorRegiao(regiao: string, limite = 30, offset = 0): Promise<Noticia[]> {
  const client = getClient()
  if (!client) return []
  // 'regiao' é um valor fixo gerado pelo backend (não input de usuário) — eq() direto é seguro.
  const { data, error } = await client
    .from('noticias')
    .select('*')
    .eq('regiao', regiao)
    .order('data_publicacao', { ascending: false })
    .range(offset, offset + limite - 1)
  if (error) return []
  return (data ?? []) as Noticia[]
}

export async function contarNoticiasPorRegiao(regiao: string): Promise<number> {
  const client = getClient()
  if (!client) return 0
  const { count, error } = await client
    .from('noticias')
    .select('*', { count: 'exact', head: true })
    .eq('regiao', regiao)
  if (error) return 0
  return count ?? 0
}

export async function buscarNoticiaDestaque(): Promise<Noticia | null> {
  const client = getClient()
  if (!client) return null
  // Rotação automática sem cron: a notícia de hoje sempre tem destaque_em mais
  // recente que a de ontem, então a de destaque_em mais recente já é "a do dia".
  const { data, error } = await client
    .from('noticias')
    .select('*')
    .not('destaque_em', 'is', null)
    .order('destaque_em', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (error) return null
  return data as Noticia | null
}

export async function buscarNoticiaPorId(id: string): Promise<Noticia> {
  const client = getClient()
  if (!client) throw new Error('Supabase não configurado')
  const { data, error } = await client
    .from('noticias')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data as Noticia
}
