import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroPhoto from "@/components/HeroPhoto";
import MatriculaForm from "@/components/MatriculaForm";

const SERVICOS = [
  "Formação Continuada",
  "Certificações",
  "Workshops",
  "Cursos Livres",
  "Mentorias",
  "Desenvolvimento de Lideranças",
  "Formação para Coordenadores de Inglês",
  "Consultoria para Gestores Escolares",
  "Desenvolvimento Institucional",
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
          <h2 style={{ margin: "0 0 30px", fontSize: 22, fontWeight: 800, textAlign: "center" }}>O que a Promise oferece pra você</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 14 }}>
            {SERVICOS.map((s, i) => (
              <div key={s} className={`reveal reveal-delay-${(i % 4) + 1}`} style={{ display: "flex", alignItems: "center", gap: 10, border: "1px solid var(--line)", borderRadius: 10, padding: "12px 16px", fontSize: 13.5, fontWeight: 600 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--blue)", flexShrink: 0 }} />
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICACOES EM DESTAQUE */}
      <section style={{ padding: "64px 40px", background: "var(--tint)" }}>
        <div className="container">
          <h2 style={{ margin: "0 0 32px", fontSize: 24, fontWeight: 800, textAlign: "center" }}>Certificações</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 24 }}>
            <div className="reveal reveal-delay-1" style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 14, padding: 26 }}>
              <div style={{ fontSize: 19, fontWeight: 800, marginBottom: 8 }}>TKT</div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--ink-soft)" }}>Teaching Knowledge Test: base pedagógica reconhecida pela Cambridge Assessment English.</p>
            </div>
            <div className="reveal reveal-delay-2" style={{ background: "#fff", border: "2px solid var(--red)", borderRadius: 14, padding: 26 }}>
              <div style={{ fontSize: 19, fontWeight: 800, marginBottom: 8 }}>CELTA</div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--ink-soft)" }}>Certificado pela University of Cambridge, o mesmo que o fundador da Promise possui.</p>
            </div>
            <div className="reveal reveal-delay-3" style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 14, padding: 26 }}>
              <div style={{ fontSize: 19, fontWeight: 800, marginBottom: 8 }}>DELTA</div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--ink-soft)" }}>Formação avançada para quem já atua como professor e busca especialização.</p>
            </div>
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
                  <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: "var(--ink-soft)" }}>{s.d}</p>
                </div>
              );
              return (
                <div key={s.n} className="reveal" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 44, alignItems: "center" }}>
                  {i % 2 === 0 ? [photo, text] : [text, photo]}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CREDIBILIDADE DA MENTORIA - institucional, sem foto pessoal */}
      <section style={{ background: "var(--blue)", padding: "0", position: "relative", overflow: "hidden" }}>
        <div className="container reveal" style={{ padding: 0, display: "grid", gridTemplateColumns: "1.3fr 1fr", alignItems: "center" }}>
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
