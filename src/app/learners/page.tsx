import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhotoDecor from "@/components/PhotoDecor";
import HeroPhoto from "@/components/HeroPhoto";
import MatriculaForm from "@/components/MatriculaForm";

const PILARES = [
  { t: "Metodologia", d: "Aulas síncronas com progresso acompanhado turma a turma." },
  { t: "Comodidade", d: "Horários e modalidades pensados pra encaixar na sua rotina." },
  { t: "Ambiente motivador", d: "Turmas que se mantêm porque o aprendizado é real, não só frequência." },
  { t: "Preço acessível", d: "Investimento pensado pra caber no orçamento da família." },
  { t: "Investimento missionário", d: "Parte do que você investe sustenta bolsas de estudo." },
];

export default function LearnersPage() {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div className="blob" style={{ top: 2500, right: -140, width: 440, height: 440, background: "var(--blue)", opacity: 0.08 }} />

      <Header active="/learners" />

      <HeroPhoto
        image="/assets/hero-learners.jpg"
        eyebrow="Promise for Learners"
        title="Inglês, certificações internacionais e o caminho para o High School americano."
        subtitle="Turmas e aulas particulares com metodologia acompanhada, preparação para certificações Cambridge e Trinity, e orientação para intercâmbio e programas de High School nos Estados Unidos, sob a mesma cosmovisão cristã que guia sua família."
        primaryCta={{ label: "Matricule-se já", href: "#matricula" }}
        secondaryCta={{ label: "Fazer teste de nivelamento gratuito", href: "https://wa.me/5583996977969", external: true }}
        imagePosition="center 30%"
      />

      {/* ALUNA - brush desconstruido, cutout com marcas d'agua de viagem */}
      <section style={{ padding: "56px 40px", background: "#fff" }}>
        <div className="container reveal" style={{ display: "flex", gap: 40, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
          <PhotoDecor src="/assets/learners-hero-cutout.png" alt="Aluna Promise estudando" height={300} theme="travel" />
          <div style={{ maxWidth: 380 }}>
            <span className="eyebrow" style={{ color: "var(--red)" }}>Quem estuda aqui</span>
            <h2 style={{ margin: "10px 0 0", fontSize: 22, fontWeight: 800, lineHeight: 1.35 }}>Alunos reais, preparando uma trajetória internacional real.</h2>
          </div>
        </div>
      </section>

      {/* 5 PILARES */}
      <section style={{ padding: "64px 40px", background: "#fff", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="container">
          <h2 style={{ margin: "0 0 36px", fontSize: 24, fontWeight: 800, textAlign: "center" }}>Por que estudar inglês na Promise</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0,1fr))", gap: 20 }}>
            {PILARES.map((p, i) => (
              <div key={p.t} className={`reveal reveal-delay-${(i % 4) + 1}`} style={{ display: "flex", flexDirection: "column", gap: 8, textAlign: "center" }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--blue)" }}>{p.t}</div>
                <p style={{ margin: 0, fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODALIDADES - fotos agrupadas com tint de cor */}
      <section style={{ padding: "72px 40px", background: "var(--blue-dark)" }}>
        <div className="container" style={{ maxWidth: 1000 }}>
          <span className="eyebrow" style={{ color: "#8EA0E8" }}>Modalidades</span>
          <h2 style={{ margin: "12px 0 36px", fontSize: 26, fontWeight: 800, color: "#fff" }}>Duas modalidades para encaixar na sua rotina</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 4, borderRadius: 18, overflow: "hidden" }}>
            <div className="reveal reveal-delay-1" style={{ position: "relative", height: 260 }}>
              <div style={{ position: "absolute", inset: 0, background: "var(--blue)" }} />
              <div style={{ position: "relative", zIndex: 1, height: "100%", padding: 30, display: "flex", flexDirection: "column", justifyContent: "center", color: "#fff" }}>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>Turmas</div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#D6DCF5" }}>Turmas em diversos níveis e horários, ambiente motivador e preço mais acessível pelo formato coletivo.</p>
              </div>
            </div>
            <div className="reveal reveal-delay-2" style={{ position: "relative", height: 260 }}>
              <Image src="/assets/learners-turmas.jpg" alt="Alunos estudando em grupo" fill style={{ objectFit: "cover", objectPosition: "50% 20%" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(24,54,178,.7)" }} />
            </div>
            <div className="reveal reveal-delay-3" style={{ position: "relative", height: 260 }}>
              <Image src="/assets/prof-timeline-2.jpg" alt="Aula particular por videochamada" fill style={{ objectFit: "cover", objectPosition: "50% 30%" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(250,31,21,.72)" }} />
            </div>
            <div className="reveal reveal-delay-4" style={{ position: "relative", height: 260 }}>
              <div style={{ position: "absolute", inset: 0, background: "var(--red)" }} />
              <div style={{ position: "relative", zIndex: 1, height: "100%", padding: 30, display: "flex", flexDirection: "column", justifyContent: "center", color: "#fff" }}>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>Particular</div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#FFE1DF" }}>Atendimento individual para objetivos específicos: provas, entrevistas, viagem, certificação em prazo definido.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICACOES + HIGH SCHOOL - com foto contextual */}
      <section style={{ padding: "72px 40px" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 32 }}>
          <div className="card reveal reveal-delay-1">
            <div style={{ position: "relative", height: 260 }}>
              <Image src="/assets/professionals-authority.jpg" alt="Certificação internacional entregue" fill style={{ objectFit: "cover", objectPosition: "50% 20%" }} />
            </div>
            <div style={{ padding: 28 }}>
              <div className="eyebrow" style={{ color: "var(--red)", marginBottom: 12 }}>Certificações internacionais</div>
              <h3 style={{ margin: "0 0 10px", fontSize: 19, fontWeight: 800 }}>Preparação Cambridge e Trinity</h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--ink-soft)" }}>Conduzida pelo mesmo profissional que atua como examinador Cambridge English: orientação direta de quem aplica a prova.</p>
            </div>
          </div>
          <div className="card reveal reveal-delay-2">
            <div style={{ position: "relative", height: 260 }}>
              <Image src="/assets/global-familia.jpg" alt="Família recebendo estudante de intercâmbio" fill style={{ objectFit: "cover", objectPosition: "50% 22%" }} />
            </div>
            <div style={{ padding: 28 }}>
              <div className="eyebrow" style={{ color: "var(--red)", marginBottom: 12 }}>High School &amp; Intercâmbio</div>
              <h3 style={{ margin: "0 0 10px", fontSize: 19, fontWeight: 800 }}>Programas internacionais</h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--ink-soft)" }}>Orientação para High School americano e experiências internacionais. <em>Parceiro/instituição credenciadora a confirmar com a Promise</em>.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BOLSA DE ESTUDOS - com foto contextual (pendente: ver prompt "Bolsa de Estudos" na lista) */}
      <section style={{ padding: "56px 40px", background: "#fff", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="container reveal" style={{ maxWidth: 900, display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 36, alignItems: "center" }}>
          <div style={{ position: "relative", height: 160, borderRadius: 14, overflow: "hidden" }}>
            <Image src="/assets/bolsa-estudos.jpg" alt="Aluna bolsista estudando em casa" fill style={{ objectFit: "cover", objectPosition: "50% 25%" }} />
          </div>
          <div>
            <span className="eyebrow" style={{ color: "var(--blue)" }}>Investimento missionário</span>
            <h2 style={{ margin: "8px 0 8px", fontSize: 21, fontWeight: 800 }}>Bolsa de estudos</h2>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "var(--ink-soft)" }}>Parte do investimento das turmas sustenta bolsas para alunos que não teriam acesso ao ensino de inglês de outra forma.</p>
          </div>
        </div>
      </section>

      {/* TESTEMUNHO REAL */}
      <section style={{ padding: "72px 40px", background: "var(--tint)" }}>
        <div className="container reveal" style={{ maxWidth: 700, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <svg width="30" height="23" viewBox="0 0 24 18" fill="var(--blue)"><path d="M0 18V9.5C0 4.3 3.8.4 9 0v3.6C6 4 4 6.3 4 9h5v9H0zm11 0V9.5C11 4.3 14.8.4 20 0v3.6c-3 .4-5 2.7-5 5.4h5v9H11z" /></svg>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65 }}>
            &ldquo;Voltar a estudar inglês tem sido muito bom! As aulas na Promise são pontuais, dinâmicas e seguem um bom nível, de acordo com o desenvolvimento da turma. O professor é ótimo, super paciente e solícito nas dúvidas. A metodologia é muito boa — a fidelidade da turma se mantém porque a aula é boa e a gente aprende.&rdquo;
          </p>
          <div style={{ fontSize: 13.5, fontWeight: 700 }}>Emanuela Monteiro</div>
          <div style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>Aluna Promise</div>
        </div>
      </section>

      {/* MATRICULE-SE JA */}
      <section style={{ padding: "76px 40px" }}>
        <div className="reveal">
          <MatriculaForm tipo="learners" />
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ background: "var(--red)", padding: "56px 40px", textAlign: "center" }}>
        <div className="container reveal" style={{ maxWidth: 600, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#fff" }}>Não perca mais tempo. Chegou a hora de ser fluente.</h2>
          <a href="https://wa.me/5583996977969" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", padding: "14px 28px", borderRadius: 999, fontWeight: 700, fontSize: 14.5, background: "#fff", color: "var(--red)" }}>
            Fazer teste de nivelamento gratuito
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
