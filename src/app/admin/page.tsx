import { redirect } from "next/navigation";
import PlanoNegocioForm from "@/components/PlanoNegocioForm";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/adminAuth";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");
  if (!isAdminEmail(user.email)) redirect("/");

  const { data: respostasRows } = await supabase
    .from("plano_negocio_respostas")
    .select("question_id, resposta")
    .eq("user_email", user.email);

  const respostasIniciais: Record<string, string> = {};
  for (const row of respostasRows ?? []) {
    respostasIniciais[row.question_id] = row.resposta ?? "";
  }

  return <PlanoNegocioForm userEmail={user.email!} respostasIniciais={respostasIniciais} />;
}
