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
  },
  {
    title: "CLI Workflow",
    description:
      "Automation script for developer workflow optimization in Linux.",
    tech: ["Node.js", "Bash"],
    icon: <Terminal size={18} />,
    color: "bg-zinc-100 border-zinc-200",
  },
  {
    title: "Portfolio V1",
    description: "Experimental minimalist portfolio focused on performance.",
    tech: ["Vite", "Motion"],
    icon: <Globe size={18} />,
    color: "bg-gray-100 border-gray-200",
  },

  {
    title: "Counter Redux",
    description: "Increment and decrement counter built with React and Redux.",
    tech: ["React", "Redux", "JavaScript"],
    icon: <SquarePlus size={18} />, // substitute a suitable icon
    color: "bg-indigo-100 border-indigo-200",
    github: "https://github.com/acciojob/counter-redux-faizvk",
  },
  {
    title: "Sort Books",
    description:
      "Books list sorting app using Redux to manage state and implement sorting by title/author.",
    tech: ["React", "Redux", "CSS"],
    icon: <SortAsc size={18} />, // substitute a suitable icon
    color: "bg-emerald-100 border-emerald-200",
    github: "https://github.com/acciojob/sort-books-faizvk",
  },
  {
    title: "Lorem Redux",
    description: "Redux project that fetches and displays Lorem Ipsum content.",
    tech: ["React", "Redux", "CSS"],
    icon: <TextQuote size={18} />, // substitute a suitable icon
    color: "bg-yellow-100 border-yellow-200",
    github: "https://github.com/acciojob/lorem-redux-faizvk",
  },
  {
    title: "User Info Redux",
    description: "React and Redux app managing user name and email state.",
    tech: ["React", "Redux", "CSS"],
    icon: <User size={18} />, // substitute a suitable icon
    color: "bg-teal-100 border-teal-200",
    github: "https://github.com/acciojob/user-info-redux-faizvk",
  },
];
