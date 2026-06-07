import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import FadeIn from './FadeIn';

interface ProjectData {
  number: string;
  category: string;
  name: string;
  liveUrl: string;
  desc: string;
  features: string[];
  tech: string[];
  role: string;
  year: string;
  accentRgb: string;
  mainImage: string;
}

const PROJECTS: ProjectData[] = [
  {
    number: '01',
    category: 'Visual Platform',
    name: 'Forge',
    liveUrl: 'https://forge-pink-seven.vercel.app/',
    desc: 'Visual editor with real-time controls, instant component exportation, and optimized Tailwind code generators.',
    features: ['Visual Canvas Editor', 'React/HTML Export Code', 'Tailwind Generator'],
    tech: ['React', 'Framer Motion', 'TailwindCSS'],
    role: 'Lead Developer',
    year: '2026',
    accentRgb: '244, 63, 94', // Rose
    mainImage: '/Forge.png',
  },
  {
    number: '02',
    category: 'Legal / Web3',
    name: 'LawLab',
    liveUrl: 'https://lawlab-self.vercel.app',
    desc: 'Decentralized onboarding and document verification platform tailored for legal consultancies.',
    features: ['Secure Document Verification', 'Client Onboarding flows', 'PostgreSQL Database'],
    tech: ['Next.js', 'PostgreSQL', 'TypeScript'],
    role: 'Full Stack Engineer',
    year: '2025',
    accentRgb: '245, 158, 11', // Gold
    mainImage: '/lawlab.png',
  },
  {
    number: '03',
    category: 'AI / SaaS',
    name: 'ResumeIQ',
    liveUrl: 'https://resumeiq-harsh.vercel.app/',
    desc: 'Automated resume screening using Gemini AI to grade experience and generate target reports.',
    features: ['AI Resume Screening', 'Gemini Analytics Reports', 'PDF CV Extractors'],
    tech: ['Gemini API', 'React', 'Node.js'],
    role: 'AI Engineer',
    year: '2025',
    accentRgb: '16, 185, 129', // Emerald
    mainImage: '/resumeiq-hero.png',
  },
  {
    number: '04',
    category: 'Creative Design',
    name: 'Notch',
    liveUrl: 'https://notch-zeta.vercel.app/',
    desc: 'Immersive landing page concept highlighting smooth custom GSAP timeline transitions.',
    features: ['GSAP Layout Transitions', 'Interactive pricing widgets', 'Smooth scroll parallax'],
    tech: ['GSAP', 'Vite', 'React'],
    role: 'Creative Developer',
    year: '2025',
    accentRgb: '168, 85, 247', // Purple
    mainImage: '/notch-hero.png',
  },
];

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

const ProjectCard = ({ project, index, total, containerRef }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="sticky top-20 md:top-24 h-[84vh] md:h-[78vh] w-full"
      style={{ top: `${80 + index * 32}px` }}
    >
      <motion.article
        style={{ scale }}
        className="origin-top mx-auto h-full w-full flex flex-col lg:grid lg:grid-cols-12 gap-8 rounded-[28px] border border-white/10 bg-[#0f0f12] p-6 sm:p-8 md:p-10 relative overflow-hidden transition-colors duration-500 hover:border-white/20"
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
              <span 
                className="text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded"
                style={{ 
                  color: `rgb(${project.accentRgb})`,
                  backgroundColor: `rgba(${project.accentRgb}, 0.04)`,
                  border: `1px solid rgba(${project.accentRgb}, 0.15)`
                }}
              >
                {project.category}
              </span>
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
            <div className="grid grid-cols-2 gap-6 border-y border-white/5 py-4 my-1">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-white/20 font-bold block mb-1">Deliverables</span>
                <ul className="flex flex-col gap-1">
                  {project.features.map((feat) => (
                    <li key={feat} className="text-[11px] text-[#D7E2EA]/75 font-medium truncate">
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
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center justify-center w-fit gap-4 rounded-xl border border-white/10 bg-white/[0.01] hover:bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white hover:text-black transition-all duration-300"
            >
              <span>Launch Live Site</span>
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Static Sleek Browser Showcase (lg:col-span-7) */}
        <div className="lg:col-span-7 flex items-center justify-center w-full z-10 min-h-[220px] sm:min-h-[300px] lg:min-h-0 flex-1 relative">
          <div className="w-full h-full lg:h-[88%] rounded-2xl border border-white/10 bg-[#16161a] overflow-hidden flex flex-col shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-colors duration-500 hover:border-white/20 relative group/browser">
            
            {/* Top address bar chrome */}
            <div className="h-8 bg-[#1f1f24] border-b border-white/5 flex items-center px-4 justify-between shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
              </div>
              <div className="bg-[#121215] text-[9px] text-[#D7E2EA]/30 font-mono px-6 py-0.5 rounded max-w-[180px] text-center tracking-wider truncate">
                {project.name.toLowerCase()}.com
              </div>
              <div className="w-10" />
            </div>

            {/* Static Image Box with simple hover scale */}
            <div className="flex-1 w-full overflow-hidden bg-[#111] relative">
              <img
                src={project.mainImage}
                alt={`${project.name} preview`}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/browser:scale-[1.025]"
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

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[#0C0C0C] px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24"
    >
      <div className="mb-16 sm:mb-20 md:mb-24 text-center">
        <FadeIn y={40}>
          <h2
            className="hero-heading font-black uppercase tracking-tight leading-none mb-4"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Project
          </h2>
        </FadeIn>
        <FadeIn delay={0.12} y={20}>
          <p className="font-light uppercase tracking-[0.25em] text-[#D7E2EA]/50 text-xs sm:text-sm">
            Selected Platforms, Digital Work, and Interactive Experiences
          </p>
        </FadeIn>
      </div>

      <div ref={containerRef} className="mx-auto max-w-7xl">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            total={PROJECTS.length}
            containerRef={containerRef}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
