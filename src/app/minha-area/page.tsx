import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LogoutButton from "@/components/LogoutButton";
import { createClient } from "@/lib/supabase/server";

const TIPO_LABEL: Record<string, string> = {
  schools: "Escola",
  learners: "Aluno / Responsável",
  professionals: "Professor / Coordenador",
};

export default async function MinhaAreaPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: matriculas } = await supabase
    .from("pre_matriculas")
    .select("tipo, status, modalidade, objetivo, certificacao, created_at")
    .order("created_at", { ascending: false });

  const nome = (user.user_metadata?.nome as string | undefined) || user.email;

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div className="blob" style={{ top: -100, right: -140, width: 460, height: 460, background: "var(--blue)", opacity: 0.09 }} />

      <Header />

      <section style={{ padding: "70px 40px" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
            <div>
              <span className="eyebrow" style={{ color: "var(--blue)" }}>Área do aluno e da família</span>
              <h1 style={{ margin: "10px 0 4px", fontSize: 26, fontWeight: 800 }}>Olá, {nome}</h1>
              <p style={{ margin: 0, fontSize: 14, color: "var(--ink-soft)" }}>{user.email}</p>
            </div>
            <LogoutButton />
          </div>

          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 18, padding: 32 }}>
            <h2 style={{ margin: "0 0 18px", fontSize: 18, fontWeight: 800 }}>Suas solicitações</h2>

            {matriculas && matriculas.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {matriculas.map((m, i) => (
                  <div key={i} style={{ border: "1px solid var(--line)", borderRadius: 12, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14.5 }}>{TIPO_LABEL[m.tipo] || m.tipo}</div>
                      <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>
                        {[m.modalidade, m.objetivo, m.certificacao].filter(Boolean).join(" · ") || "Pré-matrícula enviada"}
                      </div>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "var(--blue)", background: "var(--tint)", padding: "5px 12px", borderRadius: 999 }}>
                      {m.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "var(--ink-soft)" }}>
                Nenhuma pré-matrícula vinculada a este e-mail ainda. Preencha um dos formulários do site (Schools, Learners, Professionals) usando o mesmo e-mail da sua conta para acompanhar por aqui.
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
