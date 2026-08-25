import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhotoCard from "@/components/PhotoCard";
import SectionDivider from "@/components/SectionDivider";

const FRENTES = [
  { href: "/schools", label: "Promise for Schools", text: "Transformação escolar: currículo, formação docente e internacionalização, sem abrir mão da identidade da instituição." },
  { href: "/learners", label: "Promise for Learners", text: "Inglês, certificações Cambridge, homeschooling, American School e experiências internacionais para alunos e famílias." },
  { href: "/professionals", label: "Promise for Professionals", text: "Formação continuada, cursos de metodologia para o ensino de inglês, capacitação de coordenadores e treinamentos especializados para profissionais que ensinam, coordenam e lideram." },
  { href: "/global", label: "Promise Global", text: "Intercâmbios, parcerias e cooperação acadêmica que conectam escolas e famílias ao cenário internacional." },
];

const PILARES_FUNDAMENTOS = [
  { n: "01", t: "Liderança Estratégica", d: "Diagnóstico institucional ou familiar, planejamento estratégico, metas, governança do programa internacional.", img: "/assets/timeline-3.jpg", pos: "50% 35%" },
  { n: "02", t: "Arquitetura Acadêmica", d: "Currículo, progressão de aprendizagem, materiais e avaliações, tratados como um único sistema, na escola ou em casa.", img: "/assets/schools-curricular.jpg", pos: "50% 30%" },
  { n: "03", t: "Excelência Docente", d: "Recrutamento, formação inicial e contínua, observação de aulas, certificações, para professores e pais-educadores.", img: "/assets/timeline-1.jpg", pos: "50% 15%" },
  { n: "04", t: "Cultura de Aprendizagem", d: "Metodologias ativas, projetos, pensamento crítico, protagonismo estudantil.", img: "/assets/banco-5.jpg", pos: "50% 40%" },
];

const PILARES_SUSTENTACAO = [
  { n: "05", t: "Oportunidades Globais", d: "Certificações Cambridge, American High School, intercâmbios, preparação universitária.", img: "/assets/global-familia.jpg", pos: "50% 15%" },
  { n: "06", t: "Cosmovisão Cristã Integrada", d: "A internacionalização fortalece a missão da escola ou da família. Nunca a substitui.", img: "/assets/banco-4.jpg", pos: "50% 20%" },
  { n: "07", t: "Melhoria Contínua", d: "Indicadores, acompanhamento, benchmarking, ciclos anuais de melhoria.", img: "/assets/banco-3.jpg", pos: "50% 50%" },
];

const FASES = [
  { n: "01", t: "Diagnosticar", d: "Onde a escola ou a família está hoje: currículo, equipe ou rotina, liderança e cultura." },
  { n: "02", t: "Planejar", d: "Metas, prazos e prioridades traduzidos em um plano institucional ou familiar." },
  { n: "03", t: "Transformar", d: "Implementação guiada dos 7 pilares, com acompanhamento direto." },
  { n: "04", t: "Consolidar", d: "A mudança vira rotina, não mais projeto pontual." },
  { n: "05", t: "Multiplicar", d: "A cultura de excelência sustenta novos ciclos, sem depender de nós." },
];

