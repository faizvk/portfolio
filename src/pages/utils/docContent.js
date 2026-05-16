export const docContent = {
  nexkart: {
    title: "NexKart",
    tagline: "Full-Stack E-Commerce Platform",
    summary:
      "A production-grade MERN e-commerce platform with Razorpay payments, role-based admin dashboard, Redis-cached catalog, and a CI pipeline that runs lint, tests, and build on every PR.",
    role: "Sole Developer",
    status: "Live",
    timeline: "2025 – 2026",
    github: "https://github.com/faizvk/ecommerce-app",
    demo: "https://ecommerce-app-neon-eight.vercel.app/",
    stack: {
      Frontend: [
        "React 19",
        "Vite 7",
        "Redux Toolkit + Reselect",
        "React Router 7",
        "Tailwind CSS 3",
      ],
      Backend: [
        "Node 20",
        "Express 5",
        "Mongoose 9",
        "Zod env validation",
        "pino structured logging",
      ],
      Data: ["MongoDB", "Redis (optional cache)"],
      Payments: ["Razorpay (server-side amount + signed verification)"],
      Testing: ["Vitest", "Supertest", "Testing Library — 33 tests"],
      Infra: ["Docker Compose", "GitHub Actions CI", "Vercel + Render"],
    },
    highlights: [
      "Complete shopping flow: catalog → product detail → cart → checkout → tracking, with real-time offer pricing",
      "JWT auth with httpOnly refresh cookie + bcrypt + account lockout after failed attempts",
      "Razorpay integration with server-computed totals, atomic stock reservation, idempotent order placement, and signed verification",
      "Admin dashboard for products, time-bounded offers, orders, users + weekly revenue and trending product charts",
      "Hardened backend: Helmet, per-route rate limits, CORS allowlist, request IDs, centralized error envelope",
      "Hybrid Redis cache that soft-fails to Mongo when Redis is offline (versioned invalidation on writes)",
      "Wishlist + recently-viewed persisted to localStorage; smart search with autocomplete and URL-driven filters",
      "Branded toast system with 8 contextual variants and lazy-loaded admin route bundles",
    ],
    sections: [
      {
        title: "Problem & Approach",
        body: "Most MERN e-commerce tutorials stop at 'add to cart'. NexKart was an attempt to ship the parts that actually fail in production: race conditions on stock, double-charge on payment retries, expired offers leaking into queries, and rate-limit blind spots on auth. The architecture leans into Express 5 + Mongoose for familiarity but pulls in Zod, pino, and reselect to keep contracts, observability, and selectors honest as the surface grew.",
      },
      {
        title: "Payments — the careful path",
        body: "The Razorpay flow computes the final amount on the server (offers are re-applied server-side so a tampered client price is rejected), reserves stock atomically via a Mongoose transaction, and only marks the order paid after verifying the signed payload. A profile-completeness gate runs before checkout opens so we never lose a payment to a missing shipping address.",
      },
      {
        title: "Caching & performance",
        body: "Product reads dominate traffic, so the catalog sits behind a versioned Redis cache. Any write bumps the version key, which invalidates downstream reads without scanning. If Redis is unreachable the layer falls back to Mongo transparently — the cache is an optimization, not a dependency.",
      },
      {
        title: "Quality bar",
        body: "33 tests across Vitest (frontend) and Vitest + Supertest (backend) run on every PR through GitHub Actions, gated behind lint, test, and build. The structured pino logs ship JSON in production with per-request IDs, making it possible to correlate a checkout failure end-to-end.",
      },
    ],
  },

  "promptive-ai": {
    title: "Promptive AI",
    tagline: "Multi-Model AI SaaS",
    summary:
      "A production-ready AI SaaS that routes requests across Gemini, GPT-4o, Claude 3.5 Sonnet & Haiku, and Groq Llama 3.3 for chat, generates images via Hugging Face FLUX, rewrites content in tone, and synthesizes voice via ElevenLabs — gated by Razorpay subscriptions and per-plan quotas.",
    role: "Sole Developer",
    status: "Live",
    timeline: "2025 – 2026",
    github: "https://github.com/faizvk/promptive-ai",
    demo: "https://promptive-ai.vercel.app",
    stack: {
      Frontend: [
        "React 19",
        "Vite",
        "React Router 7",
        "React Hook Form + Zod",
        "Framer Motion",
        "Tailwind CSS v4",
      ],
      Backend: [
        "Node.js",
        "Express 5",
        "MongoDB / Mongoose",
        "Helmet + express-rate-limit",
        "Multer",
      ],
      AI: [
        "Google Gemini (@google/genai)",
        "OpenAI (GPT-4o / GPT-4o mini)",
        "Anthropic (Claude 3.5 Sonnet / Haiku)",
        "Groq (Llama 3.3 70B)",
        "Hugging Face FLUX.1",
        "ElevenLabs TTS",
      ],
      Auth: ["JWT (access + refresh)", "Google OAuth 2.0", "Cloudflare Turnstile"],
      Media: ["Cloudinary (image + audio CDN)"],
      Billing: ["Razorpay Subscriptions + webhooks"],
    },
    highlights: [
      "Multi-model chat dispatcher — picks the right provider based on configured API keys and the user's plan tier",
      "Text-to-image via Hugging Face FLUX.1 with resolution, aspect ratio, quality preset, and negative-prompt controls",
      "Tone-aware rewriter (professional / formal / casual / creative) backed by Gemini",
      "Voice synthesis across ElevenLabs (Rachel, Bella, Josh, Arnold, Domi) and OpenAI TTS — quota tracked in minutes",
      "httpOnly cookies for both access (15min) and refresh (7day), with silent refresh via axios interceptor",
      "Per-account lockout (5 failed attempts → 15min) layered on top of IP rate limiting",
      "tokenVersion bump invalidates all sessions on password change",
      "Audit log of every auth event (signup, login success/fail/locked, logout, refresh fail, OAuth)",
      "Three tiers (Free, Pro, Business) with monthly per-feature caps + cancel-at-period-end",
    ],
    sections: [
      {
        title: "Multi-provider routing",
        body: "Chat doesn't pick a model — the dispatcher does. At request time it intersects the set of providers with configured API keys, the set allowed by the user's plan, and the user's selection. That means deploys with only Gemini configured Just Work, and Pro/Business tiers unlock the premium models without code changes.",
      },
      {
        title: "Auth that survives mistakes",
        body: "The session model uses short-lived access tokens in httpOnly cookies (15min) refreshed silently by an axios interceptor against a 7-day refresh cookie. Password changes bump a tokenVersion field on the user, which the JWT layer checks on every request — so a leaked refresh token is invalidated the instant the user updates their password. Every auth event is written to an audit log.",
      },
      {
        title: "Subscriptions",
        body: "Razorpay's webhook is the source of truth for subscription state. The webhook handler verifies the signature, looks up the local subscription by Razorpay ID, and applies the new status idempotently — so a duplicate webhook delivery doesn't double-charge or double-activate. Cancellation flows through 'cancel at period end' so the user keeps access until the billing cycle closes.",
      },
      {
        title: "Media pipeline",
        body: "Generated images and synthesized audio go to Cloudinary instead of being streamed back inline. The frontend gets a CDN URL the moment generation completes, downloads on click are signed, and history pages render from the same persisted records — no re-generation cost on revisit.",
      },
    ],
  },

  jobpilot: {
    title: "JobPilot",
    tagline: "AI Job Application Assistant",
    summary:
      "A Next.js 14 + Prisma platform built to compress 6–8 hours of daily job-hunting into under two. Aggregates listings from LinkedIn, Indeed, Glassdoor, ZipRecruiter, Naukri, Remotive, and Jobicy; scores them against the user's skills; tailors resumes per JD; and tracks applications across a Kanban pipeline.",
    role: "Sole Developer",
    status: "In Development",
    timeline: "2026",
    github: "https://github.com/faizvk/job-pilot",
    demo: "https://www.pursuits.in",
    stack: {
      Framework: ["Next.js 14 (App Router)", "TypeScript"],
      Data: ["SQLite via Prisma v7", "LibSQL adapter"],
      AI: [
        "Anthropic Claude",
        "Google Generative AI",
        "Mistral",
        "Cohere",
        "Groq",
      ],
      Frontend: [
        "Tailwind CSS",
        "React Hook Form",
        "Zod",
        "Recharts",
        "Lucide React",
      ],
      Integrations: ["JSearch (RapidAPI)", "Adzuna", "Vercel Blob"],
      Auth: ["NextAuth"],
    },
    highlights: [
      "Auto-fetches 40–50+ jobs across LinkedIn, Indeed, Glassdoor, ZipRecruiter, Naukri, Remotive, Jobicy",
      "Batch Apply — import in bulk, open all URLs in tabs, mark applied with one click",
      "Smart filtering that auto-excludes senior roles and high-experience requirements for junior developers",
      "Match scoring against the user's skill profile to surface best-fit roles first",
      "Resume tailoring with keyword optimization per JD; cover letter generator with variable substitution",
      "Kanban + table application tracker (Saved → Applied → Interview → Offer)",
      "JD analyzer extracts skills, identifies gaps, computes match score",
      "Analytics dashboard with funnel visualization, response rates, and 30-day trends",
      "Follow-up manager + daily streak / application-count tracker",
      "Chrome extension companion for one-click apply on supported job boards",
    ],
    sections: [
      {
        title: "Why this exists",
        body: "Applying to jobs across LinkedIn, Indeed, Glassdoor, Naukri, and ZipRecruiter eats 6–8 hours daily — opening tabs, re-uploading resumes, copy-pasting cover letters, manually tracking who replied. JobPilot centralizes the workflow: one feed, one tracker, one tailoring pipeline. The goal is 50+ thoughtful applications in under two hours, not spray-and-pray.",
      },
      {
        title: "Aggregation layer",
        body: "Job sources fall into two tiers. Free sources (Remotive, Jobicy) need no keys and ship a baseline feed. Premium sources (LinkedIn / Indeed / Glassdoor via JSearch on RapidAPI, plus Adzuna for India) unlock when keys are present. The aggregator dedupes by URL + title hash, normalizes salary ranges, and tags each listing with its source so analytics can attribute response rates downstream.",
      },
      {
        title: "Match scoring",
        body: "Each job is scored against the user's profile (skills, experience range, role keywords). The scorer weights skill overlap heavily, penalizes 'senior' / '5+ years' requirements for junior users, and bubbles the highest-fit roles to the top. Scores are persisted so the feed page is fast and re-rankable without re-calling LLMs.",
      },
      {
        title: "Application tracker",
        body: "Applications flow through a Kanban pipeline (Saved → Applied → Interview → Offer) with status timestamps, follow-up reminders, and per-stage funnel analytics. The table view is the power-user surface — sortable, filterable, batch-mutable — and shares state with Kanban via the same Prisma model.",
      },
    ],
  },

  smartchain: {
    title: "SmartChain Tender System",
    tagline: "Blockchain E-Tendering Platform",
    summary:
      "A blockchain-based e-tendering platform enabling secure, transparent, tamper-proof bid submission and evaluation. Built as team lead — responsible for system design, task distribution, and integration across smart contracts, MERN backend, and document compliance.",
    role: "Team Lead",
    status: "Final Year Project",
    timeline: "2024 – 2025",
    github: "https://github.com/faizvk/blockchain-based-contract-system",
    demo: "",
    stack: {
      Blockchain: [
        "Solidity smart contracts",
        "Hardhat (compile / test / deploy)",
        "ethers.js (client integration)",
      ],
      Backend: [
        "Node.js",
        "Express",
        "MongoDB / Mongoose",
        "REST APIs",
        "MongoDB GridFS",
      ],
      Storage: ["IPFS (decentralized document store)", "GridFS"],
      AI: ["Google Gemini API (document verification)"],
      Frontend: ["React.js"],
    },
    highlights: [
      "Ethereum smart contracts in Solidity for tamper-proof bid recording, tested and deployed via Hardhat",
      "On-chain bid verification through ethers.js — the contract is the source of truth",
      "Decentralized document storage on IPFS, with GridFS fallback for large PDFs",
      "PDF parsing + integrity validation pipeline before submission to chain",
      "Gemini API for automated tender compliance analysis (checks JD requirements against submitted docs)",
      "MERN backend handles auth, bid workflows, and contract orchestration",
      "Led 4-person team — system design, task distribution, integration sign-off",
    ],
    sections: [
      {
        title: "Why blockchain",
        body: "Public-sector tendering is a classic case where 'who submitted what, when' matters as much as the bid itself. Storing bids on Ethereum makes the audit trail tamper-evident — any modification to a submitted bid would break the on-chain hash. The smart contract enforces the bid window, prevents post-deadline edits, and emits events that the backend indexes for the dashboard.",
      },
      {
        title: "Document layer",
        body: "Tender documents are too large to live on-chain economically, so they go to IPFS — the chain stores only the content hash. The pipeline parses PDFs server-side, computes the hash, pins to IPFS, and submits the CID to the contract. A GridFS fallback exists for environments where IPFS pinning is unavailable.",
      },
      {
        title: "AI compliance check",
        body: "Before a bid hits the chain, the document compliance step runs the JD requirements and the submitted document through Gemini, which returns a structured compliance report (which clauses are addressed, which are missing). This catches incomplete submissions at the gateway rather than after the bid window closes.",
      },
      {
        title: "Leading the team",
        body: "As team lead I owned the system design (drawing the boundary between Solidity, the backend, and IPFS), broke the build into vertical slices each teammate could own end-to-end, and ran integration on the critical paths — bid submission, on-chain verification, document compliance. The project won recognition at the college's project expo and forms the basis of the published academic write-up.",
      },
    ],
  },
};
