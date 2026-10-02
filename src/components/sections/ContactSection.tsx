import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Link as LinkIcon, Mail, Instagram, Github, ArrowUpRight, Check, Copy } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ActiveItem = 'none' | 'name' | 'website' | 'email' | 'instagram' | 'github';

interface ContactInfo {
  id: ActiveItem;
  label: string;
  icon: typeof User;
  value: string;
  displayMain: string;
  displayDimmed?: string;
  prefix?: string;
  url: string;
  actionType: 'copy' | 'link' | 'mailto';
}

const CONTACT_ITEMS: ContactInfo[] = [
  {
    id: 'name',
    label: 'Name',
    icon: User,
    value: 'arnaytiwari',
    displayMain: 'arnaytiwari',
    displayDimmed: '1304@gmail.com',
    url: 'https://arnaytiwari.vercel.app',
    actionType: 'copy',
  },
  {
    id: 'website',
    label: 'Website',
    icon: LinkIcon,
    value: 'arnaytiwari.vercel.app',
    prefix: 'https://',
    displayMain: 'arnaytiwari.vercel.app',
    url: 'https://arnaytiwari.vercel.app',
    actionType: 'link',
  },
  {
    id: 'email',
    label: 'Email',
    icon: Mail,
    value: 'arnaytiwari1304@gmail.com',
    displayMain: 'arnaytiwari1304@gmail.com',
    url: 'mailto:arnaytiwari1304@gmail.com',
    actionType: 'mailto',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    icon: Instagram,
    value: 'arnay_1304',
    prefix: 'instagram.com/',
    displayMain: '@arnay_1304',
    url: 'https://instagram.com/arnay_1304',
    actionType: 'link',
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: Github,
    value: 'syntaxcoder13',
    prefix: 'github.com/',
    displayMain: 'syntaxcoder13',
    url: 'https://github.com/syntaxcoder13',
    actionType: 'link',
  },
];

