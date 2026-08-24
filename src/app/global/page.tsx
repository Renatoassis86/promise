import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroPhoto from "@/components/HeroPhoto";
import ContactForm from "@/components/ContactForm";

const SERVICOS = [
  { label: "Intercâmbios Educacionais", img: "/assets/global-servico-intercambios.jpg", pos: "50% 30%" },
  { label: "Viagens Acadêmicas", img: "/assets/global-servico-viagens.jpg", pos: "50% 25%" },
  { label: "Programas de Imersão", img: "/assets/global-servico-imersao.jpg", pos: "50% 40%" },
  { label: "Parcerias Internacionais", img: "/assets/global-servico-parcerias.jpg", pos: "50% 35%" },
  { label: "Cooperação Acadêmica", img: "/assets/global-servico-cooperacao.jpg", pos: "50% 40%" },
  { label: "Desenvolvimento de Projetos Internacionais", img: "/assets/global-servico-projetos.jpg", pos: "50% 20%" },
  { label: "Programas de Curta Duração", img: "/assets/global-servico-curta-duracao.jpg", pos: "50% 25%" },
  { label: "Missões Educacionais", img: "/assets/global-servico-missoes.jpg", pos: "50% 45%" },
  { label: "Conexão com Instituições Estrangeiras", img: "/assets/global-servico-instituicoes.jpg", pos: "50% 40%" },
];

export default function GlobalPage() {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div className="blob" style={{ top: 1700, left: -140, width: 420, height: 420, background: "var(--red)", opacity: 0.07 }} />

      <Header active="/global" />

      <HeroPhoto
        image="/assets/global-hero.jpg"
        eyebrow="Promise Global"
        title="Conectamos escolas, famílias homeschooling, estudantes e educadores ao cenário internacional."
        subtitle="Intercâmbios, parcerias e cooperação acadêmica com instituições estrangeiras: a ponte entre o que sua escola, seu homeschooling ou sua trajetória já construíram aqui e as oportunidades que existem lá fora."
        primaryCta={{ label: "Quero saber mais", href: "#matricula" }}
        secondaryCta={{ label: "Falar no WhatsApp", href: "https://wa.me/5583996977969", external: true }}
        imagePosition="50% 35%"
      />

      {/* O QUE FAZEMOS - cada servico com foto contextual propria */}
      <section style={{ padding: "70px 40px", background: "#fff", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="container">
          <h2 style={{ margin: "0 0 36px", fontSize: 24, fontWeight: 800, textAlign: "center" }}>O que a Promise Global faz</h2>
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

      {/* COMO SE CONECTA COM AS OUTRAS FRENTES */}
      <section style={{ padding: "70px 40px", background: "var(--blue-dark)" }}>
        <div className="container reveal grid-mobile-1" style={{ maxWidth: 1000, display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 44, alignItems: "center" }}>
          <div style={{ position: "relative", height: 280, borderRadius: 16, overflow: "hidden" }}>
            <Image src="/assets/global-familia.jpg" alt="Família recebendo estudante de intercâmbio" fill style={{ objectFit: "cover", objectPosition: "50% 20%" }} />
          </div>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: "#D6DCF5", textAlign: "justify" }}>
            A Promise Global não funciona sozinha. Ela é a camada que amplia o que as outras 3 frentes já constroem: uma escola atendida pela <strong style={{ color: "#fff" }}>Schools</strong> pode oferecer aos alunos os programas de <strong style={{ color: "#fff" }}>Learners</strong>, desenvolver a equipe pela <strong style={{ color: "#fff" }}>Professionals</strong>, e ampliar tudo isso internacionalmente pela <strong style={{ color: "#fff" }}>Global</strong>.
          </p>
        </div>
      </section>

      {/* CONTATO - Global nao tem "matricula", e conexao/parceria */}
      <section id="matricula" style={{ padding: "76px 40px", background: "var(--tint)" }}>
        <div className="container reveal" style={{ maxWidth: 560 }}>
          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 18, padding: 40 }}>
            <div className="eyebrow" style={{ color: "var(--red)", marginBottom: 10 }}>Quero saber mais</div>
            <h2 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800 }}>Fale com a Promise Global</h2>
            <p style={{ margin: "0 0 26px", fontSize: 14, color: "var(--ink-soft)", textAlign: "justify" }}>Conte sua escola, seu homeschooling ou seu interesse: a gente indica o programa internacional certo.</p>
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
