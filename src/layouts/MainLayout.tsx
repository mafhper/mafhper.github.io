import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col font-sans selection:bg-[var(--accent-primary)] selection:text-white">
      <div className="bg-noise"></div>
      <Header />
      <main className="flex-grow flex flex-col pt-16">{children}</main>
      <Footer />
    </div>
  );
};
