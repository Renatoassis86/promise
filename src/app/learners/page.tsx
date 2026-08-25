import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhotoDecor from "@/components/PhotoDecor";
import HeroPhoto from "@/components/HeroPhoto";
import MatriculaForm from "@/components/MatriculaForm";
import SectionDivider from "@/components/SectionDivider";

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
        title="Inglês, certificações internacionais e o caminho para o American School."
        subtitle="Turmas e aulas particulares com metodologia acompanhada, preparação para certificações Cambridge, e orientação para o American School (do Elementary ao High School) e para intercâmbios nos Estados Unidos, sob a mesma cosmovisão cristã que guia sua família."
        primaryCta={{ label: "Matricule-se já", href: "#matricula" }}
        secondaryCta={{ label: "Fazer teste de nivelamento gratuito", href: "https://wa.me/5583996977969", external: true }}
        imagePosition="center 30%"
      />

      {/* ALUNA - brush desconstruido, cutout com marcas d'agua de viagem */}
      <section className="section-pad" style={{ padding: "56px 40px", background: "#fff" }}>
        <div className="container reveal" style={{ display: "flex", gap: 40, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
          <PhotoDecor src="/assets/learners-hero-cutout.png" alt="Aluna Promise estudando" height={300} theme="travel" />
          <div style={{ maxWidth: 440 }}>
            <span className="eyebrow" style={{ color: "var(--red)" }}>Quem estuda aqui</span>
            <h2 style={{ margin: "10px 0 12px", fontSize: 22, fontWeight: 800, lineHeight: 1.35 }}>Alunos reais, preparando uma trajetória internacional real.</h2>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.65, color: "var(--ink-soft)", textAlign: "justify" }}>
              Atendemos famílias homeschooling e também alunos de qualquer escola que queiram estudar em contraturno para conquistar certificações internacionais com acesso a universidades americanas.
            </p>
          </div>
        </div>
      </section>

      {/* JORNADA EM FOTOS - faixa vertical colada, selo sobre a costura, mesmo sistema do panfleto */}
      <section className="section-pad" style={{ padding: "72px 40px", background: "var(--tint)", overflow: "hidden" }}>
        <div className="container reveal grid-mobile-1" style={{ maxWidth: 980, display: "grid", gridTemplateColumns: "1.3fr 0.55fr", gap: 56, alignItems: "center" }}>
          <div>
            <span className="eyebrow" style={{ color: "var(--red)", fontSize: 14 }}>Cada estudante tem uma jornada</span>
            <h2 className="fluid-h1 heading-justify" style={{ margin: "14px 0 24px", fontSize: 29, fontWeight: 900, lineHeight: 1.3, letterSpacing: "-0.01em", textAlign: "justify" }}>
              Uma jornada que <span style={{ color: "var(--red)", textTransform: "uppercase" }}>abre portas</span>, constrói oportunidades e <span style={{ color: "var(--blue)", textTransform: "uppercase" }}>transforma futuros</span>.
            </h2>
            <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.75, color: "var(--ink-soft)", textAlign: "justify" }}>
              Do primeiro contato com o inglês às certificações internacionais, à formação acadêmica americana e às experiências internacionais: cada etapa amplia a próxima.
            </p>
            <p style={{ margin: "22px 0 28px", fontSize: 18, fontWeight: 800, color: "var(--ink)" }}>Cada estudante é único. Cada jornada é única.</p>
            <a href="#modalidades" className="pill pill-red">Começar minha jornada</a>
          </div>

          {(() => {
            const TILE_HEIGHT = 128;
            const STRIP = [
              {
                src: "/assets/learners-strip-mundo.jpg",
                alt: "Aluna Promise em Londres, com material didático",
                caption: "Um mundo de possibilidades",
                color: "var(--blue)",
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20" /></svg>,
              },
              {
                src: "/assets/learners-strip-formacao.jpg",
                alt: "Aluno Promise estudando em casa",
                caption: "Formação que transforma",
                color: "var(--red)",
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5Z" /><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" /></svg>,
              },
              {
                src: "/assets/learners-strip-experiencias.jpg",
                alt: "Alunos Promise em intercâmbio em Londres",
                caption: "Experiências que marcam",
                color: "var(--blue)",
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5Z" /></svg>,
              },
              {
                src: "/assets/learners-strip-certificacao.jpg",
                alt: "Aluno Promise certificado, em campus americano",
                caption: "Certificação que abre portas",
                color: "var(--red)",
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5" /><path d="M8.5 12.5 7 22l5-3 5 3-1.5-9.5" /></svg>,
              },
            ];
            return (
              <div className="reveal" style={{ position: "relative", maxWidth: 220, margin: "0 auto", width: "100%" }}>
                {STRIP.map((tile, i) => (
                  <div
                    key={tile.caption}
                    style={{
                      position: "relative",
                      height: TILE_HEIGHT,
                      overflow: "hidden",
                      borderTopLeftRadius: i === 0 ? 14 : 0,
                      borderTopRightRadius: i === 0 ? 14 : 0,
                      borderBottomLeftRadius: i === STRIP.length - 1 ? 14 : 0,
                      borderBottomRightRadius: i === STRIP.length - 1 ? 14 : 0,
                    }}
                  >
                    <Image src={tile.src} alt={tile.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px" style={{ objectFit: "cover", objectPosition: "50% 25%" }} />
                  </div>
                ))}
                {STRIP.map((tile, i) => (
                  <div
                    key={`badge-${tile.caption}`}
                    style={{
                      position: "absolute",
                      top: (i + 1) * TILE_HEIGHT - 13,
                      left: 8,
                      zIndex: 10,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      background: tile.color,
                      borderRadius: 999,
                      padding: "5px 12px 5px 5px",
                      boxShadow: "0 8px 16px rgba(0,0,0,.2)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transform: "scale(0.75)" }}>{tile.icon}</span>
                    <span style={{ fontSize: 10.5, fontWeight: 800, color: "#fff" }}>{tile.caption}</span>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      <SectionDivider background="var(--tint)" />

      {/* ONDE VOCE QUER CHEGAR - triagem por objetivo */}
      <section className="section-pad" style={{ padding: "56px 40px", background: "var(--tint)" }}>
        <div className="container reveal" style={{ maxWidth: 700, textAlign: "center", margin: "0 auto 32px" }}>
          <span className="eyebrow" style={{ color: "var(--red)" }}>Qual é o próximo passo?</span>
          <h2 style={{ margin: "10px 0 0", fontSize: 24, fontWeight: 800 }}>Onde você quer chegar?</h2>
        </div>
        <div className="container reveal grid-tablet-2 grid-mobile-1" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 16 }}>
          {[
            { t: "Quero aprender inglês", d: "Turmas ou aulas particulares, com progresso acompanhado.", href: "#modalidades" },
            { t: "Quero uma certificação", d: "Preparação Cambridge com quem tem experiência real nesse sistema de exames.", href: "#certificacoes" },
            { t: "Quero uma formação americana", d: "American School, do Elementary ao High School.", href: "#american-school" },
            { t: "Minha família é homeschooler", d: "Inglês e trajetória internacional no ritmo de casa.", href: "#homeschool" },
            { t: "Quero estudar fora", d: "Planejamento de uma trajetória acadêmica internacional.", href: "#pathway" },
            { t: "Quero uma experiência internacional", d: "Viagens, intercâmbios e imersões.", href: "/global" },
          ].map((c) => (
            <a key={c.t} href={c.href} style={{ display: "block", background: "#fff", border: "1px solid var(--line)", borderRadius: 14, padding: 22 }}>
              <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 8, color: "var(--ink)" }}>{c.t}</div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: "var(--ink-soft)", textAlign: "justify" }}>{c.d}</p>
            </a>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* 5 PILARES */}
      <section className="section-pad" style={{ padding: "64px 40px", background: "#fff", borderBottom: "1px solid var(--line)" }}>
        <div className="container">
          <h2 style={{ margin: "0 0 36px", fontSize: 24, fontWeight: 800, textAlign: "center" }}>Por que estudar inglês na Promise</h2>
          <div className="grid-tablet-2 grid-mobile-1" style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0,1fr))", gap: 20 }}>
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
      <section className="section-pad" id="modalidades" style={{ padding: "72px 40px", background: "var(--blue-dark)" }}>
        <div className="container" style={{ maxWidth: 1000 }}>
          <span className="eyebrow" style={{ color: "#8EA0E8" }}>Modalidades</span>
          <h2 style={{ margin: "12px 0 36px", fontSize: 26, fontWeight: 800, color: "#fff" }}>Duas modalidades para encaixar na sua rotina</h2>
          <div className="grid-mobile-1" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 4, borderRadius: 18, overflow: "hidden" }}>
            <div className="reveal reveal-delay-1" style={{ position: "relative", height: 260 }}>
              <div style={{ position: "absolute", inset: 0, background: "var(--blue)" }} />
              <div style={{ position: "relative", zIndex: 1, height: "100%", padding: 30, display: "flex", flexDirection: "column", justifyContent: "center", color: "#fff" }}>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>Turmas</div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#D6DCF5", textAlign: "justify" }}>Turmas em diversos níveis e horários, ambiente motivador e preço mais acessível pelo formato coletivo.</p>
              </div>
            </div>
            <div className="reveal reveal-delay-2" style={{ position: "relative", height: 260 }}>
              <Image src="/assets/learners-turmas.jpg" alt="Alunos estudando em grupo" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px" style={{ objectFit: "cover", objectPosition: "50% 20%" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(24,54,178,.7)" }} />
            </div>
            <div className="reveal reveal-delay-3" style={{ position: "relative", height: 260 }}>
              <Image src="/assets/prof-timeline-2.jpg" alt="Aula particular por videochamada" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px" style={{ objectFit: "cover", objectPosition: "50% 30%" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(250,31,21,.72)" }} />
            </div>
            <div className="reveal reveal-delay-4" style={{ position: "relative", height: 260 }}>
              <div style={{ position: "absolute", inset: 0, background: "var(--red)" }} />
              <div style={{ position: "relative", zIndex: 1, height: "100%", padding: 30, display: "flex", flexDirection: "column", justifyContent: "center", color: "#fff" }}>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>Particular</div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#FFE1DF", textAlign: "justify" }}>Atendimento individual para objetivos específicos: provas, entrevistas, viagem, certificação em prazo definido.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICACOES CAMBRIDGE/TRINITY */}
      <section className="section-pad" id="certificacoes" style={{ padding: "72px 40px" }}>
        <div className="container">
          <div className="card reveal" style={{ maxWidth: 640, margin: "0 auto" }}>
            <div style={{ position: "relative", height: 260 }}>
              <Image src="/assets/professionals-authority.jpg" alt="Certificação internacional entregue" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px" style={{ objectFit: "cover", objectPosition: "50% 20%" }} />
            </div>
            <div style={{ padding: 28 }}>
              <div className="eyebrow" style={{ color: "var(--red)", marginBottom: 12 }}>Certificações internacionais</div>
              <h3 style={{ margin: "0 0 10px", fontSize: 19, fontWeight: 800 }}>Preparação Cambridge</h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--ink-soft)", textAlign: "justify" }}>Conduzida por quem tem experiência real com o sistema de exames Cambridge English, à frente de um Centro Preparatório Oficial há mais de 8 anos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOMESCHOOLING - secao dedicada, composicao modular sobreposta */}
      <section className="section-pad" id="homeschool" style={{ padding: "84px 40px", background: "var(--tint)", position: "relative", overflow: "hidden" }}>
        <div className="blob" style={{ bottom: -100, right: -100, width: 360, height: 360, background: "var(--blue)", opacity: 0.08 }} />
        <div className="container reveal grid-mobile-1" style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 52, alignItems: "center", position: "relative", zIndex: 1 }}>
          <div style={{ position: "relative", height: 380 }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: "72%", height: "68%", borderRadius: 16, overflow: "hidden", border: "4px solid #fff", boxShadow: "0 20px 40px rgba(24,27,34,.18)" }}>
              <Image src="/assets/homeschool-pai-mae.jpg" alt="Mãe ajudando filho a estudar inglês em casa" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px" style={{ objectFit: "cover", objectPosition: "50% 30%" }} />
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, width: "56%", height: "48%", borderRadius: 16, overflow: "hidden", border: "4px solid #fff", boxShadow: "0 20px 40px rgba(24,27,34,.18)" }}>
              <Image src="/assets/homeschool-familia-oracao.jpg" alt="Família reunida em estudo e oração em casa" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px" style={{ objectFit: "cover", objectPosition: "50% 35%" }} />
            </div>
          </div>
          <div>
            <span className="eyebrow" style={{ color: "var(--blue)" }}>Homeschooling</span>
            <h2 className="fluid-h2" style={{ margin: "12px 0 18px", fontSize: 30, fontWeight: 900, lineHeight: 1.25 }}>
              Inglês construído para caber na rotina de quem já educa em casa.
            </h2>
            <p style={{ margin: "0 0 18px", fontSize: 15.5, lineHeight: 1.7, color: "var(--ink-soft)", textAlign: "justify" }}>
              A Promise atende diretamente famílias homeschooling: horário definido junto com a família, acompanhamento individual e progresso real, não uma turma genérica de curso online.
            </p>
            <p style={{ margin: "0 0 26px", fontSize: 15.5, lineHeight: 1.7, color: "var(--ink)", fontWeight: 700, textAlign: "justify" }}>
              O aluno aprende no ritmo que a família já pratica, com a mesma exigência pedagógica de qualquer outra trajetória Promise, incluindo o caminho para certificações internacionais e para o American School.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 30 }}>
              {[
                "Aulas individuais ou em grupo pequeno, no ritmo da família",
                "Horário combinado diretamente com a família, sem turma fixa",
                "Acompanhamento direto do progresso, etapa por etapa",
                "Preparação para certificações internacionais e para o American School",
              ].map((item) => (
                <div key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--blue)", color: "#fff", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>✓</span>
                  <span style={{ fontSize: 14.5, lineHeight: 1.55, color: "var(--ink)" }}>{item}</span>
                </div>
              ))}
            </div>
            <a href="#matricula" className="pill pill-outline-blue">Falar sobre inglês no homeschooling</a>
          </div>
        </div>
      </section>

      {/* AMERICAN SCHOOL - secao dedicada, com destaque proprio */}
      <section className="section-pad" id="american-school" style={{ padding: "80px 40px", background: "var(--blue-dark)", position: "relative", overflow: "hidden" }}>
        <div className="blob" style={{ top: -100, right: -120, width: 400, height: 400, background: "var(--red)", opacity: 0.08 }} />
        <div className="container reveal grid-mobile-1" style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 52, alignItems: "center", position: "relative", zIndex: 1 }}>
          <div>
            <span className="eyebrow" style={{ color: "#8EA0E8" }}>American School</span>
            <h2 className="fluid-h2" style={{ margin: "12px 0 18px", fontSize: 30, fontWeight: 900, color: "#fff", lineHeight: 1.25 }}>
              Um programa acadêmico americano, do Elementary ao High School, para estudar em qualquer universidade americana.
            </h2>
            <p style={{ margin: "0 0 18px", fontSize: 15.5, lineHeight: 1.7, color: "#D6DCF5", textAlign: "justify" }}>
              Programa em contraturno para alunos de qualquer escola, não só das parceiras da Promise. O aluno mantém a rotina escolar normal e constrói, em paralelo, uma formação acadêmica americana do Elementary ao High School, reconhecida internacionalmente.
            </p>
            <p style={{ margin: "0 0 26px", fontSize: 15.5, lineHeight: 1.7, color: "#fff", fontWeight: 700, textAlign: "justify" }}>
              É a certificação de High School, etapa final do programa, que abre a porta de entrada: com ela, o aluno sai habilitado para se candidatar a qualquer universidade nos Estados Unidos, não apenas a uma lista restrita de instituições parceiras.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 30 }}>
              {[
                "Do Elementary ao High School, ajustável à idade e à etapa do aluno",
                "Contraturno: encaixa na rotina escolar do aluno, sem precisar trocar de escola",
                "Currículo e créditos acadêmicos americanos",
                "Acesso a qualquer universidade americana, não só a uma lista fechada de parceiras",
                "Acompanhamento pedagógico contínuo, com preparação para o processo de admissão universitária",
                "Aberto a alunos de qualquer escola, com ou sem convênio com a Promise",
              ].map((item) => (
                <div key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--red)", color: "#fff", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>✓</span>
                  <span style={{ fontSize: 14.5, lineHeight: 1.55, color: "#fff" }}>{item}</span>
                </div>
              ))}
            </div>
            <a href="#matricula" className="pill pill-red">Quero saber mais sobre o American School</a>
          </div>
          <div style={{ position: "relative", height: 420 }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: "78%", height: "62%", borderRadius: 16, overflow: "hidden", border: "4px solid #fff", boxShadow: "0 20px 40px rgba(0,0,0,.3)" }}>
              <Image src="/assets/schools-curricular.jpg" alt="Alunos em atividade de currículo internacional" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px" style={{ objectFit: "cover", objectPosition: "50% 30%" }} />
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, width: "62%", height: "48%", borderRadius: 16, overflow: "hidden", border: "4px solid #fff", boxShadow: "0 20px 40px rgba(0,0,0,.3)" }}>
              <Image src="/assets/global-familia.jpg" alt="Família recebendo estudante de intercâmbio" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px" loading="eager" style={{ objectFit: "cover", objectPosition: "50% 20%" }} />
            </div>
          </div>
        </div>
      </section>

      {/* TRAJETORIA ACADEMICA INTERNACIONAL - planejamento, distinto de American School */}
      <section id="pathway" className="section-pad" style={{ padding: "76px 40px", background: "var(--tint)" }}>
        <div className="container reveal grid-mobile-1" style={{ maxWidth: 1000, display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 44 }}>
          <div>
            <span className="eyebrow" style={{ color: "var(--blue)" }}>International Academic Pathway</span>
            <h2 style={{ margin: "10px 0 14px", fontSize: 24, fontWeight: 800 }}>Planeje antes de escolher o próximo passo</h2>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.65, color: "var(--ink-soft)", textAlign: "justify" }}>
              Uma trajetória internacional começa com uma pergunta: onde o estudante quer chegar? A partir daí, mapeamos as etapas necessárias (certificações, documentação e requisitos) para tornar esse objetivo possível.
            </p>
          </div>
          <div className="grid-mobile-1" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 14 }}>
            {[
              { t: "Objetivos", d: "Definição do destino acadêmico desejado." },
              { t: "Destinos", d: "Mapeamento de países, sistemas e possibilidades." },
              { t: "Requisitos", d: "Proficiência, currículo, exames e critérios específicos." },
              { t: "Certificações", d: "Identificação dos exames que fazem sentido para a trajetória." },
              { t: "Documentação", d: "Organização dos documentos e do histórico acadêmico." },
              { t: "Planejamento", d: "Sequenciamento das etapas e acompanhamento da preparação." },
            ].map((p) => (
              <div key={p.t} style={{ border: "1px solid var(--line)", borderRadius: 12, padding: 18, background: "#fff" }}>
                <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 5 }}>{p.t}</div>
                <p style={{ margin: 0, fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.5 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOLSA DE ESTUDOS - com foto contextual (pendente: ver prompt "Bolsa de Estudos" na lista) */}
      <section className="section-pad" style={{ padding: "56px 40px", background: "#fff", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="container reveal grid-mobile-1" style={{ maxWidth: 900, display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 36, alignItems: "center" }}>
          <div style={{ position: "relative", height: 160, borderRadius: 14, overflow: "hidden" }}>
            <Image src="/assets/bolsa-estudos.jpg" alt="Aluna bolsista estudando em casa" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px" style={{ objectFit: "cover", objectPosition: "50% 25%" }} />
          </div>
          <div>
            <span className="eyebrow" style={{ color: "var(--blue)" }}>Investimento missionário</span>
            <h2 style={{ margin: "8px 0 8px", fontSize: 21, fontWeight: 800 }}>Bolsa de estudos</h2>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "var(--ink-soft)", textAlign: "justify" }}>Parte do investimento das turmas sustenta bolsas para alunos que não teriam acesso ao ensino de inglês de outra forma.</p>
          </div>
        </div>
      </section>

      {/* MATRICULE-SE JA */}
      <section className="section-pad" style={{ padding: "76px 40px" }}>
        <div className="reveal">
          <MatriculaForm tipo="learners" />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="section-pad" style={{ background: "var(--red)", padding: "56px 40px", textAlign: "center" }}>
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
