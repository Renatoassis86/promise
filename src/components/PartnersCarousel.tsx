const PARCEIROS = [
  { name: "Editora Kairós", href: "https://www.editorakairos.com.br/", src: "/assets/parceiros/kairos.png", w: 131, h: 30 },
  { name: "Cidade Viva Education", href: "https://cidadeviva.education/", src: "/assets/parceiros/cidadeviva.svg", w: 130, h: 28 },
  { name: "American Education International", href: "https://americaneducationinternational.com/", src: "/assets/parceiros/aei.webp", w: 84, h: 84, caption: "American Education International" },
  { name: "Zoe Christian School", href: "https://matricula.zoechristianschool.com.br/", src: "/assets/parceiros/zoe.png", w: 92, h: 40 },
];

const ARKOS = { name: "ARKOS Intelligence", href: "https://studio.arkosintelligence.com/" };

/* Faixa com um conjunto completo de logos. Repetida varias vezes dentro de
   cada Track para garantir que a largura total sempre exceda a tela, mesmo
   em monitores ultra-wide - sem isso, o loop deixa um vao em branco visivel
   quando o conteudo acaba antes do fim da tela. */
function LogoRow() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 64, paddingRight: 64 }}>
      {PARCEIROS.map((p) => (
        <a
          key={p.name}
          href={p.href}
          target="_blank"
          rel="noreferrer"
          aria-label={p.name}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, flexShrink: 0, opacity: 0.9 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.src} alt={p.name} width={p.w} height={p.h} style={{ width: p.w, height: p.h }} />
          {p.caption && (
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.03em", color: "#9AA0B4", whiteSpace: "nowrap" }}>{p.caption}</span>
          )}
        </a>
      ))}
      <a
        href={ARKOS.href}
        target="_blank"
        rel="noreferrer"
        aria-label={ARKOS.name}
        style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0, opacity: 0.9 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/parceiros/arkos-icon.svg" alt="" width={26} height={29} style={{ width: 26, height: 29 }} />
        <span style={{ fontFamily: "'Courier New', monospace", fontWeight: 700, fontSize: 20, letterSpacing: "0.14em", color: "#F4F2ED" }}>ARKOS</span>
      </a>
    </div>
  );
}

function Track() {
  return (
    <div style={{ display: "flex" }}>
      <LogoRow />
      <LogoRow />
      <LogoRow />
      <LogoRow />
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
