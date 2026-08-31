import { createClient } from "@/lib/supabase/server";
import ApresentacaoPlanoDeNegocio from "@/components/admin/ApresentacaoPlanoDeNegocio";
import { APRESENTACAO_SLIDES } from "@/lib/apresentacaoSlides";
import { calcularProjecaoFinanceira, type CustoItem, type Frente, type PremissasFrente } from "@/lib/financasCalculo";

export default async function ApresentacaoPlanoDeNegocioPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userEmail = user!.email!;

  const [{ data: premissasRows }, { data: custosRows }, { data: configRow }] = await Promise.all([
    supabase.from("plano_financas_premissas").select("*").eq("user_email", userEmail),
    supabase.from("plano_financas_custos").select("*").eq("user_email", userEmail),
    supabase.from("plano_financas_config").select("*").eq("user_email", userEmail).maybeSingle(),
  ]);

  const premissas: PremissasFrente[] = (["schools", "learners", "professionals"] as Frente[]).map((frente) => {
    const row = premissasRows?.find((r) => r.frente === frente);
    return {
      frente,
      ano1Clientes: Number(row?.ano1_clientes ?? 0),
      ticketMedioAnual: Number(row?.ticket_medio_anual ?? 0),
      crescimentoClientesPct: Number(row?.crescimento_clientes_pct ?? 0),
      reajustePrecosPct: Number(row?.reajuste_precos_pct ?? 0),
    };
  });

  const custos: CustoItem[] = (custosRows ?? []).map((row) => ({
    id: row.id,
    tipo: row.tipo,
    categoria: row.categoria,
    valorMensal: Number(row.valor_mensal ?? 0),
    reajusteAnualPct: Number(row.reajuste_anual_pct ?? 0),
    percentualReceitaPct: row.percentual_receita_pct != null ? Number(row.percentual_receita_pct) : null,
  }));

  const resultadoFinanceiro = calcularProjecaoFinanceira(
    premissas,
    custos,
    Number(configRow?.investimento_inicial ?? 0),
    Number(configRow?.aliquota_impostos_pct ?? 0),
    5
  );

  const temPremissasPreenchidas = premissas.some((p) => p.ano1Clientes > 0 || p.ticketMedioAnual > 0);

  return (
    <ApresentacaoPlanoDeNegocio
      slides={APRESENTACAO_SLIDES}
      resultadoFinanceiro={resultadoFinanceiro}
      temPremissasPreenchidas={temPremissasPreenchidas}
    />
  );
}
