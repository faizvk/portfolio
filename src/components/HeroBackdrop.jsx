import { useEffect, useRef } from "react";

// Hero background: a faint network of the systems Faiz works across, with
// lime "data" pulses travelling between them. Pulses use SVG animateMotion,
// paused while off-screen or when the visitor prefers reduced motion.

const NODES = {
  claude: [110, 150, "Claude"],
  mcp: [640, 120, "MCP"],
  chatgpt: [1060, 70, "ChatGPT"],
  kafka: [790, 430, "Kafka"],
  api: [720, 760, "REST API"],
  hook: [330, 860, "Webhooks"],
  rails: [1370, 840, "Rails"],
  next: [40, 560, "Next.js"],
};

const LINKS = [
  ["claude", "mcp", "M110 150 C 300 60, 470 220, 640 120"],
  ["mcp", "chatgpt", "M640 120 C 800 40, 900 140, 1060 70"],
  ["mcp", "kafka", "M640 120 C 700 260, 860 300, 790 430"],
  ["kafka", "api", "M790 430 C 900 560, 640 620, 720 760"],
  ["kafka", "rails", "M790 430 C 1000 520, 1200 900, 1370 840"],
  ["api", "hook", "M720 760 C 600 900, 450 780, 330 860"],
  ["next", "claude", "M40 560 C 0 400, 160 300, 110 150"],
  ["hook", "next", "M330 860 C 150 900, 60 760, 40 560"],
];

export default function HeroBackdrop() {
  const ref = useRef(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !reduce.matches) svg.unpauseAnimations();
      else svg.pauseAnimations();
    });
    io.observe(svg);
    if (reduce.matches) svg.pauseAnimations();
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      className="hero-backdrop absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id="hb-grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0H0V48" fill="none" stroke="#000" strokeOpacity=".045" />
        </pattern>
        <radialGradient id="hb-glow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#C5F542" stopOpacity=".55" />
          <stop offset="1" stopColor="#C5F542" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="-48" y="-48" width="1536" height="996" fill="url(#hb-grid)" className="hb-pan" />
      <circle cx="790" cy="430" r="260" fill="url(#hb-glow)" className="hb-breathe" />

      {LINKS.map(([, , d], i) => (
        <g key={i}>
          <path id={`hb-l${i}`} d={d} fill="none" stroke="#000" strokeOpacity=".12" strokeWidth="1.5" strokeDasharray="4 8" className="hb-flow" />
          <circle r="5" fill="#9BC91F" stroke="#000" strokeWidth="1.5">
            <animateMotion dur={`${5 + (i % 4)}s`} begin={`${i * 0.7}s`} repeatCount="indefinite" rotate="auto">
              <mpath href={`#hb-l${i}`} />
            </animateMotion>
          </circle>
        </g>
      ))}

      {Object.entries(NODES).map(([k, [x, y, label]], i) => (
        <g key={k} transform={`translate(${x},${y})`}>
          <g className="hb-node" style={{ animationDelay: `${i * 0.6}s` }}>
            <rect x={-label.length * 5 - 18} y="-17" width={label.length * 10 + 36} height="34" rx="17" fill="#fff" stroke="#000" strokeOpacity=".35" strokeWidth="1.5" />
            <circle cx={-label.length * 5 - 4} r="4" fill="#C5F542" stroke="#000" strokeOpacity=".5" />
            <text x="6" y="5" textAnchor="middle" fontFamily="Geist Mono, ui-monospace, monospace" fontSize="13" fontWeight="700" fill="#000" fillOpacity=".55">
              {label}
            </text>
          </g>
        </g>
      ))}
    </svg>
  );
}
