import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Calendar, Users } from 'lucide-react';
import { ALL_PROJECTS } from '../../data/projects';
import type { ProjectData } from '../../types/project.types';

interface AllProjectsOverlayProps {
  open: boolean;
  onClose: () => void;
  onViewProjectDetails: (project: ProjectData) => void;
}

const AllProjectsOverlay = ({ open, onClose, onViewProjectDetails }: AllProjectsOverlayProps) => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'COMPLETED' | 'PENDING'>('ALL');
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Lock body scroll / pause Lenis while open
  useEffect(() => {
    if (!open) return;

    const lenis = (window as any).lenis;
    const originalOverflow = document.body.style.overflow;

    if (lenis) {
      lenis.stop();
    } else {
      document.body.style.overflow = 'hidden';
    }

    if (overlayRef.current) {
      overlayRef.current.scrollTop = 0;
    }

    return () => {
      if (lenis) {
        lenis.start();
      } else {
        document.body.style.overflow = originalOverflow;
      }
    };
  }, [open]);

  if (!open) return null;

  const filteredProjects = ALL_PROJECTS.filter((project) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'COMPLETED') return project.isLive;
    if (activeFilter === 'PENDING') return !project.isLive;
    return true;
  });

  return createPortal(
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="All Projects Showcase"
        data-lenis-prevent="true"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[90] h-screen w-screen overflow-y-auto bg-[#F4F3EF] text-[#1c1c1c] font-sans scroll-smooth"
      >
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#84cc16]/3 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/3 blur-[180px] pointer-events-none" />

        {/* Header Bar */}
        <header className="sticky top-0 z-[100] bg-[#F4F3EF]/85 backdrop-blur-md border-b border-black/[0.06] py-4 px-6 sm:px-12 md:px-20 flex items-center justify-between">
          <button
            onClick={onClose}
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-700 hover:text-[#84cc16] transition-colors duration-300"
          >
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </button>
          <div className="font-mono text-xs text-black/40 uppercase tracking-[0.2em] font-semibold">
            Archive [{ALL_PROJECTS.length} Projects]
          </div>
        </header>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 py-12 sm:py-16 relative z-10 flex flex-col gap-12">

          {/* Header Title & Description */}
          <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#84cc16] bg-[#84cc16]/8 border border-[#84cc16]/20 px-3 py-1 rounded">
              Project Archive
            </span>
            <h1
              style={{ fontFamily: '"Bebas Neue", sans-serif' }}
              className="text-5xl sm:text-6xl md:text-7xl tracking-wider text-neutral-900 uppercase mt-2"
            >
              All <span className="text-[#84cc16]">Creations</span>
            </h1>
            <p className="text-sm font-light text-neutral-600 leading-relaxed">
              Explore the complete historical inventory of platforms, automation frameworks, and designs I have developed.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center items-center gap-3 border-y border-black/[0.06] py-6">
            {(['ALL', 'COMPLETED', 'PENDING'] as const).map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`relative px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                    isActive
                      ? 'bg-[#84cc16] text-white border-[#84cc16] shadow-[0_4px_12px_rgba(132,204,22,0.15)]'
                      : 'bg-black/[0.01] text-neutral-600 border-black/5 hover:border-black/20 hover:text-black'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Projects Showcase Grid */}
          <motion.section layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.article
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={project.name}
                  className="group rounded-xl border border-black/5 bg-[#fcfcfb] p-6 hover:border-black/10 hover:bg-white transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden shadow-sm hover:shadow-md"
                >
                  {/* Glowing background hint */}
                  <div
                    className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[80px] pointer-events-none opacity-[0.03] transition-opacity duration-500 group-hover:opacity-[0.06]"
                    style={{ background: `rgb(${project.accentRgb})` }}
                  />

                  <div className="flex flex-col gap-4">
                    {/* Index + Status */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-neutral-400">
                        0{idx + 1}
                      </span>
                      {project.isLive ? (
                        <span className="inline-flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded bg-emerald-50 border border-emerald-100 text-emerald-800">
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded bg-amber-50 border border-amber-100 text-amber-800">
                          Pending
                        </span>
                      )}
                    </div>

                    {/* Browser Mockup Thumbnail */}
                    <div className="w-full aspect-[16/10] rounded bg-[#09090b] overflow-hidden border border-black/[0.06] flex flex-col relative group/thumb shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                      <div className="h-6 bg-[#16161a] border-b border-white/5 flex items-center px-3 justify-between shrink-0">
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                        </div>
                        <div className="text-[8px] text-[#D7E2EA]/20 font-mono tracking-wider truncate max-w-[120px]">
                          {project.displayUrl}
                        </div>
                        <div className="w-4" />
                      </div>
                      <div className="flex-1 w-full overflow-hidden flex items-center justify-center bg-[#070707] relative">
                        <img
                          src={project.mainImage}
                          alt={`${project.name} preview`}
                          className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover/thumb:scale-[1.04]"
                          draggable={false}
                          loading="lazy"
                        />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold uppercase text-neutral-900 group-hover:text-[#84cc16] transition-colors duration-300">
                      {project.name}
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#84cc16]/60">
                      {project.category}
                    </span>
                    <p className="text-xs font-light text-neutral-600 leading-relaxed">
                      {project.desc}
                    </p>

                    {/* Specs info */}
                    <div className="flex items-center gap-4 text-[10px] font-mono text-neutral-400 border-y border-black/[0.06] py-2.5 my-1">
                      <span className="flex items-center gap-1"><Calendar size={10} /> {project.year}</span>
                      <span className="flex items-center gap-1"><Users size={10} /> {project.teamSize}</span>
                    </div>

                    {/* Tech list */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span key={t} className="text-[8px] font-bold uppercase tracking-wider text-neutral-600 bg-neutral-100 border border-black/[0.04] px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions row */}
                  <div className="pt-5 mt-6 border-t border-black/[0.06] flex items-center justify-between">
                    <button
                      onClick={() => onViewProjectDetails(project)}
                      className="group/btn inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-neutral-700 hover:text-[#84cc16] transition-colors duration-300"
                    >
                      <span>View Case Study</span>
                      <ArrowUpRight size={12} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.section>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default AllProjectsOverlay;
