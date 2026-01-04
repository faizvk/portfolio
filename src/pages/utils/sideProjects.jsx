import {
  Sparkles,
  Terminal,
  Globe,
  SquarePlus,
  ArrowUpDown,
  TextQuote,
  User,
  SortAsc,
} from "lucide-react";

export const sideProjects = [
  {
    title: "Music Recommendation",
    description:
      "Winner of ISTE State-Level Hackathon 2024. Personalized discovery engine.",
    tech: ["React", "API"],
    icon: <Sparkles size={18} />,
    color: "bg-slate-100 border-slate-200",
    demo: "",
  },

  {
    title: "Portfolio",
    description: "Experimental minimalist portfolio focused on performance.",
    tech: ["Vite", "Motion"],
    icon: <Globe size={18} />,
    color: "bg-gray-100 border-gray-200",
    github: "https://github.com/faizvk/portfolio",
    demo: "",
  },

  {
    title: "Counter Redux",
    description: "Increment and decrement counter built with React and Redux.",
    tech: ["React", "Redux", "JavaScript"],
    icon: <SquarePlus size={18} />, // substitute a suitable icon
    color: "bg-indigo-100 border-indigo-200",
    github: "https://github.com/acciojob/counter-redux-faizvk",
    demo: "",
  },
  {
    title: "Pincode LookUp",
    description: "A place where you can lookup post offices under a pincode",
    tech: ["React", "CSS"],
    icon: <User size={18} />, // substitute a suitable icon
    color: "bg-yellow-100 border-yellow-200",
    github: "https://github.com/faizvk/post-office-finder",
    demo: "https://module6-week2-j7r7o8bbd-faizvks-projects.vercel.app",
  },
  {
    title: "Crypto Checker",
    description:
      "A place where you can lookup top 10 trending crypto currencies",
    tech: ["HTML", "Javascript", "CSS"],
    icon: <User size={18} />, // substitute a suitable icon
    color: "bg-emerald-100 border-emerald-200",
    github: "https://github.com/faizvk/crypto-lister",
    demo: "https://faizvk.github.io/crypto-lister/",
  },
  {
    title: "star gold LLC",
    description: "A freelance project for company star gold LLC",
    tech: ["HTML", "React", "CSS"],
    icon: <User size={18} />, // substitute a suitable icon
    color: "bg-emerald-100 border-emerald-200",
    github: "https://github.com/faizvk/star-gold-llc",
    demo: "https://star-gold-llc-6na3-4pcqr7ynk-faizvks-projects.vercel.app",
  },

  {
    title: "Sort Books",
    description:
      "Books list sorting app using Redux to manage state and implement sorting by title/author.",
    tech: ["React", "Redux", "CSS"],
    icon: <SortAsc size={18} />, // substitute a suitable icon
    color: "bg-emerald-100 border-emerald-200",
    github: "https://github.com/acciojob/sort-books-faizvk",
    demo: "",
  },
  {
    title: "Lorem Redux",
    description: "Redux project that fetches and displays Lorem Ipsum content.",
    tech: ["React", "Redux", "CSS"],
    icon: <TextQuote size={18} />, // substitute a suitable icon
    color: "bg-yellow-100 border-yellow-200",
    github: "https://github.com/acciojob/lorem-redux-faizvk",
    demo: "",
  },
  {
    title: "User Info Redux",
    description: "React and Redux app managing user name and email state.",
    tech: ["React", "Redux", "CSS"],
    icon: <User size={18} />, // substitute a suitable icon
    color: "bg-teal-100 border-teal-200",
    github: "https://github.com/acciojob/user-info-redux-faizvk",
    demo: "",
  },
  {
    title: "Museo Sans",
    description: "Modern home page design",
    tech: ["HTML", "CSS"],
    icon: <User size={18} />, // substitute a suitable icon
    color: "bg-emerald-100 border-emerald-200",
    github: "https://github.com/faizvk/museo-sans",
    demo: "https://faizvk.github.io/museo-sans/",
  },
  {
    title: "React Hooks",
    description: "Simple project to show use of hooks",
    tech: ["HTML", "CSS"],
    icon: <User size={18} />, // substitute a suitable icon
    color: "bg-yellow-100 border-yellow-200",
    github: "https://github.com/faizvk/react-hooks",
    demo: "https://module6-moduletest-j5lidt72p-faizvks-projects.vercel.app",
  },
];
