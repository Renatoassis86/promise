-- ==============================================================================
-- PROMISE ENGLISH — SCHEMA DO BANCO (SUPABASE / POSTGRESQL)
-- Rodar em: Supabase do projeto Promisse (AINDA NÃO CRIADO — ver docs)
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- TABELA 1: PRE-MATRICULAS (Schools / Learners / Professionals, campos unificados)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.pre_matriculas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    status VARCHAR(50) DEFAULT 'novo' NOT NULL,
    tipo VARCHAR(20) NOT NULL, -- 'schools' | 'learners' | 'professionals'

    nome VARCHAR(255) NOT NULL,
    cargo VARCHAR(150),          -- schools: cargo do responsavel | professionals: funcao atual
    empresa VARCHAR(255),        -- nome da escola (so schools)
    cidade VARCHAR(150),         -- so schools
    email VARCHAR(255) NOT NULL,
    whatsapp VARCHAR(50) NOT NULL,

    idade VARCHAR(10),               -- so learners
    modalidade VARCHAR(100),         -- so learners
    objetivo VARCHAR(150),           -- schools: principal desafio | learners/professionals: principal objetivo
    certificacao VARCHAR(100),       -- legado, nao usado pelos formularios atuais
    tempo_experiencia VARCHAR(50),   -- so professionals
    mensagem TEXT                    -- texto livre, todos os tipos
);

CREATE INDEX IF NOT EXISTS idx_pre_matriculas_tipo ON public.pre_matriculas (tipo);
CREATE INDEX IF NOT EXISTS idx_pre_matriculas_created_at ON public.pre_matriculas (created_at DESC);

-- Idempotente: garante as colunas novas mesmo se a tabela ja existia de uma execucao anterior.
ALTER TABLE public.pre_matriculas ADD COLUMN IF NOT EXISTS idade VARCHAR(10);
ALTER TABLE public.pre_matriculas ADD COLUMN IF NOT EXISTS tempo_experiencia VARCHAR(50);
ALTER TABLE public.pre_matriculas ADD COLUMN IF NOT EXISTS mensagem TEXT;

-- ==============================================================================
-- TABELA 2: CONTATOS GERAIS (formulario da Home — duvida geral / atendimento personalizado)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.contatos_gerais (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    status VARCHAR(50) DEFAULT 'novo' NOT NULL,

    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    whatsapp VARCHAR(50) NOT NULL,
    mensagem TEXT
);

CREATE INDEX IF NOT EXISTS idx_contatos_gerais_created_at ON public.contatos_gerais (created_at DESC);

-- ==============================================================================
-- RLS
-- ==============================================================================
ALTER TABLE public.pre_matriculas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contatos_gerais ENABLE ROW LEVEL SECURITY;

-- Insercao publica permitida (formularios do site), leitura restrita a autenticados.
-- Nota: a API usa a service_role key (bypassa RLS) para leitura administrativa futura,
-- entao as policies de SELECT abaixo valem se algum dia existir um /admin com login real.
-- DROP + CREATE (em vez de so CREATE) para o script inteiro poder ser rodado de novo
-- sem erro de "policy already exists", caso voce ja tenha rodado uma versao anterior.
DROP POLICY IF EXISTS "Permitir envio publico de pre-matricula" ON public.pre_matriculas;
CREATE POLICY "Permitir envio publico de pre-matricula" ON public.pre_matriculas
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir envio publico de contato geral" ON public.contatos_gerais;
CREATE POLICY "Permitir envio publico de contato geral" ON public.contatos_gerais
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Usuario logado (Supabase Auth) pode ler apenas as pre-matriculas com o proprio e-mail,
-- usado pela area logada em /minha-area.
DROP POLICY IF EXISTS "Usuario le sua propria pre-matricula" ON public.pre_matriculas;
CREATE POLICY "Usuario le sua propria pre-matricula" ON public.pre_matriculas
  FOR SELECT TO authenticated USING (email = (auth.jwt() ->> 'email'));

-- ==============================================================================
-- TABELA 3: RESPOSTAS DO PLANO DE NEGOCIO (modulo /admin, questionario por abas)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.plano_negocio_respostas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_email VARCHAR(255) NOT NULL,
    question_id VARCHAR(150) NOT NULL,
    resposta TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (user_email, question_id)
);

CREATE INDEX IF NOT EXISTS idx_plano_negocio_user_email ON public.plano_negocio_respostas (user_email);

ALTER TABLE public.plano_negocio_respostas ENABLE ROW LEVEL SECURITY;

-- Cada usuario autenticado so le/grava/atualiza as proprias respostas (por e-mail do JWT).
-- Na pratica, so o Calebe tem conta admin, mas a policy ja fica correta para o caso de
-- outros admins existirem no futuro.
DROP POLICY IF EXISTS "Usuario le suas respostas do plano" ON public.plano_negocio_respostas;
CREATE POLICY "Usuario le suas respostas do plano" ON public.plano_negocio_respostas
  FOR SELECT TO authenticated USING (user_email = (auth.jwt() ->> 'email'));

