"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { Slide, SlideQuadrant, TimelineItem, TeamMember, ProcessStep, GalleryImage, PartnerItem } from "@/lib/apresentacaoSlides";
import { CAPITULOS } from "@/lib/apresentacaoSlides";
import { FRENTES, type ResultadoProjecao } from "@/lib/financasCalculo";
import { StatsFinanceiros, GraficoReceitaPorFrente, GraficoMargemLiquida, TabelaDRE } from "@/components/admin/ProjecaoFinanceira5Anos";
import Icon from "@/components/Icons";

const ACCENT: Record<string, string> = {
  blue: "var(--blue)",
  red: "var(--red)",
  orange: "var(--orange)",
  ink: "var(--ink)",
};

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  const d = direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

function FullscreenIcon({ active }: { active: boolean }) {
  const expand = "M9 3H4v5M15 3h5v5M9 21H4v-5M15 21h5v-5";
  const compress = "M9 3v5H4M15 3v5h5M9 21v-5H4M15 21v-5h5";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d={active ? compress : expand} />
    </svg>
  );
}

function FramedImage({
  src,
  alt,
  accent = "var(--blue)",
  fit = "cover",
  position = "center 22%",
}: {
  src: string;
  alt: string;
  accent?: string;
  fit?: "cover" | "contain";
  position?: string;
}) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div style={{ position: "absolute", top: -10, left: -10, right: 10, bottom: 10, border: `2px solid ${accent}`, borderRadius: 20, opacity: 0.45 }} />
      <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%", borderRadius: 16, overflow: "hidden", background: "var(--tint)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: fit, objectPosition: fit === "cover" ? position : "center" }}
        />
      </div>
    </div>
  );
}

