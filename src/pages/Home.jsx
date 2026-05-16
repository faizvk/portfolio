import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GitHubCalendar } from "react-github-calendar";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  BookOpen,
  Trophy,
  Instagram,
  Briefcase,
  GraduationCap,
  ArrowUpRight,
  Code2,
  Menu,
  X,
} from "lucide-react";
import { fadeIn } from "../animations/fadeIn";
import { mainProjects } from "./utils/mainProjects";
import { sideProjects } from "./utils/sideProjects";
import { skills } from "./utils/skills";

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = [CURRENT_YEAR, CURRENT_YEAR - 1, CURRENT_YEAR - 2, CURRENT_YEAR - 3];

const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const [ghYear, setGhYear] = useState(CURRENT_YEAR);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll("[data-fade='true']");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinks = [
    { href: "#work", label: "Work" },
    { href: "#projects", label: "Projects" },
    { href: "#activity", label: "Activity" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="bg-[#FAFAF7] text-black min-h-screen selection:bg-[#C5F542] overflow-x-hidden font-sans">
      <nav
        className={`fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled ? "w-[92%] md:w-[600px]" : "w-[92%] md:w-[720px]"
        }`}
        aria-label="Primary"
      >
        <div className="bg-white border-2 border-black shadow-[4px_4px_0_0_#000] rounded-full px-5 md:px-8 py-3 md:py-4 flex justify-between items-center">
          <a
            href="#top"
            aria-label="Home — Faiz Zubair"
            className="font-black tracking-tighter text-xl md:text-2xl text-black bg-[#C5F542] px-3 py-0.5 rounded-md border-2 border-black"
          >
            FZ.
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex gap-7 text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="nav-link">
                {l.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 bg-[#C5F542] border-2 border-black rounded-full"
          >
            <Menu size={18} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] bg-[#FAFAF7] md:hidden flex flex-col"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex justify-between items-center px-6 py-5 border-b-2 border-black">
            <span className="font-black tracking-tighter text-2xl text-black bg-[#C5F542] px-3 py-0.5 rounded-md border-2 border-black">
              FZ.
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="inline-flex items-center justify-center w-10 h-10 bg-white border-2 border-black rounded-full shadow-[3px_3px_0_0_#000]"
            >
              <X size={18} />
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center px-8 gap-6" aria-label="Mobile">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-4xl font-black tracking-tight text-black hover:text-[#9BC91F] transition-colors"
              >
                {l.label}
                <span className="text-[#9BC91F]">.</span>
              </a>
            ))}
          </nav>
          <div className="px-6 py-6 border-t-2 border-black flex gap-3">
            <a
              href="https://github.com/faizvk"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white border-2 border-black rounded-full shadow-[3px_3px_0_0_#000]"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/faiz-zubair-vadakkayil"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white border-2 border-black rounded-full shadow-[3px_3px_0_0_#000]"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:faizvk14@gmail.com"
              aria-label="Email"
              className="p-3 bg-white border-2 border-black rounded-full shadow-[3px_3px_0_0_#000]"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 relative pt-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10 max-w-7xl mx-auto w-full">
          <div className="anim-fade-up order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-6 md:mb-8 flex-wrap">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#C5F542] text-black rounded-full border-2 border-black font-mono text-[9px] md:text-[10px] font-bold tracking-widest uppercase">
                <span className="w-2 h-2 bg-black rounded-full animate-pulse" />
                Available
              </span>
              <span className="px-3 py-1 bg-white text-black rounded-full border-2 border-black font-mono text-[9px] md:text-[10px] font-bold tracking-widest uppercase">
                @ Synup
              </span>
            </div>
            <h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-6 md:mb-8 text-black"
              {...fadeIn({ direction: "right", distance: 80, duration: 0.9 })}
            >
              FAIZ <br />
              ZUBAIR
              <span className="text-[#9BC91F]">.</span>
            </h1>
            <p
              className="max-w-xl text-black/70 text-lg md:text-xl leading-relaxed mb-10 md:mb-12 font-medium"
              {...fadeIn({ direction: "up", distance: 80, duration: 0.9 })}
            >
              <strong className="text-black font-black">Software Engineer</strong>{" "}
              building across the stack — full-stack JavaScript, CI/CD
              pipelines, and cloud infrastructure. Currently shipping production
              systems at{" "}
              <strong className="text-black font-black">Synup</strong> with a
              bias for clean architecture, observability, and operational
              maturity.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <a
                href="#contact"
                className="group shine relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#C5F542] text-black rounded-full font-black text-xs uppercase tracking-widest border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                <span>Get in touch</span>
                <ArrowUpRight size={16} className="arrow" />
              </a>
              <div className="flex gap-3 border-l-0 sm:border-l-2 border-black/10 pl-0 sm:pl-6">
                <a
                  href="https://github.com/faizvk"
                  aria-label="GitHub profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white border-2 border-black rounded-full hover:bg-[#C5F542] transition-all shadow-[3px_3px_0_0_#000] hover:shadow-[1px_1px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px]"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://linkedin.com/in/faiz-zubair-vadakkayil"
                  aria-label="LinkedIn profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white border-2 border-black rounded-full hover:bg-[#C5F542] transition-all shadow-[3px_3px_0_0_#000] hover:shadow-[1px_1px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px]"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="mailto:faizvk14@gmail.com"
                  aria-label="Send email"
                  className="p-3 bg-white border-2 border-black rounded-full hover:bg-[#C5F542] transition-all shadow-[3px_3px_0_0_#000] hover:shadow-[1px_1px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px]"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="anim-fade-in relative flex justify-center lg:justify-end order-1 lg:order-2">
            <div
              className="relative w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[460px] aspect-4/5 rounded-[2rem] border-2 border-black bg-[#C5F542] overflow-hidden shadow-[8px_8px_0_0_#000]"
              {...fadeIn({ direction: "left", distance: 80, duration: 0.9 })}
            >
              <img
                src="/profile.jpg"
                alt="Portrait of Faiz Zubair"
                className="w-full h-full object-cover object-top grayscale contrast-110"
              />
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section
        id="work"
        className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-[#F0F0EA] border-y-2 border-black"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 md:mb-16 flex items-end justify-between border-b-2 border-black pb-8">
            <div>
              <span className="inline-block bg-[#C5F542] text-black px-4 py-1.5 rounded-full border-2 border-black text-[10px] font-black uppercase tracking-widest shadow-[3px_3px_0_0_#000] mb-5">
                Experience
              </span>
              <h2
                className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-black"
                {...fadeIn({
                  direction: "right",
                  distance: 80,
                  duration: 0.9,
                })}
              >
                Where I work
                <span className="text-[#9BC91F]">.</span>
              </h2>
            </div>
          </div>

          <div
            className="bg-white border-2 border-black rounded-[1.5rem] md:rounded-[2rem] p-8 md:p-12 shadow-[6px_6px_0_0_#000]"
            {...fadeIn({ direction: "up", distance: 80, duration: 0.9 })}
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-12">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[#C5F542] border-2 border-black rounded-full">
                    <Briefcase size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/65">
                    Feb 2026 — Present
                  </span>
                </div>
                <h3 className="text-2xl md:text-4xl font-black tracking-tight text-black mb-2">
                  Junior Software Engineer
                </h3>
                <p className="text-lg md:text-xl font-bold text-black/70 mb-6">
                  Synup
                </p>
                <p className="text-sm md:text-base text-black/70 font-medium leading-relaxed max-w-2xl">
                  Building production features across the Synup platform —
                  contributing to web applications, internal tooling, and
                  customer-facing experiences. Project breakdown coming soon.
                </p>
              </div>
              <div className="flex md:flex-col gap-2 md:gap-3">
                <span className="text-[10px] font-black uppercase tracking-widest bg-black text-[#C5F542] px-3 py-1.5 rounded-full">
                  Full-time
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest bg-white border-2 border-black px-3 py-1.5 rounded-full">
                  India
                </span>
              </div>
            </div>
          </div>

          <div
            className="mt-8 bg-white border-2 border-black rounded-[1.5rem] md:rounded-[2rem] p-8 md:p-10 shadow-[4px_4px_0_0_#000]"
            {...fadeIn({ direction: "up", distance: 80, duration: 0.9 })}
          >
            <div className="flex items-start gap-5">
              <div className="inline-flex items-center justify-center w-10 h-10 shrink-0 bg-white border-2 border-black rounded-full">
                <GraduationCap size={18} />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/65">
                  2025 — Graduated
                </span>
                <h3 className="text-xl md:text-2xl font-black tracking-tight text-black mt-1">
                  B.Tech, Computer Science & Engineering
                </h3>
                <p className="text-sm md:text-base font-bold text-black/60">
                  Government College of Engineering, Kannur
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GITHUB ACTIVITY */}
      <section
        id="activity"
        className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-[#FAFAF7]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 md:mb-14 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b-2 border-black pb-8">
            <div>
              <span className="inline-block bg-[#C5F542] text-black px-4 py-1.5 rounded-full border-2 border-black text-[10px] font-black uppercase tracking-widest shadow-[3px_3px_0_0_#000] mb-5">
                GitHub Activity
              </span>
              <h2
                className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-black"
                {...fadeIn({
                  direction: "right",
                  distance: 80,
                  duration: 0.9,
                })}
              >
                Code Pulse
                <span className="text-[#9BC91F]">.</span>
              </h2>
              <p className="text-black/65 font-mono text-xs tracking-widest mt-4 uppercase font-bold">
                Contributions — @faizvk
              </p>
            </div>
            <a
              href="https://github.com/faizvk"
              target="_blank"
              rel="noopener noreferrer"
              className="group shine inline-flex items-center gap-2 bg-black text-[#C5F542] px-5 py-3 rounded-full font-black text-[10px] uppercase tracking-widest border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <Github size={14} className="arrow" /> View Profile
            </a>
          </div>

          <div
            className="bg-white border-2 border-black rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 shadow-[6px_6px_0_0_#000]"
            {...fadeIn({ direction: "up", distance: 60, duration: 0.9 })}
          >
            <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b-2 border-black/10">
              {YEARS.map((y) => {
                const active = y === ghYear;
                return (
                  <button
                    key={y}
                    type="button"
                    onClick={() => setGhYear(y)}
                    aria-pressed={active}
                    aria-label={`Show contributions for ${y}`}
                    className={`font-mono text-[11px] md:text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border-2 border-black transition-all ${
                      active
                        ? "bg-[#C5F542] text-black shadow-[3px_3px_0_0_#000]"
                        : "bg-white text-black/70 hover:text-black hover:bg-[#EEFBC9]"
                    }`}
                  >
                    {y}
                  </button>
                );
              })}
            </div>
            <div className="github-calendar-wrap overflow-x-auto">
              <GitHubCalendar
                key={ghYear}
                username="faizvk"
                year={ghYear}
                throwOnError={false}
                errorMessage="No contributions found for this year."
                colorScheme="light"
                theme={{
                  light: [
                    "#E4E4DE",
                    "#CDE889",
                    "#A8DB2C",
                    "#7DA816",
                    "#52720A",
                  ],
                }}
                blockSize={13}
                blockMargin={4}
                fontSize={13}
                labels={{
                  totalCount: `{{count}} contributions in ${ghYear}`,
                }}
                style={{ color: "#000" }}
                renderBlock={(block, activity) =>
                  React.cloneElement(block, {
                    "data-tooltip-id": "gh-tooltip",
                    "data-tooltip-html": `<strong>${activity.count}</strong> contribution${
                      activity.count === 1 ? "" : "s"
                    } on <span style="opacity:.7">${activity.date}</span>`,
                  })
                }
              />
              <Tooltip
                id="gh-tooltip"
                className="!bg-black !text-[#C5F542] !rounded-md !border-2 !border-black !font-mono !text-[11px] !px-3 !py-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-20 md:py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-20 flex flex-col md:flex-row items-start md:items-end justify-between border-b-2 border-black pb-10 gap-4">
            <div>
              <span className="inline-block bg-[#C5F542] text-black px-4 py-1.5 rounded-full border-2 border-black text-[10px] font-black uppercase tracking-widest shadow-[3px_3px_0_0_#000] mb-5">
                Selected Work
              </span>
              <h2
                className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-black"
                {...fadeIn({
                  direction: "right",
                  distance: 80,
                  duration: 0.9,
                })}
              >
                Projects
                <span className="text-[#9BC91F]">.</span>
              </h2>
              <p className="text-black/65 font-mono text-xs tracking-widest mt-4 uppercase font-bold">
                Production builds + documentation
              </p>
            </div>
            <span className="bg-white text-black px-4 py-2 rounded-full border-2 border-black text-[10px] font-black uppercase tracking-widest shadow-[3px_3px_0_0_#000]">
              {mainProjects.length} Projects
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {mainProjects.map((project, i) => (
              <Link
                key={i}
                to={`/projects/${project.slug}`}
                aria-label={`Read case study: ${project.title}`}
                className="card-press group bg-white border-2 border-black rounded-[1.5rem] md:rounded-[2rem] overflow-hidden flex flex-col"
                {...fadeIn({
                  direction: "up",
                  distance: 80,
                  duration: 0.9,
                })}
              >
                <div className="aspect-[16/10] relative overflow-hidden border-b-2 border-black bg-[#EEFBC9]">
                  <div
                    className="img-zoom absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <span className="reveal-badge absolute bottom-4 left-4 bg-black text-[#C5F542] px-3 py-1.5 rounded-full border-2 border-black text-[10px] font-black uppercase tracking-widest">
                    View Case Study
                  </span>
                  <div className="reveal-badge absolute top-4 right-4 bg-[#C5F542] text-black p-2 rounded-full border-2 border-black">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-black bg-[#C5F542] border-2 border-black px-2.5 py-1 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black mb-1 text-black">
                    {project.title}
                  </h3>
                  <p className="text-sm font-bold text-black/65 mb-4 uppercase tracking-wider">
                    {project.subtitle}
                  </p>
                  <p className="text-black/70 text-sm md:text-base font-medium leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t-2 border-black/10">
                    <div className="flex flex-wrap gap-3">
                      {project.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="text-[9px] md:text-[10px] font-mono text-black/65 font-bold uppercase"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <a
                        href={project.github}
                        aria-label={`${project.title} on GitHub`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-black/65 hover:text-black transition-all hover:scale-110"
                      >
                        <Github size={16} />
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          aria-label={`${project.title} live demo`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-black/65 hover:text-black transition-all hover:scale-110"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                      <span className="text-[10px] font-black uppercase tracking-widest bg-black text-[#C5F542] px-3 py-1.5 rounded-full">
                        Docs →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-24 md:mt-32 mb-12 md:mb-16 flex items-center gap-6 md:gap-10">
            <h2
              className="text-2xl md:text-3xl font-black tracking-tighter uppercase text-black whitespace-nowrap italic bg-[#C5F542] border-2 border-black px-4 py-2 rounded-full shadow-[3px_3px_0_0_#000]"
              {...fadeIn({
                direction: "right",
                distance: 80,
                duration: 0.9,
              })}
            >
              Laboratory
            </h2>
            <div className="h-0.5 w-full bg-black" />
            <span className="text-[10px] font-black uppercase tracking-widest text-black/65 whitespace-nowrap">
              Side Projects
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {sideProjects.map((project, i) => (
              <div
                key={i}
                className="bg-white border-2 border-black rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 transition-all duration-300 group shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#EEFBC9]"
                {...fadeIn({
                  direction: "up",
                  distance: 80,
                  duration: 0.9,
                })}
              >
                <div className="icon-spin inline-flex items-center justify-center w-10 h-10 mb-6 md:mb-8 bg-[#C5F542] border-2 border-black rounded-full text-black">
                  {project.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 text-black">
                  {project.title}
                </h3>
                <p className="text-black/60 text-xs md:text-sm leading-relaxed mb-8 md:mb-10 font-medium h-auto md:h-20">
                  {project.description}
                </p>
                <div className="flex justify-between items-center pt-6 md:pt-8 border-t-2 border-black/10">
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[8px] md:text-[10px] font-mono text-black/65 uppercase font-black"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 md:gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        aria-label={`${project.title} on GitHub`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black/60 hover:text-black transition-all hover:scale-110"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        aria-label={`${project.title} live demo`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black/60 hover:text-black transition-all hover:scale-110"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-[#F0F0EA] border-y-2 border-black"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7">
            <span className="inline-block bg-[#C5F542] text-black px-4 py-1.5 rounded-full border-2 border-black text-[10px] font-black uppercase tracking-widest shadow-[3px_3px_0_0_#000] mb-8">
              About Me
            </span>
            <div className="space-y-6 text-black/75 text-lg md:text-xl font-medium leading-relaxed">
              <p>
                I'm a{" "}
                <strong className="text-black font-black bg-[#C5F542] px-2 py-0.5 rounded border-2 border-black">
                  Software Engineer
                </strong>{" "}
                working across the full stack — frontend, backend, CI/CD, and
                cloud infrastructure. I joined Synup as a Junior Software
                Engineer in February 2026 after graduating from GCE Kannur.
              </p>
              <p>
                My focus is shipping software that holds up under real traffic.
                That means RESTful APIs with proper auth, rate limiting, and
                structured logs; React frontends with sane state management;
                Dockerized services orchestrated with Kubernetes; deployment
                pipelines on Jenkins and GitHub Actions; and AWS infrastructure
                fronted by load balancers — all gated behind lint, tests, and a
                clean build.
              </p>
              <p>
                Outside of work, I build AI SaaS tools, experiment with
                blockchain dApps, and grind LeetCode (100+ DSA problems solved).
                I led the team that built a Solidity-backed e-tendering system
                for my final-year project.
              </p>
            </div>

            <div className="mt-12 md:mt-16">
              <h3 className="inline-flex items-center gap-2 text-sm md:text-base font-black uppercase tracking-[0.3em] bg-black text-[#C5F542] px-4 py-2 rounded-full mb-8">
                <Code2 size={14} /> Technical Skills
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {Object.entries(skills).map(([category, list]) => (
                  <div
                    key={category}
                    className="skill-card bg-white border-2 border-black rounded-2xl p-5 shadow-[4px_4px_0_0_#000]"
                  >
                    <h4 className="text-[10px] uppercase tracking-[0.25em] text-black font-black mb-4 border-b-2 border-black pb-2">
                      {category}
                    </h4>
                    <ul className="space-y-2.5">
                      {list.map((skill) => (
                        <li
                          key={skill}
                          className="text-xs md:text-sm text-black/75 flex items-center gap-2.5 font-bold"
                        >
                          <div className="w-1.5 h-1.5 bg-[#C5F542] border border-black rounded-full shrink-0" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#C5F542] p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border-2 border-black shadow-[6px_6px_0_0_#000]">
              <h3 className="text-xl md:text-2xl font-black mb-8 flex items-center gap-3 text-black uppercase italic">
                <Trophy size={22} /> Milestones
              </h3>
              <div className="space-y-8">
                <div className="relative pl-6 border-l-4 border-black">
                  <div className="absolute left-[-10px] top-1 w-4 h-4 bg-white rounded-full border-2 border-black" />
                  <p className="text-[10px] text-black/70 uppercase tracking-widest mb-1 font-black">
                    Feb 2026
                  </p>
                  <h4 className="text-base md:text-lg font-black text-black">
                    Junior Software Engineer @ Synup
                  </h4>
                  <p className="text-xs md:text-sm text-black/70 mt-1 font-medium">
                    First full-time engineering role.
                  </p>
                </div>
                <div className="relative pl-6 border-l-4 border-black">
                  <div className="absolute left-[-10px] top-1 w-4 h-4 bg-white rounded-full border-2 border-black" />
                  <p className="text-[10px] text-black/70 uppercase tracking-widest mb-1 font-black">
                    2025
                  </p>
                  <h4 className="text-base md:text-lg font-black text-black">
                    AccioJob MERN Program — NSDC Certified
                  </h4>
                </div>
                <div className="relative pl-6 border-l-4 border-black">
                  <div className="absolute left-[-10px] top-1 w-4 h-4 bg-white rounded-full border-2 border-black" />
                  <p className="text-[10px] text-black/70 uppercase tracking-widest mb-1 font-black">
                    2024
                  </p>
                  <h4 className="text-base md:text-lg font-black text-black">
                    ISTE State-Level Hackathon Winner
                  </h4>
                  <p className="text-xs md:text-sm text-black/70 mt-1 font-medium">
                    Music recommendation application.
                  </p>
                </div>
                <div className="relative pl-6 border-l-4 border-black">
                  <div className="absolute left-[-10px] top-1 w-4 h-4 bg-white rounded-full border-2 border-black" />
                  <p className="text-[10px] text-black/70 uppercase tracking-widest mb-1 font-black">
                    Practice
                  </p>
                  <h4 className="text-base md:text-lg font-black text-black">
                    100+ DSA Problems Solved
                  </h4>
                  <p className="text-xs md:text-sm text-black/70 mt-1 font-medium">
                    LeetCode.
                  </p>
                </div>
                <div className="relative pl-6 border-l-4 border-black">
                  <div className="absolute left-[-10px] top-1 w-4 h-4 bg-white rounded-full border-2 border-black" />
                  <p className="text-[10px] text-black/70 uppercase tracking-widest mb-1 font-black">
                    Community
                  </p>
                  <h4 className="text-base md:text-lg font-black text-black">
                    React.js Workshop Lead
                  </h4>
                  <p className="text-xs md:text-sm text-black/70 mt-1 font-medium">
                    Taught 50+ students at GCE Kannur.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border-2 border-black relative overflow-hidden group shadow-[6px_6px_0_0_#000] hover:scale-[0.99] transition-transform duration-300">

              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-black mb-3 text-black leading-tight uppercase">
                  Resume<span className="text-[#9BC91F]">.</span>
                </h3>
                <p className="text-black/65 mb-8 max-w-[240px] text-[10px] leading-relaxed font-black uppercase tracking-[0.2em]">
                  Full Details — {new Date().getFullYear()}
                </p>
                <a
                  href="/FaizZubair.pdf"
                  download="Faiz_Zubair_Resume.pdf"
                  className="group shine inline-flex items-center gap-3 bg-[#C5F542] text-black px-8 py-4 rounded-full font-black border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-xs uppercase tracking-widest"
                >
                  <Download size={16} className="arrow" /> Get PDF
                </a>
              </div>
              <BookOpen
                size={260}
                className="absolute right-[-60px] bottom-[-60px] opacity-[0.06] text-black group-hover:rotate-12 transition-transform duration-1000 hidden md:block"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER / CONTACT */}
      <footer
        id="contact"
        className="py-24 md:py-40 px-6 md:px-12 lg:px-24 bg-[#C5F542] text-black relative overflow-hidden border-t-2 border-black"
      >
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block bg-white text-black px-4 py-1.5 rounded-full border-2 border-black text-[10px] font-black uppercase tracking-widest shadow-[3px_3px_0_0_#000] mb-10">
            Let's Talk
          </span>
          <h2 className="text-[18vw] md:text-[14vw] font-black tracking-tighter mb-12 md:mb-20 leading-none text-black select-none">
            CONTACT
          </h2>
          <p className="text-base md:text-xl font-bold text-black/70 mb-12 md:mb-20 max-w-xl mx-auto">
            Open to interesting projects, collaborations, or just a good
            conversation about engineering.
          </p>

          <div className="flex flex-wrap justify-center gap-5 md:gap-8 mb-24 md:mb-32">
            {[
              { icon: <Mail />, href: "mailto:faizvk14@gmail.com", label: "Email" },
              {
                icon: <Linkedin />,
                href: "https://linkedin.com/in/faiz-zubair-vadakkayil",
                label: "LinkedIn",
              },
              { icon: <Github />, href: "https://github.com/faizvk", label: "GitHub" },
              { icon: <Instagram />, href: "https://instagram.com/faiz.vk", label: "Instagram" },
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                aria-label={link.label}
                target="_blank"
                rel="noopener noreferrer"
                className="social-tile p-5 md:p-7 bg-white border-2 border-black rounded-2xl md:rounded-3xl shadow-[6px_6px_0_0_#000] hover:shadow-[2px_2px_0_0_#000]"
              >
                {React.cloneElement(link.icon, { size: 26, strokeWidth: 1.75 })}
              </a>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 md:pt-16 border-t-2 border-black">
            <p className="text-black/80 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.5em] font-black">
              Faiz Zubair Vadakkayil / {new Date().getFullYear()}
            </p>
            <div className="flex gap-6 md:gap-12 text-[9px] md:text-[10px] uppercase font-black text-black/70 tracking-widest">
              <span>Synup</span>
              <span>Kerala, IN</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;
