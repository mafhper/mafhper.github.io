import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { projects } from '../data/projects';

export const ProjectsGrid: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold flex items-center gap-4">
            <span className="w-10 h-1 bg-[var(--accent-primary)] rounded-full"></span>
            {t('projects.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.demoUrl || `https://github.com/mafhper/${project.id}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group block rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
            >
              {/* Project Visual Banner */}
              <div
                className="h-36 relative overflow-hidden flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${project.color}40 0%, ${project.color} 100%)`
                }}
              >
                {project.logoUrl ? (
                  <img
                    src={project.logoUrl}
                    alt={project.name}
                    className="w-16 h-16 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                  />
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
            </motion.a>
          ))}

          {/* Coming Soon Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl bg-[var(--bg-card)] border border-dashed border-[var(--border-subtle)] p-8 flex flex-col items-center justify-center text-center min-h-[280px]"
          >
            <Sparkles size={32} className="text-[var(--accent-primary)] mb-4" />
            <h3 className="text-lg font-bold mb-3 text-[var(--text-primary)]">
              {t('projects.comingSoon')}
            </h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-xs">
              {t('projects.comingSoonDesc')}
            </p>
          </motion.div>
        </div>

        <div className="mt-14 text-center">
          <a
            href="https://github.com/mafhper?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[var(--accent-primary)] hover:text-[var(--accent-highlight)] font-semibold transition-colors"
          >
            {t('projects.viewAll')} <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};
