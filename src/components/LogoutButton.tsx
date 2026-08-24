"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      style={{ background: "none", border: "1px solid var(--line)", borderRadius: 999, padding: "9px 18px", fontSize: 13.5, fontWeight: 700, color: "var(--ink)", cursor: "pointer" }}
    >
      Sair
    </button>
  );
}
