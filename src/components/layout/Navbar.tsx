import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NAV_LINKS } from '../../constants/nav';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const [isLight, setIsLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);

    const lenis = (window as any).lenis;
    if (lenis) {
      let scrollTarget: any = href;

      const triggerId =
        href === '#about'        ? 'about-pin'          :
        href === '#projects'     ? 'projects-scroll'    :
        href === '#achievements' ? 'achievements-scroll':
        href === '#contact'      ? 'contact-scroll'     : null;

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
    gsap.fromTo(navbarRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' }
    );

    const LIGHT_IDS = new Set(['about', 'achievements']);

    const checkTheme = () => {
      const navH = (navbarRef.current?.offsetHeight ?? 56) + 2;
      const el = document.elementFromPoint(window.innerWidth / 2, navH);
      if (!el) return;
      const section = el.closest('section');
      setIsLight(section ? LIGHT_IDS.has(section.id) : false);
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
        className="fixed top-0 left-0 w-full z-50 border-b transition-all duration-500"
        style={{
          opacity: 0,
          backgroundColor: isLight ? 'rgba(244,243,239,0.85)' : 'rgba(12,12,12,0.85)',
          borderColor: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(14px)',
        }}
      >
        <nav
          className="flex items-center justify-between px-6 md:px-10 py-2.5 md:py-3 max-w-7xl mx-auto w-full"
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
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            className={`text-base sm:text-lg font-bold uppercase tracking-tight select-none transition-colors duration-500 hover:opacity-85 ${isLight ? 'text-black' : 'text-white'}`}
          >
            ARNAY.
          </a>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    if (link.label === 'Projects') {
                      e.preventDefault();
                      window.dispatchEvent(new CustomEvent('open-all-projects'));
                    } else {
                      handleScrollTo(e, link.href);
                    }
                  }}
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                  className={`text-xs sm:text-[13px] font-semibold transition-colors duration-500 ${
                    isLight
                      ? 'text-neutral-700 hover:text-neutral-950'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            {/* Desktop CTA */}
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              className={`hidden md:inline-flex items-center gap-1.5 rounded-full border px-6 py-2.5 text-xs sm:text-[13px] font-bold transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] ${
                isLight
                  ? 'border-black/30 text-black hover:bg-black hover:text-white hover:border-black'
                  : 'border-white/25 text-white hover:bg-[#a3e635] hover:text-black hover:border-[#a3e635]'
              }`}
            >
              <span>Let's Connect</span>
              <ArrowUpRight size={13} />
            </a>

            {/* Hamburger Toggle (Mobile) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`relative w-10 h-10 flex items-center justify-center md:hidden focus:outline-none z-50 transition-colors duration-500 ${
                isLight ? 'text-black' : 'text-white'
              }`}
              aria-label="Toggle Menu"
            >
              <div className="relative w-6 h-5 flex flex-col justify-between">
                <span className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
                <span className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed inset-x-0 top-0 h-screen transition-all duration-500 ease-in-out md:hidden flex flex-col justify-center px-8 z-40 ${
          menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
        style={{
          backgroundColor: isLight ? 'rgba(244,243,239,0.98)' : 'rgba(12,12,12,0.98)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <nav className="flex flex-col gap-6 text-left max-w-lg mx-auto w-full">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                if (link.label === 'Projects') {
                  e.preventDefault();
                  setMenuOpen(false);
                  window.dispatchEvent(new CustomEvent('open-all-projects'));
                } else {
                  handleScrollTo(e, link.href);
                }
              }}
              className={`text-4xl font-bold uppercase tracking-wider transition-colors duration-300 ${
                isLight ? 'text-neutral-800 hover:text-black' : 'text-white/80 hover:text-white'
              }`}
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                transitionDelay: `${i * 75}ms`,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, '#contact')}
            className={`mt-4 inline-flex items-center justify-center gap-2 rounded-full border px-8 py-3.5 text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
              isLight
                ? 'border-black text-black hover:bg-black hover:text-white'
                : 'border-white text-white hover:bg-[#a3e635] hover:text-black hover:border-[#a3e635]'
            }`}
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            <span>Let's Connect</span>
            <ArrowUpRight size={14} />
          </a>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
