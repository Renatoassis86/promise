import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhotoCard from "@/components/PhotoCard";
import ContactForm from "@/components/ContactForm";
import PartnersCarousel from "@/components/PartnersCarousel";
import Link from "next/link";
import Icon from "@/components/Icons";

const HERO_BADGES = [
  { icon: "cap" as const, label: "Consultoria, currículo e formação docente", color: "var(--red)" },
  { icon: "shield" as const, label: "Certificações Cambridge", color: "var(--blue)" },
  { icon: "home" as const, label: "Programas de American School e intercâmbio", color: "var(--red)" },
  { icon: "users" as const, label: "Organizados sob a mesma cosmovisão cristã", color: "var(--blue)" },
];

const FRENTES_CARDS = [
  {
    href: "/schools",
    photo: "/assets/card-schools.jpg",
    pos: "50% 35%",
    icon: "home" as const,
    color: "var(--blue)",
    title: "Sou uma escola",
    text: "Diagnóstico direto com um consultor antes de qualquer proposta de implementação de programa internacional.",
    items: ["Planejamento estratégico personalizado", "Implementação de currículo internacional", "Acompanhamento e consultoria contínua", "Certificações e parcerias globais"],
    cta: "Ver Promise for Schools",
  },
  {
    href: "/learners",
    photo: "/assets/card-learners.jpg",
    pos: "50% 20%",
    icon: "cap" as const,
    color: "var(--red)",
    title: "Sou aluno ou responsável",
    text: "Inglês, certificações Cambridge, American School e experiências internacionais, com acompanhamento direto.",
    items: ["Preparação para certificações internacionais", "Aulas de inglês e programas bilíngues", "Intercâmbio e vivências internacionais", "Acompanhamento individualizado"],
    cta: "Ver Promise for Learners",
  },
  {
    href: "/professionals",
    photo: "/assets/card-professionals.jpg",
    pos: "50% 25%",
    icon: "users" as const,
    color: "var(--blue)",
    title: "Sou professor ou coordenador",
    text: "Certificações TKT, CELTA e DELTA, mentoria individual e formação de liderança educacional.",
    items: ["Certificações internacionais", "Mentoria e desenvolvimento profissional", "Formação de liderança educacional", "Comunidade e networking global"],
    cta: "Ver Promise for Professionals",
  },
];

