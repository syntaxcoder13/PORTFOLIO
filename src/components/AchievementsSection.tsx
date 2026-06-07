import { useState } from 'react';
import { Trophy, Lightbulb, ArrowUpRight, RotateCw, RotateCcw, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import FadeIn from './FadeIn';
import VideoModal from './VideoModal';

interface PSDetails {
  title: string;
  desc: string;
}

const PROBLEM_STATEMENTS: Record<string, PSDetails> = {
  'hack-1': {
    title: 'Paranox Contest Challenge',
    desc: 'Develop a highly performant web application that resolves workflow and collaboration bottlenecks in remote environments while maintaining zero-trust security.',
  },
  'horizon': {
    title: 'Simulation of Windows 95 OS inside a web browser',
    desc: 'Create a web-based simulation of the Windows 95 operating system that recreates its visual style and core OS behaviour, including basic system features and simulated utility applications such as Calculator and Notepad.',
  },
  'aavishkar': {
    title: 'IoT-Enabled Smart Air Purification System',
    desc: 'Design and engineer an IoT-enabled smart air purifier under the Open Innovation track. Focus on developing a companion web dashboard/app to monitor environmental telemetry and control physical hardware components in real-time.',
  },
  'techxpression': {
    title: 'AI-Powered Automated Candidate Interview System',
    desc: 'Develop an intelligent system capable of conducting autonomous, human-like voice/text interviews, evaluating candidate responses dynamically in real-time, and generating comprehensive screening metrics under the Open Innovation track.',
  },
  'sheryians': {
    title: 'Smart Incident Response Platform',
    desc: 'Develop a system for managing production incidents and outages. Teams should be able to create incidents, assign responders, post live updates, maintain timelines, generate postmortems, and show a public status page. AI can be used for summaries and probable root-cause suggestions.',
  },
};

const AchievementsSection = () => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  const toggleFlip = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveCardId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="achievements"
      className="relative z-10 w-full bg-[#0C0C0C] px-5 sm:px-8 md:px-12 pt-24 sm:pt-28 md:pt-32 pb-24 overflow-hidden"
    >
      {/* Background radial accent glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 sm:mb-20 md:mb-24 text-center">
          <FadeIn y={30}>
            <h2
              className="hero-heading font-black uppercase tracking-tight leading-none mb-4"
              style={{ fontSize: 'clamp(3rem, 10vw, 120px)' }}
            >
              Achievements
            </h2>
          </FadeIn>
          <FadeIn delay={0.12} y={20}>
            <p
              className="font-light uppercase tracking-[0.25em] text-[#D7E2EA]/50 text-xs sm:text-sm"
            >
              Milestones, Hackathons, and Technological Innovations
            </p>
          </FadeIn>
        </div>

        {/* Bento Grid Layout (6-Column grid on desktop) */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-6 gap-6">
          
          {/* Card 01: Hackathon 1 - Paranox Contest 2.0 (3 Columns) */}
          <FadeIn delay={0} y={40} className="md:col-span-3">
            <div className="relative w-full h-[340px] [perspective:1000px]">
              <motion.div
                className="relative w-full h-full [transform-style:preserve-3d]"
                animate={{ rotateY: activeCardId === 'hack-1' ? 180 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                {/* Front Side */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-[32px] border border-[#D7E2EA]/10 bg-gradient-to-b from-[#141419] to-[#0B0B0D] p-6 sm:p-8 flex flex-col justify-between overflow-hidden"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl border border-[#D7E2EA]/10 p-2.5 text-[#D7E2EA]/60">
                        <Trophy size={16} strokeWidth={1.5} />
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400/80 border border-emerald-500/20 bg-emerald-500/10 rounded-full px-2.5 py-0.5">
                        Hackathon
                      </span>
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#D7E2EA]/20">/ 01</span>
                  </div>

                  <p className="text-sm font-light text-[#D7E2EA]/60 leading-relaxed my-3">
                    Participated in Paranox Contest 2.0, designing and building prototype web solutions to address challenging development prompts within a highly competitive timeline.
                  </p>

                  <div className="flex items-end justify-between border-t border-[#D7E2EA]/5 pt-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-[#D7E2EA]/40">
                        Participant / TECHXNINJAS · Online · Oct 2025
                      </span>
                      <h3 className="font-bold text-base sm:text-lg text-[#D7E2EA] uppercase tracking-wide">
                        Paranox Contest 2.0
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => toggleFlip('hack-1', e)}
                      className="flex items-center gap-1.5 rounded-full border border-[#D7E2EA]/10 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-[10px] uppercase font-semibold text-[#D7E2EA] tracking-wider transition cursor-pointer"
                    >
                      <RotateCw size={11} /> PS
                    </button>
                  </div>
                </div>

                {/* Back Side */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-[32px] border border-emerald-500/20 bg-gradient-to-b from-[#0B0B0D] to-[#141419] p-6 sm:p-8 flex flex-col justify-between overflow-hidden"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <div className="flex items-center justify-between border-b border-[#D7E2EA]/5 pb-3">
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-emerald-400">Problem Statement</span>
                    <span className="font-mono text-xs font-semibold text-[#D7E2EA]/20">/ 01</span>
                  </div>

                  <div className="flex-1 flex flex-col justify-center gap-2 my-2">
                    <h4 className="text-[#D7E2EA] font-bold text-base sm:text-lg md:text-xl leading-tight">
                      {PROBLEM_STATEMENTS['hack-1'].title}
                    </h4>
                    <p className="text-xs sm:text-sm md:text-base font-light text-[#D7E2EA]/85 leading-relaxed">
                      {PROBLEM_STATEMENTS['hack-1'].desc}
                    </p>
                  </div>

                  <div className="flex justify-end pt-3 border-t border-[#D7E2EA]/5">
                    <button
                      type="button"
                      onClick={(e) => toggleFlip('hack-1', e)}
                      className="flex items-center gap-1.5 rounded-full border border-[#D7E2EA]/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-[10px] uppercase font-semibold text-[#D7E2EA] tracking-wider transition cursor-pointer"
                    >
                      <RotateCcw size={11} /> Back
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </FadeIn>

          {/* Card 02: Hackathon 2 - Horizon Fest (3 Columns) */}
          <FadeIn delay={0.08} y={40} className="md:col-span-3">
            <div className="relative w-full h-[340px] [perspective:1000px]">
              <motion.div
                className="relative w-full h-full [transform-style:preserve-3d]"
                animate={{ rotateY: activeCardId === 'horizon' ? 180 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                {/* Front Side */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-[32px] border border-[#D7E2EA]/10 bg-gradient-to-b from-[#141419] to-[#0B0B0D] p-6 sm:p-8 flex flex-col justify-between overflow-hidden"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl border border-[#D7E2EA]/10 p-2.5 text-[#D7E2EA]/60">
                        <Trophy size={16} strokeWidth={1.5} />
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400/80 border border-emerald-500/20 bg-emerald-500/10 rounded-full px-2.5 py-0.5">
                        Award
                      </span>
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#D7E2EA]/20">/ 02</span>
                  </div>

                  <p className="text-sm font-light text-[#D7E2EA]/60 leading-relaxed my-3">
                    Participated in a 2-day hackathon (6 hours per day). Built a web prototype based on the assigned problem statement, presented and explained the product to the judges, securing the Best College Award.
                  </p>

                  <div className="flex items-end justify-between border-t border-[#D7E2EA]/5 pt-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D7E2EA]/40">
                        Best College Award / Kirti M. Doongursee College · Jan 2026
                      </span>
                      <h3 className="font-bold text-base sm:text-lg text-[#D7E2EA] uppercase tracking-wide">
                        Horizon Fest Hackathon
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => toggleFlip('horizon', e)}
                      className="flex items-center gap-1.5 rounded-full border border-[#D7E2EA]/10 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-[10px] uppercase font-semibold text-[#D7E2EA] tracking-wider transition cursor-pointer"
                    >
                      <RotateCw size={11} /> PS
                    </button>
                  </div>
                </div>

                {/* Back Side */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-[32px] border border-emerald-500/20 bg-gradient-to-b from-[#0B0B0D] to-[#141419] p-6 sm:p-8 flex flex-col justify-between overflow-hidden"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <div className="flex items-center justify-between border-b border-[#D7E2EA]/5 pb-3">
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-emerald-400">Problem Statement</span>
                    <span className="font-mono text-xs font-semibold text-[#D7E2EA]/20">/ 02</span>
                  </div>

                  <div className="flex-1 flex flex-col justify-center gap-2 my-2">
                    <h4 className="text-[#D7E2EA] font-bold text-base sm:text-lg md:text-xl leading-tight">
                      {PROBLEM_STATEMENTS['horizon'].title}
                    </h4>
                    <p className="text-xs sm:text-sm md:text-base font-light text-[#D7E2EA]/85 leading-relaxed">
                      {PROBLEM_STATEMENTS['horizon'].desc}
                    </p>
                  </div>

                  <div className="flex justify-end pt-3 border-t border-[#D7E2EA]/5">
                    <button
                      type="button"
                      onClick={(e) => toggleFlip('horizon', e)}
                      className="flex items-center gap-1.5 rounded-full border border-[#D7E2EA]/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-[10px] uppercase font-semibold text-[#D7E2EA] tracking-wider transition cursor-pointer"
                    >
                      <RotateCcw size={11} /> Back
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </FadeIn>

          {/* Card 03: Innovation - Aavishkar 2025 (4 Columns on Desktop) */}
          <FadeIn delay={0.16} y={40} className="md:col-span-4">
            <div className="relative w-full h-[340px] [perspective:1000px]">
              <motion.div
                className="relative w-full h-full [transform-style:preserve-3d]"
                animate={{ rotateY: activeCardId === 'aavishkar' ? 180 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                {/* Front Side */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-[32px] border border-[#D7E2EA]/10 bg-gradient-to-b from-[#141419] to-[#0B0B0D] p-6 sm:p-8 flex flex-col md:flex-row gap-6 md:gap-8 justify-between overflow-hidden"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                  <div className="flex flex-col justify-between flex-1 h-full">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl border border-[#D7E2EA]/10 p-2.5 text-[#D7E2EA]/60">
                        <Lightbulb size={16} strokeWidth={1.5} />
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-purple-400/80 border border-purple-500/20 bg-purple-500/10 rounded-full px-2.5 py-0.5">
                        IoT Hardware & Web
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-light text-[#D7E2EA]/60 leading-relaxed my-3 max-w-md">
                      Developed a smart air purifier attachment showcased at Aavishkar 2025. Engineered the accompanying web application and dashboard to monitor real-time air quality telemetry and control hardware devices.
                    </p>

                    <div className="flex items-end justify-between border-t border-[#D7E2EA]/5 pt-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-semibold uppercase tracking-wider text-[#D7E2EA]/40">
                          Exhibitor (Web Developer) / B.K. Birla College · Dec 2025
                        </span>
                        <h3 className="font-bold text-base sm:text-lg text-[#D7E2EA] uppercase tracking-wide">
                          Aavishkar: Smart Air Purifier
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => toggleFlip('aavishkar', e)}
                        className="flex items-center gap-1.5 rounded-full border border-[#D7E2EA]/10 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-[10px] uppercase font-semibold text-[#D7E2EA] tracking-wider transition cursor-pointer"
                      >
                        <RotateCw size={11} /> PS
                      </button>
                    </div>
                  </div>

                  {/* Right Side Visual Block */}
                  <div className="hidden md:flex w-48 flex-col justify-between rounded-2xl border border-[#D7E2EA]/5 bg-white/[0.01] p-5 relative overflow-hidden shrink-0">
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-purple-500/5 blur-xl pointer-events-none" />
                    
                    <div className="flex flex-col gap-3.5 z-10">
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] uppercase tracking-widest text-[#D7E2EA]/40 font-semibold">Microcontroller / IoT</span>
                        <span className="text-xs text-[#D7E2EA]/75 font-mono leading-relaxed mt-1">
                          Arduino<br />ESP32 Platform
                        </span>
                      </div>
                      
                      <div className="border-t border-[#D7E2EA]/5 w-full" />
                      
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] uppercase tracking-widest text-[#D7E2EA]/40 font-semibold">Dashboard Stack</span>
                        <span className="text-xs text-[#D7E2EA]/75 font-mono leading-relaxed">
                          React · CSS<br />Real-time API
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#D7E2EA]/5 pt-3 z-10">
                      <span className="text-[9px] font-semibold text-purple-400 uppercase tracking-wider">Showcased</span>
                      <ArrowUpRight className="text-[#D7E2EA]/30 group-hover:text-purple-400 transition-colors duration-500" size={14} />
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-[32px] border border-purple-500/20 bg-gradient-to-b from-[#0B0B0D] to-[#141419] p-6 sm:p-8 flex flex-col justify-between overflow-hidden"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <div className="flex items-center justify-between border-b border-[#D7E2EA]/5 pb-3">
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-purple-400">Problem Statement</span>
                    <span className="font-mono text-xs font-semibold text-[#D7E2EA]/20">/ 03</span>
                  </div>

                  <div className="flex-1 flex flex-col justify-center gap-2 my-2">
                    <h4 className="text-[#D7E2EA] font-bold text-base sm:text-lg md:text-xl leading-tight">
                      {PROBLEM_STATEMENTS['aavishkar'].title}
                    </h4>
                    <p className="text-xs sm:text-sm md:text-base font-light text-[#D7E2EA]/85 leading-relaxed">
                      {PROBLEM_STATEMENTS['aavishkar'].desc}
                    </p>
                  </div>

                  <div className="flex justify-end pt-3 border-t border-[#D7E2EA]/5">
                    <button
                      type="button"
                      onClick={(e) => toggleFlip('aavishkar', e)}
                      className="flex items-center gap-1.5 rounded-full border border-[#D7E2EA]/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-[10px] uppercase font-semibold text-[#D7E2EA] tracking-wider transition cursor-pointer"
                    >
                      <RotateCcw size={11} /> Back
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </FadeIn>

          {/* Card 04: Hackathon 3 - TechXpression x CSI (2 Columns on Desktop) */}
          <FadeIn delay={0.24} y={40} className="md:col-span-2">
            <div className="relative w-full h-[340px] [perspective:1000px]">
              <motion.div
                className="relative w-full h-full [transform-style:preserve-3d]"
                animate={{ rotateY: activeCardId === 'techxpression' ? 180 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                {/* Front Side */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-[32px] border border-[#D7E2EA]/10 bg-gradient-to-b from-[#141419] to-[#0B0B0D] p-6 sm:p-8 flex flex-col justify-between overflow-hidden"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl border border-[#D7E2EA]/10 p-2.5 text-[#D7E2EA]/60">
                        <Trophy size={16} strokeWidth={1.5} />
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400/80 border border-emerald-500/20 bg-emerald-500/10 rounded-full px-2.5 py-0.5">
                        Hackathon
                      </span>
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#D7E2EA]/20">/ 03</span>
                  </div>

                  <p className="text-xs sm:text-sm font-light text-[#D7E2EA]/60 leading-relaxed my-3">
                    Participated in the Open Innovation track at TechXpression, designing and building HireMetrics—a real-time AI-powered portal where an automated interviewer conducts verbal and technical screenings.
                  </p>

                  <div className="flex items-end justify-between border-t border-[#D7E2EA]/5 pt-4">
                    <div className="flex flex-col gap-1 min-w-0 flex-1 mr-2">
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-[#D7E2EA]/40 text-ellipsis overflow-hidden whitespace-nowrap">
                        Open Innovation / B.K. Birla x CSI · Online · Jan 2026
                      </span>
                      <h3 className="font-bold text-base text-[#D7E2EA] uppercase tracking-wide text-ellipsis overflow-hidden whitespace-nowrap">
                        TechXpression: HireMetrics
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => toggleFlip('techxpression', e)}
                      className="flex items-center gap-1.5 rounded-full border border-[#D7E2EA]/10 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-[10px] uppercase font-semibold text-[#D7E2EA] tracking-wider transition shrink-0 cursor-pointer"
                    >
                      <RotateCw size={11} /> PS
                    </button>
                  </div>
                </div>

                {/* Back Side */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-[32px] border border-emerald-500/20 bg-gradient-to-b from-[#0B0B0D] to-[#141419] p-6 sm:p-8 flex flex-col justify-between overflow-hidden"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <div className="flex items-center justify-between border-b border-[#D7E2EA]/5 pb-3">
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-emerald-400">Problem Statement</span>
                    <span className="font-mono text-xs font-semibold text-[#D7E2EA]/20">/ 03</span>
                  </div>

                  <div className="flex-1 flex flex-col justify-center gap-2 my-2">
                    <h4 className="text-[#D7E2EA] font-bold text-base sm:text-lg md:text-xl leading-tight">
                      {PROBLEM_STATEMENTS['techxpression'].title}
                    </h4>
                    <p className="text-xs sm:text-sm md:text-base font-light text-[#D7E2EA]/85 leading-relaxed">
                      {PROBLEM_STATEMENTS['techxpression'].desc}
                    </p>
                  </div>

                  <div className="flex justify-end pt-3 border-t border-[#D7E2EA]/5">
                    <button
                      type="button"
                      onClick={(e) => toggleFlip('techxpression', e)}
                      className="flex items-center gap-1.5 rounded-full border border-[#D7E2EA]/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-[10px] uppercase font-semibold text-[#D7E2EA] tracking-wider transition cursor-pointer"
                    >
                      <RotateCcw size={11} /> Back
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </FadeIn>

          {/* Card 05: Sheryians Coding School Hackathon (6 Columns) */}
          <FadeIn delay={0.28} y={40} className="md:col-span-6">
            <div className="relative w-full h-[340px] [perspective:1000px]">
              <motion.div
                className="relative w-full h-full [transform-style:preserve-3d]"
                animate={{ rotateY: activeCardId === 'sheryians' ? 180 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                {/* Front Side */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-[32px] border border-[#D7E2EA]/10 bg-gradient-to-b from-[#141419] to-[#0B0B0D] p-6 sm:p-8 flex flex-col md:flex-row gap-6 md:gap-8 justify-between overflow-hidden"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                  <div className="flex flex-col justify-between flex-1 h-full">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl border border-[#D7E2EA]/10 p-2.5 text-[#D7E2EA]/60">
                        <Trophy size={16} strokeWidth={1.5} />
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-purple-400/80 border border-purple-500/20 bg-purple-500/10 rounded-full px-2.5 py-0.5">
                        Cohort Hackathon
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-light text-[#D7E2EA]/60 leading-relaxed my-3 max-w-2xl">
                      Designed and engineered a Smart Incident Response Platform during the Cohort 2 Hackathon exclusive to Sheryians Coding School students. Collaborated in a 3-member team of random batch peers to build a system for managing production outages with live timeline updates, postmortem generators, and AI-driven root-cause suggestions within a 48-hour timeline.
                    </p>

                    <div className="flex items-end justify-between border-t border-[#D7E2EA]/5 pt-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-semibold uppercase tracking-wider text-[#D7E2EA]/40">
                          Participant / Sheryians Coding School · Cohort 2
                        </span>
                        <h3 className="font-bold text-base sm:text-lg text-[#D7E2EA] uppercase tracking-wide">
                          SHERYIANS CODING SCHOOL · HACKATHON
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setVideoOpen(true)}
                          className="flex items-center gap-1 text-[9px] rounded-full border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 px-3 py-1.5 uppercase font-semibold text-purple-400 tracking-wider transition cursor-pointer"
                        >
                          Pitch Video
                        </button>
                        <button
                          type="button"
                          onClick={(e) => toggleFlip('sheryians', e)}
                          className="flex items-center gap-1.5 rounded-full border border-[#D7E2EA]/10 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-[10px] uppercase font-semibold text-[#D7E2EA] tracking-wider transition cursor-pointer"
                        >
                          <RotateCw size={11} /> PS
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Side Visual Block */}
                  <div className="hidden md:flex w-48 flex-col justify-center rounded-2xl border border-[#D7E2EA]/5 bg-white/[0.01] p-5 relative overflow-hidden shrink-0">
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-purple-500/5 blur-xl pointer-events-none" />
                    
                    <div className="flex flex-col gap-5 z-10">
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] uppercase tracking-widest text-[#D7E2EA]/40 font-semibold">Cohort Program</span>
                        <span className="text-xs text-[#D7E2EA]/75 font-mono leading-relaxed mt-1">
                          Sheryians Coding School<br />Cohort 2 Batch
                        </span>
                      </div>
                      
                      <div className="border-t border-[#D7E2EA]/10 w-full" />
                      
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] uppercase tracking-widest text-[#D7E2EA]/40 font-semibold">Team & Duration</span>
                        <span className="text-xs text-[#D7E2EA]/75 font-mono leading-relaxed mt-1">
                          3-Member Team<br />48-Hour Hackathon
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-[32px] border border-purple-500/20 bg-gradient-to-b from-[#0B0B0D] to-[#141419] p-6 sm:p-8 flex flex-col justify-between overflow-hidden"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <div className="flex items-center justify-between border-b border-[#D7E2EA]/5 pb-3">
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-purple-400">Problem Statement</span>
                    <span className="font-mono text-xs font-semibold text-[#D7E2EA]/20">/ 04</span>
                  </div>

                  <div className="flex-1 flex flex-col justify-center gap-2 my-2">
                    <h4 className="text-[#D7E2EA] font-bold text-base sm:text-lg md:text-xl leading-tight">
                      {PROBLEM_STATEMENTS['sheryians'].title}
                    </h4>
                    <p className="text-xs sm:text-sm md:text-base font-light text-[#D7E2EA]/85 leading-relaxed">
                      {PROBLEM_STATEMENTS['sheryians'].desc}
                    </p>
                  </div>

                  <div className="flex justify-end pt-3 border-t border-[#D7E2EA]/5">
                    <button
                      type="button"
                      onClick={(e) => toggleFlip('sheryians', e)}
                      className="flex items-center gap-1.5 rounded-full border border-[#D7E2EA]/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-[10px] uppercase font-semibold text-[#D7E2EA] tracking-wider transition cursor-pointer"
                    >
                      <RotateCcw size={11} /> Back
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </FadeIn>

        </div>
      </div>
      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoSrc="/hackathon.mp4"
      />
    </section>
  );
};

export default AchievementsSection;
