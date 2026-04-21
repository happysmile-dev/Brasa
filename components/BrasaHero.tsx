"use client";

import {
  LayoutGroup,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const MORPH_SPRING = {
  type: "spring" as const,
  stiffness: 82,
  damping: 26,
  mass: 1,
};

const HOVER_SPRING = { type: "spring" as const, stiffness: 420, damping: 22 };
const PRESS_SPRING = { type: "spring" as const, stiffness: 620, damping: 14 };

const BG_SPRING = { type: "spring" as const, stiffness: 140, damping: 32 };

const MODELS = [
  {
    id: "60",
    title: "BRASA 60",
    capacity: "60.000L",
    blurb: "Compact footprint. Full industrial output.",
    inner: "#ff7a45",
    outer: "#5c0d2b",
  },
  {
    id: "80",
    title: "BRASA 80",
    capacity: "80.000L",
    blurb: "Balanced throughput for growing operations.",
    inner: "#5efce8",
    outer: "#0a2f4d",
  },
  {
    id: "120",
    title: "BRASA 120",
    capacity: "120.000L",
    blurb: "High-volume staging with stable recovery.",
    inner: "#a78bfa",
    outer: "#1e3a8a",
  },
  {
    id: "200",
    title: "BRASA 200",
    capacity: "200.000L",
    blurb: "Maximum capacity for peak demand cycles.",
    inner: "#fcd34d",
    outer: "#9f1239",
  },
] as const;

function BoilerSilhouette({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <radialGradient
          id="boilerGlow"
          cx="50%"
          cy="42%"
          r="55%"
          fx="50%"
          fy="38%"
        >
          <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="45%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <filter
          id="softBloom"
          x="-40%"
          y="-40%"
          width="180%"
          height="180%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="18" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <ellipse cx="160" cy="360" rx="118" ry="22" fill="rgba(0,0,0,0.45)" />
      <rect
        x="72"
        y="118"
        width="176"
        height="228"
        rx="36"
        fill="url(#boilerGlow)"
        opacity="0.55"
      />
      <path
        d="M96 132h128a28 28 0 0 1 28 28v184a36 36 0 0 1-36 36H104a36 36 0 0 1-36-36V160a28 28 0 0 1 28-28Z"
        fill="#141a22"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1.25"
        filter="url(#softBloom)"
      />
      <rect
        x="118"
        y="72"
        width="84"
        height="52"
        rx="14"
        fill="#0f131a"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1"
      />
      <path
        d="M132 72V56a28 28 0 0 1 56 0v16"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="108" y="200" width="104" height="10" rx="5" fill="rgba(255,255,255,0.06)" />
      <rect x="108" y="224" width="104" height="10" rx="5" fill="rgba(255,255,255,0.05)" />
      <circle cx="160" cy="178" r="6" fill="rgba(255,180,120,0.35)" />
    </svg>
  );
}

export function BrasaHero() {
  const [activeId, setActiveId] = useState<(typeof MODELS)[number]["id"]>("60");
  const [graphite, setGraphite] = useState(false);

  const active = useMemo(
    () => MODELS.find((m) => m.id === activeId) ?? MODELS[0],
    [activeId],
  );

  const inner = useMotionValue<string>(MODELS[0].inner);
  const outer = useMotionValue<string>(MODELS[0].outer);

  useEffect(() => {
    const target = MODELS.find((m) => m.id === activeId) ?? MODELS[0];
    animate(inner, target.inner, MORPH_SPRING);
    animate(outer, target.outer, MORPH_SPRING);
  }, [activeId, inner, outer]);

  const morphingRadial = useMotionTemplate`radial-gradient(ellipse 132% 100% at 50% 14%, ${inner} 0%, ${outer} 42%, transparent 70%)`;

  return (
    <section className="relative isolate min-h-[100dvh] w-full overflow-hidden bg-[#07090c] text-[#e8eaef]">
      <motion.div
        className="absolute inset-0 z-0"
        initial={false}
        animate={{ backgroundColor: graphite ? "#1A1F26" : "#07090C" }}
        transition={BG_SPRING}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.92]"
        initial={false}
        style={{ background: morphingRadial }}
      />

      <div className="hero-grain" aria-hidden />

      <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center">
        <span
          className="select-none font-bebas text-[clamp(140px,22vw,220px)] leading-none tracking-[0.02em] text-white"
          style={{ opacity: 0.04 }}
          aria-hidden
        >
          BRASA
        </span>
      </div>

      <motion.button
        type="button"
        onClick={() => setGraphite((g) => !g)}
        className="absolute right-5 top-5 z-40 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-left font-dm text-xs text-white/80 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-md"
        whileHover={{
          y: -2,
          borderColor: "rgba(255,255,255,0.22)",
          transition: HOVER_SPRING,
        }}
        whileTap={{ scale: 0.96, transition: PRESS_SPRING }}
        aria-pressed={graphite}
      >
        <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-white/45">
          Fundo
        </span>
        <span className="block text-sm text-white/90">
          {graphite ? "Graphite" : "Near black"}
        </span>
      </motion.button>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-6xl flex-col px-5 pb-36 pt-16 sm:px-10 sm:pb-40 sm:pt-20">
        <header className="relative z-20 max-w-2xl">
          <p className="mb-3 font-dm text-sm uppercase tracking-[0.28em] text-white/45">
            Linha industrial
          </p>
          <motion.h1
            key={active.id}
            initial={{ opacity: 0.75, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={MORPH_SPRING}
            className="font-bebas text-[clamp(4rem,11vw,7.5rem)] leading-[0.92] tracking-[0.02em]"
          >
            {active.title.split(" ")[0]}{" "}
            <span className="text-white/88">{active.title.split(" ")[1]}</span>
          </motion.h1>
          <p className="mt-5 max-w-md font-dm text-base leading-relaxed text-white/58">
            {active.blurb}
          </p>
          <p className="mt-4 font-mono text-sm tracking-wide text-white/70">
            <span className="text-white/40">Capacidade nominal </span>
            {active.capacity}
          </p>
          <motion.button
            type="button"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-white px-7 py-3 font-dm text-sm font-semibold text-[#0a0c10] shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
            whileHover={{
              y: -3,
              scale: 1.02,
              boxShadow:
                "0 22px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.12)",
              transition: HOVER_SPRING,
            }}
            whileTap={{
              scale: 0.93,
              y: 1,
              transition: PRESS_SPRING,
            }}
          >
            Solicitar especificações
          </motion.button>
        </header>

        <div className="relative z-[8] mx-auto mt-6 flex flex-1 items-center justify-center sm:mt-0 sm:absolute sm:inset-0 sm:mt-0">
          <div
            className="relative w-[min(72vw,420px)] max-w-[420px] sm:w-[min(48vw,440px)]"
            style={{
              filter:
                "drop-shadow(0 32px 48px rgba(0,0,0,0.55)) drop-shadow(0 14px 28px rgba(255,140,90,0.14)) drop-shadow(0 4px 10px rgba(0,0,0,0.45))",
            }}
          >
            <BoilerSilhouette className="h-auto w-full" />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-40 bg-gradient-to-t from-black/55 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 z-40 px-4 pb-7 sm:px-8 sm:pb-10">
        <LayoutGroup id="brasa-models">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {MODELS.map((m) => {
            const isActive = m.id === activeId;
            return (
              <motion.button
                key={m.id}
                type="button"
                onClick={() => setActiveId(m.id)}
                className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-4 text-left sm:px-5 sm:py-5"
                animate={
                  isActive
                    ? { scale: 1.03, zIndex: 2 }
                    : { scale: 1, zIndex: 0 }
                }
                transition={{
                  type: "spring",
                  stiffness: 360,
                  damping: 28,
                }}
                whileHover={{
                  y: -6,
                  borderColor: "rgba(255,255,255,0.22)",
                  boxShadow:
                    "0 18px 50px rgba(0,0,0,0.45), 0 0 40px rgba(255,255,255,0.06)",
                  transition: HOVER_SPRING,
                }}
                whileTap={{ scale: 0.98, transition: PRESS_SPRING }}
                aria-current={isActive ? "true" : undefined}
              >
                {isActive ? (
                  <motion.div
                    layoutId="activeCardShell"
                    className="pointer-events-none absolute inset-0 rounded-2xl border border-white/20 bg-gradient-to-b from-white/[0.14] to-white/[0.04]"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                  />
                ) : null}
                <div className="relative flex flex-col gap-1">
                  <span className="font-bebas text-2xl tracking-wide text-white/92 sm:text-3xl">
                    BRASA {m.id}
                  </span>
                  <span className="font-mono text-[11px] text-white/45 sm:text-xs">
                    {m.capacity} nominal
                  </span>
                </div>
              </motion.button>
            );
          })}
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
}
