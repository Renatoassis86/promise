const ICON = { red: "/assets/promise-mono-red.png", blue: "/assets/promise-mono-blue.png", orange: "/assets/promise-mono-orange.png" };

export default function SectionDivider({
  left,
  right,
  icon = "red",
  dark = false,
  background,
}: {
  left?: string;
  right?: string;
  icon?: "red" | "blue" | "orange";
  dark?: boolean;
  background?: string;
}) {
  const lineColor = dark ? "rgba(255,255,255,.18)" : "var(--line)";
  const textColor = dark ? "#9AA0B4" : "var(--ink-soft)";

  return (
    <div className="flex-mobile-col-center" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, padding: "34px 40px", background: background ?? (dark ? "var(--ink)" : "#fff") }}>
      <span style={{ flex: 1, maxWidth: 220, height: 1, background: lineColor }} />
      {left && <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: textColor, whiteSpace: "nowrap" }}>{left}</span>}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={ICON[icon]} alt="" width={30} height={30} style={{ width: 30, height: 30, flexShrink: 0 }} />
      {right && <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: textColor, whiteSpace: "nowrap" }}>{right}</span>}
      <span style={{ flex: 1, maxWidth: 220, height: 1, background: lineColor }} />
    </div>
  );
}
