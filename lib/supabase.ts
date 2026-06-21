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

// Allowlist: apenas letras, números, espaços, hífen e apóstrofo (cobre todos os nomes de cidades dos 3 vales)
function sanitizarCidade(cidade: string): string | null {
  if (!/^[\p{L}\p{N} \-']{1,64}$/u.test(cidade)) return null
  return cidade.replace(/[%_\\]/g, c => '\\' + c)
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
