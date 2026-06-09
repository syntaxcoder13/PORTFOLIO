/**
 * Represents a single portfolio project entry.
 */
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
  /** RGB values as a comma-separated string, e.g. "16, 185, 129" */
  accentRgb: string;
  mainImage: string;
  isLive: boolean;
}
