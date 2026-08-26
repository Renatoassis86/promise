import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LogoutButton from "@/components/LogoutButton";
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

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <Header />

      <section style={{ padding: "50px 40px 90px" }}>
        <div className="container" style={{ maxWidth: 980 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
            <div>
              <span className="eyebrow" style={{ color: "var(--blue)" }}>Área administrativa</span>
              <h1 style={{ margin: "10px 0 4px", fontSize: 26, fontWeight: 800 }}>Plano de Negócio da Promise</h1>
              <p style={{ margin: 0, fontSize: 14, color: "var(--ink-soft)" }}>Responda item a item, por aba. Suas respostas são salvas automaticamente.</p>
            </div>
            <LogoutButton />
          </div>

          <PlanoNegocioForm userEmail={user.email!} respostasIniciais={respostasIniciais} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
