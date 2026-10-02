import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NAV_LINKS } from '../../constants/nav';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const [isLight, setIsLight] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('About');

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    e.preventDefault();
    setMenuOpen(false);
    setActiveTab(label);

    const lenis = (window as any).lenis;
    if (href === '#hero') {
      if (lenis) lenis.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (lenis) {
      let scrollTarget: any = href;

      const triggerId =
        href === '#about' ? 'about-pin' :
          href === '#projects' ? 'projects-scroll' :
            href === '#achievements' ? 'achievements-scroll' :
              href === '#contact' ? 'contact-scroll' : null;

      if (triggerId) {
        const trigger = ScrollTrigger.getById(triggerId);
        if (trigger) scrollTarget = trigger.start;
      }

      lenis.scrollTo(scrollTarget);
    } else {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    gsap.fromTo(
      navbarRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' }
    );

    const LIGHT_IDS = new Set(['hero', 'about', 'projects', 'achievements', 'contact']);

    const checkTheme = () => {
      const navH = (navbarRef.current?.offsetHeight ?? 60) + 20;
      const el = document.elementFromPoint(window.innerWidth / 2, navH);
      if (!el) return;
      const section = el.closest('section');
      if (section && section.id) {
        setIsLight(LIGHT_IDS.has(section.id));

        // Update active nav tab based on active section
        if (section.id === 'about') setActiveTab('About');
        else if (section.id === 'projects') setActiveTab('Projects');
        else if (section.id === 'achievements') setActiveTab('Achievements');
        else if (section.id === 'contact') setActiveTab('Contact');
      }
    };

    checkTheme();
    window.addEventListener('scroll', checkTheme, { passive: true });
    return () => window.removeEventListener('scroll', checkTheme);
  }, []);

  // Pause Lenis when mobile menu is active
  useEffect(() => {
    const lenis = (window as any).lenis;
    if (menuOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [menuOpen]);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header
        ref={navbarRef}
        className="fixed top-0 left-0 w-full z-50 transition-all duration-500 py-3 sm:py-4 px-6 md:px-12"
        style={{ opacity: 0 }}
      >
        <nav
          className="flex items-center justify-between max-w-7xl mx-auto w-full"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              const lenis = (window as any).lenis;
              if (lenis) {
                lenis.scrollTo(0);
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className={`flex items-baseline gap-0.5 text-lg sm:text-xl font-bold tracking-tight select-none transition-colors duration-500 hover:opacity-85 ${isLight ? 'text-neutral-900' : 'text-white'
              }`}
            style={{ fontFamily: '"Plus Jakarta Sans", Inter, sans-serif' }}
          >
            <span>Arnay</span>
            <span className="text-[10px] text-neutral-400 font-semibold align-top relative -top-1.5">®</span>
          </a>

          {/* Desktop Floating Pill Navigation (Matching Reference Image) */}
          <div
            className={`hidden md:flex items-center p-1 rounded-full border transition-all duration-500 backdrop-blur-xl ${isLight
                ? 'bg-neutral-200/50 border-neutral-300/60 shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
                : 'bg-neutral-900/70 border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.4)]'
              }`}
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeTab === link.label;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href, link.label)}
                  style={{ fontFamily: '"Plus Jakarta Sans", Inter, sans-serif' }}
                  className={`relative px-4 sm:px-5 py-1.5 text-xs sm:text-[13px] rounded-full transition-all duration-300 ${isActive
                      ? isLight
                        ? 'bg-white text-neutral-950 font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.06)]'
                        : 'bg-white/20 text-white font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.3)]'
                      : isLight
                        ? 'text-neutral-600 hover:text-neutral-950 font-medium'
                        : 'text-neutral-400 hover:text-white font-medium'
                    }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {/* Desktop Action Button (Dark Pill CTA) */}
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact', 'Contact')}
              style={{ fontFamily: '"Plus Jakarta Sans", Inter, sans-serif' }}
              className={`hidden md:inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-xs sm:text-[13px] font-medium transition-all duration-300 shadow-sm hover:scale-[1.02] active:scale-[0.98] ${isLight
                  ? 'bg-[#111111] hover:bg-black text-white shadow-[0_4px_12px_rgba(0,0,0,0.1)]'
                  : 'bg-white hover:bg-neutral-200 text-neutral-950 shadow-[0_4px_12px_rgba(255,255,255,0.1)]'
                }`}
            >
              <span>Get in touch</span>
              <ArrowUpRight size={13} />
            </a>

            {/* Hamburger Toggle for Mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`relative w-10 h-10 flex items-center justify-center md:hidden focus:outline-none z-50 transition-colors duration-500 rounded-full ${isLight ? 'bg-neutral-200/70 text-neutral-900' : 'bg-white/10 text-white'
                }`}
              aria-label="Toggle Menu"
            >
              <div className="relative w-5 h-4 flex flex-col justify-between">
                <span
                  className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''
                    }`}
                />
                <span
                  className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0' : ''
                    }`}
                />
                <span
                  className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                    }`}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed inset-x-0 top-0 h-screen transition-all duration-500 ease-in-out md:hidden flex flex-col justify-center px-8 z-40 ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
          }`}
        style={{
          backgroundColor: isLight ? 'rgba(250,249,246,0.98)' : 'rgba(12,12,12,0.98)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <nav className="flex flex-col gap-6 text-left max-w-lg mx-auto w-full">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href, link.label)}
              className={`text-3xl font-bold uppercase tracking-wider transition-colors duration-300 ${isLight ? 'text-neutral-800 hover:text-black' : 'text-white/80 hover:text-white'
                }`}
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                transitionDelay: `${i * 60}ms`,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, '#contact', 'Contact')}
            className={`mt-4 inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-300 ${isLight
                ? 'bg-[#111111] text-white hover:bg-black'
                : 'bg-white text-black hover:bg-neutral-200'
              }`}
            style={{ fontFamily: '"Plus Jakarta Sans", Inter, sans-serif' }}
          >
            <span>Get in touch</span>
            <ArrowUpRight size={14} />
          </a>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