export default function Home() {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div className="blob" style={{ top: -120, right: -140, width: 520, height: 520, background: "var(--red)", opacity: 0.1 }} />
      <div className="blob" style={{ top: 900, left: -160, width: 460, height: 460, background: "var(--blue)", opacity: 0.08 }} />

      <Header />

      {/* HERO - texto a esquerda, badges flutuantes a direita sobre a foto */}
      <section
        className="section-pad"
        style={{
          position: "relative",
          minHeight: 600,
          display: "flex",
          alignItems: "center",
          padding: "110px 40px",
          background:
            "linear-gradient(100deg, rgba(9,13,28,.86) 0%, rgba(9,13,28,.62) 42%, rgba(9,13,28,.28) 68%, rgba(9,13,28,.12) 100%), url('/assets/hero-home.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container hero-home-inner" style={{ maxWidth: 1240, width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 600, display: "flex", flexDirection: "column", gap: 20 }}>
            <span className="eyebrow" style={{ color: "#9DB0F0" }}>Internacionalização educacional</span>
            <h1 className="fluid-h1" style={{ margin: 0, fontSize: 46, lineHeight: 1.16, fontWeight: 900, color: "#fff" }}>
              O futuro <span style={{ color: "var(--red)" }}>global</span><br />
              <span style={{ position: "relative", display: "inline-block" }}>
                começa aqui
                <span style={{ position: "absolute", left: 0, right: 0, bottom: -6, height: 3, background: "var(--red)", borderRadius: 2 }} />
              </span>
            </h1>
            <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.6, color: "#DCE0EE", maxWidth: 500, textAlign: "justify" }}>
              Estruturamos a internacionalização de escolas cristãs e famílias homeschooling, formando professores e preparando alunos para certificações internacionais.
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 8, flexWrap: "wrap" }}>
              <a href="https://wa.me/5583996977969" target="_blank" rel="noreferrer" className="pill pill-red">Falar com a Promise</a>
              <a href="#frentes" className="pill" style={{ background: "rgba(255,255,255,.12)", color: "#fff", border: "1px solid rgba(255,255,255,.45)" }}>Conhecer as frentes</a>
            </div>
          </div>

          <div className="hero-badges" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {HERO_BADGES.map((b) => (
              <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(9,13,28,.6)", border: "1px solid rgba(255,255,255,.16)", borderRadius: 999, padding: "8px 20px 8px 8px", maxWidth: 260 }}>
                <span style={{ width: 38, height: 38, borderRadius: "50%", background: b.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name={b.icon} size={18} />
                </span>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRIAGEM POR PUBLICO */}
      <section className="section-pad" id="frentes" style={{ padding: "70px 40px 40px", background: "var(--tint)" }}>
        <div className="container" style={{ padding: 0, maxWidth: 760, margin: "0 auto 40px", textAlign: "center" }}>
          <span className="eyebrow" style={{ color: "var(--blue)" }}>Qual dessas frentes é a sua?</span>
          <span style={{ display: "block", width: 24, height: 3, borderRadius: 2, background: "var(--red)", margin: "10px auto 12px" }} />
          <h2 style={{ margin: "0 0 10px", fontSize: 28, fontWeight: 800 }}>
            Soluções internacionais para <span style={{ color: "var(--blue)" }}>cada missão</span> educacional.
          </h2>
          <p style={{ margin: 0, fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.6 }}>
            Seja qual for o seu papel na educação, temos o caminho ideal para levar sua jornada para o próximo nível.
          </p>
        </div>
        <div className="container" style={{ padding: 0 }}>
          <div className="grid-mobile-1" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 24 }}>
            {FRENTES_CARDS.map((c, i) => (
              <div key={c.href} className={`reveal reveal-delay-${i + 1}`} style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 14, display: "flex", flexDirection: "column" }}>
                <div style={{ position: "relative", height: 190, borderRadius: "14px 14px 0 0", overflow: "hidden" }}>
                  <Image src={c.photo} alt={c.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px" style={{ objectFit: "cover", objectPosition: c.pos }} />
                </div>
                <div style={{ padding: "0 24px", marginTop: -22 }}>
                  <span style={{ width: 44, height: 44, borderRadius: "50%", background: c.color, display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid #fff" }}>
                    <Icon name={c.icon} size={20} />
                  </span>
                </div>
                <div style={{ padding: "14px 24px 24px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                  <div style={{ fontSize: 19, fontWeight: 700 }}>{c.title}</div>
                  <span style={{ display: "block", width: 24, height: 3, borderRadius: 2, background: "var(--red)" }} />
                  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "var(--ink-soft)", textAlign: "justify" }}>{c.text}</p>
                  <div style={{ display: "grid", gap: 7, margin: "2px 0 4px" }}>
                    {c.items.map((item) => (
                      <div key={item} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <span style={{ width: 16, height: 16, borderRadius: "50%", background: c.color, color: "#fff", fontSize: 9, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>✓</span>
                        <span style={{ fontSize: 12.5, lineHeight: 1.5, color: "var(--ink-soft)" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <Link href={c.href} className="pill" style={{ marginTop: "auto", justifyContent: "center", width: "100%", background: c.color, color: "#fff", fontSize: 13.5, padding: "11px 16px" }}>
                    {c.cta} &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACTO GLOBAL - barra de valores */}
      <section className="section-pad" style={{ padding: "0 40px 70px", background: "var(--tint)" }}>
        <div className="container reveal" style={{ padding: 0 }}>
          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 16, padding: "24px 32px", display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, flex: "1 1 300px" }}>
              <span style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name="globe" size={20} />
              </span>
              <div>
                <div style={{ fontSize: 15.5, fontWeight: 800 }}>Impacto global. Valores eternos.</div>
                <p style={{ margin: 0, fontSize: 12.5, color: "var(--ink-soft)" }}>Formamos pessoas para o mundo sem abrir mão do que realmente importa.</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 28, flexWrap: "wrap", flex: "2 1 480px" }}>
              {[
                { icon: "shield" as const, color: "var(--blue)", t: "Excelência", d: "Padrões internacionais de qualidade" },
                { icon: "heart" as const, color: "var(--red)", t: "Propósito", d: "Educação com valores cristãos" },
                { icon: "globe" as const, color: "var(--blue)", t: "Alcance global", d: "Conexões que abrem novos caminhos" },
              ].map((f) => (
                <div key={f.t} style={{ display: "flex", alignItems: "center", gap: 10, flex: "1 1 140px" }}>
                  <span style={{ width: 34, height: 34, borderRadius: "50%", background: f.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name={f.icon} size={16} />
                  </span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{f.t}</div>
                    <p style={{ margin: 0, fontSize: 11.5, color: "var(--ink-soft)", lineHeight: 1.4 }}>{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AUTORIDADE */}
      <section className="section-pad" style={{ background: "var(--blue)", padding: "64px 40px", position: "relative", overflow: "hidden" }}>
        <div className="blob" style={{ bottom: -100, right: 80, width: 300, height: 300, background: "#fff", opacity: 0.05 }} />
        <div className="container reveal" style={{ padding: 0, display: "flex", gap: 48, alignItems: "center", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
          <PhotoCard src="/assets/calebe-familia.jpg" alt="Calebe Braga e sua família" height={340} accent="#fff" />
          <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1, minWidth: 280 }}>
            <span className="eyebrow" style={{ color: "#9DB0F0" }}>Quem estrutura os seus programas</span>
            <h2 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#fff" }}>Calebe Braga</h2>
            <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: "#D6DCF5", textAlign: "justify" }}>
              Há mais de 8 anos à frente de um Centro Preparatório Oficial de Cambridge, é autor das coleções Paideia, Oikos e To the Nations.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 4 }}>
              {["Centro Preparatório Oficial Cambridge", "CELTA (Cambridge)", "14+ anos de atuação"].map((b) => (
                <span key={b} style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.25)", color: "#fff", fontSize: 12.5, fontWeight: 600, padding: "7px 14px", borderRadius: 999 }}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4 FRENTES PREVIEW */}
      <section className="section-pad" style={{ padding: "80px 40px", background: "var(--ink)" }}>
        <div className="container grid-tablet-2 grid-mobile-1" style={{ padding: 0, display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 32 }}>
          {[
            { label: "PROMISE FOR SCHOOLS", text: "Diagnóstico direto com um consultor antes de qualquer proposta de implementação." },
            { label: "PROMISE FOR LEARNERS", text: "Preparação para certificações Cambridge com quem tem experiência real nesse sistema de exames." },
            { label: "PROMISE FOR PROFESSIONALS", text: "Mentoria individual em cada etapa da certificação, não apenas aulas em turma." },
            { label: "PROMISE GLOBAL", text: "Intercâmbios, parcerias e cooperação acadêmica com instituições estrangeiras." },
          ].map((f, i) => (
            <div key={f.label} className={`reveal reveal-delay-${i + 1}`} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--red)", letterSpacing: "0.06em" }}>{f.label}</div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#B8BCC8", textAlign: "justify" }}>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <PartnersCarousel />

      {/* CONTATO GERAL - atendimento personalizado / duvidas */}
      <section className="section-pad" style={{ padding: "80px 40px", background: "var(--tint)" }}>
        <div className="container reveal" style={{ padding: 0, maxWidth: 720, display: "flex", flexDirection: "column", gap: 8, alignItems: "center", textAlign: "center" }}>
          <span className="eyebrow" style={{ color: "var(--blue)" }}>Ainda com dúvidas?</span>
          <h2 style={{ margin: "6px 0 8px", fontSize: 26, fontWeight: 800 }}>Fale com a gente</h2>
          <p style={{ margin: "0 0 28px", fontSize: 15, color: "var(--ink-soft)", maxWidth: 480, textAlign: "justify" }}>
            Se você ainda não sabe qual das frentes é a sua, ou quer entender melhor um projeto específico antes de decidir, preencha abaixo para um atendimento personalizado.
          </p>
          <div style={{ width: "100%", maxWidth: 520, background: "#fff", border: "1px solid var(--line)", borderRadius: 18, padding: 36 }}>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* CTA FECHAMENTO */}
      <section className="section-pad" style={{ background: "var(--blue-dark)", padding: "80px 40px" }}>
        <div className="container reveal" style={{ padding: 0, maxWidth: 700, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#fff", lineHeight: 1.35 }}>
            Excelência acadêmica e formação cristã caminham juntas: é assim que a Promise estrutura a internacionalização da sua escola, do seu homeschooling ou da sua carreira.
          </h2>
          <a href="https://wa.me/5583996977969" target="_blank" rel="noreferrer" className="pill pill-red" style={{ fontSize: 15.5, padding: "15px 30px" }}>
            Falar com a Promise no WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
