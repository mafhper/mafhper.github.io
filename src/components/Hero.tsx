import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { m, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { projects as featuredProjects } from '../data/projects';
import { useFirstPaintGate } from '../hooks/useFirstPaintGate';
import { ProjectCardStatic } from './ProjectCardStatic';
import { ProjectCardAnimated } from './ProjectCardAnimated';

export const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const motionReady = useFirstPaintGate();

  // Detect if user prefers reduced motion or is on mobile
  const reduceMotion =
    typeof window !== 'undefined' &&
    (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768);

  useEffect(() => {
    // Only start rotating projects after first paint to save resources
    if (!motionReady) return;

    const timer = setInterval(() => {
      setCurrentProjectIndex((prev) => (prev + 1) % featuredProjects.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [motionReady]);

  const currentProject = featuredProjects[currentProjectIndex];

  return (
    <section className="relative w-full flex-grow flex flex-col items-center justify-center px-6 py-24 min-h-[90vh]">
      {/* Immersive Background Transition - Conditional Rendering */}
      {motionReady && !reduceMotion ? (
        <AnimatePresence mode="popLayout">
          <m.div
            key={currentProject.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 pointer-events-none overflow-hidden"
          >
            {/* Primary radial gradient */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse 80% 70% at 70% 40%, ${currentProject.color}50 0%, transparent 70%)`
              }}
            />
            {/* Secondary subtle glow */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 30% 80%, ${currentProject.color}20 0%, transparent 50%)`
              }}
            />
          </m.div>
        </AnimatePresence>
      ) : (
        /* Static Background for First Paint / Mobile */
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 80% 70% at 70% 40%, ${currentProject.color}50 0%, transparent 70%)`
            }}
          />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 lg:gap-32 w-full">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left z-20">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Greeting */}
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-6 font-light">
              {t('hero.greeting')}{' '}
              <span className="font-semibold text-[var(--text-primary)]">Matheus Pereira</span>
            </p>

            {/* Avatar & Title Group */}
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-6 mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-brand)] to-[var(--text-secondary)] p-0.5 transition-transform duration-500 hover:scale-105 shrink-0 shadow-lg shadow-[var(--color-brand)]/20">
                <img
                  src="https://github.com/mafhper.png"
                  alt="@mafhper"
                  width="96"
                  height="96"
                  fetchPriority="high"
                  className="w-full h-full rounded-full object-cover bg-[var(--bg-primary)]"
                />
              </div>

              <h1 className="text-6xl sm:text-7xl font-bold tracking-tighter leading-[0.9]">
                <span className="bg-gradient-to-r from-[var(--text-primary)] via-[var(--color-brand)] to-[var(--text-muted)] bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                  @mafhper
                </span>
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-[var(--text-secondary)] mb-10 leading-relaxed max-w-lg font-light">
              {t('hero.tagline')}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <m.a
                href="https://github.com/mafhper"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-[var(--accent-primary)]/20"
              >
                GitHub <ArrowRight size={22} />
              </m.a>
            </div>
          </m.div>
        </div>

        {/* Dynamic Project Showcase Card */}
        <div className="flex-1 w-full max-w-2xl perspective-2000 z-10 relative">
          {motionReady && !reduceMotion ? (
            <ProjectCardAnimated currentProject={currentProject} />
          ) : (
            <ProjectCardStatic currentProject={currentProject} />
          )}
        </div>
      </div>
    </section>
  );
};
