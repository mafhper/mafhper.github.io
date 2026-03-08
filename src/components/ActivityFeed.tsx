import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
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

interface FocusRepo {
  id: string;
  name: string;
  href: string;
  summary: string;
}

const runtimeItems = [
  { labelKey: 'infra', value: 'GitHub Pages' },
  { labelKey: 'ui', value: 'React 19 + Vite 7' },
  { labelKey: 'packageManager', value: 'Bun 1.3' }
] as const;

const MAX_FOCUS_REPOS = 5;
const EVENT_FETCH_LIMIT = 30;
const INITIAL_VISIBLE_EVENTS = 5;
const FOCUS_EVENT_TYPES = new Set([
  'PushEvent',
  'PullRequestEvent',
  'CreateEvent',
  'IssuesEvent',
  'ForkEvent'
]);

export const ActivityFeed: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(false);

  const projectById = useMemo(() => new Map(projects.map((project) => [project.id, project])), []);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://api.github.com/users/mafhper/events/public?per_page=${EVENT_FETCH_LIMIT}`, {
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

  const uniqueRepoCount = useMemo(
    () => new Set(events.map((event) => event.repo.name)).size,
    [events]
  );

  const visibleEvents = useMemo(
    () => (showAllEvents ? events : events.slice(0, INITIAL_VISIBLE_EVENTS)),
    [events, showAllEvents]
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

  const getEventTone = (type: string) => {
    switch (type) {
      case 'PushEvent':
        return {
          label: t('activity.console.eventTypes.push'),
          textClass: 'text-[#ffb08f]',
          dotClass: 'bg-[#ff9b71]',
          borderClass: 'border-[#ff9b71]/15',
          bgClass: 'bg-[#ff9b71]/8'
        };
      case 'PullRequestEvent':
        return {
          label: t('activity.console.eventTypes.pullRequest'),
          textClass: 'text-[#d8b4ff]',
          dotClass: 'bg-[#c297ff]',
          borderClass: 'border-[#c297ff]/15',
          bgClass: 'bg-[#c297ff]/8'
        };
      case 'IssuesEvent':
        return {
          label: t('activity.console.eventTypes.issue'),
          textClass: 'text-[#ffd08a]',
          dotClass: 'bg-[#e3b341]',
          borderClass: 'border-[#e3b341]/15',
          bgClass: 'bg-[#e3b341]/8'
        };
      case 'WatchEvent':
        return {
          label: t('activity.console.eventTypes.watch'),
          textClass: 'text-[#f0d37a]',
          dotClass: 'bg-[#e3b341]',
          borderClass: 'border-[#e3b341]/15',
          bgClass: 'bg-[#e3b341]/8'
        };
      case 'ForkEvent':
        return {
          label: t('activity.console.eventTypes.fork'),
          textClass: 'text-[#97c7ff]',
          dotClass: 'bg-[#79c0ff]',
          borderClass: 'border-[#79c0ff]/15',
          bgClass: 'bg-[#79c0ff]/8'
        };
      case 'CreateEvent':
        return {
          label: t('activity.console.eventTypes.create'),
          textClass: 'text-[#79d28f]',
          dotClass: 'bg-[#3fb950]',
          borderClass: 'border-[#3fb950]/15',
          bgClass: 'bg-[#3fb950]/8'
        };
      default:
        return {
          label: t('activity.console.eventTypes.update'),
          textClass: 'text-[#8b949e]',
          dotClass: 'bg-[#8b949e]',
          borderClass: 'border-[#8b949e]/15',
          bgClass: 'bg-[#8b949e]/8'
        };
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

  const focusRepos = useMemo<FocusRepo[]>(() => {
    const latestUniqueRelevantRepos = events
      .filter((event) => FOCUS_EVENT_TYPES.has(event.type))
      .filter(
        (event, index, list) =>
          list.findIndex((candidate) => candidate.repo.name === event.repo.name) === index
      )
      .slice(0, MAX_FOCUS_REPOS)
      .map((event) => {
        const repoId = event.repo.name.replace('mafhper/', '');
        const project = projectById.get(repoId);
        const commitMessage = event.payload.commits?.[0]?.message;

        return {
          id: repoId,
          name: project?.name ?? repoId,
          href: project?.demoUrl || `https://github.com/${event.repo.name}`,
          summary:
            commitMessage ||
            t(
              event.type === 'PushEvent'
                ? 'activity.focusLatestPush'
                : 'activity.focusLatestActivity',
              { time: getTimeAgo(event.created_at) }
            )
        };
      });

    if (latestUniqueRelevantRepos.length > 0) {
      return latestUniqueRelevantRepos;
    }

    const latestUniqueEventRepos = events
      .filter(
        (event, index, list) =>
          list.findIndex((candidate) => candidate.repo.name === event.repo.name) === index
      )
      .slice(0, MAX_FOCUS_REPOS)
      .map((event) => {
        const repoId = event.repo.name.replace('mafhper/', '');
        const project = projectById.get(repoId);

        return {
          id: repoId,
          name: project?.name ?? repoId,
          href: project?.demoUrl || `https://github.com/${event.repo.name}`,
          summary: t('activity.focusLatestActivity', { time: getTimeAgo(event.created_at) })
        };
      });

    if (latestUniqueEventRepos.length > 0) {
      return latestUniqueEventRepos;
    }

    return projects
      .slice(-MAX_FOCUS_REPOS)
      .reverse()
      .map((project) => ({
        id: project.id,
        name: project.name,
        href: project.demoUrl || `https://github.com/mafhper/${project.id}`,
        summary: project.tech.slice(0, 2).join(' • ')
      }));
  }, [events, getTimeAgo, projectById, t]);

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-4 text-[var(--text-primary)] text-balance">
              <span className="w-10 h-1 bg-[var(--accent-primary)] rounded-full"></span>
              {t('activity.title')}
            </h2>
            <p className="mt-5 max-w-2xl text-base md:text-lg leading-8 text-[var(--text-secondary)] text-pretty">
              {t('activity.subtitle')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:items-start">
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
                <div className="space-y-2">
                  <div className="rounded-xl border border-[#21262d] bg-[#11161d] px-4 py-3 mb-5">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-[#8b949e]">
                      <span>
                        {t('activity.console.captured')} {visibleEvents.length}
                        {!showAllEvents && events.length > visibleEvents.length
                          ? `/${events.length}`
                          : ''}
                      </span>
                      <span>
                        {t('activity.console.uniqueRepos')} {uniqueRepoCount}
                      </span>
                      <span>{t('activity.console.source')}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 mb-4">
                    <div className="text-[#8b949e] text-right select-none w-6 shrink-0">1</div>
                    <div className="flex flex-wrap gap-x-2 gap-y-1 font-semibold">
                      <span className="text-[#2da44e]">➜</span>
                      <span className="text-[#58a6ff]">{t('activity.console.feedLabel')}</span>
                      <span className="text-[#8b949e]">·</span>
                      <span className="text-[#e6edf3]">{t('activity.console.liveWindow')}</span>
                    </div>
                  </div>

                  {visibleEvents.map((event, index) => {
                    const action = getActionType(event.type, event.payload);
                    const repoName = event.repo.name.replace('mafhper/', '');
                    const time = getTimeAgo(event.created_at);
                    const tone = getEventTone(event.type);
                    const commitMessage = event.payload.commits?.[0]?.message;

                    return (
                      <div
                        key={event.id}
                        className="flex gap-3 hover:bg-[#161b22] -mx-4 px-4 py-3 transition-colors group rounded-lg"
                      >
                        <div className="text-[#8b949e] text-right select-none w-6 shrink-0 group-hover:text-[#c9d1d9]">
                          {index + 2}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] leading-6">
                            <span className="min-w-[72px] text-[#8aa9d6]">[{time}]</span>
                            <span
                              className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${tone.textClass} ${tone.borderClass} ${tone.bgClass}`}
                            >
                              <span className={`h-1.5 w-1.5 rounded-full ${tone.dotClass}`}></span>
                              {tone.label}
                            </span>
                            <a
                              href={`https://github.com/${event.repo.name}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-[#e6edf3] hover:text-[#bfdcff] hover:underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#58a6ff] rounded-sm"
                            >
                              {repoName}
                            </a>
                          </div>

                          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] leading-6 text-[#8b949e]">
                            <span className="text-[#94a0ad]">{action}</span>
                            <span className="text-[#30363d]">•</span>
                            <span>{t('activity.console.publicStream')}</span>
                            {commitMessage && (
                              <>
                                <span className="text-[#30363d]">•</span>
                                <span className="truncate max-w-[240px] md:max-w-xl text-[#c3ccd7]">
                                  {t('activity.console.commitLabel')} {commitMessage}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {events.length > INITIAL_VISIBLE_EVENTS && (
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => setShowAllEvents((current) => !current)}
                        className="rounded-full border border-[#30363d] bg-[#11161d] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8b949e] transition-colors hover:border-[#58a6ff] hover:text-[#e6edf3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#58a6ff]"
                      >
                        {showAllEvents
                          ? t('activity.console.showLess')
                          : t('activity.console.showMore', {
                              count: events.length - INITIAL_VISIBLE_EVENTS
                            })}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:self-start">
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

            <div className="bg-[#0d1117] rounded-[1.5rem] border border-[#30363d] shadow-xl p-5 font-mono text-xs ring-1 ring-white/5">
              <div className="flex items-center justify-between mb-4 border-b border-[#30363d] pb-2">
                <span className="text-[#8b949e] uppercase tracking-[0.16em] font-bold">
                  {t('activity.focusTitle')}
                </span>
              </div>
              <div className="space-y-3">
                {focusRepos.map((project) => (
                  <a
                    key={project.id}
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-xl border border-[#30363d] bg-[#11161d] px-4 py-3 hover:border-[#58a6ff] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#58a6ff]"
                  >
                    <div className="text-[#e6edf3] font-semibold">{project.name}</div>
                    <div className="mt-1 text-[#8b949e] leading-relaxed">{project.summary}</div>
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
