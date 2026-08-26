"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid var(--line)",
  fontSize: 14.5,
};

export default function AdminAuthForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    setLoading(false);
    if (error) {
      setError(error.message.includes("Invalid login credentials") ? "E-mail ou senha incorretos." : error.message);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, marginBottom: 6, color: "var(--ink-soft)" }}>E-MAIL</label>
        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" style={inputStyle} />
      </div>
      <div>
        <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, marginBottom: 6, color: "var(--ink-soft)" }}>SENHA</label>
        <input required type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" style={inputStyle} />
      </div>

      {error && <p style={{ margin: 0, fontSize: 13.5, color: "var(--red)" }}>{error}</p>}

      <button type="submit" disabled={loading} className="pill pill-red" style={{ justifyContent: "center", border: "none", cursor: loading ? "default" : "pointer", opacity: loading ? 0.7 : 1 }}>
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
