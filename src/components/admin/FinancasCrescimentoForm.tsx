"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  calcularProjecaoFinanceira,
  ANOS_PLANEJAMENTO,
  FRENTES,
  type AnoPlanejamento,
  type Frente,
  type LinhaFinanceira,
  type ModoLinha,
  type TipoLinha,
} from "@/lib/financasCalculo";
import ProjecaoFinanceira5Anos from "@/components/admin/ProjecaoFinanceira5Anos";

type SaveStatus = "idle" | "saving" | "saved" | "error";
const AUTOSAVE_DELAY_MS = 1000;

const SECOES: { tipo: TipoLinha; titulo: string; corTopo: string; descricao: string }[] = [
  {
    tipo: "receita",
    titulo: "Receitas por linha de negócio",
    corTopo: "var(--blue)",
    descricao: "Para cada linha, digite o número de clientes/alunos esperado em cada ano. A receita é calculada automaticamente pelo ticket médio, reajustado ano a ano.",
  },
  {
    tipo: "custo_fixo",
    titulo: "Custos fixos",
    corTopo: "var(--ink)",
    descricao: "Valor mensal esperado × 12, ou já o total anual — digite o total anual de cada rubrica, ano a ano.",
  },
  {
    tipo: "custo_variavel",
    titulo: "Custos variáveis",
    corTopo: "var(--orange)",
    descricao: "Digite o valor anual direto, ou marque a linha como \"% da receita\" para custos que escalam com o faturamento, como impostos e comissões.",
  },
];

function novaLinhaVazia(tipo: TipoLinha, ordem: number): LinhaFinanceira {
  return {
    id: crypto.randomUUID(),
    tipo,
    modo: tipo === "receita" ? "clientes_x_ticket" : "valor",
    macroArea: tipo === "receita" ? "Nova linha de receita" : tipo === "custo_fixo" ? "Nova categoria" : "Nova categoria",
    rubrica: "",
    frente: tipo === "receita" ? "schools" : null,
    ticketMedio: 0,
    reajusteTicketPct: 0,
    percentualReceitaPct: null,
    valoresPorAno: {},
    ordem,
  };
}

