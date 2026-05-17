export const mainProjects = [
  {
    slug: "nexkart",
    title: "NexKart",
    subtitle: "Full-Stack E-Commerce Platform",
    description:
      "MERN e-commerce build that takes the parts most tutorials skip seriously: server-computed Razorpay totals, atomic stock reservation, versioned Redis cache, and a CI-gated test suite.",
    tech: ["React", "Express", "MongoDB", "Razorpay", "Redis"],
    github: "https://github.com/faizvk/ecommerce-app",
    demo: "https://ecommerce-app-neon-eight.vercel.app/",
    tags: ["E-Commerce"],
    image: "/nexkart.svg",
  },
  {
    slug: "promptive-ai",
    title: "Promptive AI",
    subtitle: "Multi-Model AI SaaS",
    description:
      "An AI SaaS for chat, image generation, tone-rewriting, and TTS — with a provider dispatcher that routes each request to whichever LLM is configured and allowed by the user's plan.",
    tech: ["React", "Node.js", "MongoDB", "Gemini", "Hugging Face"],
    github: "https://github.com/faizvk/promptive-ai",
    demo: "https://promptive-ai.vercel.app",
    tags: ["AI SaaS"],
    image: "/promptiveAI.svg",
  },
  {
    slug: "jobpilot",
    title: "JobPilot",
    subtitle: "AI Job Application Assistant",
    description:
      "Next.js + Prisma platform that aggregates listings from 7 job portals, scores match-fit against the user's profile, tailors resumes per JD, and tracks applications across a kanban pipeline.",
    tech: ["Next.js", "TypeScript", "Prisma", "Anthropic", "Gemini"],
    github: "https://github.com/faizvk/job-pilot",
    demo: "https://www.pursuits.in",
    tags: ["AI"],
    image: "/jobpilot.svg",
  },
  {
    slug: "smartchain",
    title: "SmartChain Tender",
    subtitle: "Blockchain E-Tendering System",
    description:
      "Ethereum-backed tender platform with on-chain bid verification (Solidity + Hardhat), IPFS document storage, and an AI compliance-check pipeline. Led a 4-person team.",
    tech: ["Solidity", "Hardhat", "MERN", "IPFS", "Gemini"],
    github: "https://github.com/faizvk/blockchain-based-contract-system",
    demo: null,
    tags: ["Blockchain"],
    image: "/smartchain.svg",
  },
];
