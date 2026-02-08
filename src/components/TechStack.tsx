import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout, Server, Cpu, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const technologies = [
  {
    name: 'Frontend',
    icon: Layout,
    items: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
    color: 'var(--color-emerald)'
  },
  {
    name: 'Backend',
    icon: Server,
    items: ['Node.js', 'Express', 'PostgreSQL', 'Redis'],
    color: 'var(--color-sage)'
  },
  {
    name: 'Systems',
    icon: Cpu,
    items: ['Rust', 'IoT', 'Embedded C'],
    color: 'var(--color-lime-cream)'
  },
  {
    name: 'Tools',
    icon: Layers,
    items: ['Docker', 'Git', 'Linux', 'Vite'],
    color: 'var(--color-emerald)'
  }
];

export const TechStack: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="techStack" className="py-20 px-6 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 flex items-center gap-4"
        >
          <span className="w-10 h-1 bg-[var(--accent-secondary)] rounded-full"></span>
          {t('techStack.title', 'Tech Stack')}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)] transition-all duration-300 h-full flex flex-col"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `color-mix(in srgb, ${tech.color} 20%, transparent)` }}
                >
                  <Icon size={28} style={{ color: tech.color }} />
                </div>

                <h3 className="text-lg font-bold mb-4">{tech.name}</h3>

                <ul className="space-y-3 mb-6 flex-grow">
                  {tech.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-[var(--text-secondary)] text-sm"
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: tech.color }}
                      ></span>
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
