import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { 
  Palette, 
  Code2, 
  Sparkles, 
  Cpu, 
  BarChart3, 
  ArrowUpRight 
} from 'lucide-react';
import FadeIn from './FadeIn';

const SERVICES = [
  {
    number: '01',
    title: 'UI/UX Design',
    icon: Palette,
    rgbColor: '244, 63, 94', // Rose
    description:
      'Designing clean, intuitive interfaces that prioritise user flow, hierarchy, and visual clarity — turning ideas into experiences people actually enjoy using.',
    tags: ['Figma', 'Wireframing', 'User Flows', 'Prototyping'],
  },
  {
    number: '02',
    title: 'Front-end Development',
    icon: Code2,
    rgbColor: '59, 130, 246', // Blue
    description:
      'Building responsive, performant web apps with React, TypeScript, and Tailwind — pixel-perfect on every screen, deployed seamlessly on Vercel.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
  },
  {
    number: '03',
    title: 'GenAI Integration',
    icon: Sparkles,
    rgbColor: '139, 92, 246', // Violet
    description:
      'Wiring large language models into real products via Gemini, Claude, and OpenAI APIs — from resume reviewers to AI tutors and beyond.',
    tags: ['Gemini API', 'Claude', 'OpenAI', 'RAG Systems'],
  },
  {
    number: '04',
    title: 'Prompt Engineering',
    icon: Cpu,
    rgbColor: '245, 158, 11', // Amber
    description:
      'Crafting reliable prompts and automation flows that turn LLMs into production-grade tools for content generation, analysis, and decision support.',
    tags: ['Prompt Chains', 'System Prompts', 'LLM Agents', 'Workflows'],
  },
  {
    number: '05',
    title: 'Data Analysis & Viz',
    icon: BarChart3,
    rgbColor: '16, 185, 129', // Emerald
    description:
      'Exploring datasets with Python (Pandas, NumPy, Seaborn) and Power BI — turning raw numbers into clear insights and dashboards stakeholders can act on.',
    tags: ['Python', 'Pandas', 'Power BI', 'Seaborn'],
  },
];

const ServiceCard = ({ service, index }: { service: typeof SERVICES[0]; index: number }) => {
  const IconComponent = service.icon;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const backgroundSpotlight = useMotionTemplate`
    radial-gradient(
      320px circle at ${mouseX}px ${mouseY}px,
      rgba(${service.rgbColor}, 0.08),
      transparent 80%
    )
  `;

  const borderSpotlight = useMotionTemplate`
    radial-gradient(
      220px circle at ${mouseX}px ${mouseY}px,
      rgba(${service.rgbColor}, 0.25),
      transparent 80%
    )
  `;

  return (
    <FadeIn 
      delay={index * 0.06} 
      y={40}
      className={`group relative flex flex-col justify-between p-8 sm:p-10 rounded-[32px] bg-white border border-[#0C0C0C]/5 transition-all duration-500 hover:shadow-2xl hover:shadow-[#0C0C0C]/5 overflow-hidden ${
        index === 0 ? 'lg:col-span-1' : ''
      } ${index === 1 ? 'lg:col-span-2' : ''} ${
        index === 2 ? 'lg:col-span-2' : ''
      } ${index > 2 ? 'lg:col-span-1' : ''}`}
      style={{
        minHeight: '340px'
      }}
    >
      {/* Spotlight Background */}
      <motion.div 
        onMouseMove={handleMouseMove}
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{ background: backgroundSpotlight }}
      />

      {/* Spotlight Border */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[32px] border border-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-10"
        style={{
          borderImageSource: borderSpotlight,
          borderImageSlice: 1,
          maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
        }}
      />

      {/* Actual Mouse Tracking Listener Area */}
      <div 
        className="absolute inset-0 z-0"
        onMouseMove={handleMouseMove}
      />

      {/* Card Content Wrapper */}
      <div className="relative z-10 flex flex-col justify-between h-full pointer-events-none">
        <div>
          <div className="flex items-center justify-between mb-8">
            {/* Styled Icon */}
            <div 
              className="p-4 rounded-2xl bg-[#FAFAFA] border border-[#0C0C0C]/5 group-hover:bg-white group-hover:scale-105 transition-all duration-500"
              style={{
                borderColor: `rgba(${service.rgbColor}, 0.1)`,
              }}
            >
              <IconComponent 
                className="w-8 h-8 transition-transform duration-500 group-hover:rotate-6" 
                style={{ color: `rgb(${service.rgbColor})` }}
              />
            </div>

            {/* Float Badge Number */}
            <span className="font-mono text-xs font-semibold text-[#0C0C0C]/35 tracking-wider bg-[#FAFAFA] px-3.5 py-1.5 rounded-full border border-[#0C0C0C]/5 group-hover:bg-white group-hover:text-[#0C0C0C]/70 transition-all duration-300">
              {service.number}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#0C0C0C] mb-4 transition-colors duration-300 group-hover:text-black">
            {service.title}
          </h3>
          
          <p className="text-sm sm:text-base text-[#0C0C0C]/60 font-light leading-relaxed mb-8 max-w-xl">
            {service.description}
          </p>
        </div>

        {/* Card Footer tags + action */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#0C0C0C]/5">
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span 
                key={tag}
                className="text-[11px] bg-[#FAFAFA] text-[#0C0C0C]/70 group-hover:bg-white/80 group-hover:text-[#0C0C0C] px-3 py-1 rounded-lg border border-[#0C0C0C]/5 font-medium transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action icon bubble */}
          <div 
            className="w-8 h-8 rounded-full border border-[#0C0C0C]/10 flex items-center justify-center bg-transparent group-hover:bg-[#0C0C0C] group-hover:border-transparent transition-all duration-300 shrink-0"
            style={{
              borderColor: `rgba(${service.rgbColor}, 0.2)`,
            }}
          >
            <ArrowUpRight className="w-4 h-4 text-[#0C0C0C] group-hover:text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

const ServicesSection = () => {
  return (
    <section
      id="services"
      className="relative w-full bg-[#FAFAFA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 overflow-hidden"
    >
      {/* Minimal grid lines background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#0C0C0C_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 md:mb-24 gap-6">
          <FadeIn y={30}>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#0C0C0C]/50 block mb-3">
              CREATIVE SOLUTIONS
            </span>
            <h2 className="font-black uppercase text-[#0C0C0C] leading-none text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              Services
            </h2>
          </FadeIn>
          
          <FadeIn y={30} delay={0.1}>
            <p className="text-base sm:text-lg text-[#0C0C0C]/60 max-w-md font-light leading-relaxed">
              Combining layout aesthetics, frontend engineering, and artificial intelligence architectures to build outstanding web products.
            </p>
          </FadeIn>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.number} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;




