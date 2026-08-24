import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroPhoto from "@/components/HeroPhoto";
import MatriculaForm from "@/components/MatriculaForm";

const SERVICOS = [
  { label: "Formação Continuada", img: "/assets/prof-servico-formacao-continuada.jpg", pos: "50% 38%" },
  { label: "Certificações", img: "/assets/prof-servico-certificacoes.jpg", pos: "50% 15%" },
  { label: "Workshops", img: "/assets/prof-servico-workshops.jpg", pos: "50% 25%" },
  { label: "Cursos Livres", img: "/assets/prof-servico-cursos-livres.jpg", pos: "50% 42%" },
  { label: "Mentorias", img: "/assets/prof-servico-mentorias.jpg", pos: "50% 35%" },
  { label: "Desenvolvimento de Lideranças", img: "/assets/prof-servico-liderancas.jpg", pos: "50% 15%" },
  { label: "Formação para Coordenadores de Inglês", img: "/assets/prof-servico-coordenadores.jpg", pos: "50% 35%" },
  { label: "Consultoria para Gestores Escolares", img: "/assets/prof-servico-consultoria-gestores.jpg", pos: "50% 25%" },
  { label: "Desenvolvimento Institucional", img: "/assets/prof-servico-desenvolvimento-institucional.jpg", pos: "50% 30%" },
];

