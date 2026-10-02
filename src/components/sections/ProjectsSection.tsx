import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, ExternalLink, Github, Eye, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectDetailsOverlay from '../overlays/ProjectDetailsOverlay';
import AllProjectsOverlay from '../overlays/AllProjectsOverlay';
import { ALL_PROJECTS } from '../../data/projects';
import type { ProjectData } from '../../types/project.types';

gsap.registerPlugin(ScrollTrigger);

interface EditorialProjectItem extends ProjectData {
  roleCategory: string;
  awardsText: string[];
  clientOrOrg: string;
}

const EDITORIAL_PROJECTS: EditorialProjectItem[] = [
  {
    ...ALL_PROJECTS[0],
    number: '01',
    name: 'HireMetrics AI',
    category: 'Autonomous Voice Screening Platform',
    roleCategory: 'Lead Developer\nAI & Voice Architect',
    clientOrOrg: 'AI Talent Acquisition Suite',
    awardsText: ['90% HR Overhead Reduced', 'Real-Time Voice Synthesis', '<240ms Latency'],
    desc: 'An AI-powered candidate interview platform designed to conduct autonomous spoken assessments, evaluate technical responses dynamically, and aggregate recruiter pipelines.',
  },
  {
    ...ALL_PROJECTS[1],
    number: '02',
    name: 'CrisisConnect',
    category: 'Mission Control & AI Emergency Triage',
    roleCategory: 'Full Stack Engineer\nGeospatial Dev',
    clientOrOrg: 'Tactical Disaster Telemetry',
    awardsText: ['60% Faster Dispatch', 'Hands-Free AI Voice Triage', 'Offline PWA Cache'],
    desc: 'A next-generation decentralized platform designed to synchronize emergency responders, resource logistics, and victim assistance in real-time with live geospatial maps.',
  },
  {
    ...ALL_PROJECTS[2],
    number: '03',
    name: 'Learnivo AI',
    category: 'EdTech Lesson Planning Engine',
    roleCategory: 'Frontend Design Intern\nUI/UX Architect',
    clientOrOrg: 'Vasudev AI Labs',
    awardsText: ['55K+ Teachers Onboarded', '2.1M Lesson Plans Generated', 'Regional Language Support'],
    desc: 'An AI-driven curriculum planning assistant designed for modern Indian classrooms to automate lesson generation, worksheet creation, and administrative workflows.',
  },
  {
    ...ALL_PROJECTS[3],
    number: '04',
    name: 'Bhavna Portal',
    category: 'Vocational Training & Course Discovery',
    roleCategory: 'Frontend Dev Intern\nInteraction Dev',
    clientOrOrg: 'Bhavna Institute Meerut',
    awardsText: ['12K+ Active Enrollments', '24 Job-Ready Modules', '100% Responsive Catalog'],
    desc: 'A centralized educational discovery platform built to showcase practical job-oriented computer training programs and simplify demo class registrations.',
  },
];

