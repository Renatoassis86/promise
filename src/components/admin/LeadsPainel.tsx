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

function EditIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.09c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.12.11-1.8-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.17-4.94-4.36-.14-.2-1.18-1.57-1.18-3s.75-2.13 1.02-2.42c.26-.29.58-.36.77-.36h.55c.18 0 .42-.03.65.5.24.57.8 1.98.87 2.12.07.15.12.32.02.51-.1.2-.15.32-.29.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.75 1.24 1.61 2.01 1.11.99 2.05 1.29 2.34 1.44.29.15.46.12.63-.07.17-.2.72-.84.91-1.13.19-.29.38-.24.63-.14.26.1 1.65.78 1.93.92.29.15.48.22.55.34.07.13.07.72-.17 1.4z" />
    </svg>
  );
}

function ActionButton({
  onClick,
  href,
  title,
  cor,
  children,
}: {
  onClick?: () => void;
  href?: string;
  title: string;
  cor: string;
  children: React.ReactNode;
}) {
  const style: React.CSSProperties = {
    width: 30,
    height: 30,
    borderRadius: 8,
    border: `1px solid ${cor}`,
    background: "#fff",
    color: cor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  };
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" title={title} style={style}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} title={title} style={style}>
      {children}
    </button>
  );
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
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, fontSize: 12.5 }}>
      <a href={`mailto:${email}`} style={{ color: "var(--ink-soft)" }}>
        {email}
      </a>
      {whatsapp && <span style={{ color: "var(--ink-soft)" }}>{whatsapp}</span>}
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

const fieldStyle: React.CSSProperties = {
  width: "100%",
  fontSize: 13,
  padding: "7px 10px",
  borderRadius: 8,
  border: "1px solid var(--line)",
  fontFamily: "inherit",
};

function EditField({ label, value, onChange, textarea }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 11, fontWeight: 700, color: "var(--ink-soft)" }}>
      {label}
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} style={{ ...fieldStyle, resize: "vertical" }} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} style={fieldStyle} />
      )}
    </label>
  );
}

