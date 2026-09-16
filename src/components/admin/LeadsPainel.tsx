"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export interface PreMatricula {
  id: string;
  created_at: string;
  status: string;
  tipo: "schools" | "learners" | "professionals";
  nome: string;
  cargo: string | null;
  empresa: string | null;
  cidade: string | null;
  email: string;
  whatsapp: string;
  idade: string | null;
  modalidade: string | null;
  objetivo: string | null;
  tempo_experiencia: string | null;
  mensagem: string | null;
}

export interface ContatoGeral {
  id: string;
  created_at: string;
  status: string;
  nome: string;
  email: string;
  whatsapp: string;
  mensagem: string | null;
}

const TIPO_INFO: Record<PreMatricula["tipo"], { label: string; cor: string }> = {
  schools: { label: "Schools", cor: "var(--blue)" },
  learners: { label: "Learners", cor: "var(--red)" },
  professionals: { label: "Professionals", cor: "var(--orange)" },
};

const STATUS_OPTIONS: { value: string; label: string; cor: string }[] = [
  { value: "novo", label: "Novo", cor: "var(--red)" },
  { value: "em_contato", label: "Em contato", cor: "var(--orange)" },
  { value: "convertido", label: "Convertido", cor: "var(--blue)" },
  { value: "descartado", label: "Descartado", cor: "var(--ink-soft)" },
];

function statusInfo(value: string) {
  return STATUS_OPTIONS.find((s) => s.value === value) ?? STATUS_OPTIONS[0];
}

function formatData(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }) + " às " + d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function soDigitos(v: string): string {
  return v.replace(/\D/g, "");
}

function StatusSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const info = statusInfo(value);
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        fontSize: 12,
        fontWeight: 700,
        color: info.cor,
        background: "#fff",
        border: `1.5px solid ${info.cor}`,
        borderRadius: 999,
        padding: "5px 12px",
        cursor: "pointer",
      }}
    >
      {STATUS_OPTIONS.map((s) => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
    </select>
  );
}

function ContactLinks({ email, whatsapp }: { email: string; whatsapp: string }) {
  const numero = soDigitos(whatsapp);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, fontSize: 12.5 }}>
      <a href={`mailto:${email}`} style={{ color: "var(--ink-soft)" }}>
        {email}
      </a>
      {numero && (
        <a href={`https://wa.me/55${numero}`} target="_blank" rel="noreferrer" style={{ color: "var(--red)", fontWeight: 700 }}>
          {whatsapp} · WhatsApp
        </a>
      )}
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  if (!children) return null;
  return (
    <span style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-soft)", background: "var(--tint)", borderRadius: 999, padding: "3px 10px" }}>
      {children}
    </span>
  );
}

