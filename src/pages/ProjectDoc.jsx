import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink, CircleCheck } from "lucide-react";
import { docContent } from "./utils/docContent";

export default function ProjectDoc() {
  const { slug } = useParams();
  const doc = docContent[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!doc) return <Navigate to="/" replace />;

  return (
    <div className="bg-[#FAFAF7] text-black min-h-screen selection:bg-[#C5F542] font-sans">
      <nav className="sticky top-0 z-50 bg-[#FAFAF7]/90 backdrop-blur border-b-2 border-black">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-4 flex justify-between items-center">
          <Link
            to="/"
            aria-label="Back to home"
            className="inline-flex items-center gap-2 bg-white border-2 border-black rounded-full px-4 py-2 text-[10px] md:text-xs uppercase tracking-widest font-black shadow-[3px_3px_0_0_#000] hover:shadow-[1px_1px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <ArrowLeft size={14} /> Back
          </Link>
          <span className="font-black tracking-tighter text-lg md:text-xl bg-[#C5F542] px-3 py-0.5 rounded-md border-2 border-black">
            FZ.
          </span>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-20">
        <div className="anim-fade-up">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-[#C5F542] text-black rounded-full border-2 border-black font-mono text-[10px] font-bold tracking-widest uppercase">
              {doc.status}
            </span>
            <span className="px-3 py-1 bg-white text-black rounded-full border-2 border-black font-mono text-[10px] font-bold tracking-widest uppercase">
              {doc.role}
            </span>
            <span className="text-black/65 font-mono text-[10px] tracking-[0.2em] uppercase font-bold">
              {doc.timeline}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-4 text-black">
            {doc.title}
            <span className="text-[#9BC91F]">.</span>
          </h1>
          <p className="text-lg md:text-2xl font-bold text-black/70 mb-8">
            {doc.tagline}
          </p>

          <p className="text-base md:text-lg leading-relaxed text-black/75 max-w-3xl font-medium mb-10">
            {doc.summary}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={doc.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group shine inline-flex items-center gap-2 bg-black text-[#C5F542] px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <Github size={16} className="arrow" /> Source
            </a>
            {doc.demo && (
              <a
                href={doc.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="group shine inline-flex items-center gap-2 bg-[#C5F542] text-black px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                <ExternalLink size={16} className="arrow" /> Live Demo
              </a>
            )}
          </div>
        </div>

        <section className="mt-16 md:mt-24">
          <h2 className="inline-block text-sm md:text-base font-black uppercase tracking-[0.3em] bg-black text-[#C5F542] px-4 py-2 rounded-full mb-8">
            Tech Stack
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {Object.entries(doc.stack).map(([group, items]) => (
              <div
                key={group}
                className="skill-card bg-white border-2 border-black rounded-2xl p-5 md:p-6 shadow-[4px_4px_0_0_#000]"
              >
                <h4 className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-black font-black mb-4 border-b-2 border-black pb-2">
                  {group}
                </h4>
                <ul className="space-y-2">
                  {items.map((it) => (
                    <li
                      key={it}
                      className="text-xs md:text-sm text-black/75 flex items-center gap-3 font-bold"
                    >
                      <div className="w-2 h-2 bg-[#C5F542] border border-black rounded-full shrink-0" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 md:mt-24">
          <h2 className="inline-block text-sm md:text-base font-black uppercase tracking-[0.3em] bg-black text-[#C5F542] px-4 py-2 rounded-full mb-8">
            Highlights
          </h2>
          <div className="bg-white border-2 border-black rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 shadow-[6px_6px_0_0_#000]">
            <ul className="space-y-4">
              {doc.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 text-sm md:text-base text-black/80 font-medium leading-relaxed"
                >
                  <CircleCheck
                    size={20}
                    className="shrink-0 mt-0.5 text-[#9BC91F]"
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-16 md:mt-24 space-y-12 md:space-y-16">
          {doc.sections.map((s, i) => (
            <article key={i}>
              <h3 className="text-2xl md:text-4xl font-black tracking-tighter mb-4 md:mb-6 text-black">
                {s.title}
              </h3>
              <p className="text-base md:text-lg leading-relaxed text-black/75 font-medium max-w-3xl">
                {s.body}
              </p>
            </article>
          ))}
        </section>

        <div className="mt-20 md:mt-32 border-t-2 border-black pt-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-white border-2 border-black rounded-full px-6 py-3 text-xs uppercase tracking-widest font-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <ArrowLeft size={14} /> All Projects
          </Link>
          <p className="text-black/65 font-mono text-[10px] uppercase tracking-[0.4em] font-black">
            Faiz Zubair / {new Date().getFullYear()}
          </p>
        </div>
      </main>
    </div>
  );
}