export default function QuemSomosPage() {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div className="blob" style={{ top: -100, right: -140, width: 460, height: 460, background: "var(--red)", opacity: 0.08 }} />

      <Header active="/quem-somos" />

      {/* HERO - full bleed, mesmo padrao das demais paginas */}
      <section
        className="section-pad"
        style={{
          position: "relative",
          minHeight: 480,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "100px 40px",
          background:
            "linear-gradient(180deg, rgba(9,13,28,.32) 0%, rgba(9,13,28,.46) 60%, rgba(9,13,28,.6) 100%), url('/assets/hero-quemsomos.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container" style={{ maxWidth: 820, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
          <span className="eyebrow" style={{ color: "#9DB0F0" }}>Quem Somos</span>
          <h1 className="fluid-h1" style={{ margin: 0, fontSize: 36, lineHeight: 1.25, fontWeight: 900, color: "#fff" }}>
            Um ecossistema confessional de internacionalização educacional dedicado a transformar escolas e famílias homeschooling, desenvolver educadores e preparar estudantes para impactar o mundo.
          </h1>
          <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: "#DCE0EE", maxWidth: 680, textAlign: "justify" }}>
            Reunimos em um único ecossistema soluções para escolas, famílias homeschooling, estudantes, educadores e parceiros internacionais: cursos de inglês, materiais didáticos, consultoria estratégica, desenvolvimento curricular, programas acadêmicos internacionais, certificações, formação profissional e experiências globais.
          </p>
        </div>
      </section>

      {/* ECOSSISTEMA - as 4 frentes + o que as conecta */}
      <section className="section-pad" style={{ padding: "70px 40px", background: "#fff" }}>
        <div className="container reveal" style={{ maxWidth: 760, textAlign: "center", margin: "0 auto 20px" }}>
          <span className="eyebrow" style={{ color: "var(--red)" }}>Como tudo se conecta</span>
          <h2 style={{ margin: "10px 0 12px", fontSize: 26, fontWeight: 800 }}>Um ecossistema, não quatro frentes isoladas</h2>
          <p style={{ margin: 0, fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.65, textAlign: "justify" }}>
            A Promise Education Group atua em diferentes dimensões da educação, mas todas fazem parte de uma mesma visão. Uma escola pode transformar seu programa de inglês pela Promise for Schools, desenvolver sua equipe pela Promise for Professionals, ampliar as oportunidades de seus alunos pela Promise for Learners e conectar toda essa formação ao mundo por meio da Promise Global.
          </p>
        </div>
        <div className="container reveal grid-tablet-2 grid-mobile-1" style={{ maxWidth: 1000, display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 3, borderRadius: 18, overflow: "hidden", marginTop: 32 }}>
          {FRENTES.map((f, i) => (
            <Link key={f.href} href={f.href} style={{ display: "block", padding: "26px 22px", background: i % 2 === 0 ? "var(--blue)" : "var(--red)", color: "#fff", minHeight: 190 }}>
              <div style={{ fontSize: 15.5, fontWeight: 800, marginBottom: 10 }}>{f.label}</div>
              <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.55, opacity: 0.92, textAlign: "justify" }}>{f.text}</p>
              <span style={{ display: "inline-block", marginTop: 14, fontSize: 12, fontWeight: 700 }}>Conhecer →</span>
            </Link>
          ))}
        </div>
        <div className="container reveal" style={{ maxWidth: 760, textAlign: "center", marginTop: 28 }}>
          <p style={{ margin: 0, fontSize: 15.5, fontWeight: 800, color: "var(--ink)" }}>Uma visão. Quatro frentes. Um ecossistema.</p>
        </div>
      </section>

      <SectionDivider />

      {/* MISSAO / VISAO / PROPOSITO */}
      <section className="section-pad" style={{ padding: "60px 40px", background: "var(--blue)" }}>
        <div className="container reveal grid-mobile-1" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 32 }}>
          <div>
            <div className="eyebrow" style={{ color: "#8EA0E8", marginBottom: 10 }}>Missão</div>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.65, color: "#fff", textAlign: "justify" }}>Expandir os horizontes de escolas, famílias homeschooling, educadores e estudantes por meio da internacionalização educacional de excelência, formando cidadãos preparados para impactar o mundo com competência, propósito e uma cosmovisão cristã.</p>
          </div>
          <div>
            <div className="eyebrow" style={{ color: "#8EA0E8", marginBottom: 10 }}>Visão</div>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.65, color: "#fff", textAlign: "justify" }}>Ser o principal ecossistema cristão de internacionalização educacional da América Latina.</p>
          </div>
          <div>
            <div className="eyebrow" style={{ color: "#8EA0E8", marginBottom: 10 }}>Propósito</div>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.65, color: "#fff", textAlign: "justify" }}>Construir instituições educacionais que transformem vidas por meio de uma educação internacional alinhada à verdade, à excelência e ao desenvolvimento integral.</p>
          </div>
        </div>
      </section>

      {/* TESE DA MARCA */}
      <section className="section-pad" style={{ padding: "80px 40px", background: "var(--ink)", textAlign: "center" }}>
        <div className="container reveal" style={{ maxWidth: 820, margin: "0 auto" }}>
          <span className="eyebrow" style={{ color: "#9DB0F0" }}>Nossa tese</span>
          <h2 className="fluid-h2" style={{ margin: "12px 0 18px", fontSize: 30, fontWeight: 800, color: "#fff", lineHeight: 1.35 }}>
            Internacionalização deve fortalecer a missão da escola e da família. Nunca substituí-la.
          </h2>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "#B8BCC8", textAlign: "justify" }}>
            É possível ampliar horizontes, acessar referências internacionais e preparar estudantes para o mundo sem abandonar convicções, cultura e identidade. A internacionalização é uma ferramenta. A formação continua sendo o centro.
          </p>
        </div>
      </section>

      {/* PROMISE EXCELLENCE FRAMEWORK - intro */}
      <section className="section-pad" style={{ padding: "76px 40px 44px", background: "#fff" }}>
        <div className="container reveal" style={{ textAlign: "center" }}>
          <span className="eyebrow" style={{ color: "var(--red)" }}>O método próprio</span>
          <h2 style={{ margin: "10px 0 12px", fontSize: 28, fontWeight: 800 }}>Promise Excellence Framework™</h2>
          <p style={{ margin: "0 auto", fontSize: 15, color: "var(--ink-soft)", maxWidth: 620, lineHeight: 1.6, textAlign: "justify" }}>
            Não implantamos só programas internacionais. Desenvolvemos escolas e famílias homeschooling capazes de sustentar uma cultura permanente de excelência, através de 7 pilares.
          </p>
        </div>
      </section>

      {/* PILARES - SECAO 1: FUNDAMENTOS */}
      <section className="section-pad" style={{ padding: "0 40px 20px", background: "#fff" }}>
        <div className="container">
          <h3 className="reveal" style={{ margin: "0 0 22px", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--blue)" }}>Como estruturamos por dentro</h3>
          <div className="grid-mobile-1" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 4, borderRadius: 18, overflow: "hidden" }}>
            {PILARES_FUNDAMENTOS.map((p, i) => (
              <div key={p.n} className={`reveal reveal-delay-${(i % 4) + 1}`} style={{ position: "relative", height: 240 }}>
                <Image src={p.img} alt={p.t} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px" style={{ objectFit: "cover", objectPosition: p.pos }} />
                <div style={{ position: "absolute", inset: 0, background: i % 2 === 0 ? "rgba(24,54,178,.78)" : "rgba(250,31,21,.78)" }} />
                <div style={{ position: "relative", zIndex: 1, height: "100%", padding: 26, display: "flex", flexDirection: "column", justifyContent: "flex-end", color: "#fff" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 8, opacity: 0.85 }}>{p.n}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>{p.t}</div>
                  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, maxWidth: 340, textAlign: "justify" }}>{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILARES - SECAO 2: SUSTENTACAO */}
      <section className="section-pad" style={{ padding: "20px 40px 76px", background: "#fff", borderBottom: "1px solid var(--line)" }}>
        <div className="container">
          <h3 className="reveal" style={{ margin: "0 0 22px", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--red)" }}>Como isso se sustenta</h3>
          <div className="grid-mobile-1" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 4, borderRadius: 18, overflow: "hidden" }}>
            {PILARES_SUSTENTACAO.map((p, i) => (
              <div key={p.n} className={`reveal reveal-delay-${(i % 4) + 1}`} style={{ position: "relative", height: 240 }}>
                <Image src={p.img} alt={p.t} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px" style={{ objectFit: "cover", objectPosition: p.pos }} />
                <div style={{ position: "absolute", inset: 0, background: i % 2 === 0 ? "rgba(250,31,21,.78)" : "rgba(24,54,178,.78)" }} />
                <div style={{ position: "relative", zIndex: 1, height: "100%", padding: 22, display: "flex", flexDirection: "column", justifyContent: "flex-end", color: "#fff" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 8, opacity: 0.85 }}>{p.n}</div>
                  <div style={{ fontSize: 16.5, fontWeight: 800, marginBottom: 8 }}>{p.t}</div>
                  <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, textAlign: "justify" }}>{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLUXO - jornada de 5 fases, com destaque */}
      <section className="section-pad" style={{ padding: "76px 40px", background: "var(--ink)" }}>
        <div className="container reveal" style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="eyebrow" style={{ color: "#9DB0F0" }}>A jornada</span>
          <h2 style={{ margin: "10px 0 0", fontSize: 26, fontWeight: 800, color: "#fff" }}>Cinco fases, do diagnóstico à autonomia da escola ou da família</h2>
        </div>
        <div className="container" style={{ maxWidth: 1100, position: "relative" }}>
          <div className="connector-line" style={{ position: "absolute", top: 26, left: "10%", right: "10%", height: 2, background: "rgba(255,255,255,.15)" }} />
          <div className="grid-tablet-2 grid-mobile-1" style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0,1fr))", gap: 20 }}>
            {FASES.map((f, i) => (
              <div key={f.n} className={`reveal reveal-delay-${(i % 4) + 1}`} style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <div style={{ position: "relative", zIndex: 1, width: 52, height: 52, borderRadius: "50%", background: "var(--red)", color: "#fff", fontWeight: 800, fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, border: "4px solid var(--ink)" }}>
                  {f.n}
                </div>
                <div style={{ fontSize: 15.5, fontWeight: 800, color: "#fff", marginBottom: 8 }}>{f.t}</div>
                <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.55, color: "#9AA0B4", textAlign: "justify" }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="container reveal" style={{ maxWidth: 700, textAlign: "center", marginTop: 44 }}>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "#fff", fontFamily: "inherit", fontStyle: "italic" }}>
            A Promise não cria dependência. Ela constrói capacidade institucional e familiar para que a excelência continue depois da implementação.
          </p>
        </div>
      </section>

      {/* FUNDADOR - bio + fala pessoal em primeira pessoa, em um so bloco */}
      <section className="section-pad" style={{ padding: "76px 40px", background: "var(--tint)" }}>
        <div className="container reveal" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <div style={{ display: "flex", gap: 44, alignItems: "flex-start", flexWrap: "wrap" }}>
            <PhotoCard src="/assets/calebe-familia.jpg" alt="Calebe Braga" height={340} />
            <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1, minWidth: 280 }}>
              <span className="eyebrow" style={{ color: "var(--blue)" }}>Fundador</span>
              <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800 }}>Calebe Braga</h2>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "var(--ink-soft)", textAlign: "justify" }}>
                Educador, gestor acadêmico e consultor educacional com mais de 14 anos de atuação no ensino de língua inglesa e no desenvolvimento de projetos educacionais. Coordena o departamento internacional da Cidade Viva Academy e tem experiência com o sistema de exames Cambridge English, abrangendo níveis do Pre A1 Starters ao C1 Advanced, e profundo conhecimento dos processos de avaliação, aplicação e certificação internacional.
              </p>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "var(--ink-soft)", textAlign: "justify" }}>
                É autor das coleções Paideia, Oikos e To the Nations, currículos de inglês cristãos, clássicos e alinhados à BNCC para escolas e famílias homeschooling. Formado em Letras Inglês e em Marketing, com pós-graduação em Christian Classical Education e estudos em Teologia, fundou a Promise Education Group para unir profundidade pedagógica, gestão acadêmica e visão estratégica de negócios em um único ecossistema educacional.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 4 }}>
                {["Centro Preparatório Oficial Cambridge", "CELTA (Cambridge)", "Autor: Paideia, Oikos e To the Nations", "14+ anos de atuação"].map((b) => (
                  <span key={b} style={{ background: "var(--blue)", color: "#fff", fontSize: 12.5, fontWeight: 600, padding: "7px 14px", borderRadius: 999 }}>{b}</span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background: "var(--blue)", borderRadius: 18, padding: "36px 40px", display: "flex", gap: 20, alignItems: "flex-start" }}>
            <svg width="30" height="23" viewBox="0 0 24 18" fill="rgba(255,255,255,.4)" style={{ flexShrink: 0, marginTop: 4 }}><path d="M0 18V9.5C0 4.3 3.8.4 9 0v3.6C6 4 4 6.3 4 9h5v9H0zm11 0V9.5C11 4.3 14.8.4 20 0v3.6c-3 .4-5 2.7-5 5.4h5v9H11z" /></svg>
            <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.65, color: "#fff", fontStyle: "italic" }}>
              &ldquo;Para mim, excelência acadêmica e fé caminham juntas. Não é só uma convicção profissional, é pessoal: a mesma fé que orienta minha vida em casa, com a minha família, orienta cada decisão da Promise no trabalho com escolas, famílias homeschooling e alunos.&rdquo;
              <span style={{ display: "block", marginTop: 12, fontSize: 13.5, fontStyle: "normal", fontWeight: 700, color: "#B9C3EE" }}>Calebe Braga, fundador da Promise</span>
            </p>
          </div>
        </div>
      </section>

      <SectionDivider background="var(--tint)" />

      {/* POR QUE PROMISE - 6 razoes, visao integrada */}
      <section className="section-pad" style={{ padding: "70px 40px", background: "var(--tint)" }}>
        <div className="container reveal" style={{ maxWidth: 700, textAlign: "center", margin: "0 auto 40px" }}>
          <span className="eyebrow" style={{ color: "var(--blue)" }}>Por que Promise?</span>
          <h2 style={{ margin: "10px 0 0", fontSize: 26, fontWeight: 800 }}>Mais do que serviços. Uma visão integrada.</h2>
        </div>
        <div className="container reveal grid-tablet-2 grid-mobile-1" style={{ maxWidth: 940, display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 28 }}>
          {[
            { t: "Visão sistêmica", d: "Currículo, professores, avaliação e internacionalização funcionam como partes de um mesmo sistema." },
            { t: "Método próprio", d: "O Promise Excellence Framework™ organiza como diagnosticamos e transformamos." },
            { t: "Excelência acadêmica", d: "Referências internacionais, desenvolvimento curricular e avaliação orientam as decisões." },
            { t: "Identidade", d: "Internacionalização sem abandonar missão, convicções, cultura e propósito." },
            { t: "Autonomia", d: "Construímos capacidade dentro da escola e da família para sustentar resultados." },
            { t: "Visão global", d: "Conectamos formação local a certificações, experiências e oportunidades internacionais." },
          ].map((w) => (
            <div key={w.t}>
              <div style={{ fontSize: 15.5, fontWeight: 800, color: "var(--ink)", marginBottom: 8 }}>{w.t}</div>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: "var(--ink-soft)", textAlign: "justify" }}>{w.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MATERIAIS UTILIZADOS - composicao compacta, sem caixas */}
      <section className="section-pad" style={{ padding: "60px 40px", background: "var(--ink)", position: "relative", overflow: "hidden" }}>
        <div className="blob" style={{ top: -100, right: -120, width: 380, height: 380, background: "var(--blue)", opacity: 0.1 }} />
        <div className="container" style={{ maxWidth: 980, textAlign: "center", marginBottom: 36, position: "relative", zIndex: 1 }}>
          <h2 style={{ margin: "0 0 8px", fontSize: 24, fontWeight: 800, color: "#fff" }}>Materiais desenvolvidos</h2>
          <p style={{ margin: 0, fontSize: 14, color: "#9AA0B4" }}>Currículo cristão, clássico, bilíngue e integral. O currículo de inglês é de autoria de Calebe Braga e Cássia Braga.</p>
        </div>

        {/* Paideia - cluster compacto a esquerda, texto a direita */}
        <div className="container reveal grid-mobile-1" style={{ maxWidth: 980, display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 28, alignItems: "center", marginBottom: 32, position: "relative", zIndex: 1 }}>
          <div className="photo-cluster" style={{ position: "relative", height: 200 }}>
            <div style={{ position: "absolute", top: 14, left: "50%", width: 130, zIndex: 1, transform: "translateX(-50%) translateX(-38px) rotate(-6deg)", filter: "drop-shadow(0 12px 16px rgba(0,0,0,.45))" }}>
              <Image src="/assets/livro-ingles-infantil-2.png" alt="Capa da coleção Paideia" width={260} height={325} style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
            <div style={{ position: "absolute", top: 0, left: "50%", width: 136, zIndex: 2, transform: "translateX(-50%) translateX(30px) rotate(4deg)", filter: "drop-shadow(0 12px 16px rgba(0,0,0,.45))" }}>
              <Image src="/assets/livro-ingles-infantil-3.png" alt="Capa da coleção Paideia, volume 2" width={260} height={325} style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 10 }}>Paideia</div>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.65, color: "#B8BCC8", textAlign: "justify" }}>
              Currículo cristão, clássico, bilíngue e integral, em quatro pilares: a Bíblia como base de todo conhecimento, a formação do caráter, o poder da linguagem para preparar líderes, e o desenvolvimento integral do aluno. Atende escolas, com método fônico e alinhamento à BNCC. Currículo de inglês de autoria de Calebe Braga e Cássia Braga.
            </p>
          </div>
        </div>

        {/* Oikos - texto a esquerda, cluster compacto a direita */}
        <div className="container reveal grid-mobile-1" style={{ maxWidth: 980, display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 28, alignItems: "center", marginBottom: 32, position: "relative", zIndex: 1 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 10 }}>Oikos</div>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.65, color: "#B8BCC8", textAlign: "justify" }}>
              Mesma base cristã, clássica, bilíngue e integral do Paideia, adaptada para o ensino domiciliar. Atende famílias homeschooling, com método fônico e alinhamento à BNCC. Currículo de inglês de autoria de Calebe Braga e Cássia Braga.
            </p>
          </div>
          <div className="photo-cluster" style={{ position: "relative", height: 200 }}>
            <div style={{ position: "absolute", top: 14, left: "50%", width: 130, zIndex: 1, transform: "translateX(-50%) translateX(-38px) rotate(6deg)", filter: "drop-shadow(0 12px 16px rgba(0,0,0,.45))" }}>
              <Image src="/assets/livro-ingles-infantil-4.png" alt="Capa da coleção Oikos" width={260} height={325} style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
            <div style={{ position: "absolute", top: 0, left: "50%", width: 136, zIndex: 2, transform: "translateX(-50%) translateX(30px) rotate(-4deg)", filter: "drop-shadow(0 12px 16px rgba(0,0,0,.45))" }}>
              <Image src="/assets/livro-ingles-infantil-5.png" alt="Capa da coleção Oikos, volume 2" width={260} height={325} style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          </div>
        </div>

        {/* To the Nations - cluster compacto a esquerda, texto a direita */}
        <div className="container reveal grid-mobile-1" style={{ maxWidth: 980, display: "grid", gridTemplateColumns: "0.7fr 1.3fr", gap: 32, alignItems: "center", position: "relative", zIndex: 1 }}>
          <div className="photo-cluster" style={{ position: "relative", height: 210, display: "flex", justifyContent: "center" }}>
            <div style={{ position: "absolute", top: 0, left: "16%", width: 125, zIndex: 2, borderRadius: 12, overflow: "hidden", border: "3px solid #fff", boxShadow: "0 14px 26px rgba(0,0,0,.4)" }}>
              <Image src="/assets/livro-to-the-nations.jpg" alt="Capa do livro To the Nations, volume 1" width={250} height={333} style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
            <div style={{ position: "absolute", bottom: 0, right: "10%", width: 115, zIndex: 1, borderRadius: 12, overflow: "hidden", border: "3px solid #fff", boxShadow: "0 12px 22px rgba(0,0,0,.35)" }}>
              <Image src="/assets/livro-to-the-nations-2.jpg" alt="Capa do livro To the Nations, volume 2" width={230} height={306} style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 10 }}>To the Nations</div>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.65, color: "#B8BCC8", textAlign: "justify" }}>
              Currículo de inglês para o Ensino Fundamental 1 (nível F1), na mesma linha pedagógica do Paideia e do Oikos: cristão, clássico, bilíngue e integral, com método fônico e alinhado à BNCC. De autoria de Calebe Braga e Cássia Braga.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
