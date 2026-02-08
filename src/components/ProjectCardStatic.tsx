import React from 'react';
import { Project } from '../data/projects';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

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
      {/* Background Image - Using standard img for LCP priority */}
      {currentProject.previewUrl ? (
        <img
          src={currentProject.previewUrl}
          alt={currentProject.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          fetchPriority="high"
          loading="eager"
        />
      ) : (
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: `linear-gradient(135deg, ${currentProject.color} 0%, ${currentProject.color}aa 90%)`
          }}
        />
      )}

      {/* Fallback pattern if no preview */}
      {!currentProject.previewUrl && (
        <>
          <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat mix-blend-overlay"></div>

          <div className="absolute inset-0 flex items-center justify-center p-20">
            {currentProject.logoUrl ? (
              <img
                src={currentProject.logoUrl}
                alt={currentProject.name}
                width="128"
                height="128"
                className="w-32 h-32 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="text-white/30 font-mono text-sm uppercase tracking-widest border border-dashed border-white/30 px-6 py-4 rounded">
                [Project: {currentProject.name}]
              </div>
            )}
          </div>

          <div className="absolute -bottom-16 -right-16 text-black/10 font-black text-[14rem] leading-none select-none tracking-tighter -z-10">
            {currentProject.name.substring(0, 2).toUpperCase()}
          </div>
        </>
      )}

      {/* Gradient Overlay */}
      {currentProject.previewUrl && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      )}

      {/* Glass Panel */}
      <div className="absolute inset-x-4 bottom-4 glass-panel rounded-xl p-6 flex flex-col justify-between backdrop-blur-xl bg-white/5 border-white/10 group-hover:translate-y-0 transition-all duration-300">
        <div>
          <div className="flex items-center gap-3 mb-1">
            {currentProject.logoUrl && currentProject.previewUrl && (
              <img src={currentProject.logoUrl} alt="" className="w-5 h-5 object-contain" />
            )}
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 block">
              Featured Project
            </span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">{currentProject.name}</h2>
        </div>
        <div className="flex items-center gap-4 text-white/90 text-sm mt-4 font-medium pointer-events-auto">
          <a
            href={`https://github.com/mafhper/${currentProject.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-[var(--accent-primary)] transition-colors"
          >
            View source{' '}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>

          {currentProject.demoUrl && (
            <>
              <span className="w-1 h-1 rounded-full bg-white/30"></span>
              <a
                href={currentProject.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-[var(--accent-primary)] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Live Demo{' '}
                <ArrowUpRight
                  size={14}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
