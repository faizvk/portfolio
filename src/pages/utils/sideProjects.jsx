import {
  LayoutDashboard,
  TicketCheck,
  Target,
  Wallet,
  Coins,
  MapPin,
  Newspaper,
  Building2,
} from "lucide-react";

export const sideProjects = [
  {
    title: "Task Dashboard",
    description:
      "React task manager with filters, status tracking, and persistent state.",
    tech: ["React", "Vite", "CSS"],
    icon: <LayoutDashboard size={18} />,
    github: "https://github.com/faizvk/task-dashboard",
    demo: "https://task-dashboard-nine-mu.vercel.app",
  },
  {
    title: "Zoho Desk Widget",
    description:
      "TypeScript widget embedded inside the Zoho Desk ticket view to surface contextual data.",
    tech: ["TypeScript", "Zoho API"],
    icon: <TicketCheck size={18} />,
    github: "https://github.com/faizvk/zoho-desk-ticket-widget",
    demo: "",
  },
  {
    title: "Bowling Calculator",
    description:
      "Ten-pin bowling score calculator handling strikes, spares, and the 10th-frame bonus rules.",
    tech: ["React", "JavaScript"],
    icon: <Target size={18} />,
    github: "https://github.com/faizvk/Bowling-score-calculator",
    demo: "https://bowling-score-calculator.vercel.app",
  },
  {
    title: "Connect Wallet",
    description:
      "Web3 wallet-connect demo integrating MetaMask via ethers.js.",
    tech: ["Web3", "ethers.js"],
    icon: <Wallet size={18} />,
    github: "https://github.com/faizvk/connect-wallet",
    demo: "",
  },
  {
    title: "Crypto Lister",
    description:
      "Market dashboard showing top trending cryptocurrencies pulled from a public API.",
    tech: ["JavaScript", "API"],
    icon: <Coins size={18} />,
    github: "https://github.com/faizvk/crypto-lister",
    demo: "https://faizvk.github.io/crypto-lister/",
  },
  {
    title: "Pincode Finder",
    description:
      "Indian post-office lookup — enter a pincode, see all matching branches with metadata.",
    tech: ["React", "REST"],
    icon: <MapPin size={18} />,
    github: "https://github.com/faizvk/post-office-finder",
    demo: "https://module6-week2.vercel.app",
  },
  {
    title: "CA Monk Blog",
    description:
      "TypeScript + React blog landing page with responsive typography and an editorial grid.",
    tech: ["TypeScript", "React"],
    icon: <Newspaper size={18} />,
    github: "https://github.com/faizvk/ca-monk-blog-page",
    demo: "",
  },
  {
    title: "Star Gold LLC",
    description:
      "Freelance marketing site for Star Gold LLC — single-page React build with custom branding.",
    tech: ["React", "CSS"],
    icon: <Building2 size={18} />,
    github: "https://github.com/faizvk/star-gold-llc",
    demo: "https://star-gold-llc.vercel.app",
  },
];
