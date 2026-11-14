import { useEffect, useState } from "react";

// Live terminal: types an AI-agent request → MCP tool call → webhook loop.
const SCRIPT = [
  { t: "> claude: reply to my latest 1★ review", c: "text-white" },
  { t: "→ mcp.call reviews.reply  ✓ 212ms", c: "text-[#C5F542]" },
  { t: "→ webhook review.replied  → 200 OK", c: "text-[#C5F542]" },
  { t: "> chatgpt: how are my listings doing?", c: "text-white" },
  { t: "→ mcp.call listings.overview  ✓ 1 card", c: "text-[#C5F542]" },
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function HeroTerminal() {
  const [still] = useState(prefersReducedMotion);
  const [line, setLine] = useState(still ? SCRIPT.length - 1 : 0);
  const [chars, setChars] = useState(still ? SCRIPT[SCRIPT.length - 1].t.length : 0);

  useEffect(() => {
    if (still) return;
    const full = SCRIPT[line].t.length;
    const id = setTimeout(
      () => {
        if (chars < full) setChars(chars + 1);
        else if (line < SCRIPT.length - 1) {
          setLine(line + 1);
          setChars(0);
        } else {
          setLine(0);
          setChars(0);
        }
      },
      chars < full ? 28 : line === SCRIPT.length - 1 ? 2200 : 450
    );
    return () => clearTimeout(id);
  }, [line, chars, still]);

  const start = Math.max(0, line - 2);
  return (
    <div className="hero-terminal w-[290px] sm:w-[330px] bg-black text-white rounded-2xl border-2 border-black shadow-[6px_6px_0_0_#C5F542] p-4 font-mono text-[11px] sm:text-xs leading-relaxed">
      <div className="flex items-center gap-1.5 mb-3">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-2 text-white/50 text-[10px] uppercase tracking-widest">mcp · live</span>
      </div>
      {SCRIPT.slice(start, line + 1).map((s, i) => {
        const idx = start + i;
        const text = idx === line ? s.t.slice(0, chars) : s.t;
        return (
          <div key={idx} className={`${s.c} whitespace-nowrap overflow-hidden`}>
            {text}
            {idx === line && <span className="term-caret">▍</span>}
          </div>
        );
      })}
    </div>
  );
}

// Rotating circular text badge.
export function SpinBadge() {
  const text = "AI AGENTS • MCP • WEBHOOKS • APIS • FULL-STACK • ";
  return (
    <div className="spin-badge relative w-28 h-28 sm:w-32 sm:h-32" aria-hidden="true">
      <svg viewBox="0 0 120 120" className="spin-badge-ring absolute inset-0 w-full h-full">
        <defs>
          <path id="spin-circle" d="M60 60 m-47 0 a47 47 0 1 1 94 0 a47 47 0 1 1 -94 0" />
        </defs>
        <circle cx="60" cy="60" r="58" fill="#C5F542" stroke="#000" strokeWidth="2.5" />
        <text fontFamily="Geist Mono, monospace" fontSize="10.2" fontWeight="700" letterSpacing="1.6" fill="#000">
          <textPath href="#spin-circle">{text}</textPath>
        </text>
      </svg>
      <div className="absolute inset-[34%] rounded-full bg-black flex items-center justify-center text-[#C5F542] font-black text-lg">
        ✦
      </div>
    </div>
  );
}

export function TechMarquee() {
  const items = ["Next.js", "React", "FastAPI", "Ruby on Rails", "MCP", "Kafka", "PostgreSQL", "Kubernetes", "Airflow", "GraphQL", "TypeScript", "Python", "Claude", "ChatGPT"];
  const row = (copy) => items.map((t) => (
    <span key={`${copy}-${t}`} className="flex items-center gap-6 shrink-0">
      <span>{t}</span>
      <span className="text-[#C5F542]">✦</span>
    </span>
  ));
  return (
    <div className="bg-black text-white border-t-2 border-black overflow-hidden py-4 md:py-5" aria-hidden="true">
      <div className="marquee-track flex gap-6 w-max font-black uppercase tracking-tight text-xl md:text-3xl">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
