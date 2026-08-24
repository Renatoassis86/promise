const BADGE = { red: "/assets/promise-badge-red.png", blue: "/assets/promise-badge-blue.png" };

export default function SectionDivider({
  left,
  right,
  badge = "red",
  dark = false,
}: {
  left?: string;
  right?: string;
  badge?: "red" | "blue";
  dark?: boolean;
}) {
  const lineColor = dark ? "rgba(255,255,255,.18)" : "var(--line)";
  const textColor = dark ? "#9AA0B4" : "var(--ink-soft)";

  return (
    <div className="flex-mobile-col-center" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, padding: "30px 40px", background: dark ? "var(--ink)" : "#fff" }}>
      <span style={{ flex: 1, maxWidth: 220, height: 1, background: lineColor }} />
      {left && <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: textColor, whiteSpace: "nowrap" }}>{left}</span>}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={BADGE[badge]} alt="" width={44} height={44} style={{ width: 44, height: 44, flexShrink: 0 }} />
      {right && <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: textColor, whiteSpace: "nowrap" }}>{right}</span>}
      <span style={{ flex: 1, maxWidth: 220, height: 1, background: lineColor }} />
    </div>
  );
}
