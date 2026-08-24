import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)", background: "#fff", padding: "56px 40px 28px" }}>
      <div
        className="container grid-tablet-2 grid-mobile-1"
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          gap: 40,
          paddingBottom: 36,
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div>
          <Image src="/assets/promise-english-logo.png" alt="Promise English" width={140} height={49} style={{ height: 32, width: "auto", marginBottom: 14 }} />
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "var(--ink-soft)", maxWidth: 280 }}>
            Ecossistema de internacionalização educacional para escolas, famílias e professores, fundamentado em excelência acadêmica e cosmovisão cristã.
          </p>
        </div>
        <div>
          <h4 style={{ margin: "0 0 14px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--red)" }}>Frentes</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13 }}>
            <Link href="/quem-somos" style={{ color: "var(--ink-soft)" }}>Quem Somos</Link>
            <Link href="/schools" style={{ color: "var(--ink-soft)" }}>Promise for Schools</Link>
            <Link href="/learners" style={{ color: "var(--ink-soft)" }}>Promise for Learners</Link>
            <Link href="/professionals" style={{ color: "var(--ink-soft)" }}>Promise for Professionals</Link>
            <Link href="/global" style={{ color: "var(--ink-soft)" }}>Promise Global</Link>
          </div>
        </div>
        <div>
          <h4 style={{ margin: "0 0 14px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--red)" }}>Fale Conosco</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: "var(--ink-soft)" }}>
            <a href="mailto:calebe@promiseenglish.com" style={{ color: "var(--ink-soft)", wordBreak: "break-all" }}>calebe@promiseenglish.com</a>
            <div>(83) 99697-7969</div>
            <a href="https://wa.me/5583996977969" target="_blank" rel="noreferrer" style={{ color: "var(--red)", fontWeight: 700 }}>Falar no WhatsApp &rarr;</a>
          </div>
        </div>
        <div>
          <h4 style={{ margin: "0 0 14px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--red)" }}>Localização</h4>
          <div style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.6 }}>João Pessoa - PB</div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 22, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>© {new Date().getFullYear()} Promise English. Todos os direitos reservados.</div>
        <div style={{ display: "flex", gap: 10 }}>
          <a href="mailto:calebe@promiseenglish.com" title="E-mail" style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--orange)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
          </a>
          <a href="https://wa.me/5583996977969" target="_blank" rel="noreferrer" title="WhatsApp" style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--orange)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
          </a>
          <a href="https://www.instagram.com/promise.english" target="_blank" rel="noreferrer" title="Instagram" style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--orange)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
          </a>
          <a href="https://www.youtube.com/watch?v=jIPAD8Ny6Mw" target="_blank" rel="noreferrer" title="YouTube" style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--orange)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.5 6.2a2.8 2.8 0 0 0-2-2C18.9 3.7 12 3.7 12 3.7s-6.9 0-8.5.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 5.8 2.8 2.8 0 0 0 2 2c1.6.5 8.5.5 8.5.5s6.9 0 8.5-.5a2.8 2.8 0 0 0 2-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-5.8z" /><polygon points="9.8 15.5 15.8 12 9.8 8.5" fill="currentColor" stroke="none" /></svg>
          </a>
        </div>
      </div>

      <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--line)" }}>
        <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, fontSize: 11.5 }}>
          <span style={{ color: "var(--ink-soft)" }}>Site desenvolvido por</span>
          <a
            href="https://arkosintelligence.com"
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--ink-soft)", fontWeight: 700 }}
          >
            ARKOS Soluções Digitais
          </a>
        </div>
      </div>
    </footer>
  );
}
