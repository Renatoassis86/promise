const PARCEIROS = [
  { name: "Editora Kairós", href: "https://www.editorakairos.com.br/", src: "/assets/parceiros/kairos.png", w: 140, h: 32 },
  { name: "Cidade Viva Education", href: "https://cidadeviva.education/", src: "/assets/parceiros/cidadeviva.svg", w: 128, h: 28 },
  { name: "American Education International", href: "https://americaneducationinternational.com/", src: "/assets/parceiros/aei.webp", w: 64, h: 64 },
  { name: "Zoe Christian School", href: "https://matricula.zoechristianschool.com.br/", src: "/assets/parceiros/zoe.png", w: 150, h: 40 },
  { name: "ARKOS Soluções Digitais", href: "https://studio.arkosintelligence.com/", src: "/assets/parceiros/arkos.svg", w: 130, h: 30 },
];

function Track() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 64, paddingRight: 64 }}>
      {PARCEIROS.map((p) => (
        <a
          key={p.name}
          href={p.href}
          target="_blank"
          rel="noreferrer"
          aria-label={p.name}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 64, flexShrink: 0, opacity: 0.9 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.src} alt={p.name} style={{ width: "auto", height: "auto", maxHeight: p.h, maxWidth: p.w }} />
        </a>
      ))}
    </div>
  );
}

export default function PartnersCarousel() {
  return (
    <section style={{ padding: "44px 0", background: "var(--ink)", borderTop: "1px solid rgba(255,255,255,.08)", overflow: "hidden" }}>
      <div className="container reveal" style={{ textAlign: "center", marginBottom: 28 }}>
        <span className="eyebrow" style={{ color: "#9DB0F0" }}>Parceiros e ecossistema</span>
      </div>
      <div style={{ overflow: "hidden", maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}>
        <div className="partners-track" style={{ display: "flex", width: "max-content" }}>
          <Track />
          <Track />
        </div>
      </div>
    </section>
  );
}
