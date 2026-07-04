import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Code, 
  Trophy, 
  Cpu, 
  Brain, 
  Users, 
  List, 
  SlidersHorizontal,
  ChevronDown,
  Calendar,
  Shield,
  Sparkles
} from 'lucide-react';
import { ALL_ACHIEVEMENTS, AchievementData } from '../../data/achievements';
import { ALL_CERTIFICATIONS, CertificationData } from '../../data/certifications';
import VideoModal from '../ui/VideoModal';

interface AllAchievementsOverlayProps {
  open: boolean;
  onClose: () => void;
}

const FILTERS = ['All', 'Hackathons', 'Awards', 'IoT & Hardware', 'Certifications'] as const;

const FILTER_DESCRIPTIONS: Record<typeof FILTERS[number], string> = {
  All: 'A timeline of milestones, awards, and hackathon prototypes that shaped my journey as a developer.',
  Hackathons: 'A record of prototype web applications, sprints, and team projects developed during hackathons.',
  Awards: 'Academic awards, simulator builds, and recognitions received during college hackathons and festivals.',
  'IoT & Hardware': 'Smart hardware purifiers, air quality dashboard integrations, and physical computing IoT prototypes.',
  Certifications: 'Professional certifications and courses that enhance my skills and knowledge.'
};

const getFilterTitle = (filter: typeof FILTERS[number]) => {
  switch (filter) {
    case 'All':
      return { first: 'ALL', second: 'ACHIEVEMENTS', hasSpace: true };
    case 'Hackathons':
      return { first: 'HACKA', second: 'THONS', hasSpace: false };
    case 'Awards':
      return { first: 'AWA', second: 'RDS', hasSpace: false };
    case 'IoT & Hardware':
      return { first: 'IOT &', second: 'HARDWARE', hasSpace: true };
    case 'Certifications':
      return { first: 'CERTIFI', second: 'CATIONS', hasSpace: false };
    default:
      return { first: 'ALL', second: 'ACHIEVEMENTS', hasSpace: true };
  }
};

const matchesFilter = (ach: AchievementData, filter: string) => {
  if (filter === 'All') return true;
  const type = ach.type.toLowerCase();
  if (filter === 'Hackathons') {
    return type.includes('hackathon');
  }
  if (filter === 'Awards') {
    return type.includes('award');
  }
  if (filter === 'IoT & Hardware') {
    return type.includes('hardware') || type.includes('iot');
  }
  return true;
};

const renderAchievementIcon = (id: string) => {
  const props = { size: 20, className: "text-[#a3e635] group-hover:scale-110 transition-all duration-300" };
  switch (id) {
    case 'hack-1':
      return <Code {...props} />;
    case 'horizon':
      return <Trophy {...props} />;
    case 'aavishkar':
      return <Cpu {...props} />;
    case 'techxpression':
      return <Brain {...props} />;
    case 'sheryians':
      return <Users {...props} />;
    default:
      return <Sparkles {...props} />;
  }
};

const RenderCertificateRibbon = ({ color }: { color: string }) => {
  return (
    <div 
      className="absolute top-0 right-4 w-6 h-10 shadow-sm z-20 flex items-center justify-center"
      style={{
        backgroundColor: color,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0% 100%)',
      }}
    >
      <div className="w-1.5 h-1.5 rounded-full bg-white/40 mb-1" />
    </div>
  );
};

const RenderCertificateSeal = () => {
  return (
    <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full border border-neutral-300/80 flex items-center justify-center select-none opacity-40">
      <div className="w-8 h-8 rounded-full border border-dashed border-neutral-300/80 flex items-center justify-center text-[4px] text-neutral-400 font-bold font-mono text-center leading-tight">
        VERIFIED<br/>STAMP
      </div>
    </div>
  );
};

