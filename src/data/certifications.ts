export interface CertificationData {
  id: string;
  title: string;
  platform: string;
  issueDate: string;
  rawDate: string;
  credentialUrl: string;
  image?: string;
  logoType?: 'fcc' | 'meta' | 'google' | 'mongodb' | 'udemy' | 'coursera' | 'hackerrank';
  subtitle?: string;
  recipient?: string;
  signatures?: string[];
}

export const ALL_CERTIFICATIONS: CertificationData[] = [
  {
    id: 'techxpression-cert',
    title: 'TechXpression X CSI',
    platform: 'B.K. Birla x CSI',
    issueDate: 'JAN 2026',
    rawDate: '2026-01-20',
    credentialUrl: '',
    image: '/techxpression-certificate.png',
  },
  {
    id: 'aavishkar-cert',
    title: 'Aavishkar 2025',
    platform: 'B.K. Birla College',
    issueDate: 'DEC 2025',
    rawDate: '2025-12-25',
    credentialUrl: '',
    image: '/aavishkar-2025.png',
  },
  {
    id: 'powerbi-cert',
    title: 'Power BI Simulation',
    platform: 'Kirti College, University of Mumbai',
    issueDate: 'SEP 2025',
    rawDate: '2025-11-15',
    credentialUrl: '',
    image: '/powerbi.png',
  },
  {
    id: 'paranox-cert',
    title: 'Paranox Contest 2.0',
    platform: 'Paranox',
    issueDate: 'OCT 2025',
    rawDate: '2025-10-20',
    credentialUrl: '',
    image: '/paranox-certificate.png',
  }
];
