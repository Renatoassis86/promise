"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { calcularProjecaoFinanceira, FRENTES, type CustoItem, type Frente, type PremissasFrente } from "@/lib/financasCalculo";
import ProjecaoFinanceira5Anos from "@/components/admin/ProjecaoFinanceira5Anos";

type SaveStatus = "idle" | "saving" | "saved" | "error";
const AUTOSAVE_DELAY_MS = 1200;

export type PremissasFrenteExtra = PremissasFrente & {
  churnRetencaoPct: number | null;
  taxaConversaoPct: number | null;
  cac: number | null;
  observacoes: string;
};

export type PremissasIniciais = Record<Frente, PremissasFrenteExtra>;

export interface CustoItemInicial extends CustoItem {
  ordem: number;
}

function defaultPremissa(frente: Frente): PremissasFrenteExtra {
  return {
    frente,
    ano1Clientes: 0,
    ticketMedioAnual: 0,
    crescimentoClientesPct: 0,
    reajustePrecosPct: 0,
    churnRetencaoPct: null,
    taxaConversaoPct: null,
    cac: null,
    observacoes: "",
  };
}

export default function FinancasCrescimentoForm({
  userEmail,
  premissasIniciais,
  custosIniciais,
  investimentoInicialInicial,
  aliquotaImpostosPctInicial,
}: {
  userEmail: string;
  premissasIniciais: PremissasIniciais;
  custosIniciais: CustoItemInicial[];
  investimentoInicialInicial: number;
  aliquotaImpostosPctInicial: number;
}) {
  const [premissas, setPremissas] = useState<Record<Frente, PremissasFrenteExtra>>(() => {
    const base = {} as Record<Frente, PremissasFrenteExtra>;
    for (const f of FRENTES) base[f.id] = premissasIniciais[f.id] ?? defaultPremissa(f.id);
    return base;
  });
  const [custos, setCustos] = useState<CustoItemInicial[]>(custosIniciais);
  const [investimentoInicial, setInvestimentoInicial] = useState(investimentoInicialInicial);
  const [aliquotaImpostosPct, setAliquotaImpostosPct] = useState(aliquotaImpostosPctInicial);
  const [status, setStatus] = useState<Record<string, SaveStatus>>({});

  const debounceTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const pendingSaves = useRef<Set<string>>(new Set());
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (pendingSaves.current.size > 0) e.preventDefault();
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  useEffect(() => {
    return () => {
      Object.values(debounceTimers.current).forEach(clearTimeout);
    };
  }, []);

  function scheduleSave(key: string, saveFn: () => Promise<{ error: unknown }>) {
    pendingSaves.current.add(key);
    setStatus((prev) => (prev[key] === "saved" || prev[key] === "error" ? { ...prev, [key]: "idle" } : prev));
    if (debounceTimers.current[key]) clearTimeout(debounceTimers.current[key]);
    debounceTimers.current[key] = setTimeout(() => runSave(key, saveFn), AUTOSAVE_DELAY_MS);
  }

  async function runSave(key: string, saveFn: () => Promise<{ error: unknown }>) {
    setStatus((prev) => ({ ...prev, [key]: "saving" }));
    const { error } = await saveFn();
    pendingSaves.current.delete(key);
    setStatus((prev) => ({ ...prev, [key]: error ? "error" : "saved" }));
    if (!error) {
      setTimeout(() => {
        setStatus((prev) => (prev[key] === "saved" ? { ...prev, [key]: "idle" } : prev));
      }, 1800);
    }
  }

  function handleBlurSave(key: string, saveFn: () => Promise<{ error: unknown }>) {
    if (debounceTimers.current[key]) {
      clearTimeout(debounceTimers.current[key]);
      delete debounceTimers.current[key];
    }
    if (pendingSaves.current.has(key)) runSave(key, saveFn);
  }

  async function savePremissa(frente: Frente, dados: PremissasFrenteExtra): Promise<{ error: unknown }> {
    const { error } = await supabase.from("plano_financas_premissas").upsert(
      {
        user_email: userEmail,
        frente,
        ano1_clientes: dados.ano1Clientes,
        ticket_medio_anual: dados.ticketMedioAnual,
        crescimento_clientes_pct: dados.crescimentoClientesPct,
        reajuste_precos_pct: dados.reajustePrecosPct,
        churn_retencao_pct: dados.churnRetencaoPct,
        taxa_conversao_pct: dados.taxaConversaoPct,
        cac: dados.cac,
        observacoes: dados.observacoes,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_email,frente" }
    );
    return { error };
  }

  function handlePremissaChange<K extends keyof PremissasFrenteExtra>(frente: Frente, field: K, value: PremissasFrenteExtra[K]) {
    setPremissas((prev) => {
      const atualizado = { ...prev[frente], [field]: value };
      const key = `premissa:${frente}`;
      scheduleSave(key, () => savePremissa(frente, atualizado));
      return { ...prev, [frente]: atualizado };
    });
  }

  async function saveCusto(item: CustoItemInicial): Promise<{ error: unknown }> {
    const { error } = await supabase.from("plano_financas_custos").upsert(
      {
        id: item.id,
        user_email: userEmail,
        tipo: item.tipo,
        categoria: item.categoria,
        valor_mensal: item.valorMensal,
        reajuste_anual_pct: item.reajusteAnualPct,
        percentual_receita_pct: item.percentualReceitaPct,
        ordem: item.ordem,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );
    return { error };
  }

  function handleCustoChange<K extends keyof CustoItemInicial>(id: string, field: K, value: CustoItemInicial[K]) {
    setCustos((prev) => {
      const novo = prev.map((c) => (c.id === id ? { ...c, [field]: value } : c));
      const item = novo.find((c) => c.id === id)!;
      scheduleSave(`custo:${id}`, () => saveCusto(item));
      return novo;
    });
  }

  function handleAddCusto() {
    const novoItem: CustoItemInicial = {
      id: crypto.randomUUID(),
      tipo: "fixo",
      categoria: "",
      valorMensal: 0,
      reajusteAnualPct: 0,
      percentualReceitaPct: null,
      ordem: custos.length,
    };
    setCustos((prev) => [...prev, novoItem]);
  }

  async function handleRemoveCusto(id: string) {
    setCustos((prev) => prev.filter((c) => c.id !== id));
    if (debounceTimers.current[`custo:${id}`]) clearTimeout(debounceTimers.current[`custo:${id}`]);
    pendingSaves.current.delete(`custo:${id}`);
    await supabase.from("plano_financas_custos").delete().eq("id", id);
  }

  async function saveConfig(inv: number, aliq: number): Promise<{ error: unknown }> {
    const { error } = await supabase.from("plano_financas_config").upsert(
      { user_email: userEmail, investimento_inicial: inv, aliquota_impostos_pct: aliq, updated_at: new Date().toISOString() },
      { onConflict: "user_email" }
    );
    return { error };
  }

  function handleInvestimentoChange(value: number) {
    setInvestimentoInicial(value);
    scheduleSave("config", () => saveConfig(value, aliquotaImpostosPct));
  }

  function handleAliquotaChange(value: number) {
    setAliquotaImpostosPct(value);
    scheduleSave("config", () => saveConfig(investimentoInicial, value));
  }

  const resultado = useMemo(() => {
    const premissasArray: PremissasFrente[] = FRENTES.map((f) => premissas[f.id]);
    return calcularProjecaoFinanceira(premissasArray, custos, investimentoInicial, aliquotaImpostosPct, 5);
  }, [premissas, custos, investimentoInicial, aliquotaImpostosPct]);

  function statusLabel(key: string) {
    if (status[key] === "saving") return <span style={{ color: "var(--ink-soft)" }}>Salvando...</span>;
    if (status[key] === "saved") return <span style={{ color: "var(--blue)" }}>Salvo</span>;
    if (status[key] === "error") return <span style={{ color: "var(--red)" }}>Erro ao salvar</span>;
    return null;
  }

  return (
    <div style={{ maxWidth: 1080 }}>
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        Finanças e Crescimento
      </div>
      <p style={{ margin: "0 0 28px", fontSize: 13.5, color: "var(--ink-soft)", maxWidth: 680 }}>
        Digite as premissas de crescimento de cada frente e as despesas fixas/variáveis. A proposta orçamentária de 5
        anos abaixo é calculada automaticamente a partir desses números e salva sozinha enquanto você digita.
      </p>

      <h2 style={{ fontSize: 15, fontWeight: 800, color: "var(--ink)", margin: "0 0 14px" }}>Premissas de crescimento por frente</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 32 }}>
        {FRENTES.map((f) => {
          const p = premissas[f.id];
          const key = `premissa:${f.id}`;
          return (
            <div key={f.id} className="financas-card-frente" style={{ ["--linha-frente" as string]: f.cor }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: f.cor }}>{f.label}</div>
                <div style={{ fontSize: 11.5, fontWeight: 600, height: 14 }}>{statusLabel(key)}</div>
              </div>

              <CampoNumero
                label="Ano 1 — nº de clientes/alunos"
                value={p.ano1Clientes}
                onChange={(v) => handlePremissaChange(f.id, "ano1Clientes", v)}
                onBlur={() => handleBlurSave(key, () => savePremissa(f.id, p))}
              />
              <CampoNumero
                label="Ticket médio anual (R$)"
                value={p.ticketMedioAnual}
                onChange={(v) => handlePremissaChange(f.id, "ticketMedioAnual", v)}
                onBlur={() => handleBlurSave(key, () => savePremissa(f.id, p))}
              />
              <CampoNumero
                label="Crescimento de clientes ao ano (%)"
                value={p.crescimentoClientesPct}
                onChange={(v) => handlePremissaChange(f.id, "crescimentoClientesPct", v)}
                onBlur={() => handleBlurSave(key, () => savePremissa(f.id, p))}
              />
              <CampoNumero
                label="Reajuste de preços ao ano (%)"
                value={p.reajustePrecosPct}
                onChange={(v) => handlePremissaChange(f.id, "reajustePrecosPct", v)}
                onBlur={() => handleBlurSave(key, () => savePremissa(f.id, p))}
              />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <CampoNumero
                  label="Retenção anual (%)"
                  compacto
                  value={p.churnRetencaoPct ?? undefined}
                  onChange={(v) => handlePremissaChange(f.id, "churnRetencaoPct", v)}
                  onBlur={() => handleBlurSave(key, () => savePremissa(f.id, p))}
                />
                <CampoNumero
                  label="Conversão (%)"
                  compacto
                  value={p.taxaConversaoPct ?? undefined}
                  onChange={(v) => handlePremissaChange(f.id, "taxaConversaoPct", v)}
                  onBlur={() => handleBlurSave(key, () => savePremissa(f.id, p))}
                />
              </div>
              <CampoNumero
                label="CAC — custo de aquisição (R$)"
                value={p.cac ?? undefined}
                onChange={(v) => handlePremissaChange(f.id, "cac", v)}
                onBlur={() => handleBlurSave(key, () => savePremissa(f.id, p))}
              />

              <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, color: "var(--ink-soft)", marginBottom: 4, marginTop: 4 }}>
                Observações
              </label>
              <textarea
                value={p.observacoes}
                onChange={(e) => handlePremissaChange(f.id, "observacoes", e.target.value)}
                onBlur={() => handleBlurSave(key, () => savePremissa(f.id, p))}
                rows={2}
                style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid var(--line)", fontSize: 13, fontFamily: "inherit", resize: "vertical" }}
              />
            </div>
          );
        })}
      </div>

      <h2 style={{ fontSize: 15, fontWeight: 800, color: "var(--ink)", margin: "0 0 14px" }}>Despesas fixas e variáveis</h2>
      <div className="card" style={{ padding: 18, marginBottom: 32, overflowX: "auto" }}>
        <table className="financas-table" style={{ marginBottom: 14 }}>
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Tipo</th>
              <th>Valor mensal (R$)</th>
              <th>Reajuste a.a. (%)</th>
              <th>% da receita</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {custos.map((c) => {
              const key = `custo:${c.id}`;
              const modoPercentual = c.percentualReceitaPct != null;
              return (
                <tr key={c.id}>
                  <td style={{ textAlign: "left" }}>
                    <input
                      value={c.categoria}
                      onChange={(e) => handleCustoChange(c.id, "categoria", e.target.value)}
                      onBlur={() => handleBlurSave(key, () => saveCusto(c))}
                      placeholder="Ex.: Equipe pedagógica"
                      style={{ width: "100%", minWidth: 160, padding: "6px 8px", borderRadius: 6, border: "1px solid var(--line)", fontSize: 13 }}
                    />
                  </td>
                  <td>
                    <select
                      value={c.tipo}
                      onChange={(e) => handleCustoChange(c.id, "tipo", e.target.value as CustoItem["tipo"])}
                      onBlur={() => handleBlurSave(key, () => saveCusto(c))}
                      style={{ padding: "6px 8px", borderRadius: 6, border: "1px solid var(--line)", fontSize: 13 }}
                    >
                      <option value="fixo">Fixo</option>
                      <option value="variavel">Variável</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      disabled={modoPercentual}
                      value={c.valorMensal}
                      onChange={(e) => handleCustoChange(c.id, "valorMensal", Number(e.target.value))}
                      onBlur={() => handleBlurSave(key, () => saveCusto(c))}
                      style={{ width: 110, padding: "6px 8px", borderRadius: 6, border: "1px solid var(--line)", fontSize: 13, opacity: modoPercentual ? 0.4 : 1 }}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      disabled={modoPercentual}
                      value={c.reajusteAnualPct}
                      onChange={(e) => handleCustoChange(c.id, "reajusteAnualPct", Number(e.target.value))}
                      onBlur={() => handleBlurSave(key, () => saveCusto(c))}
                      style={{ width: 90, padding: "6px 8px", borderRadius: 6, border: "1px solid var(--line)", fontSize: 13, opacity: modoPercentual ? 0.4 : 1 }}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={c.percentualReceitaPct ?? ""}
                      placeholder="—"
                      onChange={(e) => handleCustoChange(c.id, "percentualReceitaPct", e.target.value === "" ? null : Number(e.target.value))}
                      onBlur={() => handleBlurSave(key, () => saveCusto(c))}
                      style={{ width: 90, padding: "6px 8px", borderRadius: 6, border: "1px solid var(--line)", fontSize: 13 }}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => handleRemoveCusto(c.id)}
                      style={{ border: "none", background: "transparent", color: "var(--red)", fontWeight: 700, cursor: "pointer", fontSize: 13 }}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button
          onClick={handleAddCusto}
          className="pill pill-outline-blue"
          style={{ fontSize: 13, padding: "8px 16px", cursor: "pointer" }}
        >
          + Adicionar despesa
        </button>
        <p style={{ margin: "10px 0 0", fontSize: 12, color: "var(--ink-soft)" }}>
          Deixe &ldquo;% da receita&rdquo; vazio para despesas com valor mensal fixo reajustado ao ano (ex.: equipe,
          escritório). Preencha &ldquo;% da receita&rdquo; para despesas que escalam com o faturamento (ex.: comissões,
          taxas de exame).
        </p>
      </div>

      <h2 style={{ fontSize: 15, fontWeight: 800, color: "var(--ink)", margin: "0 0 14px" }}>Investimento e impostos</h2>
      <div className="card" style={{ padding: 18, marginBottom: 32, display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-end" }}>
        <CampoNumero
          label="Investimento inicial (R$)"
          value={investimentoInicial}
          onChange={handleInvestimentoChange}
          onBlur={() => handleBlurSave("config", () => saveConfig(investimentoInicial, aliquotaImpostosPct))}
        />
        <CampoNumero
          label="Alíquota de impostos sobre o resultado (%)"
          value={aliquotaImpostosPct}
          onChange={handleAliquotaChange}
          onBlur={() => handleBlurSave("config", () => saveConfig(investimentoInicial, aliquotaImpostosPct))}
        />
        <div style={{ fontSize: 11.5, fontWeight: 600, height: 14 }}>{statusLabel("config")}</div>
      </div>

      <h2 style={{ fontSize: 15, fontWeight: 800, color: "var(--ink)", margin: "0 0 14px" }}>Proposta orçamentária — 5 anos</h2>
      <ProjecaoFinanceira5Anos resultado={resultado} />
    </div>
  );
}

function CampoNumero({
  label,
  value,
  onChange,
  onBlur,
  compacto,
}: {
  label: string;
  value: number | undefined;
  onChange: (v: number) => void;
  onBlur: () => void;
  compacto?: boolean;
}) {
  return (
    <div style={{ marginBottom: compacto ? 0 : 12 }}>
      <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, color: "var(--ink-soft)", marginBottom: 4 }}>{label}</label>
      <input
        type="number"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
        onBlur={onBlur}
        style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid var(--line)", fontSize: 13.5 }}
      />
    </div>
  );
}
