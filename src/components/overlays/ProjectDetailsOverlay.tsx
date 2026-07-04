import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Calendar, 
  Users, 
  Cpu, 
  BookOpen, 
  Briefcase, 
  Clock, 
  Award, 
  CheckCircle2, 
  Globe, 
  BookMarked, 
  MessageSquare, 
  Gauge,
  Shield,
  Target,
  Wifi,
  Sparkles,
  Smile
} from 'lucide-react';
import type { ProjectData } from '../../types/project.types';

interface ProjectDetailsOverlayProps {
  project: ProjectData | null;
  onClose: () => void;
  totalProjects: number;
}

interface ProjectMetric {
  value: string;
  label: string;
  icon: 'globe' | 'book' | 'message' | 'gauge' | 'clock' | 'shield' | 'cpu' | 'target' | 'wifi' | 'sparkles' | 'smile';
}

const PROJECT_METRICS: Record<string, ProjectMetric[]> = {
  'Bhavna Institute': [
    { value: '100%', label: 'Responsive Across All Devices', icon: 'globe' },
    { value: '15+', label: 'Courses Showcased', icon: 'book' },
    { value: '3+', label: 'Demo Requests Per Day', icon: 'message' },
    { value: 'Better', label: 'User Experience & Engagement', icon: 'gauge' }
  ],
  'HireMetrics': [
    { value: '90%', label: 'HR Screening Overhead Reduced', icon: 'clock' },
    { value: '10x', label: 'Faster Candidate Evaluations', icon: 'gauge' },
    { value: '100%', label: 'Bias-Free Screening System', icon: 'shield' },
    { value: 'Voice AI', label: 'Audio Synthesis Analytics', icon: 'cpu' }
  ],
  'CrisisConnect': [
    { value: '60%', label: 'Faster Dispatch Coordination', icon: 'target' },
    { value: 'Live', label: 'Tactical Responder Sync', icon: 'shield' },
    { value: 'Hands-free', label: 'AI Voice Triaging Channels', icon: 'cpu' },
    { value: 'Offline', label: 'Resilient PWA Interface Cache', icon: 'wifi' }
  ],
  'Learnivo AI': [
    { value: 'Hours', label: 'Saved in Weekly Lesson Prep', icon: 'clock' },
    { value: 'AI', label: 'Interactive Lesson Planning', icon: 'sparkles' },
    { value: 'Easy', label: 'Student Analytics Dashboard', icon: 'gauge' },
    { value: 'Loved', label: 'By Modern School Educators', icon: 'smile' }
  ]
};

const splitProjectName = (name: string) => {
  const upperName = name.toUpperCase();
  if (upperName.includes(' ')) {
    const parts = upperName.split(' ');
    return {
      first: parts[0],
      second: parts.slice(1).join(' ')
    };
  }
  const camelParts = name.split(/(?=[A-Z])/);
  if (camelParts.length > 1) {
    return {
      first: camelParts[0].toUpperCase(),
      second: camelParts.slice(1).join('').toUpperCase()
    };
  }
  return {
    first: upperName,
    second: ''
  };
};

