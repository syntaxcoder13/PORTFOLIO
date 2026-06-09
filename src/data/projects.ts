export interface ProjectData {
  number: string;
  category: string;
  name: string;
  liveUrl: string;
  displayUrl: string;
  desc: string;
  tagline: string;
  githubUrl: string;
  duration: string;
  teamSize: string;
  roleName: string;
  roleBullets: string[];
  detailedOverview: string;
  problemStatement: string;
  quote: string;
  solution: string;
  outcomes: string;
  features: string[];
  tech: string[];
  role: string;
  year: string;
  accentRgb: string;
  mainImage: string;
  isLive: boolean;
}

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
      'Configured structured evaluation grader LLM prompt systems'
    ],
    detailedOverview: 'HireMetrics is a scalable applicant screening web portal designed to optimize initial hiring stages. Utilizing intelligent voice-conversational agents, the platform conducts human-like audio interviews, evaluates candidate responses dynamically in real-time, and aggregates deep performance metrics into clean recruiter pipelines.',
    problemStatement: 'Manual candidate screening is resource-intensive, slow, and prone to subjective evaluator bias. HR professionals spend hundreds of hours conducting initial calls that can be automated to accelerate hiring cycles.',
    quote: 'We wanted to conduct human-like technical assessments at scale, giving every candidate a fair, objective verbal screening.',
    solution: 'I built HireMetrics, integrating web socket audio channels, automated speech-to-text pipelines, and customized grading models on the backend to immediately output diagnostic candidate reports.',
    outcomes: 'Successfully engineered a functional prototype that reduced HR screening overhead by 90% while maintaining high objective accuracy.',
    features: ['Voice AI Analysis', 'Autonomous Screening', 'Candidate Analytics Reports'],
    tech: ['React', 'Gemini API', 'TailwindCSS'],
    role: 'Lead Developer',
    year: '2026',
    accentRgb: '16, 185, 129', // Emerald
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
    tagline: 'CrisisConnect is a next-generation decentralized platform designed to synchronize emergency responders, resource logistics, and victim assistance in real-time.',
    githubUrl: 'https://github.com/syntaxcoder13/CrisisConnect',
    duration: 'Dec 2026',
    teamSize: '3 Developers',
    roleName: 'Full Stack Engineer',
    roleBullets: [
      'Developed Strategic Mission Map using Leaflet for real-time responder tracking',
      'Integrated Gemini 2.0 API to parse hands-free neural audio triage transcriptions',
      'Engineered real-time reactive sync database channels using Appwrite Backend-as-a-Service'
    ],
    detailedOverview: 'CrisisConnect is a next-generation decentralized platform designed to synchronize emergency responders, resource logistics, and victim assistance in real-time. Built for high-stakes environments, it leverages AI-driven triage and strategic geospatial intelligence.',
    problemStatement: 'Emergency response efforts during critical situations suffer from information fragmentation, slow dispatch tracking, and communication bottlenecks. Responders operate without combined heatmaps, and victims lack simple voice-guided reporting platforms.',
    quote: 'Building CrisisConnect meant combining real-time database sync channels with AI triage to synthesize critical incident reports in milliseconds.',
    solution: 'I developed the tactical command dashboard, integrating Leaflet geospatial layers, Gemini 2.0 voice transcription APIs, and Appwrite databases to enable offline caching and real-time alerts sync.',
    outcomes: 'Empowered teams to dispatch volunteers 60% faster, establishing an installable PWA interface that operates resiliently with offline caching.',
    features: ['Strategic Mission Map', 'AI Voice Triage', 'Tactical Command'],
    tech: ['Next.js', 'Appwrite', 'Leaflet', 'Gemini 2.0'],
    role: 'Full Stack Engineer',
    year: '2026',
    accentRgb: '239, 68, 68', // Red
    mainImage: '/crisisconnect.png',
    isLive: true,
  },
  {
    number: '03',
    category: 'AI / Automation',
    name: 'J.A.R.V.I.S',
    liveUrl: 'https://github.com/syntaxcoder13/JARVIS-AI-ASSISTANT',
    displayUrl: 'github.com/syntaxcoder13/JARVIS-AI-ASSISTANT',
    desc: 'A high-performance, Multimodal AI Desktop Assistant powered by Groq, LangChain, and FastAPI that controls your Windows PC, remembers preferences, and automates tasks.',
    tagline: 'A high-performance, Multimodal AI Desktop Assistant powered by Groq, LangChain, and FastAPI.',
    githubUrl: 'https://github.com/syntaxcoder13/JARVIS-AI-ASSISTANT',
    duration: 'Feb 2026',
    teamSize: 'Solo Project',
    roleName: 'Lead Developer',
    roleBullets: [
      'Designed multimodal AI orchestration logic using FastAPI and LangChain',
      'Configured FAISS Vector Store memory storage for long-term user profile retrieval',
      'Developed PowerShell automation interface hooks for remote Windows application execution'
    ],
    detailedOverview: 'J.A.R.V.I.S is a high-performance Multimodal AI Desktop Assistant inspired by Iron Man\'s J.A.R.V.I.S. Utilizing Groq and Llama 3 models, it offers real-time voice synthesis and interactive web UI panels, making automation accessible through natural language controls.',
    problemStatement: 'Traditional desktop automation tools require complex scripting languages or static macro programs, which lack adaptability to dynamic user intents or voice controls.',
    quote: 'Creating a zero-latency desktop assistant meant combining localized OS triggers with blazing fast LLM inferences at sub-400ms levels.',
    solution: 'I designed a system integrating FastAPI web hooks, customized PowerShell task scripts, memory vector embeddings, and multi-threaded edge-TTS verbal feedbacks.',
    outcomes: 'Successfully deployed a modular system capable of opening applications, querying Vector databases, and executing system telemetry commands seamlessly.',
    features: ['OS Task Automation', 'FAISS Memory Storage', 'Voice Synthesis API'],
    tech: ['FastAPI', 'Groq API', 'LangChain', 'FAISS'],
    role: 'Lead Developer',
    year: '2026',
    accentRgb: '59, 130, 246', // Iron Man Arc Reactor Blue
    mainImage: '/jarvis-hero.png',
    isLive: false,
  },
];
