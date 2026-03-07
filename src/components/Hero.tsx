import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { m, AnimatePresence } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';
import { projects as featuredProjects } from '../data/projects';
import { useFirstPaintGate } from '../hooks/useFirstPaintGate';
import { ProjectCardStatic } from './ProjectCardStatic';
import { ProjectCardAnimated } from './ProjectCardAnimated';

export const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const motionReady = useFirstPaintGate();

  const reduceMotion =
    typeof window !== 'undefined' &&
    (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768);

  useEffect(() => {
    if (!motionReady) return;

    const timer = setInterval(() => {
      setCurrentProjectIndex((prev) => (prev + 1) % featuredProjects.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [motionReady]);

  const currentProject = featuredProjects[currentProjectIndex];

  return (
    <section className="relative w-full px-6 pt-12 pb-24 min-h-[calc(100vh-4rem)] flex items-center">
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
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse 80% 70% at 70% 40%, ${currentProject.color}50 0%, transparent 70%)`
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 22% 24%, ${currentProject.color}20 0%, transparent 36%)`
              }}
            />
          </m.div>
        </AnimatePresence>
      ) : (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 80% 70% at 70% 40%, ${currentProject.color}50 0%, transparent 70%)`
            }}
          />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto w-full grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)] items-center">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)]/75 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-secondary)] backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[var(--color-brand)] shadow-[0_0_0_6px_rgba(0,248,8,0.08)]"></span>
            {t('hero.kicker')}
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-brand)] to-[var(--text-secondary)] p-[2px] shrink-0 shadow-lg shadow-[var(--color-brand)]/20">
              <img
                src="https://github.com/mafhper.png"
                alt="@mafhper"
                width="64"
                height="64"
                fetchPriority="high"
                className="w-full h-full rounded-full object-cover bg-[var(--bg-primary)]"
              />
            </div>
            <p className="text-sm md:text-base text-[var(--text-secondary)]">
              {t('hero.greeting')}{' '}
              <span className="font-semibold text-[var(--text-primary)]">Matheus Pereira</span>
            </p>
          </div>

          <h1 className="mt-6 text-6xl sm:text-7xl lg:text-8xl font-bold tracking-[-0.06em] leading-[0.92] text-balance">
            <span className="bg-gradient-to-r from-[var(--text-primary)] via-[var(--accent-primary)] to-[var(--text-secondary)] bg-clip-text text-transparent">
              @mafhper
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-2xl md:text-3xl leading-tight text-[var(--text-primary)] text-pretty">
            {t('hero.tagline')}
          </p>

          <p className="mt-5 max-w-xl text-base md:text-lg leading-8 text-[var(--text-secondary)] text-pretty">
            {t('hero.description')}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold text-base hover:-translate-y-0.5 transition-transform shadow-lg shadow-[var(--accent-primary)]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
            >
              {t('hero.primaryCta')} <ArrowRight size={20} />
            </a>

            <a
              href="https://github.com/mafhper"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)]/70 text-[var(--text-primary)] font-semibold hover:border-[var(--accent-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
            >
              <Github size={18} />
              {t('hero.secondaryCta')}
            </a>
          </div>
        </m.div>

        <div className="w-full lg:justify-self-end">
          <div className="flex flex-col gap-4">
            <div className="w-full max-w-2xl perspective-2000 relative">
              {motionReady && !reduceMotion ? (
                <ProjectCardAnimated currentProject={currentProject} />
              ) : (
                <ProjectCardStatic currentProject={currentProject} />
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/70 p-5 backdrop-blur">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {t('hero.featuredNow')}
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-[var(--text-primary)]">
                  {currentProject.name}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                  {t(currentProject.descriptionKey)}
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/70 p-5 backdrop-blur">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {t('hero.stackLabel')}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {currentProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-[var(--bg-primary)]/80 px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
