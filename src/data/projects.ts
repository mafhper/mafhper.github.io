export interface Project {
  id: string;
  name: string;
  descriptionKey: string; // Key for i18n
  color: string;
  tech: string[];
  stars: number;
  logoUrl?: string;
  gridLogoScale?: number;
  featuredLogoScale?: number;
  surfaceFrom?: string;
  surfaceTo?: string;
  previewUrl?: string;
  demoUrl?: string;
}

export const projects: Project[] = [
  {
    id: 'aurawall',
    name: 'aurawall',
    descriptionKey: 'projects.aurawall',
    color: '#347B66',
    tech: ['TypeScript', 'React', 'Canvas'],
    stars: 124,
    logoUrl: '/projects/aurawall/logo.svg',
    surfaceFrom: '#2B1535',
    surfaceTo: '#C71459',
    previewUrl: '/projects/aurawall/preview.jpg',
    demoUrl: 'https://mafhper.github.io/aurawall'
  },
  {
    id: 'personalnews',
    name: 'personalnews',
    descriptionKey: 'projects.personalnews',
    color: '#F36C35',
    tech: ['TypeScript', 'PWA', 'RSS'],
    stars: 89,
    logoUrl: '/projects/personalnews/logo.svg',
    surfaceFrom: '#2A1010',
    surfaceTo: '#C62E23',
    previewUrl: '/projects/personalnews/preview.jpg',
    demoUrl: 'https://mafhper.github.io/personalnews'
  },
  {
    id: 'spread',
    name: 'spread',
    descriptionKey: 'projects.spread',
    color: '#6D5EF3',
    tech: ['React', 'Share API'],
    stars: 45,
    logoUrl: '/projects/spread/logo.svg',
    gridLogoScale: 1.4,
    featuredLogoScale: 1.25,
    surfaceFrom: '#141827',
    surfaceTo: '#3C3B78',
    previewUrl: '/projects/spread/preview.png',
    demoUrl: 'https://mafhper.github.io/spread'
  },
  {
    id: 'imaginizim',
    name: 'imaginizim',
    descriptionKey: 'projects.imaginizim',
    color: '#347B66',
    tech: ['JavaScript', 'Compression'],
    stars: 67,
    logoUrl: '/projects/imaginizim/logo.svg',
    surfaceFrom: '#1A1B24',
    surfaceTo: '#4E4279',
    demoUrl: 'https://mafhper.github.io/imaginizim'
  },
  {
    id: 'fremit',
    name: 'Fremit',
    descriptionKey: 'projects.fremit',
    color: '#335281',
    tech: ['React', 'TypeScript', 'Zustand'],
    stars: 0,
    logoUrl: '/projects/fremit/logo.svg',
    surfaceFrom: '#263F5D',
    surfaceTo: '#6886B0',
    demoUrl: 'https://mafhper.github.io/fremit/'
  },
  {
    id: 'mark-lee',
    name: 'Mark-Lee',
    descriptionKey: 'projects.markLee',
    color: '#6FA99F',
    tech: ['TypeScript', 'React 19', 'Tauri 2'],
    stars: 0,
    logoUrl: '/projects/mark-lee/logo.svg',
    surfaceFrom: '#67817B',
    surfaceTo: '#B1C0B8',
    demoUrl: 'https://mafhper.github.io/mark-lee/'
  },
  {
    id: 'kaes-keide-inspector',
    name: 'Kaes Keide Inspector',
    descriptionKey: 'projects.kaesKeideInspector',
    color: '#C9C1B4',
    tech: ['TypeScript', 'React 19', 'Chrome Extension'],
    stars: 0,
    logoUrl: '/projects/kaes-keide-inspector/logo.svg',
    surfaceFrom: '#F3EEE4',
    surfaceTo: '#D9D1C4',
    demoUrl: 'https://mafhper.github.io/kaes-keide-inspector/'
  }
];
