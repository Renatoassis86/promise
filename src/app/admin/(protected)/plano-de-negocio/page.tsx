import { createClient } from "@/lib/supabase/server";
import PlanoNegocioForm from "@/components/PlanoNegocioForm";

export default async function PlanoDeNegocioPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: respostasRows } = await supabase
    .from("plano_negocio_respostas")
    .select("question_id, resposta")
    .eq("user_email", user!.email!);

  const respostasIniciais: Record<string, string> = {};
  for (const row of respostasRows ?? []) {
    respostasIniciais[row.question_id] = row.resposta ?? "";
  }

  return <PlanoNegocioForm userEmail={user!.email!} respostasIniciais={respostasIniciais} />;
}