const ContactSection = () => {
  const [activeItem, setActiveItem] = useState<ActiveItem>('none');
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>('');

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

  const handleCopyOrNavigate = (item: ContactInfo) => {
    if (item.actionType === 'copy') {
      navigator.clipboard.writeText(item.value);
      setToastMessage(`Copied "${item.value}" to clipboard!`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (item.actionType === 'mailto') {
      navigator.clipboard.writeText(item.value);
      setToastMessage(`Copied email & opening mail client...`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      window.location.href = item.url;
    } else {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  const currentItem = CONTACT_ITEMS.find((c) => c.id === activeItem) || CONTACT_ITEMS[2];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-30 w-full h-screen min-h-[580px] bg-[#FAF9F6] text-neutral-900 px-6 sm:px-10 md:px-16 overflow-hidden select-none flex flex-col items-center justify-center"
      style={{
        background:
          'radial-gradient(ellipse 95% 85% at 50% 15%, #FFFFFF 0%, #FAF8F5 50%, #ECE8E1 100%)',
      }}
    >
      {/* Subtle Accent Grids & Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-white/70 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="relative z-20 max-w-4xl mx-auto w-full flex flex-col items-center justify-center">
        
        {/* ================= SECTION HEADER (Editorial Style) ================= */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-300 bg-white/80 backdrop-blur-md shadow-xs text-xs font-mono tracking-widest text-neutral-600">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <span>[ 04 / GET IN TOUCH ]</span>
          </div>

          <h2
            style={{ fontFamily: '"Playfair Display", "Newsreader", "Instrument Serif", Georgia, serif' }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-[62px] text-[#111111] font-normal tracking-tight leading-[1.08]"
          >
            Let's create something <br />
            <span className="italic font-normal text-neutral-700">& extraordinary together.</span>
          </h2>

          <p
            style={{ fontFamily: '"Plus Jakarta Sans", Inter, sans-serif' }}
            className="text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto font-normal leading-relaxed"
          >
            Have a project in mind, an opportunity, or just want to connect? Hover below to explore and reach out directly.
          </p>
        </div>

        {/* ================= INTERACTIVE HUB WITH SMOOTH MORPHING (Ref Design) ================= */}
        <div className="flex flex-col items-center justify-center w-full py-2">
          
          {/* Main Headline Container */}
          <div
            onClick={() => handleCopyOrNavigate(currentItem)}
            className="relative cursor-pointer group flex flex-col items-center justify-center text-center py-2 px-4 min-h-[95px]"
          >
            {/* Toast Notification */}
            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: -45, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="absolute px-4 py-1.5 rounded-full bg-neutral-950 text-white font-mono text-xs font-semibold shadow-2xl flex items-center gap-1.5 z-30 pointer-events-none"
                >
                  <Check size={13} className="text-emerald-400" />
                  <span>{toastMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Smooth Dynamic Display Text */}
            <div
              style={{ fontFamily: '"Plus Jakarta Sans", Inter, sans-serif' }}
              className="text-lg min-[360px]:text-xl min-[420px]:text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight select-none flex items-center justify-center flex-wrap leading-tight text-center max-w-full px-2"
            >
              <AnimatePresence mode="wait">
                {activeItem === 'none' && (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0, filter: 'blur(4px)', y: 4 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                    exit={{ opacity: 0, filter: 'blur(4px)', y: -4 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="flex items-center text-neutral-950"
                  >
                    <span>arnaytiwari1304</span>
                    <span className="text-neutral-400 font-semibold">@gmail.com</span>
                  </motion.div>
                )}

                {activeItem === 'name' && (
                  <motion.div
                    key="name"
                    initial={{ opacity: 0, filter: 'blur(4px)', y: 4 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                    exit={{ opacity: 0, filter: 'blur(4px)', y: -4 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="flex items-center flex-wrap justify-center"
                  >
                    <div className="relative inline-flex flex-col items-center">
                      <span className="text-[#6366F1] px-2.5 sm:px-3.5 py-0.5 sm:py-1 border-2 border-dashed border-[#6366F1] rounded-xl bg-[#6366F1]/[0.08] shadow-sm">
                        arnaytiwari
                      </span>
                      <motion.span
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.05 }}
                        className="absolute -bottom-6 text-[11px] sm:text-xs font-mono font-semibold text-[#6366F1] uppercase tracking-widest"
                      >
                        Name
                      </motion.span>
                    </div>
                    <span className="text-neutral-300 ml-1.5">1304@gmail.com</span>
                  </motion.div>
                )}

                {activeItem === 'website' && (
                  <motion.div
                    key="website"
                    initial={{ opacity: 0, filter: 'blur(4px)', y: 4 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                    exit={{ opacity: 0, filter: 'blur(4px)', y: -4 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="flex items-center flex-wrap justify-center"
                  >
                    <span className="text-neutral-300 mr-1.5 hidden sm:inline text-xl sm:text-3xl md:text-4xl font-mono">
                      https://
                    </span>
                    <div className="relative inline-flex flex-col items-center">
                      <span className="text-[#6366F1] px-2.5 sm:px-3.5 py-0.5 sm:py-1 border-2 border-dashed border-[#6366F1] rounded-xl bg-[#6366F1]/[0.08] shadow-sm">
                        arnaytiwari.vercel.app
                      </span>
                      <motion.span
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.05 }}
                        className="absolute -bottom-6 text-[11px] sm:text-xs font-mono font-semibold text-[#6366F1] uppercase tracking-widest"
                      >
                        Website
                      </motion.span>
                    </div>
                  </motion.div>
                )}

                {activeItem === 'email' && (
                  <motion.div
                    key="email"
                    initial={{ opacity: 0, filter: 'blur(4px)', y: 4 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                    exit={{ opacity: 0, filter: 'blur(4px)', y: -4 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="relative inline-flex flex-col items-center"
                  >
                    <span className="text-[#6366F1] px-3 sm:px-4 py-0.5 sm:py-1 border-2 border-dashed border-[#6366F1] rounded-xl bg-[#6366F1]/[0.08] shadow-sm">
                      arnaytiwari1304@gmail.com
                    </span>
                    <motion.span
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.05 }}
                      className="absolute -bottom-6 text-[11px] sm:text-xs font-mono font-semibold text-[#6366F1] uppercase tracking-widest"
                    >
                      Email
                    </motion.span>
                  </motion.div>
                )}

                {activeItem === 'instagram' && (
                  <motion.div
                    key="instagram"
                    initial={{ opacity: 0, filter: 'blur(4px)', y: 4 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                    exit={{ opacity: 0, filter: 'blur(4px)', y: -4 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="flex items-center flex-wrap justify-center"
                  >
                    <span className="text-neutral-300 mr-1.5 hidden sm:inline text-xl sm:text-3xl md:text-4xl font-mono">
                      instagram.com/
                    </span>
                    <div className="relative inline-flex flex-col items-center">
                      <span className="text-[#6366F1] px-2.5 sm:px-3.5 py-0.5 sm:py-1 border-2 border-dashed border-[#6366F1] rounded-xl bg-[#6366F1]/[0.08] shadow-sm">
                        @arnay_1304
                      </span>
                      <motion.span
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.05 }}
                        className="absolute -bottom-6 text-[11px] sm:text-xs font-mono font-semibold text-[#6366F1] uppercase tracking-widest"
                      >
                        Instagram
                      </motion.span>
                    </div>
                  </motion.div>
                )}

                {activeItem === 'github' && (
                  <motion.div
                    key="github"
                    initial={{ opacity: 0, filter: 'blur(4px)', y: 4 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                    exit={{ opacity: 0, filter: 'blur(4px)', y: -4 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="flex items-center flex-wrap justify-center"
                  >
                    <span className="text-neutral-300 mr-1.5 hidden sm:inline text-xl sm:text-3xl md:text-4xl font-mono">
                      github.com/
                    </span>
                    <div className="relative inline-flex flex-col items-center">
                      <span className="text-[#6366F1] px-2.5 sm:px-3.5 py-0.5 sm:py-1 border-2 border-dashed border-[#6366F1] rounded-xl bg-[#6366F1]/[0.08] shadow-sm">
                        syntaxcoder13
                      </span>
                      <motion.span
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.05 }}
                        className="absolute -bottom-6 text-[11px] sm:text-xs font-mono font-semibold text-[#6366F1] uppercase tracking-widest"
                      >
                        GitHub
                      </motion.span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Click Action Hint */}
            <div className="mt-9 flex items-center gap-1.5 text-[11px] font-mono text-neutral-400 group-hover:text-neutral-900 transition-colors">
              <span>CLICK TO {currentItem.actionType === 'copy' ? 'COPY' : 'OPEN'}</span>
              <ArrowUpRight size={12} />
            </div>
          </div>

          {/* ================= ICON DOCK (Smooth Springs) ================= */}
          <div className="flex items-center gap-3 sm:gap-5 mt-6 p-2 rounded-full bg-white/90 backdrop-blur-xl border border-neutral-200/80 shadow-md">
            {CONTACT_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.94 }}
                  onMouseEnter={() => setActiveItem(item.id)}
                  onMouseLeave={() => setActiveItem('none')}
                  onClick={() => handleCopyOrNavigate(item)}
                  aria-label={item.label}
                  className={`relative p-3 rounded-full transition-colors duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#6366F1] text-white shadow-lg shadow-indigo-500/25'
                      : 'text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100'
                  }`}
                >
                  <Icon size={18} strokeWidth={isActive ? 2 : 1.75} />
                </motion.button>
              );
            })}
          </div>

          <p className="text-[11px] font-mono text-neutral-400 mt-4 uppercase tracking-wider">
            Hover an icon to inspect · Click to interact
          </p>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
