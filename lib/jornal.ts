export async function buscarUrlJornalSemanal(cidadeSlug: string): Promise<string | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) return null

  const pdfUrl = `${supabaseUrl}/storage/v1/object/public/jornais/${cidadeSlug}/atual.pdf`
  try {
    const resp = await fetch(pdfUrl, { method: 'HEAD', cache: 'no-store' })
    return resp.ok ? pdfUrl : null
  } catch {
    return null
  }
}
