import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroPhoto from "@/components/HeroPhoto";
import MatriculaForm from "@/components/MatriculaForm";

export default function SchoolsPage() {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div className="blob" style={{ top: 1900, left: -140, width: 420, height: 420, background: "var(--blue)", opacity: 0.08 }} />

      <Header active="/schools" />

      <HeroPhoto
        image="/assets/schools-hero-retrato.jpg"
        eyebrow="Promise for Schools"
        title="Um departamento de internacionalização estruturado, sem abrir mão da identidade da sua escola."
        subtitle="Diagnóstico, implementação curricular e formação de professores para escolas confessionais que querem crescer em inglês, certificações e programas internacionais, mantendo a cosmovisão cristã como base de toda decisão pedagógica."
        primaryCta={{ label: "Solicitar diagnóstico institucional", href: "#matricula" }}
        secondaryCta={{ label: "Falar no WhatsApp", href: "https://wa.me/5583996977969", external: true }}
        imagePosition="center 30%"
      />

      {/* DOR / OBJECAO */}
      <section style={{ padding: "64px 40px", background: "#fff", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="container reveal grid-mobile-1" style={{ maxWidth: 1000, display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 40 }}>
          <div>
            <div className="eyebrow" style={{ color: "var(--red)", marginBottom: 12 }}>O problema real</div>
            <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, textAlign: "justify" }}>Sua escola sabe que precisa avançar em internacionalização, mas falta clareza sobre currículo, formação de professores, liderança e avaliação. Fazer isso sem método arrisca descaracterizar a identidade da instituição.</p>
          </div>
          <div>
            <div className="eyebrow" style={{ color: "var(--blue)", marginBottom: 12 }}>O que a Promise resolve</div>
            <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, textAlign: "justify" }}>Um caminho estruturado, com metodologia, acompanhamento e objetivos claros, não uma proposta genérica. O diagnóstico inicial já mostra se e como o investimento faz sentido para a sua realidade, antes de qualquer compromisso.</p>
          </div>
        </div>
      </section>

      {/* PROVA DE AUTORIDADE */}
      <section style={{ padding: "22px 40px", background: "var(--tint)" }}>
        <div className="container" style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap", fontSize: 13, color: "var(--ink-soft)" }}>
          <div><strong style={{ color: "var(--ink)" }}>14+ anos</strong> em ensino de inglês e educação</div>
          <div><strong style={{ color: "var(--ink)" }}>Cambridge Examiner</strong>, não é curso de terceiros</div>
          <div><strong style={{ color: "var(--ink)" }}>Centre Exams Manager</strong> de centro autorizado Cambridge</div>
        </div>
      </section>

      {/* COMO ESTRUTURAMOS (modulo alternado texto/imagem+cor) */}
      <section style={{ padding: "76px 40px" }}>
        <div className="container">
          <h2 style={{ margin: "0 0 36px", fontSize: 24, fontWeight: 800, textAlign: "center" }}>Como estruturamos o programa da sua escola</h2>
          <div className="grid-mobile-1" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 26 }}>
            <div className="reveal reveal-delay-1" style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 14, padding: 28 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--red)", letterSpacing: "0.06em", marginBottom: 12 }}>01 · DIAGNÓSTICO</div>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "var(--ink-soft)", textAlign: "justify" }}>Conversa direta com o fundador para entender o momento da escola antes de qualquer proposta.</p>
            </div>
            <div className="reveal reveal-delay-2" style={{ position: "relative", borderRadius: 14, overflow: "hidden", height: 220 }}>
              <Image src="/assets/schools-curricular.jpg" alt="Alunos e professores em atividade curricular" fill style={{ objectFit: "cover", objectPosition: "50% 30%" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(24,54,178,.74)" }} />
              <div style={{ position: "relative", zIndex: 1, height: "100%", padding: 24, display: "flex", flexDirection: "column", justifyContent: "flex-end", color: "#fff" }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 10 }}>02 · IMPLEMENTAÇÃO CURRICULAR</div>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, textAlign: "justify" }}>Currículo de inglês e internacionalização adaptado à identidade e ao momento da instituição.</p>
              </div>
            </div>
            <div className="reveal reveal-delay-3" style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 14, padding: 28 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--red)", letterSpacing: "0.06em", marginBottom: 12 }}>03 · FORMAÇÃO DE PROFESSORES</div>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "var(--ink-soft)", textAlign: "justify" }}>Capacitação contínua da equipe docente e de coordenação, não um treinamento único e isolado.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CRITERIO DE DIAGNOSTICO - institucional, sem foto pessoal */}
      <section style={{ background: "var(--blue)", padding: "0", position: "relative", overflow: "hidden" }}>
        <div className="container reveal grid-mobile-1" style={{ padding: 0, display: "grid", gridTemplateColumns: "1fr 1.3fr", alignItems: "center" }}>
          <div style={{ position: "relative", height: 260 }}>
            <Image src="/assets/schools-authority.jpg" alt="Aplicação de avaliação em ambiente formal de exame" fill style={{ objectFit: "cover", objectPosition: "50% 15%" }} />
          </div>
          <div style={{ padding: "40px 44px" }}>
            <div className="eyebrow" style={{ color: "#8EA0E8", marginBottom: 10 }}>Critério, não impressão</div>
            <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: "#D6DCF5", textAlign: "justify" }}>
              O diagnóstico institucional segue os mesmos critérios usados em bancas examinadoras internacionais: evidência documentada, comparação com padrões reconhecidos e nenhuma recomendação por impressão. <a href="/quem-somos" style={{ color: "#fff", fontWeight: 700, textDecoration: "underline" }}>Conheça o Promise Excellence Framework &rarr;</a>
            </p>
          </div>
        </div>
      </section>

      {/* DIAGNOSTICO INSTITUCIONAL */}
      <section id="matricula-section" style={{ padding: "76px 40px", background: "var(--tint)" }}>
        <div className="reveal">
          <MatriculaForm tipo="schools" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
