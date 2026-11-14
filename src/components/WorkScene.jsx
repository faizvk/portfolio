import { SceneFrame } from "./ProjectScene";
import "./workScene.css";

// Background loops for the Synup work cards. Drawn in the site's lime/black;
// the card keeps them faint so the text stays readable.

const L = "#C5F542";
const K = "#000";
const MONO = "Geist Mono, ui-monospace, monospace";

function Agents() {
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
      <g transform="translate(30,40)">
        <rect className="ws-bubble" width="190" height="44" rx="22" fill={L} stroke={K} strokeWidth="2.5" />
        <text className="ws-bubble" x="18" y="27" fontFamily={MONO} fontSize="12" fontWeight="700">reply to my review</text>
      </g>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <path d={`M125 90 C 140 ${150 + i * 10}, ${200 + i * 60} 160, ${220 + i * 60} 220`} fill="none" stroke={K} strokeWidth="2" strokeDasharray="5 6" className={`ws-wire ws-d${i}`} />
          <rect x={195 + i * 60} y="220" width="50" height="50" rx="12" fill="#fff" stroke={K} strokeWidth="2.5" className={`ws-node ws-d${i}`} />
          <circle cx={220 + i * 60} cy="245" r="8" fill={L} stroke={K} strokeWidth="2" className={`ws-node ws-d${i}`} />
        </g>
      ))}
      <g className="ws-result">
        <rect x="150" y="320" width="220" height="130" rx="18" fill="#fff" stroke={K} strokeWidth="3" />
        <rect x="170" y="342" width="90" height="10" rx="5" fill={K} />
        <rect x="170" y="365" width="180" height="8" rx="4" fill={K} opacity=".35" />
        <rect x="170" y="382" width="140" height="8" rx="4" fill={K} opacity=".35" />
        <rect x="170" y="408" width="80" height="26" rx="13" fill={L} stroke={K} strokeWidth="2" />
      </g>
    </svg>
  );
}

function Webhooks() {
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
      <rect x="40" y="200" width="90" height="110" rx="14" fill="#fff" stroke={K} strokeWidth="3" />
      {[225, 250, 275].map((y) => <rect key={y} x="58" y={y} width="54" height="8" rx="4" fill={K} opacity=".4" />)}
      {[0, 1, 2].map((i) => {
        const y = 110 + i * 150;
        return (
          <g key={i}>
            <path id={`ws-hook-${i}`} d={`M130 255 C 220 255, 220 ${y}, 300 ${y}`} fill="none" stroke={K} strokeWidth="2" opacity=".35" />
            <rect x="300" y={y - 28} width="70" height="56" rx="14" fill="#fff" stroke={K} strokeWidth="3" />
            <circle cx="335" cy={y} r="12" fill={L} stroke={K} strokeWidth="2" className={`ws-tick ws-d${i}`} />
            <circle r="9" fill={L} stroke={K} strokeWidth="2">
              <animateMotion dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite">
                <mpath href={`#ws-hook-${i}`} />
              </animateMotion>
            </circle>
          </g>
        );
      })}
      <text x="40" y="345" fontFamily={MONO} fontSize="12" fontWeight="700">sig ✓ HMAC</text>
    </svg>
  );
}

function ScanReport() {
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
      <g transform="translate(200,200)">
        <path d="M-120 0 A120 120 0 0 1 120 0" fill="none" stroke={K} strokeOpacity=".15" strokeWidth="22" strokeLinecap="round" />
        <path d="M-120 0 A120 120 0 0 1 120 0" fill="none" stroke={L} strokeWidth="22" strokeLinecap="round" pathLength="100" className="ws-gauge" />
        <path d="M-120 0 A120 120 0 0 1 120 0" fill="none" stroke={K} strokeWidth="3" />
        <g className="ws-needle"><rect x="-3" y="-105" width="6" height="105" rx="3" fill={K} /></g>
        <circle r="14" fill={K} />
      </g>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={70 + i * 70} y="300" width="40" height="150" rx="8" fill="#fff" stroke={K} strokeWidth="2.5" />
          <rect x={70 + i * 70} y="300" width="40" height="150" rx="8" fill={L} stroke={K} strokeWidth="2.5" className={`ws-bar ws-d${i}`} style={{ "--h": `${[0.55, 0.8, 0.4, 0.95][i]}` }} />
        </g>
      ))}
    </svg>
  );
}

