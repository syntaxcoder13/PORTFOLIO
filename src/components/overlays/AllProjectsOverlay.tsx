import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Calendar, Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { ALL_PROJECTS } from '../../data/projects';
import type { ProjectData } from '../../types/project.types';

interface AllProjectsOverlayProps {
  open: boolean;
  onClose: () => void;
  onViewProjectDetails: (project: ProjectData) => void;
}

const FILTERS = ['All', 'Web Apps', 'AI / ML', 'Tools', 'Design', 'Automation'] as const;

const matchesCategory = (project: ProjectData, filter: string) => {
  if (filter === 'All') return true;
  const cat = project.category.toLowerCase();
  const tech = project.tech.map((t) => t.toLowerCase());
  const name = project.name.toLowerCase();
  const desc = project.desc.toLowerCase();

  if (filter === 'Web Apps') {
    return (
      cat.includes('web') ||
      cat.includes('platform') ||
      cat.includes('app') ||
      tech.includes('next.js') ||
      tech.includes('react')
    );
  }
  if (filter === 'AI / ML') {
    return (
      cat.includes('ai') ||
      cat.includes('ml') ||
      tech.includes('gemini') ||
      tech.includes('openai') ||
      cat.includes('intelligence')
    );
  }
  if (filter === 'Tools') {
    return (
      cat.includes('tool') ||
      cat.includes('utility') ||
      cat.includes('dashboard') ||
      tech.includes('chart.js')
    );
  }
  if (filter === 'Design') {
    return (
      cat.includes('design') ||
      cat.includes('ui/ux') ||
      cat.includes('creative')
    );
  }
  if (filter === 'Automation') {
    return (
      cat.includes('automation') ||
      cat.includes('script') ||
      cat.includes('bot')
    );
  }
  return true;
};

