"use client";

import { FRENTES, type ResultadoProjecao } from "@/lib/financasCalculo";

const fmtMoeda = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

const fmtPct = (v: number) => `${v.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`;

export default function ProjecaoFinanceira5Anos({ resultado }: { resultado: ResultadoProjecao }) {
  const { anos, paybackMeses, breakevenAno } = resultado;

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
        <div className="card" style={{ flex: "1 1 200px", padding: "16px 18px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink-soft)", marginBottom: 6 }}>
            Payback do investimento
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "var(--blue)" }}>
            {paybackMeses != null ? `${paybackMeses.toFixed(0)} meses` : "Não atingido em 5 anos"}
          </div>
        </div>
        <div className="card" style={{ flex: "1 1 200px", padding: "16px 18px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink-soft)", marginBottom: 6 }}>
            Breakeven (1º ano com lucro)
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "var(--blue)" }}>
            {breakevenAno != null ? `Ano ${breakevenAno}` : "Não atingido em 5 anos"}
          </div>
        </div>
        <div className="card" style={{ flex: "1 1 200px", padding: "16px 18px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink-soft)", marginBottom: 6 }}>
            Margem líquida no Ano 5
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "var(--blue)" }}>{fmtPct(anos[anos.length - 1]?.margemLiquidaPct ?? 0)}</div>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="financas-table">
          <thead>
            <tr>
              <th>Linha</th>
              {anos.map((a) => (
                <th key={a.ano}>Ano {a.ano}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FRENTES.map((f) => (
              <tr key={f.id}>
                <td style={{ color: f.cor, fontWeight: 700 }}>Receita — {f.label}</td>
                {anos.map((a) => (
                  <td key={a.ano}>{fmtMoeda(a.receitaPorFrente[f.id] ?? 0)}</td>
                ))}
              </tr>
            ))}
            <tr>
              <td style={{ fontWeight: 800 }}>Receita Bruta</td>
              {anos.map((a) => (
                <td key={a.ano} style={{ fontWeight: 800 }}>
                  {fmtMoeda(a.receitaBruta)}
                </td>
              ))}
            </tr>
            <tr>
              <td>(–) Custos Fixos</td>
              {anos.map((a) => (
                <td key={a.ano}>{fmtMoeda(a.custosFixos)}</td>
              ))}
            </tr>
            <tr>
              <td>(–) Custos Variáveis</td>
              {anos.map((a) => (
                <td key={a.ano}>{fmtMoeda(a.custosVariaveis)}</td>
              ))}
            </tr>
            <tr>
              <td style={{ fontWeight: 700 }}>(=) Resultado Líquido</td>
              {anos.map((a) => (
                <td key={a.ano} style={{ fontWeight: 700, color: a.resultadoLiquido >= 0 ? "var(--blue)" : "var(--red)" }}>
                  {fmtMoeda(a.resultadoLiquido)}
                </td>
              ))}
            </tr>
            <tr>
              <td>Margem Líquida</td>
              {anos.map((a) => (
                <td key={a.ano}>{fmtPct(a.margemLiquidaPct)}</td>
              ))}
            </tr>
            <tr>
              <td>Resultado Acumulado</td>
              {anos.map((a) => (
                <td key={a.ano} style={{ color: a.resultadoAcumulado >= 0 ? "var(--blue)" : "var(--red)" }}>
                  {fmtMoeda(a.resultadoAcumulado)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
