import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const gutterLineRef = useRef<HTMLDivElement>(null);
  const gutterTextRef = useRef<HTMLSpanElement>(null);
  
  const greetingRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  
  const circleRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const portraitImgRef = useRef<HTMLImageElement>(null);
  const skillBadgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggerEl = sectionRef.current;
    if (!triggerEl) return;

    // GSAP ScrollTrigger timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top 75%', // triggers when the top of the section is 75% down the viewport
        toggleActions: 'play none none none', // animate once on enter
      }
    });

    // 1. Left Vertical Gutter Animation
    tl.fromTo(gutterLineRef.current,
      { scaleY: 0 },
      { scaleY: 1, duration: 1.0, transformOrigin: 'top center', ease: 'power2.out' }
    )
    .fromTo(gutterTextRef.current,
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.7'
    );

    // 2. Left Typography Column: Staggered Fade Up
    tl.fromTo([greetingRef.current, titleRef.current, lineRef.current, descRef.current],
      { y: 55, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
      '-=0.8'
    );

    // 3. Center Portrait & Decorative Elements Animation
    tl.fromTo(circleRef.current,
      { scale: 0.65, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' },
      '-=1.0'
    )
    .fromTo(dotsRef.current,
      { opacity: 0, x: -25 },
      { opacity: 1, x: 0, duration: 0.8 },
      '-=0.8'
    )
    .fromTo(portraitImgRef.current,
      { scale: 0.9, y: 50, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.1)' },
      '-=1.0'
    );

    // 4. Right Column Badges: Slide in stagger
    if (skillBadgesRef.current) {
      const items = skillBadgesRef.current.children;
      tl.fromTo(items,
        { x: 35, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
        '-=0.8'
      );
    }

    // 5. Exit ScrollTrigger: keep About section pinned as Projects section overlay slides up
    const exitPin = ScrollTrigger.create({
      trigger: triggerEl,
      start: 'top top',
      end: 'bottom top',
      pin: true,
      pinSpacing: false,
      id: 'about-pin',
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      exitPin.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-20 w-full bg-[#f4f3ef] text-[#1c1c1c] px-6 sm:px-12 md:px-20 py-24 sm:py-32 overflow-hidden border-t border-black/10 shadow-[0_-25px_60px_rgba(0,0,0,0.3)]"
    >
      <div 
        ref={contentWrapperRef} 
        className="w-full h-full relative origin-center"
      >
        {/* Subtle dark dot pattern on the cream background */}
        <div className="absolute inset-0 bg-[radial-gradient(#00000005_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Main Container */}
        <div className="max-w-7xl mx-auto w-full relative z-10">
          
          {/* Left Vertical Gutter Gimmick */}
          <div className="hidden xl:flex absolute -left-14 xl:-left-16 top-1/2 -translate-y-1/2 flex-col items-center gap-6 pointer-events-none select-none">
            <span 
              ref={gutterTextRef}
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 [writing-mode:vertical-lr] rotate-180 opacity-0"
            >
              About
            </span>
            <div 
              ref={gutterLineRef}
              className="h-24 w-px bg-black/10 relative scale-y-0"
            >
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-[#84cc16]" />
            </div>
          </div>

          {/* Top Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Typography */}
            <div className="lg:col-span-5 flex flex-col items-start gap-6 text-left xl:pl-12">
              <div 
                ref={greetingRef}
                className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-black/40 select-none opacity-0"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#84cc16]" />
                <span>About Me</span>
              </div>

              <h2 
                ref={titleRef}
                style={{ fontFamily: '"Bebas Neue", sans-serif' }}
                className="text-5xl sm:text-6xl md:text-7xl tracking-wider text-[#1c1c1c] leading-[1.05] opacity-0"
              >
                I turn ideas into <br />
                impactful <span className="text-[#84cc16]">digital</span> <br />
                products and <br />
                <span className="text-[#84cc16]">insights.</span>
              </h2>

              <div 
                ref={lineRef}
                className="w-12 h-[2px] bg-black/15 my-2 opacity-0" 
              />

              <p 
                ref={descRef}
                className="text-sm sm:text-base text-black/60 max-w-md font-light leading-relaxed opacity-0"
              >
                I'm a Frontend Developer and Data Analyst who enjoys building clean, user-friendly experiences and extracting meaningful insights from data.
              </p>
            </div>

            {/* Center Column: Floating Portrait */}
            <div className="lg:col-span-5 flex items-center justify-center relative min-h-[420px] lg:min-h-0">
              <div className="w-full flex justify-center">
                <div className="relative w-full max-w-[380px] sm:max-w-[440px] lg:max-w-[480px] aspect-[4/5]">
                  
                  {/* Dot grid decoration behind portrait on the left */}
                  <div 
                    ref={dotsRef}
                    className="absolute top-1/4 -left-8 -z-10 opacity-0"
                  >
                    <svg width="60" height="120" viewBox="0 0 60 120" fill="none">
                      <pattern id="about-dot-pattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1.5" fill="#1c1c1c" fillOpacity="0.12" />
                      </pattern>
                      <rect width="60" height="120" fill="url(#about-dot-pattern)" />
                    </svg>
                  </div>

                  {/* Circular arc decoration behind portrait */}
                  <div 
                    ref={circleRef}
                    className="absolute -top-20 -right-20 w-[560px] h-[560px] rounded-full border border-black/[0.04] pointer-events-none hidden sm:block opacity-0"
                  >
                    <span className="absolute top-[14%] right-[14%] h-2 w-2 rounded-full bg-[#84cc16]" />
                  </div>

                  {/* Portrait image with bottom blend gradient mask */}
                  <img
                    ref={portraitImgRef}
                    src="/arnay.png"
                    alt="Arnay Tiwari Portrait"
                    className="relative z-10 w-full h-full object-cover select-none opacity-0"
                    draggable={false}
                    style={{
                      maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Skill Badges Stack */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              <div 
                ref={skillBadgesRef}
                className="flex flex-col gap-6 pl-4 lg:pl-8 border-l border-black/[0.06] text-left"
              >
                
                {/* Skill Item 1 */}
                <div className="flex flex-col gap-1 relative pl-6 opacity-0">
                  <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-[#84cc16]" />
                  <span className="text-[9px] font-bold tracking-[0.25em] text-black/35 uppercase">Frontend</span>
                  <span className="text-sm font-bold tracking-wider text-[#1c1c1c] uppercase">Developer</span>
                </div>
                <div className="h-px bg-black/[0.06] w-full opacity-0" />
                
                {/* Skill Item 2 */}
                <div className="flex flex-col gap-1 relative pl-6 opacity-0">
                  <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-[#84cc16]" />
                  <span className="text-[9px] font-bold tracking-[0.25em] text-black/35 uppercase">Data</span>
                  <span className="text-sm font-bold tracking-wider text-[#1c1c1c] uppercase">Analyst</span>
                </div>
                <div className="h-px bg-black/[0.06] w-full opacity-0" />

                {/* Skill Item 3 */}
                <div className="flex flex-col gap-1 relative pl-6 opacity-0">
                  <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-[#84cc16]" />
                  <span className="text-[9px] font-bold tracking-[0.25em] text-black/35 uppercase">Problem</span>
                  <span className="text-sm font-bold tracking-wider text-[#1c1c1c] uppercase">Solver</span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