export default function ApresentacaoPlanoDeNegocio({
  slides,
  resultadoFinanceiro,
  temPremissasPreenchidas,
}: {
  slides: Slide[];
  resultadoFinanceiro: ResultadoProjecao;
  temPremissasPreenchidas: boolean;
}) {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const total = slides.length;

  useEffect(() => {
    if (previous === null) return;
    const t = setTimeout(() => setPrevious(null), 550);
    return () => clearTimeout(t);
  }, [previous]);

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current?.requestFullscreen().catch(() => {});
    }
  }

  const capitulosNav = useMemo(() => {
    const map = new Map<number, number>();
    slides.forEach((s, i) => {
      if (s.chapterIndex > 0 && !map.has(s.chapterIndex)) map.set(s.chapterIndex, i);
    });
    return Array.from(map.entries()).map(([chapterIndex, firstSlide]) => ({
      chapterIndex,
      firstSlide,
      titulo: CAPITULOS[chapterIndex - 1]?.titulo ?? "",
      icone: CAPITULOS[chapterIndex - 1]?.icone,
    }));
  }, [slides]);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(total - 1, index));
      setCurrent((c) => {
        if (clamped === c) return c;
        setPrevious(c);
        return clamped;
      });
    },
    [total]
  );

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown") goTo(current + 1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") goTo(current - 1);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current, goTo]);

  const touchStart = useRef<{ x: number; y: number } | null>(null);

  function handleTouchStart(e: React.TouchEvent) {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    // Só interpreta como troca de slide quando o gesto é predominantemente
    // horizontal, pra não brigar com a rolagem vertical do conteúdo no mobile.
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      goTo(current + (dx < 0 ? 1 : -1));
    }
  }

  const slideAtual = slides[current];
  const capituloAtual = capitulosNav.find((c) => c.chapterIndex === slideAtual.chapterIndex);

  return (
    <div ref={containerRef} style={{ position: "fixed", inset: 0, zIndex: 2000, background: "var(--bg)", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--line)", zIndex: 10 }}>
        <div style={{ height: "100%", width: `${((current + 1) / total) * 100}%`, background: "var(--blue)", transition: "width .35s ease" }} />
      </div>

      <Link
        href="/admin/plano-de-negocio"
        style={{
          position: "absolute",
          top: 20,
          left: "clamp(14px, 3vw, 24px)",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 12.5,
          fontWeight: 700,
          color: "var(--ink-soft)",
          textDecoration: "none",
          background: "#fff",
          border: "1px solid var(--line)",
          borderRadius: 999,
          padding: "8px 14px",
        }}
      >
        <ChevronIcon direction="left" />
        <span className="apresentacao-hide-mobile">Sair da apresentação</span>
      </Link>

      <div
        style={{
          position: "absolute",
          top: 20,
          right: "clamp(14px, 3vw, 24px)",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <button
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Sair da tela cheia" : "Entrar em tela cheia"}
          title={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            border: "1px solid var(--line)",
            background: "#fff",
            color: "var(--ink)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <FullscreenIcon active={isFullscreen} />
        </button>
        <div
          style={{
            fontSize: 12.5,
            fontWeight: 700,
            color: "var(--ink-soft)",
            background: "#fff",
            border: "1px solid var(--line)",
            borderRadius: 999,
            padding: "8px 14px",
          }}
        >
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      </div>

      {current > 0 && (
        <button
          onClick={() => goTo(current - 1)}
          aria-label="Slide anterior"
          className="apresentacao-arrow"
          style={{ left: 10 }}
        >
          <ChevronIcon direction="left" />
        </button>
      )}
      {current < total - 1 && (
        <button
          onClick={() => goTo(current + 1)}
          aria-label="Próximo slide"
          className="apresentacao-arrow"
          style={{ right: 10 }}
        >
          <ChevronIcon direction="right" />
        </button>
      )}

      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          display: "flex",
          height: "100%",
          width: `${total * 100}vw`,
          transform: `translateX(-${current * 100}vw)`,
          transition: "transform .5s cubic-bezier(.22,.61,.36,1)",
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`apresentacao-slide-viewport${i === previous ? " apresentacao-slide-viewport-exit" : ""}`}
            style={{ width: "100vw", height: "100%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {(i === current || i === previous) && (
              <SlideBody
                key={i === current ? "in" : "out"}
                slide={slide}
                resultadoFinanceiro={resultadoFinanceiro}
                temPremissasPreenchidas={temPremissasPreenchidas}
                capitulosNav={capitulosNav}
                onJump={goTo}
              />
            )}
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          gap: 7,
          background: "#fff",
          border: "1px solid var(--line)",
          borderRadius: 999,
          padding: "8px 10px",
          maxWidth: "90vw",
          overflowX: "auto",
        }}
      >
        {capitulosNav.map((c) => (
          <button
            key={c.chapterIndex}
            onClick={() => goTo(c.firstSlide)}
            title={c.titulo}
            aria-label={c.titulo}
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              padding: 0,
              flexShrink: 0,
              background: capituloAtual?.chapterIndex === c.chapterIndex ? "var(--blue)" : "var(--line)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

interface CapituloNav {
  chapterIndex: number;
  firstSlide: number;
  titulo: string;
  icone: (typeof CAPITULOS)[number]["icone"];
}

function SlideBody({
  slide,
  resultadoFinanceiro,
  temPremissasPreenchidas,
  capitulosNav,
  onJump,
}: {
  slide: Slide;
  resultadoFinanceiro: ResultadoProjecao;
  temPremissasPreenchidas: boolean;
  capitulosNav: CapituloNav[];
  onJump: (index: number) => void;
}) {
  switch (slide.layout) {
    case "cover":
      return <CoverSlide slide={slide} />;
    case "toc":
      return <TocSlide slide={slide} capitulosNav={capitulosNav} onJump={onJump} />;
    case "split":
      return <SplitSlide slide={slide} />;
    case "overlay":
      return <OverlaySlide slide={slide} />;
    case "stat-grid":
      return <StatGridSlide slide={slide} />;
    case "quadrant":
      return <QuadrantSlide slide={slide} />;
    case "timeline":
      return <TimelineSlide slide={slide} />;
    case "gallery":
      return <GallerySlide slide={slide} />;
    case "partners":
      return <PartnersSlide slide={slide} />;
    case "team-grid":
      return <TeamGridSlide slide={slide} />;
    case "profile":
      return <ProfileSlide slide={slide} />;
    case "process":
      return <ProcessSlide slide={slide} />;
    case "orgchart":
      return <OrgChartSlide slide={slide} />;
    case "table":
      return <TableSlide slide={slide} />;
    case "quote":
      return <QuoteSlide slide={slide} />;
    case "finance":
      return <FinanceSlide slide={slide} resultado={resultadoFinanceiro} temPremissas={temPremissasPreenchidas} />;
    case "closing":
      return <ClosingSlide slide={slide} />;
    default:
      return null;
  }
}

function SlideShell({ children, wide }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <div
      className="apresentacao-slide-content"
      style={{
        width: "100%",
        maxWidth: wide ? 1320 : 960,
        padding: "0 clamp(16px, 4vw, 56px)",
      }}
    >
      {children}
    </div>
  );
}

function Kicker({ text, color = "var(--blue)" }: { text?: string; color?: string }) {
  if (!text) return null;
  return (
    <div
      style={{
        display: "inline-block",
        fontSize: 11.5,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "#fff",
        background: color,
        padding: "5px 14px",
        borderRadius: 999,
        marginBottom: 12,
      }}
    >
      {text}
    </div>
  );
}

function Title({ text, size = 32, color = "var(--ink)" }: { text: string; size?: number; color?: string }) {
  return <h2 style={{ margin: "0 0 16px", fontSize: `clamp(22px, 2.8vw, ${size}px)`, fontWeight: 900, color, lineHeight: 1.12 }}>{text}</h2>;
}

function Paragraphs({ paragraphs, color = "var(--ink)", size = 15.5 }: { paragraphs?: string[]; color?: string; size?: number }) {
  if (!paragraphs) return null;
  return (
    <>
      {paragraphs.map((p, i) => (
        <p key={i} style={{ margin: "0 0 12px", fontSize: size, lineHeight: 1.55, color, textAlign: "justify", textAlignLast: "left" }}>
          {p}
        </p>
      ))}
    </>
  );
}

// ============================================================================
// COVER
// ============================================================================
function CoverSlide({ slide }: { slide: Slide }) {
  return (
    <SlideShell>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: -180, right: -220, width: 480, height: 480, borderRadius: "50%", background: "var(--blue)", opacity: 0.08, filter: "blur(70px)" }} />
        <div style={{ position: "absolute", bottom: -220, left: -200, width: 420, height: 420, borderRadius: "50%", background: "var(--red)", opacity: 0.07, filter: "blur(80px)" }} />
        <div style={{ position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/promise-english-logo.png" alt="Promise English" style={{ height: 34, width: "auto", marginBottom: 40 }} />
          <div style={{ display: "inline-block", fontSize: 12.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blue)", background: "var(--tint)", border: "1px solid var(--line)", padding: "8px 16px", borderRadius: 999, marginBottom: 28 }}>
            {slide.kicker}
          </div>
          <h1 style={{ margin: "0 0 22px", fontSize: "clamp(32px, 6vw, 56px)", lineHeight: 1.08, fontWeight: 900, color: "var(--ink)" }}>{slide.title}</h1>
          <Paragraphs paragraphs={slide.paragraphs} color="var(--ink-soft)" size={18} />
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
            {FRENTES.map((f) => (
              <span key={f.id} style={{ padding: "9px 18px", borderRadius: 999, background: f.cor, color: "#fff", fontWeight: 700, fontSize: 13 }}>
                {f.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

// ============================================================================
// SUMÁRIO (TOC)
// ============================================================================
function TocSlide({ slide, capitulosNav, onJump }: { slide: Slide; capitulosNav: CapituloNav[]; onJump: (i: number) => void }) {
  return (
    <SlideShell wide>
      <Kicker text={slide.kicker} />
      <Title text={slide.title} size={38} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
        {capitulosNav.map((c) => (
          <button
            key={c.chapterIndex}
            onClick={() => onJump(c.firstSlide)}
            className="apresentacao-toc-card"
            style={{ display: "flex", alignItems: "center", gap: 14, background: "#fff", border: "1px solid var(--line)", borderRadius: 12, padding: "16px 18px", textAlign: "left", cursor: "pointer" }}
          >
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--tint)", color: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name={c.icone} size={19} color="var(--blue)" />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-soft)" }}>{String(c.chapterIndex).padStart(2, "0")}</div>
              <div style={{ fontWeight: 700, fontSize: 14.5, color: "var(--ink)" }}>{c.titulo}</div>
            </div>
          </button>
        ))}
      </div>
    </SlideShell>
  );
}

// ============================================================================
// SPLIT — imagem de um lado, texto do outro
// ============================================================================
function SplitSlide({ slide }: { slide: Slide }) {
  const accent = ACCENT[slide.accent ?? "blue"];
  const imageFirst = slide.imageSide !== "right";
  return (
    <SlideShell wide>
      <div className="apresentacao-split" style={{ display: "flex", gap: 48, alignItems: "center" }}>
        {imageFirst && slide.image && (
          <div style={{ flex: "1 1 340px", height: "min(340px, 42vh)" }}>
            <FramedImage src={slide.image.src} alt={slide.image.alt} accent={accent} fit={slide.image.fit} position={slide.image.position} />
          </div>
        )}
        <div style={{ flex: "1 1 420px", borderLeft: `4px solid ${accent}`, paddingLeft: 20 }}>
          <Kicker text={slide.kicker} color={accent} />
          <Title text={slide.title} />
          <Paragraphs paragraphs={slide.paragraphs} />
          {slide.stats && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
              {slide.stats.map((s, i) => (
                <div
                  key={s.label}
                  className="apresentacao-card-in"
                  style={{ "--stagger": i, background: "#fff", border: "1px solid var(--line)", borderRadius: 10, padding: "8px 12px" } as React.CSSProperties}
                >
                  <div className="apresentacao-emphasis" style={{ "--stagger": i, fontSize: 16, fontWeight: 800, color: accent } as React.CSSProperties}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: 10.5, color: "var(--ink-soft)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        {!imageFirst && slide.image && (
          <div style={{ flex: "1 1 340px", height: "min(340px, 42vh)" }}>
            <FramedImage src={slide.image.src} alt={slide.image.alt} accent={accent} fit={slide.image.fit} position={slide.image.position} />
          </div>
        )}
      </div>
    </SlideShell>
  );
}

// ============================================================================
// OVERLAY — imagem de fundo com texto grande sobreposto
// ============================================================================
function OverlaySlide({ slide }: { slide: Slide }) {
  const accent = ACCENT[slide.accent ?? "blue"];
  return (
    <SlideShell wide>
      <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", height: "min(440px, 62vh)", display: "flex", alignItems: "flex-end", background: slide.image ? undefined : `linear-gradient(135deg, var(--blue-dark), var(--ink))` }}>
        {slide.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={slide.image.src} alt={slide.image.alt} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: slide.image.position ?? "center 22%" }} />
        )}
        {!slide.image && (
          <>
            <div style={{ position: "absolute", top: -140, right: -120, width: 380, height: 380, borderRadius: "50%", background: accent, opacity: 0.35, filter: "blur(90px)" }} />
            <div style={{ position: "absolute", bottom: -160, left: -100, width: 340, height: 340, borderRadius: "50%", background: "var(--red)", opacity: 0.18, filter: "blur(90px)" }} />
          </>
        )}
        <div style={{ position: "absolute", inset: 0, background: slide.image ? "linear-gradient(180deg, rgba(24,27,34,.35), rgba(24,27,34,.88))" : "linear-gradient(180deg, rgba(24,27,34,0), rgba(24,27,34,.25))" }} />
        <div style={{ position: "relative", zIndex: 1, padding: "28px clamp(24px, 4vw, 56px)", maxWidth: 720 }}>
          <div style={{ display: "inline-block", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", background: accent, padding: "6px 14px", borderRadius: 999, marginBottom: 18 }}>
            {slide.kicker}
          </div>
          <h2 style={{ margin: "0 0 14px", fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 900, color: "#fff", lineHeight: 1.18 }}>{slide.title}</h2>
          {slide.paragraphs?.map((p, i) => (
            <p key={i} style={{ margin: "0 0 10px", fontSize: 15.5, lineHeight: 1.55, color: "#E7E9F5", textAlign: "justify", textAlignLast: "left" }}>
              {p}
            </p>
          ))}
          {slide.stats && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 20 }}>
              {slide.stats.map((s, i) => (
                <div key={s.label} className="apresentacao-card-in" style={{ "--stagger": i } as React.CSSProperties}>
                  <div style={{ fontSize: 12, color: "#B8BCC8", fontWeight: 600, marginBottom: 2 }}>{s.label}</div>
                  <div className="apresentacao-emphasis" style={{ "--stagger": i, fontSize: 16, color: "#fff", fontWeight: 700 } as React.CSSProperties}>
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </SlideShell>
  );
}

// ============================================================================
// STAT GRID
// ============================================================================
function StatGridSlide({ slide }: { slide: Slide }) {
  const accent = ACCENT[slide.accent ?? "blue"];
  return (
    <SlideShell wide>
      <Kicker text={slide.kicker} color={accent} />
      <Title text={slide.title} />
      <Paragraphs paragraphs={slide.paragraphs} />
      {slide.stats && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 12, marginTop: 6 }}>
          {slide.stats.map((s, i) => (
            <div
              key={s.label}
              className="apresentacao-card-in"
              style={{ "--stagger": i, background: "#fff", border: "1px solid var(--line)", borderTop: `4px solid ${i % 2 === 0 ? accent : "var(--orange)"}`, borderRadius: 12, padding: "14px 16px" } as React.CSSProperties}
            >
              <div className="apresentacao-emphasis" style={{ "--stagger": i, fontSize: 23, fontWeight: 900, color: i % 2 === 0 ? accent : "var(--orange)" } as React.CSSProperties}>
                {s.value}
              </div>
              <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}
    </SlideShell>
  );
}

// ============================================================================
// QUADRANT — SWOT / custos fixos-variaveis
// ============================================================================
function QuadrantCard({ quadrant, baseStagger }: { quadrant: SlideQuadrant; baseStagger: number }) {
  const accent = ACCENT[quadrant.color];
  return (
    <div
      className="apresentacao-card-in"
      style={{ "--stagger": baseStagger, background: "#fff", border: "1px solid var(--line)", borderTop: `4px solid ${accent}`, borderRadius: 14, padding: 22 } as React.CSSProperties}
    >
      <div style={{ fontWeight: 800, fontSize: 16, color: accent, marginBottom: 14 }}>{quadrant.title}</div>
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
        {quadrant.items.map((item, i) => (
          <li
            key={i}
            className="apresentacao-card-in"
            style={{ "--stagger": baseStagger + i + 1, display: "flex", gap: 10, fontSize: 14.5, lineHeight: 1.6, color: "var(--ink)" } as React.CSSProperties}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: accent, marginTop: 8, flexShrink: 0 }} />
            <span style={{ textAlign: "justify", textAlignLast: "left" }}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function QuadrantSlide({ slide }: { slide: Slide }) {
  return (
    <SlideShell wide>
      <Kicker text={slide.kicker} />
      <Title text={slide.title} />
      <Paragraphs paragraphs={slide.paragraphs} />
      {slide.quadrants && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginTop: 8 }}>
          {slide.quadrants.map((q, qi) => (
            <QuadrantCard key={q.title} quadrant={q} baseStagger={qi * 5} />
          ))}
        </div>
      )}
    </SlideShell>
  );
}

// ============================================================================
// TIMELINE
// ============================================================================
function TimelineNode({ item, isLast, color, stagger }: { item: TimelineItem; isLast: boolean; color: string; stagger: number }) {
  return (
    <div className="apresentacao-card-in" style={{ "--stagger": stagger, display: "flex", alignItems: "flex-start", flex: "1 1 180px", minWidth: 180 } as React.CSSProperties}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center", textAlign: "center" }}>
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {item.icone && <Icon name={item.icone} size={20} color="#fff" />}
        </div>
        <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color }}>{item.label}</span>
        <div style={{ fontWeight: 800, fontSize: 14, color: "var(--ink)" }}>{item.title}</div>
        <p style={{ margin: 0, fontSize: 12, lineHeight: 1.45, color: "var(--ink-soft)" }}>{item.description}</p>
      </div>
      {!isLast && <div className="apresentacao-connector" style={{ flex: 1, height: 2, background: "var(--line)", margin: "0 10px", alignSelf: "center", marginTop: -30 }} />}
    </div>
  );
}

function TimelineSlide({ slide }: { slide: Slide }) {
  const accent = ACCENT[slide.accent ?? "blue"];
  const alt = accent === ACCENT.blue ? ACCENT.orange : ACCENT.blue;
  return (
    <SlideShell wide>
      <Kicker text={slide.kicker} color={accent} />
      <Title text={slide.title} />
      {slide.timeline && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 16 }}>
          {slide.timeline.map((item, i) => (
            <TimelineNode key={item.title} item={item} isLast={i === slide.timeline!.length - 1} color={i % 2 === 0 ? accent : alt} stagger={i} />
          ))}
        </div>
      )}
    </SlideShell>
  );
}

// ============================================================================
// GALLERY
// ============================================================================
function GallerySlide({ slide }: { slide: Slide }) {
  return (
    <SlideShell wide>
      <Kicker text={slide.kicker} />
      <Title text={slide.title} />
      {slide.images && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 22 }}>
          {slide.images.map((img: GalleryImage, i) => {
            const fit = img.fit ?? "cover";
            return (
              <div
                key={img.src}
                className="apresentacao-card-in"
                style={{ "--stagger": i, borderRadius: 14, overflow: "hidden", border: "1px solid var(--line)", background: fit === "contain" ? "var(--tint)" : "#fff", aspectRatio: "4 / 3" } as React.CSSProperties}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{ width: "100%", height: "100%", objectFit: fit, objectPosition: fit === "cover" ? (img.position ?? "center 20%") : "center", padding: fit === "contain" ? 20 : 0 }}
                />
              </div>
            );
          })}
        </div>
      )}
      <Paragraphs paragraphs={slide.paragraphs} />
    </SlideShell>
  );
}

// ============================================================================
// PARTNERS — logos em fundo escuro (como no site) + descricao ao lado
// ============================================================================
function PartnersSlide({ slide }: { slide: Slide }) {
  return (
    <SlideShell wide>
      <Kicker text={slide.kicker} />
      <Title text={slide.title} />
      {slide.partners && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16, marginBottom: 20 }}>
          {slide.partners.map((p: PartnerItem, i) => (
            <div
              key={p.nome}
              className="apresentacao-card-in"
              style={{ "--stagger": i, display: "flex", gap: 16, alignItems: "center", background: "#fff", border: "1px solid var(--line)", borderRadius: 14, padding: 16 } as React.CSSProperties}
            >
              <div style={{ width: 92, height: 72, borderRadius: 10, background: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, padding: 10 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.logo} alt={p.nome} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 14.5, color: "var(--ink)", marginBottom: 3 }}>{p.nome}</div>
                <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.5, color: "var(--ink-soft)" }}>{p.blurb}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <Paragraphs paragraphs={slide.paragraphs} color="var(--ink-soft)" size={14.5} />
    </SlideShell>
  );
}

// ============================================================================
// TEAM GRID
// ============================================================================
function TeamCard({ member, stagger }: { member: TeamMember; stagger: number }) {
  return (
    <div
      className="apresentacao-card-in"
      style={{ "--stagger": stagger, background: "#fff", border: "1px solid var(--line)", borderTop: `4px solid ${member.color}`, borderRadius: 14, padding: 16, display: "flex", flexDirection: "column", gap: 8 } as React.CSSProperties}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {member.photo ? (
          <div style={{ width: 50, height: 50, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: `2px solid ${member.color}` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={member.photo} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%" }} />
          </div>
        ) : (
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: member.color,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 16,
              flexShrink: 0,
            }}
          >
            {member.initials}
          </div>
        )}
        <div>
          <div style={{ fontWeight: 800, fontSize: 14.5, color: "var(--ink)" }}>{member.name}</div>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: member.color, marginTop: 1 }}>{member.role}</div>
        </div>
      </div>
      <span
        style={{
          alignSelf: "flex-start",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          padding: "3px 9px",
          borderRadius: 999,
          background: member.status === "atual" ? "var(--tint)" : "transparent",
          color: member.status === "atual" ? "var(--blue)" : "var(--ink-soft)",
          border: member.status === "futuro" ? "1px dashed var(--line)" : "none",
        }}
      >
        {member.status === "atual" ? "Atual" : "Contratação futura"}
      </span>
      <p
        style={{
          margin: 0,
          fontSize: 12,
          lineHeight: 1.45,
          color: "var(--ink-soft)",
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {member.bio}
      </p>
    </div>
  );
}

function TeamGridSlide({ slide }: { slide: Slide }) {
  return (
    <SlideShell wide>
      <Kicker text={slide.kicker} />
      <Title text={slide.title} />
      {slide.team && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
          {slide.team.map((m, i) => (
            <TeamCard key={m.name} member={m} stagger={i} />
          ))}
        </div>
      )}
    </SlideShell>
  );
}

// ============================================================================
// PROFILE — curriculo completo de uma pessoa (foto, formacao, trajetoria)
// ============================================================================
function ProfileSlide({ slide }: { slide: Slide }) {
  const accent = ACCENT[slide.accent ?? "blue"];
  const p = slide.profile;
  if (!p) return null;
  return (
    <SlideShell wide>
      <Kicker text={slide.kicker} color={accent} />
      <Title text={slide.title} size={30} />
      <div className="apresentacao-split" style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
        <div style={{ flex: "0 0 220px", display: "flex", flexDirection: "column", gap: 10 }}>
          {p.photo ? (
            <div style={{ width: 96, height: 96, borderRadius: "50%", overflow: "hidden", border: `3px solid ${accent}` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.photo} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%" }} />
            </div>
          ) : null}
          <div style={{ fontSize: 12.5, fontWeight: 700, color: accent }}>{p.role}</div>
          <span
            style={{
              alignSelf: "flex-start",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              padding: "3px 9px",
              borderRadius: 999,
              background: "var(--tint)",
              color: "var(--blue)",
            }}
          >
            Atual
          </span>
          {p.formacao.length > 0 && (
            <div>
              <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink-soft)", marginBottom: 5 }}>
                Formação
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 3 }}>
                {p.formacao.map((f, i) => (
                  <li key={f} className="apresentacao-card-in" style={{ "--stagger": i, fontSize: 12, lineHeight: 1.4, color: "var(--ink)" } as React.CSSProperties}>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: "0 0 14px", fontSize: 14, lineHeight: 1.55, color: "var(--ink-soft)", fontStyle: "italic", textAlign: "justify", textAlignLast: "left" }}>
            {p.headline}
          </p>
          {(() => {
            let itemCounter = 0;
            return p.sections.map((s) => (
              <div key={s.heading} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: accent, marginBottom: 6 }}>{s.heading}</div>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 5 }}>
                  {s.items.map((item, i) => {
                    const stagger = itemCounter++;
                    return (
                      <li
                        key={i}
                        className="apresentacao-card-in"
                        style={{ "--stagger": stagger, display: "flex", gap: 8, fontSize: 12.5, lineHeight: 1.45, color: "var(--ink)" } as React.CSSProperties}
                      >
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: accent, marginTop: 6, flexShrink: 0 }} />
                        <span style={{ textAlign: "justify", textAlignLast: "left" }}>{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ));
          })()}
          {p.tags && p.tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
              {p.tags.map((t, i) => (
                <span
                  key={t}
                  className="apresentacao-card-in"
                  style={{ "--stagger": i, fontSize: 10.5, fontWeight: 600, color: accent, background: "var(--tint)", border: `1px solid ${accent}`, borderRadius: 999, padding: "4px 10px" } as React.CSSProperties}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </SlideShell>
  );
}

// ============================================================================
// PROCESS — fluxo de etapas numeradas
// ============================================================================
function ProcessSlide({ slide }: { slide: Slide }) {
  const accent = ACCENT[slide.accent ?? "blue"];
  const alt = accent === ACCENT.blue ? ACCENT.orange : ACCENT.blue;
  return (
    <SlideShell wide>
      <Kicker text={slide.kicker} color={accent} />
      <Title text={slide.title} />
      {slide.process && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 0, marginTop: 10, marginBottom: 16 }}>
          {slide.process.map((step: ProcessStep, i) => {
            const color = i % 2 === 0 ? accent : alt;
            return (
              <div
                key={step.title}
                className="apresentacao-card-in"
                style={{ "--stagger": i, display: "flex", alignItems: "flex-start", flex: "1 1 170px", minWidth: 170 } as React.CSSProperties}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center", textAlign: "center" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {step.icone ? <Icon name={step.icone} size={18} color="#fff" /> : <span style={{ fontWeight: 800, fontSize: 14 }}>{i + 1}</span>}
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 13.5, color: "var(--ink)" }}>{step.title}</div>
                  <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.4, color: "var(--ink-soft)", maxWidth: 190 }}>{step.description}</p>
                </div>
                {i < slide.process!.length - 1 && <div className="apresentacao-connector" style={{ flex: 1, height: 2, background: "var(--line)", margin: "0 8px", marginTop: 19 }} />}
              </div>
            );
          })}
        </div>
      )}
      <Paragraphs paragraphs={slide.paragraphs} />
    </SlideShell>
  );
}

