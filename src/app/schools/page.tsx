import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroPhoto from "@/components/HeroPhoto";
import MatriculaForm from "@/components/MatriculaForm";
import Icon from "@/components/Icons";

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
      <section className="section-pad" style={{ padding: "64px 40px", background: "#fff", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="container reveal grid-mobile-1" style={{ maxWidth: 1000, display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 40 }}>
          <div>
            <div className="eyebrow" style={{ color: "var(--red)", marginBottom: 12 }}>O problema real</div>
            <p style={{ margin: "0 0 18px", fontSize: 15.5, lineHeight: 1.65, textAlign: "justify" }}>Internacionalizar não é simplesmente adicionar aulas de inglês. Muitas escolas esbarram em:</p>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 12 }}>
              {["Professores com níveis diferentes de proficiência", "Currículo sem progressão clara", "Inglês desconectado da formação integral", "Dificuldade para implementar certificações", "Ausência de indicadores de acompanhamento", "Receio de perder identidade institucional"].map((item) => (
                <li key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--red)", color: "#fff", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>✓</span>
                  <span style={{ fontSize: 14, lineHeight: 1.55, color: "var(--ink-soft)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow" style={{ color: "var(--blue)", marginBottom: 12 }}>O que a Promise resolve</div>
            <p style={{ margin: "0 0 18px", fontSize: 15.5, lineHeight: 1.65, textAlign: "justify" }}>A Promise ajuda a escola a transformar um programa de inglês fragmentado em uma estrutura acadêmica coerente, conectando currículo, professores, coordenação, avaliação, materiais, certificações e internacionalização:</p>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 12 }}>
              {["Inglês como parte de uma estratégia institucional", "Currículo com progressão e avaliação claras", "Formação docente contínua, com feedback", "Certificações internacionais alcançáveis", "Indicadores para decisões baseadas em evidência", "Identidade institucional preservada e fortalecida"].map((item) => (
                <li key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--blue)", color: "#fff", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>✓</span>
                  <span style={{ fontSize: 14, lineHeight: 1.55, color: "var(--ink-soft)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PROVA DE AUTORIDADE */}
      <section className="section-pad" style={{ padding: "22px 40px", background: "var(--tint)" }}>
        <div className="container" style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap", fontSize: 13, color: "var(--ink-soft)" }}>
          <div><strong style={{ color: "var(--ink)" }}>14+ anos</strong> em ensino de inglês e educação</div>
          <div>Há mais de <strong style={{ color: "var(--ink)" }}>8 anos</strong> um Centro Preparatório Oficial de Cambridge</div>
        </div>
      </section>

      {/* COMO ESTRUTURAMOS - 8 etapas */}
      <section className="section-pad" style={{ padding: "76px 40px" }}>
        <div className="container">
          <h2 style={{ margin: "0 0 36px", fontSize: 24, fontWeight: 800, textAlign: "center" }}>Como estruturamos o programa da sua escola</h2>
          <div className="grid-tablet-2 grid-mobile-1" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 20 }}>
            {[
              { n: "01", t: "Diagnóstico", d: "Entender a realidade.", icon: "target" as const },
              { n: "02", t: "Estratégia", d: "Definir o caminho.", icon: "puzzle" as const },
              { n: "03", t: "Currículo", d: "Construir ou adequar o programa.", icon: "file" as const },
              { n: "04", t: "Formação", d: "Desenvolver professores e coordenadores.", icon: "cap" as const },
              { n: "05", t: "Avaliação", d: "Criar processos de acompanhamento e mensuração.", icon: "list" as const },
              { n: "06", t: "Implementação", d: "Colocar o programa em funcionamento.", icon: "calendar" as const },
              { n: "07", t: "Certificações", d: "Preparar a escola para uma trajetória Cambridge.", icon: "medal" as const },
              { n: "08", t: "Acompanhamento", d: "Medir, ajustar e desenvolver.", icon: "users" as const },
            ].map((s, i) => (
              <div key={s.n} className={`reveal reveal-delay-${(i % 4) + 1}`} style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 14, padding: 22 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                  <Icon name={s.icon} size={14} color="var(--ink-soft)" />
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--red)", letterSpacing: "0.06em" }}>{s.n}</span>
                </div>
                <div style={{ fontSize: 15.5, fontWeight: 800, marginBottom: 6 }}>{s.t}</div>
                <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: "var(--ink-soft)" }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CRITERIO DE DIAGNOSTICO - institucional, sem foto pessoal */}
      <section className="section-pad" style={{ background: "var(--blue)", padding: "0", position: "relative", overflow: "hidden" }}>
        <div className="container reveal grid-mobile-1" style={{ padding: 0, display: "grid", gridTemplateColumns: "1fr 1.3fr", alignItems: "center" }}>
          <div style={{ position: "relative", height: 260 }}>
            <Image src="/assets/schools-authority.jpg" alt="Aplicação de avaliação em ambiente formal de exame" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px" style={{ objectFit: "cover", objectPosition: "50% 15%" }} />
          </div>
          <div style={{ padding: "40px 44px" }}>
            <div className="eyebrow" style={{ color: "#8EA0E8", marginBottom: 10 }}>Evidências, não impressões</div>
            <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: "#D6DCF5", textAlign: "justify" }}>
              O diagnóstico institucional é baseado em critérios claros, evidências documentadas e referências reconhecidas internacionalmente. <a href="/quem-somos" style={{ color: "#fff", fontWeight: 700, textDecoration: "underline" }}>Conheça o Promise Excellence Framework &rarr;</a>
            </p>
          </div>
        </div>
      </section>

      {/* BENEFICIOS DA PARCERIA */}
      <section className="section-pad" style={{ padding: "76px 40px", background: "var(--tint)" }}>
        <div className="container reveal" style={{ maxWidth: 780, marginBottom: 36 }}>
          <span className="eyebrow" style={{ color: "var(--red)" }}>O que sua escola ganha com a parceria</span>
          <h2 style={{ margin: "10px 0 0", fontSize: 26, fontWeight: 800 }}>Mais clareza para crescer. Mais estrutura para sustentar.</h2>
        </div>
        <div className="container reveal grid-tablet-2 grid-mobile-1" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 22 }}>
          {[
            { t: "Estratégia clara", d: "Uma visão de longo prazo para o desenvolvimento internacional da instituição.", icon: "target" as const },
            { t: "Diferenciação", d: "Uma proposta internacional forte, conectada ao posicionamento da escola.", icon: "puzzle" as const },
            { t: "Retenção", d: "Mais valor percebido pelo aluno e pela família.", icon: "heart" as const },
            { t: "Captação", d: "Um diferencial comercial relevante no mercado educacional.", icon: "users" as const },
            { t: "Eficiência", d: "Menos tentativa e erro na implementação e na gestão.", icon: "calendar" as const },
            { t: "Reputação", d: "Maior credibilidade acadêmica e institucional.", icon: "medal" as const },
            { t: "Novas oportunidades", d: "Certificações, programas e conexões internacionais.", icon: "globe" as const },
            { t: "Sustentabilidade", d: "Uma cultura de excelência que permanece na instituição.", icon: "shield" as const },
          ].map((b, i) => {
            const accent = i % 2 === 0 ? "var(--blue)" : "var(--red)";
            const tint = i % 2 === 0 ? "#E4E9FA" : "#FCE4E3";
            return (
              <div key={b.t} style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 14, padding: 20 }}>
                <span style={{ width: 40, height: 40, borderRadius: "50%", background: tint, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  <Icon name={b.icon} size={18} color={accent} />
                </span>
                <div style={{ fontSize: 14.5, fontWeight: 800, marginBottom: 6 }}>{b.t}</div>
                <span style={{ display: "block", width: 20, height: 2.5, borderRadius: 2, background: "var(--red)", marginBottom: 8 }} />
                <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "var(--ink-soft)", textAlign: "justify" }}>{b.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SCHOOLS + GLOBAL - ponte */}
      <section className="section-pad" style={{ padding: "70px 40px", background: "var(--ink)", position: "relative", overflow: "hidden" }}>
        <div className="blob" style={{ bottom: -100, right: -80, width: 320, height: 320, background: "var(--blue)", opacity: 0.12 }} />
        <div className="container reveal grid-mobile-1" style={{ maxWidth: 900, display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 40, alignItems: "center", position: "relative", zIndex: 1 }}>
          <div>
            <span className="eyebrow" style={{ color: "#9DB0F0" }}>Schools + Global</span>
            <h2 style={{ margin: "10px 0 12px", fontSize: 24, fontWeight: 800, color: "#fff" }}>Da sala de aula para o mundo</h2>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.65, color: "#B8BCC8", textAlign: "justify" }}>
              Depois de estruturar o departamento de internacionalização, sua escola pode acessar intercâmbios, viagens acadêmicas e parcerias internacionais através da Promise Global.
            </p>
          </div>
          <Link href="/global" className="pill pill-red" style={{ justifyContent: "center" }}>Conhecer a Promise Global</Link>
        </div>
      </section>

      {/* DIAGNOSTICO INSTITUCIONAL */}
      <section className="section-pad" id="matricula-section" style={{ padding: "76px 40px", background: "var(--tint)" }}>
        <div className="reveal">
          <MatriculaForm tipo="schools" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
