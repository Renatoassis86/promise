import { redirect } from "next/navigation";
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
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--ink)", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", letterSpacing: "0.02em" }}>Promise English</div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: "#8A93AE", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>Painel administrativo</div>
        </div>
        <div style={{ background: "#fff", borderRadius: 18, padding: 36 }}>
          <AdminAuthForm />
        </div>
      </div>
    </div>
  );
}
