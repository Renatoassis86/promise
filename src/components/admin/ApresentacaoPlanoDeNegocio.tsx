"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Slide, SlideQuadrant, TimelineItem, TeamMember, ProcessStep, GalleryImage, PartnerItem } from "@/lib/apresentacaoSlides";
import { CAPITULOS } from "@/lib/apresentacaoSlides";
import { FRENTES, type ResultadoProjecao } from "@/lib/financasCalculo";
import ProjecaoFinanceira5Anos from "@/components/admin/ProjecaoFinanceira5Anos";
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
  const total = slides.length;

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
      setCurrent(Math.max(0, Math.min(total - 1, index)));
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

  const slideAtual = slides[current];
  const capituloAtual = capitulosNav.find((c) => c.chapterIndex === slideAtual.chapterIndex);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 2000, background: "var(--bg)", overflow: "hidden" }}>
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
            className="apresentacao-slide-viewport"
            style={{ width: "100vw", height: "100%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {i === current && (
              <SlideBody
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
    case "process":
      return <ProcessSlide slide={slide} />;
    case "table":
      return <TableSlide slide={slide} />;
    case "quote":
      return <QuoteSlide slide={slide} />;
    case "finance":
      return <FinanceSlide resultado={resultadoFinanceiro} temPremissas={temPremissasPreenchidas} />;
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
      style={{ width: "100%", maxWidth: wide ? 1320 : 960, padding: "0 clamp(20px, 5vw, 64px)", maxHeight: "90vh", overflowY: "auto" }}
    >
      {children}
    </div>
  );
}

function Kicker({ text, color = "var(--blue)" }: { text?: string; color?: string }) {
  if (!text) return null;
  return (
    <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color, marginBottom: 14 }}>{text}</div>
  );
}

function Title({ text, size = 34, color = "var(--ink)" }: { text: string; size?: number; color?: string }) {
  return <h2 style={{ margin: "0 0 22px", fontSize: `clamp(24px, 3.4vw, ${size}px)`, fontWeight: 900, color, lineHeight: 1.15 }}>{text}</h2>;
}