const AllProjectsOverlay = ({ open, onClose, onViewProjectDetails }: AllProjectsOverlayProps) => {
  const [activeFilter, setActiveFilter] = useState<typeof FILTERS[number]>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'Latest' | 'Oldest'>('Latest');
  const [currentPage, setCurrentPage] = useState(1);
  const overlayRef = useRef<HTMLDivElement>(null);

  const PAGE_SIZE = 6;

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

  // 1. Filter
  const filteredProjects = ALL_PROJECTS.filter((project) => {
    const matchesCat = matchesCategory(project, activeFilter);
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCat;

    const matchesSearch =
      project.name.toLowerCase().includes(q) ||
      project.category.toLowerCase().includes(q) ||
      project.desc.toLowerCase().includes(q) ||
      project.tech.some((t) => t.toLowerCase().includes(q));

    return matchesCat && matchesSearch;
  });

  // 2. Sort
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'Latest') {
      return parseInt(b.year) - parseInt(a.year);
    } else {
      return parseInt(a.year) - parseInt(b.year);
    }
  });

  // 3. Paginate
  const totalPages = Math.ceil(sortedProjects.length / PAGE_SIZE) || 1;
  const displayedProjects = sortedProjects.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Reset to page 1 on filter or search changes
  const handleFilterChange = (filter: typeof FILTERS[number]) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

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
        className="fixed inset-0 z-[90] h-screen w-screen overflow-y-auto bg-[#0C0C0C] text-[#D7E2EA] font-sans scroll-smooth"
      >
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#a3e635]/5 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#a3e635]/3 blur-[180px] pointer-events-none" />

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 py-8 relative z-10 flex flex-col gap-8">
          
          {/* Header Row - Back button */}
          <div className="flex items-center justify-between w-full">
            <button
              onClick={onClose}
              className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#D7E2EA]/60 hover:text-white transition-colors duration-300 focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/20 group-hover:bg-white/5 transition-all duration-300">
                <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
              </div>
              <span style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>Back to Home</span>
            </button>
          </div>

          {/* Title Block & Right Widget */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mt-4">
            <div className="flex flex-col items-start gap-4 text-left max-w-2xl">
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#a3e635] select-none">
                <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635] shadow-[0_0_6px_#a3e635]" />
                <span>/ Projects Archive</span>
              </div>

              <h1
                style={{ fontFamily: '"Bebas Neue", sans-serif' }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider text-white uppercase leading-[0.95]"
              >
                All{' '}
                <span
                  style={{
                    WebkitTextStroke: '1.5px #a3e635',
                    color: 'transparent',
                    textShadow: '0 0 15px rgba(163,230,53,0.15)',
                  }}
                >
                  Projects
                </span>
              </h1>

              <p className="text-xs sm:text-sm md:text-base font-light text-[#D7E2EA]/55 max-w-xl leading-relaxed mt-2">
                Explore the complete collection of projects I've built. Each one represents a step in my journey of learning and creating impact.
              </p>
            </div>

            {/* Total Projects Card widget */}
            <div className="rounded-2xl border border-white/10 bg-[#0f0f12] p-5 flex items-center justify-between gap-6 w-full lg:max-w-[340px] relative overflow-hidden self-start lg:self-auto shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <div className="flex flex-col gap-1 z-10">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#D7E2EA]/40">
                  Total Projects
                </span>
                <span className="text-3xl sm:text-4xl font-extrabold text-white leading-none mt-1">
                  {String(ALL_PROJECTS.length).padStart(2, '0')}+
                </span>
                <span className="text-[10px] text-[#D7E2EA]/40 font-medium mt-1">
                  and more in progress
                </span>
              </div>
              {/* Glowing light behind graph */}
              <div className="absolute top-1/2 right-4 -translate-y-1/2 w-20 h-20 rounded-full bg-[#a3e635]/5 blur-[20px] pointer-events-none" />
              {/* Mini SVG line graph */}
              <div className="w-28 h-12 z-10 select-none">
                <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a3e635" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 5,45 Q 25,25 45,35 T 85,15 L 85,50 L 5,50 Z"
                    fill="url(#chart-glow)"
                    stroke="none"
                  />
                  <path
                    d="M 5,45 Q 25,25 45,35 T 85,15"
                    fill="none"
                    stroke="#a3e635"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="85" cy="15" r="4" fill="#a3e635" className="animate-pulse" />
                  <circle cx="85" cy="15" r="7" fill="#a3e635" fillOpacity="0.25" className="animate-ping" style={{ animationDuration: '3s' }} />
                </svg>
              </div>
            </div>
          </div>

          {/* Controls Bar: Filter, Search & Sort */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-white/10 pb-6 mt-8">
            {/* Filters */}
            <div className="flex flex-wrap gap-2.5">
              {FILTERS.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => handleFilterChange(filter)}
                    className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 border ${
                      isActive
                        ? 'border-[#a3e635] text-[#a3e635] bg-[#a3e635]/5 shadow-[0_0_12px_rgba(163,230,53,0.15)]'
                        : 'bg-[#0f0f12] border-white/5 text-[#D7E2EA]/50 hover:text-white hover:border-white/15'
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            {/* Search & Sort Group */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative flex-1 md:flex-initial md:w-64">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full bg-[#0f0f12] border border-white/5 focus:border-[#a3e635]/50 focus:outline-none rounded-full px-5 py-2.5 text-xs text-white placeholder-[#D7E2EA]/30 pr-10 transition-colors duration-300 font-semibold"
                />
                <Search size={13} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D7E2EA]/30" />
              </div>

              {/* Sorting Dropdown */}
              <div className="relative shrink-0 w-32">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full bg-[#0f0f12] border border-white/5 focus:border-[#a3e635]/50 focus:outline-none rounded-full px-5 py-2.5 text-[10px] text-white appearance-none pr-10 cursor-pointer transition-colors duration-300 font-bold uppercase tracking-wider"
                >
                  <option value="Latest">Latest</option>
                  <option value="Oldest">Oldest</option>
                </select>
                <ChevronDown size={13} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D7E2EA]/30 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-4">
            {displayedProjects.length > 0 ? (
              displayedProjects.map((project) => (
                <article
                  key={project.name}
                  onClick={() => onViewProjectDetails(project)}
                  className="group flex flex-col rounded-2xl border border-white/10 bg-[#0f0f12] p-5 transition-all duration-500 hover:border-white/20 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] cursor-pointer relative overflow-hidden"
                >
                  {/* Glowing background light */}
                  <div
                    className="absolute -top-10 right-0 w-[200px] h-[200px] rounded-full blur-[100px] pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{ background: `rgb(${project.accentRgb})` }}
                  />

                  {/* Card Thumbnail Container */}
                  <div className="w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/5 bg-[#16161a] relative shadow-md">
                    <img
                      src={project.mainImage}
                      alt={`${project.name} preview`}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                      loading="lazy"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                    
                    {/* External link button */}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#0C0C0C]/85 border border-white/10 hover:border-[#a3e635] hover:text-[#a3e635] hover:scale-105 active:scale-95 flex items-center justify-center text-white transition-all duration-300 z-20"
                      >
                        <ArrowUpRight size={15} />
                      </a>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="mt-4 flex flex-col gap-1 flex-1">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#a3e635]">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-white tracking-wide mt-0.5 group-hover:text-[#a3e635] transition-colors duration-300 truncate">
                      {project.name}
                    </h3>
                    <p className="text-xs text-[#D7E2EA]/50 font-light mt-2 line-clamp-3 leading-relaxed">
                      {project.desc}
                    </p>
                  </div>

                  {/* Specs & Tech Stack Badges */}
                  <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-[#D7E2EA]/40 text-[10px] font-mono">
                    <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                      {project.tech.slice(0, 3).map((t) => (
                        <span key={t} className="text-[9px] font-semibold uppercase tracking-wider text-[#D7E2EA]/50 border border-white/5 bg-white/[0.01] px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 shrink-0 ml-4">
                      <Calendar size={12} className="text-[#a3e635]/65" />
                      <span>{project.year}</span>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-center gap-3">
                <span className="text-3xl">🔍</span>
                <h3 className="text-lg font-bold text-white">No projects found</h3>
                <p className="text-xs text-[#D7E2EA]/40">Try adjusting your filters or search keyword</p>
              </div>
            )}
          </section>

          {/* Pagination bar */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center gap-4 mt-12 pb-12">
              <div className="flex items-center gap-2">
                {/* Prev page */}
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-[#D7E2EA]/60 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 focus:outline-none"
                >
                  <ChevronLeft size={16} />
                </button>

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, idx) => {
                  const p = idx + 1;
                  const isActive = p === currentPage;
                  return (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`w-10 h-10 rounded-lg font-bold text-xs uppercase transition-all duration-300 focus:outline-none ${
                        isActive
                          ? 'bg-[#a3e635] text-black border border-[#a3e635] shadow-[0_0_15px_rgba(163,230,53,0.25)]'
                          : 'border border-white/10 text-[#D7E2EA]/60 hover:text-white hover:border-white/20'
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}

                {/* Next page */}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-[#D7E2EA]/60 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 focus:outline-none"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              <span className="text-xs text-[#D7E2EA]/40 font-mono">
                Showing {filteredProjects.length > 0 ? (currentPage - 1) * PAGE_SIZE + 1 : 0}-
                {Math.min(currentPage * PAGE_SIZE, filteredProjects.length)} of{' '}
                <span className="text-white font-semibold">{filteredProjects.length}</span> projects
              </span>
            </div>
          )}

        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default AllProjectsOverlay;
