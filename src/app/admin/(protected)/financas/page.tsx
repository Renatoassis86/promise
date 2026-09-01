import { createClient } from "@/lib/supabase/server";
import FinancasCrescimentoForm from "@/components/admin/FinancasCrescimentoForm";
import type { LinhaFinanceira, Frente, TipoLinha, ModoLinha } from "@/lib/financasCalculo";

export default async function FinancasCrescimentoPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userEmail = user!.email!;

  const [{ data: linhasRows }, { data: configRow }] = await Promise.all([
    supabase.from("plano_financas_linhas").select("*").eq("user_email", userEmail).order("ordem", { ascending: true }),
    supabase.from("plano_financas_config").select("*").eq("user_email", userEmail).maybeSingle(),
  ]);

  const linhas: LinhaFinanceira[] = (linhasRows ?? []).map((row) => ({
    id: row.id,
    tipo: row.tipo as TipoLinha,
    modo: row.modo as ModoLinha,
    macroArea: row.macro_area,
    rubrica: row.rubrica,
    frente: (row.frente as Frente) ?? null,
    ticketMedio: row.ticket_medio != null ? Number(row.ticket_medio) : null,
    reajusteTicketPct: row.reajuste_ticket_pct != null ? Number(row.reajuste_ticket_pct) : 0,
    percentualReceitaPct: row.percentual_receita_pct != null ? Number(row.percentual_receita_pct) : null,
    valoresPorAno: Object.fromEntries(Object.entries(row.valores_por_ano ?? {}).map(([ano, v]) => [Number(ano), Number(v)])),
    ordem: row.ordem ?? 0,
  }));

  return (
    <FinancasCrescimentoForm
      userEmail={userEmail}
      linhasIniciais={linhas}
      investimentoInicialInicial={Number(configRow?.investimento_inicial ?? 0)}
    />
  );
}
