-- Executar no SQL Editor do Supabase
-- Tabela principal de notícias
CREATE TABLE IF NOT EXISTS noticias (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  conteudo TEXT NOT NULL,
  url_fonte TEXT,
  fonte_nome TEXT,
  regiao TEXT,
  cidades JSONB DEFAULT '[]',
  imagem_url TEXT,
  data_publicacao TIMESTAMPTZ DEFAULT NOW(),
  data_noticia_fonte TIMESTAMPTZ,
  publicada_facebook BOOLEAN DEFAULT FALSE,
  hash_titulo TEXT UNIQUE NOT NULL,
  turno TEXT,
  score INTEGER DEFAULT 0
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_noticias_data ON noticias(data_publicacao DESC);
CREATE INDEX IF NOT EXISTS idx_noticias_cidades ON noticias USING GIN(cidades);
CREATE INDEX IF NOT EXISTS idx_noticias_hash ON noticias(hash_titulo);
CREATE INDEX IF NOT EXISTS idx_noticias_regiao ON noticias(regiao);

-- Acesso público de leitura (o site Next.js lê sem autenticação)
ALTER TABLE noticias ENABLE ROW LEVEL SECURITY;

CREATE POLICY "leitura_publica" ON noticias
  FOR SELECT USING (true);

-- Escrita apenas via service_role (chave usada pelo Python)
CREATE POLICY "escrita_service" ON noticias
  FOR INSERT WITH CHECK (true);
