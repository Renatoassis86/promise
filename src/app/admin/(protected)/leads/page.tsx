import { createClient } from "@/lib/supabase/server";
import LeadsPainel, { type ContatoGeral, type PreMatricula } from "@/components/admin/LeadsPainel";

export default async function LeadsPage() {
  const supabase = await createClient();

  const [{ data: matriculasRows }, { data: contatosRows }] = await Promise.all([
    supabase.from("pre_matriculas").select("*").order("created_at", { ascending: false }),
    supabase.from("contatos_gerais").select("*").order("created_at", { ascending: false }),
  ]);

  return (
    <LeadsPainel
      matriculasIniciais={(matriculasRows ?? []) as PreMatricula[]}
      contatosIniciais={(contatosRows ?? []) as ContatoGeral[]}
    />
  );
}
