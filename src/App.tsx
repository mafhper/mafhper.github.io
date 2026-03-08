import { Suspense, lazy, useEffect, useRef, useState, type ReactNode } from 'react';
import { MainLayout } from './layouts/MainLayout';
import { Hero } from './components/Hero';

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

const DeferredSection = ({
  children,
  sectionId,
  minHeight,
  rootMargin = '240px'
}: {
  children: ReactNode;
  sectionId: string;
  minHeight: number;
  rootMargin?: string;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return (
    <div ref={ref} id={sectionId} className="scroll-mt-24">
      {isVisible ? (
        <Suspense fallback={<SectionLoader />}>{children}</Suspense>
      ) : (
        <div style={{ minHeight }} aria-hidden="true" />
      )}
    </div>
  );
};

function App() {
  return (
    <MainLayout>
      <Hero />
      <DeferredSection sectionId="projects" minHeight={920}>
        <ProjectsGrid />
      </DeferredSection>
      <DeferredSection sectionId="techStack" minHeight={760}>
        <TechStack />
      </DeferredSection>
      <DeferredSection sectionId="activity" minHeight={900}>
        <ActivityFeed />
      </DeferredSection>
    </MainLayout>
  );
}

export default App;
