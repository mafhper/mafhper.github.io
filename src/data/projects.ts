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
    id: 'icon-core',
    name: 'Icon Core',
    descriptionKey: 'projects.iconCore',
    color: '#74E6D4',
    tech: ['TypeScript', 'React', 'Tauri'],
    stars: 0,
    logoUrl: '/projects/icon-core/logo.png',
    gridLogoScale: 1.35,
    featuredLogoScale: 1.2,
    surfaceFrom: '#07131E',
    surfaceTo: '#4E357F',
    demoUrl: 'https://mafhper.github.io/icon-core/'
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
    id: 'nebula',
    name: 'Nebula',
    descriptionKey: 'projects.nebula',
    color: '#63D7FF',
    tech: ['React', 'WebGL', 'Three.js', 'GLSL'],
    stars: 0,
    logoUrl: '/projects/nebula/logo.png',
    gridLogoScale: 1.45,
    featuredLogoScale: 1.3,
    surfaceFrom: '#050816',
    surfaceTo: '#B734C8',
    demoUrl: 'https://mafhper.github.io/nebula/'
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
    id: 'sonara-hub',
    name: 'Sonara Hub',
    descriptionKey: 'projects.sonaraHub',
    color: '#31f1dc',
    tech: ['TypeScript', 'React', 'Web Audio API', 'Canvas'],
    stars: 0,
    logoUrl: '/projects/sonara-hub/logo.svg',
    surfaceFrom: '#06060a',
    surfaceTo: '#113946',
    demoUrl: 'https://mafhper.github.io/sonara_hub/'
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
  }
];
