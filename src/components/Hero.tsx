import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Github } from 'lucide-react';
import { projects as featuredProjects } from '../data/projects';
import { ProjectCardStatic } from './ProjectCardStatic';

export const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentProjectIndex((prev) => (prev + 1) % featuredProjects.length);
    }, 8000);

    return () => clearTimeout(timer);
  }, [currentProjectIndex]);

  const currentProject = featuredProjects[currentProjectIndex];
  const totalProjects = featuredProjects.length;

  const goToPreviousProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  };

  const goToNextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % totalProjects);
  };

  const selectProject = (index: number) => {
    setCurrentProjectIndex(index);
  };

  return (
    <section className="relative w-full px-6 pt-12 pb-24 min-h-[calc(100vh-4rem)] flex items-center">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background: `radial-gradient(ellipse 80% 70% at 70% 40%, ${currentProject.color}50 0%, transparent 70%)`
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle at 22% 24%, ${currentProject.color}20 0%, transparent 36%)`
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)] items-center">
        <div className="max-w-2xl">
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
        </div>

        <div className="w-full lg:justify-self-end">
          <div className="flex flex-col gap-4">
            <div className="w-full max-w-2xl perspective-2000 relative overflow-visible">
              <ProjectCardStatic currentProject={currentProject} />
              <button
                type="button"
                onClick={goToPreviousProject}
                aria-label={t('hero.previousProject')}
                className="absolute -left-5 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)]/58 text-[var(--text-muted)] shadow-[0_10px_24px_rgba(0,0,0,0.18)] backdrop-blur-md transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] sm:-left-6"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                type="button"
                onClick={goToNextProject}
                aria-label={t('hero.nextProject')}
                className="absolute -right-5 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)]/58 text-[var(--text-muted)] shadow-[0_10px_24px_rgba(0,0,0,0.18)] backdrop-blur-md transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] sm:-right-6"
              >
                <ChevronRight size={16} />
              </button>

              <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center">
                <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-[var(--bg-primary)]/18 px-2.5 py-1.5 backdrop-blur-[2px]">
                  {featuredProjects.map((project, index) => {
                    const isActive = index === currentProjectIndex;

                    return (
                      <button
                        key={project.id}
                        type="button"
                        onClick={() => selectProject(index)}
                        aria-label={t('hero.carouselSelect', { name: project.name })}
                        aria-pressed={isActive}
                        className={`h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] ${
                          isActive
                            ? 'w-5 bg-[var(--accent-primary)]'
                            : 'w-1.5 bg-white/22 hover:bg-white/40'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
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
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium">
                  <a
                    href={`https://github.com/mafhper/${currentProject.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[var(--text-primary)] transition-colors hover:text-[var(--accent-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
                  >
                    {t('projects.viewSource')}
                    <ArrowRight size={14} />
                  </a>

                  {currentProject.demoUrl && (
                    <a
                      href={currentProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[var(--text-primary)] transition-colors hover:text-[var(--accent-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
                    >
                      {t('projects.liveDemo')}
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
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
