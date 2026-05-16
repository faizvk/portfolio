import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  BookOpen,
  Trophy,
  Instagram,
} from "lucide-react";
import { fadeIn } from "../animations/fadeIn";
import { mainProjects } from "./utils/mainProjects";
import { sideProjects } from "./utils/sideProjects";
import { skills } from "./utils/skills";

const App = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#FAFAF7] text-black min-h-screen selection:bg-[#C5F542] overflow-x-hidden font-sans">
      <nav
        className={`fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled ? "w-[95%] md:w-[420px]" : "w-[95%] md:w-[620px]"
        }`}
      >
        <div
          className="bg-white border-2 border-black shadow-[4px_4px_0_0_#000] rounded-full px-6 md:px-8 py-3 md:py-4 flex justify-between items-center"
          {...fadeIn({
            direction: "up",
            distance: 80,
            duration: 0.9,
          })}
        >
          <span className="font-black tracking-tighter text-xl md:text-2xl text-black bg-[#C5F542] px-3 py-0.5 rounded-md border-2 border-black">
            FZ.
          </span>
          <div className="flex gap-4 md:gap-8 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">
            <a href="#projects" className="hover:text-black transition-colors">
              Works
            </a>
            <a href="#about" className="hover:text-black transition-colors">
              About
            </a>
            <a href="#contact" className="hover:text-black transition-colors">
              Contact
            </a>
          </div>
        </div>
      </nav>

      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 relative pt-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="flex items-center gap-4 mb-6 md:mb-8 flex-wrap">
              <span className="px-3 py-1 bg-[#C5F542] text-black rounded-full border-2 border-black font-mono text-[9px] md:text-[10px] font-bold tracking-widest uppercase">
                Graduated '25
              </span>
              <span className="text-black/50 font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase font-bold">
                GCE KANNUR
              </span>
            </div>
            <h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-8 md:mb-10 text-black"
              {...fadeIn({
                direction: "right",
                distance: 80,
                duration: 0.9,
              })}
            >
              FAIZ <br />
              ZUBAIR.
            </h1>
            <p
              className="max-w-md text-black/70 text-lg md:text-xl leading-relaxed mb-10 md:mb-12 font-medium"
              {...fadeIn({
                direction: "up",
                distance: 80,
                duration: 0.9,
              })}
            >
              MERN Stack Developer architecting clean, scalable, and
              high-utility digital experiences.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <a
                href="#contact"
                className="group relative w-full sm:w-auto text-center px-10 py-5 bg-[#C5F542] text-black rounded-full font-black text-xs uppercase tracking-widest overflow-hidden transition-all border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                <span className="relative z-10">Get in touch</span>
              </a>
              <div className="flex gap-3 border-l-0 sm:border-l-2 border-black/10 pl-0 sm:pl-8">
                <a
                  href="https://github.com/faizvk"
                  className="p-3 bg-white border-2 border-black rounded-full hover:bg-[#C5F542] transition-all shadow-[3px_3px_0_0_#000] hover:shadow-[1px_1px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px]"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://linkedin.com/in/faiz-zubair-vadakkayil"
                  className="p-3 bg-white border-2 border-black rounded-full hover:bg-[#C5F542] transition-all shadow-[3px_3px_0_0_#000] hover:shadow-[1px_1px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px]"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="relative flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div
              className="relative w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[460px] aspect-4/5 rounded-[2rem] border-2 border-black bg-[#C5F542] overflow-hidden shadow-[8px_8px_0_0_#000]"
              {...fadeIn({
                direction: "left",
                distance: 80,
                duration: 0.9,
              })}
            >
              <img
                src="./profile.jpg"
                alt="Faiz Zubair"
                className="w-full h-full object-cover object-top grayscale contrast-110"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-4 hidden md:flex"
        >
          <div className="w-[20px] h-[34px] border-2 border-black rounded-full flex justify-center pt-2 bg-white">
            <div className="w-1 h-1 bg-black rounded-full" />
          </div>
          <span className="text-[8px] uppercase tracking-[0.5em] font-black text-black/40">
            Scroll
          </span>
        </motion.div>
      </section>

      <section id="projects" className="py-20 md:py-40 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row items-start md:items-end justify-between border-b-2 border-black pb-12 gap-4">
            <div>
              <h2
                className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-black"
                {...fadeIn({
                  direction: "right",
                  distance: 80,
                  duration: 0.9,
                })}
              >
                Works
                <span className="text-[#9BC91F]">.</span>
              </h2>
              <p className="text-black/50 font-mono text-xs tracking-widest mt-4 uppercase font-bold">
                Main project builds
              </p>
            </div>
            <span className="bg-[#C5F542] text-black px-4 py-2 rounded-full border-2 border-black text-[10px] font-black uppercase tracking-widest shadow-[3px_3px_0_0_#000]">
              {mainProjects.length} Projects
            </span>
          </div>

          <div className="flex overflow-x-auto gap-8 md:gap-12 pb-20 snap-x no-scrollbar scroll-smooth">
            {mainProjects.map((project, i) => (
              <div
                key={i}
                className="min-w-[280px] sm:min-w-[400px] md:min-w-[550px] snap-center group cursor-pointer"
              >
                <div className="aspect-[16/10] rounded-[1.5rem] md:rounded-[2rem] mb-6 md:mb-10 overflow-hidden relative flex items-center justify-center group transition-all duration-700 border-2 border-black shadow-[6px_6px_0_0_#000]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="absolute inset-0 bg-black/10 md:bg-black/0 group-hover:bg-black/20 transition-all duration-500" />

                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-6 md:top-10 left-6 md:left-10 z-10 bg-[#C5F542] border-2 border-black p-3 md:p-4 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 hover:bg-white shadow-[3px_3px_0_0_#000]"
                  >
                    <ExternalLink size={20} />
                  </a>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-6 md:top-10 right-6 md:right-10 z-10 bg-white border-2 border-black p-3 md:p-4 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 hover:bg-[#C5F542] shadow-[3px_3px_0_0_#000]"
                  >
                    <Github size={20} />
                  </a>
                </div>

                <div className="px-2 md:px-4">
                  <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-black bg-[#C5F542] border-2 border-black px-2 md:px-3 py-1 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl md:text-4xl font-black mb-3 md:mb-4 text-black">
                    {project.title}
                  </h3>
                  <p className="text-black/65 text-sm md:text-lg font-medium leading-relaxed max-w-lg mb-6 md:mb-8">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-4 md:gap-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] md:text-[11px] font-mono text-black/40 font-bold uppercase"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 md:mt-48 mb-12 md:mb-20 flex items-center gap-6 md:gap-10">
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pb-24">
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
                <div className="inline-flex items-center justify-center w-10 h-10 mb-6 md:mb-8 bg-[#C5F542] border-2 border-black rounded-full text-black">
                  {project.icon}
                </div>
                <h3
                  className="text-xl md:text-2xl font-black mb-3 md:mb-4 text-black"
                  {...fadeIn({
                    direction: "right",
                    distance: 80,
                    duration: 0.9,
                  })}
                >
                  {project.title}
                </h3>
                <p
                  className="text-black/60 text-xs md:text-sm leading-relaxed mb-8 md:mb-10 font-medium h-auto md:h-20"
                  {...fadeIn({
                    direction: "up",
                    distance: 80,
                    duration: 0.9,
                  })}
                >
                  {project.description}
                </p>
                <div className="flex justify-between items-center pt-6 md:pt-8 border-t-2 border-black/10">
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[8px] md:text-[10px] font-mono text-black/50 uppercase font-black"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 md:gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black/40 hover:text-black transition-all hover:scale-110"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={18} />
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black/40 hover:text-black transition-all hover:scale-110"
                        onClick={(e) => e.stopPropagation()}
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

      <section
        id="about"
        className="py-20 md:py-40 px-6 md:px-12 lg:px-24 bg-[#F0F0EA] border-y-2 border-black"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-7">
            <span className="inline-block bg-[#C5F542] text-black px-4 py-1.5 rounded-full border-2 border-black text-[10px] font-black uppercase tracking-widest shadow-[3px_3px_0_0_#000] mb-8">
              About Me
            </span>
            <div className="space-y-6 md:space-y-10 text-black/75 text-lg md:text-xl font-medium leading-relaxed">
              <p>
                I am a{" "}
                <strong className="text-black font-black bg-[#C5F542] px-2 py-0.5 rounded border-2 border-black">
                  Full-Stack JavaScript Developer
                </strong>
                . My engineering philosophy is simple: write code that is clean
                enough to be its own documentation.
              </p>
              <p>
                Whether it's architecting RESTful APIs with Node.js or crafting
                micro-interactions in React, I maintain a strict focus on system
                foundations and long-term maintainability.
              </p>
            </div>

            <div className="mt-12 md:mt-24 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
              {Object.entries(skills).map(([category, list]) => (
                <div
                  key={category}
                  className="bg-white border-2 border-black rounded-2xl p-5 md:p-6 shadow-[4px_4px_0_0_#000]"
                >
                  <h4 className="text-[9px] md:text-[11px] uppercase tracking-[0.3em] text-black font-black mb-5 md:mb-6 border-b-2 border-black pb-2">
                    {category}
                  </h4>
                  <ul className="space-y-3 md:space-y-3">
                    {list.map((skill) => (
                      <li
                        key={skill}
                        className="text-xs md:text-sm text-black/70 flex items-center gap-3 font-bold"
                      >
                        <div className="w-2 h-2 bg-[#C5F542] border border-black rounded-full" />{" "}
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8 md:space-y-10">
            <div className="bg-[#C5F542] p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border-2 border-black shadow-[6px_6px_0_0_#000]">
              <h3 className="text-xl md:text-2xl font-black mb-8 md:mb-12 flex items-center gap-4 text-black uppercase italic">
                <Trophy size={24} /> Milestones
              </h3>
              <div className="space-y-10 md:space-y-12">
                <div className="relative pl-8 border-l-4 border-black group">
                  <div className="absolute left-[-10px] top-1 w-4 h-4 bg-white rounded-full border-2 border-black" />
                  <p className="text-[9px] md:text-[10px] text-black/70 uppercase tracking-widest mb-2 md:mb-3 font-black">
                    2024
                  </p>
                  <h4 className="text-lg md:text-xl font-black text-black group-hover:translate-x-2 transition-transform">
                    ISTE Hackathon Winner
                  </h4>
                  <p className="text-xs md:text-sm text-black/70 mt-2 font-medium leading-relaxed">
                    State-level recognition for music technology innovation at
                    GCE Kannur.
                  </p>
                </div>
                <div className="relative pl-8 border-l-4 border-black group">
                  <div className="absolute left-[-10px] top-1 w-4 h-4 bg-white rounded-full border-2 border-black" />
                  <p className="text-[9px] md:text-[10px] text-black/70 uppercase tracking-widest mb-2 md:mb-3 font-black">
                    Community
                  </p>
                  <h4 className="text-lg md:text-xl font-black text-black group-hover:translate-x-2 transition-transform">
                    Workshop Lead
                  </h4>
                  <p className="text-xs md:text-sm text-black/70 mt-2 font-medium leading-relaxed">
                    Mentored 50+ students in React fundamentals and UI
                    architecture.
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 0.98 }}
              className="bg-white p-10 md:p-14 rounded-[2.5rem] md:rounded-[3rem] border-2 border-black relative overflow-hidden group cursor-pointer shadow-[6px_6px_0_0_#000]"
            >
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-black mb-4 md:mb-6 text-black leading-tight uppercase">
                  Resume<span className="text-[#9BC91F]">.</span>
                </h3>
                <p className="text-black/50 mb-8 md:mb-12 max-w-[220px] text-[9px] md:text-[10px] leading-relaxed font-black uppercase tracking-[0.2em]">
                  Full Details 2026
                </p>
                <a
                  href="/FaizZubair.pdf"
                  download="Faiz_Zubair_Resume.pdf"
                  className="inline-flex items-center gap-4 bg-[#C5F542] text-black px-8 md:px-10 py-4 md:py-5 rounded-full font-black border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-xs uppercase tracking-widest"
                >
                  <Download size={18} /> Get PDF
                </a>
              </div>
              <BookOpen
                size={280}
                className="absolute right-[-60px] bottom-[-60px] opacity-[0.06] text-black group-hover:rotate-12 transition-transform duration-1000 hidden md:block"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <footer
        id="contact"
        className="py-24 md:py-48 px-6 md:px-12 lg:px-24 bg-[#C5F542] text-black relative overflow-hidden border-t-2 border-black"
      >
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block bg-white text-black px-4 py-1.5 rounded-full border-2 border-black text-[10px] font-black uppercase tracking-widest shadow-[3px_3px_0_0_#000] mb-10">
            Let's Talk
          </span>
          <h2 className="text-[18vw] md:text-[15vw] font-black tracking-tighter mb-16 md:mb-24 leading-none text-black select-none">
            CONTACT
          </h2>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-24 md:mb-40">
            {[
              { icon: <Mail />, href: "mailto:faizvk14@gmail.com" },
              {
                icon: <Linkedin />,
                href: "https://linkedin.com/in/faiz-zubair-vadakkayil",
              },
              { icon: <Github />, href: "https://github.com/faizvk" },
              { icon: <Instagram />, href: "https://instagram.com/faiz.vk" },
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="p-6 md:p-8 bg-white border-2 border-black rounded-2xl md:rounded-3xl transition-all duration-300 shadow-[6px_6px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[4px] hover:translate-y-[4px]"
              >
                {React.cloneElement(link.icon, { size: 28, strokeWidth: 1.75 })}
              </a>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 md:pt-24 border-t-2 border-black">
            <p className="text-black/70 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.5em] font-black">
              Faiz Zubair Vadakkayil / 2026
            </p>
            <div className="flex gap-8 md:gap-12 text-[9px] md:text-[10px] uppercase font-black text-black/70 tracking-widest">
              <span>Remote / Freelance</span>
              <span>Kerala, IN</span>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; background-color: #FAFAF7; }
      `}</style>
    </div>
  );
};

export default App;