const ProjectsSection = () => {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isAllProjectsOpen, setIsAllProjectsOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  const activeProject = EDITORIAL_PROJECTS[activeProjectIndex];

  // GSAP ScrollTrigger to detect which project card on the left is in focus
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, idx) => {
        if (!card) return;

        ScrollTrigger.create({
          trigger: card,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => setActiveProjectIndex(idx),
          onEnterBack: () => setActiveProjectIndex(idx),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Smooth cross-fade when active project changes
  useEffect(() => {
    if (rightPanelRef.current) {
      gsap.fromTo(
        rightPanelRef.current,
        { opacity: 0.35, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [activeProjectIndex]);

  const scrollToProjectCard = (idx: number) => {
    const targetCard = cardRefs.current[idx];
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative z-30 w-full min-h-screen bg-[#FAF9F6] text-neutral-900 py-20 sm:py-28 px-6 sm:px-10 md:px-16 overflow-visible select-none"
      style={{
        background:
          'radial-gradient(ellipse 95% 85% at 50% 15%, #FFFFFF 0%, #FAF8F5 50%, #ECE8E1 100%)',
      }}
    >
      {/* Background Subtle Accent Grids matching Hero/About */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-white/70 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="relative z-20 max-w-[1600px] mx-auto w-full">
        
        {/* ================= SECTION HEADER (Matching Hero & About Theme) ================= */}
        <div className="mb-16 sm:mb-24 text-center max-w-4xl mx-auto flex flex-col items-center gap-4 sm:gap-5">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-300 bg-white/80 backdrop-blur-md shadow-xs text-xs font-mono tracking-widest text-neutral-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>[ 02 / SELECTED CASE STUDIES ]</span>
          </div>

          {/* Main Editorial Headline */}
          <h2
            style={{ fontFamily: '"Playfair Display", "Newsreader", "Instrument Serif", Georgia, serif' }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] text-[#111111] font-normal tracking-tight leading-[1.08]"
          >
            Crafted with intent <br />
            <span className="italic font-normal text-neutral-700">& engineering excellence.</span>
          </h2>

          {/* Subtitle */}
          <p
            style={{ fontFamily: '"Plus Jakarta Sans", Inter, sans-serif' }}
            className="text-xs sm:text-sm md:text-[15px] text-neutral-600 max-w-xl mx-auto font-normal leading-relaxed"
          >
            A curated showcase of high-performance web applications, autonomous AI architectures, and interactive digital brand experiences.
          </p>
        </div>

        {/* Main Split-Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ================= LEFT COLUMN: Natural Vertical Scrolling Project Cards ================= */}
          <div className="lg:col-span-7 flex flex-col gap-16 sm:gap-24">
            
            {EDITORIAL_PROJECTS.map((project, idx) => {
              const isActive = activeProjectIndex === idx;

              return (
                <div
                  key={project.number}
                  ref={(el) => (cardRefs.current[idx] = el)}
                  onClick={() => setSelectedProject(project)}
                  className={`group relative flex flex-col gap-4 cursor-pointer transition-all duration-500 bg-white/90 backdrop-blur-xl border border-white/90 sm:border-neutral-200/80 rounded-3xl p-4 sm:p-6 shadow-[0_18px_45px_rgba(0,0,0,0.06)] hover:shadow-[0_28px_65px_rgba(0,0,0,0.12)] hover:border-neutral-300 ${
                    isActive ? 'opacity-100 ring-2 ring-neutral-900/10' : 'opacity-85'
                  }`}
                >
                  {/* Card Header Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-100 text-xs font-mono">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-neutral-900 text-white font-bold tracking-wider text-[11px]">
                        {project.number}
                      </span>
                      <span className="text-neutral-900 font-bold uppercase tracking-wider text-[13px]">
                        {project.name}
                      </span>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-neutral-100/90 border border-neutral-200/70 text-neutral-600 text-[11px] hidden sm:inline uppercase tracking-widest font-medium">
                      {project.category}
                    </span>
                  </div>

                  {/* Main Cinematic Image Card */}
                  <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80">
                    <img
                      src={project.mainImage}
                      alt={project.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                    {/* Hover Action Center Badge */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="px-6 py-3 rounded-full bg-neutral-950 text-white font-mono font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-2xl scale-95 group-hover:scale-100 transition-transform">
                        <Eye size={14} />
                        <span>VIEW CASE STUDY</span>
                        <ArrowUpRight size={14} />
                      </div>
                    </div>

                    {/* Bottom Image Info Strip */}
                    <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between pointer-events-none">
                      <div>
                        <span className="block text-base sm:text-xl font-bold text-white tracking-tight uppercase drop-shadow-md">
                          {project.name}
                        </span>
                        <span className="text-xs text-white/80 font-mono">
                          {project.displayUrl}
                        </span>
                      </div>

                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-white/90 border border-white/20 uppercase font-semibold">
                        EXPAND ↗
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>

          {/* ================= RIGHT COLUMN: Sticky Editorial Info Panel (Desktop only) ================= */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-20 xl:top-24">
            
            <div
              ref={rightPanelRef}
              className="bg-white/90 backdrop-blur-xl border border-neutral-200/80 rounded-3xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col justify-between space-y-4 sm:space-y-4.5 text-left"
            >
              {/* 1. Quick Project Jump Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-100">
                <div className="flex flex-wrap items-center gap-1.5">
                  {EDITORIAL_PROJECTS.map((p, idx) => {
                    const isActive = activeProjectIndex === idx;
                    return (
                      <button
                        key={p.number}
                        onClick={() => scrollToProjectCard(idx)}
                        className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 cursor-pointer ${
                          isActive
                            ? 'bg-neutral-950 text-white shadow-md scale-105'
                            : 'bg-neutral-100 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200'
                        }`}
                      >
                        {p.number}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-1.5 text-neutral-400">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-neutral-900">
                    <path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z" />
                  </svg>
                  <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-neutral-500">
                    0{EDITORIAL_PROJECTS.length} CASES
                  </span>
                </div>
              </div>

              {/* 2. Editorial Headline with Serif Touch */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase font-bold">
                    IN FOCUS [{activeProject.number} / 0{EDITORIAL_PROJECTS.length}]
                  </span>
                </div>

                <h3
                  style={{ fontFamily: '"Playfair Display", "Newsreader", "Instrument Serif", Georgia, serif' }}
                  className="text-2xl sm:text-3xl lg:text-[32px] font-normal tracking-tight text-neutral-950 leading-tight"
                >
                  {activeProject.name}
                </h3>
                <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider mt-0.5">
                  {activeProject.category}
                </p>
              </div>

              {/* 3. Structured Metadata Grid (INFO, ROLE, AWARDS, DEV) in Clean Soft Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs">
                
                {/* INFO Column */}
                <div className="bg-neutral-50/80 border border-neutral-200/60 rounded-xl p-3 space-y-1">
                  <span className="text-neutral-400 font-mono font-bold uppercase tracking-widest block text-[9.5px]">
                    OVERVIEW
                  </span>
                  <p className="text-neutral-700 leading-snug font-normal text-[11px] line-clamp-3">
                    {activeProject.desc}
                  </p>
                </div>

                {/* ROLE Column */}
                <div className="bg-neutral-50/80 border border-neutral-200/60 rounded-xl p-3 space-y-1">
                  <span className="text-neutral-400 font-mono font-bold uppercase tracking-widest block text-[9.5px]">
                    ROLE & CONTRIBUTION
                  </span>
                  <div className="text-neutral-900 font-bold leading-tight whitespace-pre-line font-mono text-[11px]">
                    {activeProject.roleCategory}
                  </div>
                </div>

                {/* AWARDS / HIGHLIGHTS Column */}
                <div className="bg-neutral-50/80 border border-neutral-200/60 rounded-xl p-3 space-y-1">
                  <span className="text-neutral-400 font-mono font-bold uppercase tracking-widest block text-[9.5px]">
                    KEY METRICS
                  </span>
                  <div className="space-y-0.5 text-neutral-800 font-medium text-[10.5px]">
                    {activeProject.awardsText.map((award, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="text-emerald-600 font-bold">✦</span>
                        <span className="truncate">{award}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DEV / CREATOR Column */}
                <div className="bg-neutral-50/80 border border-neutral-200/60 rounded-xl p-3 space-y-1">
                  <span className="text-neutral-400 font-mono font-bold uppercase tracking-widest block text-[9.5px]">
                    LEAD ENGINEER
                  </span>
                  <div className="text-neutral-950 font-bold font-mono text-[11px]">
                    ARNAY TIWARI
                  </div>
                  <a
                    href="https://miidaystudio.online/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-neutral-500 hover:text-black font-mono text-[10px] mt-0.5 transition-colors"
                  >
                    <span>Founder @ MiidayStudio</span>
                    <ExternalLink size={10} />
                  </a>
                </div>

              </div>

              {/* 4. Tech Stack Tags */}
              <div>
                <span className="text-neutral-400 font-mono font-bold uppercase tracking-widest block text-[9.5px] mb-1.5">
                  TECHNOLOGY & ARCHITECTURE
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-full bg-white text-neutral-800 font-mono text-[10px] font-semibold uppercase tracking-wider border border-neutral-200/80 shadow-2xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* 5. Action Buttons (VISIT & FULL CASE STUDY) */}
              <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-2.5 border-t border-neutral-100">
                {activeProject.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-mono font-bold text-[11px] uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer"
                  >
                    <span>VISIT {activeProject.displayUrl || 'PROJECT'}</span>
                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    />
                  </a>
                )}

                {activeProject.githubUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 sm:p-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-800 transition-colors"
                    aria-label="GitHub Repository"
                  >
                    <Github size={14} />
                  </a>
                )}

                <button
                  onClick={() => setSelectedProject(activeProject)}
                  className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-900 font-mono text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-2xs"
                >
                  <span>Full Case Study</span>
                  <ExternalLink size={12} />
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Section Bar */}
        <div className="mt-20 sm:mt-28 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-200 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-3">
            <span className="text-neutral-900 font-bold">ARNAY TIWARI</span>
            <span>•</span>
            <span>PORTFOLIO CASE STUDIES © 2026</span>
          </div>

          <button
            onClick={() => setIsAllProjectsOpen(true)}
            className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-neutral-300 bg-white hover:bg-neutral-950 hover:border-neutral-950 hover:text-white text-neutral-800 font-semibold text-xs tracking-wider transition-all duration-300 cursor-pointer shadow-xs"
          >
            <span>VIEW ALL CASES ARCHIVE</span>
            <ArrowUpRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>

      </div>

      {/* Project Details Modal Overlay */}
      <ProjectDetailsOverlay
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        totalProjects={EDITORIAL_PROJECTS.length}
      />

      {/* All Projects Archive Modal Overlay */}
      <AllProjectsOverlay
        open={isAllProjectsOpen}
        onClose={() => setIsAllProjectsOpen(false)}
        onViewProjectDetails={setSelectedProject}
      />
    </section>
  );
};

export default ProjectsSection;