const RenderCertificateLogo = ({ type }: { type: CertificationData['logoType'] }) => {
  switch (type) {
    case 'fcc':
      return (
        <div className="flex items-center gap-1 font-mono text-xs font-bold text-white select-none">
          <span>freeCodeCamp</span>
          <span className="text-emerald-500 font-extrabold text-sm">(🔥)</span>
        </div>
      );
    case 'meta':
      return (
        <div className="flex items-center gap-1 text-[#0081fb] font-extrabold text-sm select-none">
          <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-current shrink-0">
            <path d="M16.5 6C13.46 6 12 8.5 12 8.5S10.54 6 7.5 6C4.46 6 2 8.46 2 11.5C2 14.54 4.46 17 7.5 17C10.54 17 12 14.5 12 14.5S13.46 17 16.5 17C19.54 17 22 14.54 22 11.5C22 8.46 19.54 6 16.5 6ZM7.5 14C6.12 14 5 12.88 5 11.5C5 10.12 6.12 9 7.5 9C8.88 9 10 10.12 10 11.5C10 12.88 8.88 14 7.5 14ZM16.5 14C15.12 14 14 12.88 14 11.5C14 10.12 15.12 9 16.5 9C17.88 9 19 10.12 19 11.5C19 12.88 17.88 14 16.5 14Z" />
          </svg>
          <span className="font-bold tracking-tight">Meta</span>
        </div>
      );
    case 'google':
      return (
        <div className="flex items-center gap-0.5 select-none font-bold text-xs font-sans tracking-tight">
          <span className="text-[#4285F4]">G</span>
          <span className="text-[#EA4335]">o</span>
          <span className="text-[#FBBC05]">o</span>
          <span className="text-[#4285F4]">g</span>
          <span className="text-[#34A853]">l</span>
          <span className="text-[#EA4335]">e</span>
        </div>
      );
    case 'mongodb':
      return (
        <div className="flex items-center gap-1 font-bold text-xs select-none">
          <span className="text-emerald-500 font-extrabold text-sm leading-none shrink-0">🍃</span>
          <span className="text-[#001e2b] font-black tracking-tight">MongoDB</span>
        </div>
      );
    case 'udemy':
      return (
        <div className="flex items-center text-[#a435f0] font-black text-sm select-none tracking-tight">
          <span>ûdemy</span>
        </div>
      );
    case 'coursera':
      return (
        <div className="flex items-center text-[#0056d2] font-black text-sm select-none tracking-tight">
          <span>coursera</span>
        </div>
      );
    case 'hackerrank':
      return (
        <div className="flex items-center gap-1 text-[#2ec866] font-bold text-xs select-none">
          <span className="font-black">HackerRank</span>
        </div>
      );
    default:
      return null;
  }
};

