import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const mainImageContainerRef = useRef<HTMLDivElement>(null);
  const cardLeftRef = useRef<HTMLDivElement>(null);
  const cardRightRef = useRef<HTMLDivElement>(null);
  const badgeRotatingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Staggered top headline & actions reveal
      tl.fromTo(
        headlineRef.current,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.7'
        )
        // Center visual zoom & fade
        .fromTo(
          mainImageContainerRef.current,
          { scale: 0.94, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' },
          '-=0.7'
        )
        // Floating side cards slide in
        .fromTo(
          [cardLeftRef.current, cardRightRef.current],
          { y: 40, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 1.0, stagger: 0.15, ease: 'back.out(1.2)' },
          '-=0.9'
        )
        // Top right stamp badge
        .fromTo(
          badgeRotatingRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.7'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full bg-[#FAF9F6] text-neutral-900 flex flex-col pt-24 sm:pt-32 pb-0 select-none overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 90% 80% at 50% 20%, #FFFFFF 0%, #FAF8F5 55%, #F4F2EC 100%)',
      }}
    >
      {/* Background Subtle Ambient Highlights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-white/70 rounded-full blur-[100px] -z-10" />
      </div>

      {/* Top Right Rotating Circular Stamp Badge */}
      <div
        ref={badgeRotatingRef}
        className="hidden sm:flex absolute top-20 sm:top-28 right-4 sm:right-12 lg:right-20 z-20 pointer-events-none opacity-0"
      >
        <div className="relative w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center animate-[spin_22s_linear_infinite]">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <path
              id="circleBadgePath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="none"
            />
            <text className="text-[7.2px] font-semibold tracking-[0.24em] fill-neutral-800 uppercase">
              <textPath href="#circleBadgePath" startOffset="0%">
                ★ ARNAY TIWARI ★ CREATIVE DEVELOPER ★
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            {/* 4-point Star */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-neutral-900">
              <path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Hero Header Area (Typography + Subtitle) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-3 sm:gap-5">

        {/* Main Serif Headline */}
        <h1
          ref={headlineRef}
          style={{ fontFamily: '"Playfair Display", "Newsreader", "Instrument Serif", Georgia, serif' }}
          className="text-3xl min-[400px]:text-4xl sm:text-6xl md:text-7xl lg:text-[82px] text-[#111111] font-normal tracking-tight leading-[1.1] sm:leading-[1.08] opacity-0"
        >
          Crafting modern web <br />
          <span className="italic font-normal">and data-driven clarity.</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          style={{ fontFamily: '"Plus Jakarta Sans", Inter, sans-serif' }}
          className="text-xs sm:text-sm md:text-[15px] text-neutral-600 max-w-xl mx-auto font-normal leading-relaxed opacity-0 mt-1 px-2"
        >
          Hi, I'm Arnay Tiwari. I build responsive web applications, design fluid interactive experiences, and turn complex data into actionable insights.
        </p>
      </div>

      {/* Main Interactive Visual Centerpiece with Connecting Lines & Floating Cards */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 mt-6 sm:mt-8 flex flex-col items-center justify-end pb-8 sm:pb-0 mb-0">

        {/* Mobile-only cards row (Clean presentation when portrait is hidden) */}
        <div className="flex sm:hidden flex-row items-center justify-center gap-2.5 w-full max-w-md mx-auto my-4">
          <div className="bg-white/95 backdrop-blur-xl border border-neutral-200/80 shadow-[0_10px_25px_rgba(0,0,0,0.05)] rounded-2xl p-3.5 flex-1 text-left">
            <div className="w-7 h-7 rounded-lg bg-neutral-100/90 flex items-center justify-center mb-2">
              <div className="flex items-center gap-[2px] h-3">
                <span className="w-[1.5px] h-2 bg-neutral-800 rounded-full" />
                <span className="w-[1.5px] h-3 bg-neutral-800 rounded-full" />
                <span className="w-[1.5px] h-1.5 bg-neutral-800 rounded-full" />
                <span className="w-[1.5px] h-2.5 bg-neutral-800 rounded-full" />
              </div>
            </div>
            <h4 className="text-[11px] font-bold text-neutral-900 leading-snug">
              Frontend Dev.
            </h4>
            <p className="text-[9px] text-neutral-500 mt-0.5 font-normal leading-tight">
              Modern & fluid UI.
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-xl border border-neutral-200/80 shadow-[0_10px_25px_rgba(0,0,0,0.05)] rounded-2xl p-3.5 flex-1 text-left">
            <div className="flex items-center -space-x-1 mb-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces"
                alt="User 1"
                className="w-4 h-4 rounded-full border-2 border-white object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces"
                alt="User 2"
                className="w-4 h-4 rounded-full border-2 border-white object-cover"
              />
              <div className="w-4 h-4 rounded-full border-2 border-white bg-neutral-100 flex items-center justify-center text-[7px] font-bold text-neutral-600">
                +
              </div>
            </div>
            <h4 className="text-[11px] font-bold text-neutral-900 leading-snug">
              Data Analytics.
            </h4>
            <p className="text-[9px] text-neutral-500 mt-0.5 font-normal leading-tight">
              Actionable insights.
            </p>
          </div>
        </div>

        {/* Desktop & Tablet Visual Stage with Floating Cards and Portrait */}
        <div className="relative w-full max-w-[820px] lg:max-w-[920px] hidden sm:flex items-center justify-center pb-0 mb-0">

          {/* Left Floating Card */}
          <div
            ref={cardLeftRef}
            className="absolute sm:-left-14 md:-left-24 lg:-left-36 xl:-left-48 top-0 sm:top-2 md:top-6 z-20 opacity-0 pointer-events-auto transition-transform duration-500 hover:-translate-y-1.5"
          >
            <div className="bg-white/95 backdrop-blur-xl border border-white/80 shadow-[0_18px_40px_rgba(0,0,0,0.06)] rounded-2xl sm:rounded-3xl p-4 sm:p-5 w-[195px] md:w-[215px] text-left">
              {/* Soundwave Icon */}
              <div className="w-8 h-8 rounded-xl bg-neutral-100/90 flex items-center justify-center mb-3">
                <div className="flex items-center gap-[3px] h-3.5">
                  <span className="w-[2px] h-2 bg-neutral-800 rounded-full" />
                  <span className="w-[2px] h-3.5 bg-neutral-800 rounded-full" />
                  <span className="w-[2px] h-1.5 bg-neutral-800 rounded-full" />
                  <span className="w-[2px] h-3 bg-neutral-800 rounded-full" />
                </div>
              </div>
              <h4 className="text-xs sm:text-[13px] font-bold text-neutral-900 leading-snug tracking-tight">
                Frontend Engineering.
              </h4>
              <p className="text-[10px] sm:text-[11px] text-neutral-500 mt-1 font-normal leading-relaxed">
                Modern, fluid & scalable UI.
              </p>
            </div>
          </div>

          {/* Right Floating Card */}
          <div
            ref={cardRightRef}
            className="absolute sm:-right-14 md:-right-24 lg:-right-36 xl:-right-48 top-6 sm:top-10 md:top-12 z-20 opacity-0 pointer-events-auto transition-transform duration-500 hover:-translate-y-1.5"
          >
            <div className="bg-white/95 backdrop-blur-xl border border-white/80 shadow-[0_18px_40px_rgba(0,0,0,0.06)] rounded-2xl sm:rounded-3xl p-4 sm:p-5 w-[195px] md:w-[215px] text-left">
              {/* Avatars Row */}
              <div className="flex items-center -space-x-1.5 mb-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces"
                  alt="User 1"
                  className="w-6 h-6 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces"
                  alt="User 2"
                  className="w-6 h-6 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces"
                  alt="User 3"
                  className="w-6 h-6 rounded-full border-2 border-white object-cover"
                />
                <div className="w-6 h-6 rounded-full border-2 border-white bg-neutral-100 flex items-center justify-center text-[9px] font-bold text-neutral-600">
                  +
                </div>
              </div>
              <h4 className="text-xs sm:text-[13px] font-bold text-neutral-900 leading-snug tracking-tight">
                Data Analytics.
              </h4>
              <p className="text-[10px] sm:text-[11px] text-neutral-500 mt-1 font-normal leading-relaxed">
                Turning numbers into insights.
              </p>
            </div>
          </div>

          {/* SVG Connecting Thread Lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden md:block overflow-visible"
            viewBox="0 0 900 500"
            fill="none"
          >
            <path
              d="M -30 110 C 60 140 160 220 250 265"
              stroke="#D4D2CA"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 930 150 C 840 190 740 270 650 305"
              stroke="#D4D2CA"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          {/* Central Portrait of Arnay with 3D Ring Halo (Desktop & Tablet only) */}
          <div
            ref={mainImageContainerRef}
            className="relative w-full max-w-[820px] lg:max-w-[940px] xl:max-w-[1020px] opacity-0"
            style={{
              maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
            }}
          >
            {/* Soft Radial Glow behind portrait */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-white/80 rounded-full blur-3xl -z-10" />

            <img
              src="/arnay3.png"
              alt="Arnay Tiwari - Hero Portrait"
              className="w-full h-auto object-contain block select-none pointer-events-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.06)]"
              draggable={false}
              style={{
                maskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 85%, transparent 99%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 85%, transparent 99%)',
              }}
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;