const renderMetricIcon = (icon: string) => {
  const props = { size: 18, className: "text-[#a3e635] opacity-80" };
  switch (icon) {
    case 'globe': return <Globe {...props} />;
    case 'book': return <BookMarked {...props} />;
    case 'message': return <MessageSquare {...props} />;
    case 'gauge': return <Gauge {...props} />;
    case 'clock': return <Clock {...props} />;
    case 'shield': return <Shield {...props} />;
    case 'cpu': return <Cpu {...props} />;
    case 'target': return <Target {...props} />;
    case 'wifi': return <Wifi {...props} />;
    case 'sparkles': return <Sparkles {...props} />;
    case 'smile': return <Smile {...props} />;
    default: return <Sparkles {...props} />;
  }
};

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

  const { first: titleFirst, second: titleSecond } = splitProjectName(project.name);

  const metrics = PROJECT_METRICS[project.name] || [
    { value: '100%', label: 'Responsive Device Support', icon: 'globe' },
    { value: 'Modern', label: 'Premium User Experience', icon: 'gauge' },
    { value: 'Clean', label: 'Structured Tech Stack', icon: 'cpu' },
    { value: 'Robust', label: 'Highly Optimised Codebase', icon: 'sparkles' }
  ];

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
        {/* Ambient glows keyed to project accent colour */}
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none opacity-5"
          style={{ background: `rgb(${project.accentRgb})` }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none opacity-5"
          style={{ background: `rgb(${project.accentRgb})` }}
        />

        {/* Header Bar */}
        <header className="sticky top-0 z-[110] bg-[#0C0C0C]/80 backdrop-blur-md border-b border-white/5 py-4 px-6 sm:px-12 md:px-20 flex items-center justify-between">
          <button
            onClick={onClose}
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D7E2EA]/60 hover:text-[#a3e635] transition-colors duration-300 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-all duration-300">
              <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
            </div>
            <span>Back to Home</span>
          </button>
          <div className="font-mono text-xs text-white/30 uppercase tracking-[0.2em] font-semibold">
            Project {project.number} / {totalProjects.toString().padStart(2, '0')}
          </div>
        </header>

        {/* Outer Max-Width Container */}
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 py-12 sm:py-16 md:py-20 relative z-10 flex flex-col gap-16 md:gap-24">
          
          {/* Hero Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-6 flex flex-col items-start gap-6 text-left">
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#a3e635]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635] shadow-[0_0_6px_#a3e635]" />
                <span>Featured Case Study</span>
              </div>

              <h1
                style={{ fontFamily: '"Bebas Neue", sans-serif' }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wider text-white leading-[0.95] uppercase"
              >
                {titleFirst} {titleSecond && <span className="text-[#a3e635]">{titleSecond}</span>}
              </h1>

              <p className="text-sm sm:text-base font-light text-[#D7E2EA]/60 leading-relaxed max-w-xl">
                {project.tagline}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2.5 my-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-bold uppercase tracking-widest text-[#D7E2EA]/60 bg-white/[0.02] border border-white/5 px-4 py-2 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* VIEW LIVE CTA Button */}
              <div className="flex flex-wrap items-center gap-4 pt-4 w-full sm:w-auto">
                {project.isLive ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/live inline-flex items-center justify-center gap-3 rounded-full bg-[#a3e635] hover:bg-[#bbf746] px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-black transition-all duration-300 shadow-[0_4px_12px_rgba(163,230,53,0.08)] btn-shine"
                  >
                    <span>View Live</span>
                    <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5" />
                  </a>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center justify-center gap-3 rounded-full border border-white/5 bg-white/[0.005] px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white/30 cursor-not-allowed select-none"
                  >
                    <span>In Development</span>
                    <Cpu size={14} className="opacity-30" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Laptop Frame Mockup with 3D Rock Base */}
            <div className="lg:col-span-6 flex items-center justify-center w-full relative">
              {/* Green background glow behind laptop */}
              <div className="absolute w-[240px] h-[240px] rounded-full bg-[#a3e635]/3 blur-[110px] pointer-events-none -top-10 -right-10 z-0" />
              
              <div className="w-full max-w-[500px] flex flex-col items-center select-none relative z-10 filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.6)]">
                {/* Laptop Bezel */}
                <div className="w-[85%] bg-[#121214] rounded-t-xl p-2.5 border-t border-l border-r border-white/10 flex flex-col relative z-20">
                  {/* Webcam */}
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#2c2c35] flex items-center justify-center">
                    <div className="w-0.5 h-0.5 rounded-full bg-blue-500/80" />
                  </div>
                  {/* Screen Content */}
                  <div className="flex-1 w-full aspect-[16/10] rounded bg-[#09090b] overflow-hidden relative border border-white/5 flex items-center justify-center">
                    <img
                      src={project.mainImage}
                      alt={`${project.name} browser mockup`}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/5 pointer-events-none" />
                  </div>
                </div>
                {/* Laptop Base Hinge */}
                <div className="h-2 w-[88%] bg-[#1e1e22] border-t border-white/20 rounded-b-md relative z-20 shadow-md" />
                
                {/* Rock Slab Support */}
                <div 
                  className="w-[102%] h-10 bg-gradient-to-b from-[#18181b] to-[#09090b] border-t border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.9)] relative -mt-1.5 z-10"
                  style={{
                    clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)',
                    backgroundImage: 'radial-gradient(ellipse at center, #27272a 0%, #09090b 100%)',
                  }}
                />
              </div>
            </div>
          </section>

          {/* Detailed Specifications Bento Grid */}
          <section className="rounded-2xl border border-white/10 bg-[#0f0f12] p-8 sm:p-10 shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
              
              {/* Sticky Sidebar Nav (Columns 1-2) */}
              <div className="hidden md:flex md:col-span-2 flex-col gap-4 text-left border-r border-white/5 pr-4">
                <span className="font-mono text-[9px] tracking-widest text-[#a3e635] font-bold flex items-center gap-1.5 select-none">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635] shadow-[0_0_6px_#a3e635]" />
                  <span>CASE REPORT</span>
                </span>
                <ul className="flex flex-col gap-3 text-[10px] font-bold uppercase tracking-widest">
                  <li className="text-white flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-[#a3e635]" />
                    <span>Overview</span>
                  </li>
                  <li className="text-[#D7E2EA]/35 hover:text-white/80 transition-colors duration-300 pl-3">Key Role</li>
                  <li className="text-[#D7E2EA]/35 hover:text-white/80 transition-colors duration-300 pl-3">Metadata</li>
                  <li className="text-[#D7E2EA]/35 hover:text-white/80 transition-colors duration-300 pl-3">Challenge</li>
                  <li className="text-[#D7E2EA]/35 hover:text-white/80 transition-colors duration-300 pl-3">Impact</li>
                </ul>
              </div>

              {/* Column 2: Overview (Columns 3-5) */}
              <div className="md:col-span-4 flex flex-col gap-3 text-left">
                <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-[#a3e635] font-bold select-none">
                  <BookOpen size={11} className="text-[#a3e635]" />
                  <span>Overview</span>
                </div>
                <h3 className="text-lg font-bold uppercase text-white tracking-wide">
                  Project Synopsis
                </h3>
                <p className="text-xs sm:text-sm font-light text-[#D7E2EA]/60 leading-relaxed">
                  {project.detailedOverview}
                </p>
              </div>

              {/* Column 3: My Role (Columns 6-9) */}
              <div className="md:col-span-4 flex flex-col gap-3 text-left">
                <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-[#a3e635] font-bold select-none">
                  <Briefcase size={11} className="text-[#a3e635]" />
                  <span>My Role</span>
                </div>
                <h3 className="text-lg font-bold uppercase text-white tracking-wide">
                  {project.roleName || project.role}
                </h3>
                <ul className="flex flex-col gap-3 text-xs font-light text-[#D7E2EA]/60">
                  {project.roleBullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <CheckCircle2 size={12} className="text-[#a3e635] mt-0.5 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 4: Metadata (Columns 10-12) */}
              <div className="md:col-span-2 flex flex-col gap-5 text-left border-l border-white/5 pl-4 md:pl-6">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-[#a3e635] font-bold select-none">
                    <Clock size={11} className="text-[#a3e635]" />
                    <span>Duration</span>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">
                    {project.duration}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-[#a3e635] font-bold select-none">
                    <Award size={11} className="text-[#a3e635]" />
                    <span>Project Type</span>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider leading-snug">
                    {project.teamSize}
                  </span>
                </div>
              </div>

            </div>
          </section>

          {/* Problem Statement Bento Card */}
          <section className="w-full">
            <div className="rounded-2xl border border-white/10 bg-[#0c0c0c] p-8 sm:p-10 md:p-12 shadow-[0_15px_35px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left part: text */}
                <div className="lg:col-span-7 flex flex-col gap-4 text-left">
                  <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-[#a3e635] font-bold select-none">
                    <span className="text-[#a3e635] font-extrabold text-sm leading-none">01</span>
                    <span>The Challenge</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold uppercase text-white tracking-wide">
                    Problem <span className="text-[#a3e635]">Statement</span>
                  </h3>
                  <p className="text-xs sm:text-sm font-light text-[#D7E2EA]/60 leading-relaxed">
                    {project.problemStatement}
                  </p>
                </div>
                
                {/* Right part: Quote Block */}
                <div className="lg:col-span-5 flex flex-col pl-0 lg:pl-8 border-t lg:border-t-0 lg:border-l border-white/5 pt-8 lg:pt-0 text-left relative">
                  {/* Decorative dot grid next to quote */}
                  <div className="absolute -top-6 -right-6 w-20 h-20 opacity-10 pointer-events-none select-none">
                    <div className="grid grid-cols-5 gap-1.5">
                      {Array.from({ length: 25 }).map((_, i) => (
                        <div key={i} className="w-1 h-1 rounded-full bg-[#a3e635]" />
                      ))}
                    </div>
                  </div>
                  
                  {/* Quote marks */}
                  <span className="text-5xl font-serif text-[#a3e635] leading-none select-none h-4">
                    “
                  </span>
                  <p className="text-sm sm:text-base font-light italic text-[#D7E2EA]/80 leading-relaxed mt-2 pl-2">
                    {project.quote}
                  </p>
                  
                  {/* Small line chart decorative graph */}
                  <div className="w-full h-8 mt-4 select-none opacity-20">
                    <svg viewBox="0 0 100 20" className="w-full h-full overflow-visible">
                      <path
                        d="M 0,18 Q 20,18 40,14 T 80,6 T 100,2"
                        fill="none"
                        stroke="#a3e635"
                        strokeWidth="1.5"
                      />
                      <circle cx="100" cy="2" r="2.5" fill="#a3e635" />
                    </svg>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Solution Section */}
          <section className="w-full">
            <div className="rounded-2xl border border-white/10 bg-[#0c0c0c] p-8 sm:p-10 md:p-12 shadow-[0_15px_35px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left part: text */}
                <div className="lg:col-span-6 flex flex-col gap-4 text-left">
                  <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-[#a3e635] font-bold select-none">
                    <span className="text-[#a3e635] font-extrabold text-sm leading-none">02</span>
                    <span>The Solution</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-white tracking-wide leading-tight">
                    Designing a Seamless Learning <span className="text-[#a3e635]">Experience</span>
                  </h3>
                  <p className="text-xs sm:text-sm font-light text-[#D7E2EA]/60 leading-relaxed">
                    {project.solution}
                  </p>
                  
                  {/* Dotted path leading to screens */}
                  <div className="w-32 h-6 select-none opacity-25 hidden lg:block">
                    <svg viewBox="0 0 100 20" className="w-full h-full overflow-visible">
                      <path
                        d="M 0,10 Q 50,20 100,10"
                        fill="none"
                        stroke="#a3e635"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />
                      <circle cx="100" cy="10" r="3" fill="#a3e635" />
                    </svg>
                  </div>
                </div>

                {/* Right part: Premium overlapping screen stack mockup */}
                <div className="lg:col-span-6 flex items-center justify-center w-full relative">
                  <div className="relative w-full max-w-[420px] aspect-[1.3] flex items-center justify-center select-none py-6">
                    {/* Behind Left Screen */}
                    <div className="absolute left-[-5%] w-[68%] aspect-[16/10] bg-[#121214] rounded-lg p-1.5 border border-white/5 shadow-md -rotate-[4deg] opacity-40 z-10 scale-[0.88]">
                      <div className="w-full h-full rounded bg-[#09090b] overflow-hidden">
                        <img src={project.mainImage} alt="mockup screen 1" className="w-full h-full object-cover object-left-top" />
                      </div>
                    </div>
                    {/* Behind Right Screen */}
                    <div className="absolute right-[-5%] w-[68%] aspect-[16/10] bg-[#121214] rounded-lg p-1.5 border border-white/5 shadow-md rotate-[4deg] opacity-40 z-10 scale-[0.88]">
                      <div className="w-full h-full rounded bg-[#09090b] overflow-hidden">
                        <img src={project.mainImage} alt="mockup screen 2" className="w-full h-full object-cover object-right-bottom" />
                      </div>
                    </div>
                    {/* Center Active Screen */}
                    <div className="absolute w-[80%] aspect-[16/10] bg-[#121214] rounded-lg p-2 border border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.8)] z-20 scale-100">
                      <div className="w-full h-full rounded bg-[#09090b] overflow-hidden">
                        <img src={project.mainImage} alt="mockup screen active" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Impact Section */}
          <section className="rounded-2xl border border-white/10 bg-[#0f0f12] p-8 sm:p-10 shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Title block (Columns 1-3) */}
              <div className="lg:col-span-3 flex flex-col gap-2 text-left">
                <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-[#a3e635] font-bold select-none">
                  <span className="text-[#a3e635] font-extrabold text-sm leading-none">03</span>
                  <span>The Impact</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-wider" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                  The <span className="text-[#a3e635]">Impact</span>
                </h3>
              </div>

              {/* Right Columns list (Columns 4-12) */}
              <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {metrics.map((metric, idx) => (
                  <div key={idx} className="bg-[#0c0c0c] border border-white/5 hover:border-white/10 rounded-xl p-5 flex flex-col gap-2 text-left transition-colors duration-300 relative overflow-hidden group/mcard">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-[#a3e635]/5 rounded-bl-full blur-[10px] pointer-events-none" />
                    {renderMetricIcon(metric.icon)}
                    <span className="text-3xl font-extrabold text-white tracking-tight mt-1">{metric.value}</span>
                    <span className="text-[11px] font-medium text-[#D7E2EA]/50 leading-snug">{metric.label}</span>
                  </div>
                ))}
              </div>

            </div>
          </section>

        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default ProjectDetailsOverlay;
