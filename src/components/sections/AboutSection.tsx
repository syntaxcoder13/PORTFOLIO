import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const foregroundContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        // On mobile: immediately set elements visible without pinned scroll animations
        gsap.set(
          [portraitRef.current, bgTextRef.current, foregroundContentRef.current],
          { opacity: 1, x: 0, y: 0, scale: 1 }
        );
        return;
      }

      // On Desktop: Create scroll-driven master timeline with scrub pinning
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1,
          id: 'about-pin',
          anticipatePin: 1,
        },
      });

      // 1. First: Big Portrait Image on Left enters
      tl.fromTo(
        portraitRef.current,
        { x: -100, y: 50, opacity: 0, scale: 0.94 },
        { x: 0, y: 0, opacity: 1, scale: 1, ease: 'power2.out', duration: 1 }
      )
        // 2. Second: "ABOUT ME" huge text reveals from top-right
        .fromTo(
          bgTextRef.current,
          { y: 100, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, ease: 'power2.out', duration: 1.2 },
          '-=0.4'
        )
        // 3. Third: Foreground right content (Signature, Bio & Founder Badge) reveals in front
        .fromTo(
          foregroundContentRef.current,
          { x: 60, y: 30, opacity: 0 },
          { x: 0, y: 0, opacity: 1, ease: 'power2.out', duration: 1.1 },
          '-=0.3'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-20 w-full h-screen bg-[#FAF9F6] text-neutral-900 overflow-hidden select-none flex flex-col justify-between"
      style={{
        background: 'radial-gradient(ellipse 90% 80% at 50% 20%, #FFFFFF 0%, #FAF8F5 55%, #F4F2EC 100%)',
      }}
    >
      {/* Background Subtle Ambient Highlights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-white/80 rounded-full blur-[140px]" />
      </div>

      {/* Main Fullscreen Stage */}
      <div className="relative w-full h-full flex items-center justify-between overflow-hidden">
        
        {/* Layer 1: Giant Background Typography "ABOUT ME" (Positioned at Top-Right) */}
        <div
          ref={bgTextRef}
          className="absolute right-4 sm:right-10 md:right-16 lg:right-24 top-10 sm:top-14 md:top-16 flex items-start justify-end pointer-events-none z-0 opacity-0 select-none text-right"
        >
          <h2
            style={{ fontFamily: '"Bebas Neue", sans-serif' }}
            className="text-[17vw] sm:text-[16vw] md:text-[15vw] lg:text-[14vw] font-extrabold text-[#111111] tracking-tight leading-[0.9] text-right whitespace-nowrap drop-shadow-[0_10px_25px_rgba(0,0,0,0.04)]"
          >
            ABOUT ME
          </h2>
        </div>

        {/* Layer 2: Left-Attached Grand Portrait (arnay4.png) */}
        <div
          ref={portraitRef}
          className="absolute left-0 bottom-0 z-10 h-[70vh] sm:h-[85vh] md:h-[94vh] lg:h-[98vh] w-auto flex items-end justify-start opacity-0 pointer-events-none"
          style={{
            maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
          }}
        >
          <img
            src="/arnay4.png"
            alt="Arnay Tiwari - Founder of MiidayStudio"
            className="h-full w-auto max-w-none object-contain object-left-bottom select-none pointer-events-none drop-shadow-[0_20px_45px_rgba(0,0,0,0.08)] opacity-35 md:opacity-100 transition-opacity"
            draggable={false}
            style={{
              maskImage: 'linear-gradient(to right, black 85%, transparent 98%)',
              WebkitMaskImage: 'linear-gradient(to right, black 85%, transparent 98%)',
            }}
          />
        </div>

        {/* Layer 3: Right Foreground Content (Positioned Neatly Below ABOUT ME) */}
        <div
          ref={foregroundContentRef}
          className="relative z-20 ml-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl flex flex-col items-start text-left opacity-0 pointer-events-auto mt-28 sm:mt-44 md:mt-56 lg:mt-64 px-6 sm:pl-0 sm:pr-12 md:pr-16 lg:pr-24"
        >
          {/* Founder Badge with Link */}
          <a
            href="https://miidaystudio.online/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#111111] hover:bg-black text-white text-[11px] sm:text-[13px] font-medium mb-2 sm:mb-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Founder @ MiidayStudio</span>
            <span className="text-white/60 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">
              ↗
            </span>
          </a>

          {/* Editorial Serif Italic Signature/Name */}
          <div
            style={{
              fontFamily: '"Playfair Display", "Newsreader", "Instrument Serif", Georgia, serif',
            }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-[#111111] italic font-normal tracking-tight select-none mb-2 sm:mb-3 leading-[1.05]"
          >
            Arnay Tiwari
          </div>

          {/* Bio Description */}
          <p
            style={{ fontFamily: '"Plus Jakarta Sans", Inter, sans-serif' }}
            className="text-xs sm:text-sm md:text-base font-normal text-neutral-600 leading-relaxed max-w-xl"
          >
            I'm <span className="font-semibold text-neutral-950">Arnay Tiwari</span>, a Creative Developer, Data Analyst, and the{' '}
            <a
              href="https://miidaystudio.online/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-neutral-950 underline decoration-neutral-300 hover:decoration-neutral-950 underline-offset-4 hover:text-black transition-colors"
            >
              Founder of MiidayStudio
            </a>
            . I specialize in building sleek, high-performance web applications and translating complex data into meaningful insights with precision, clarity, and purpose.
          </p>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
