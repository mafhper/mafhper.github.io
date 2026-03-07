import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout, Server, Cpu, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const technologies = [
  {
    key: 'frontend',
    icon: Layout,
    items: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
    color: 'var(--color-emerald)'
  },
  {
    key: 'backend',
    icon: Server,
    items: ['Node.js', 'Express', 'PostgreSQL', 'Redis'],
    color: 'var(--color-sage)'
  },
  {
    key: 'systems',
    icon: Cpu,
    items: ['Rust', 'IoT', 'Embedded C'],
    color: 'var(--color-lime-cream)'
  },
  {
    key: 'tools',
    icon: Layers,
    items: ['Docker', 'Git', 'Linux', 'Vite'],
    color: 'var(--color-emerald)'
  }
];

export const TechStack: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="techStack" className="scroll-mt-24 py-24 px-6 bg-[var(--bg-secondary)]/55">
      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[2rem] border border-[var(--border-subtle)] bg-[var(--bg-card)]/75 p-8 md:p-10 backdrop-blur"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)]/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            <span className="h-2 w-2 rounded-full bg-[var(--accent-secondary)]"></span>
            {t('techStack.eyebrow')}
          </div>

          <h2 className="mt-6 text-3xl md:text-4xl font-bold text-balance">
            {t('techStack.title')}
          </h2>
          <p className="mt-5 text-base md:text-lg leading-8 text-[var(--text-secondary)] text-pretty">
            {t('techStack.description')}
          </p>

          <div className="mt-8 border-t border-[var(--border-subtle)] pt-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
              {t('techStack.introTitle')}
            </p>
            <p className="mt-3 text-sm md:text-base leading-7 text-[var(--text-secondary)] text-pretty">
              {t('techStack.introText')}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[1.75rem] border border-[var(--border-subtle)] bg-[var(--bg-card)]/80 p-6 md:p-7 backdrop-blur"
              >
                <div className="flex items-start justify-between gap-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${tech.color} 18%, transparent)`
                    }}
                  >
                    <Icon size={28} style={{ color: tech.color }} />
                  </div>
                  <span className="rounded-full border border-[var(--border-subtle)] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    {t(`techStack.areas.${tech.key}.label`)}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-semibold text-[var(--text-primary)]">
                  {t(`techStack.areas.${tech.key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)] text-pretty">
                  {t(`techStack.areas.${tech.key}.summary`)}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {tech.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-[var(--bg-primary)]/80 px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