// ============================================================================
// ORGCHART — organograma hierarquico
// ============================================================================
function OrgChartSlide({ slide }: { slide: Slide }) {
  const accent = ACCENT[slide.accent ?? "blue"];
  const chart = slide.orgchart;
  if (!chart) return null;
  return (
    <SlideShell wide>
      <Kicker text={slide.kicker} color={accent} />
      <Title text={slide.title} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 8 }}>
        <div className="apresentacao-emphasis" style={{ background: accent, color: "#fff", borderRadius: 12, padding: "12px 24px", textAlign: "center", minWidth: 220 }}>
          <div style={{ fontWeight: 800, fontSize: 15 }}>{chart.root.title}</div>
          {chart.root.subtitle && <div style={{ fontSize: 11.5, opacity: 0.9, marginTop: 2 }}>{chart.root.subtitle}</div>}
        </div>
        <div style={{ width: 2, height: 20, background: "var(--line)" }} />
        <div className="apresentacao-orgchart-wrap" style={{ position: "relative", width: "100%" }}>
          <div
            className="apresentacao-orgchart-bar"
            style={{ position: "absolute", top: 0, left: `${100 / chart.children.length / 2}%`, right: `${100 / chart.children.length / 2}%`, height: 2, background: "var(--line)" }}
          />
          <div className="apresentacao-orgchart-children" style={{ display: "flex", gap: 14 }}>
            {chart.children.map((child, i) => (
              <div
                key={child.title}
                className="apresentacao-orgchart-child apresentacao-card-in"
                style={{ "--stagger": i + 1, flex: 1, display: "flex", flexDirection: "column", alignItems: "center" } as React.CSSProperties}
              >
                <div className="apresentacao-orgchart-stub" style={{ width: 2, height: 18, background: "var(--line)" }} />
                <div style={{ background: "#fff", border: "1px solid var(--line)", borderTop: `3px solid ${accent}`, borderRadius: 10, padding: "12px 14px", textAlign: "center", width: "100%" }}>
                  <div style={{ fontWeight: 800, fontSize: 13, color: "var(--ink)" }}>{child.title}</div>
                  {child.subtitle && <div style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 4, lineHeight: 1.35 }}>{child.subtitle}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        <Paragraphs paragraphs={slide.paragraphs} />
      </div>
    </SlideShell>
  );
}

