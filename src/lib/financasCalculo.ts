export type Frente = "schools" | "learners" | "professionals";

export const FRENTES: { id: Frente; label: string; cor: string }[] = [
  { id: "schools", label: "Schools", cor: "var(--blue)" },
  { id: "learners", label: "Learners", cor: "var(--red)" },
  { id: "professionals", label: "Professionals", cor: "var(--orange)" },
];

export interface PremissasFrente {
  frente: Frente;
  ano1Clientes: number;
  ticketMedioAnual: number;
  crescimentoClientesPct: number;
  reajustePrecosPct: number;
}

export interface CustoItem {
  id: string;
  tipo: "fixo" | "variavel";
  categoria: string;
  valorMensal: number;
  reajusteAnualPct: number;
  percentualReceitaPct?: number | null;
}

export interface ProjecaoAno {
  ano: number;
  receitaPorFrente: Record<Frente, number>;
  receitaBruta: number;
  custosFixos: number;
  custosVariaveis: number;
  custosTotais: number;
  resultadoLiquido: number;
  margemLiquidaPct: number;
  resultadoAcumulado: number;
}

export interface ResultadoProjecao {
  anos: ProjecaoAno[];
  paybackMeses: number | null;
  breakevenAno: number | null;
}

function receitaFrenteNoAno(p: PremissasFrente, ano: number): number {
  const clientes = p.ano1Clientes * Math.pow(1 + p.crescimentoClientesPct / 100, ano - 1);
  const ticket = p.ticketMedioAnual * Math.pow(1 + p.reajustePrecosPct / 100, ano - 1);
  return clientes * ticket;
}

function custoNoAno(c: CustoItem, ano: number, receitaBrutaDoAno: number): number {
  if (c.percentualReceitaPct != null) {
    return receitaBrutaDoAno * (c.percentualReceitaPct / 100);
  }
  return c.valorMensal * 12 * Math.pow(1 + c.reajusteAnualPct / 100, ano - 1);
}

export function calcularProjecaoFinanceira(
  premissas: PremissasFrente[],
  custos: CustoItem[],
  investimentoInicial: number,
  aliquotaImpostosPct = 0,
  numAnos = 5
): ResultadoProjecao {
  const anos: ProjecaoAno[] = [];
  let resultadoAcumulado = -investimentoInicial;

  for (let ano = 1; ano <= numAnos; ano++) {
    const receitaPorFrente = {} as Record<Frente, number>;
    for (const p of premissas) {
      receitaPorFrente[p.frente] = receitaFrenteNoAno(p, ano);
    }
    const receitaBruta = Object.values(receitaPorFrente).reduce((a, b) => a + b, 0);

    let custosFixos = 0;
    let custosVariaveis = 0;
    for (const c of custos) {
      const valor = custoNoAno(c, ano, receitaBruta);
      if (c.tipo === "fixo") custosFixos += valor;
      else custosVariaveis += valor;
    }
    const custosTotais = custosFixos + custosVariaveis;

    const resultadoLiquido = (receitaBruta - custosTotais) * (1 - aliquotaImpostosPct / 100);
    const margemLiquidaPct = receitaBruta > 0 ? (resultadoLiquido / receitaBruta) * 100 : 0;

    const acumuladoAnterior = resultadoAcumulado;
    resultadoAcumulado += resultadoLiquido;

    anos.push({
      ano,
      receitaPorFrente,
      receitaBruta,
      custosFixos,
      custosVariaveis,
      custosTotais,
      resultadoLiquido,
      margemLiquidaPct,
      resultadoAcumulado,
    });
  }

  const breakevenAno = anos.find((a) => a.resultadoLiquido > 0)?.ano ?? null;

  let paybackMeses: number | null = null;
  let acumuladoAnterior = -investimentoInicial;
  for (const a of anos) {
    if (acumuladoAnterior < 0 && a.resultadoAcumulado >= 0 && a.resultadoLiquido !== 0) {
      const fracaoDoAno = -acumuladoAnterior / a.resultadoLiquido;
      paybackMeses = (a.ano - 1) * 12 + fracaoDoAno * 12;
      break;
    }
    acumuladoAnterior = a.resultadoAcumulado;
  }

  return { anos, paybackMeses, breakevenAno };
}
