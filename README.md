# Promise English

Site institucional da Promise Education Group — quatro frentes (Schools, Learners, Professionals, Global), área logada para alunos/famílias e um painel administrativo interno.

- **Produção:** https://promise-peach-eight.vercel.app
- **Deploy:** automático via Vercel a cada push na branch `main` (GitHub → Vercel)

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript |
| Estilo | CSS inline (`style={{}}`) + poucas classes utilitárias em `globals.css`; sem Tailwind |
| Backend/dados | Supabase (Postgres + Auth), acessado via `@supabase/ssr` (sessão de usuário) e `@supabase/supabase-js` (service role, só em rotas de servidor) |
| Export de dados | `xlsx` (SheetJS), usado no painel admin |
| Hospedagem | Vercel |

## Estrutura de pastas

```
src/
  app/                    rotas (App Router)
    page.tsx              Home
    quem-somos/            schools/  learners/  professionals/  global/
    login/                 area logada (aluno/família) — /minha-area
    minha-area/
    admin/                 painel interno (restrito por e-mail, ver src/lib/adminAuth.ts)
      login/
    api/
      contato/route.ts     insere em public.contatos_gerais
      matricula/route.ts   insere em public.pre_matriculas
    globals.css
    layout.tsx
  components/             componentes de UI reutilizáveis (flat, PascalCase)
  lib/
    supabase/
      client.ts           cliente Supabase para o browser (anon key)
      server.ts            cliente Supabase para Server Components/Route Handlers (anon key + cookies)
      admin.ts              cliente Supabase com service_role key — só server-side, nunca no browser
    adminAuth.ts           allowlist de e-mails com acesso a /admin
    planoNegocioQuestions.ts  perguntas do questionário do painel admin
  proxy.ts                middleware do Next (protege /minha-area e /admin)
public/
  assets/                 imagens do site
supabase_schema.sql       schema do banco (tabelas + RLS) — rodar manualmente no SQL Editor do Supabase
```

`docs/` e `design/` são pastas de trabalho local (fotos, PDFs, planilhas, prompts de imagem) — propositalmente fora do controle de versão (ver `.gitignore`).

## Setup local

```bash
npm install
cp .env.local.example .env.local   # preencher com as credenciais do projeto Supabase
npm run dev                        # http://localhost:3000
```

Variáveis de ambiente necessárias (`.env.local`, nunca commitado):

| Variável | Onde usar |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | cliente browser + server |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | cliente browser + server |
| `SUPABASE_SERVICE_ROLE_KEY` | só `src/lib/supabase/admin.ts` (rotas de API) — **nunca expor no browser** |

## Banco de dados (Supabase)

O schema completo (tabelas, índices, RLS) está em [`supabase_schema.sql`](./supabase_schema.sql). Não há CLI/migrations automatizadas — o arquivo é idempotente (`CREATE TABLE IF NOT EXISTS`, `DROP POLICY IF EXISTS` + `CREATE POLICY`) e deve ser colado manualmente no **SQL Editor** do projeto Supabase sempre que uma tabela nova for adicionada.

Tabelas:
- `pre_matriculas` — leads dos formulários de Schools/Learners/Professionals
- `contatos_gerais` — formulário de contato geral da Home
- `plano_negocio_respostas` — respostas do questionário no painel `/admin`

## Painel administrativo (`/admin`)

Área interna separada do site público (sem header/footer de marketing), com sidebar própria. Acesso restrito por e-mail — ver `ADMIN_EMAILS` em `src/lib/adminAuth.ts`. Autenticação via Supabase Auth (mesmo mecanismo do `/login` público, conta separada).

## Build e deploy

```bash
npm run build   # build de produção local (usado antes de cada push como checagem)
npm run lint
```

Push em `main` dispara o deploy automático na Vercel. Não há ambiente de staging — validar localmente (`npm run build` + teste manual) antes de subir mudanças.
