import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Star } from 'lucide-react';
import { projects } from '../data/projects';

export const ProjectsGrid: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-4 text-balance">
              <span className="w-10 h-1 bg-[var(--accent-primary)] rounded-full"></span>
              {t('projects.title')}
            </h2>
            <p className="mt-5 max-w-2xl text-base md:text-lg leading-8 text-[var(--text-secondary)] text-pretty">
              {t('projects.intro')}
            </p>
          </div>

          <a
            href="https://github.com/mafhper?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-2 text-[var(--accent-primary)] hover:text-[var(--accent-highlight)] font-semibold transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
          >
            {t('projects.viewAll')} <ArrowUpRight size={18} />
          </a>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.demoUrl || `https://github.com/mafhper/${project.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/50 p-3 transition-colors duration-300 hover:border-[var(--accent-primary)] hover:bg-[var(--bg-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
            >
              {/* Color swatch + logo — a compact echo of the hero card */}
              <div
                className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-lg"
                style={{
                  background: `linear-gradient(135deg, ${project.surfaceFrom ?? `${project.color}40`} 0%, ${project.surfaceTo ?? project.color} 100%)`
                }}
              >
                {project.logoUrl ? (
                  <img
                    src={project.logoUrl}
                    alt=""
                    className="h-7 w-auto max-w-[2.25rem] object-contain drop-shadow transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <span className="text-sm font-bold text-white/40">
                    {project.name.substring(0, 2).toUpperCase()}
                  </span>
                )}
              </div>

              {/* Meta */}
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <h3 className="truncate font-semibold text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-primary)]">
                    {project.name}
                  </h3>
                  {project.stars > 0 && (
                    <span className="flex shrink-0 items-center gap-1 text-[11px] text-[var(--text-muted)]">
                      <Star size={11} className="fill-current" />
                      {project.stars}
                    </span>
                  )}
                </div>
                <p className="truncate text-xs text-[var(--text-secondary)]">
                  {t(project.descriptionKey, project.name)}
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-[var(--bg-secondary)] px-2 py-0.5 text-[10px] font-medium text-[var(--text-muted)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <ArrowUpRight
                size={18}
                className="shrink-0 self-center text-[var(--text-muted)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent-primary)]"
              />
            </a>
          ))}
        </div>

        <div className="mt-14 text-center lg:hidden">
          <a
            href="https://github.com/mafhper?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[var(--accent-primary)] hover:text-[var(--accent-highlight)] font-semibold transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
          >
            {t('projects.viewAll')} <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};
