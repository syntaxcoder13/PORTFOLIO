export interface AchievementData {
  id: string;
  number: string;
  type: string;
  typeColorClass: string;
  roleInfo: string;
  eventInfo: string;
  title: string;
  description: string;
  problemTitle: string;
  problemDesc: string;
  colSpan: string;
  iconType: 'trophy' | 'lightbulb';
  hasVideo?: boolean;
}

export const ALL_ACHIEVEMENTS: AchievementData[] = [
  {
    id: 'hack-1',
    number: '01',
    type: 'Hackathon',
    typeColorClass: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    roleInfo: 'Participant / TECHXNINJAS',
    eventInfo: 'Online · Oct 2025',
    title: 'Paranox Contest 2.0',
    description: 'Worked with a team of developers at Paranox Contest 2.0 to build prototype web applications resolving collaborative workflow challenges.',
    problemTitle: 'Paranox Contest Challenge',
    problemDesc: 'Develop a highly performant web application that resolves workflow and collaboration bottlenecks in remote environments while maintaining zero-trust security.',
    colSpan: 'md:col-span-3',
    iconType: 'trophy'
  },
  {
    id: 'horizon',
    number: '02',
    type: 'Award',
    typeColorClass: 'bg-amber-50 text-amber-800 border-amber-200/80',
    roleInfo: 'Best College Award',
    eventInfo: 'Kirti M. Doongursee College · Jan 2026',
    title: 'Horizonfest',
    description: 'Built a Windows 95 simulator in the browser at a 2-day hackathon. Presented our web prototype to the judges, securing the Best College Award.',
    problemTitle: 'Simulation of Windows 95 OS inside a web browser',
    problemDesc: 'Create a web-based simulation of the Windows 95 operating system that recreates its visual style and core OS behaviour, including basic system features and simulated utility applications such as Calculator and Notepad.',
    colSpan: 'md:col-span-3',
    iconType: 'trophy'
  },
  {
    id: 'aavishkar',
    number: '03',
    type: 'IoT Hardware & Web',
    typeColorClass: 'bg-indigo-50 text-indigo-800 border-indigo-200/80',
    roleInfo: 'Exhibitor (Web Developer)',
    eventInfo: 'B.K. Birla College · Dec 2025',
    title: 'Aavishkar 2025',
    description: 'Exhibited at Aavishkar 2025. I built a web dashboard to track real-time air quality data and control ESP32 hardware purifiers.',
    problemTitle: 'IoT-Enabled Smart Air Purification System',
    problemDesc: 'Design and engineer an IoT-enabled smart air purifier under the Open Innovation track. Focus on developing a companion web dashboard/app to monitor environmental telemetry and control physical hardware components in real-time.',
    colSpan: 'md:col-span-4',
    iconType: 'lightbulb'
  },
  {
    id: 'techxpression',
    number: '04',
    type: 'Hackathon',
    typeColorClass: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    roleInfo: 'Open Innovation',
    eventInfo: 'B.K. Birla x CSI · Online · Jan 2026',
    title: 'TechXpression: HireMetrics',
    description: 'Built HireMetrics at TechXpression—a web portal where an automated AI agent conducts live verbal and technical interviews.',
    problemTitle: 'AI-Powered Automated Candidate Interview System',
    problemDesc: 'Develop an intelligent system capable of conducting autonomous, human-like voice/text interviews, evaluating candidate responses dynamically in real-time, and generating comprehensive screening metrics under the Open Innovation track.',
    colSpan: 'md:col-span-2',
    iconType: 'trophy'
  },
  {
    id: 'sheryians',
    number: '05',
    type: 'Cohort Hackathon',
    typeColorClass: 'bg-purple-50 text-purple-800 border-purple-200/80',
    roleInfo: 'Participant',
    eventInfo: 'Sheryians Coding School · Cohort 2',
    title: 'Sheryians Hackathon',
    description: 'Designed a production incident manager with a 3-member team during a 48-hour hackathon. Built timeline tracking, automated postmortems, and AI root-cause analyzers.',
    problemTitle: 'Smart Incident Response Platform',
    problemDesc: 'Develop a system for managing production incidents and outages. Teams should be able to create incidents, assign responders, post live updates, maintain timelines, generate postmortems, and show a public status page. AI can be used for summaries and probable root-cause suggestions.',
    colSpan: 'md:col-span-6',
    iconType: 'trophy',
    hasVideo: true
  }
];
