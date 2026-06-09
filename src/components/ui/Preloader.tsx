import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1.5 seconds loading duration
    const duration = 1500;
    const interval = 20;
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const nextProgress = Math.min(Math.round((step / steps) * 100), 100);
      setProgress(nextProgress);

      if (nextProgress === 100) {
        clearInterval(timer);
        
        // Curtain exit animation
        const tl = gsap.timeline({
          onComplete: onComplete
        });

        tl.to(counterRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut'
        })
        .to(barRef.current, {
          scaleX: 0,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut'
        }, '-=0.3')
        .to(labelRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut'
        }, '-=0.3')
        .to(containerRef.current, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          duration: 0.8,
          ease: 'power4.inOut'
        });
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0C0C0C] select-none pointer-events-all touch-none"
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
    >
      <div className="flex flex-col items-center">
        {/* Sleek Theme Label */}
        <div
          ref={labelRef}
          className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#E5EEE4]/40 mb-3"
        >
          Creative Portfolio
        </div>

        {/* Counter */}
        <div
          ref={counterRef}
          className="font-mono font-light text-6xl tracking-tighter text-[#E5EEE4] flex items-baseline select-none"
        >
          {progress.toString().padStart(3, '0')}
          <span className="text-xs font-bold text-[#84cc16] ml-1">%</span>
        </div>

        {/* Progress Bar Container */}
        <div
          ref={barRef}
          className="h-[2px] w-48 bg-white/10 mt-6 overflow-hidden relative rounded-full"
        >
          <div
            className="h-full bg-[#84cc16] transition-all duration-75 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
