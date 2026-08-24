interface CTA {
  label: string;
  href: string;
  external?: boolean;
}

interface HeroPhotoProps {
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: CTA;
  secondaryCta: CTA;
  scrimSide?: "left" | "right";
  imagePosition?: string;
}

export default function HeroPhoto({ image, eyebrow, title, subtitle, primaryCta, secondaryCta, scrimSide = "left", imagePosition = "center 20%" }: HeroPhotoProps) {
  const gradientAngle = scrimSide === "left" ? "100deg" : "260deg";
  return (
    <section
      className="section-pad"
      style={{
        position: "relative",
        minHeight: 520,
        display: "flex",
        alignItems: "center",
        padding: "90px 40px",
        background: `linear-gradient(${gradientAngle}, rgba(9,13,28,.86) 0%, rgba(9,13,28,.62) 42%, rgba(9,13,28,.28) 68%, rgba(9,13,28,.12) 100%), url('${image}')`,
        backgroundSize: "cover",
        backgroundPosition: imagePosition,
      }}
    >
      <div className="container hero-photo-inner" style={{ display: "flex", justifyContent: scrimSide === "left" ? "flex-start" : "flex-end" }}>
        <div className="hero-photo-text" style={{ maxWidth: 620, display: "flex", flexDirection: "column", gap: 20, textAlign: scrimSide === "left" ? "left" : "right" }}>
          <span className="eyebrow" style={{ color: "#9DB0F0" }}>{eyebrow}</span>
          <h1 className="fluid-h1" style={{ margin: 0, fontSize: 40, lineHeight: 1.16, fontWeight: 900, color: "#fff" }}>{title}</h1>
          <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.6, color: "#DCE0EE" }}>{subtitle}</p>
          <div className="hero-photo-ctas" style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: scrimSide === "left" ? "flex-start" : "flex-end" }}>
            <a href={primaryCta.href} target={primaryCta.external ? "_blank" : undefined} rel={primaryCta.external ? "noreferrer" : undefined} className="pill pill-red">
              {primaryCta.label}
            </a>
            <a
              href={secondaryCta.href}
              target={secondaryCta.external ? "_blank" : undefined}
              rel={secondaryCta.external ? "noreferrer" : undefined}
              className="pill"
              style={{ background: "rgba(255,255,255,.12)", color: "#fff", border: "1px solid rgba(255,255,255,.45)" }}
            >
              {secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
