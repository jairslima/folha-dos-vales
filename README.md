# Folha dos Vales

Site de notícias locais que agrega e publica conteúdos das regiões do Vale do Paranhana, Vale dos Sinos e Vale das Hortências, no Rio Grande do Sul.

## Funcionalidades

- Listagem das últimas notícias publicadas
- Pesquisa por termo em título, conteúdo, fonte e região
- Navegação por cidade e por região (vale)
- Página de detalhe de notícia
- Página "Sobre" o projeto
- Atualização automática do conteúdo (renderização dinâmica)
- Publicação programada às 7h, 12h e 19h

## Stack

| Componente       | Tecnologia              |
|------------------|--------------------------|
| Framework        | Next.js 15 (App Router)  |
| Linguagem        | TypeScript                |
| UI               | React 18 + Tailwind CSS  |
| Banco de dados   | Supabase (PostgreSQL)   |
| Datas/fuso       | date-fns / date-fns-tz   |
| Deploy           | Vercel                   |

## Uso básico

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Copie `.env.local.exemplo` para `.env.local` e preencha as variáveis do Supabase:
   ```bash
   cp .env.local.exemplo .env.local
   ```
4. Execute o ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Acesse `http://localhost:3000`

O schema do banco de dados (tabela `noticias` e políticas de acesso) está em `schema.sql` e deve ser executado no SQL Editor do Supabase.

## Build

```bash
npm run build
npm run start
```

## Pesquisa

A página inicial aceita busca por query string:

```text
/?q=Taquara
```

A pesquisa consulta `titulo`, `conteudo`, `fonte_nome` e `regiao` na tabela `noticias`.
O termo é limitado a 80 caracteres e aceita letras, números, espaços, hífen e apóstrofo.

Arquivos principais:

| Arquivo | Responsabilidade |
|---------|------------------|
| `components/SearchForm.tsx` | Formulário reutilizável de pesquisa. |
| `components/Header.tsx` | Campo compacto no cabeçalho e no menu mobile. |
| `app/page.tsx` | Lê `q`, busca resultados e renderiza estado vazio. |
| `lib/supabase.ts` | Funções `buscarNoticiasPorTermo` e `contarNoticiasPorTermo`. |

## Checklist de publicação

Mudanças no site público só devem ser consideradas concluídas depois de:

1. Rodar `npm run build`.
2. Conferir `git status --short`.
3. Fazer commit.
4. Fazer push para `origin/master`.
5. Aguardar a Vercel publicar.
6. Verificar `https://www.folhadosvales.com.br/`.
7. Quando houver busca, verificar também uma URL como `https://www.folhadosvales.com.br/?q=Taquara`.

---

Autor: Jair Lima — github.com/jairslima
