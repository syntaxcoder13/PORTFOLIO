import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiJavascript } from 'react-icons/si';
import { SiPython, SiPandas, SiMysql } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const techTrayRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP entry timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 1. Left column elements: Staggered reveal
    tl.fromTo([greetingRef.current, titleRef.current, descRef.current, techTrayRef.current],
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.15 }
    );

    // 2. Right portrait container: Slide in and subtle scale back-bounce
    tl.fromTo(portraitRef.current,
      { x: 50, scale: 0.96, opacity: 0 },
      { x: 0, scale: 1, opacity: 1, duration: 1.1, ease: 'back.out(1.1)' },
      '-=0.6'
    );

    // 3. Scroll indicator: Fade up
    tl.fromTo(scrollIndicatorRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.4'
    );

    // 5. Scroll-linked transition (Hero pinning)
    const pinTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      pin: true,
      pinSpacing: false,
      id: 'hero-pin',
    });

    return () => {
      pinTrigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-[#0C0C0C] flex flex-col justify-between"
    >
      {/* Wrapper for scroll-linked animations */}
      <div
        ref={contentWrapperRef}
        className="flex-1 flex flex-col justify-between w-full relative origin-center"
      >
        {/* Background Dot grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* Spacer to preserve layout structure since header is fixed */}
        <div className="h-[44px] md:h-[52px] w-full shrink-0 pointer-events-none" />

        {/* Main split-grid layout content */}
        <div className="relative z-10 flex-1 flex items-center w-full max-w-7xl mx-auto px-6 md:px-10 py-12 lg:py-0">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left Column: Typography, Bio & CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-center gap-6 text-left">
              <div
                ref={greetingRef}
                className="flex items-center gap-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-[#D7E2EA]/60 select-none opacity-0"
              >
                <span className="h-2 w-2 rounded-full bg-[#a3e635] shadow-[0_0_8px_#a3e635]" />
                <span>HI I'M ARNAY TIWARI 👋</span>
              </div>

              <h1
                ref={titleRef}
                style={{ fontFamily: '"Bebas Neue", sans-serif' }}
                className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider text-white leading-[1.05] opacity-0"
              >
                <span className="whitespace-normal sm:whitespace-nowrap">Frontend <span className="text-[#a3e635]">Developer</span></span>
                <br />
                <span className="whitespace-normal sm:whitespace-nowrap">& <span className="text-[#a3e635]">Data Analyst</span></span>
              </h1>

              <p
                ref={descRef}
                className="text-sm sm:text-base md:text-lg font-light text-[#D7E2EA]/65 max-w-xl leading-relaxed opacity-0"
              >
                I build modern web experiences and turn complex data into clear, actionable insights.
              </p>

              {/* Tech Stack Tray */}
              <div
                ref={techTrayRef}
                className="mt-6 flex flex-col gap-5 opacity-0 select-none"
              >
                {/* Frontend Row */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#D7E2EA]/40 font-bold">Frontend Stack</span>
                  <div className="flex flex-wrap gap-3">

                    {/* React */}
                    <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#0f2430] border border-[#1b3d52] hover:scale-110 transition-all duration-300 shadow-sm cursor-pointer">
                      <SiReact size={22} color="#61dafb" />
                    </a>

                    {/* Next.js */}
                    <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#141414] border border-[#292929] hover:scale-110 transition-all duration-300 shadow-sm cursor-pointer">
                      <SiNextdotjs size={22} color="#ffffff" />
                    </a>

                    {/* TypeScript */}
                    <a href="https://www.typescriptlang.org" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#112240] border border-[#1d3557] hover:scale-110 transition-all duration-300 shadow-sm cursor-pointer">
                      <SiTypescript size={22} color="#3178c6" />
                    </a>

                    {/* Tailwind CSS */}
                    <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#0f2d3a] border border-[#1a4a5e] hover:scale-110 transition-all duration-300 shadow-sm cursor-pointer">
                      <SiTailwindcss size={22} color="#38bdf8" />
                    </a>

                    {/* JavaScript */}
                    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#f7df1e] border border-[#d4be10] hover:scale-110 transition-all duration-300 shadow-sm cursor-pointer">
                      <SiJavascript size={22} color="#000000" />
                    </a>

                  </div>
                </div>

                {/* Data Analyst Row */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#D7E2EA]/40 font-bold">Data Analyst Stack</span>
                  <div className="flex flex-wrap gap-3">

                    {/* Python */}
                    <a href="https://www.python.org" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#1c2d3d] border border-[#2c4b63] hover:scale-110 transition-all duration-300 shadow-sm cursor-pointer">
                      <SiPython size={22} color="#3776ab" />
                    </a>

                    {/* Power BI */}
                    <a href="https://powerbi.microsoft.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#1a1400] border border-[#3d3000] hover:scale-110 transition-all duration-300 shadow-sm cursor-pointer">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                        <rect x="3" y="14" width="4" height="7" rx="1" fill="#f2c811" opacity="0.5" />
                        <rect x="8.5" y="9" width="4" height="12" rx="1" fill="#f2c811" opacity="0.75" />
                        <rect x="14" y="4" width="4" height="17" rx="1" fill="#f2c811" />
                        <rect x="19" y="3" width="2" height="18" rx="0.5" fill="#f2c811" opacity="0.3" />
                      </svg>
                    </a>

                    {/* Pandas */}
                    <a href="https://pandas.pydata.org" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#130c24] border border-[#2a1950] hover:scale-110 transition-all duration-300 shadow-sm cursor-pointer">
                      <SiPandas size={22} color="#150458" style={{ filter: 'brightness(2)' }} />
                    </a>

                    {/* Tableau */}
                    <a href="https://www.tableau.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#1a1c2a] border border-[#2e3350] hover:scale-110 transition-all duration-300 shadow-sm cursor-pointer">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                        <rect x="10.5" y="2" width="3" height="20" fill="#5b9bd5" rx="0.5" />
                        <rect x="2" y="10.5" width="20" height="3" fill="#5b9bd5" rx="0.5" />
                        <rect x="7" y="7" width="3" height="10" fill="#e97627" rx="0.5" />
                        <rect x="14" y="7" width="3" height="10" fill="#e97627" rx="0.5" />
                        <rect x="7" y="7" width="10" height="3" fill="#e97627" rx="0.5" />
                        <rect x="7" y="14" width="10" height="3" fill="#e97627" rx="0.5" />
                        <rect x="10.5" y="10.5" width="3" height="3" fill="#ffffff" rx="0.3" />
                      </svg>
                    </a>

                    {/* SQL */}
                    <a href="https://www.mysql.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#0d1f2d] border border-[#1a3a52] hover:scale-110 transition-all duration-300 shadow-sm cursor-pointer">
                      <SiMysql size={26} color="#00758f" />
                    </a>

                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Portrait Image */}
            <div className="lg:col-span-5 relative flex items-center justify-center w-full h-full min-h-[420px] lg:min-h-0">

              {/* Background Dot grid matrix behind portrait */}
              <div className="absolute top-0 right-16 -z-10 opacity-30 select-none">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                  <pattern id="dot-grid-pattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="#ffffff" fillOpacity="0.25" />
                  </pattern>
                  <rect width="120" height="120" fill="url(#dot-grid-pattern)" />
                </svg>
              </div>

              {/* Plain wrapper without card styling to let image float */}
              <div
                ref={portraitRef}
                className="relative w-full max-w-[480px] sm:max-w-[520px] lg:max-w-[560px] aspect-[4/5] group/portrait opacity-0"
              >
                <img
                  src="/arnay.png"
                  alt="Arnay Tiwari"
                  className="relative z-10 w-full h-full object-cover opacity-85 select-none"
                  draggable={false}
                  style={{
                    maskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)'
                  }}
                />
              </div>

            </div>
          </div>
        </div>

        {/* Bottom bar: Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-6 left-6 md:left-10 z-20 opacity-0"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-[8px] uppercase tracking-[0.3em] text-white/30 [writing-mode:vertical-lr] select-none pb-2">
              Scroll to explore
            </span>
            <div className="relative h-10 w-px overflow-hidden bg-white/20">
              <span
                className="absolute inset-x-0 top-0 h-1/2 w-full bg-white"
                style={{ animation: 'scrollLine 1.8s ease-in-out infinite' }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