DROP POLICY IF EXISTS "Usuario grava suas respostas do plano" ON public.plano_negocio_respostas;
CREATE POLICY "Usuario grava suas respostas do plano" ON public.plano_negocio_respostas
  FOR INSERT TO authenticated WITH CHECK (user_email = (auth.jwt() ->> 'email'));

DROP POLICY IF EXISTS "Usuario atualiza suas respostas do plano" ON public.plano_negocio_respostas;
CREATE POLICY "Usuario atualiza suas respostas do plano" ON public.plano_negocio_respostas
  FOR UPDATE TO authenticated USING (user_email = (auth.jwt() ->> 'email'));

-- ==============================================================================
-- TABELA 4: PREMISSAS DE CRESCIMENTO POR FRENTE (modulo /admin/financas)
-- Uma linha por frente (schools/learners/professionals) por usuario.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.plano_financas_premissas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_email VARCHAR(255) NOT NULL,
    frente VARCHAR(20) NOT NULL CHECK (frente IN ('schools','learners','professionals')),
    ano1_clientes NUMERIC(12,2) NOT NULL DEFAULT 0,             -- nº de escolas/alunos/professores no Ano 1
    ticket_medio_anual NUMERIC(12,2) NOT NULL DEFAULT 0,        -- receita media anual por cliente/aluno
    crescimento_clientes_pct NUMERIC(6,3) NOT NULL DEFAULT 0,   -- % a.a. de crescimento liquido de clientes
    reajuste_precos_pct NUMERIC(6,3) NOT NULL DEFAULT 0,        -- % a.a. de reajuste de ticket/mensalidade
    churn_retencao_pct NUMERIC(6,3),                            -- informativo (ex.: retencao anual de escolas)
    taxa_conversao_pct NUMERIC(6,3),                            -- informativo (ex.: conversao de leads em matricula)
    cac NUMERIC(12,2),                                          -- informativo (custo de aquisicao de cliente)
    observacoes TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (user_email, frente)
);

ALTER TABLE public.plano_financas_premissas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Usuario le suas premissas" ON public.plano_financas_premissas;
CREATE POLICY "Usuario le suas premissas" ON public.plano_financas_premissas
  FOR SELECT TO authenticated USING (user_email = (auth.jwt() ->> 'email'));
DROP POLICY IF EXISTS "Usuario grava suas premissas" ON public.plano_financas_premissas;
CREATE POLICY "Usuario grava suas premissas" ON public.plano_financas_premissas
  FOR INSERT TO authenticated WITH CHECK (user_email = (auth.jwt() ->> 'email'));
DROP POLICY IF EXISTS "Usuario atualiza suas premissas" ON public.plano_financas_premissas;
CREATE POLICY "Usuario atualiza suas premissas" ON public.plano_financas_premissas
  FOR UPDATE TO authenticated USING (user_email = (auth.jwt() ->> 'email'));

-- ==============================================================================
-- TABELA 5: ITENS DE CUSTO, fixo ou variavel (modulo /admin/financas)
-- Lista dinamica: o usuario adiciona/remove linhas livremente.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.plano_financas_custos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_email VARCHAR(255) NOT NULL,
    tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('fixo','variavel')),
    categoria VARCHAR(150) NOT NULL,               -- ex.: "Equipe pedagogica", "Comissao de vendas"
    valor_mensal NUMERIC(12,2) NOT NULL DEFAULT 0,     -- base mensal no Ano 1 (usado quando percentual_receita_pct e NULL)
    reajuste_anual_pct NUMERIC(6,3) NOT NULL DEFAULT 0,
    percentual_receita_pct NUMERIC(6,3),           -- alternativa: custo variavel como % da receita bruta anual (ex.: taxas Cambridge)
    ordem INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_plano_financas_custos_user_email ON public.plano_financas_custos (user_email);

ALTER TABLE public.plano_financas_custos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Usuario le seus custos" ON public.plano_financas_custos;
CREATE POLICY "Usuario le seus custos" ON public.plano_financas_custos
  FOR SELECT TO authenticated USING (user_email = (auth.jwt() ->> 'email'));
DROP POLICY IF EXISTS "Usuario grava seus custos" ON public.plano_financas_custos;
CREATE POLICY "Usuario grava seus custos" ON public.plano_financas_custos
  FOR INSERT TO authenticated WITH CHECK (user_email = (auth.jwt() ->> 'email'));
DROP POLICY IF EXISTS "Usuario atualiza seus custos" ON public.plano_financas_custos;
CREATE POLICY "Usuario atualiza seus custos" ON public.plano_financas_custos
  FOR UPDATE TO authenticated USING (user_email = (auth.jwt() ->> 'email'));