export default function FinancasCrescimentoForm({
  userEmail,
  linhasIniciais,
  investimentoInicialInicial,
}: {
  userEmail: string;
  linhasIniciais: LinhaFinanceira[];
  investimentoInicialInicial: number;
}) {
  const [linhas, setLinhas] = useState<LinhaFinanceira[]>(linhasIniciais);
  const [investimentoInicial, setInvestimentoInicial] = useState(investimentoInicialInicial);
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

  function scheduleSave(key: string, saveFn: () => Promise<{ error: unknown }>) {
    pendingSaves.current.add(key);
    setStatus((prev) => (prev[key] === "saved" || prev[key] === "error" ? { ...prev, [key]: "idle" } : prev));
    if (debounceTimers.current[key]) clearTimeout(debounceTimers.current[key]);
    debounceTimers.current[key] = setTimeout(async () => {
      setStatus((prev) => ({ ...prev, [key]: "saving" }));
      const { error } = await saveFn();
      pendingSaves.current.delete(key);
      setStatus((prev) => ({ ...prev, [key]: error ? "error" : "saved" }));
      if (!error) {
        setTimeout(() => setStatus((prev) => (prev[key] === "saved" ? { ...prev, [key]: "idle" } : prev)), 1500);
      }
    }, AUTOSAVE_DELAY_MS);
  }

  async function saveLinha(linha: LinhaFinanceira): Promise<{ error: unknown }> {
    const { error } = await supabase.from("plano_financas_linhas").upsert(
      {
        id: linha.id,
        user_email: userEmail,
        tipo: linha.tipo,
        modo: linha.modo,
        macro_area: linha.macroArea,
        rubrica: linha.rubrica,
        frente: linha.frente ?? null,
        ticket_medio: linha.ticketMedio ?? null,
        reajuste_ticket_pct: linha.reajusteTicketPct ?? 0,
        percentual_receita_pct: linha.percentualReceitaPct ?? null,
        valores_por_ano: linha.valoresPorAno,
        ordem: linha.ordem,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );
    return { error };
  }

  function atualizarLinha(id: string, patch: Partial<LinhaFinanceira>) {
    setLinhas((prev) => {
      const nova = prev.map((l) => (l.id === id ? { ...l, ...patch } : l));
      const atualizada = nova.find((l) => l.id === id)!;
      scheduleSave(`linha:${id}`, () => saveLinha(atualizada));
      return nova;
    });
  }

  function atualizarValorAno(id: string, ano: AnoPlanejamento, valor: number) {
    setLinhas((prev) => {
      const nova = prev.map((l) => (l.id === id ? { ...l, valoresPorAno: { ...l.valoresPorAno, [ano]: valor } } : l));
      const atualizada = nova.find((l) => l.id === id)!;
      scheduleSave(`linha:${id}`, () => saveLinha(atualizada));
      return nova;
    });
  }

  function adicionarLinha(tipo: TipoLinha) {
    const ordem = Math.max(0, ...linhas.filter((l) => l.tipo === tipo).map((l) => l.ordem)) + 1;
    const nova = novaLinhaVazia(tipo, ordem);
    setLinhas((prev) => [...prev, nova]);
  }

  async function removerLinha(id: string) {
    setLinhas((prev) => prev.filter((l) => l.id !== id));
    if (debounceTimers.current[`linha:${id}`]) clearTimeout(debounceTimers.current[`linha:${id}`]);
    pendingSaves.current.delete(`linha:${id}`);
    await supabase.from("plano_financas_linhas").delete().eq("id", id);
  }

  async function saveInvestimento(valor: number): Promise<{ error: unknown }> {
    const { error } = await supabase
      .from("plano_financas_config")
      .upsert({ user_email: userEmail, investimento_inicial: valor, updated_at: new Date().toISOString() }, { onConflict: "user_email" });
    return { error };
  }

  function handleInvestimentoChange(valor: number) {
    setInvestimentoInicial(valor);
    scheduleSave("investimento", () => saveInvestimento(valor));
  }

  const resultado = useMemo(() => calcularProjecaoFinanceira(linhas, investimentoInicial), [linhas, investimentoInicial]);

  function statusLabel(key: string) {
    if (status[key] === "saving") return <span style={{ color: "var(--ink-soft)" }}>Salvando...</span>;
    if (status[key] === "saved") return <span style={{ color: "var(--blue)" }}>Salvo</span>;
    if (status[key] === "error") return <span style={{ color: "var(--red)" }}>Erro ao salvar</span>;
    return null;
  }

  return (
    <div style={{ maxWidth: 1320 }}>
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        Finanças e Crescimento
      </div>
      <p style={{ margin: "0 0 28px", fontSize: 13.5, color: "var(--ink-soft)", maxWidth: 760 }}>
        Planilha de contas do plano de negócio: cada linha é uma rubrica de receita ou despesa. Preencha os valores
        ano a ano, agrupados por área. A proposta orçamentária de 5 anos abaixo é recalculada automaticamente e
        salva sozinha enquanto você digita.
      </p>

      <div className="card" style={{ padding: 18, marginBottom: 28, display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-end" }}>
        <div>
          <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, color: "var(--ink-soft)", marginBottom: 4 }}>
            Investimento inicial (R$)
          </label>
          <input
            type="number"
            value={investimentoInicial || ""}
            onChange={(e) => handleInvestimentoChange(e.target.value === "" ? 0 : Number(e.target.value))}
            style={{ width: 200, padding: "8px 10px", borderRadius: 8, border: "1px solid var(--line)", fontSize: 13.5 }}
          />
        </div>
        <div style={{ fontSize: 11.5, fontWeight: 600, height: 14 }}>{statusLabel("investimento")}</div>
      </div>

      {SECOES.map((secao) => {
        const linhasSecao = linhas.filter((l) => l.tipo === secao.tipo).sort((a, b) => a.ordem - b.ordem);
        return (
          <div key={secao.tipo} style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 6, flexWrap: "wrap", gap: 8 }}>
              <h2 style={{ fontSize: 15, fontWeight: 800, color: "var(--ink)", margin: 0 }}>{secao.titulo}</h2>
              <button onClick={() => adicionarLinha(secao.tipo)} className="pill pill-outline-blue" style={{ fontSize: 12.5, padding: "6px 14px", cursor: "pointer" }}>
                + Adicionar linha
              </button>
            </div>
            <p style={{ margin: "0 0 14px", fontSize: 12.5, color: "var(--ink-soft)" }}>{secao.descricao}</p>
            <div className="card" style={{ padding: 4, borderTop: `4px solid ${secao.corTopo}`, overflowX: "auto" }}>
              <table className="financas-table" style={{ minWidth: 900 }}>
                <thead>
                  <tr>
                    <th>Área / Rubrica</th>
                    {secao.tipo === "receita" && <th>Ticket (R$/ano)</th>}
                    {secao.tipo !== "receita" && <th>% receita</th>}
                    {ANOS_PLANEJAMENTO.map((ano) => (
                      <th key={ano}>{ano}</th>
                    ))}
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {linhasSecao.map((linha) => (
                    <LinhaRow
                      key={linha.id}
                      linha={linha}
                      status={status[`linha:${linha.id}`]}
                      onChange={(patch) => atualizarLinha(linha.id, patch)}
                      onChangeAno={(ano, valor) => atualizarValorAno(linha.id, ano, valor)}
                      onRemove={() => removerLinha(linha.id)}
                    />
                  ))}
                  {linhasSecao.length === 0 && (
                    <tr>
                      <td colSpan={ANOS_PLANEJAMENTO.length + 3} style={{ textAlign: "center", color: "var(--ink-soft)", padding: 20 }}>
                        Nenhuma linha ainda. Clique em &ldquo;Adicionar linha&rdquo;.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      <h2 style={{ fontSize: 15, fontWeight: 800, color: "var(--ink)", margin: "0 0 14px" }}>Proposta orçamentária — 2026 a 2031</h2>
      <ProjecaoFinanceira5Anos resultado={resultado} />
    </div>
  );
}

function LinhaRow({
  linha,
  status,
  onChange,
  onChangeAno,
  onRemove,
}: {
  linha: LinhaFinanceira;
  status?: SaveStatus;
  onChange: (patch: Partial<LinhaFinanceira>) => void;
  onChangeAno: (ano: AnoPlanejamento, valor: number) => void;
  onRemove: () => void;
}) {
  const modoPercentual = linha.modo === "percentual_receita";
  const modoClientes = linha.modo === "clientes_x_ticket";

  return (
    <tr>
      <td style={{ textAlign: "left", minWidth: 240 }}>
        <input
          value={linha.macroArea}
          onChange={(e) => onChange({ macroArea: e.target.value })}
          placeholder="Área macro"
          style={{ width: "100%", padding: "5px 7px", borderRadius: 6, border: "1px solid var(--line)", fontSize: 11.5, fontWeight: 700, color: "var(--ink-soft)", marginBottom: 4, textTransform: "uppercase" }}
        />
        <input
          value={linha.rubrica}
          onChange={(e) => onChange({ rubrica: e.target.value })}
          placeholder="Nome da rubrica"
          style={{ width: "100%", padding: "6px 8px", borderRadius: 6, border: "1px solid var(--line)", fontSize: 13 }}
        />
        {linha.tipo === "receita" && (
          <select
            value={linha.frente ?? "schools"}
            onChange={(e) => onChange({ frente: e.target.value as Frente })}
            style={{ marginTop: 4, width: "100%", padding: "5px 7px", borderRadius: 6, border: "1px solid var(--line)", fontSize: 12 }}
          >
            {FRENTES.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        )}
        {linha.tipo !== "receita" && (
          <label style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4, fontSize: 11.5, color: "var(--ink-soft)" }}>
            <input
              type="checkbox"
              checked={modoPercentual}
              onChange={(e) => onChange({ modo: (e.target.checked ? "percentual_receita" : "valor") as ModoLinha })}
            />
            % da receita
          </label>
        )}
        <div style={{ fontSize: 10.5, fontWeight: 600, height: 12, marginTop: 2 }}>{status === "saving" && <span style={{ color: "var(--ink-soft)" }}>Salvando...</span>}{status === "saved" && <span style={{ color: "var(--blue)" }}>Salvo</span>}</div>
      </td>

      {linha.tipo === "receita" ? (
        <td>
          <input
            type="number"
            value={linha.ticketMedio ?? ""}
            onChange={(e) => onChange({ ticketMedio: e.target.value === "" ? 0 : Number(e.target.value) })}
            style={{ width: 90, padding: "6px 8px", borderRadius: 6, border: "1px solid var(--line)", fontSize: 13 }}
          />
        </td>
      ) : (
        <td>
          <input
            type="number"
            disabled={!modoPercentual}
            value={linha.percentualReceitaPct ?? ""}
            onChange={(e) => onChange({ percentualReceitaPct: e.target.value === "" ? 0 : Number(e.target.value) })}
            style={{ width: 70, padding: "6px 8px", borderRadius: 6, border: "1px solid var(--line)", fontSize: 13, opacity: modoPercentual ? 1 : 0.35 }}
          />
        </td>
      )}

      {ANOS_PLANEJAMENTO.map((ano) => (
        <td key={ano}>
          <input
            type="number"
            disabled={modoPercentual}
            value={linha.valoresPorAno[ano] ?? ""}
            onChange={(e) => onChangeAno(ano, e.target.value === "" ? 0 : Number(e.target.value))}
            placeholder={modoClientes ? "clientes" : "R$"}
            style={{ width: 90, padding: "6px 8px", borderRadius: 6, border: "1px solid var(--line)", fontSize: 13, opacity: modoPercentual ? 0.35 : 1 }}
          />
        </td>
      ))}
      <td>
        <button onClick={onRemove} style={{ border: "none", background: "transparent", color: "var(--red)", fontWeight: 700, cursor: "pointer", fontSize: 12 }}>
          Remover
        </button>
      </td>
    </tr>
  );
}
