import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';

interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: {
    name: string;
  };
  payload: {
    commits?: Array<{ message: string }>;
    action?: string;
  };
}

const runtimeItems = [
  { labelKey: 'infra', value: 'GitHub Pages' },
  { labelKey: 'ui', value: 'React 19 + Vite 7' },
  { labelKey: 'packageManager', value: 'Bun 1.3' }
] as const;

const featuredRepos = projects.slice(-3).reverse();

export const ActivityFeed: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch('https://api.github.com/users/mafhper/events/public?per_page=7', {
      signal: controller.signal
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEvents(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.error('Failed to fetch GitHub activity', err);
          setError(true);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  const relativeTime = useMemo(
    () =>
      new Intl.RelativeTimeFormat(
        i18n.resolvedLanguage === 'pt' ? 'pt-BR' : i18n.resolvedLanguage,
        {
          numeric: 'auto'
        }
      ),
    [i18n.resolvedLanguage]
  );

  const getActionType = (type: string, payload: GitHubEvent['payload']) => {
    switch (type) {
      case 'PushEvent':
        return t('activity.actions.push');
      case 'WatchEvent':
        return t('activity.actions.watch');
      case 'CreateEvent':
        return t('activity.actions.create');
      case 'ForkEvent':
        return t('activity.actions.fork');
      case 'PullRequestEvent':
        return payload.action === 'opened'
          ? t('activity.actions.pullRequestOpened')
          : t('activity.actions.pullRequestMerged');
      case 'IssuesEvent':
        return payload.action === 'opened'
          ? t('activity.actions.issueOpened')
          : t('activity.actions.issueClosed');
      default:
        return t('activity.actions.updated');
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);

    if (Math.abs(diffInSeconds) < 60) return t('activity.now');
    if (Math.abs(diffInSeconds) < 3600)
      return relativeTime.format(Math.round(diffInSeconds / 60), 'minute');
    if (Math.abs(diffInSeconds) < 86400)
      return relativeTime.format(Math.round(diffInSeconds / 3600), 'hour');
    if (Math.abs(diffInSeconds) < 604800)
      return relativeTime.format(Math.round(diffInSeconds / 86400), 'day');

    return new Intl.DateTimeFormat(
      i18n.resolvedLanguage === 'pt' ? 'pt-BR' : i18n.resolvedLanguage,
      {
        day: '2-digit',
        month: 'short'
      }
    ).format(date);
  };

  return (
    <section id="activity" className="scroll-mt-24 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.75fr)] lg:items-end"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-4 text-[var(--text-primary)] text-balance">
              <span className="w-10 h-1 bg-[var(--accent-primary)] rounded-full"></span>
              {t('activity.title')}
            </h2>
            <p className="mt-5 max-w-2xl text-base md:text-lg leading-8 text-[var(--text-secondary)] text-pretty">
              {t('activity.subtitle')}
            </p>
          </div>

          <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/75 p-6 backdrop-blur">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
              {t('activity.statusTitle')}
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              {t('activity.statusIntro')}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {featuredRepos.map((project) => (
                <a
                  key={project.id}
                  href={project.demoUrl || `https://github.com/mafhper/${project.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)]/80 px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--text-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
                >
                  /{project.id}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 bg-[#0d1117] rounded-[1.75rem] overflow-hidden border border-[#30363d] shadow-2xl ring-1 ring-white/10 font-mono text-sm flex flex-col min-h-[420px]">
            <div className="bg-[#161b22] px-4 py-3 border-b border-[#30363d] flex items-center justify-between gap-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff6a69] border border-[#ff6a69]/50"></div>
                <div className="w-3 h-3 rounded-full bg-[#e3b341] border border-[#e3b341]/50"></div>
                <div className="w-3 h-3 rounded-full bg-[#2da44e] border border-[#2da44e]/50"></div>
              </div>
              <div className="text-[#8b949e] text-[10px] uppercase tracking-widest font-semibold">
                {t('activity.liveLabel')}
              </div>
              <div className="w-12"></div>
            </div>

            <div className="p-6 overflow-y-auto flex-1 bg-[#0d1117] text-[#c9d1d9]">
              {loading ? (
                <div className="flex items-center gap-3 text-[#8b949e]">
                  <div className="w-2.5 h-5 bg-[#58a6ff]/50 animate-pulse"></div>
                  <span>{t('activity.loading')}</span>
                </div>
              ) : error ? (
                <p className="text-[#ff7b72]">{t('activity.error')}</p>
              ) : events.length === 0 ? (
                <p className="text-[#8b949e]">{t('activity.empty')}</p>
              ) : (
                <div className="space-y-1">
                  <div className="flex gap-3 mb-6">
                    <div className="text-[#8b949e] text-right select-none w-6 shrink-0">1</div>
                    <div className="flex gap-2 font-semibold">
                      <span className="text-[#2da44e]">➜</span>
                      <span className="text-[#58a6ff]">~</span>
                      <span className="text-[#e6edf3]">tail</span>
                      <span className="text-[#c9d1d9]">-f</span>
                      <span className="text-[#e6edf3]">github.public.events</span>
                    </div>
                  </div>

                  {events.map((event, index) => {
                    const action = getActionType(event.type, event.payload);
                    const repoName = event.repo.name.replace('mafhper/', '');
                    const time = getTimeAgo(event.created_at);

                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -5 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex gap-3 hover:bg-[#161b22] -mx-4 px-4 py-2 transition-colors group rounded-lg"
                      >
                        <div className="text-[#8b949e] text-right select-none w-6 shrink-0 group-hover:text-[#c9d1d9]">
                          {index + 2}
                        </div>
                        <div className="min-w-0 flex flex-wrap gap-x-3 gap-y-1 items-baseline">
                          <span className="text-[#58a6ff] min-w-[72px]">[{time}]</span>
                          <span className="text-[#ff7b72]">{action}</span>
                          <a
                            href={`https://github.com/${event.repo.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#a5d6ff] hover:underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#58a6ff] rounded-sm"
                          >
                            "{repoName}"
                          </a>
                          {event.payload.commits?.[0]?.message && (
                            <span className="truncate max-w-[240px] md:max-w-xl text-[#8b949e]">
                              # {event.payload.commits[0].message}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-[#0d1117] rounded-[1.5rem] border border-[#30363d] shadow-xl p-5 font-mono text-xs ring-1 ring-white/5">
              <div className="flex items-center justify-between mb-4 border-b border-[#30363d] pb-2">
                <span className="text-[#8b949e] uppercase tracking-[0.16em] font-bold">
                  {t('activity.runtimeTitle')}
                </span>
                <div className="w-2 h-2 rounded-full bg-[#2da44e]"></div>
              </div>
              <p className="mb-4 text-[#8b949e] leading-relaxed">{t('activity.runtimeIntro')}</p>
              <div className="space-y-3">
                {runtimeItems.map((item) => (
                  <div key={item.labelKey} className="flex justify-between gap-4">
                    <span className="text-[#8b949e]">{t(`activity.runtime.${item.labelKey}`)}</span>
                    <span className="text-[#e6edf3] text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0d1117] rounded-[1.5rem] border border-[#30363d] shadow-xl p-5 font-mono text-xs ring-1 ring-white/5 flex-grow">
              <div className="flex items-center justify-between mb-4 border-b border-[#30363d] pb-2">
                <span className="text-[#8b949e] uppercase tracking-[0.16em] font-bold">
                  {t('activity.focusTitle')}
                </span>
              </div>
              <div className="space-y-3">
                {featuredRepos.map((project) => (
                  <a
                    key={project.id}
                    href={project.demoUrl || `https://github.com/mafhper/${project.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-xl border border-[#30363d] bg-[#11161d] px-4 py-3 hover:border-[#58a6ff] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#58a6ff]"
                  >
                    <div className="text-[#e6edf3] font-semibold">{project.name}</div>
                    <div className="mt-1 text-[#8b949e] leading-relaxed">
                      {project.tech.slice(0, 2).join(' • ')}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
