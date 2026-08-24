const ICON = { red: "/assets/promise-mono-red.png", blue: "/assets/promise-mono-blue.png", orange: "/assets/promise-mono-orange.png" };

export default function SectionDivider({
  icon = "red",
  dark = false,
  background,
}: {
  icon?: "red" | "blue" | "orange";
  dark?: boolean;
  background?: string;
}) {
  const lineColor = dark ? "rgba(255,255,255,.14)" : "var(--line)";

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, padding: "28px 40px", background: background ?? (dark ? "var(--ink)" : "#fff") }}>
      <span style={{ flex: 1, maxWidth: 280, height: 1, background: lineColor }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={ICON[icon]} alt="" width={18} height={18} style={{ width: 18, height: 18, flexShrink: 0, opacity: 0.85 }} />
      <span style={{ flex: 1, maxWidth: 280, height: 1, background: lineColor }} />
    </div>
  );
}
