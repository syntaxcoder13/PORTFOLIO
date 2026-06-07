import { Mail, MessageCircle, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import FadeIn from './FadeIn';

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
    hoverClasses: 'hover:border-red-500/30 hover:shadow-[0_0_40px_rgba(239,68,68,0.12)]',
    brandColor: 'group-hover:text-red-400',
  },
  {
    id: 'whatsapp',
    num: '02',
    label: 'WhatsApp',
    value: '+91 88983 81818',
    href: 'https://wa.me/918898381818',
    icon: MessageCircle,
    hoverClasses: 'hover:border-emerald-500/30 hover:shadow-[0_0_40px_rgba(16,185,129,0.12)]',
    brandColor: 'group-hover:text-emerald-400',
  },
  {
    id: 'linkedin',
    num: '03',
    label: 'LinkedIn',
    value: 'in/arnay-tiwari',
    href: 'https://www.linkedin.com/in/arnay-tiwari/',
    icon: Linkedin,
    hoverClasses: 'hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.12)]',
    brandColor: 'group-hover:text-blue-400',
  },
  {
    id: 'github',
    num: '04',
    label: 'GitHub',
    value: '@syntaxcoder13',
    href: 'https://github.com/syntaxcoder13',
    icon: Github,
    hoverClasses: 'hover:border-purple-500/30 hover:shadow-[0_0_40px_rgba(168,85,247,0.12)]',
    brandColor: 'group-hover:text-purple-400',
  },
];

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative w-full bg-[#0C0C0C] px-5 sm:px-8 md:px-12 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 overflow-hidden"
    >
      {/* Dynamic backdrop glows to match the design theme */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />

      {/* Header Info */}
      <div className="relative z-10 max-w-7xl mx-auto mb-16 sm:mb-20 text-center">
        <FadeIn y={30}>
          <h2
            className="hero-heading font-black uppercase tracking-tight leading-none mb-4"
            style={{ fontSize: 'clamp(3rem, 10vw, 120px)' }}
          >
            Let's Collaborate
          </h2>
        </FadeIn>

        <FadeIn delay={0.12} y={20}>
          <p
            className="font-light uppercase tracking-[0.25em] text-[#D7E2EA]/50"
            style={{ fontSize: 'clamp(0.8rem, 1.2vw, 1rem)' }}
          >
            Available for select projects and collaborations
          </p>
        </FadeIn>
      </div>

      {/* Bespoke Grid Cards */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {CONTACT_METHODS.map((method, i) => {
          const Icon = method.icon;
          return (
            <FadeIn key={method.id} delay={i * 0.08} y={40} duration={0.65}>
              <a
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex h-72 flex-col justify-between rounded-[32px] border border-[#D7E2EA]/10 bg-gradient-to-b from-[#141419] to-[#0B0B0D] p-8 transition-all duration-500 ${method.hoverClasses} hover:-translate-y-2 overflow-hidden`}
              >
                {/* Sweep/Sheen reflection effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-out bg-gradient-to-r from-transparent via-white/[0.04] to-transparent skew-x-12 pointer-events-none" />

                {/* Top bar: Brand Icon + Custom styled Index Number */}
                <div className="flex items-start justify-between">
                  <div className={`rounded-2xl border border-[#D7E2EA]/10 p-3.5 transition-colors duration-500 group-hover:border-current ${method.brandColor}`}>
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#D7E2EA]/20 group-hover:text-[#D7E2EA]/45 transition-colors duration-500">
                    {method.num}
                  </span>
                </div>

                {/* Bottom details with responsive scaling */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D7E2EA]/40 group-hover:text-[#D7E2EA]/60 transition-colors duration-500">
                      {method.label}
                    </span>
                    <ArrowUpRight
                      className="text-[#D7E2EA]/30 group-hover:text-current group-hover:rotate-12 transition-all duration-500"
                      size={14}
                      strokeWidth={2}
                    />
                  </div>
                  <span
                    className="font-medium text-[#D7E2EA] group-hover:text-white transition-colors duration-500 leading-tight tracking-wide whitespace-nowrap block w-full"
                    style={{ fontSize: 'clamp(0.75rem, 1.2vw, 1.15rem)' }}
                  >
                    {method.value}
                  </span>
                </div>
              </a>
            </FadeIn>
          );
        })}
      </div>

      {/* Footer line */}
      <FadeIn delay={0.35} y={20}>
        <div className="mx-auto mt-24 sm:mt-28 max-w-7xl flex flex-col items-center gap-3 border-t border-[#D7E2EA]/10 pt-8 text-center sm:flex-row sm:justify-between">
          <span
            className="font-light uppercase tracking-widest text-[#D7E2EA]/40 text-xs"
          >
            © 2026 Arnay Tiwari
          </span>
          <span
            className="font-light uppercase tracking-widest text-[#D7E2EA]/40 text-xs"
          >
            Built from the heart of Mumbai
          </span>
        </div>
      </FadeIn>
    </section>
  );
};

export default ContactSection;