export default function ProfessionalsPage() {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div className="blob" style={{ top: 1950, left: -140, width: 420, height: 420, background: "var(--red)", opacity: 0.08 }} />

      <Header active="/professionals" />

      <HeroPhoto
        image="/assets/professionals-hero-retrato.jpg"
        eyebrow="Promise for Professionals"
        title="Certificações internacionais e mentoria para quem lidera educação em inglês."
        subtitle="TKT, CELTA e DELTA com mentoria individual em cada etapa, conduzida pelo mesmo profissional que atua como examinador Cambridge English, não por um formador genérico."
        primaryCta={{ label: "Matricule-se já", href: "#matricula" }}
        secondaryCta={{ label: "Falar no WhatsApp", href: "https://wa.me/5583996977969", external: true }}
        scrimSide="right"
        imagePosition="center 35%"
      />

      {/* CATALOGO OFICIAL DE SERVICOS */}
      <section style={{ padding: "60px 40px", background: "#fff", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="container">
          <h2 style={{ margin: "0 0 36px", fontSize: 24, fontWeight: 800, textAlign: "center" }}>O que a Promise oferece pra você</h2>
          <div className="grid-mobile-1" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 3, borderRadius: 18, overflow: "hidden" }}>
            {SERVICOS.map((s, i) => (
              <div key={s.label} className={`reveal reveal-delay-${(i % 4) + 1}`} style={{ position: "relative", height: 210 }}>
                <Image src={s.img} alt={s.label} fill style={{ objectFit: "cover", objectPosition: s.pos }} />
                <div style={{ position: "absolute", inset: 0, background: i % 2 === 0 ? "rgba(24,54,178,.72)" : "rgba(250,31,21,.72)" }} />
                <div style={{ position: "relative", zIndex: 1, height: "100%", padding: "20px 22px", display: "flex", alignItems: "flex-end" }}>
                  <span style={{ fontSize: 14.5, fontWeight: 800, color: "#fff", lineHeight: 1.35 }}>{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICACOES EM DESTAQUE - fluxo vertical, com mais contexto sobre o que cada uma representa */}
      <section style={{ padding: "84px 40px", background: "var(--blue-dark)", position: "relative", overflow: "hidden" }}>
        <div className="blob" style={{ top: -80, left: -100, width: 360, height: 360, background: "var(--red)", opacity: 0.08 }} />
        <div className="container" style={{ textAlign: "center", marginBottom: 56, position: "relative", zIndex: 1 }}>
          <span className="eyebrow" style={{ color: "#8EA0E8" }}>Certificações Cambridge</span>
          <h2 className="fluid-h2" style={{ margin: "10px 0 0", fontSize: 28, fontWeight: 900, color: "#fff" }}>O que cada certificação representa</h2>
        </div>
        <div className="container" style={{ maxWidth: 780, position: "relative", zIndex: 1 }}>
          <div style={{ position: "absolute", top: 20, bottom: 20, left: 27, width: 2, background: "rgba(255,255,255,.18)" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>
            {[
              {
                n: "01",
                t: "TKT — Teaching Knowledge Test",
                d: "Certificação de entrada da Cambridge Assessment English. Valida o conhecimento pedagógico do professor (terminologia, técnicas de ensino, princípios de aprendizagem de inglês), sem exigir prática de sala de aula supervisionada. É o primeiro degrau formal para quem está começando a carreira ou quer comprovar o conhecimento que já tem.",
              },
              {
                n: "02",
                t: "CELTA — Certificate in Teaching English to Speakers of Other Languages",
                d: "A certificação para ensinar inglês mais reconhecida internacionalmente, emitida pela University of Cambridge. Exige prática de ensino supervisionada e é aceita como pré-requisito por escolas de idiomas no mundo todo. É a mesma certificação que o fundador da Promise possui.",
              },
              {
                n: "03",
                t: "DELTA — Diploma in Teaching English to Speakers of Other Languages",
                d: "Diploma avançado da Cambridge Assessment English para quem já atua como professor e quer aprofundar a prática pedagógica, assumir coordenação ou liderança acadêmica. É o degrau seguinte depois do CELTA, voltado a quem busca especialização real, não só mais um certificado.",
              },
            ].map((c) => (
              <div key={c.n} className="reveal" style={{ display: "flex", gap: 24, alignItems: "flex-start", position: "relative" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--red)", color: "#fff", fontWeight: 900, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "4px solid var(--blue-dark)", position: "relative", zIndex: 1 }}>
                  {c.n}
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 8 }}>{c.t}</div>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.7, color: "#D6DCF5", textAlign: "justify" }}>{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA - storytelling em etapas, foto grande alternada */}
      <section style={{ padding: "76px 40px", background: "#fff" }}>
        <div className="container" style={{ maxWidth: 980 }}>
          <h2 style={{ margin: "0 0 56px", fontSize: 24, fontWeight: 800, textAlign: "center" }}>Como funciona a mentoria</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 60 }}>
            {[
              { n: "01", t: "DIAGNÓSTICO", d: "Conversa inicial para entender o objetivo e indicar a certificação certa: TKT, CELTA ou DELTA.", img: "/assets/prof-timeline-1.jpg", pos: "50% 50%" },
              { n: "02", t: "PREPARAÇÃO", d: "Mentoria individual em cada etapa, com aplicabilidade prática, não só teoria para a prova.", img: "/assets/prof-timeline-2.jpg", pos: "50% 30%" },
              { n: "03", t: "CERTIFICAÇÃO", d: "Certificação internacional reconhecida, com acompanhamento até o resultado sair.", img: "/assets/prof-timeline-3.jpg", pos: "50% 20%" },
            ].map((s, i) => {
              const photo = (
                <div key={`img-${s.n}`} style={{ position: "relative", height: 260, borderRadius: 18, overflow: "hidden" }}>
                  <Image src={s.img} alt={s.t} fill style={{ objectFit: "cover", objectPosition: s.pos }} />
                </div>
              );
              const text = (
                <div key={`txt-${s.n}`} style={{ position: "relative" }}>
                  <div style={{ fontSize: 68, fontWeight: 900, color: "var(--tint)", lineHeight: 1, marginBottom: -22 }}>{s.n}</div>
                  <div style={{ position: "relative", fontSize: 12.5, fontWeight: 700, color: "var(--red)", letterSpacing: "0.08em", marginBottom: 10 }}>{s.t}</div>
                  <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: "var(--ink-soft)", textAlign: "justify" }}>{s.d}</p>
                </div>
              );
              return (
                <div key={s.n} className="reveal grid-mobile-1" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 44, alignItems: "center" }}>
                  {i % 2 === 0 ? [photo, text] : [text, photo]}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CREDIBILIDADE DA MENTORIA - institucional, sem foto pessoal */}
      <section style={{ background: "var(--blue)", padding: "0", position: "relative", overflow: "hidden" }}>
        <div className="container reveal grid-mobile-1" style={{ padding: 0, display: "grid", gridTemplateColumns: "1.3fr 1fr", alignItems: "center" }}>
          <div style={{ padding: "40px 44px" }}>
            <div className="eyebrow" style={{ color: "#8EA0E8", marginBottom: 10 }}>Quem avalia, não só ensina</div>
            <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: "#D6DCF5", textAlign: "justify" }}>
              A mentoria é conduzida por quem aplica e avalia certificações internacionais, com os mesmos critérios usados em bancas examinadoras Cambridge: clareza de objetivo, evidência de progresso e padrão internacional de correção. <a href="/quem-somos" style={{ color: "#fff", fontWeight: 700, textDecoration: "underline" }}>Conheça o Promise Excellence Framework &rarr;</a>
            </p>
          </div>
          <div style={{ position: "relative", height: 260 }}>
            <Image src="/assets/professionals-authority.jpg" alt="Professora recebendo certificação internacional" fill style={{ objectFit: "cover", objectPosition: "50% 15%" }} />
          </div>
        </div>
      </section>

      <section style={{ padding: "76px 40px", background: "var(--tint)" }}>
        <div className="reveal">
          <MatriculaForm tipo="professionals" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
