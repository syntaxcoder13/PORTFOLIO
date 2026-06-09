import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Github, Calendar, Users, Cpu } from 'lucide-react';

interface ProjectData {
  number: string;
  category: string;
  name: string;
  liveUrl: string;
  displayUrl: string;
  desc: string;
  tagline: string;
  githubUrl: string;
  duration: string;
  teamSize: string;
  roleName: string;
  roleBullets: string[];
  detailedOverview: string;
  problemStatement: string;
  quote: string;
  solution: string;
  outcomes: string;
  features: string[];
  tech: string[];
  role: string;
  year: string;
  accentRgb: string;
  mainImage: string;
  isLive: boolean;
}

interface ProjectDetailsOverlayProps {
  project: ProjectData | null;
  onClose: () => void;
  totalProjects: number;
}

const ProjectDetailsOverlay = ({ project, onClose, totalProjects }: ProjectDetailsOverlayProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [project, onClose]);

  // Lock body scroll / pause Lenis while open
  useEffect(() => {
    if (!project) return;

    const lenis = (window as any).lenis;
    const originalBodyOverflow = document.body.style.overflow;

    if (lenis) {
      lenis.stop();
    } else {
      document.body.style.overflow = 'hidden';
    }

    // Scroll to top of overlay when opened
    if (overlayRef.current) {
      overlayRef.current.scrollTop = 0;
    }

    return () => {
      if (lenis) {
        lenis.start();
      } else {
        document.body.style.overflow = originalBodyOverflow;
      }
    };
  }, [project]);

  if (!project) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.name} Details`}
        data-lenis-prevent="true"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[100] h-screen w-screen overflow-y-auto bg-[#0C0C0C] text-[#D7E2EA] font-sans scroll-smooth"
      >
        {/* Subtle top/bottom radial ambient glows */}
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none opacity-10"
          style={{ background: `rgb(${project.accentRgb})` }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none opacity-5"
          style={{ background: `rgb(${project.accentRgb})` }}
        />

        {/* 1. Header Bar */}
        <header className="sticky top-0 z-[110] bg-[#0C0C0C]/80 backdrop-blur-md border-b border-white/5 py-4 px-6 sm:px-12 md:px-20 flex items-center justify-between">
          <button
            onClick={onClose}
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D7E2EA]/60 hover:text-[#a3e635] transition-colors duration-300"
          >
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </button>
          <div className="font-mono text-xs text-white/30 uppercase tracking-[0.2em] font-semibold">
            Project {project.number} / {totalProjects.toString().padStart(2, '0')}
          </div>
        </header>

        {/* Outer Max-Width Container */}
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 py-12 sm:py-16 md:py-20 relative z-10 flex flex-col gap-16 md:gap-24">
          
          {/* 2. Hero Split Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-6 flex flex-col items-start gap-6">
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#D7E2EA]/50">
                <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635] shadow-[0_0_6px_#a3e635]" />
                <span>Featured Case Study</span>
              </div>

              <h1
                style={{ fontFamily: '"Bebas Neue", sans-serif' }}
                className="text-5xl sm:text-7xl md:text-8xl tracking-wider text-white leading-none uppercase"
              >
                {project.name}
              </h1>

              <p className="text-base sm:text-lg font-light text-[#D7E2EA]/75 leading-relaxed max-w-xl">
                {project.tagline}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2.5 my-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-bold uppercase tracking-wider text-[#D7E2EA]/70 bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4 w-full sm:w-auto">
                {project.isLive ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/live inline-flex items-center justify-center gap-3 rounded-full bg-[#a3e635] hover:bg-[#bbf746] px-8 py-4 text-xs font-bold uppercase tracking-widest text-black transition-all duration-300 shadow-[0_8px_20px_rgba(163,230,53,0.15)] btn-shine"
                  >
                    <span>View Live</span>
                    <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5" />
                  </a>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center justify-center gap-3 rounded-full border border-white/5 bg-white/[0.005] px-8 py-4 text-xs font-bold uppercase tracking-widest text-white/30 cursor-not-allowed select-none"
                  >
                    <span>In Development</span>
                    <Cpu size={14} className="opacity-30" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Laptop Frame Mockup Column */}
            <div className="lg:col-span-6 flex items-center justify-center w-full">
              {/* Custom High-Fidelity CSS Laptop */}
              <div className="w-full max-w-[560px] aspect-[16/10] flex flex-col select-none filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.6)]">
                {/* Laptop Bezel */}
                <div className="flex-1 bg-[#121214] rounded-t-2xl p-2.5 sm:p-4 border-t border-l border-r border-white/10 flex flex-col relative">
                  {/* Camera dot */}
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#2c2c35] flex items-center justify-center">
                    <div className="w-0.5 h-0.5 rounded-full bg-blue-500/80" />
                  </div>
                  {/* Screen Frame */}
                  <div className="flex-1 w-full rounded bg-[#09090b] overflow-hidden relative border border-white/5 flex items-center justify-center">
                    <img
                      src={project.mainImage}
                      alt={`${project.name} browser mockup`}
                      className="w-full h-full object-contain"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/5 pointer-events-none" />
                  </div>
                </div>
                {/* Laptop Base */}
                <div className="h-2.5 sm:h-3 w-[104%] -ml-[2%] bg-[#1e1e22] border-t border-white/20 rounded-b-xl relative flex justify-center shadow-lg">
                  {/* Notch notch */}
                  <div className="w-16 sm:w-24 h-1 sm:h-1.5 bg-[#0f0f11] rounded-b-md" />
                </div>
              </div>
            </div>
          </section>

          {/* 3. Detailed Specifications Bento-style Grid Section */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-16 md:pt-20 border-t border-white/5">
            {/* Column 1: Static Sidebar Nav Labels (2 cols wide) */}
            <div className="hidden md:flex md:col-span-2 flex-col gap-5 sticky top-24 h-fit">
              <span className="font-mono text-[10px] tracking-widest text-[#a3e635] font-bold">
                ✦ CASE REPORT
              </span>
              <ul className="flex flex-col gap-3.5 text-[11px] font-bold uppercase tracking-widest text-[#D7E2EA]/30">
                <li className="text-[#D7E2EA]/80 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635]" /> Overview
                </li>
                <li className="hover:text-[#D7E2EA]/60 transition-colors duration-300">• Key Role</li>
                <li className="hover:text-[#D7E2EA]/60 transition-colors duration-300">• Metadata</li>
                <li className="hover:text-[#D7E2EA]/60 transition-colors duration-300">• Challenge</li>
                <li className="hover:text-[#D7E2EA]/60 transition-colors duration-300">• Impact</li>
              </ul>
            </div>

            {/* Column 2: Overview Block (4 cols wide) */}
            <div className="md:col-span-4 flex flex-col gap-4">
              <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-white/25 font-bold">
                <span className="h-1 w-1 rounded-full bg-white/25" />
                <span>Overview</span>
              </div>
              <h3 className="text-xl font-bold uppercase text-white tracking-wide">
                Project Synopsis
              </h3>
              <p className="text-sm font-light text-[#D7E2EA]/70 leading-relaxed">
                {project.detailedOverview}
              </p>
            </div>

            {/* Column 3: My Role Block (4 cols wide) */}
            <div className="md:col-span-4 flex flex-col gap-4">
              <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-white/25 font-bold">
                <span className="h-1 w-1 rounded-full bg-white/25" />
                <span>My Role</span>
              </div>
              <h3 className="text-xl font-bold uppercase text-white tracking-wide">
                {project.roleName}
              </h3>
              <ul className="flex flex-col gap-3 text-sm font-light text-[#D7E2EA]/70">
                {project.roleBullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-[#a3e635] mt-1 shrink-0">✦</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Metadata block (2 cols wide) */}
            <div className="md:col-span-2 flex flex-col gap-6 md:pl-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-white/25 font-bold">
                  <Calendar size={10} className="text-white/25" />
                  <span>Duration</span>
                </div>
                <span className="text-sm font-semibold text-white uppercase tracking-wider">
                  {project.duration}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-white/25 font-bold">
                  <Users size={10} className="text-white/25" />
                  <span>Team Size</span>
                </div>
                <span className="text-sm font-semibold text-white uppercase tracking-wider">
                  {project.teamSize}
                </span>
              </div>
            </div>
          </section>

          {/* 4. Problem Statement Bento Card */}
          <section className="w-full">
            <div className="rounded-2xl border border-white/5 bg-[#121215] p-6 sm:p-10 md:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.35)] relative overflow-hidden">
              {/* Subtle background card overlay */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Side: Statement */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-[#a3e635] font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635]" />
                    <span>The Challenge</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold uppercase text-white tracking-tight leading-tight">
                    Problem Statement
                  </h3>
                  <p className="text-sm sm:text-base font-light text-[#D7E2EA]/75 leading-relaxed">
                    {project.problemStatement}
                  </p>
                </div>

                {/* Right Side: Quote Block */}
                <div className="lg:col-span-5 flex flex-col pl-0 lg:pl-8 border-t lg:border-t-0 lg:border-l border-white/5 pt-8 lg:pt-0">
                  <span className="text-6xl sm:text-7xl font-serif text-[#a3e635] leading-none select-none h-6 md:h-8">
                    “
                  </span>
                  <p className="text-base sm:text-lg font-light italic text-[#D7E2EA]/85 leading-relaxed">
                    {project.quote}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Process: Solution & Outcomes Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pb-12">
            {/* Left Box: Solution */}
            <div className="flex flex-col gap-4 p-6 sm:p-8 rounded-xl border border-white/5 bg-white/[0.01] hover:border-white/10 transition-colors duration-300">
              <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-[#a3e635] font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635]" />
                <span>The Process</span>
              </div>
              <h3 className="text-xl font-bold uppercase text-white tracking-wide">
                Solution Architecture
              </h3>
              <p className="text-sm font-light text-[#D7E2EA]/70 leading-relaxed">
                {project.solution}
              </p>
            </div>

            {/* Right Box: Outcomes */}
            <div className="flex flex-col gap-4 p-6 sm:p-8 rounded-xl border border-white/5 bg-white/[0.01] hover:border-white/10 transition-colors duration-300">
              <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-emerald-400 font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>The Impact</span>
              </div>
              <h3 className="text-xl font-bold uppercase text-white tracking-wide">
                Project Outcomes
              </h3>
              <p className="text-sm font-light text-[#D7E2EA]/70 leading-relaxed">
                {project.outcomes}
              </p>
            </div>
          </section>

        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default ProjectDetailsOverlay;
