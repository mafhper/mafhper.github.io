import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Globe, Github } from 'lucide-react';
import { loadLanguage } from '../i18n';

const languages = [
  { code: 'pt-BR', label: 'PT' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' }
];

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  const saved = window.localStorage.getItem('theme') as 'light' | 'dark' | null;
  return saved ?? 'dark';
};

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);
  const [isLangOpen, setIsLangOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const changeLanguage = async (langCode: string) => {
    await loadLanguage(langCode);
    setIsLangOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[var(--bg-primary)]/90 border-b border-[var(--border-subtle)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#top"
          className="flex items-center cursor-pointer rounded-full hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
          aria-label={t('brand')}
        >
          <img src="/logo.svg" alt="mafhper" className="h-9 w-9" />
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {['projects', 'techStack', 'activity'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-[10px] font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors uppercase tracking-[0.2em] rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
            >
              {t(`nav.${item}`)}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/mafhper"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md hover:bg-[var(--bg-card)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
            aria-label="GitHub Profile"
          >
            <Github size={20} />
          </a>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="p-2 rounded-md hover:bg-[var(--bg-card)] transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
              aria-label="Change Language"
              aria-expanded={isLangOpen}
              aria-haspopup="menu"
            >
              <Globe size={20} />
              <span className="text-sm font-medium uppercase">
                {(i18n.resolvedLanguage || i18n.language).split('-')[0]}
              </span>
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg shadow-lg overflow-hidden">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => void changeLanguage(lang.code)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-[var(--bg-secondary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--accent-primary)] ${
                      i18n.resolvedLanguage === lang.code
                        ? 'text-[var(--color-brand)] font-bold'
                        : ''
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-[var(--bg-card)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};
