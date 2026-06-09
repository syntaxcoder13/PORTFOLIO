import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import AchievementsSection from './components/sections/AchievementsSection';
import ContactSection from './components/sections/ContactSection';
import Preloader from './components/ui/Preloader';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    (window as any).lenis = lenis;
    lenis.stop(); // Start stopped during loading screen

    // Keep GSAP ScrollTrigger in sync with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  useEffect(() => {
    const lenis = (window as any).lenis;
    if (lenis) {
      if (loading) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [loading]);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <main
        className="relative w-full"
        style={{ overflowX: 'clip', background: '#0C0C0C' }}
      >
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <AchievementsSection />
        <ContactSection />
      </main>
    </>
  );
};

export default App;