function Paragraphs({ paragraphs, color = "var(--ink)", size = 17 }: { paragraphs?: string[]; color?: string; size?: number }) {
  if (!paragraphs) return null;
  return (
    <>
      {paragraphs.map((p, i) => (
        <p key={i} style={{ margin: "0 0 18px", fontSize: size, lineHeight: 1.75, color, textAlign: "justify", textAlignLast: "left" }}>
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
            <span style={{ padding: "9px 18px", borderRadius: 999, background: "var(--ink)", color: "#fff", fontWeight: 700, fontSize: 13 }}>Global</span>
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
          <div style={{ flex: "1 1 380px", height: 380 }}>
            <FramedImage src={slide.image.src} alt={slide.image.alt} accent={accent} fit={slide.image.fit} position={slide.image.position} />
          </div>
        )}
        <div style={{ flex: "1 1 420px" }}>
          <Kicker text={slide.kicker} color={accent} />
          <Title text={slide.title} />
          <Paragraphs paragraphs={slide.paragraphs} />
          {slide.stats && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}>
              {slide.stats.map((s) => (
                <div key={s.label} style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 10, padding: "10px 14px" }}>
                  <div style={{ fontSize: 17, fontWeight: 800, color: accent }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "var(--ink-soft)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        {!imageFirst && slide.image && (
          <div style={{ flex: "1 1 380px", height: 380 }}>
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
      <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", minHeight: 440, display: "flex", alignItems: "flex-end", background: slide.image ? undefined : `linear-gradient(135deg, var(--blue-dark), var(--ink))` }}>
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
        <div style={{ position: "relative", zIndex: 1, padding: "40px clamp(24px, 4vw, 56px)", maxWidth: 760 }}>
          <div style={{ display: "inline-block", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", background: accent, padding: "6px 14px", borderRadius: 999, marginBottom: 18 }}>
            {slide.kicker}
          </div>
          <h2 style={{ margin: "0 0 18px", fontSize: "clamp(24px, 3.6vw, 36px)", fontWeight: 900, color: "#fff", lineHeight: 1.2 }}>{slide.title}</h2>
          {slide.paragraphs?.map((p, i) => (
            <p key={i} style={{ margin: "0 0 12px", fontSize: 17, lineHeight: 1.7, color: "#E7E9F5", textAlign: "justify", textAlignLast: "left" }}>
              {p}
            </p>
          ))}
          {slide.stats && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 20 }}>
              {slide.stats.map((s) => (
                <div key={s.label}>
                  <div style={{ fontSize: 12, color: "#B8BCC8", fontWeight: 600, marginBottom: 2 }}>{s.label}</div>
                  <div style={{ fontSize: 16, color: "#fff", fontWeight: 700 }}>{s.value}</div>
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
  return (
    <SlideShell wide>
      <Kicker text={slide.kicker} />
      <Title text={slide.title} />
      <Paragraphs paragraphs={slide.paragraphs} />
      {slide.stats && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 14, marginTop: 8 }}>
          {slide.stats.map((s) => (
            <div key={s.label} style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 14, padding: "18px 20px" }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: "var(--blue)" }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 4 }}>{s.label}</div>
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
function QuadrantCard({ quadrant }: { quadrant: SlideQuadrant }) {
  const accent = ACCENT[quadrant.color];
  return (
    <div style={{ background: "#fff", border: "1px solid var(--line)", borderTop: `4px solid ${accent}`, borderRadius: 14, padding: 22 }}>
      <div style={{ fontWeight: 800, fontSize: 16, color: accent, marginBottom: 14 }}>{quadrant.title}</div>
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
        {quadrant.items.map((item, i) => (
          <li key={i} style={{ display: "flex", gap: 10, fontSize: 14.5, lineHeight: 1.6, color: "var(--ink)" }}>
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
          {slide.quadrants.map((q) => (
            <QuadrantCard key={q.title} quadrant={q} />
          ))}
        </div>
      )}
    </SlideShell>
  );
}

// ============================================================================
// TIMELINE
// ============================================================================
function TimelineNode({ item, isLast }: { item: TimelineItem; isLast: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", flex: "1 1 180px", minWidth: 180 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ alignSelf: "flex-start", fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "#fff", background: "var(--blue)", padding: "4px 10px", borderRadius: 999 }}>
          {item.label}
        </span>
        <div style={{ fontWeight: 800, fontSize: 15, color: "var(--ink)" }}>{item.title}</div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: "var(--ink-soft)", textAlign: "justify", textAlignLast: "left" }}>{item.description}</p>
      </div>
      {!isLast && <div className="apresentacao-connector" style={{ flex: 1, height: 2, background: "var(--line)", margin: "0 14px", alignSelf: "flex-start", marginTop: 9 }} />}
    </div>
  );
}

function TimelineSlide({ slide }: { slide: Slide }) {
  return (
    <SlideShell wide>
      <Kicker text={slide.kicker} />
      <Title text={slide.title} />
      {slide.timeline && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 20 }}>
          {slide.timeline.map((item, i) => (
            <TimelineNode key={item.title} item={item} isLast={i === slide.timeline!.length - 1} />
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
          {slide.images.map((img: GalleryImage) => {
            const fit = img.fit ?? "cover";
            return (
              <div key={img.src} style={{ borderRadius: 14, overflow: "hidden", border: "1px solid var(--line)", background: fit === "contain" ? "var(--tint)" : "#fff", aspectRatio: "4 / 3" }}>
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
          {slide.partners.map((p: PartnerItem) => (
            <div key={p.nome} style={{ display: "flex", gap: 16, alignItems: "center", background: "#fff", border: "1px solid var(--line)", borderRadius: 14, padding: 16 }}>
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
function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 16, padding: 22, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {member.photo ? (
          <div style={{ width: 60, height: 60, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: `2px solid ${member.color}` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={member.photo} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%" }} />
          </div>
        ) : (
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: member.color,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 18,
              flexShrink: 0,
            }}
          >
            {member.initials}
          </div>
        )}
        <div>
          <div style={{ fontWeight: 800, fontSize: 15.5, color: "var(--ink)" }}>{member.name}</div>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: member.color, marginTop: 2 }}>{member.role}</div>
        </div>
      </div>
      <span
        style={{
          alignSelf: "flex-start",
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          padding: "4px 10px",
          borderRadius: 999,
          background: member.status === "atual" ? "var(--tint)" : "transparent",
          color: member.status === "atual" ? "var(--blue)" : "var(--ink-soft)",
          border: member.status === "futuro" ? "1px dashed var(--line)" : "none",
        }}
      >
        {member.status === "atual" ? "Atual" : "Contratação futura"}
      </span>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "var(--ink-soft)", textAlign: "justify", textAlignLast: "left" }}>{member.bio}</p>
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
          {slide.team.map((m) => (
            <TeamCard key={m.name} member={m} />
          ))}
        </div>
      )}
    </SlideShell>
  );
}

// ============================================================================
// PROCESS — fluxo de etapas numeradas
// ============================================================================
function ProcessSlide({ slide }: { slide: Slide }) {
  return (
    <SlideShell wide>
      <Kicker text={slide.kicker} />
      <Title text={slide.title} />
      {slide.process && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 0, marginTop: 12, marginBottom: 22 }}>
          {slide.process.map((step: ProcessStep, i) => (
            <div key={step.title} style={{ display: "flex", alignItems: "flex-start", flex: "1 1 190px", minWidth: 190 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--blue)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14 }}>
                  {i + 1}
                </div>
                <div style={{ fontWeight: 800, fontSize: 14.5, color: "var(--ink)" }}>{step.title}</div>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: "var(--ink-soft)", maxWidth: 200, textAlign: "justify", textAlignLast: "left" }}>{step.description}</p>
              </div>
              {i < slide.process!.length - 1 && <div className="apresentacao-connector" style={{ flex: 1, height: 2, background: "var(--line)", margin: "17px 12px 0" }} />}
            </div>
          ))}
        </div>
      )}
      <Paragraphs paragraphs={slide.paragraphs} />
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
                <tr key={i}>
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
function FinanceSlide({ resultado, temPremissas }: { resultado: ResultadoProjecao; temPremissas: boolean }) {
  return (
    <SlideShell wide>
      <Kicker text="Capítulo 09 · Finanças" />
      <Title text="Proposta orçamentária: cinco anos" />
      {temPremissas ? (
        <ProjecaoFinanceira5Anos resultado={resultado} />
      ) : (
        <div style={{ background: "#fff", border: "1px dashed var(--line)", borderRadius: 16, padding: 32, textAlign: "center", color: "var(--ink-soft)", fontSize: 14.5, maxWidth: 640 }}>
          As premissas de crescimento ainda não foram preenchidas em Finanças e Crescimento. Assim que forem, a projeção calculada de cinco anos aparece automaticamente aqui.
        </div>
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
          {slide.stats.map((s) => (
            <div key={s.label} style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 12, padding: "14px 18px", minWidth: 160 }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: "var(--blue)" }}>{s.value}</div>
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
