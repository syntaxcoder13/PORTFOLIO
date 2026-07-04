import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectDetailsOverlay from '../overlays/ProjectDetailsOverlay';
import AllProjectsOverlay from '../overlays/AllProjectsOverlay';
import { ALL_PROJECTS } from '../../data/projects';
import type { ProjectData } from '../../types/project.types';

gsap.registerPlugin(ScrollTrigger);

const FEATURED_PROJECTS: ProjectData[] = ALL_PROJECTS;

// ---------------------------------------------------------------------------
// ProjectCard — horizontal marquee card matching reference design
// ---------------------------------------------------------------------------
interface ProjectCardProps {
  project: ProjectData;
  onViewProject: (project: ProjectData) => void;
}

const ProjectCard = ({ project, onViewProject }: ProjectCardProps) => {
  return (
    <div
      onClick={() => onViewProject(project)}
      className="group flex flex-col w-[320px] sm:w-[460px] md:w-[540px] shrink-0 rounded-2xl border border-white/10 bg-[#0f0f12] p-5 transition-all duration-500 hover:border-white/20 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] cursor-pointer relative overflow-hidden group-hover/track:opacity-40 group-hover/track:blur-[3px] group-hover/track:scale-[0.92] hover:!opacity-100 hover:!blur-none hover:!scale-100"
    >
      {/* Ambient background light keyed to project accent */}
      <div
        className="absolute -top-10 right-0 w-[240px] h-[240px] rounded-full blur-[110px] pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-500"
        style={{ background: `rgb(${project.accentRgb})` }}
      />

      {/* Project Thumbnail Image */}
      <div className="w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/5 bg-[#16161a] relative shadow-md">
        <img
          src={project.mainImage}
          alt={`${project.name} preview`}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
          loading="lazy"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Title & Metadata */}
      <div className="mt-4 flex flex-col gap-2 z-10">
        <h3 className="text-lg sm:text-2xl font-bold text-white tracking-wide truncate group-hover:text-[#a3e635] transition-colors duration-300">
          {project.name}
        </h3>
        <p className="text-xs sm:text-sm text-[#D7E2EA]/50 font-light truncate">
          {project.category} • {project.year}
        </p>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// ProjectsSection — main section wrapper
// ---------------------------------------------------------------------------
const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isAllProjectsOpen, setIsAllProjectsOpen] = useState(false);



  // GSAP scroll entry animations
  useEffect(() => {
    const triggerEl = sectionRef.current;
    if (!triggerEl) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top 80%',
        toggleActions: 'play none none none',
        id: 'projects-header-trigger',
      },
    });

    tl.fromTo(
      [tagRef.current, titleRef.current, lineRef.current, descRef.current],
      { y: 45, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
    );

    const btnTl = gsap.timeline({
      scrollTrigger: {
        trigger: buttonRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none',
        id: 'projects-button-trigger',
      },
    });

    btnTl.fromTo(
      buttonRef.current,
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

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative z-30 w-full rounded-t-2xl sm:rounded-t-3xl bg-[#0C0C0C] px-6 sm:px-12 md:px-20 pt-20 sm:pt-24 md:pt-32 pb-24 border-t border-white/10 shadow-[0_-25px_60px_rgba(0,0,0,0.45)]"
    >
      {/* Editorial Header */}
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

        <div ref={lineRef} className="w-12 h-[2px] bg-white/10 my-2 opacity-0" />

        <p
          ref={descRef}
          className="text-sm sm:text-base md:text-lg font-light text-[#D7E2EA]/65 max-w-xl leading-relaxed opacity-0"
        >
          Featured projects and web platforms I have built recently
        </p>
      </div>

      {/* Cards Marquee Loop */}
      <div className="relative -mx-6 sm:-mx-12 md:-mx-20 overflow-hidden my-12 py-4">
        {/* Gradient edge overlays */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent z-10 pointer-events-none" />

        {/* Continuous marquee track */}
        <div className="animate-marquee flex gap-8 sm:gap-12 group/track">
          {[...FEATURED_PROJECTS, ...FEATURED_PROJECTS, ...FEATURED_PROJECTS, ...FEATURED_PROJECTS].map((project, idx) => (
            <ProjectCard
              key={`${project.number}-${idx}`}
              project={project}
              onViewProject={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* View More Button */}
      <div
        ref={buttonRef}
        className="mt-16 sm:mt-20 flex justify-center z-20 relative opacity-0"
      >
        <button
          onClick={() => setIsAllProjectsOpen(true)}
          className="group/all-btn inline-flex items-center justify-center gap-3 rounded-full border border-[#a3e635]/30 bg-[#a3e635]/5 px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#a3e635] hover:bg-[#a3e635] hover:border-[#a3e635] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(163,230,53,0.15)] hover:shadow-[0_0_25px_rgba(163,230,53,0.35)] btn-shine"
        >
          <span>View More</span>
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