function MatriculaCard({
  m,
  onStatusChange,
  onSave,
  onDelete,
}: {
  m: PreMatricula;
  onStatusChange: (id: string, status: string) => void;
  onSave: (id: string, patch: Partial<PreMatricula>) => void;
  onDelete: (id: string) => void;
}) {
  const tipo = TIPO_INFO[m.tipo] ?? { label: m.tipo, cor: "var(--ink)" };
  const [editando, setEditando] = useState(false);
  const [rascunho, setRascunho] = useState(m);
  const numero = soDigitos(m.whatsapp);

  function iniciarEdicao() {
    setRascunho(m);
    setEditando(true);
  }

  function salvar() {
    onSave(m.id, rascunho);
    setEditando(false);
  }

  if (editando) {
    return (
      <div className="card" style={{ padding: 18, borderTop: `4px solid ${tipo.cor}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 10 }}>
          <EditField label="Nome" value={rascunho.nome} onChange={(v) => setRascunho({ ...rascunho, nome: v })} />
          <EditField label="E-mail" value={rascunho.email} onChange={(v) => setRascunho({ ...rascunho, email: v })} />
          <EditField label="WhatsApp" value={rascunho.whatsapp} onChange={(v) => setRascunho({ ...rascunho, whatsapp: v })} />
          <EditField label="Cargo / responsável" value={rascunho.cargo ?? ""} onChange={(v) => setRascunho({ ...rascunho, cargo: v })} />
          <EditField label="Empresa / escola" value={rascunho.empresa ?? ""} onChange={(v) => setRascunho({ ...rascunho, empresa: v })} />
          <EditField label="Cidade" value={rascunho.cidade ?? ""} onChange={(v) => setRascunho({ ...rascunho, cidade: v })} />
          <EditField label="Idade" value={rascunho.idade ?? ""} onChange={(v) => setRascunho({ ...rascunho, idade: v })} />
          <EditField label="Modalidade" value={rascunho.modalidade ?? ""} onChange={(v) => setRascunho({ ...rascunho, modalidade: v })} />
          <EditField label="Objetivo" value={rascunho.objetivo ?? ""} onChange={(v) => setRascunho({ ...rascunho, objetivo: v })} />
          <EditField label="Experiência" value={rascunho.tempo_experiencia ?? ""} onChange={(v) => setRascunho({ ...rascunho, tempo_experiencia: v })} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <EditField label="Mensagem" value={rascunho.mensagem ?? ""} onChange={(v) => setRascunho({ ...rascunho, mensagem: v })} textarea />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={salvar} className="pill pill-red" style={{ border: "none", cursor: "pointer", fontSize: 13, padding: "8px 18px" }}>
            Salvar
          </button>
          <button
            onClick={() => setEditando(false)}
            style={{ border: "1px solid var(--line)", background: "#fff", color: "var(--ink-soft)", borderRadius: 999, cursor: "pointer", fontSize: 13, padding: "8px 18px" }}
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

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
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <StatusSelect value={m.status} onChange={(v) => onStatusChange(m.id, v)} />
          {numero && (
            <ActionButton href={`https://wa.me/55${numero}`} title="Falar no WhatsApp" cor="var(--blue)">
              <WhatsAppIcon />
            </ActionButton>
          )}
          <ActionButton onClick={iniciarEdicao} title="Editar" cor="var(--ink-soft)">
            <EditIcon />
          </ActionButton>
          <ActionButton onClick={() => onDelete(m.id)} title="Excluir" cor="var(--red)">
            <TrashIcon />
          </ActionButton>
        </div>
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

function ContatoCard({
  c,
  onStatusChange,
  onSave,
  onDelete,
}: {
  c: ContatoGeral;
  onStatusChange: (id: string, status: string) => void;
  onSave: (id: string, patch: Partial<ContatoGeral>) => void;
  onDelete: (id: string) => void;
}) {
  const [editando, setEditando] = useState(false);
  const [rascunho, setRascunho] = useState(c);
  const numero = soDigitos(c.whatsapp);

  function iniciarEdicao() {
    setRascunho(c);
    setEditando(true);
  }

  function salvar() {
    onSave(c.id, rascunho);
    setEditando(false);
  }

  if (editando) {
    return (
      <div className="card" style={{ padding: 18, borderTop: "4px solid var(--ink)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 10 }}>
          <EditField label="Nome" value={rascunho.nome} onChange={(v) => setRascunho({ ...rascunho, nome: v })} />
          <EditField label="E-mail" value={rascunho.email} onChange={(v) => setRascunho({ ...rascunho, email: v })} />
          <EditField label="WhatsApp" value={rascunho.whatsapp} onChange={(v) => setRascunho({ ...rascunho, whatsapp: v })} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <EditField label="Mensagem" value={rascunho.mensagem ?? ""} onChange={(v) => setRascunho({ ...rascunho, mensagem: v })} textarea />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={salvar} className="pill pill-red" style={{ border: "none", cursor: "pointer", fontSize: 13, padding: "8px 18px" }}>
            Salvar
          </button>
          <button
            onClick={() => setEditando(false)}
            style={{ border: "1px solid var(--line)", background: "#fff", color: "var(--ink-soft)", borderRadius: 999, cursor: "pointer", fontSize: 13, padding: "8px 18px" }}
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: 18, borderTop: "4px solid var(--ink)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginBottom: 4 }}>{formatData(c.created_at)}</div>
          <div style={{ fontWeight: 800, fontSize: 15.5, color: "var(--ink)" }}>{c.nome}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <StatusSelect value={c.status} onChange={(v) => onStatusChange(c.id, v)} />
          {numero && (
            <ActionButton href={`https://wa.me/55${numero}`} title="Falar no WhatsApp" cor="var(--blue)">
              <WhatsAppIcon />
            </ActionButton>
          )}
          <ActionButton onClick={iniciarEdicao} title="Editar" cor="var(--ink-soft)">
            <EditIcon />
          </ActionButton>
          <ActionButton onClick={() => onDelete(c.id)} title="Excluir" cor="var(--red)">
            <TrashIcon />
          </ActionButton>
        </div>
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

  async function salvarMatricula(id: string, patch: Partial<PreMatricula>) {
    setMatriculas((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));
    const supabase = createClient();
    const { id: _id, created_at: _created, status: _status, tipo: _tipo, ...campos } = patch;
    await supabase.from("pre_matriculas").update(campos).eq("id", id);
  }

  async function salvarContato(id: string, patch: Partial<ContatoGeral>) {
    setContatos((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
    const supabase = createClient();
    const { id: _id, created_at: _created, status: _status, ...campos } = patch;
    await supabase.from("contatos_gerais").update(campos).eq("id", id);
  }

  async function excluirMatricula(id: string) {
    if (!window.confirm("Excluir esta pré-matrícula? Essa ação não pode ser desfeita.")) return;
    setMatriculas((prev) => prev.filter((m) => m.id !== id));
    const supabase = createClient();
    await supabase.from("pre_matriculas").delete().eq("id", id);
  }

  async function excluirContato(id: string) {
    if (!window.confirm("Excluir este contato? Essa ação não pode ser desfeita.")) return;
    setContatos((prev) => prev.filter((c) => c.id !== id));
    const supabase = createClient();
    await supabase.from("contatos_gerais").delete().eq("id", id);
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
              <MatriculaCard key={m.id} m={m} onStatusChange={atualizarStatusMatricula} onSave={salvarMatricula} onDelete={excluirMatricula} />
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
              <ContatoCard key={c.id} c={c} onStatusChange={atualizarStatusContato} onSave={salvarContato} onDelete={excluirContato} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
