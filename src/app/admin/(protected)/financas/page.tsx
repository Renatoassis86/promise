import { createClient } from "@/lib/supabase/server";
import FinancasCrescimentoForm, { type CustoItemInicial, type PremissasIniciais } from "@/components/admin/FinancasCrescimentoForm";
import type { Frente } from "@/lib/financasCalculo";

export default async function FinancasCrescimentoPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userEmail = user!.email!;

  const [{ data: premissasRows }, { data: custosRows }, { data: configRow }] = await Promise.all([
    supabase.from("plano_financas_premissas").select("*").eq("user_email", userEmail),
    supabase.from("plano_financas_custos").select("*").eq("user_email", userEmail).order("ordem", { ascending: true }),
    supabase.from("plano_financas_config").select("*").eq("user_email", userEmail).maybeSingle(),
  ]);

  const premissasIniciais: PremissasIniciais = {} as PremissasIniciais;
  for (const row of premissasRows ?? []) {
    const frente = row.frente as Frente;
    premissasIniciais[frente] = {
      frente,
      ano1Clientes: Number(row.ano1_clientes ?? 0),
      ticketMedioAnual: Number(row.ticket_medio_anual ?? 0),
      crescimentoClientesPct: Number(row.crescimento_clientes_pct ?? 0),
      reajustePrecosPct: Number(row.reajuste_precos_pct ?? 0),
      churnRetencaoPct: row.churn_retencao_pct != null ? Number(row.churn_retencao_pct) : null,
      taxaConversaoPct: row.taxa_conversao_pct != null ? Number(row.taxa_conversao_pct) : null,
      cac: row.cac != null ? Number(row.cac) : null,
      observacoes: row.observacoes ?? "",
    };
  }

  const custosIniciais: CustoItemInicial[] = (custosRows ?? []).map((row) => ({
    id: row.id,
    tipo: row.tipo,
    categoria: row.categoria,
    valorMensal: Number(row.valor_mensal ?? 0),
    reajusteAnualPct: Number(row.reajuste_anual_pct ?? 0),
    percentualReceitaPct: row.percentual_receita_pct != null ? Number(row.percentual_receita_pct) : null,
    ordem: row.ordem ?? 0,
  }));

  return (
    <FinancasCrescimentoForm
      userEmail={userEmail}
      premissasIniciais={premissasIniciais}
      custosIniciais={custosIniciais}
      investimentoInicialInicial={Number(configRow?.investimento_inicial ?? 0)}
      aliquotaImpostosPctInicial={Number(configRow?.aliquota_impostos_pct ?? 0)}
    />
  );
}
