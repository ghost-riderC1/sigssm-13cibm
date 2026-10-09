-- Copie e cole todo este código mágico dentro do "SQL Editor" no site do Supabase e clique em "Run"
-- Isso vai criar o banco de dados oficial das Viaturas automaticamente.

CREATE TABLE viaturas (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  prefixo text NOT NULL UNIQUE,
  placa text NOT NULL,
  tipo text NOT NULL,
  marca text,
  modelo text,
  ano text,
  chassi text,
  renavam text,
  quilometragem bigint DEFAULT 0,
  unidade text DEFAULT 'COMANDO REGIONAL II',
  subunidade text DEFAULT '13ª CIBM',
  cidade text DEFAULT 'Lucas do Rio Verde',
  localizacao text DEFAULT 'Base 13ª CIBM',
  responsavel text,
  situacao text DEFAULT 'Disponível',
  data_cadastro timestamp with time zone DEFAULT now(),
  observacoes text,
  custo_total numeric DEFAULT 0,
  dias_baixada integer DEFAULT 0,
  ultima_revisao text DEFAULT 'N/A'
);

-- Isso desativa as exigências avançadas de login por enquanto para facilitar nosso desenvolvimento
ALTER TABLE viaturas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir leitura e escrita publica durante desenvolvimento" ON viaturas
  FOR ALL
  USING (true)
  WITH CHECK (true);
