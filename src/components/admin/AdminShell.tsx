"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const NAV_ITEMS = [
  { href: "/admin/plano-de-negocio", label: "Plano de Negócio" },
  { href: "/admin/apresentacao", label: "Apresentação Plano de Negócio" },
  { href: "/admin/financas", label: "Finanças e Crescimento" },
];

export default function AdminShell({
  userEmail,
  children,
}: {
  userEmail: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-shell" style={{ display: "flex", minHeight: "100vh", background: "var(--tint)" }}>
      {/* SIDEBAR */}
      <aside
        className="admin-sidebar"
        style={{
          width: 268,
          flexShrink: 0,
          background: "var(--ink)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <div className="admin-sidebar-header" style={{ padding: "26px 24px 20px" }}>
          <div style={{ fontWeight: 800, fontSize: 15 }}>Promise English</div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#8A93AE", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>
            Painel administrativo
          </div>
        </div>

        <nav className="admin-sidebar-nav" style={{ flex: 1, overflowY: "auto", padding: "8px 12px" }}>
          <div
            className="admin-sidebar-nav-label"
            style={{ padding: "10px 12px 8px", fontSize: 11, fontWeight: 700, color: "#6B7390", textTransform: "uppercase", letterSpacing: "0.06em" }}
          >
            Áreas
          </div>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  width: "100%",
                  textAlign: "left",
                  display: "block",
                  padding: "10px 12px",
                  borderRadius: 8,
                  textDecoration: "none",
                  background: isActive ? "rgba(255,255,255,.08)" : "transparent",
                  color: isActive ? "#fff" : "#B8BCC8",
                  fontWeight: isActive ? 700 : 600,
                  fontSize: 13.5,
                  marginBottom: 2,
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer" style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,.1)" }}>
          <div className="admin-sidebar-email" style={{ fontSize: 12, color: "#8A93AE", marginBottom: 12, wordBreak: "break-all" }}>
            {userEmail}
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            style={{
              width: "100%",
              background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.14)",
              borderRadius: 8,
              padding: "9px 0",
              fontSize: 13,
              fontWeight: 700,
              color: "#fff",
              cursor: loggingOut ? "default" : "pointer",
            }}
          >
            {loggingOut ? "Saindo..." : "Sair"}
          </button>
        </div>
      </aside>

      {/* CONTEUDO */}
      <main className="admin-main" style={{ flex: 1, padding: "40px 48px 90px", minWidth: 0 }}>
        {children}
      </main>
    </div>
  );
}
