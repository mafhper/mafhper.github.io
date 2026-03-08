import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.demoUrl || `https://github.com/mafhper/${project.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
            >
              {/* Project Visual Banner */}
              <div
                className="h-36 relative overflow-hidden flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${project.surfaceFrom ?? `${project.color}40`} 0%, ${project.surfaceTo ?? project.color} 100%)`
                }}
              >
                {project.logoUrl ? (
                  <div
                    className="flex h-20 items-center justify-center"
                    style={{
                      transform: `scale(${project.gridLogoScale ?? 1})`,
                      transformOrigin: 'center'
                    }}
                  >
                    <img
                      src={project.logoUrl}
                      alt={project.name}
                      className="block h-14 w-auto max-w-[5.5rem] object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="text-white/30 text-6xl font-bold">
                    {project.name.substring(0, 2).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="p-6">
                {/* Header */}
                <div className="flex justify-end items-start mb-3">
                  <ArrowUpRight
                    size={22}
                    className="text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--accent-primary)] transition-colors">
                  {project.name}
                </h3>

                {/* Description */}
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6 line-clamp-2 min-h-[2.5rem]">
                  {t(project.descriptionKey, project.name + ' - Open source project')}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1.5 rounded-full bg-[var(--bg-secondary)] text-[var(--text-muted)] font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
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
