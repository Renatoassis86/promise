import Link from "next/link";
import Image from "next/image";

const NAV = [
  { href: "/quem-somos", label: "Quem Somos" },
  { href: "/schools", label: "Schools" },
  { href: "/learners", label: "Learners" },
  { href: "/professionals", label: "Professionals" },
  { href: "/global", label: "Global" },
];

export default function Header({ active }: { active?: string }) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "#fff",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
          padding: "16px 40px",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <Image src="/assets/promise-english-logo.png" alt="Promise English" width={160} height={56} style={{ height: 40, width: "auto" }} />
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: 30, fontSize: 15, fontWeight: 500 }}>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                color: active === item.href ? "var(--red)" : "var(--ink)",
                fontWeight: active === item.href ? 700 : 500,
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Link
            href="/login"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              fontSize: 14,
              fontWeight: 600,
              color: "var(--ink)",
              border: "1px solid var(--line)",
              borderRadius: 999,
              padding: "9px 16px",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Entrar
          </Link>
          <a href="https://wa.me/5583996977969" target="_blank" rel="noreferrer" className="pill pill-red">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Fale Conosco
          </a>
        </div>
      </div>
    </header>
  );
}