function MatriculaCard({ m, onStatusChange }: { m: PreMatricula; onStatusChange: (id: string, status: string) => void }) {
  const tipo = TIPO_INFO[m.tipo] ?? { label: m.tipo, cor: "var(--ink)" };
  return (
    <div className="card" style={{ padding: 18, borderTop: `4px solid ${tipo.cor}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 10 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: tipo.cor }}>{tipo.label}</span>
            <span style={{ fontSize: 11.5, color: "var(--ink-soft)" }}>{formatData(m.created_at)}</span>
          </div>
          <div style={{ fontWeight: 800, fontSize: 15.5, color: "var(--ink)" }}>{m.nome}</div>
        </div>
        <StatusSelect value={m.status} onChange={(v) => onStatusChange(m.id, v)} />
      </div>
      <div style={{ marginBottom: 10 }}>
        <ContactLinks email={m.email} whatsapp={m.whatsapp} />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: m.mensagem ? 10 : 0 }}>
        {m.empresa && <Tag>{m.empresa}</Tag>}
        {m.cargo && <Tag>{m.cargo}</Tag>}
        {m.cidade && <Tag>{m.cidade}</Tag>}
        {m.idade && <Tag>{m.idade} anos</Tag>}
        {m.modalidade && <Tag>{m.modalidade}</Tag>}
        {m.tempo_experiencia && <Tag>{m.tempo_experiencia}</Tag>}
        {m.objetivo && <Tag>{m.objetivo}</Tag>}
      </div>
      {m.mensagem && <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "var(--ink-soft)" }}>{m.mensagem}</p>}
    </div>
  );
}

function ContatoCard({ c, onStatusChange }: { c: ContatoGeral; onStatusChange: (id: string, status: string) => void }) {
  return (
    <div className="card" style={{ padding: 18, borderTop: "4px solid var(--ink)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginBottom: 4 }}>{formatData(c.created_at)}</div>
          <div style={{ fontWeight: 800, fontSize: 15.5, color: "var(--ink)" }}>{c.nome}</div>
        </div>
        <StatusSelect value={c.status} onChange={(v) => onStatusChange(c.id, v)} />
      </div>
      <div style={{ marginBottom: c.mensagem ? 10 : 0 }}>
        <ContactLinks email={c.email} whatsapp={c.whatsapp} />
      </div>
      {c.mensagem && <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "var(--ink-soft)" }}>{c.mensagem}</p>}
    </div>
  );
}

export default function LeadsPainel({
  matriculasIniciais,
  contatosIniciais,
}: {
  matriculasIniciais: PreMatricula[];
  contatosIniciais: ContatoGeral[];
}) {
  const [matriculas, setMatriculas] = useState(matriculasIniciais);
  const [contatos, setContatos] = useState(contatosIniciais);
  const [filtroTipo, setFiltroTipo] = useState<"todas" | PreMatricula["tipo"]>("todas");

  const matriculasFiltradas = useMemo(
    () => (filtroTipo === "todas" ? matriculas : matriculas.filter((m) => m.tipo === filtroTipo)),
    [matriculas, filtroTipo]
  );

  async function atualizarStatusMatricula(id: string, status: string) {
    setMatriculas((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
    const supabase = createClient();
    await supabase.from("pre_matriculas").update({ status }).eq("id", id);
  }

  async function atualizarStatusContato(id: string, status: string) {
    setContatos((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
    const supabase = createClient();
    await supabase.from("contatos_gerais").update({ status }).eq("id", id);
  }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--ink)", margin: "0 0 6px" }}>Leads e Contatos</h1>
        <p style={{ margin: 0, fontSize: 13.5, color: "var(--ink-soft)", maxWidth: 640 }}>
          Pré-matrículas e mensagens de contato enviadas pelos formulários do site, em ordem do mais recente para o mais antigo. Mude o status
          conforme for entrando em contato.
        </p>
      </div>

      <section style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
          <h2 style={{ fontSize: 15, fontWeight: 800, color: "var(--ink)", margin: 0 }}>
            Pré-matrículas <span style={{ color: "var(--ink-soft)", fontWeight: 600 }}>({matriculasFiltradas.length})</span>
          </h2>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {(["todas", "schools", "learners", "professionals"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFiltroTipo(t)}
                className="admin-tab"
                style={{
                  fontSize: 12.5,
                  fontWeight: 700,
                  padding: "7px 14px",
                  borderRadius: 999,
                  border: `1px solid ${filtroTipo === t ? "var(--blue)" : "var(--line)"}`,
                  background: filtroTipo === t ? "var(--blue)" : "#fff",
                  color: filtroTipo === t ? "#fff" : "var(--ink-soft)",
                  cursor: "pointer",
                }}
              >
                {t === "todas" ? "Todas" : TIPO_INFO[t].label}
              </button>
            ))}
          </div>
        </div>

        {matriculasFiltradas.length === 0 ? (
          <div className="card" style={{ padding: 24, textAlign: "center", color: "var(--ink-soft)", fontSize: 13.5 }}>
            Nenhuma pré-matrícula {filtroTipo !== "todas" ? `de ${TIPO_INFO[filtroTipo].label}` : ""} por aqui ainda.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {matriculasFiltradas.map((m) => (
              <MatriculaCard key={m.id} m={m} onStatusChange={atualizarStatusMatricula} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 style={{ fontSize: 15, fontWeight: 800, color: "var(--ink)", margin: "0 0 16px" }}>
          Contatos gerais <span style={{ color: "var(--ink-soft)", fontWeight: 600 }}>({contatos.length})</span>
        </h2>
        {contatos.length === 0 ? (
          <div className="card" style={{ padding: 24, textAlign: "center", color: "var(--ink-soft)", fontSize: 13.5 }}>
            Nenhuma mensagem pelo formulário de contato geral ainda.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {contatos.map((c) => (
              <ContatoCard key={c.id} c={c} onStatusChange={atualizarStatusContato} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
