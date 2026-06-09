import { useEffect, useRef } from 'react';
import { Mail, MessageCircle, Linkedin, Github, ArrowUpRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FadeIn from './FadeIn';

gsap.registerPlugin(ScrollTrigger);

interface ContactMethod {
  id: string;
  num: string;
  label: string;
  value: string;
  href: string;
  icon: typeof Mail;
  hoverClasses: string;
  brandColor: string;
}

const CONTACT_METHODS: ContactMethod[] = [
  {
    id: 'email',
    num: '01',
    label: 'Email',
    value: 'arnaytiwari1304@gmail.com',
    href: 'mailto:arnaytiwari1304@gmail.com',
    icon: Mail,
    hoverClasses: 'hover:border-red-500/25 hover:shadow-[0_0_25px_rgba(239,68,68,0.06)]',
    brandColor: 'text-red-400',
  },
  {
    id: 'whatsapp',
    num: '02',
    label: 'WhatsApp',
    value: '+91 88983 81818',
    href: 'https://wa.me/918898381818',
    icon: MessageCircle,
    hoverClasses: 'hover:border-emerald-500/25 hover:shadow-[0_0_25px_rgba(16,185,129,0.06)]',
    brandColor: 'text-emerald-400',
  },
  {
    id: 'linkedin',
    num: '03',
    label: 'LinkedIn',
    value: 'in/arnay-tiwari',
    href: 'https://www.linkedin.com/in/arnay-tiwari/',
    icon: Linkedin,
    hoverClasses: 'hover:border-blue-500/25 hover:shadow-[0_0_25px_rgba(59,130,246,0.06)]',
    brandColor: 'text-blue-400',
  },
  {
    id: 'github',
    num: '04',
    label: 'GitHub',
    value: '@syntaxcoder13',
    href: 'https://github.com/syntaxcoder13',
    icon: Github,
    hoverClasses: 'hover:border-purple-500/25 hover:shadow-[0_0_25px_rgba(168,85,247,0.06)]',
    brandColor: 'text-purple-400',
  },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const triggerEl = sectionRef.current;
    if (!triggerEl) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: triggerEl,
      start: 'top top',
      id: 'contact-scroll',
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-[#0C0C0C] px-6 sm:px-12 md:px-20 pt-28 sm:pt-32 pb-16 overflow-hidden"
    >
      {/* Background Dot grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Dynamic backdrop glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#a3e635]/3 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-purple-500/3 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Typography, Bio & CTA */}
          <div className="lg:col-span-5 flex flex-col items-start gap-6 text-left">
            <FadeIn y={30}>
              <div className="flex items-center gap-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#a3e635] select-none">
                <span className="h-2 w-2 rounded-full bg-[#a3e635] shadow-[0_0_8px_#a3e635]" />
                <span>Let's Connect</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1} y={35}>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight text-white leading-[1.1] uppercase">
                Let's build <br />
                something <br />
                <span
                  className="text-[#a3e635] italic font-normal inline-block mt-2 lowercase normal-case"
                  style={{ fontFamily: '"Instrument Serif", serif', fontSize: '1.05em' }}
                >
                  amazing.
                </span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.2} y={25}>
              <p className="text-sm sm:text-base font-light text-[#D7E2EA]/65 max-w-sm leading-relaxed mt-2">
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>
            </FadeIn>

            <FadeIn delay={0.3} y={20}>
              <a
                href="mailto:arnaytiwari1304@gmail.com"
                className="group/talk inline-flex items-center gap-2 text-xs sm:text-[13px] font-bold uppercase tracking-widest text-[#a3e635] pb-1 border-b border-[#a3e635]/40 hover:border-[#a3e635] transition-all duration-300 select-none mt-2"
              >
                <span>Let's Talk</span>
                <ArrowUpRight size={13} className="transition-transform duration-300 group-hover/talk:translate-x-0.5 group-hover/talk:-translate-y-0.5" />
              </a>
            </FadeIn>
          </div>

          {/* Right Column: Contact Cards + Vertical Divider */}
          <div className="lg:col-span-7 flex flex-col justify-center relative w-full lg:pl-16">

            {/* Vertical dashed divider line on desktop */}
            <div className="hidden lg:block absolute -left-0.5 top-0 bottom-0 w-px border-l border-dashed border-white/10" />

            {/* Cursive annotation at the top right of the cards */}
            <div className="hidden lg:block absolute -top-14 right-4 select-none pointer-events-none">
              <span
                className="text-[#a3e635] text-lg font-normal block"
                style={{ fontFamily: '"Caveat", cursive', transform: 'rotate(-4deg)' }}
              >
                Reach out anytime!
              </span>
              <svg
                width="64"
                height="32"
                viewBox="0 0 64 32"
                fill="none"
                className="text-[#a3e635] ml-16 -mt-1 opacity-70"
              >
                <path
                  d="M10 28 C 24 26, 30 12, 48 6 M 48 6 L 40 4 M 48 6 L 46 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Contact Cards Stack */}
            <div className="flex flex-col gap-4 w-full pt-4 lg:pt-0">
              {CONTACT_METHODS.map((method, i) => {
                const Icon = method.icon;
                return (
                  <FadeIn key={method.id} delay={0.1 + i * 0.08} y={30} duration={0.6}>
                    <a
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative flex items-center justify-between rounded-xl border border-white/5 bg-[#111111]/30 hover:bg-[#111111]/60 p-4 sm:p-5 transition-all duration-300 w-full group/card ${method.hoverClasses}`}
                    >
                      {/* Left Block: Icon + Content */}
                      <div className="flex items-center gap-4">
                        {/* Circular Icon Wrapper */}
                        <div className="w-12 h-12 rounded-full bg-neutral-900 border border-white/[0.04] flex items-center justify-center transition-all duration-300 group-hover/card:border-white/10 group-hover/card:scale-[1.04] shrink-0">
                          <Icon size={18} strokeWidth={1.5} className={`${method.brandColor} transition-transform duration-500 group-hover/card:rotate-[3deg]`} />
                        </div>

                        {/* Label & Value */}
                        <div className="flex flex-col gap-0.5 text-left">
                          <span className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-wider ${method.brandColor} select-none`}>
                            {method.label}
                          </span>
                          <span className="text-xs sm:text-sm md:text-base font-semibold text-white/95 leading-tight tracking-wide truncate max-w-[160px] min-[360px]:max-w-[200px] min-[400px]:max-w-[240px] sm:max-w-md lg:max-w-[260px] xl:max-w-md">
                            {method.value}
                          </span>
                        </div>
                      </div>

                      {/* Right Block: Link Arrow */}
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white/20 group-hover/card:text-[#a3e635] group-hover/card:bg-white/[0.02] transition-all duration-300 shrink-0">
                        <ArrowUpRight
                          size={16}
                          className="transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
                        />
                      </div>
                    </a>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Sparkle Line */}
        <FadeIn delay={0.45} y={20}>
          <div className="relative w-full h-px bg-white/10 mt-24 sm:mt-28 mb-8 flex items-center justify-center">
            <div className="absolute bg-[#0C0C0C] px-6 text-[#a3e635] flex items-center justify-center select-none">
              <Sparkles size={14} className="animate-pulse" />
            </div>
          </div>
        </FadeIn>

        {/* Footer info */}
        <FadeIn delay={0.5} y={15}>
          <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between select-none">
            <span className="font-semibold uppercase tracking-[0.25em] text-[#a3e635]/60 text-[9px] sm:text-[10px]">
              LET'S CREATE IMPACT TOGETHER
            </span>
            <span className="font-light uppercase tracking-widest text-[#D7E2EA]/30 text-[9px] sm:text-[10px]">
              © 2026 ARNAY TIWARI · MUMBAI
            </span>
          </div>
        </FadeIn>

      </div>
    </section>
  );
};

export default ContactSection;
