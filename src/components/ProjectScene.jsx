import { useEffect, useRef, useState } from "react";
import "./projectScene.css";

// Looping animated scenes that show what each project does.
// Drawn as SVG + CSS keyframes (one 9s timeline per scene) so they stay sharp,
// weigh a few KB, and pause when off-screen.

const FONT = "Geist, system-ui, sans-serif";
const MONO = "Geist Mono, ui-monospace, monospace";

function NexKart() {
  return (
    <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="nk">
      <defs>
        <linearGradient id="nk-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eef2ff" />
          <stop offset="1" stopColor="#c4b5fd" />
        </linearGradient>
        <pattern id="nk-grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M50 0H0V50" fill="none" stroke="#4f46e5" strokeOpacity=".08" />
        </pattern>
      </defs>
      <rect width="800" height="500" fill="url(#nk-bg)" />
      <rect width="800" height="500" fill="url(#nk-grid)" className="pan" />

      {/* product grid */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${60 + i * 150},90)`}>
          <g className={`nk-prod nk-prod-${i}`}>
            <rect width="130" height="170" rx="16" fill="#fff" stroke="#1e1b4b" strokeWidth="3" />
            <rect x="15" y="15" width="100" height="80" rx="10" fill={["#c7d2fe", "#ddd6fe", "#fde68a"][i]} />
            <rect x="15" y="108" width="70" height="10" rx="5" fill="#1e1b4b" />
            <rect x="15" y="126" width="45" height="8" rx="4" fill="#7c3aed" opacity=".6" />
            <rect x="15" y="142" width="100" height="18" rx="9" fill="#4f46e5" />
            <text x="65" y="155" textAnchor="middle" fontFamily={MONO} fontSize="10" fontWeight="700" fill="#fff">ADD</text>
          </g>
        </g>
      ))}

      {/* item flying into cart */}
      <rect x="375" y="105" width="100" height="80" rx="10" fill="#fde68a" stroke="#1e1b4b" strokeWidth="3" className="nk-fly" />

      {/* cart */}
      <g transform="translate(580,90)">
        <path d="M30 40 Q30 0 70 0 Q110 0 110 40" fill="none" stroke="#1e1b4b" strokeWidth="10" strokeLinecap="round" />
        <rect y="35" width="140" height="150" rx="22" fill="#4f46e5" stroke="#1e1b4b" strokeWidth="3" className="nk-bag" />
        <circle cx="48" cy="85" r="7" fill="#fde047" />
        <circle cx="92" cy="85" r="7" fill="#fde047" />
        <g className="nk-badge">
          <circle cx="135" cy="40" r="22" fill="#fde047" stroke="#1e1b4b" strokeWidth="3" />
          <text x="135" y="47" textAnchor="middle" fontFamily={FONT} fontWeight="900" fontSize="20" fill="#1e1b4b">1</text>
        </g>
      </g>

      {/* checkout flow */}
      <g transform="translate(60,330)">
        {["Cart", "Checkout", "Paid", "Shipped"].map((s, i) => (
          <g key={s} transform={`translate(${i * 175},0)`}>
            {i > 0 && <rect x="-60" y="26" width="55" height="5" rx="2" fill="#1e1b4b" opacity=".2" />}
            {i > 0 && <rect x="-60" y="26" width="55" height="5" rx="2" fill="#4f46e5" className={`nk-line nk-line-${i}`} />}
            <g className={`nk-step nk-step-${i}`}>
              <rect width="115" height="56" rx="28" fill="#fff" stroke="#1e1b4b" strokeWidth="3" />
              <circle cx="28" cy="28" r="12" fill="#4f46e5" />
              <path d="M22 28l4 4 8-8" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
              <text x="48" y="34" fontFamily={FONT} fontWeight="800" fontSize="15" fill="#1e1b4b">{s}</text>
            </g>
          </g>
        ))}
      </g>
      <g className="nk-toast" transform="translate(470,420)">
        <rect width="270" height="44" rx="12" fill="#1e1b4b" />
        <text x="18" y="28" fontFamily={MONO} fontSize="13" fontWeight="700" fill="#fde047">₹ total verified on server ✓</text>
      </g>
    </svg>
  );
}

function Promptive() {
  const models = ["Gemini", "GPT-4o", "Claude", "Groq"];
  return (
    <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="pa">
      <defs>
        <radialGradient id="pa-bg" cx=".75" cy=".35" r=".9">
          <stop offset="0" stopColor="#2f6fd6" />
          <stop offset="1" stopColor="#0a3a7a" />
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="url(#pa-bg)" />

      {/* prompt window */}
      <g transform="translate(50,60)">
        <rect width="380" height="110" rx="16" fill="#0b1f45" stroke="#4f9cf9" strokeWidth="2" />
        <circle cx="22" cy="20" r="5" fill="#ff5f56" />
        <circle cx="38" cy="20" r="5" fill="#ffbd2e" />
        <circle cx="54" cy="20" r="5" fill="#27c93f" />
        <text x="22" y="62" fontFamily={MONO} fontSize="16" fill="#ffe492">&gt;</text>
        <clipPath id="pa-type"><rect x="40" y="44" width="330" height="30" className="pa-typing" /></clipPath>
        <text x="40" y="62" fontFamily={MONO} fontSize="16" fill="#fff" clipPath="url(#pa-type)">a lighthouse at golden hour</text>
        <rect x="22" y="80" width="0" height="6" rx="3" fill="#4f9cf9" className="pa-progress" />
      </g>

      {/* dispatcher orbit */}
      <g transform="translate(600,175)">
        <circle r="120" fill="none" stroke="#ffe492" strokeOpacity=".35" strokeDasharray="3 8" />
        <circle r="62" fill="#4f9cf9" stroke="#ffe492" strokeWidth="3" />
        <circle r="34" fill="#ffe492" className="pa-core" />
        <g className="pa-orbit">
          {models.map((m, i) => {
            const a = (i / models.length) * Math.PI * 2;
            return (
              <g key={m} transform={`translate(${Math.cos(a) * 120},${Math.sin(a) * 120})`}>
                <g className={`pa-model pa-model-${i}`}>
                  <rect x="-40" y="-15" width="80" height="30" rx="15" fill="#0b1f45" stroke="#ffe492" strokeWidth="2" />
                  <text y="5" textAnchor="middle" fontFamily={MONO} fontSize="12" fontWeight="700" fill="#fff">{m}</text>
                </g>
              </g>
            );
          })}
        </g>
      </g>

      {/* outputs: generated image tiles + voice wave */}
      <g transform="translate(50,220)">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${i * 130},0)`} className={`pa-tile pa-tile-${i}`}>
            <rect width="115" height="115" rx="14" fill="#0b1f45" stroke="#4f9cf9" strokeWidth="2" />
            <rect x="8" y="8" width="99" height="99" rx="10" fill={["#ffbd2e", "#4f9cf9", "#ffe492"][i]} opacity=".85" />
            <path d={`M8 ${80 - i * 8} L45 ${55 + i * 4} L70 ${75 - i * 3} L107 ${50 + i * 6} V107 H8Z`} fill="#0a3a7a" opacity=".75" />
            <circle cx={80 - i * 12} cy="32" r="10" fill="#fff" opacity=".9" />
          </g>
        ))}
        <g transform="translate(0,150)" className="pa-wave">
          <rect width="380" height="70" rx="16" fill="#0b1f45" stroke="#4f9cf9" strokeWidth="2" />
          <text x="18" y="41" fontFamily={MONO} fontSize="12" fontWeight="700" fill="#ffe492">TTS</text>
          {Array.from({ length: 26 }).map((_, i) => (
            <rect key={i} x={62 + i * 12} y="20" width="6" height="30" rx="3" fill="#4f9cf9" className="pa-bar" style={{ animationDelay: `${(i % 7) * 0.12}s` }} />
          ))}
        </g>
      </g>
    </svg>
  );
}

