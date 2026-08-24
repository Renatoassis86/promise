import Image from "next/image";

interface PhotoDecorProps {
  src: string;
  alt: string;
  height: number;
  ringColor?: string;
  glowColor?: string;
  background?: "light" | "dark";
  theme?: "travel";
}

const iconStroke = "currentColor";

function PlaneIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg style={style} width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={iconStroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 16l20-8-8 20-3-8-8-3z" />
    </svg>
  );
}

function GlobeIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg style={style} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={iconStroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <ellipse cx="12" cy="12" rx="4.2" ry="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
    </svg>
  );
}

function MapPinIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg style={style} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={iconStroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

/**
 * Composição "mosaico desconstruído": glow desfocado + anel tracejado atrás de uma
 * foto recortada (PNG sem fundo). Padrão replicado do hero real de promiseenglish.com.
 * theme="travel" adiciona marcas d'água discretas (avião, globo, mapa) ao redor,
 * referenciando o contexto de internacionalização.
 */
export default function PhotoDecor({
  src,
  alt,
  height,
  ringColor,
  glowColor = "var(--red)",
  background = "light",
  theme,
}: PhotoDecorProps) {
  const ring = ringColor ?? (background === "dark" ? "rgba(255,255,255,.35)" : "rgba(24,54,178,.28)");
  const iconColor = background === "dark" ? "rgba(255,255,255,.16)" : "rgba(24,54,178,.14)";

  return (
    <div
      style={{
        position: "relative",
        width: height * 0.95,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: height * 0.62,
          height: height * 0.62,
          borderRadius: "50%",
          background: glowColor,
          opacity: 0.3,
          filter: "blur(38px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: height * 0.72,
          height: height * 0.72,
          border: `2px dashed ${ring}`,
          borderRadius: "50%",
        }}
      />

      {theme === "travel" && (
        <>
          <GlobeIcon style={{ position: "absolute", top: "4%", right: "2%", color: iconColor }} />
          <PlaneIcon style={{ position: "absolute", bottom: "10%", left: "0%", color: iconColor, transform: "rotate(18deg)" }} />
          <MapPinIcon style={{ position: "absolute", top: "38%", right: "-4%", color: iconColor }} />
        </>
      )}

      <Image
        src={src}
        alt={alt}
        width={Math.round(height * 0.75)}
        height={height}
        style={{ position: "relative", zIndex: 1, height, width: "auto", objectFit: "contain" }}
      />
    </div>
  );
}
