import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminAuthForm from "@/components/AdminAuthForm";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/adminAuth";

export default async function AdminLoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user && isAdminEmail(user.email)) redirect("/admin");

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div className="blob" style={{ top: -100, right: -140, width: 460, height: 460, background: "var(--blue)", opacity: 0.09 }} />

      <Header />

      <section className="section-pad" style={{ padding: "90px 40px" }}>
        <div className="container" style={{ maxWidth: 440 }}>
          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 18, padding: 40 }}>
            <span className="eyebrow" style={{ color: "var(--blue)" }}>Acesso restrito</span>
            <h1 style={{ margin: "10px 0 22px", fontSize: 24, fontWeight: 800 }}>Área administrativa</h1>
            <AdminAuthForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
