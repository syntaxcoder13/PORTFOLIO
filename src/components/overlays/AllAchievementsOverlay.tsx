import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Trophy, Lightbulb, RotateCcw } from 'lucide-react';
import { ALL_ACHIEVEMENTS, AchievementData } from '../../data/achievements';
import VideoModal from '../ui/VideoModal';

interface AllAchievementsOverlayProps {
  open: boolean;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// OverlayAchievementCard — dark-theme flip card used inside the overlay
// ---------------------------------------------------------------------------
const OverlayAchievementCard = ({
  achievement,
  displayNumber,
  onVideoClick,
}: {
  achievement: AchievementData;
  displayNumber: string;
  onVideoClick?: () => void;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = achievement.iconType === 'lightbulb' ? Lightbulb : Trophy;

  const backBorderClass =
    achievement.id === 'hack-1' || achievement.id === 'techxpression'
      ? 'border-emerald-400/80 shadow-emerald-100/10'
      : achievement.id === 'horizon'
        ? 'border-amber-400/80 shadow-amber-100/10'
        : achievement.id === 'aavishkar'
          ? 'border-indigo-400/80 shadow-indigo-100/10'
          : 'border-purple-400/80 shadow-purple-100/10';

  return (
    <div className="relative w-full h-[400px] sm:h-[350px] [perspective:1000px] flex flex-col">
      <motion.div
        className="relative w-full h-full [transform-style:preserve-3d] flex flex-col"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {/* FRONT SIDE */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl border border-neutral-800 bg-[#0F0F12] p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-sm hover:border-neutral-700 transition-all duration-300"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-3.5 border-b border-white/5 select-none">
            <div className="flex items-center gap-3">
              <div className="rounded-lg border border-white/10 bg-white/5 p-2 text-white/70">
                <Icon size={16} strokeWidth={1.5} />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider border rounded-full px-2.5 py-0.5 bg-white/5 border-white/10 text-white/80">
                {achievement.type}
              </span>
            </div>
            <span className="font-mono text-xs font-semibold text-white/35">
              / {displayNumber}
            </span>
          </div>

          {/* Body Content */}
          <div className="flex-1 flex gap-6 justify-between items-center py-4">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-light text-white/70 leading-relaxed">
                {achievement.description}
              </p>
            </div>
          </div>

          {/* Bottom Panel */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-t border-white/5 pt-3.5 mt-auto">
            <div className="flex flex-col gap-0.5 min-w-0 mr-4">
              <span className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider text-white/40 truncate">
                {achievement.roleInfo} · {achievement.eventInfo}
              </span>
              <h3 className="font-bold text-sm sm:text-base text-white uppercase tracking-wide truncate">
                {achievement.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 shrink-0 justify-end">
              {achievement.hasVideo && onVideoClick && (
                <button
                  type="button"
                  onClick={onVideoClick}
                  className="flex-initial flex items-center justify-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 hover:bg-[#84cc16] hover:border-[#84cc16] hover:text-black text-purple-300 px-3 py-1.5 sm:px-3.5 sm:py-2 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider transition-all duration-300 cursor-pointer"
                >
                  <span>Pitch Video</span>
                  <ArrowUpRight size={12} />
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsFlipped(true)}
                className="flex-initial flex items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-[#84cc16] hover:border-[#84cc16] hover:text-black text-white/80 px-3 py-1.5 sm:px-3.5 sm:py-2 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider transition-all duration-300 cursor-pointer"
              >
                <span>Problem Details</span>
                <ArrowUpRight size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl border bg-[#0F0F12] p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-sm transition-all duration-300 ${backBorderClass}`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-3.5 border-b border-white/5 select-none">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#84cc16]">
              Problem Statement
            </span>
            <span className="font-mono text-xs font-semibold text-white/35">
              / {displayNumber}
            </span>
          </div>

          {/* Body Content */}
          <div className="flex-1 flex flex-col justify-center py-4">
            <h4 className="text-white font-bold text-sm sm:text-base leading-tight mb-2 uppercase tracking-wide">
              {achievement.problemTitle}
            </h4>
            <p className="text-xs sm:text-sm font-light text-white/70 leading-relaxed">
              {achievement.problemDesc}
            </p>
          </div>

          {/* Bottom Panel */}
          <div className="flex justify-end border-t border-white/5 pt-3.5">
            <button
              type="button"
              onClick={() => setIsFlipped(false)}
              className="w-auto flex items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-[#84cc16] hover:border-[#84cc16] hover:text-black text-white/80 px-4 py-2 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider transition-all duration-300 cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Back</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// AllAchievementsOverlay — full-screen portal overlay
// ---------------------------------------------------------------------------
const AllAchievementsOverlay = ({ open, onClose }: AllAchievementsOverlayProps) => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'HACKATHONS' | 'AWARDS' | 'IoT'>('ALL');
  const [videoOpen, setVideoOpen] = useState(false);
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

  if (!open) return null;

  const filteredAchievements = ALL_ACHIEVEMENTS.filter((ach) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'HACKATHONS') return ach.type === 'Hackathon' || ach.type === 'Cohort Hackathon';
    if (activeFilter === 'AWARDS') return ach.type === 'Award';
    if (activeFilter === 'IoT') return ach.type === 'IoT Hardware & Web';
    return true;
  });

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
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[#84cc16]/5 blur-[180px] pointer-events-none" />

        {/* Header Bar */}
        <header className="sticky top-0 z-[100] bg-[#0C0C0C]/80 backdrop-blur-md border-b border-white/5 py-4 px-6 sm:px-12 md:px-20 flex items-center justify-between">
          <button
            onClick={onClose}
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D7E2EA]/60 hover:text-[#84cc16] transition-colors duration-300"
          >
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </button>
          <div className="font-mono text-xs text-white/30 uppercase tracking-[0.2em] font-semibold">
            Archive [{ALL_ACHIEVEMENTS.length} Achievements]
          </div>
        </header>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 py-12 sm:py-16 relative z-10 flex flex-col gap-12">

          {/* Header Title & Description */}
          <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#84cc16] bg-[#84cc16]/5 border border-[#84cc16]/15 px-3 py-1 rounded">
              Recognitions & Milestones
            </span>
            <h1
              style={{ fontFamily: '"Bebas Neue", sans-serif' }}
              className="text-5xl sm:text-6xl md:text-7xl tracking-wider text-white uppercase mt-2"
            >
              All <span className="text-[#84cc16]">Achievements</span>
            </h1>
            <p className="text-sm font-light text-[#D7E2EA]/60 leading-relaxed">
              Explore the complete record of coding milestones, awards, and hackathon prototypes I have developed.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center items-center gap-3 border-y border-white/5 py-6">
            {(['ALL', 'HACKATHONS', 'AWARDS', 'IoT'] as const).map((filter) => {
              const isActive = activeFilter === filter;
              const displayLabel = filter === 'IoT' ? 'IoT & HARDWARE' : filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`relative px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                    isActive
                      ? 'bg-[#84cc16] text-black border-[#84cc16] shadow-[0_4px_12px_rgba(132,204,22,0.15)]'
                      : 'bg-white/[0.01] text-[#D7E2EA]/50 border-white/5 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {displayLabel}
                </button>
              );
            })}
          </div>

          {/* Grid Layout */}
          <motion.section layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredAchievements.map((ach, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={ach.id}
                >
                  <OverlayAchievementCard
                    achievement={ach}
                    displayNumber={`0${idx + 1}`}
                    onVideoClick={ach.hasVideo ? () => setVideoOpen(true) : undefined}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.section>
        </div>

        <VideoModal
          open={videoOpen}
          onClose={() => setVideoOpen(false)}
          videoSrc="/hackathon.mp4"
        />
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default AllAchievementsOverlay;
