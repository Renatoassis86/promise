"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [form, setForm] = useState({ nome: "", email: "", whatsapp: "", mensagem: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setStatus(data.success ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Mensagem recebida.</div>
        <p style={{ margin: 0, color: "var(--ink-soft)", fontSize: 14 }}>A gente entra em contato em breve.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 18 }}>
        <div className="field">
          <label>Nome</label>
          <input required value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Seu nome" />
        </div>
        <div className="field">
          <label>WhatsApp</label>
          <input required value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} placeholder="(00) 00000-0000" />
        </div>
      </div>
      <div className="field">
        <label>E-mail</label>
        <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="voce@email.com" />
      </div>
      <div className="field">
        <label>Sua dúvida ou o que você quer entender melhor</label>
        <textarea
          rows={3}
          value={form.mensagem}
          onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
          placeholder="Ainda não sei qual frente é a minha / Quero entender melhor o programa de..."
        />
      </div>
      {status === "error" && (
        <div style={{ fontSize: 13, color: "var(--red)" }}>Não deu pra enviar agora. Tenta de novo ou chama no WhatsApp.</div>
      )}
      <button type="submit" disabled={status === "loading"} className="pill pill-red" style={{ justifyContent: "center" }}>
        {status === "loading" ? "Enviando..." : "Quero atendimento personalizado"}
      </button>
    </form>
  );
}