const AllAchievementsOverlay = ({ open, onClose }: AllAchievementsOverlayProps) => {
  const [activeFilter, setActiveFilter] = useState<typeof FILTERS[number]>('All');
  const [videoOpen, setVideoOpen] = useState(false);
  const [openCardId, setOpenCardId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'Latest' | 'Oldest'>('Latest');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  
  const [selectedCertImage, setSelectedCertImage] = useState<string | null>(null);
  
  const overlayRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Lock scroll / pause Lenis while open
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

  // Close sort dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(e.target as Node)) {
        setSortDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  if (!open) return null;

  // Filter lists
  const isCertActive = activeFilter === 'Certifications';
  
  const filteredAchievements = ALL_ACHIEVEMENTS.filter((ach) =>
    matchesFilter(ach, activeFilter)
  );

  // Sort achievements
  const sortedAchievements = [...filteredAchievements].sort((a, b) => {
    const numA = parseInt(a.number, 10) || 0;
    const numB = parseInt(b.number, 10) || 0;
    return sortBy === 'Latest' ? numB - numA : numA - numB;
  });

  // Sort certifications
  const sortedCertifications = [...ALL_CERTIFICATIONS].sort((a, b) => {
    const timeA = new Date(a.rawDate).getTime();
    const timeB = new Date(b.rawDate).getTime();
    return sortBy === 'Latest' ? timeB - timeA : timeA - timeB;
  });

  const { first: titleFirst, second: titleSecond, hasSpace: titleHasSpace } = getFilterTitle(activeFilter);

  const toggleCardFlip = (id: string) => {
    setOpenCardId((prev) => (prev === id ? null : id));
  };

  return createPortal(
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="All Achievements Showcase"
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

          {/* Title block & Right widget */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mt-4">
            <div className="flex flex-col items-start gap-4 text-left max-w-2xl">
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#a3e635] select-none">
                <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635] shadow-[0_0_6px_#a3e635]" />
                <span>/ Recognitions & Milestones</span>
              </div>

              <h1
                style={{ fontFamily: '"Bebas Neue", sans-serif' }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider text-white uppercase leading-[0.95]"
              >
                {titleFirst}
                {titleHasSpace && ' '}
                <span
                  style={{
                    WebkitTextStroke: '1.5px #a3e635',
                    color: 'transparent',
                    textShadow: '0 0 15px rgba(163,230,53,0.15)',
                  }}
                >
                  {titleSecond}
                </span>
              </h1>

              <p className="text-xs sm:text-sm md:text-base font-light text-[#D7E2EA]/55 max-w-xl leading-relaxed mt-2">
                {FILTER_DESCRIPTIONS[activeFilter]}
              </p>
            </div>

            {/* Custom 3D Widget / Shield seal based on active tab */}
            <div className="flex flex-col sm:flex-row items-center gap-6 lg:max-w-md w-full self-start lg:self-auto select-none">
              
              {isCertActive ? (
                /* Dynamic Verified Badge Widget */
                <div className="relative w-40 h-40 flex items-center justify-center hidden sm:flex shrink-0">
                  <div className="w-16 h-16 rounded-full bg-[#a3e635]/10 border border-[#a3e635]/25 flex items-center justify-center shadow-[0_0_25px_rgba(163,230,53,0.15)] relative">
                    {/* Dashed outer spinner */}
                    <div 
                      className="absolute inset-0.5 rounded-full border border-dashed border-[#a3e635]/40 animate-spin" 
                      style={{ animationDuration: '10s' }} 
                    />
                    <Shield size={22} className="text-[#a3e635]" />
                  </div>
                </div>
              ) : (
                /* 3D Slabs Graphic */
                <div className="relative w-40 h-40 flex items-center justify-center [perspective:1000px] hidden sm:flex shrink-0">
                  <div 
                    className="absolute w-24 h-36 bg-[#0c0c0c] border border-white/5 rounded-lg shadow-md"
                    style={{
                      transform: 'rotateY(-25deg) rotateX(15deg) translateZ(-20px) translateX(-10px) translateY(-5px)',
                    }}
                  />
                  <div 
                    className="absolute w-24 h-36 bg-[#0f0f12] border border-[#a3e635]/30 rounded-lg shadow-[0_15px_35px_rgba(0,0,0,0.8)] flex flex-col justify-between p-3"
                    style={{
                      transform: 'rotateY(-25deg) rotateX(15deg) translateZ(10px)',
                    }}
                  >
                    <div className="h-0.5 w-full bg-[#a3e635] shadow-[0_0_8px_#a3e635] rounded-full mt-2" />
                    <div className="text-[7px] text-[#D7E2EA]/30 font-mono tracking-widest uppercase">Milestone</div>
                  </div>
                  <div 
                    className="absolute bottom-1 w-32 h-6 bg-gradient-to-b from-[#18181b] to-[#09090b] border-t border-white/10"
                    style={{
                      clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)',
                      transform: 'rotateY(-25deg) rotateX(15deg) translateZ(-5px) translateY(8px)',
                    }}
                  />
                </div>
              )}

              {/* Dynamic Value Card Widget */}
              <div className="rounded-2xl border border-white/10 bg-[#0f0f12] p-5 flex flex-col justify-center gap-1 w-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-left">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#D7E2EA]/45">
                  {isCertActive ? 'Total Certifications' : 'Total Achievements'}
                </span>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#a3e635] leading-none mt-1">
                  {isCertActive ? String(sortedCertifications.length).padStart(2, '0') : String(filteredAchievements.length).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-[#D7E2EA]/40 font-medium mt-1">
                  {isCertActive ? 'Verified & Earned' : 'Milestones & Counting'}
                </span>
              </div>
            </div>
          </div>

          {/* Filter Navigation & Sort Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-white/10 pb-6 mt-8">
            <div className="flex flex-wrap gap-2.5">
              {FILTERS.map((filter) => {
                const isActive = activeFilter === filter;
                const displayLabel = filter === 'IoT & Hardware' ? 'IOT & HARDWARE' : filter.toUpperCase();
                return (
                  <button
                    key={filter}
                    onClick={() => {
                      setActiveFilter(filter);
                      setOpenCardId(null);
                    }}
                    className={`px-4 py-2 rounded-md text-[11px] font-bold tracking-wider transition-all duration-300 border focus:outline-none ${
                      isActive
                        ? 'border-[#a3e635] text-[#a3e635] bg-[#a3e635]/5 shadow-[0_0_12px_rgba(163,230,53,0.15)]'
                        : 'bg-[#0f0f12] border-white/5 text-[#D7E2EA]/50 hover:text-white hover:border-white/15'
                    }`}
                  >
                    {displayLabel}
                  </button>
                );
              })}
            </div>
            
            {/* Sorting Dropdown Menu */}
            <div className="relative shrink-0 select-none" ref={sortDropdownRef}>
              <button
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                className="bg-[#0f0f12] border border-white/5 focus:border-[#a3e635]/50 focus:outline-none rounded-md px-4 py-2 text-[10px] text-white flex items-center justify-between gap-2.5 cursor-pointer transition-colors duration-300 font-bold uppercase tracking-wider"
              >
                <span>SORT BY: {sortBy}</span>
                <ChevronDown
                  size={13}
                  className={`text-[#D7E2EA]/30 transition-transform duration-300 ${sortDropdownOpen ? 'rotate-180 text-[#a3e635]' : ''}`}
                />
              </button>

              <AnimatePresence>
                {sortDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-[110%] right-0 w-36 bg-[#0f0f12] border border-white/10 rounded-md py-1.5 z-[120] shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden"
                  >
                    <button
                      onClick={() => {
                        setSortBy('Latest');
                        setSortDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors duration-200 ${
                        sortBy === 'Latest' ? 'text-[#a3e635] bg-[#a3e635]/5' : 'text-[#D7E2EA]/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      Latest
                    </button>
                    <button
                      onClick={() => {
                        setSortBy('Oldest');
                        setSortDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors duration-200 ${
                        sortBy === 'Oldest' ? 'text-[#a3e635] bg-[#a3e635]/5' : 'text-[#D7E2EA]/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      Oldest
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Dynamic Content: Timeline Grid / Certificates Grid */}
          <section className="w-full relative mt-4">
            
            {isCertActive ? (
              /* CERTIFICATIONS GRID (Mockups layout matching screenshot) */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {sortedCertifications.map((cert) => (
                  <div 
                    key={cert.id} 
                    onClick={() => cert.image && setSelectedCertImage(cert.image)}
                    className="group/cert flex flex-col gap-4 cursor-pointer"
                  >
                    
                    {/* Certificate Mockup Card or Image */}
                    {cert.image ? (
                      <div className="w-full aspect-[1.5] rounded-xl border border-white/10 bg-[#0f0f12] overflow-hidden relative shadow-md flex items-center justify-center">
                        <img 
                          src={cert.image} 
                          alt={cert.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      /* High-Fidelity CSS Certificate Mockup Card */
                      <div 
                        className={`w-full aspect-[1.5] rounded-xl border relative shadow-md p-6 flex flex-col justify-between overflow-hidden ${
                          cert.logoType === 'fcc' 
                            ? 'bg-[#0a0a23] border-[#2a2a40] text-white' 
                            : 'bg-[#f8f9fa] border-neutral-200/90 text-neutral-800'
                        }`}
                      >
                        {/* Ribbon banner on top-right */}
                        <RenderCertificateRibbon color={
                          cert.logoType === 'fcc' ? '#22c55e' :
                          cert.logoType === 'meta' ? '#0081fb' :
                          cert.logoType === 'google' ? '#FBBC05' :
                          cert.logoType === 'mongodb' ? '#00ed64' :
                          cert.logoType === 'udemy' ? '#a435f0' :
                          cert.logoType === 'coursera' ? '#0056d2' : '#2ec866'
                        } />

                        {/* Header logo row */}
                        <div className="flex items-center justify-between border-b border-dashed border-neutral-300/40 pb-2">
                          <RenderCertificateLogo type={cert.logoType} />
                          <span className="text-[6px] font-bold font-mono tracking-widest opacity-40 uppercase">
                            No. {cert.id.toUpperCase()}
                          </span>
                        </div>

                        {/* Core certificate credentials text */}
                        <div className="flex flex-col text-left justify-center flex-1 my-3 select-text">
                          <span className="text-[7px] uppercase tracking-widest font-bold opacity-50">
                            This certifies that
                          </span>
                          <h4 className={`text-base font-extrabold tracking-tight mt-0.5 ${
                            cert.logoType === 'fcc' ? 'text-white' : 'text-neutral-900'
                          }`}>
                            {cert.recipient}
                          </h4>
                          <span className="text-[7px] uppercase tracking-widest font-bold opacity-50 mt-1">
                            has successfully completed the
                          </span>
                          <h5 className="text-[11px] font-bold tracking-tight text-[#a3e635] uppercase leading-tight mt-0.5">
                            {cert.subtitle}
                          </h5>
                        </div>

                        {/* Signatures and stamp seal bottom row */}
                        <div className="flex items-end justify-between select-none">
                          <div className="flex flex-col items-start gap-0.5">
                            <span className="text-[7px] italic opacity-60 font-serif border-b border-neutral-300/60 pb-0.5">
                              {cert.signatures?.join(' · ')}
                            </span>
                            <span className="text-[5px] uppercase font-bold tracking-wider opacity-45">
                              Authorized Representative
                            </span>
                          </div>
                          
                          {/* Circular verified stamp */}
                          <RenderCertificateSeal />
                        </div>

                      </div>
                    )}

                    {/* Metadata */}
                    <div className="flex items-center justify-between text-left px-1 mt-1 select-none">
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="text-[10px] font-bold text-[#D7E2EA]/35 uppercase tracking-wider flex items-center gap-1.5">
                          <Calendar size={11} className="text-[#a3e635]/65 shrink-0" />
                          {cert.issueDate}
                        </span>
                        <h3 className="text-base font-bold text-white tracking-wide uppercase truncate mt-0.5 group-hover/cert:text-[#a3e635] transition-colors duration-300">
                          {cert.title}
                        </h3>
                        <span className="text-[10px] font-bold text-[#a3e635]/80 uppercase tracking-widest">
                          {cert.platform}
                        </span>
                      </div>
                      
                      {/* Arrow indicator */}
                      <div className="w-9 h-9 rounded-full bg-[#121215] border border-white/5 text-white/55 group-hover/cert:border-[#a3e635] group-hover/cert:text-[#a3e635] flex items-center justify-center transition-all duration-300 shrink-0">
                        <ArrowUpRight size={14} />
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              /* ACHIEVEMENTS VERTICAL TIMELINE */
              <div className="flex flex-col gap-6 w-full relative pl-2 md:pl-0">
                {/* Main axis timeline vertical line */}
                <div className="absolute left-[70px] md:left-[80px] top-6 bottom-6 w-[1px] bg-white/5 pointer-events-none" />

                {sortedAchievements.length > 0 ? (
                  sortedAchievements.map((ach, index) => (
                    <div key={ach.id} className="flex gap-6 md:gap-8 relative group">
                      
                      {/* Timeline axis info (Left side) */}
                      <div className="flex flex-col items-center justify-center shrink-0 w-12 md:w-16 text-center select-none relative z-10">
                        <span className="text-2xl md:text-3xl font-extrabold text-white leading-none">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[10px] font-bold text-[#D7E2EA]/35 mt-1 tracking-wider">
                          {ach.year}
                        </span>

                        {/* Timeline Node Point */}
                        <div className="absolute right-[-29px] md:right-[-35px] top-2 flex flex-col items-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#a3e635] shadow-[0_0_8px_#a3e635] border-2 border-[#0c0c0c] z-20 group-hover:scale-125 transition-transform duration-300" />
                        </div>
                      </div>

                      {/* Card content wrapper (Right side) */}
                      <div className="flex-1 pb-4">
                        <div
                          onClick={() => toggleCardFlip(ach.id)}
                          className="w-full bg-[#0f0f12] border border-white/10 hover:border-white/20 rounded-2xl p-6 md:p-7 flex flex-col hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] transition-all duration-500 cursor-pointer relative overflow-hidden text-left"
                        >
                          {/* Ambient hover light */}
                          <div className="absolute -top-12 right-0 w-[180px] h-[180px] rounded-full bg-[#a3e635]/3 blur-[50px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          {/* Main Row Columns */}
                          <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            
                            {/* Left Block: Info text */}
                            <div className="flex-1 flex flex-col gap-2 min-w-0">
                              <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded border border-[#a3e635]/35 bg-[#a3e635]/5 text-[#a3e635] w-fit">
                                {ach.type}
                              </span>
                              
                              <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-wide truncate group-hover:text-[#a3e635] transition-colors duration-300 mt-1">
                                {ach.title}
                              </h3>
                              
                              <p className="text-xs sm:text-sm font-light text-[#D7E2EA]/50 leading-relaxed max-w-xl">
                                {ach.description}
                              </p>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleCardFlip(ach.id);
                                }}
                                className="text-[9px] font-bold uppercase tracking-wider text-[#a3e635] flex items-center gap-1 mt-2 focus:outline-none hover:opacity-85"
                              >
                                <span>{openCardId === ach.id ? 'Hide Details' : 'View Details'}</span>
                                <ArrowUpRight size={11} className={`transition-transform duration-300 ${openCardId === ach.id ? 'rotate-45' : ''}`} />
                              </button>
                            </div>

                            {/* Middle Block: Role detail */}
                            <div className="hidden md:flex flex-col text-right shrink-0 min-w-[130px] max-w-[200px]">
                              <span className="text-[10px] font-bold text-[#D7E2EA]/40 uppercase tracking-widest leading-snug">
                                {ach.roleInfo}
                              </span>
                            </div>

                            {/* Right Block: Graphic representation */}
                            <div className="flex items-center gap-4 shrink-0 self-end md:self-center">
                              <div className="w-14 h-14 rounded-xl border border-white/5 bg-[#121215] flex items-center justify-center text-[#a3e635] group-hover:border-[#a3e635]/20 group-hover:bg-[#a3e635]/5 transition-all duration-300">
                                {renderAchievementIcon(ach.id)}
                              </div>

                              {/* Chevron Trigger */}
                              <div className="w-9 h-9 rounded-full bg-[#121215] border border-white/5 text-white/50 group-hover:border-[#a3e635] group-hover:text-[#a3e635] flex items-center justify-center transition-all duration-300">
                                <ArrowUpRight size={14} />
                              </div>
                            </div>

                          </div>

                          {/* Details / Problem Statement Drawer */}
                          <AnimatePresence>
                            {openCardId === ach.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.35, ease: 'easeInOut' }}
                                onClick={(e) => e.stopPropagation()}
                                className="w-full overflow-hidden z-10"
                              >
                                <div className="border-t border-white/5 pt-5 mt-4 flex flex-col gap-3">
                                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex-1">
                                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#a3e635]">
                                        Problem Statement
                                      </span>
                                      <h4 className="text-white font-bold text-sm uppercase tracking-wide mt-1 leading-snug">
                                        {ach.problemTitle}
                                      </h4>
                                      <p className="text-xs sm:text-sm font-light text-[#D7E2EA]/60 leading-relaxed mt-2">
                                        {ach.problemDesc}
                                      </p>
                                    </div>

                                    {/* Watch pitch demo button if video is present */}
                                    {ach.hasVideo && (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setVideoOpen(true);
                                        }}
                                        className="w-auto flex items-center justify-center gap-1.5 rounded-full border border-[#a3e635]/30 bg-[#a3e635]/5 hover:bg-[#a3e635] hover:text-black text-[#a3e635] px-4 py-2 text-[9px] uppercase font-bold tracking-wider transition-all duration-300 mt-2 shrink-0 select-none focus:outline-none self-start md:self-center"
                                      >
                                        <span>Watch Pitch Video</span>
                                        <ArrowUpRight size={12} />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                        </div>
                      </div>

                    </div>
                  ))
                ) : (
                  <div className="py-20 flex flex-col items-center justify-center text-center gap-3">
                    <span className="text-3xl">🏆</span>
                    <h3 className="text-lg font-bold text-white">No achievements found</h3>
                    <p className="text-xs text-[#D7E2EA]/40">Try adjusting your category filter</p>
                  </div>
                )}
              </div>
            )}

            {/* Footer Quote Card */}
            <div className="rounded-2xl border border-white/10 bg-[#0f0f12]/50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
              <div className="flex items-center gap-4 text-left">
                <span className="text-3xl font-serif text-[#a3e635] leading-none select-none h-4">“</span>
                <p className="text-xs sm:text-sm font-medium text-[#D7E2EA]/85">
                  Every milestone is a step forward. <span className="text-white font-semibold">More to build, more to achieve.</span>
                </p>
              </div>
              
              {/* Decorative dot indicators */}
              <div className="flex items-center gap-1.5 shrink-0 select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] shadow-[0_0_4px_#a3e635]" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
              </div>
            </div>

          </section>

        </div>

        <VideoModal
          open={videoOpen}
          onClose={() => setVideoOpen(false)}
          videoSrc="/hackathon.mp4"
        />

        {/* Certificate Image Preview Modal */}
        <AnimatePresence>
          {selectedCertImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCertImage(null)}
              className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 p-4 sm:p-8 cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden border border-white/10 bg-[#0c0c0c] flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedCertImage(null)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white flex items-center justify-center transition-colors duration-200 focus:outline-none"
                >
                  ✕
                </button>
                
                <img
                  src={selectedCertImage}
                  alt="Certificate Showcase"
                  className="max-w-full max-h-[85vh] object-contain select-none"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default AllAchievementsOverlay;
