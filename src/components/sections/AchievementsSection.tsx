import { useEffect, useRef, useState } from 'react';
import { Trophy, Lightbulb, ArrowUpRight, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useMediaQuery from '../../hooks/useMediaQuery';
import VideoModal from '../ui/VideoModal';
import { ALL_ACHIEVEMENTS } from '../../data/achievements';
import type { AchievementData as Achievement } from '../../types/achievement.types';
import AllAchievementsOverlay from '../overlays/AllAchievementsOverlay';

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// Helpers — derive per-achievement accent classes from ID
// ---------------------------------------------------------------------------
const getBackBorderClass = (id: string): string => {
  if (id === 'hack-1' || id === 'techxpression') return 'border-emerald-400/80 shadow-emerald-100/10';
  if (id === 'horizon')   return 'border-amber-400/80  shadow-amber-100/10';
  if (id === 'aavishkar') return 'border-indigo-400/80  shadow-indigo-100/10';
  return                          'border-purple-400/80  shadow-purple-100/10';
};

const getAccentColorClass = (id: string): string => {
  if (id === 'hack-1' || id === 'techxpression') return 'text-emerald-700';
  if (id === 'horizon')   return 'text-amber-700';
  if (id === 'aavishkar') return 'text-indigo-700';
  return                          'text-purple-700';
};

// ---------------------------------------------------------------------------
// AchievementCardBack — back face of the flip card
// ---------------------------------------------------------------------------
interface CardBackProps {
  achievement: Achievement;
  displayNumber: string;
  onToggleFlip: () => void;
}

const AchievementCardBack = ({ achievement, displayNumber, onToggleFlip }: CardBackProps) => (
  <div
    className={`absolute inset-0 w-full h-full rounded-2xl border bg-[#fdfdfd] p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${getBackBorderClass(achievement.id)}`}
    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
  >
    {/* Top Bar */}
    <div className="flex items-center justify-between pb-3.5 border-b border-neutral-200/60 select-none">
      <span className={`text-[10px] font-bold uppercase tracking-widest ${getAccentColorClass(achievement.id)}`}>
        Problem Statement
      </span>
      <span className="font-mono text-xs font-semibold text-neutral-400">/ {displayNumber}</span>
    </div>

    {/* Body */}
    <div className="flex-1 flex flex-col justify-center py-4">
      <h4 className="text-neutral-900 font-bold text-sm sm:text-base leading-tight mb-2 uppercase tracking-wide">
        {achievement.problemTitle}
      </h4>
      <p className="text-xs sm:text-sm font-normal text-neutral-700 leading-relaxed">
        {achievement.problemDesc}
      </p>
    </div>

    {/* Footer */}
    <div className="flex justify-end border-t border-neutral-200/60 pt-3.5">
      <button
        type="button"
        onClick={onToggleFlip}
        className="w-auto flex items-center justify-center gap-1.5 rounded-full border border-neutral-300 bg-neutral-100 hover:bg-[#84cc16] hover:border-[#84cc16] hover:text-black text-neutral-800 px-4 py-2 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider transition-all duration-300 cursor-pointer"
      >
        <RotateCcw size={12} />
        <span>Back</span>
      </button>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// AchievementCard — full flip card (front + back)
// ---------------------------------------------------------------------------
interface AchievementCardProps {
  achievement: Achievement;
  displayNumber: string;
  isFlipped: boolean;
  onToggleFlip: () => void;
  onVideoClick?: () => void;
}

const AchievementCard = ({
  achievement,
  displayNumber,
  isFlipped,
  onToggleFlip,
  onVideoClick,
}: AchievementCardProps) => {
  const Icon = achievement.iconType === 'lightbulb' ? Lightbulb : Trophy;

  return (
    <div className={`relative w-full ${achievement.colSpan} h-[390px] sm:h-[340px] [perspective:1000px] flex flex-col`}>
      <motion.div
        className="relative w-full h-full [transform-style:preserve-3d] flex flex-col"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {/* FRONT SIDE */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl border border-neutral-200 bg-[#fdfdfd] p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md hover:border-neutral-300 transition-all duration-300"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-3.5 border-b border-neutral-200/60 select-none">
            <div className="flex items-center gap-3">
              <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-2 text-neutral-600">
                <Icon size={16} strokeWidth={1.5} />
              </div>
              <span className={`text-[9px] font-bold uppercase tracking-wider border rounded-full px-2.5 py-0.5 ${achievement.typeColorClass}`}>
                {achievement.type}
              </span>
            </div>
            <span className="font-mono text-xs font-semibold text-neutral-400">/ {displayNumber}</span>
          </div>

          {/* Body */}
          <div className="flex-1 flex gap-6 justify-between items-center py-4">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-normal text-neutral-600 leading-relaxed">
                {achievement.description}
              </p>
            </div>

            {/* Right detail panel — Aavishkar */}
            {achievement.id === 'aavishkar' && (
              <div className="hidden md:flex w-44 flex-col justify-between rounded-xl border border-neutral-200 bg-neutral-50/70 p-4 relative overflow-hidden shrink-0 select-none">
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-indigo-500/[0.02] blur-lg pointer-events-none" />
                <div className="flex flex-col gap-2.5">
                  <div className="flex flex-col">
                    <span className="text-[8px] uppercase tracking-widest text-neutral-500 font-bold">Microcontroller / IoT</span>
                    <span className="text-[10px] text-neutral-800 font-mono leading-relaxed mt-0.5">Arduino / ESP32</span>
                  </div>
                  <div className="border-t border-neutral-200 w-full" />
                  <div className="flex flex-col">
                    <span className="text-[8px] uppercase tracking-widest text-neutral-500 font-bold">Dashboard Stack</span>
                    <span className="text-[10px] text-neutral-800 font-mono leading-relaxed mt-0.5">React · CSS</span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-neutral-200 pt-2 mt-2">
                  <span className="text-[8px] font-bold text-indigo-700 uppercase tracking-wider">Showcased</span>
                  <ArrowUpRight className="text-neutral-400" size={12} />
                </div>
              </div>
            )}

            {/* Right detail panel — Sheryians */}
            {achievement.id === 'sheryians' && (
              <div className="hidden md:flex w-44 flex-col justify-center rounded-xl border border-neutral-200 bg-neutral-50/70 p-4 relative overflow-hidden shrink-0 select-none">
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-purple-500/[0.02] blur-lg pointer-events-none" />
                <div className="flex flex-col gap-2.5">
                  <div className="flex flex-col">
                    <span className="text-[8px] uppercase tracking-widest text-neutral-500 font-bold">Cohort Program</span>
                    <span className="text-[10px] text-neutral-800 font-mono leading-relaxed mt-0.5">Sheryians Cohort 2</span>
                  </div>
                  <div className="border-t border-neutral-200 w-full" />
                  <div className="flex flex-col">
                    <span className="text-[8px] uppercase tracking-widest text-neutral-500 font-bold">Team & Duration</span>
                    <span className="text-[10px] text-neutral-800 font-mono leading-relaxed mt-0.5">3 members / 48h</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-t border-neutral-200/60 pt-3.5 mt-auto">
            <div className="flex flex-col gap-0.5 min-w-0 mr-4">
              <span className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider text-neutral-500 truncate">
                {achievement.roleInfo} · {achievement.eventInfo}
              </span>
              <h3 className="font-bold text-sm sm:text-base text-neutral-900 uppercase tracking-wide truncate">
                {achievement.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 shrink-0 justify-end">
              {achievement.hasVideo && onVideoClick && (
                <button
                  type="button"
                  onClick={onVideoClick}
                  className="flex-initial flex items-center justify-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 hover:bg-[#84cc16] hover:border-[#84cc16] hover:text-black text-purple-800 px-3 py-1.5 sm:px-3.5 sm:py-2 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider transition-all duration-300 cursor-pointer"
                >
                  <span>Pitch Video</span>
                  <ArrowUpRight size={12} />
                </button>
              )}
              <button
                type="button"
                onClick={onToggleFlip}
                className="flex-initial flex items-center justify-center gap-1.5 rounded-full border border-neutral-300 bg-neutral-100 hover:bg-[#84cc16] hover:border-[#84cc16] hover:text-black text-neutral-800 px-3 py-1.5 sm:px-3.5 sm:py-2 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider transition-all duration-300 cursor-pointer"
              >
                <span>Problem Details</span>
                <ArrowUpRight size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <AchievementCardBack
          achievement={achievement}
          displayNumber={displayNumber}
          onToggleFlip={onToggleFlip}
        />
      </motion.div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// AchievementsSection — main section wrapper
// ---------------------------------------------------------------------------
const AchievementsSection = () => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [isAllAchievementsOpen, setIsAllAchievementsOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const gutterLineRef = useRef<HTMLDivElement>(null);
  const gutterTextRef = useRef<HTMLSpanElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery('(max-width: 767px)');

  // GSAP scroll entry animations
  useEffect(() => {
    const triggerEl = sectionRef.current;
    if (!triggerEl) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: triggerEl, start: 'top 75%', toggleActions: 'play none none none' },
    });

    // Left gutter
    tl.fromTo(gutterLineRef.current,
      { scaleY: 0 },
      { scaleY: 1, duration: 1.0, transformOrigin: 'top center', ease: 'power2.out' }
    ).fromTo(gutterTextRef.current,
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.7'
    );

    // Typography
    tl.fromTo(
      [tagRef.current, titleRef.current, lineRef.current, descRef.current],
      { y: 45, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
      '-=0.8'
    );

    // Cards
    if (cardsContainerRef.current) {
      tl.fromTo(
        cardsContainerRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
        '-=0.6'
      );
    }

    const btnTl = gsap.timeline({
      scrollTrigger: {
        trigger: buttonRef.current,
        start: 'top 95%',
        toggleActions: 'play none none none',
        id: 'achievements-button-trigger',
      },
    });

    btnTl.fromTo(buttonRef.current,
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
    );

    const scrollTrigger = ScrollTrigger.create({
      trigger: triggerEl,
      start: 'top top',
      id: 'achievements-scroll',
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      btnTl.scrollTrigger?.kill();
      btnTl.kill();
      scrollTrigger.kill();
    };
  }, []);

  const visibleAchievements = isMobile
    ? ALL_ACHIEVEMENTS.filter((ach) => ach.id === 'aavishkar' || ach.id === 'sheryians')
    : ALL_ACHIEVEMENTS;

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="relative z-30 w-full rounded-t-2xl sm:rounded-t-3xl bg-[#E5EEE4] text-neutral-900 px-6 sm:px-12 md:px-20 py-24 sm:py-32 overflow-hidden border-t border-neutral-200 shadow-[0_-25px_60px_rgba(0,0,0,0.05)] animate-gpu"
    >
      {/* Background dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* Left Vertical Gutter */}
        <div className="hidden xl:flex absolute -left-14 xl:-left-16 top-1/2 -translate-y-1/2 flex-col items-center gap-6 pointer-events-none select-none">
          <span
            ref={gutterTextRef}
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 [writing-mode:vertical-lr] rotate-180 opacity-0"
          >
            Achievements
          </span>
          <div ref={gutterLineRef} className="h-24 w-px bg-neutral-200 relative scale-y-0">
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-[#84cc16]" />
          </div>
        </div>

        {/* Editorial Header */}
        <div className="mb-16 sm:mb-20 md:mb-24 flex flex-col items-start gap-5 text-left xl:pl-12">
          <div
            ref={tagRef}
            className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-neutral-500 select-none opacity-0"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#84cc16] shadow-[0_0_6px_#84cc16]" />
            <span>Recognitions</span>
          </div>

          <h2
            ref={titleRef}
            style={{ fontFamily: '"Bebas Neue", sans-serif' }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider text-neutral-900 leading-[1.05] opacity-0"
          >
            Milestones & <span className="text-[#84cc16]">Achievements</span>
          </h2>

          <div ref={lineRef} className="w-12 h-[2px] bg-neutral-200 my-2 opacity-0" />

          <p
            ref={descRef}
            className="text-sm sm:text-base md:text-lg font-normal text-neutral-600 max-w-xl leading-relaxed opacity-0"
          >
            Hackathons, awards, and showcase highlights from my coding journey.
          </p>
        </div>

        {/* Bento Grid */}
        <div ref={cardsContainerRef} className="relative z-10 grid grid-cols-1 md:grid-cols-6 gap-6 xl:pl-12">
          {visibleAchievements.map((ach, i) => (
            <AchievementCard
              key={ach.id}
              achievement={ach}
              displayNumber={`0${i + 1}`}
              isFlipped={activeCardId === ach.id}
              onToggleFlip={() => setActiveCardId((prev) => (prev === ach.id ? null : ach.id))}
              onVideoClick={ach.hasVideo ? () => setVideoOpen(true) : undefined}
            />
          ))}
        </div>

        {/* View All Button */}
        <div ref={buttonRef} className="mt-16 sm:mt-20 flex justify-center z-20 relative opacity-0">
          <button
            onClick={() => setIsAllAchievementsOpen(true)}
            className="group/all-btn inline-flex items-center justify-center gap-3 rounded-full border border-neutral-300 bg-neutral-100 px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-widest text-neutral-800 hover:bg-[#84cc16] hover:border-[#84cc16] hover:text-black transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
          >
            <span>View All Achievements</span>
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/all-btn:translate-x-0.5 group-hover/all-btn:-translate-y-0.5" />
          </button>
        </div>

      </div>

      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoSrc="/hackathon.mp4"
      />

      <AllAchievementsOverlay
        open={isAllAchievementsOpen}
        onClose={() => setIsAllAchievementsOpen(false)}
      />
    </section>
  );
};

export default AchievementsSection;
