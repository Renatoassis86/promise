import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export default function LoginPage() {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div className="blob" style={{ top: -100, right: -140, width: 460, height: 460, background: "var(--blue)", opacity: 0.09 }} />

      <Header />

      <section style={{ padding: "90px 40px" }}>
        <div className="container" style={{ maxWidth: 560 }}>
          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 18, padding: 40 }}>
            <span className="eyebrow" style={{ color: "var(--blue)" }}>Área do aluno e da escola</span>
            <h1 style={{ margin: "10px 0 8px", fontSize: 24, fontWeight: 800 }}>Ainda estamos construindo essa área</h1>
            <p style={{ margin: "0 0 28px", fontSize: 14.5, lineHeight: 1.65, color: "var(--ink-soft)", textAlign: "justify" }}>
              Em breve você vai poder acompanhar sua matrícula, solicitar propostas e agendar reuniões direto por aqui. Enquanto isso, deixe seu contato abaixo que a gente avisa assim que estiver disponível.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
