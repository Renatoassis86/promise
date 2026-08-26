"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { PLANO_NEGOCIO_SECOES } from "@/lib/planoNegocioQuestions";

type SaveStatus = "idle" | "saving" | "saved" | "error";

const SIDEBAR_WIDTH = 268;

export default function PlanoNegocioForm({ userEmail, respostasIniciais }: { userEmail: string; respostasIniciais: Record<string, string> }) {
  const router = useRouter();
  const [activeSecao, setActiveSecao] = useState(PLANO_NEGOCIO_SECOES[0].id);
  const [respostas, setRespostas] = useState<Record<string, string>>(respostasIniciais);
  const [status, setStatus] = useState<Record<string, SaveStatus>>({});
  const [exportando, setExportando] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const totalPerguntas = useMemo(
    () => PLANO_NEGOCIO_SECOES.reduce((acc, s) => acc + s.subsecoes.reduce((a2, sub) => a2 + sub.perguntas.length, 0), 0),
    []
  );
  const totalRespondidas = useMemo(
    () => Object.values(respostas).filter((v) => v && v.trim().length > 0).length,
    [respostas]
  );

  const secaoAtual = PLANO_NEGOCIO_SECOES.find((s) => s.id === activeSecao)!;

  function handleChange(questionId: string, value: string) {
    setRespostas((prev) => ({ ...prev, [questionId]: value }));
  }

  async function handleSave(questionId: string) {
    setStatus((prev) => ({ ...prev, [questionId]: "saving" }));
    const supabase = createClient();
    const { error } = await supabase
      .from("plano_negocio_respostas")
      .upsert(
        { user_email: userEmail, question_id: questionId, resposta: respostas[questionId] ?? "", updated_at: new Date().toISOString() },
        { onConflict: "user_email,question_id" }
      );
    setStatus((prev) => ({ ...prev, [questionId]: error ? "error" : "saved" }));
    if (!error) {
      setTimeout(() => {
        setStatus((prev) => (prev[questionId] === "saved" ? { ...prev, [questionId]: "idle" } : prev));
      }, 1800);
    }
  }

  async function handleExport() {
    setExportando(true);
    const XLSX = await import("xlsx");
    const wb = XLSX.utils.book_new();

    for (const secao of PLANO_NEGOCIO_SECOES) {
      const rows: (string | undefined)[][] = [["Pergunta-chave", "Ação", "Resposta"]];
      for (const sub of secao.subsecoes) {
        if (sub.titulo) rows.push([sub.titulo]);
        for (const p of sub.perguntas) {
          rows.push([p.pergunta, p.acao ?? "", respostas[p.id] ?? ""]);
        }
      }
      const ws = XLSX.utils.aoa_to_sheet(rows);
      ws["!cols"] = [{ wch: 55 }, { wch: 55 }, { wch: 60 }];
      const nomeAba = secao.titulo.slice(0, 31);
      XLSX.utils.book_append_sheet(wb, ws, nomeAba);
    }

    XLSX.writeFile(wb, "plano-de-negocio-promise.xlsx");
    setExportando(false);
  }

  async function handleLogout() {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-shell" style={{ display: "flex", minHeight: "100vh", background: "var(--tint)" }}>
      {/* SIDEBAR */}
      <aside className="admin-sidebar" style={{ width: SIDEBAR_WIDTH, flexShrink: 0, background: "var(--ink)", color: "#fff", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh" }}>
        <div className="admin-sidebar-header" style={{ padding: "26px 24px 20px" }}>
          <div style={{ fontWeight: 800, fontSize: 15 }}>Promise English</div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#8A93AE", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>Painel administrativo</div>
        </div>

        <nav className="admin-sidebar-nav" style={{ flex: 1, overflowY: "auto", padding: "8px 12px" }}>
          <div className="admin-sidebar-nav-label" style={{ padding: "10px 12px 8px", fontSize: 11, fontWeight: 700, color: "#6B7390", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Plano de Negócio
          </div>
          {PLANO_NEGOCIO_SECOES.map((s) => {
            const perguntasSecao = s.subsecoes.reduce((a, sub) => a + sub.perguntas.length, 0);
            const respondidasSecao = s.subsecoes.reduce(
              (a, sub) => a + sub.perguntas.filter((p) => respostas[p.id] && respostas[p.id].trim().length > 0).length,
              0
            );
            const isActive = activeSecao === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSecao(s.id)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 8,
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  background: isActive ? "rgba(255,255,255,.08)" : "transparent",
                  color: isActive ? "#fff" : "#B8BCC8",
                  fontWeight: isActive ? 700 : 600,
                  fontSize: 13.5,
                  marginBottom: 2,
                }}
              >
                <span>{s.titulo}</span>
                <span style={{ fontSize: 10.5, fontWeight: 700, color: respondidasSecao === perguntasSecao ? "var(--blue)" : "#6B7390", flexShrink: 0 }}>
                  {respondidasSecao}/{perguntasSecao}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer" style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,.1)" }}>
          <div className="admin-sidebar-email" style={{ fontSize: 12, color: "#8A93AE", marginBottom: 12, wordBreak: "break-all" }}>{userEmail}</div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            style={{ width: "100%", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.14)", borderRadius: 8, padding: "9px 0", fontSize: 13, fontWeight: 700, color: "#fff", cursor: loggingOut ? "default" : "pointer" }}
          >
            {loggingOut ? "Saindo..." : "Sair"}
          </button>
        </div>
      </aside>

      {/* CONTEUDO */}
      <main className="admin-main" style={{ flex: 1, padding: "40px 48px 90px", minWidth: 0 }}>
        <div style={{ maxWidth: 860 }}>
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 800 }}>{secaoAtual.titulo}</h1>
            <p style={{ margin: 0, fontSize: 13.5, color: "var(--ink-soft)" }}>Responda item a item. Suas respostas são salvas automaticamente ao sair do campo.</p>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 140, height: 8, borderRadius: 999, background: "var(--line)", overflow: "hidden" }}>
                <div style={{ width: `${(totalRespondidas / totalPerguntas) * 100}%`, height: "100%", background: "var(--blue)", transition: "width .3s" }} />
              </div>
              <span style={{ fontSize: 12.5, color: "var(--ink-soft)", fontWeight: 600 }}>
                {totalRespondidas} / {totalPerguntas} respondidas
              </span>
            </div>
            <button
              onClick={handleExport}
              disabled={exportando}
              className="pill"
              style={{ background: "var(--blue)", color: "#fff", fontSize: 13.5, padding: "10px 18px", border: "none", cursor: exportando ? "default" : "pointer", opacity: exportando ? 0.7 : 1 }}
            >
              {exportando ? "Gerando..." : "Exportar Excel"}
            </button>
          </div>

          {secaoAtual.intro && (
            <p style={{ margin: "0 0 24px", fontSize: 13.5, lineHeight: 1.6, color: "var(--ink-soft)", background: "#fff", border: "1px solid var(--line)", padding: "14px 18px", borderRadius: 12 }}>
              {secaoAtual.intro}
            </p>
          )}

          {secaoAtual.subsecoes.map((sub, i) => (
            <div key={i} style={{ marginBottom: 32 }}>
              {sub.titulo && <h3 style={{ fontSize: 15, fontWeight: 800, color: "var(--blue)", margin: "0 0 16px" }}>{sub.titulo}</h3>}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {sub.perguntas.map((p) => (
                  <div key={p.id} style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 14, padding: 20 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: p.acao ? 4 : 10 }}>{p.pergunta}</div>
                    {p.acao && <p style={{ margin: "0 0 10px", fontSize: 12.5, color: "var(--ink-soft)", fontStyle: "italic" }}>{p.acao}</p>}
                    <textarea
                      value={respostas[p.id] ?? ""}
                      onChange={(e) => handleChange(p.id, e.target.value)}
                      onBlur={() => handleSave(p.id)}
                      rows={4}
                      placeholder="Digite sua resposta..."
                      style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid var(--line)", fontSize: 14, fontFamily: "inherit", resize: "vertical" }}
                    />
                    <div style={{ height: 16, marginTop: 4, fontSize: 12, fontWeight: 600 }}>
                      {status[p.id] === "saving" && <span style={{ color: "var(--ink-soft)" }}>Salvando...</span>}
                      {status[p.id] === "saved" && <span style={{ color: "var(--blue)" }}>Salvo</span>}
                      {status[p.id] === "error" && <span style={{ color: "var(--red)" }}>Erro ao salvar, tente de novo</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
