/**
 * Represents a single achievement / hackathon / award entry.
 */
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
  /** Tailwind col-span class, e.g. "md:col-span-3" */
  colSpan: string;
  iconType: 'trophy' | 'lightbulb';
  hasVideo?: boolean;
}
