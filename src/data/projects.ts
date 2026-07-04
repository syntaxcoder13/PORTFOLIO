import type { ProjectData } from '../types/project.types';

export type { ProjectData };

export const ALL_PROJECTS: ProjectData[] = [
  {
    number: '01',
    category: 'AI Interview Platform',
    name: 'HireMetrics',
    liveUrl: 'https://hiremetrics.vercel.app',
    displayUrl: 'hiremetrics.vercel.app',
    desc: 'An AI-powered candidate interview system that conducts autonomous voice and text screenings, evaluates responses dynamically, and provides real-time scoring metrics.',
    tagline: 'An AI-powered interview platform that conducts autonomous candidate voice screenings and technical assessments.',
    githubUrl: 'https://github.com/syntaxcoder13/HireMetrics',
    duration: 'Jan 2026',
    teamSize: 'Solo Project',
    roleName: 'Lead Developer',
    roleBullets: [
      'Designed conversational AI visual interface and telemetry dashboards',
      'Integrated web socket audio streaming and real-time voice synthesis agents',
      'Configured structured evaluation grader LLM prompt systems',
    ],
    detailedOverview:
      'HireMetrics is a scalable applicant screening web portal designed to optimize initial hiring stages. Utilizing intelligent voice-conversational agents, the platform conducts human-like audio interviews, evaluates candidate responses dynamically in real-time, and aggregates deep performance metrics into clean recruiter pipelines.',
    problemStatement:
      'Manual candidate screening is resource-intensive, slow, and prone to subjective evaluator bias. HR professionals spend hundreds of hours conducting initial calls that can be automated to accelerate hiring cycles.',
    quote:
      'We wanted to conduct human-like technical assessments at scale, giving every candidate a fair, objective verbal screening.',
    solution:
      'I built HireMetrics, integrating web socket audio channels, automated speech-to-text pipelines, and customized grading models on the backend to immediately output diagnostic candidate reports.',
    outcomes:
      'Successfully engineered a functional prototype that reduced HR screening overhead by 90% while maintaining high objective accuracy.',
    features: ['Voice AI Analysis', 'Autonomous Screening', 'Candidate Analytics Reports'],
    tech: ['React', 'Gemini API', 'TailwindCSS'],
    role: 'Lead Developer',
    year: '2026',
    accentRgb: '16, 185, 129',
    mainImage: '/hiremetrics.png',
    isLive: true,
  },
  {
    number: '02',
    category: 'Crisis Management / AI',
    name: 'CrisisConnect',
    liveUrl: 'https://crisis-mu.vercel.app/',
    displayUrl: 'crisis-mu.vercel.app',
    desc: 'A next-generation decentralized platform designed to synchronize emergency responders, resource logistics, and victim assistance in real-time.',
    tagline:
      'CrisisConnect is a next-generation decentralized platform designed to synchronize emergency responders, resource logistics, and victim assistance in real-time.',
    githubUrl: 'https://github.com/syntaxcoder13/CrisisConnect',
    duration: 'April 2026',
    teamSize: '3 Developers',
    roleName: 'Full Stack Engineer',
    roleBullets: [
      'Developed Strategic Mission Map using Leaflet for real-time responder tracking',
      'Integrated Gemini 2.0 API to parse hands-free neural audio triage transcriptions',
      'Engineered real-time reactive sync database channels using Appwrite Backend-as-a-Service',
    ],
    detailedOverview:
      'CrisisConnect is a next-generation decentralized platform designed to synchronize emergency responders, resource logistics, and victim assistance in real-time. Built for high-stakes environments, it leverages AI-driven triage and strategic geospatial intelligence.',
    problemStatement:
      'Emergency response efforts during critical situations suffer from information fragmentation, slow dispatch tracking, and communication bottlenecks. Responders operate without combined heatmaps, and victims lack simple voice-guided reporting platforms.',
    quote:
      'Building CrisisConnect meant combining real-time database sync channels with AI triage to synthesize critical incident reports in milliseconds.',
    solution:
      'I developed the tactical command dashboard, integrating Leaflet geospatial layers, Gemini 2.0 voice transcription APIs, and Appwrite databases to enable offline caching and real-time alerts sync.',
    outcomes:
      'Empowered teams to dispatch volunteers 60% faster, establishing an installable PWA interface that operates resiliently with offline caching.',
    features: ['Strategic Mission Map', 'AI Voice Triage', 'Tactical Command'],
    tech: ['Next.js', 'Appwrite', 'Leaflet', 'Gemini 2.0'],
    role: 'Full Stack Engineer',
    year: '2026',
    accentRgb: '239, 68, 68',
    mainImage: '/crisisconnect.png',
    isLive: true,
  },
  {
    number: '03',
    category: 'EdTech / AI',
    name: 'Learnivo AI',
    liveUrl: 'https://www.learnivo.app',
    displayUrl: 'learnivo.app',
    desc: 'An ultimate AI-powered edtech platform designed for modern Indian schools and educators to automate lesson planning, create interactive learning content, and assist teachers in saving hours weekly.',
    tagline: 'Transforming classroom education with tailored AI assistant tools for modern schools.',
    githubUrl: 'https://github.com/syntaxcoder13/Learnivo-AI',
    duration: 'April 2026',
    teamSize: 'Vasudev AI (Internship)',
    roleName: 'Frontend Design Intern',
    roleBullets: [
      'Designed and built the user interface layouts for modern edtech templates',
      'Created responsive pricing systems, dark-theme panels, and pricing carousels',
      'Designed clean dashboard telemetry charts and lesson grid displays',
    ],
    detailedOverview:
      'Learnivo AI was built during my internship at Vasudev AI. I was tasked with designing and developing the frontend user experience for this AI-driven educational platform, enabling teachers to easily navigate and plan lessons.',
    problemStatement:
      'Indian educational planning interfaces are often complex and cluttered, making it difficult for educators to adopt AI assistants into their busy schedules without template training.',
    quote:
      'Our goal during my internship at Vasudev AI was to construct a clean, modern edtech design that feels intuitive and accessible for teachers.',
    solution:
      'I designed and built the frontend interface for Learnivo AI, establishing interactive lesson grids, responsive product dashboards, and theme transitions.',
    outcomes:
      'Successfully launched a beautiful, user-focused design now trusted by educators to save hours of administrative planning weekly.',
    features: ['Lesson Planner', 'Story Generator', 'Hyper-Local Content'],
    tech: ['Next.js', 'React', 'TailwindCSS', 'Gemini API'],
    role: 'Frontend Design Intern',
    year: '2026',
    accentRgb: '74, 222, 128',
    mainImage: '/Learnivo AI.png',
    isLive: true,
  },
  {
    number: '04',
    category: 'Educational / Web',
    name: 'Bhavna Institute',
    liveUrl: 'https://bcss-vai.vercel.app/',
    displayUrl: 'bcss-vai.vercel.app',
    desc: 'A modern educational portal designed for Bhavna Institute in Meerut, providing an intuitive course exploration hub for job-oriented computer training programs (AI Tools, Web Development, and Tally Prime).',
    tagline: 'A centralized educational course portal designed to showcase job-oriented practical training.',
    githubUrl: 'https://github.com/syntaxcoder13/Bhavna-Institute',
    duration: 'May 2026',
    teamSize: 'Vasudev AI (Internship)',
    roleName: 'Frontend Design Intern',
    roleBullets: [
      'Designed and built the user interface layouts for course cataloging and free demo request flows',
      'Created responsive layouts for computer course guides (Advanced Excel, Tally Prime, and WordPress)',
      'Developed clear navigation grids and contact details section aligned with institutional branding',
    ],
    detailedOverview:
      'Bhavna Institute is a dedicated course portal built during my internship at Vasudev AI. I designed the frontend UI to showcase 100% job-oriented practical training programs, simplifying course discovery and demo class registrations.',
    problemStatement:
      'Students looking for computer training programs in regional areas lack a fast, responsive, and clear web portal to explore courses and enroll in demo classes.',
    quote:
      'Our goal during my internship at Vasudev AI was to construct a highly responsive and intuitive website that makes finding job-oriented computer courses effortless.',
    solution:
      'I designed and built the responsive frontend layout for the Bhavna Institute portal, establishing clean course guides, structured educational details, and mobile-friendly layouts.',
    outcomes:
      'Successfully launched a user-friendly education catalog helping students easily explore and register for demo classes in Meerut.',
    features: ['Course Showcase', 'Interactive Catalog', 'Demo Request Flow'],
    tech: ['React', 'TailwindCSS', 'Vite', 'Framer Motion'],
    role: 'Frontend Design Intern',
    year: '2026',
    accentRgb: '99, 102, 241',
    mainImage: '/Bhavna.png',
    isLive: true,
  },
];