function Pursuit() {
  const jobs = [
    ["Frontend Engineer", "LinkedIn", 92],
    ["Full-Stack Developer", "Naukri", 87],
    ["React Developer", "Indeed", 81],
  ];
  return (
    <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="jp">
      <rect width="800" height="500" fill="#ecfdf5" />
      <circle cx="720" cy="60" r="160" fill="#a7f3d0" opacity=".5" />

      {/* search bar */}
      <g transform="translate(50,45)">
        <rect width="460" height="58" rx="29" fill="#fff" stroke="#0f172a" strokeWidth="3" />
        <circle cx="34" cy="29" r="10" fill="none" stroke="#059669" strokeWidth="3" />
        <path d="M41 36l8 8" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
        <clipPath id="jp-type"><rect x="60" y="14" width="300" height="30" className="jp-typing" /></clipPath>
        <text x="62" y="35" fontFamily={FONT} fontSize="17" fontWeight="600" fill="#0f172a" clipPath="url(#jp-type)">Frontend Developer — Bangalore</text>
        <rect x="370" y="9" width="80" height="40" rx="20" fill="#059669" />
        <text x="410" y="34" textAnchor="middle" fontFamily={FONT} fontSize="14" fontWeight="800" fill="#fff">Find</text>
      </g>

      {/* job feed with match scores */}
      {jobs.map(([t, src, score], i) => (
        <g key={t} transform={`translate(50,${130 + i * 78})`} className={`jp-job jp-job-${i}`}>
          <rect width="460" height="64" rx="14" fill="#fff" stroke="#0f172a" strokeWidth="2.5" />
          <text x="20" y="28" fontFamily={FONT} fontSize="16" fontWeight="800" fill="#0f172a">{t}</text>
          <text x="20" y="48" fontFamily={MONO} fontSize="11" fontWeight="700" fill="#065f46">via {src}</text>
          <rect x="300" y="24" width="100" height="10" rx="5" fill="#d1fae5" />
          <rect x="300" y="24" width={score} height="10" rx="5" fill="#10b981" className="jp-bar" />
          <text x="440" y="38" textAnchor="end" fontFamily={MONO} fontSize="15" fontWeight="800" fill="#059669">{score}%</text>
        </g>
      ))}

      {/* kanban */}
      <g transform="translate(550,130)">
        {["Saved", "Applied", "Interview"].map((c, i) => (
          <g key={c} transform={`translate(0,${i * 105})`}>
            <rect width="200" height="92" rx="14" fill="#fff" stroke="#0f172a" strokeWidth="2.5" strokeDasharray={i ? "0" : "0"} />
            <text x="16" y="26" fontFamily={MONO} fontSize="11" fontWeight="800" fill="#065f46">{c.toUpperCase()}</text>
          </g>
        ))}
        <g className="jp-card">
          <rect x="16" y="38" width="168" height="42" rx="10" fill="#059669" />
          <text x="30" y="64" fontFamily={FONT} fontSize="14" fontWeight="800" fill="#fff">Frontend · 92%</text>
        </g>
      </g>
    </svg>
  );
}

