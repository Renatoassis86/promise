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
    cargo VARCHAR(150),
    empresa VARCHAR(255),   -- nome da escola (so schools)
    cidade VARCHAR(150),    -- so schools
    email VARCHAR(255) NOT NULL,
    whatsapp VARCHAR(50) NOT NULL,

    modalidade VARCHAR(100),     -- so learners
    objetivo VARCHAR(150),       -- so learners
    certificacao VARCHAR(100)    -- so professionals
);

CREATE INDEX IF NOT EXISTS idx_pre_matriculas_tipo ON public.pre_matriculas (tipo);
CREATE INDEX IF NOT EXISTS idx_pre_matriculas_created_at ON public.pre_matriculas (created_at DESC);

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
CREATE POLICY "Permitir envio publico de pre-matricula" ON public.pre_matriculas
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Permitir envio publico de contato geral" ON public.contatos_gerais
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Usuario logado (Supabase Auth) pode ler apenas as pre-matriculas com o proprio e-mail,
-- usado pela area logada em /minha-area.
CREATE POLICY "Usuario le sua propria pre-matricula" ON public.pre_matriculas
  FOR SELECT TO authenticated USING (email = (auth.jwt() ->> 'email'));
