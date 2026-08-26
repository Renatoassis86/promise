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
