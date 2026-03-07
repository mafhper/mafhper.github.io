import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div
      id="top"
      className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col font-sans selection:bg-[var(--accent-primary)] selection:text-white overflow-x-hidden"
    >
      <div className="bg-noise"></div>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-[var(--bg-card)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[var(--text-primary)]"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="flex-grow flex flex-col pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};
