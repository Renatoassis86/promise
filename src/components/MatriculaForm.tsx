"use client";

import { useState } from "react";

type Tipo = "schools" | "learners" | "professionals";

const FIELDS: Record<Tipo, { key: string; label: string; placeholder?: string; type?: "select"; options?: string[] }[]> = {
  schools: [
    { key: "nome", label: "Nome do responsável", placeholder: "Seu nome completo" },
    { key: "cargo", label: "Cargo", placeholder: "Diretor, coordenador..." },
    { key: "empresa", label: "Nome da escola", placeholder: "Nome da instituição" },
    { key: "cidade", label: "Cidade / UF", placeholder: "João Pessoa - PB" },
    { key: "email", label: "E-mail", placeholder: "voce@escola.com.br" },
    { key: "whatsapp", label: "WhatsApp", placeholder: "(00) 00000-0000" },
  ],
  learners: [
    { key: "nome", label: "Nome do aluno", placeholder: "Nome completo" },
    { key: "cargo", label: "Nome do responsável (se menor de idade)", placeholder: "Opcional" },
    { key: "email", label: "E-mail", placeholder: "voce@email.com" },
    { key: "whatsapp", label: "WhatsApp", placeholder: "(00) 00000-0000" },
    { key: "modalidade", label: "Modalidade de interesse", type: "select", options: ["Turmas", "Particular", "Ainda não sei"] },
    { key: "objetivo", label: "Objetivo principal", type: "select", options: ["Inglês geral", "Certificação internacional", "High School americano", "Intercâmbio"] },
  ],
  professionals: [
    { key: "nome", label: "Nome completo", placeholder: "Seu nome" },
    { key: "cargo", label: "Cargo / função atual", placeholder: "Professor, coordenador..." },
    { key: "email", label: "E-mail", placeholder: "voce@email.com" },
    { key: "whatsapp", label: "WhatsApp", placeholder: "(00) 00000-0000" },
    { key: "certificacao", label: "Certificação de interesse", type: "select", options: ["TKT", "CELTA", "DELTA", "Ainda não sei, quero orientação"] },
  ],
};

const TITLES: Record<Tipo, { eyebrow: string; heading: string; sub: string; cta: string }> = {
  schools: {
    eyebrow: "Diagnóstico institucional gratuito",
    heading: "Agendar conversa com o fundador",
    sub: "Preencha e o Calebe entra em contato para agendar a conversa.",
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
            <div key={f.key} className="field" style={f.type === "select" && config.length % 2 !== 0 ? {} : {}}>
              <label>{f.label}</label>
              {f.type === "select" ? (
                <select value={values[f.key] ?? ""} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}>
                  <option value="" disabled>Selecione</option>
                  {f.options?.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  value={values[f.key] ?? ""}
                  onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                  placeholder={f.placeholder}
                  required={f.key === "nome" || f.key === "email" || f.key === "whatsapp"}
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