DROP POLICY IF EXISTS "Usuario apaga seus custos" ON public.plano_financas_custos;
CREATE POLICY "Usuario apaga seus custos" ON public.plano_financas_custos
  FOR DELETE TO authenticated USING (user_email = (auth.jwt() ->> 'email'));

-- ==============================================================================
-- TABELA 6: CONFIGURACAO GERAL DA PROJECAO FINANCEIRA (1 linha por usuario)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.plano_financas_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_email VARCHAR(255) NOT NULL UNIQUE,
    investimento_inicial NUMERIC(14,2) NOT NULL DEFAULT 0,
    aliquota_impostos_pct NUMERIC(6,3) NOT NULL DEFAULT 0,  -- opcional; 0 = DRE simplificado sem impostos
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.plano_financas_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Usuario le sua config financeira" ON public.plano_financas_config;
CREATE POLICY "Usuario le sua config financeira" ON public.plano_financas_config
  FOR SELECT TO authenticated USING (user_email = (auth.jwt() ->> 'email'));
DROP POLICY IF EXISTS "Usuario grava sua config financeira" ON public.plano_financas_config;
CREATE POLICY "Usuario grava sua config financeira" ON public.plano_financas_config
  FOR INSERT TO authenticated WITH CHECK (user_email = (auth.jwt() ->> 'email'));
DROP POLICY IF EXISTS "Usuario atualiza sua config financeira" ON public.plano_financas_config;
CREATE POLICY "Usuario atualiza sua config financeira" ON public.plano_financas_config
  FOR UPDATE TO authenticated USING (user_email = (auth.jwt() ->> 'email'));

-- ==============================================================================
-- TABELA 7: LINHAS DA PLANILHA DE CONTAS FINANCEIRA (modulo /admin/financas, v2)
-- Substitui o modelo de premissas por frente + custos avulsos das tabelas 4 e 5
-- por uma planilha de contas de verdade: cada linha e uma rubrica (receita, custo
-- fixo ou custo variavel), agrupada por macro-area, com valor digitado ano a ano
-- (2026 a 2031). As tabelas 4 e 5 continuam no banco mas nao sao mais usadas pelo
-- app; podem ser removidas depois de confirmado que ninguem mais depende delas.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.plano_financas_linhas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_email VARCHAR(255) NOT NULL,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('receita','custo_fixo','custo_variavel')),
    modo VARCHAR(20) NOT NULL DEFAULT 'valor' CHECK (modo IN ('valor','clientes_x_ticket','percentual_receita')),
    macro_area VARCHAR(150) NOT NULL,
    rubrica VARCHAR(200) NOT NULL,
    frente VARCHAR(20) CHECK (frente IN ('schools','learners','professionals','global')),
    ticket_medio NUMERIC(12,2),              -- usado quando modo = clientes_x_ticket
    reajuste_ticket_pct NUMERIC(6,3) DEFAULT 0,  -- reajuste anual do ticket, modo clientes_x_ticket
    percentual_receita_pct NUMERIC(6,3),     -- usado quando modo = percentual_receita
    valores_por_ano JSONB NOT NULL DEFAULT '{}'::jsonb,  -- chaves "2026".."2031": R$ (valor) ou clientes (clientes_x_ticket)
    ordem INTEGER NOT NULL DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_plano_financas_linhas_user_email ON public.plano_financas_linhas (user_email);

ALTER TABLE public.plano_financas_linhas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Usuario le suas linhas financeiras" ON public.plano_financas_linhas;
CREATE POLICY "Usuario le suas linhas financeiras" ON public.plano_financas_linhas
  FOR SELECT TO authenticated USING (user_email = (auth.jwt() ->> 'email'));
DROP POLICY IF EXISTS "Usuario grava suas linhas financeiras" ON public.plano_financas_linhas;
CREATE POLICY "Usuario grava suas linhas financeiras" ON public.plano_financas_linhas
  FOR INSERT TO authenticated WITH CHECK (user_email = (auth.jwt() ->> 'email'));
DROP POLICY IF EXISTS "Usuario atualiza suas linhas financeiras" ON public.plano_financas_linhas;
CREATE POLICY "Usuario atualiza suas linhas financeiras" ON public.plano_financas_linhas
  FOR UPDATE TO authenticated USING (user_email = (auth.jwt() ->> 'email'));
DROP POLICY IF EXISTS "Usuario apaga suas linhas financeiras" ON public.plano_financas_linhas;
CREATE POLICY "Usuario apaga suas linhas financeiras" ON public.plano_financas_linhas
  FOR DELETE TO authenticated USING (user_email = (auth.jwt() ->> 'email'));

