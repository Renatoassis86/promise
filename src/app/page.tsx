import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhotoCard from "@/components/PhotoCard";
import ContactForm from "@/components/ContactForm";
import PartnersCarousel from "@/components/PartnersCarousel";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div className="blob" style={{ top: -120, right: -140, width: 520, height: 520, background: "var(--red)", opacity: 0.1 }} />
      <div className="blob" style={{ top: 900, left: -160, width: 460, height: 460, background: "var(--blue)", opacity: 0.08 }} />

      <Header />

      {/* HERO - full bleed, texto centralizado sobre a foto */}
      <section
        className="section-pad"
        style={{
          position: "relative",
          minHeight: 580,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "110px 40px",
          background:
            "linear-gradient(180deg, rgba(9,13,28,.6) 0%, rgba(9,13,28,.72) 55%, rgba(9,13,28,.88) 100%), url('/assets/hero-home.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container" style={{ maxWidth: 780, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
          <span className="eyebrow" style={{ color: "#9DB0F0" }}>Internacionalização educacional</span>
          <h1 className="fluid-h1" style={{ margin: 0, fontSize: 44, lineHeight: 1.16, fontWeight: 900, color: "#fff" }}>
            Estruturamos a internacionalização de escolas cristãs e famílias homeschooling, formamos professores e preparamos alunos para certificações internacionais.
          </h1>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "#DCE0EE", maxWidth: 620, textAlign: "justify" }}>
            Consultoria, currículo, formação docente, certificações Cambridge e Trinity, programas de American School e intercâmbio, organizados sob a mesma cosmovisão cristã que já orienta sua escola, seu homeschooling ou sua família.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 8, flexWrap: "wrap", justifyContent: "center" }}>
            <a href="https://wa.me/5583996977969" target="_blank" rel="noreferrer" className="pill pill-red">Falar com a Promise</a>
            <a href="#frentes" className="pill" style={{ background: "rgba(255,255,255,.12)", color: "#fff", border: "1px solid rgba(255,255,255,.45)" }}>Conhecer as frentes</a>
          </div>
        </div>
      </section>

      {/* TRIAGEM POR PUBLICO */}
      <section className="section-pad" id="frentes" style={{ padding: "0 40px 90px", background: "var(--tint)", paddingTop: 70 }}>
        <div className="container" style={{ padding: 0 }}>
          <h2 style={{ margin: "0 0 32px", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-soft)", textAlign: "center" }}>
            Qual dessas frentes é a sua?
          </h2>
          <div className="grid-mobile-1" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 24 }}>
            {[
              { href: "/schools", photo: "/assets/card-schools.jpg", pos: "50% 35%", title: "Sou uma escola", text: "Diagnóstico direto com o fundador antes de qualquer proposta de implementação de programa internacional.", cta: "Ver Promise for Schools" },
              { href: "/learners", photo: "/assets/card-learners.jpg", pos: "50% 20%", title: "Sou aluno ou responsável", text: "Inglês, certificações Cambridge e Trinity, American School e experiências internacionais, com acompanhamento direto.", cta: "Ver Promise for Learners" },
              { href: "/professionals", photo: "/assets/card-professionals.jpg", pos: "50% 25%", title: "Sou professor ou coordenador", text: "Certificações TKT, CELTA e DELTA, mentoria individual e formação de liderança educacional.", cta: "Ver Promise for Professionals" },
            ].map((c, i) => (
              <div key={c.href} className={`card reveal reveal-delay-${i + 1}`}>
                <div style={{ position: "relative", height: 190 }}>
                  <Image src={c.photo} alt={c.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px" style={{ objectFit: "cover", objectPosition: c.pos }} />
                </div>
                <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ fontSize: 19, fontWeight: 700 }}>{c.title}</div>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.55, color: "var(--ink-soft)", textAlign: "justify" }}>{c.text}</p>
                  <Link href={c.href} style={{ fontWeight: 700, fontSize: 14, color: "var(--red)" }}>{c.cta} &rarr;</Link>
                </div>
              </div>
            ))}
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
              Coordena departamentos de línguas e atua como Centre Exams Manager em centro autorizado Cambridge há mais de 14 anos. É examinador Cambridge English e autor das coleções Paideia, Oikos e To the Nations.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 4 }}>
              {["Cambridge Examiner", "CELTA (Cambridge)", "CertPT (Trinity)", "14+ anos de atuação"].map((b) => (
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
            { label: "PROMISE FOR SCHOOLS", text: "Diagnóstico direto com o fundador antes de qualquer proposta de implementação." },
            { label: "PROMISE FOR LEARNERS", text: "Preparação para certificações Cambridge e Trinity com o mesmo profissional que atua como examinador dessas bancas." },
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
