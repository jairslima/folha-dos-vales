'use client'

import { useEffect, useState } from 'react'

/**
 * Folha dos Vales by Jair Lima: contador de visitantes visível no rodapé.
 * Usa o Worker "contador-visitas" (C:\Users\jairs\Claude\ContadorVisitas). Conta uma vez por sessão do
 * navegador, sem cookie e sem guardar IP. Se o contador estiver fora do ar, a linha não aparece.
 */
const API = 'https://contador-visitas.biblia-sagrada-livre.workers.dev'
const SITE = 'vales'

type Numeros = { visitantesHoje: number; visitantesMes: number; visitantesTotal: number }

const fmt = (n: number) => n.toLocaleString('pt-BR')

export default function Visitas() {
  const [n, setN] = useState<Numeros | null>(null)

  useEffect(() => {
    let vivo = true
    ;(async () => {
      try {
        let contou = false
        try { contou = sessionStorage.getItem('fl:hit') === '1' } catch { /* sem sessionStorage */ }
        const res = contou
          ? await fetch(`${API}/stats?site=${SITE}`)
          : await fetch(`${API}/hit`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ site: SITE }) })
        if (!res.ok) return
        if (!contou) { try { sessionStorage.setItem('fl:hit', '1') } catch { /* ok */ } }
        const dados = (await res.json()) as Numeros
        if (vivo) setN(dados)
      } catch { /* sem rede: não mostra */ }
    })()
    return () => { vivo = false }
  }, [])

  if (!n) return null
  return (
    <p>
      Visitantes: hoje {fmt(n.visitantesHoje)} · neste mês {fmt(n.visitantesMes)} · total {fmt(n.visitantesTotal)}
    </p>
  )
}
