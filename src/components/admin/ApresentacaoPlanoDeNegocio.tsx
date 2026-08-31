"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Slide } from "@/lib/apresentacaoSlides";
import { FRENTES, type ResultadoProjecao } from "@/lib/financasCalculo";
import ProjecaoFinanceira5Anos from "@/components/admin/ProjecaoFinanceira5Anos";

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  const d = direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
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

  const capitulos = useMemo(() => {
    const map = new Map<number, string>();
    for (const s of slides) {
      if (s.chapterIndex > 0 && !map.has(s.chapterIndex)) map.set(s.chapterIndex, s.chapterTitle);
    }
    return Array.from(map.entries()).map(([index, title]) => ({
      index,
      title,
      firstSlide: slides.findIndex((s) => s.chapterIndex === index),
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
  const currentChapter = capitulos.find((c) => c.index === slideAtual.chapterIndex);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 2000, background: "var(--bg)", overflow: "hidden" }}>
      {/* PROGRESSO */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--line)", zIndex: 10 }}>
        <div style={{ height: "100%", width: `${((current + 1) / total) * 100}%`, background: "var(--blue)", transition: "width .35s ease" }} />
      </div>

      {/* SAIR */}
      <Link
        href="/admin/plano-de-negocio"
        style={{
          position: "absolute",
          top: 20,
          left: 24,
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
        Sair da apresentação
      </Link>

      {/* CONTADOR */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 24,
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

      {/* SETAS */}
      {current > 0 && (
        <button
          onClick={() => goTo(current - 1)}
          aria-label="Slide anterior"
          style={{
            position: "absolute",
            left: 18,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: 44,
            height: 44,
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
          <ChevronIcon direction="left" />
        </button>
      )}
      {current < total - 1 && (
        <button
          onClick={() => goTo(current + 1)}
          aria-label="Próximo slide"
          style={{
            position: "absolute",
            right: 18,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: 44,
            height: 44,
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
          <ChevronIcon direction="right" />
        </button>
      )}

      {/* TRILHA DE SLIDES */}
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
          <div key={i} style={{ width: "100vw", height: "100%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 64px" }}>
            {i === current && (
              <SlideBody
                slide={slide}
                resultadoFinanceiro={resultadoFinanceiro}
                temPremissasPreenchidas={temPremissasPreenchidas}
              />
            )}
          </div>
        ))}
      </div>

      {/* NAV DE CAPITULOS */}
      <div
        style={{
          position: "absolute",
          bottom: 18,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          gap: 7,
          background: "#fff",
          border: "1px solid var(--line)",
          borderRadius: 999,
          padding: "8px 10px",
        }}
      >
        {capitulos.map((c) => (
          <button
            key={c.index}
            onClick={() => goTo(c.firstSlide)}
            title={c.title}
            aria-label={c.title}
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              padding: 0,
              background: currentChapter?.index === c.index ? "var(--blue)" : "var(--line)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function SlideBody({
  slide,
  resultadoFinanceiro,
  temPremissasPreenchidas,
}: {
  slide: Slide;
  resultadoFinanceiro: ResultadoProjecao;
  temPremissasPreenchidas: boolean;
}) {
  if (slide.variant === "cover") {
    return (
      <div key={slide.title} className="apresentacao-slide-content" style={{ position: "relative", maxWidth: 920, textAlign: "left" }}>
        <div style={{ position: "absolute", top: -180, right: -220, width: 480, height: 480, borderRadius: "50%", background: "var(--blue)", opacity: 0.08, filter: "blur(70px)" }} />
        <div style={{ position: "absolute", bottom: -220, left: -200, width: 420, height: 420, borderRadius: "50%", background: "var(--red)", opacity: 0.07, filter: "blur(80px)" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "inline-block", fontSize: 12.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blue)", background: "var(--tint)", border: "1px solid var(--line)", padding: "8px 16px", borderRadius: 999, marginBottom: 28 }}>
            {slide.kicker}
          </div>
          <h1 style={{ margin: "0 0 22px", fontSize: 56, lineHeight: 1.08, fontWeight: 900, color: "var(--ink)" }}>{slide.title}</h1>
          {slide.paragraphs?.map((p, i) => (
            <p key={i} style={{ margin: "0 0 32px", fontSize: 19, lineHeight: 1.65, color: "var(--ink-soft)", maxWidth: 680 }}>
              {p}
            </p>
          ))}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {FRENTES.map((f) => (
              <span key={f.id} style={{ padding: "9px 18px", borderRadius: 999, background: f.cor, color: "#fff", fontWeight: 700, fontSize: 13 }}>
                {f.label}
              </span>
            ))}
            <span style={{ padding: "9px 18px", borderRadius: 999, background: "var(--ink)", color: "#fff", fontWeight: 700, fontSize: 13 }}>Global</span>
          </div>
        </div>
      </div>
    );
  }

  if (slide.variant === "toc") {
    return (
      <TocSlide key={slide.title} slide={slide} />
    );
  }

  if (slide.variant === "finance") {
    return (
      <div key={slide.title} className="apresentacao-slide-content" style={{ maxWidth: 1080, width: "100%", maxHeight: "88vh", overflowY: "auto" }}>
        <SlideHeader slide={slide} />
        {temPremissasPreenchidas ? (
          <ProjecaoFinanceira5Anos resultado={resultadoFinanceiro} />
        ) : (
          <div style={{ background: "#fff", border: "1px dashed var(--line)", borderRadius: 16, padding: 32, textAlign: "center", color: "var(--ink-soft)", fontSize: 14.5, maxWidth: 640 }}>
            As premissas de crescimento ainda não foram preenchidas em &ldquo;Finanças e Crescimento&rdquo;. Assim que forem, a projeção calculada de 5 anos aparece automaticamente aqui.
          </div>
        )}
      </div>
    );
  }

  // content e closing
  return (
    <div key={slide.title} className="apresentacao-slide-content" style={{ maxWidth: 760 }}>
      <SlideHeader slide={slide} />
      {slide.paragraphs?.map((p, i) => (
        <p key={i} style={{ margin: "0 0 20px", fontSize: 18, lineHeight: 1.75, color: "var(--ink)" }}>
          {p}
        </p>
      ))}
      {slide.stats && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 20 }}>
          {slide.stats.map((s) => (
            <div key={s.label} style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 12, padding: "12px 16px", minWidth: 160 }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: "var(--blue)" }}>{s.value}</div>
              <div style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}
      {slide.variant === "closing" && (
        <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--line)", display: "flex", gap: 24, flexWrap: "wrap", fontSize: 13.5, color: "var(--ink-soft)" }}>
          <span>calebe@promiseenglish.com</span>
          <span>(83) 99697-7969</span>
          <span>João Pessoa – PB</span>
        </div>
      )}
    </div>
  );
}

function SlideHeader({ slide }: { slide: Slide }) {
  return (
    <>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--blue)", marginBottom: 14 }}>
        {slide.kicker}
      </div>
      <h2 style={{ margin: "0 0 22px", fontSize: 34, fontWeight: 900, color: "var(--ink)", lineHeight: 1.15 }}>{slide.title}</h2>
    </>
  );
}

function TocSlide({ slide }: { slide: Slide }) {
  return (
    <div key={slide.title} className="apresentacao-slide-content" style={{ maxWidth: 980, width: "100%" }}>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--blue)", marginBottom: 14 }}>
        {slide.kicker}
      </div>
      <h2 style={{ margin: "0 0 32px", fontSize: 34, fontWeight: 900, color: "var(--ink)" }}>{slide.title}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 14 }}>
        {[
          "Análise de Oportunidade",
          "Conceito",
          "Mercado e Competidores",
          "Equipe de Gestão",
          "Produtos e Serviços",
          "Estrutura e Operações",
          "Marketing e Vendas",
          "Estratégia de Crescimento",
          "Finanças",
          "Sumário Executivo",
        ].map((titulo, i) => (
          <div key={titulo} style={{ display: "flex", alignItems: "center", gap: 14, background: "#fff", border: "1px solid var(--line)", borderRadius: 12, padding: "14px 18px" }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "var(--tint)", color: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <div style={{ fontWeight: 700, fontSize: 14.5, color: "var(--ink)" }}>{titulo}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
