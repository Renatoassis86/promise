"use client";

import { FRENTES, type ResultadoProjecao } from "@/lib/financasCalculo";

export const fmtMoeda = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export const fmtMoedaCompacta = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", notation: "compact", maximumFractionDigits: 1 });

export const fmtPct = (v: number) => `${v.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`;

export function StatsFinanceiros({ resultado, compacto }: { resultado: ResultadoProjecao; compacto?: boolean }) {
  const { anos, paybackMeses, breakevenAno } = resultado;
  const ultimoAno = anos[anos.length - 1];
  const pad = compacto ? "12px 14px" : "16px 18px";
  const valueSize = compacto ? 19 : 22;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <div className="card" style={{ flex: "1 1 200px", padding: pad }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink-soft)", marginBottom: 5 }}>
          Payback do investimento
        </div>
        <div style={{ fontSize: valueSize, fontWeight: 800, color: "var(--blue)" }}>
          {paybackMeses != null ? `${paybackMeses.toFixed(0)} meses` : "Não atingido"}
        </div>
      </div>
      <div className="card" style={{ flex: "1 1 200px", padding: pad }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink-soft)", marginBottom: 5 }}>
          Breakeven (1º ano com lucro)
        </div>
        <div style={{ fontSize: valueSize, fontWeight: 800, color: "var(--blue)" }}>{breakevenAno != null ? breakevenAno : "Não atingido"}</div>
      </div>
      <div className="card" style={{ flex: "1 1 200px", padding: pad }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink-soft)", marginBottom: 5 }}>
          Margem líquida em {ultimoAno?.ano}
        </div>
        <div style={{ fontSize: valueSize, fontWeight: 800, color: "var(--orange)" }}>{fmtPct(ultimoAno?.margemLiquidaPct ?? 0)}</div>
      </div>
    </div>
  );
}

export function GraficoReceitaPorFrente({ anos, compacto }: { anos: ResultadoProjecao["anos"]; compacto?: boolean }) {
  const maiorReceita = Math.max(...anos.map((a) => a.receitaBruta), 1);
  const alturaBarra = compacto ? 110 : 160;
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>
        Receita bruta por frente, ano a ano
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: alturaBarra + 40, padding: "0 4px" }}>
        {anos.map((a) => (
          <div key={a.ano} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: "var(--ink-soft)" }}>{a.receitaBruta > 0 ? fmtMoedaCompacta(a.receitaBruta) : ""}</div>
            <div
              style={{
                width: "100%",
                maxWidth: 48,
                height: alturaBarra,
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
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink)" }}>{a.ano}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 10 }}>
        {FRENTES.map((f) => (
          <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 9, height: 9, borderRadius: 3, background: f.cor }} />
            <span style={{ fontSize: 11, color: "var(--ink-soft)" }}>{f.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GraficoMargemLiquida({ anos, compacto }: { anos: ResultadoProjecao["anos"]; compacto?: boolean }) {
  const valores = anos.map((a) => a.margemLiquidaPct);
  const maior = Math.max(...valores, 1);
  const menor = Math.min(...valores, 0);
  const faixa = Math.max(maior - menor, 1);
  const alturaBarra = compacto ? 90 : 130;
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>
        Margem líquida, ano a ano
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: alturaBarra + 40, padding: "0 4px" }}>
        {anos.map((a) => {
          const alturaPct = ((a.margemLiquidaPct - menor) / faixa) * 100;
          const cor = a.margemLiquidaPct >= 0 ? "var(--orange)" : "var(--red)";
          return (
            <div key={a.ano} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: "var(--ink-soft)" }}>{fmtPct(a.margemLiquidaPct)}</div>
              <div style={{ width: "100%", maxWidth: 48, height: alturaBarra, display: "flex", alignItems: "flex-end" }}>
                <div style={{ width: "100%", height: `${Math.max(alturaPct, 4)}%`, borderRadius: "4px 4px 2px 2px", background: cor }} />
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink)" }}>{a.ano}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TabelaDRE({ anos }: { anos: ResultadoProjecao["anos"] }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table className="financas-table">
        <thead>
          <tr>
            <th>Linha</th>
            {anos.map((a) => (
              <th key={a.ano} title={a.ano === 2026 ? "Ano de lançamento, operação parcial (set–dez)" : undefined}>
                {a.ano}
                {a.ano === 2026 && <div style={{ fontSize: 9.5, fontWeight: 600, color: "var(--ink-soft)", textTransform: "none", letterSpacing: 0 }}>parcial</div>}
              </th>
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
  );
}

export default function ProjecaoFinanceira5Anos({ resultado }: { resultado: ResultadoProjecao }) {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <StatsFinanceiros resultado={resultado} />
      </div>
      <div style={{ marginBottom: 24 }}>
        <GraficoReceitaPorFrente anos={resultado.anos} />
      </div>
      <div style={{ marginBottom: 24 }}>
        <GraficoMargemLiquida anos={resultado.anos} />
      </div>
      <TabelaDRE anos={resultado.anos} />
    </div>
  );
}
