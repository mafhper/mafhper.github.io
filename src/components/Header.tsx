import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Globe, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
  { code: 'pt-BR', label: 'PT' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' }
];

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  // Lazy initialize theme from localStorage
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
        return saved;
      }
    }
    document.documentElement.removeAttribute('data-theme');
    return 'system';
  });

  const [isLangOpen, setIsLangOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsLangOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[var(--bg-primary)]/90 border-b border-[var(--border-subtle)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img src="/logo.svg" alt="mafhper" className="h-9 w-9" />
        </button>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {['projects', 'techStack', 'activity'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-[10px] font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors uppercase tracking-[0.2em]"
            >
              {t(`nav.${item}`)}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/mafhper"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md hover:bg-[var(--bg-card)] transition-colors"
            aria-label="GitHub Profile"
          >
            <Github size={20} />
          </a>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="p-2 rounded-md hover:bg-[var(--bg-card)] transition-colors flex items-center gap-2"
              aria-label="Change Language"
            >
              <Globe size={20} />
              <span className="text-sm font-medium uppercase">{i18n.language.split('-')[0]}</span>
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-32 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg shadow-lg overflow-hidden"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-[var(--bg-secondary)] transition-colors ${
                        i18n.language === lang.code ? 'text-[var(--color-brand)] font-bold' : ''
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-[var(--bg-card)] transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};
