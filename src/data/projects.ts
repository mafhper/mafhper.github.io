export interface Project {
  id: string;
  name: string;
  descriptionKey: string; // Key for i18n
  color: string;
  tech: string[];
  stars: number;
  logoUrl?: string;
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
    logoUrl: '/projects/aurawall/logo.png',
    previewUrl: '/projects/aurawall/preview.jpg',
    demoUrl: 'https://mafhper.github.io/aurawall'
  },
  {
    id: 'personalnews',
    name: 'personalnews',
    descriptionKey: 'projects.personalnews',
    color: '#6FA99F',
    tech: ['TypeScript', 'PWA', 'RSS'],
    stars: 89,
    logoUrl: '/projects/personalnews/logo.svg',
    previewUrl: '/projects/personalnews/preview.jpg',
    demoUrl: 'https://mafhper.github.io/personalnews'
  },
  {
    id: 'spread',
    name: 'spread',
    descriptionKey: 'projects.spread',
    color: '#CFF56E',
    tech: ['React', 'Share API'],
    stars: 45,
    logoUrl: '/projects/spread/logo.svg',
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
    demoUrl: 'https://mafhper.github.io/imaginizim'
  },
  {
    id: 'mark-lee',
    name: 'Mark-Lee',
    descriptionKey: 'projects.markLee',
    color: '#6FA99F',
    tech: ['TypeScript', 'React 19', 'Tauri 2'],
    stars: 0,
    logoUrl: '/projects/mark-lee/logo.svg',
    demoUrl: 'https://mafhper.github.io/mark-lee/'
  },
  {
    id: 'kaes-keide-inspector',
    name: 'Kaes Keide Inspector',
    descriptionKey: 'projects.kaesKeideInspector',
    color: '#C78F3C',
    tech: ['TypeScript', 'React 19', 'Chrome Extension'],
    stars: 0,
    logoUrl: '/projects/kaes-keide-inspector/logo.svg',
    demoUrl: 'https://mafhper.github.io/kaes-keide-inspector/'
  }
];
