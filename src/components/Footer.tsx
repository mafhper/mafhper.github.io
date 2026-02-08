import React from 'react';
import { useTranslation } from 'react-i18next';
import { Github, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/mafhper', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com/mafhper', label: 'X (Twitter)' }
  ];

  return (
    <footer className="py-12 px-6 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] relative overflow-hidden mt-auto">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand & Tagline */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <img src="/logo.svg" alt="mafhper logo" className="w-8 h-8" />
            <span className="font-bold text-lg tracking-tight">@mafhper</span>
          </div>
          <p className="text-[var(--text-muted)] text-sm max-w-xs">
            {t('footer.tagline', 'Building the future, one pixel at a time.')}
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:-translate-y-1 transition-all duration-300"
                aria-label={link.label}
              >
                <Icon size={24} />
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right text-xs text-[var(--text-muted)]">
          <p>&copy; {currentYear} @mafhper.</p>
          <p>{t('footer.rights', 'All rights reserved.')}</p>
        </div>
      </div>
    </footer>
  );
};
