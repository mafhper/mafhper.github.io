import { Suspense, lazy } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import { MainLayout } from './layouts/MainLayout';
import { Hero } from './components/Hero';
import './i18n';

// Lazy load non-critical sections
const ProjectsGrid = lazy(() =>
  import('./components/ProjectsGrid').then((module) => ({ default: module.ProjectsGrid }))
);
const TechStack = lazy(() =>
  import('./components/TechStack').then((module) => ({ default: module.TechStack }))
);
const ActivityFeed = lazy(() =>
  import('./components/ActivityFeed').then((module) => ({ default: module.ActivityFeed }))
);

// Loading fallback component
const SectionLoader = () => (
  <div className="w-full h-96 flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-[var(--nav-text)] border-t-[var(--accent-primary)] animate-spin"></div>
  </div>
);

function App() {
  return (
    <LazyMotion features={domAnimation}>
      <MainLayout>
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <ProjectsGrid />
          <TechStack />
          <ActivityFeed />
        </Suspense>
      </MainLayout>
    </LazyMotion>
  );
}

export default App;
