import {
  LayoutDashboard,
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
