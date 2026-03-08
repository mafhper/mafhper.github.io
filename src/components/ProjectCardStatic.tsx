import React from 'react';
import { Project } from '../data/projects';

interface ProjectCardProps {
  currentProject: Project;
}

export const ProjectCardStatic: React.FC<ProjectCardProps> = ({ currentProject }) => {
  return (
    <div
      className="block relative aspect-[16/10] rounded-2xl shadow-2xl group bg-[var(--bg-card)] border border-white/10 overflow-hidden"
      style={{
        boxShadow: `0 40px 80px -20px ${currentProject.color}40`
      }}
    >
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `linear-gradient(135deg, ${currentProject.surfaceFrom ?? currentProject.color} 0%, ${currentProject.surfaceTo ?? `${currentProject.color}aa`} 100%)`
        }}
      />

      <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat mix-blend-overlay"></div>

      <div className="absolute inset-0 flex items-center justify-center px-16 pt-10 pb-16 sm:px-20">
        {currentProject.logoUrl ? (
          <div
            style={{
              transform: `scale(${currentProject.featuredLogoScale ?? 1})`,
              transformOrigin: 'center'
            }}
          >
            <img
              src={currentProject.logoUrl}
              alt={currentProject.name}
              width="128"
              height="128"
              className="block h-32 w-auto max-w-[10rem] object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 sm:h-36 sm:max-w-[11rem]"
            />
          </div>
        ) : (
          <div className="text-white/30 font-mono text-sm uppercase tracking-widest border border-dashed border-white/30 px-6 py-4 rounded">
            [Project: {currentProject.name}]
          </div>
        )}
      </div>

      <div className="absolute -bottom-16 -right-16 text-black/10 font-black text-[14rem] leading-none select-none tracking-tighter -z-10">
        {currentProject.name.substring(0, 2).toUpperCase()}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-black/6 to-transparent"></div>
    </div>
  );
};