-- Seed inicial das rubricas reais do Plano de Negocios 2027-2031 (estrutura pronta,
-- a maioria dos valores ainda vazia/zero para o Calebe preencher). So os 3 tickets
-- ja confirmados em documento oficial (schools, learners-cursos, learners-american
-- school) vem preenchidos; os demais ficam a definir.
INSERT INTO public.plano_financas_linhas (user_email, tipo, modo, macro_area, rubrica, frente, ticket_medio, reajuste_ticket_pct, ordem)
SELECT 'calebe@promiseenglish.com', v.tipo, v.modo, v.macro_area, v.rubrica, v.frente, v.ticket_medio, v.reajuste_ticket_pct, v.ordem
FROM (VALUES
  ('receita', 'clientes_x_ticket', 'Receita — Schools',       'Contratos escolares',                     'schools',       38000::numeric, 6::numeric, 1),
  ('receita', 'clientes_x_ticket', 'Receita — Learners',      'Cursos de inglês em turma',                'learners',       2750::numeric, 6::numeric, 2),
  ('receita', 'clientes_x_ticket', 'Receita — Learners',      'Aulas particulares (pacotes de 10 aulas)', 'learners',          0::numeric, 6::numeric, 3),
  ('receita', 'clientes_x_ticket', 'Receita — Learners',      'American School / Homeschooling',          'learners',      11000::numeric, 6::numeric, 4),
  ('receita', 'clientes_x_ticket', 'Receita — Professionals', 'Formação continuada, mentorias e certificações', 'professionals', 0::numeric, 6::numeric, 5),
  ('receita', 'clientes_x_ticket', 'Receita — Global',        'Intercâmbios, imersões e viagens acadêmicas', 'global',          0::numeric, 6::numeric, 6)
) AS v(tipo, modo, macro_area, rubrica, frente, ticket_medio, reajuste_ticket_pct, ordem)
WHERE NOT EXISTS (
  SELECT 1 FROM public.plano_financas_linhas existente
  WHERE existente.user_email = 'calebe@promiseenglish.com' AND existente.rubrica = v.rubrica AND existente.macro_area = v.macro_area
);

INSERT INTO public.plano_financas_linhas (user_email, tipo, modo, macro_area, rubrica, ordem)
SELECT 'calebe@promiseenglish.com', 'custo_fixo', 'valor', v.macro_area, v.rubrica, v.ordem
FROM (VALUES
  ('Pessoal e Gestão',       'Pró-labore Direção Executiva',              10),
  ('Pessoal e Gestão',       'Coordenação pedagógica (3 frentes)',        11),
  ('Pessoal e Gestão',       'Gerência administrativa e comercial',       12),
  ('Tecnologia e Marketing', 'Tecnologia, plataformas e dados',           13),
  ('Tecnologia e Marketing', 'Marketing — retainer e mídia base',         14),
  ('Administrativo',         'Administrativo, contábil e jurídico',       15),
  ('Administrativo',         'Site, domínio e infraestrutura',            16)
) AS v(macro_area, rubrica, ordem)
WHERE NOT EXISTS (
  SELECT 1 FROM public.plano_financas_linhas existente
  WHERE existente.user_email = 'calebe@promiseenglish.com' AND existente.rubrica = v.rubrica AND existente.macro_area = v.macro_area
);

INSERT INTO public.plano_financas_linhas (user_email, tipo, modo, macro_area, rubrica, frente, ordem)
SELECT 'calebe@promiseenglish.com', 'custo_variavel', 'valor', 'Custos variáveis por frente', v.rubrica, v.frente, v.ordem
FROM (VALUES
  ('Custos variáveis — Schools',       'schools',       20),
  ('Custos variáveis — Learners',      'learners',      21),
  ('Custos variáveis — Professionals', 'professionals', 22),
  ('Custos variáveis — Global',        'global',        23)
) AS v(rubrica, frente, ordem)
WHERE NOT EXISTS (
  SELECT 1 FROM public.plano_financas_linhas existente
  WHERE existente.user_email = 'calebe@promiseenglish.com' AND existente.rubrica = v.rubrica AND existente.macro_area = 'Custos variáveis por frente'
);

INSERT INTO public.plano_financas_linhas (user_email, tipo, modo, macro_area, rubrica, percentual_receita_pct, ordem)
SELECT 'calebe@promiseenglish.com', 'custo_variavel', 'percentual_receita', v.macro_area, v.rubrica, 0, v.ordem
FROM (VALUES
  ('Impostos',  'Impostos sobre serviços',   30),
  ('Marketing', 'Marketing de aquisição',    31)
) AS v(macro_area, rubrica, ordem)
WHERE NOT EXISTS (
  SELECT 1 FROM public.plano_financas_linhas existente
  WHERE existente.user_email = 'calebe@promiseenglish.com' AND existente.rubrica = v.rubrica AND existente.macro_area = v.macro_area
);
