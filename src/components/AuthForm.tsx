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

export default function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "cadastro">("login");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    const supabase = createClient();

    if (mode === "cadastro") {
      const { error } = await supabase.auth.signUp({
        email,
        password: senha,
        options: { data: { nome } },
      });
      setLoading(false);
      if (error) {
        setError(traduzErro(error.message));
        return;
      }
      setInfo("Cadastro feito! Verifique seu e-mail para confirmar a conta antes de entrar.");
      setMode("login");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    setLoading(false);
    if (error) {
      setError(traduzErro(error.message));
      return;
    }
    router.push("/minha-area");
    router.refresh();
  }

  return (
    <div>
      <div style={{ display: "flex", gap: 4, background: "var(--tint)", borderRadius: 10, padding: 4, marginBottom: 26 }}>
        {(["login", "cadastro"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              setError(null);
              setInfo(null);
            }}
            style={{
              flex: 1,
              padding: "10px 0",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 14,
              background: mode === m ? "#fff" : "transparent",
              color: mode === m ? "var(--ink)" : "var(--ink-soft)",
              boxShadow: mode === m ? "0 1px 3px rgba(0,0,0,.08)" : "none",
            }}
          >
            {m === "login" ? "Entrar" : "Criar conta"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {mode === "cadastro" && (
          <div>
            <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, marginBottom: 6, color: "var(--ink-soft)" }}>NOME</label>
            <input required value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome completo" style={inputStyle} />
          </div>
        )}
        <div>
          <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, marginBottom: 6, color: "var(--ink-soft)" }}>E-MAIL</label>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" style={inputStyle} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, marginBottom: 6, color: "var(--ink-soft)" }}>SENHA</label>
          <input required minLength={6} type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Mínimo 6 caracteres" style={inputStyle} />
        </div>

        {error && <p style={{ margin: 0, fontSize: 13.5, color: "var(--red)" }}>{error}</p>}
        {info && <p style={{ margin: 0, fontSize: 13.5, color: "var(--blue)" }}>{info}</p>}

        <button type="submit" disabled={loading} className="pill pill-red" style={{ justifyContent: "center", border: "none", cursor: loading ? "default" : "pointer", opacity: loading ? 0.7 : 1 }}>
          {loading ? "Enviando..." : mode === "login" ? "Entrar" : "Criar minha conta"}
        </button>
      </form>
    </div>
  );
}

function traduzErro(msg: string) {
  if (msg.includes("Invalid login credentials")) return "E-mail ou senha incorretos.";
  if (msg.includes("already registered")) return "Já existe uma conta com esse e-mail.";
  if (msg.includes("Password should be")) return "A senha precisa ter pelo menos 6 caracteres.";
  return msg;
}