// ============================================================================
// TABLE
// ============================================================================
function TableSlide({ slide }: { slide: Slide }) {
  return (
    <SlideShell wide>
      <Kicker text={slide.kicker} />
      <Title text={slide.title} />
      {slide.tableHead && slide.tableRows && (
        <div style={{ overflowX: "auto", marginBottom: 20 }}>
          <table className="financas-table" style={{ minWidth: 480 }}>
            <thead>
              <tr>
                {slide.tableHead.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slide.tableRows.map((row, i) => (
                <tr key={i} className="apresentacao-card-in" style={{ "--stagger": i } as React.CSSProperties}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ textAlign: j === 0 ? "left" : "left", fontWeight: j === 0 ? 700 : 400, whiteSpace: "normal" }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Paragraphs paragraphs={slide.paragraphs} />
    </SlideShell>
  );
}

// ============================================================================
// QUOTE
// ============================================================================
function QuoteSlide({ slide }: { slide: Slide }) {
  return (
    <SlideShell wide>
      <Kicker text={slide.kicker} />
      <div className="apresentacao-split" style={{ display: "flex", gap: 44, alignItems: "center" }}>
        {slide.quote?.photo && (
          <div style={{ flex: "0 0 260px", height: 300 }}>
            <FramedImage src={slide.quote.photo} alt={slide.quote.author} accent="var(--blue)" />
          </div>
        )}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <svg width="30" height="23" viewBox="0 0 24 18" fill="var(--line)" style={{ flexShrink: 0, marginTop: 6 }}>
              <path d="M0 18V9.5C0 4.3 3.8.4 9 0v3.6C6 4 4 6.3 4 9h5v9H0zm11 0V9.5C11 4.3 14.8.4 20 0v3.6c-3 .4-5 2.7-5 5.4h5v9H11z" />
            </svg>
            <div>
              <p style={{ margin: "0 0 14px", fontSize: 22, lineHeight: 1.5, color: "var(--ink)", fontWeight: 500, fontStyle: "italic", textAlign: "justify", textAlignLast: "left" }}>
                {slide.quote?.text}
              </p>
              {slide.quote?.author && <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--blue)" }}>{slide.quote.author}</div>}
            </div>
          </div>
          {slide.paragraphs && (
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--line)" }}>
              <Paragraphs paragraphs={slide.paragraphs} color="var(--ink-soft)" size={15} />
            </div>
          )}
        </div>
      </div>
    </SlideShell>
  );
}

// ============================================================================
// FINANCE — dados reais calculados
// ============================================================================
function FinanceSlide({ slide, resultado, temPremissas }: { slide: Slide; resultado: ResultadoProjecao; temPremissas: boolean }) {
  const vazio = (
    <div style={{ background: "#fff", border: "1px dashed var(--line)", borderRadius: 16, padding: 28, textAlign: "center", color: "var(--ink-soft)", fontSize: 14, maxWidth: 600 }}>
      Os valores da planilha de contas ainda não foram preenchidos em Finanças e Crescimento. Assim que forem, a projeção calculada de cinco anos aparece automaticamente aqui.
    </div>
  );

  if (slide.financeView === "table") {
    return (
      <SlideShell wide>
        <Kicker text={slide.kicker} color="var(--orange)" />
        <Title text={slide.title} />
        {temPremissas ? <TabelaDRE anos={resultado.anos} /> : vazio}
      </SlideShell>
    );
  }

  return (
    <SlideShell wide>
      <Kicker text={slide.kicker} color="var(--blue)" />
      <Title text={slide.title} />
      {temPremissas ? (
        <>
          <div style={{ marginBottom: 16 }}>
            <StatsFinanceiros resultado={resultado} compacto />
          </div>
          <div className="apresentacao-finance-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <GraficoReceitaPorFrente anos={resultado.anos} compacto />
            <GraficoMargemLiquida anos={resultado.anos} compacto />
          </div>
        </>
      ) : (
        vazio
      )}
    </SlideShell>
  );
}

// ============================================================================
// CLOSING
// ============================================================================
function ClosingSlide({ slide }: { slide: Slide }) {
  return (
    <SlideShell wide>
      <Kicker text={slide.kicker} />
      <Title text={slide.title} size={36} />
      <Paragraphs paragraphs={slide.paragraphs} />
      {slide.stats && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 8 }}>
          {slide.stats.map((s, i) => (
            <div
              key={s.label}
              className="apresentacao-card-in"
              style={{ "--stagger": i, background: "#fff", border: "1px solid var(--line)", borderRadius: 12, padding: "14px 18px", minWidth: 160 } as React.CSSProperties}
            >
              <div className="apresentacao-emphasis" style={{ "--stagger": i, fontSize: 22, fontWeight: 900, color: "var(--blue)" } as React.CSSProperties}>
                {s.value}
              </div>
              <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}
      <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid var(--line)", display: "flex", gap: 24, flexWrap: "wrap", fontSize: 13.5, color: "var(--ink-soft)" }}>
        <span>calebe@promiseenglish.com</span>
        <span>(83) 99697-7969</span>
        <span>João Pessoa, PB</span>
      </div>
    </SlideShell>
  );
}
