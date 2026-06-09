import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectDetailsOverlay from './ProjectDetailsOverlay';
import AllProjectsOverlay from './AllProjectsOverlay';
import { ALL_PROJECTS, ProjectData } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS: ProjectData[] = ALL_PROJECTS.slice(0, 3);


interface ProjectCardProps {
  project: ProjectData;
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLDivElement>;
  onViewProject: (project: ProjectData) => void;
}

const ProjectCard = ({ project, index, total, containerRef, onViewProject }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="relative lg:sticky top-auto lg:top-[var(--sticky-top)] h-auto lg:h-[78vh] w-full mb-12 lg:mb-0"
      style={{ '--sticky-top': `${80 + index * 32}px` } as React.CSSProperties}
    >
      <motion.article
        style={{ scale: isDesktop ? scale : 1 }}
        className="origin-top mx-auto h-full w-full flex flex-col lg:grid lg:grid-cols-12 gap-8 rounded-xl border border-white/10 bg-[#0f0f12] p-6 sm:p-8 md:p-10 relative overflow-hidden transition-colors duration-500 hover:border-white/20"
      >
        {/* Subtle, blurred ambient background light */}
        <div
          className="absolute -top-10 right-0 w-[300px] h-[300px] rounded-full blur-[120px] pointer-events-none opacity-5 transition-opacity duration-500 group-hover:opacity-10"
          style={{ background: `rgb(${project.accentRgb})` }}
        />

        {/* LEFT COLUMN: Metadata & Typographic Spec Sheet (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full z-10">
          <div className="flex flex-col gap-5">
            {/* Number + Category */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-xl font-semibold text-white/20">
                0{project.number}
              </span>
              {project.isLive ? (
                <span
                  className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded bg-emerald-500/5 border border-emerald-500/15 text-emerald-400"
                >
                  <span className="relative flex h-1.5 w-1.5 mr-0.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                  </span>
                  Live
                </span>
              ) : (
                <span
                  className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded bg-red-500/5 border border-red-500/15 text-red-400"
                >
                  <span className="relative flex h-1.5 w-1.5 mr-0.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                  </span>
                  Building
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#D7E2EA] hover:text-white transition-colors duration-300">
              {project.name}
            </h3>

            {/* Feature Description */}
            <p className="text-xs sm:text-sm font-light text-[#D7E2EA]/50 leading-relaxed">
              {project.desc}
            </p>

            {/* Core Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-y border-white/5 py-4 my-1">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-white/20 font-bold block mb-1">Deliverables</span>
                <ul className="flex flex-col gap-1">
                  {project.features.map((feat) => (
                    <li key={feat} className="text-[11px] text-[#D7E2EA]/75 font-medium">
                      ✦ {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-white/20 font-bold block mb-1">Role</span>
                  <span className="text-[11px] text-[#D7E2EA]/85 font-semibold uppercase tracking-wider">{project.role}</span>
                </div>
                <div className="mt-2">
                  <span className="text-[9px] uppercase tracking-widest text-white/20 font-bold block mb-1">Year</span>
                  <span className="text-[11px] text-[#D7E2EA]/60 font-mono">{project.year}</span>
                </div>
              </div>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="text-[9px] font-semibold uppercase tracking-wider text-[#D7E2EA]/60 bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Clean Action Button */}
          <div className="pt-4 mt-6 lg:mt-0 border-t border-white/5">
            <button
              onClick={() => onViewProject(project)}
              className="group/btn inline-flex items-center justify-center w-fit gap-3 rounded-lg border border-white/10 bg-white/[0.01] hover:bg-[#a3e635] hover:border-[#a3e635] px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white hover:text-black transition-all duration-300 btn-shine"
            >
              <span>View Project</span>
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Static Sleek Browser Showcase (lg:col-span-7) */}
        <div className="lg:col-span-7 flex items-center justify-center w-full z-10 min-h-[220px] sm:min-h-[300px] lg:min-h-0 flex-1 relative">
          <div className="w-full aspect-[16/10] lg:aspect-auto lg:h-[88%] rounded-lg border border-white/10 bg-[#16161a] overflow-hidden flex flex-col shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-colors duration-500 hover:border-white/20 relative group/browser">

            {/* Top address bar chrome */}
            <div className="h-8 bg-[#1f1f24] border-b border-white/5 flex items-center px-4 justify-between shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
              </div>
              <div className="bg-[#121215] text-[9px] text-[#D7E2EA]/30 font-mono px-6 py-0.5 rounded max-w-[180px] text-center tracking-wider truncate">
                {project.displayUrl}
              </div>
              <div className="w-10" />
            </div>

            {/* Static Image Box with simple hover scale */}
            <div className="flex-1 w-full overflow-hidden bg-[#0c0c0c] relative flex items-center justify-center">
              <img
                src={project.mainImage}
                alt={`${project.name} preview`}
                className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover/browser:scale-[1.025]"
                loading="lazy"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>

          </div>
        </div>
      </motion.article>
    </div>
  );
};

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isAllProjectsOpen, setIsAllProjectsOpen] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    setIsMobile(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    const handleOpenAll = () => setIsAllProjectsOpen(true);
    window.addEventListener('open-all-projects', handleOpenAll);
    return () => window.removeEventListener('open-all-projects', handleOpenAll);
  }, []);

  useEffect(() => {
    const triggerEl = sectionRef.current;
    if (!triggerEl) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top 80%',
        toggleActions: 'play none none none',
        id: 'projects-header-trigger',
      }
    });

    tl.fromTo([tagRef.current, titleRef.current, lineRef.current, descRef.current],
      { y: 45, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
    );

    const btnTl = gsap.timeline({
      scrollTrigger: {
        trigger: buttonRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none',
        id: 'projects-button-trigger',
      }
    });

    btnTl.fromTo(buttonRef.current,
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
    );

    const scrollTrigger = ScrollTrigger.create({
      trigger: triggerEl,
      start: 'top top',
      id: 'projects-scroll',
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      btnTl.scrollTrigger?.kill();
      btnTl.kill();
      scrollTrigger.kill();
    };
  }, []);

  const visibleProjects = isMobile ? PROJECTS.slice(0, 2) : PROJECTS;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative z-30 w-full rounded-t-2xl sm:rounded-t-3xl bg-[#0C0C0C] px-6 sm:px-12 md:px-20 pt-20 sm:pt-24 md:pt-32 pb-24 border-t border-white/10 shadow-[0_-25px_60px_rgba(0,0,0,0.45)]"
    >
      {/* Editorial Header aligning with About/Hero theme */}
      <div className="max-w-7xl mx-auto w-full mb-16 sm:mb-20 md:mb-24 flex flex-col items-start gap-5 text-left">
        <div
          ref={tagRef}
          className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#D7E2EA]/50 select-none opacity-0"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635] shadow-[0_0_6px_#a3e635]" />
          <span>Portfolio</span>
        </div>

        <h2
          ref={titleRef}
          style={{ fontFamily: '"Bebas Neue", sans-serif' }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider text-white leading-[1.05] opacity-0"
        >
          Featured <span className="text-[#a3e635]">Projects</span>
        </h2>

        <div
          ref={lineRef}
          className="w-12 h-[2px] bg-white/10 my-2 opacity-0"
        />

        <p
          ref={descRef}
          className="text-sm sm:text-base md:text-lg font-light text-[#D7E2EA]/65 max-w-xl leading-relaxed opacity-0"
        >
          Featured projects and web platforms I have built recently
        </p>
      </div>

      <div ref={containerRef} className="mx-auto max-w-7xl">
        {visibleProjects.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            total={visibleProjects.length}
            containerRef={containerRef}
            onViewProject={setSelectedProject}
          />
        ))}
      </div>

      {/* View All Projects Button */}
      <div
        ref={buttonRef}
        className="mt-16 sm:mt-20 flex justify-center z-20 relative opacity-0"
      >
        <button
          onClick={() => setIsAllProjectsOpen(true)}
          className="group/all-btn inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-widest text-white hover:bg-[#a3e635] hover:border-[#a3e635] hover:text-black transition-all duration-300 btn-shine"
        >
          <span>View All Projects</span>
          <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/all-btn:translate-x-0.5 group-hover/all-btn:-translate-y-0.5" />
        </button>
      </div>

      <ProjectDetailsOverlay
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        totalProjects={ALL_PROJECTS.length}
      />

      <AllProjectsOverlay
        open={isAllProjectsOpen}
        onClose={() => setIsAllProjectsOpen(false)}
        onViewProjectDetails={setSelectedProject}
      />
    </section>
  );
};

export default ProjectsSection;
