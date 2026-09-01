"use client";

import { FRENTES, type ResultadoProjecao } from "@/lib/financasCalculo";

const fmtMoeda = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

const fmtMoedaCompacta = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", notation: "compact", maximumFractionDigits: 1 });

const fmtPct = (v: number) => `${v.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`;

function GraficoReceitaPorFrente({ anos }: { anos: ResultadoProjecao["anos"] }) {
  const maiorReceita = Math.max(...anos.map((a) => a.receitaBruta), 1);
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
        Receita bruta por frente, ano a ano
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 16, height: 200, padding: "0 4px" }}>
        {anos.map((a) => (
          <div key={a.ano} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-soft)" }}>{a.receitaBruta > 0 ? fmtMoedaCompacta(a.receitaBruta) : ""}</div>
            <div
              style={{
                width: "100%",
                maxWidth: 56,
                height: 160,
                display: "flex",
                flexDirection: "column-reverse",
                borderRadius: "4px 4px 2px 2px",
                overflow: "hidden",
                background: "var(--line)",
              }}
            >
              {FRENTES.map((f) => {
                const valor = a.receitaPorFrente[f.id] ?? 0;
                const alturaPct = (valor / maiorReceita) * 100;
                if (alturaPct <= 0) return null;
                return <div key={f.id} style={{ height: `${alturaPct}%`, background: f.cor, flexShrink: 0 }} title={`${f.label}: ${fmtMoeda(valor)}`} />;
              })}
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>{a.ano}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 14 }}>
        {FRENTES.map((f) => (
          <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: f.cor }} />
            <span style={{ fontSize: 12, color: "var(--ink-soft)" }}>{f.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProjecaoFinanceira5Anos({ resultado }: { resultado: ResultadoProjecao }) {
  const { anos, paybackMeses, breakevenAno } = resultado;
  const ultimoAno = anos[anos.length - 1];

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
        <div className="card" style={{ flex: "1 1 200px", padding: "16px 18px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink-soft)", marginBottom: 6 }}>
            Payback do investimento
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "var(--blue)" }}>
            {paybackMeses != null ? `${paybackMeses.toFixed(0)} meses` : "Não atingido no horizonte"}
          </div>
        </div>
        <div className="card" style={{ flex: "1 1 200px", padding: "16px 18px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink-soft)", marginBottom: 6 }}>
            Breakeven (1º ano com lucro)
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "var(--blue)" }}>
            {breakevenAno != null ? breakevenAno : "Não atingido no horizonte"}
          </div>
        </div>
        <div className="card" style={{ flex: "1 1 200px", padding: "16px 18px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink-soft)", marginBottom: 6 }}>
            Margem líquida em {ultimoAno?.ano}
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "var(--blue)" }}>{fmtPct(ultimoAno?.margemLiquidaPct ?? 0)}</div>
        </div>
      </div>

      <GraficoReceitaPorFrente anos={anos} />

      <div style={{ overflowX: "auto" }}>
        <table className="financas-table">
          <thead>
            <tr>
              <th>Linha</th>
              {anos.map((a) => (
                <th key={a.ano}>{a.ano}</th>
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
