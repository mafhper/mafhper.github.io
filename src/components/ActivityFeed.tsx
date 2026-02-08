import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: {
    name: string;
    url: string;
  };
  payload: {
    commits?: Array<{ message: string }>;
    action?: string;
  };
}

export const ActivityFeed: React.FC = () => {
  const { t } = useTranslation();
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/mafhper/events/public?per_page=7')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEvents(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch GitHub activity', err);
        setLoading(false);
      });
  }, []);

  /* Icons cleaned up as they are not used in the terminal view */

  const getActionType = (type: string, payload: GitHubEvent['payload']) => {
    switch (type) {
      case 'PushEvent':
        return 'Pushed to';
      case 'WatchEvent':
        return 'Starred';
      case 'CreateEvent':
        return 'Created';
      case 'ForkEvent':
        return 'Forked';
      case 'PullRequestEvent':
        return payload.action === 'opened' ? 'Opened PR' : 'Merged PR';
      case 'IssuesEvent':
        return payload.action === 'opened' ? 'Opened issue' : 'Closed issue';
      default:
        // Check for specific payload indicators if type is generic
        if (payload?.commits) return 'Pushed to';
        return type.replace('Event', '');
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) return null; // Skeletons could be better but null is cleaner for now
  if (events.length === 0) return null;

  return (
    <section id="activity" className="py-32 px-6 md:px-0 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 px-6"
      >
        <h2 className="text-3xl font-bold flex items-center gap-4 text-[var(--text-primary)]">
          <span className="w-10 h-1 bg-[var(--accent-primary)] rounded-full"></span>
          {t('activity.title')}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:mx-6">
        {/* Main Activity Terminal (3 columns) */}
        {/* Main Activity Terminal (3 columns) */}
        <div className="lg:col-span-3 bg-[#0d1117] rounded-xl overflow-hidden border border-[#30363d] shadow-2xl ring-1 ring-white/10 font-mono text-sm flex flex-col h-[500px]">
          {/* Header */}
          {/* Header */}
          <div className="bg-[#161b22] px-4 py-3 border-b border-[#30363d] flex items-center justify-between gap-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff6a69] border border-[#ff6a69]/50"></div>
              <div className="w-3 h-3 rounded-full bg-[#e3b341] border border-[#e3b341]/50"></div>
              <div className="w-3 h-3 rounded-full bg-[#2da44e] border border-[#2da44e]/50"></div>
            </div>
            <div className="text-[#8b949e] text-[10px] uppercase tracking-widest font-semibold flex items-center gap-2">
              zsh — activity_log.sh
            </div>
            <div className="w-12"></div>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto flex-1 bg-[#0d1117] text-[#c9d1d9] custom-scrollbar">
            <div className="space-y-1">
              <div className="flex gap-3 mb-6">
                <div className="text-[#8b949e] text-right select-none w-6 shrink-0">1</div>
                <div className="flex gap-2 font-semibold">
                  <span className="text-[#2da44e]">➜</span>
                  <span className="text-[#58a6ff]">~</span>
                  <span className="text-[#e6edf3]">tail</span>
                  <span className="text-[#c9d1d9]">-f</span>
                  <span className="text-[#e6edf3]">/dev/activity</span>
                </div>
              </div>

              {events.map((event, index) => {
                const action = getActionType(event.type, event.payload);
                const repoName = event.repo.name.replace('mafhper/', '');
                const time = getTimeAgo(event.created_at);
                const keywordColor = '#ff7b72'; // Red (Colorblind friendly)
                const stringColor = '#a5d6ff'; // Light Blue
                const commentColor = '#8b949e'; // Grey

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -5 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex gap-3 hover:bg-[#161b22] -mx-4 px-4 py-0.5 transition-colors group"
                  >
                    <div className="text-[#8b949e] text-right select-none w-6 shrink-0 group-hover:text-[#c9d1d9]">
                      {index + 2}
                    </div>
                    <div className="flex flex-wrap gap-x-3 items-baseline">
                      <span className="text-[#58a6ff] min-w-[75px]">
                        [{time.replace(' ago', '')}]
                      </span>
                      <span style={{ color: keywordColor }}>
                        {action.toLowerCase().replace(' ', '_')}
                      </span>
                      <a
                        href={`https://github.com/${event.repo.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: stringColor }}
                        className="hover:underline underline-offset-2"
                      >
                        "{repoName}"
                      </a>
                      {event.payload.commits && (
                        <span
                          style={{ color: commentColor }}
                          className="truncate max-w-[200px] md:max-w-md hidden sm:inline-block"
                        >
                          # {event.payload.commits[0]?.message}
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              <div className="flex gap-3 mt-2">
                <div className="text-[#6e7681] text-right select-none w-6 shrink-0">
                  {events.length + 2}
                </div>
                <div className="w-2.5 h-5 bg-[#58a6ff]/50 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panels (1 column) */}
        <div className="flex flex-col gap-6">
          {/* Git Status Pane */}
          <div className="bg-[#0d1117] rounded-xl border border-[#30363d] shadow-xl p-5 font-mono text-xs ring-1 ring-white/5">
            <div className="flex items-center justify-between mb-4 border-b border-[#30363d] pb-2">
              <span className="text-[#8b949e] uppercase tracking-tighter font-bold">
                Git Status
              </span>
              <div className="w-2 h-2 rounded-full bg-[#2da44e]"></div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#8b949e]">On branch</span>
                <span className="text-[#58a6ff]">main</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8b949e]">Origin</span>
                <span className="text-[#e3b341]">up to date</span>
              </div>
              <div className="pt-2">
                <div className="text-[#2da44e] mb-1">nothing to commit, working tree clean</div>
                <div className="text-[#6e7681] text-[10px] leading-relaxed italic">
                  Last check:{' '}
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>

          {/* System Environment Pane */}
          <div className="bg-[#0d1117] rounded-xl border border-[#30363d] shadow-xl p-5 font-mono text-xs ring-1 ring-white/5 flex-grow">
            <div className="flex items-center justify-between mb-4 border-b border-[#30363d] pb-2">
              <span className="text-[#8b949e] uppercase tracking-tighter font-bold">Env Info</span>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-[#8b949e] mb-1">Infrastructure</div>
                <div className="text-[#e6edf3] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d2a8ff] animate-pulse"></div>
                  GitHub Pages
                </div>
              </div>
              <div>
                <div className="text-[#8b949e] mb-1">Architecture</div>
                <div className="text-[#58a6ff]">React v19 + Vite</div>
              </div>
              <div>
                <div className="text-[#8b949e] mb-1">Active Projects</div>
                <div className="flex gap-1 flex-wrap mt-1">
                  {['aurawall', 'spread', 'fremit'].map((p) => (
                    <span
                      key={p}
                      className="px-1.5 py-0.5 bg-[#21262d] rounded text-[9px] text-[#c9d1d9] border border-[#30363d]"
                    >
                      /{p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