function LeadGen() {
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
      <rect x="30" y="40" width="260" height="190" rx="16" fill="#fff" stroke={K} strokeWidth="3" />
      <rect x="30" y="40" width="260" height="30" rx="16" fill={K} />
      {[95, 120, 145].map((y, i) => <rect key={y} x="55" y={y} width={[180, 140, 160][i]} height="10" rx="5" fill={K} opacity=".3" />)}
      <g className="ws-widget">
        <rect x="170" y="160" width="140" height="80" rx="14" fill={L} stroke={K} strokeWidth="3" />
        <text x="186" y="196" fontFamily={MONO} fontSize="12" fontWeight="700">Free scan →</text>
        <rect x="186" y="208" width="80" height="16" rx="8" fill="#fff" stroke={K} strokeWidth="2" />
      </g>
      <path d="M240 245 C 260 300, 260 300, 240 330" fill="none" stroke={K} strokeWidth="2" strokeDasharray="5 6" className="ws-wire" />
      <rect x="60" y="330" width="320" height="140" rx="16" fill="#fff" stroke={K} strokeWidth="3" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={85 + i * 58} y="350" width="34" height="100" rx="6" fill={L} stroke={K} strokeWidth="2" className={`ws-bar ws-d${i % 3}`} style={{ "--h": `${0.3 + i * 0.16}` }} />
      ))}
    </svg>
  );
}

function Support() {
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
      <g transform="translate(300,90)" className="ws-bell">
        <path d="M-30 20 Q-30 -30 0 -30 Q30 -30 30 20 L40 32 H-40 Z" fill={L} stroke={K} strokeWidth="3" strokeLinejoin="round" />
        <circle cy="44" r="8" fill={K} />
      </g>
      <g transform="translate(110,230)">
        <g className="ws-bug">
          <ellipse rx="34" ry="44" fill="#fff" stroke={K} strokeWidth="3" />
          <path d="M-34 -10h-20M34 -10h20M-34 15h-20M34 15h20M-15 -44l-10 -15M15 -44l10 -15" stroke={K} strokeWidth="3" strokeLinecap="round" />
        </g>
        <g className="ws-fixed">
          <circle r="40" fill={L} stroke={K} strokeWidth="3" />
          <path d="M-16 0l10 11 22 -22" stroke={K} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
      <path d="M20 400 H120 L140 350 L165 450 L190 330 L215 420 L235 400 H380" fill="none" stroke={K} strokeWidth="4" strokeLinejoin="round" pathLength="100" className="ws-pulse" />
    </svg>
  );
}

function Infra() {
  const hex = "M0 -28 L24 -14 L24 14 L0 28 L-24 14 L-24 -14 Z";
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
      {[[90, 90], [160, 90], [125, 150], [195, 150]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x},${y})`}>
          <path d={hex} fill={i === 0 ? L : "#fff"} stroke={K} strokeWidth="3" className={i ? `ws-pod ws-p${i}` : ""} />
        </g>
      ))}
      <text x="240" y="125" fontFamily={MONO} fontSize="14" fontWeight="800" className="ws-scale">×4</text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          {i > 0 && <line x1={60 + (i - 1) * 90 + 26} y1="330" x2={60 + i * 90 - 26} y2="330" stroke={K} strokeWidth="3" />}
          <circle cx={60 + i * 90} cy="330" r="26" fill="#fff" stroke={K} strokeWidth="3" />
          <circle cx={60 + i * 90} cy="330" r="26" fill={L} stroke={K} strokeWidth="3" className={`ws-step ws-s${i}`} />
        </g>
      ))}
      <text x="40" y="400" fontFamily={MONO} fontSize="12" fontWeight="700">sitemap → index → check → track</text>
    </svg>
  );
}

const SCENES = [Agents, Webhooks, ScanReport, LeadGen, Support, Infra];

export default function WorkScene({ index }) {
  const Scene = SCENES[index];
  if (!Scene) return null;
  return (
    <SceneFrame className="work-scene">
      <Scene />
    </SceneFrame>
  );
}
