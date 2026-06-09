import { useRef } from 'react';
import { Code2, Cpu, Wrench, Sparkles, LucideIcon } from 'lucide-react';
import { motion, useMotionValue, useMotionTemplate, Variants } from 'framer-motion';
import FadeIn from './FadeIn';

interface SkillGroup {
  label: string;
  icon: LucideIcon;
  rgbColor: string; // RGB values for the spotlight
  items: string[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    label: 'Languages',
    icon: Code2,
    rgbColor: '59, 130, 246', // Blue
    items: ['Python', 'JavaScript', 'HTML', 'CSS', 'SQL'],
  },
  {
    label: 'Frameworks & Libraries',
    icon: Cpu,
    rgbColor: '168, 85, 247', // Purple
    items: ['React', 'Tailwind', 'Pandas', 'NumPy', 'Scikit-learn', 'NLTK'],
  },
  {
    label: 'Tools & Platforms',
    icon: Wrench,
    rgbColor: '245, 158, 11', // Amber
    items: ['Figma', 'Vercel', 'Git', 'GitHub', 'Power BI', 'Canva', 'Excel'],
  },
  {
    label: 'AI & GenAI',
    icon: Sparkles,
    rgbColor: '16, 185, 129', // Emerald
    items: ['Gemini', 'Claude', 'OpenAI', 'Prompt engineering'],
  },
];

const SkillCard = ({ group, index }: { group: SkillGroup; index: number }) => {
  const Icon = group.icon;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  // Subtle spotlight background tracking the cursor
  const backgroundSpotlight = useMotionTemplate`
    radial-gradient(
      300px circle at ${mouseX}px ${mouseY}px,
      rgba(${group.rgbColor}, 0.05),
      transparent 80%
    )
  `;

  // Subtle spotlight border tracking the cursor
  const borderSpotlight = useMotionTemplate`
    radial-gradient(
      200px circle at ${mouseX}px ${mouseY}px,
      rgba(${group.rgbColor}, 0.2),
      transparent 80%
    )
  `;

  // Staggered reveal for skills tags
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: index * 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col rounded-xl border border-[#D7E2EA]/5 bg-[#121212]/15 backdrop-blur-xl p-8 sm:p-10 transition-all duration-500 overflow-hidden"
    >
      {/* Spotlight Background overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: backgroundSpotlight }}
      />

      {/* Spotlight Border overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl border border-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          borderImageSource: borderSpotlight,
          borderImageSlice: 1,
          maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
        }}
      />

      {/* Top light reflection border (very fine) */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D7E2EA]/10 to-transparent" />

      {/* Card Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-5 mb-8">
          <div
            className="flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-500 group-hover:scale-105"
            style={{
              background: `rgba(${group.rgbColor}, 0.06)`,
              border: `1px solid rgba(${group.rgbColor}, 0.15)`,
            }}
          >
            <Icon 
              className="w-5.5 h-5.5 transition-transform duration-500 group-hover:rotate-6"
              style={{ color: `rgb(${group.rgbColor})` }} 
            />
          </div>
          <h3 className="text-md sm:text-lg font-bold uppercase tracking-[0.25em] text-[#D7E2EA]/80 transition-colors duration-300 group-hover:text-white">
            {group.label}
          </h3>
        </div>

        {/* Skill tags */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
          className="flex flex-wrap gap-2 sm:gap-2.5 mt-auto"
        >
          {group.items.map((item) => (
            <motion.span
              key={item}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.04, 
                y: -1,
                borderColor: `rgba(${group.rgbColor}, 0.3)`,
                color: '#FFFFFF'
              }}
              className="rounded-lg border border-[#D7E2EA]/5 bg-[#1a1a1a]/40 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#D7E2EA]/60 transition-all duration-300 cursor-default"
            >
              {item}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="relative z-10 w-full bg-[#0C0C0C] px-4 sm:px-6 md:px-10 py-20 sm:py-24 md:py-32 overflow-hidden"
    >
      {/* Minimal grid lines in background for Awwwards style */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="mb-16 sm:mb-20 md:mb-24 text-center">
          <FadeIn y={40}>
            <h2
              className="hero-heading font-black uppercase tracking-tight leading-none mb-4"
              style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            >
              Skills
            </h2>
          </FadeIn>
          <FadeIn delay={0.12} y={20}>
            <p className="font-light uppercase tracking-[0.25em] text-[#D7E2EA]/50 text-xs sm:text-sm">
              Languages, Frameworks, and Tools I Work With
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {SKILL_GROUPS.map((group, index) => (
            <SkillCard key={group.label} group={group} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
