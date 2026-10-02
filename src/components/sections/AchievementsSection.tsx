import { useEffect, useRef, useState } from 'react';
import { Trophy, Lightbulb, ArrowUpRight, RotateCcw, Video, Sparkles, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VideoModal from '../ui/VideoModal';
import { ALL_ACHIEVEMENTS } from '../../data/achievements';
import type { AchievementData as Achievement } from '../../types/achievement.types';
import AllAchievementsOverlay from '../overlays/AllAchievementsOverlay';

gsap.registerPlugin(ScrollTrigger);

const CURATED_ACHIEVEMENTS = ALL_ACHIEVEMENTS;

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
  total: number;
  isFlipped: boolean;
  onToggleFlip: () => void;
  onVideoClick?: () => void;
  className?: string;
}

const AchievementCard = ({
  achievement,
  index,
  total,
  isFlipped,
  onToggleFlip,
  onVideoClick,
  className = '',
}: AchievementCardProps) => {
  const isAward = achievement.type.toLowerCase().includes('award');
  const isIot = achievement.type.toLowerCase().includes('iot') || achievement.type.toLowerCase().includes('hardware');

  return (
    <div className={`achievement-card w-full h-[480px] sm:h-[460px] [perspective:1200px] select-none ${className}`}>
      <div
        className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]"
        style={{
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* ================= FRONT SIDE ================= */}
        <div
          className="absolute inset-0 w-full h-full rounded-3xl bg-white/90 backdrop-blur-xl border border-neutral-200/80 p-6 sm:p-7 lg:p-8 flex flex-col justify-between shadow-[0_18px_45px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.1)] hover:border-neutral-300 transition-all duration-300 overflow-hidden"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {/* Ambient Background Accent Glow */}
          <div
            className={`absolute -right-16 -top-16 w-44 h-44 rounded-full blur-3xl pointer-events-none opacity-35 ${
              isAward
                ? 'bg-amber-300'
                : isIot
                ? 'bg-indigo-300'
                : 'bg-emerald-300'
            }`}
          />

          {/* Top Bar */}
          <div className="relative z-10 flex items-center justify-between pb-3.5 border-b border-neutral-100">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-neutral-950 text-white font-mono font-bold text-xs tracking-wider">
                0{index + 1}
              </span>
              <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 font-mono text-[11px] font-semibold uppercase tracking-wider border border-neutral-200/60">
                {achievement.type}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-xs">
              <span>{achievement.year}</span>
              <span>•</span>
              <span className="font-semibold text-neutral-600">[{index + 1}/{total}]</span>
            </div>
          </div>

          {/* Middle Body */}
          <div className="relative z-10 flex-1 flex flex-col justify-center py-4 space-y-3.5">
            <div className="space-y-1">
              <span className="text-[10.5px] font-mono uppercase tracking-widest text-neutral-500 font-semibold flex items-center gap-1.5">
                {isAward ? (
                  <>
                    <Award size={13} className="text-amber-600" />
                    <span>Honorable Recognition</span>
                  </>
                ) : isIot ? (
                  <>
                    <Lightbulb size={13} className="text-indigo-600" />
                    <span>Hardware & Web Innovation</span>
                  </>
                ) : (
                  <>
                    <Trophy size={13} className="text-emerald-600" />
                    <span>Hackathon Showcase</span>
                  </>
                )}
              </span>

              <h3
                style={{ fontFamily: '"Playfair Display", "Newsreader", Georgia, serif' }}
                className="text-2xl sm:text-[26px] lg:text-[28px] font-normal text-neutral-950 tracking-tight leading-tight"
              >
                {achievement.title}
              </h3>
            </div>

            <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal">
              {achievement.description}
            </p>

            {/* Quick Metadata Box */}
            <div className="bg-neutral-50/90 border border-neutral-200/70 rounded-2xl p-3 flex flex-col gap-1">
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <span className="font-semibold uppercase tracking-wider">EVENT & ROLE</span>
                <span className="text-neutral-800 font-bold truncate">{achievement.roleInfo}</span>
              </div>
              <div className="text-[11px] text-neutral-600 font-mono truncate">
                📍 {achievement.eventInfo}
              </div>
            </div>
          </div>

          {/* Card Footer Actions */}
          <div className="relative z-10 pt-3.5 flex items-center justify-between gap-2.5 border-t border-neutral-100">
            <button
              type="button"
              onClick={onToggleFlip}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-900 font-mono text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer"
            >
              <span>Problem Statement</span>
              <ArrowUpRight size={12} />
            </button>

            {achievement.hasVideo && onVideoClick && (
              <button
                type="button"
                onClick={onVideoClick}
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-mono font-bold text-[11px] uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer"
              >
                <Video size={12} />
                <span>Pitch Demo</span>
              </button>
            )}
          </div>
        </div>

        {/* ================= BACK SIDE (Problem Statement) ================= */}
        <div
          className="absolute inset-0 w-full h-full rounded-3xl bg-white/95 backdrop-blur-xl border border-neutral-200/90 p-6 sm:p-7 lg:p-8 flex flex-col justify-between shadow-[0_18px_45px_rgba(0,0,0,0.06)] overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-700 flex items-center gap-1.5">
              <Sparkles size={13} />
              <span>THE CHALLENGE & PROMPT</span>
            </span>
            <span className="font-mono text-xs text-neutral-400 font-semibold">0{index + 1} / 0{total}</span>
          </div>

          {/* Body */}
          <div className="flex-1 flex flex-col justify-center py-3 space-y-2.5">
            <h4 className="text-neutral-950 font-bold text-base sm:text-lg leading-snug tracking-tight">
              {achievement.problemTitle}
            </h4>
            <p className="text-xs sm:text-[12.5px] text-neutral-600 leading-relaxed font-normal bg-neutral-50 p-3.5 rounded-2xl border border-neutral-100">
              {achievement.problemDesc}
            </p>
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
            <span className="text-[11px] font-mono text-neutral-500">
              Solved during sprint
            </span>
            <button
              type="button"
              onClick={onToggleFlip}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Flip Back</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AchievementsSection = () => {
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [isAllAchievementsOpen, setIsAllAchievementsOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const gridEl = cardsGridRef.current;
    if (!sectionEl || !gridEl) return;

    const ctx = gsap.context(() => {
      const cards = gridEl.querySelectorAll('.achievement-card');
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.fromTo(
        cards,
        {
          y: 60,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridEl,
            start: 'top 80%',
            toggleActions: 'play none none none',
            id: 'achievements-scroll',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="relative z-30 w-full min-h-screen bg-[#FAF9F6] text-neutral-900 py-20 sm:py-28 px-6 sm:px-10 md:px-16 overflow-visible select-none"
      style={{
        background:
          'radial-gradient(ellipse 95% 85% at 50% 15%, #FFFFFF 0%, #FAF8F5 50%, #ECE8E1 100%)',
      }}
    >
      {/* Background Subtle Accent Grids matching Hero/About/Projects */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-white/70 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="relative z-20 max-w-[1600px] mx-auto w-full">
        
        {/* ================= SECTION HEADER (Matching Hero, About & Projects Theme) ================= */}
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center gap-4 sm:gap-5 mb-16 sm:mb-20">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-300 bg-white/80 backdrop-blur-md shadow-xs text-xs font-mono tracking-widest text-neutral-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>[ 03 / HONORS & MILESTONES ]</span>
          </div>

          {/* Main Editorial Headline */}
          <h2
            style={{ fontFamily: '"Playfair Display", "Newsreader", "Instrument Serif", Georgia, serif' }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] text-[#111111] font-normal tracking-tight leading-[1.08]"
          >
            Forged in competition <br />
            <span className="italic font-normal text-neutral-700">& hackathon sprints.</span>
          </h2>

          {/* Subtitle */}
          <p
            style={{ fontFamily: '"Plus Jakarta Sans", Inter, sans-serif' }}
            className="text-xs sm:text-sm md:text-[15px] text-neutral-600 max-w-xl mx-auto font-normal leading-relaxed"
          >
            A curated record of hackathon awards, national exhibitions, and high-impact prototype engineering milestones.
          </p>
        </div>

        {/* ================= ALL 5 CARDS FULL EDITORIAL GRID ================= */}
        <div ref={cardsGridRef} className="flex flex-col gap-6 sm:gap-8">
          
          {/* Top Row: 2 Major Feature Cards (6 cols + 6 cols) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {CURATED_ACHIEVEMENTS.slice(0, 2).map((ach, idx) => (
              <AchievementCard
                key={ach.id}
                achievement={ach}
                index={idx}
                total={CURATED_ACHIEVEMENTS.length}
                isFlipped={flippedCardId === ach.id}
                onToggleFlip={() => setFlippedCardId((prev) => (prev === ach.id ? null : ach.id))}
                onVideoClick={ach.hasVideo ? () => setVideoOpen(true) : undefined}
              />
            ))}
          </div>

          {/* Bottom Row: 3 Highlight Cards (4 cols + 4 cols + 4 cols) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {CURATED_ACHIEVEMENTS.slice(2, 5).map((ach, idx) => (
              <AchievementCard
                key={ach.id}
                achievement={ach}
                index={idx + 2}
                total={CURATED_ACHIEVEMENTS.length}
                isFlipped={flippedCardId === ach.id}
                onToggleFlip={() => setFlippedCardId((prev) => (prev === ach.id ? null : ach.id))}
                onVideoClick={ach.hasVideo ? () => setVideoOpen(true) : undefined}
              />
            ))}
          </div>

        </div>

        {/* ================= BOTTOM BAR (Archive Button & Footer) ================= */}
        <div className="mt-16 sm:mt-24 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-200 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-3">
            <span className="text-neutral-900 font-bold">HONORS ARCHIVE</span>
            <span>•</span>
            <span>0{CURATED_ACHIEVEMENTS.length} COMPETITIVE MILESTONES</span>
          </div>

          <button
            onClick={() => setIsAllAchievementsOpen(true)}
            className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-neutral-300 bg-white hover:bg-neutral-950 hover:border-neutral-950 hover:text-white text-neutral-800 font-semibold text-xs tracking-wider transition-all duration-300 cursor-pointer shadow-xs"
          >
            <span>VIEW ALL ACHIEVEMENTS ARCHIVE</span>
            <ArrowUpRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>

      </div>

      {/* Video Modal (for hackathon demo pitch) */}
      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoSrc="/hackathon.mp4"
      />

      {/* Full Achievements Overlay Modal */}
      <AllAchievementsOverlay
        open={isAllAchievementsOpen}
        onClose={() => setIsAllAchievementsOpen(false)}
      />
    </section>
  );
};

export default AchievementsSection;
