import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

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

export async function buscarNoticias(limite = 20, offset = 0) {
  const { data, error } = await supabase
    .from('noticias')
    .select('*')
    .order('data_publicacao', { ascending: false })
    .range(offset, offset + limite - 1)
  if (error) throw error
  return data as Noticia[]
}

export async function buscarNoticiasPorCidade(cidade: string, limite = 20, offset = 0) {
  const { data, error } = await supabase
    .from('noticias')
    .select('*')
    .contains('cidades', [cidade])
    .order('data_publicacao', { ascending: false })
    .range(offset, offset + limite - 1)
  if (error) throw error
  return data as Noticia[]
}

export async function buscarNoticiaPorId(id: string) {
  const { data, error } = await supabase
    .from('noticias')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data as Noticia
}

export async function contarNoticiasPorCidade(cidade: string) {
  const { count, error } = await supabase
    .from('noticias')
    .select('*', { count: 'exact', head: true })
    .contains('cidades', [cidade])
  if (error) throw error
  return count ?? 0
}
