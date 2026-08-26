"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { PLANO_NEGOCIO_SECOES } from "@/lib/planoNegocioQuestions";

type SaveStatus = "idle" | "saving" | "saved" | "error";

export default function PlanoNegocioForm({ userEmail, respostasIniciais }: { userEmail: string; respostasIniciais: Record<string, string> }) {
  const [activeSecao, setActiveSecao] = useState(PLANO_NEGOCIO_SECOES[0].id);
  const [respostas, setRespostas] = useState<Record<string, string>>(respostasIniciais);
  const [status, setStatus] = useState<Record<string, SaveStatus>>({});
  const [exportando, setExportando] = useState(false);

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

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
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

      <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4, marginBottom: 24, borderBottom: "1px solid var(--line)" }}>
        {PLANO_NEGOCIO_SECOES.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSecao(s.id)}
            style={{
              flexShrink: 0,
              padding: "10px 16px",
              borderRadius: "10px 10px 0 0",
              border: "none",
              borderBottom: activeSecao === s.id ? "2px solid var(--blue)" : "2px solid transparent",
              background: activeSecao === s.id ? "var(--tint)" : "transparent",
              color: activeSecao === s.id ? "var(--blue)" : "var(--ink-soft)",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {s.titulo}
          </button>
        ))}
      </div>

      <div>
        {secaoAtual.intro && (
          <p style={{ margin: "0 0 24px", fontSize: 13.5, lineHeight: 1.6, color: "var(--ink-soft)", background: "var(--tint)", padding: "14px 18px", borderRadius: 12 }}>
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
    </div>
  );
}