function SmartChain() {
  return (
    <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="sc">
      <defs>
        <pattern id="sc-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="#fff" strokeOpacity=".05" />
        </pattern>
      </defs>
      <rect width="800" height="500" fill="#222" />
      <rect width="800" height="500" fill="url(#sc-grid)" className="pan" />

      {/* bid document */}
      <g transform="translate(60,80)" className="sc-doc">
        <path d="M0 0h110l30 30v150H0z" fill="#2a2a2a" stroke="#cbd5e1" strokeWidth="2.5" />
        <path d="M110 0v30h30" fill="none" stroke="#cbd5e1" strokeWidth="2.5" />
        {[50, 72, 94, 116].map((y, i) => (
          <rect key={y} x="18" y={y} width={[100, 80, 104, 64][i]} height="8" rx="4" fill="#cbd5e1" opacity=".55" />
        ))}
        <text x="18" y="160" fontFamily={MONO} fontSize="12" fontWeight="700" fill="#c5f542">BID.pdf</text>
      </g>

      {/* compliance check */}
      <g transform="translate(60,300)" className="sc-ai">
        <rect width="230" height="50" rx="25" fill="#2a2a2a" stroke="#cbd5e1" strokeWidth="2" />
        <circle cx="26" cy="25" r="11" fill="#c5f542" />
        <path d="M20 25l4 4 8-8" stroke="#222" strokeWidth="3" fill="none" strokeLinecap="round" />
        <text x="48" y="31" fontFamily={MONO} fontSize="13" fontWeight="700" fill="#fff">AI compliance ✓</text>
      </g>

      {/* hash travelling */}
      <g className="sc-hash">
        <rect x="220" y="150" width="120" height="36" rx="18" fill="#c5f542" />
        <text x="280" y="173" textAnchor="middle" fontFamily={MONO} fontSize="13" fontWeight="800" fill="#222">0x9f3a…</text>
      </g>

      {/* chain of blocks */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${380 + i * 100},${120 + (i % 2) * 70})`} className={`sc-block sc-block-${i}`}>
          {i > 0 && <line x1="-38" y1={i % 2 ? -22 : 48} x2="0" y2="25" stroke="#cbd5e1" strokeWidth="3" />}
          <rect width="72" height="72" rx="12" fill={i === 3 ? "#c5f542" : "#3a3a3a"} stroke="#cbd5e1" strokeWidth="2.5" />
          <text x="36" y="42" textAnchor="middle" fontFamily={MONO} fontSize="13" fontWeight="800" fill={i === 3 ? "#222" : "#fff"}>#{41 + i}</text>
        </g>
      ))}

      {/* IPFS + lock */}
      <g transform="translate(400,350)" className="sc-ipfs">
        <rect width="330" height="56" rx="14" fill="#2a2a2a" stroke="#cbd5e1" strokeWidth="2" />
        <rect x="18" y="16" width="22" height="18" rx="4" fill="none" stroke="#c5f542" strokeWidth="3" />
        <path d="M23 16v-5a6 6 0 0 1 12 0v5" fill="none" stroke="#c5f542" strokeWidth="3" />
        <text x="56" y="34" fontFamily={MONO} fontSize="13" fontWeight="700" fill="#fff">pinned to IPFS · bid locked</text>
      </g>
    </svg>
  );
}

const SCENES = { nexkart: NexKart, "promptive-ai": Promptive, jobpilot: Pursuit, smartchain: SmartChain };

export default function ProjectScene({ slug, className = "" }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const Scene = SCENES[slug];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setPlaying(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!Scene) return null;
  return (
    <div ref={ref} className={`scene ${playing ? "is-playing" : ""} ${className}`} aria-hidden="true">
      <Scene />
    </div>
  );
}
