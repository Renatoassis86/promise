"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { PLANO_NEGOCIO_SECOES } from "@/lib/planoNegocioQuestions";

type SaveStatus = "idle" | "saving" | "saved" | "error";

const AUTOSAVE_DELAY_MS = 1200;

export default function PlanoNegocioForm({ userEmail, respostasIniciais }: { userEmail: string; respostasIniciais: Record<string, string> }) {
  const [activeSecao, setActiveSecao] = useState(PLANO_NEGOCIO_SECOES[0].id);
  const [respostas, setRespostas] = useState<Record<string, string>>(respostasIniciais);
  const [status, setStatus] = useState<Record<string, SaveStatus>>({});
  const [exportando, setExportando] = useState(false);

  const debounceTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const pendingSaves = useRef<Set<string>>(new Set());

  // Aviso nativo do navegador se tentar fechar/sair com uma resposta ainda nao salva
  // (autosave debounced ainda nao disparou). Rede de seguranca alem do autosave em si.
  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (pendingSaves.current.size > 0) {
        e.preventDefault();
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Limpa timers pendentes ao desmontar, pra nao vazar setTimeout depois que o componente sumiu.
  useEffect(() => {
    return () => {
      Object.values(debounceTimers.current).forEach(clearTimeout);
    };
  }, []);

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
    pendingSaves.current.add(questionId);
    setStatus((prev) => (prev[questionId] === "saved" || prev[questionId] === "error" ? { ...prev, [questionId]: "idle" } : prev));

    if (debounceTimers.current[questionId]) clearTimeout(debounceTimers.current[questionId]);
    debounceTimers.current[questionId] = setTimeout(() => {
      handleSave(questionId, value);
    }, AUTOSAVE_DELAY_MS);
  }

  function handleBlurSave(questionId: string) {
    if (debounceTimers.current[questionId]) {
      clearTimeout(debounceTimers.current[questionId]);
      delete debounceTimers.current[questionId];
    }
    if (pendingSaves.current.has(questionId)) {
      handleSave(questionId, respostas[questionId] ?? "");
    }
  }

  async function handleSave(questionId: string, valor: string) {
    setStatus((prev) => ({ ...prev, [questionId]: "saving" }));
    const supabase = createClient();
    const { error } = await supabase
      .from("plano_negocio_respostas")
      .upsert(
        { user_email: userEmail, question_id: questionId, resposta: valor, updated_at: new Date().toISOString() },
        { onConflict: "user_email,question_id" }
      );
    pendingSaves.current.delete(questionId);
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
      const rows: (string | undefined)[][] = [["Pergunta-chave", "O que colocar (Explicação)", "Exemplo (Promise)", "Resposta"]];
      for (const sub of secao.subsecoes) {
        if (sub.titulo) rows.push([sub.titulo]);
        for (const p of sub.perguntas) {
          rows.push([p.pergunta, p.explicacao ?? p.acao ?? "", p.exemplo ?? "", respostas[p.id] ?? ""]);
        }
      }
      const ws = XLSX.utils.aoa_to_sheet(rows);
      ws["!cols"] = [{ wch: 45 }, { wch: 45 }, { wch: 50 }, { wch: 60 }];
      const nomeAba = secao.titulo.slice(0, 31);
      XLSX.utils.book_append_sheet(wb, ws, nomeAba);
    }

    XLSX.writeFile(wb, "plano-de-negocio-promise.xlsx");
    setExportando(false);
  }

  return (
    <div style={{ maxWidth: 860 }}>
      <div style={{ marginBottom: 20 }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>
          Plano de Negócio
        </div>
        <p style={{ margin: 0, fontSize: 13.5, color: "var(--ink-soft)" }}>
          Responda item a item, no seu tempo. Cada resposta é salva automaticamente enquanto você digita, então você pode fechar e continuar de onde parou quando quiser.
        </p>
      </div>

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

      <nav className="admin-tabs" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
        {PLANO_NEGOCIO_SECOES.map((s) => {
          const perguntasSecao = s.subsecoes.reduce((a, sub) => a + sub.perguntas.length, 0);
          const respondidasSecao = s.subsecoes.reduce(
            (a, sub) => a + sub.perguntas.filter((p) => respostas[p.id] && respostas[p.id].trim().length > 0).length,
            0
          );
          const isActive = activeSecao === s.id;
          const completa = respondidasSecao === perguntasSecao;
          return (
            <button
              key={s.id}
              className="admin-tab"
              onClick={() => setActiveSecao(s.id)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "9px 14px",
                borderRadius: 999,
                border: isActive ? "1px solid var(--blue)" : "1px solid var(--line)",
                cursor: "pointer",
                background: isActive ? "var(--blue)" : "#fff",
                color: isActive ? "#fff" : "var(--ink)",
                fontWeight: isActive ? 700 : 600,
                fontSize: 13,
              }}
            >
              <span>{s.titulo}</span>
              <span
                style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  padding: "1px 6px",
                  borderRadius: 999,
                  background: isActive ? "rgba(255,255,255,.2)" : completa ? "var(--tint)" : "#F1F2F5",
                  color: isActive ? "#fff" : completa ? "var(--blue)" : "#6B7390",
                }}
              >
                {respondidasSecao}/{perguntasSecao}
              </span>
            </button>
          );
        })}
      </nav>

      <div>
        <h1 style={{ margin: "0 0 20px", fontSize: 22, fontWeight: 800 }}>{secaoAtual.titulo}</h1>

        {secaoAtual.intro && (
            <p style={{ margin: "0 0 24px", fontSize: 13.5, lineHeight: 1.6, color: "var(--ink-soft)", background: "#fff", border: "1px solid var(--line)", padding: "14px 18px", borderRadius: 12 }}>
              {secaoAtual.intro}
            </p>
          )}

          {secaoAtual.subsecoes.map((sub, i) => (
            <div key={i} style={{ marginBottom: 32 }}>
              {sub.titulo && <h3 style={{ fontSize: 15, fontWeight: 800, color: "var(--blue)", margin: "0 0 16px" }}>{sub.titulo}</h3>}
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {sub.perguntas.map((p) => (
                  <div key={p.id} style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 14, padding: 22 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>{p.pergunta}</div>
                    
                    {(p.explicacao || p.acao) && (
                      <div style={{ marginBottom: 10, background: "rgba(10, 37, 64, 0.03)", borderLeft: "3px solid var(--blue)", padding: "10px 14px", borderRadius: "0 8px 8px 0" }}>
                        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--blue)", marginBottom: 3 }}>
                          📘 O que colocar aqui (Lembre-se das 3 frentes: Schools, Learners e Professionals):
                        </div>
                        <div style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5 }}>
                          {p.explicacao ?? p.acao}
                        </div>
                      </div>
                    )}

                    {p.exemplo && (
                      <div style={{ marginBottom: 14, background: "#F4F7FB", border: "1px dashed #CBD5E1", padding: "10px 14px", borderRadius: 8 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#475569", marginBottom: 3 }}>
                          💬 Exemplo Prático (Promise English):
                        </div>
                        <div style={{ fontSize: 13, color: "#334155", fontStyle: "italic", lineHeight: 1.5 }}>
                          &ldquo;{p.exemplo}&rdquo;
                        </div>
                      </div>
                    )}

                    <textarea
                      value={respostas[p.id] ?? ""}
                      onChange={(e) => handleChange(p.id, e.target.value)}
                      onBlur={() => handleBlurSave(p.id)}
                      rows={4}
                      placeholder="Digite sua resposta..."
                      style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--line)", fontSize: 14, fontFamily: "inherit", resize: "vertical" }}
                    />
                    <div style={{ height: 16, marginTop: 6, fontSize: 12, fontWeight: 600 }}>
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
