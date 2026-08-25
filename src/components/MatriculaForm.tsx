"use client";

import { useState } from "react";

type Tipo = "schools" | "learners" | "professionals";
type FieldType = "select" | "textarea" | "number";

const FIELDS: Record<Tipo, { key: string; label: string; placeholder?: string; type?: FieldType; options?: string[]; full?: boolean; required?: boolean }[]> = {
  schools: [
    { key: "nome", label: "Nome do responsável", placeholder: "Seu nome completo", required: true },
    { key: "cargo", label: "Cargo", placeholder: "Diretor(a), coordenador(a)..." },
    { key: "empresa", label: "Nome da escola", placeholder: "Nome da instituição", required: true },
    { key: "cidade", label: "Cidade / UF", placeholder: "João Pessoa - PB" },
    { key: "email", label: "E-mail institucional", placeholder: "voce@escola.com.br", required: true },
    { key: "whatsapp", label: "WhatsApp", placeholder: "(00) 00000-0000", required: true },
    {
      key: "objetivo",
      label: "Principal desafio da sua escola hoje?",
      type: "select",
      full: true,
      required: true,
      options: ["Implementação do inglês", "Formação de professores", "Currículo", "Avaliação", "Certificações internacionais", "Internacionalização", "Gestão do departamento", "Outro"],
    },
    { key: "mensagem", label: "Conte brevemente sobre o momento da escola", type: "textarea", full: true, placeholder: "Quais objetivos, desafios ou mudanças vocês estão considerando?" },
  ],
  learners: [
    { key: "nome", label: "Nome do aluno", placeholder: "Nome completo", required: true },
    { key: "idade", label: "Idade", type: "number", placeholder: "Idade", required: true },
    { key: "cargo", label: "Nome do responsável (se menor de idade)", placeholder: "Opcional" },
    { key: "whatsapp", label: "WhatsApp", placeholder: "(00) 00000-0000", required: true },
    { key: "email", label: "E-mail", placeholder: "voce@email.com", full: true, required: true },
    {
      key: "objetivo",
      label: "Qual é o objetivo principal?",
      type: "select",
      full: true,
      required: true,
      options: ["Aprender inglês", "Preparar para Cambridge", "Programa para homeschool", "American School", "Planejar estudos no exterior", "Viagem, intercâmbio ou experiência internacional", "Ainda não sei, quero orientação"],
    },
    { key: "mensagem", label: "Conte um pouco sobre o estudante", type: "textarea", full: true, placeholder: "Nível atual de inglês, objetivos, escola, planos internacionais etc." },
  ],
  professionals: [
    { key: "nome", label: "Nome completo", placeholder: "Seu nome", required: true },
    { key: "cargo", label: "Cargo / função atual", type: "select", required: true, options: ["Professor", "Coordenador", "Líder educacional", "Gestor escolar", "Outro"] },
    { key: "email", label: "E-mail", placeholder: "voce@email.com", required: true },
    { key: "whatsapp", label: "WhatsApp", placeholder: "(00) 00000-0000", required: true },
    { key: "tempo_experiencia", label: "Tempo de experiência", type: "select", options: ["Estou começando", "1–3 anos", "4–7 anos", "8–14 anos", "15+ anos"] },
    {
      key: "objetivo",
      label: "Principal objetivo",
      type: "select",
      full: true,
      required: true,
      options: ["Formação continuada", "Workshop", "Curso livre", "Mentoria", "Preparação TKT", "Preparação CELTA", "Preparação DELTA", "Formação para coordenadores", "Desenvolvimento de liderança", "Consultoria para gestor escolar", "Desenvolvimento institucional", "Ainda não sei, quero orientação"],
    },
    { key: "mensagem", label: "Conte um pouco sobre seu objetivo", type: "textarea", full: true, placeholder: "Qual é seu momento profissional? O que você gostaria de desenvolver?" },
  ],
};

const TITLES: Record<Tipo, { eyebrow: string; heading: string; sub: string; cta: string }> = {
  schools: {
    eyebrow: "Diagnóstico institucional gratuito",
    heading: "Agendar conversa com um consultor",
    sub: "Preencha e um consultor entra em contato para agendar a conversa.",
    cta: "Solicitar diagnóstico",
  },
  learners: {
    eyebrow: "Matricule-se já",
    heading: "Garanta sua vaga",
    sub: "Preencha pra receber o teste de nivelamento gratuito e falar com a equipe.",
    cta: "Fazer pré-matrícula",
  },
  professionals: {
    eyebrow: "Matricule-se já",
    heading: "Garantir vaga na próxima turma",
    sub: "Preencha e um mentor entra em contato pra indicar a certificação certa pra você.",
    cta: "Enviar pré-inscrição",
  },
};

export default function MatriculaForm({ tipo }: { tipo: Tipo }) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [values, setValues] = useState<Record<string, string>>({});
  const config = FIELDS[tipo];
  const titles = TITLES[tipo];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/matricula", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo, ...values }),
      });
      const data = await res.json();
      setStatus(data.success ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
          {tipo === "schools" ? "Recebemos sua solicitação." : "Recebemos sua pré-matrícula."}
        </div>
        <p style={{ margin: 0, color: "var(--ink-soft)", fontSize: 14 }}>A gente entra em contato em breve pelo WhatsApp ou e-mail.</p>
      </div>
    );
  }

  return (
    <div id="matricula" style={{ maxWidth: 760, margin: "0 auto", background: "#fff", border: "1px solid var(--line)", borderRadius: 18, padding: 44 }}>
      <div className="eyebrow" style={{ color: "var(--red)", marginBottom: 10 }}>{titles.eyebrow}</div>
      <h2 style={{ margin: "0 0 8px", fontSize: 24, fontWeight: 800 }}>{titles.heading}</h2>
      <p style={{ margin: "0 0 28px", fontSize: 14.5, color: "var(--ink-soft)" }}>{titles.sub}</p>

      <form onSubmit={handleSubmit}>
        <div className="grid-mobile-1" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 18 }}>
          {config.map((f) => (
            <div key={f.key} className="field" style={f.full ? { gridColumn: "1 / -1" } : {}}>
              <label>{f.label}</label>
              {f.type === "select" ? (
                <select value={values[f.key] ?? ""} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} required={f.required}>
                  <option value="" disabled>Selecione</option>
                  {f.options?.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : f.type === "textarea" ? (
                <textarea
                  rows={3}
                  value={values[f.key] ?? ""}
                  onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                  placeholder={f.placeholder}
                  required={f.required}
                />
              ) : (
                <input
                  type={f.type === "number" ? "number" : f.key === "email" ? "email" : "text"}
                  min={f.type === "number" ? 2 : undefined}
                  max={f.type === "number" ? 80 : undefined}
                  value={values[f.key] ?? ""}
                  onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                  placeholder={f.placeholder}
                  required={f.required}
                />
              )}
            </div>
          ))}
        </div>
        {status === "error" && (
          <div style={{ fontSize: 13, color: "var(--red)", marginTop: 12 }}>Não deu pra enviar agora. Tenta de novo ou chama no WhatsApp.</div>
        )}
        <button type="submit" disabled={status === "loading"} className="pill pill-red" style={{ width: "100%", justifyContent: "center", marginTop: 24 }}>
          {status === "loading" ? "Enviando..." : titles.cta}
        </button>
      </form>
    </div>
  );
}
