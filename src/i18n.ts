import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

type SupportedLanguage = 'pt-BR' | 'en' | 'es';

const FALLBACK_LANGUAGE: SupportedLanguage = 'pt-BR';

const localeLoaders: Record<
  SupportedLanguage,
  () => Promise<{ default: Record<string, unknown> }>
> = {
  'pt-BR': () => import('./locales/pt-BR.json'),
  en: () => import('./locales/en.json'),
  es: () => import('./locales/es.json')
};
const loadedLanguages = new Set<SupportedLanguage>();

const normalizeLanguage = (language?: string | null): SupportedLanguage => {
  if (!language) return FALLBACK_LANGUAGE;

  const normalized = language.toLowerCase();

  if (normalized.startsWith('pt')) return 'pt-BR';
  if (normalized.startsWith('es')) return 'es';
  if (normalized.startsWith('en')) return 'en';

  return FALLBACK_LANGUAGE;
};

const detectLanguage = (): SupportedLanguage => {
  if (typeof window === 'undefined') {
    return FALLBACK_LANGUAGE;
  }

  const queryLanguage = new URLSearchParams(window.location.search).get('lng');
  const storedLanguage = window.localStorage.getItem('i18nextLng');
  const candidates = [
    queryLanguage,
    storedLanguage,
    ...(window.navigator.languages || []),
    window.navigator.language
  ];

  return normalizeLanguage(candidates.find(Boolean));
};

const loadLocale = async (language: SupportedLanguage) => {
  if (loadedLanguages.has(language)) {
    return null;
  }

  const messages = await localeLoaders[language]();
  loadedLanguages.add(language);
  return messages.default;
};

export const initI18n = async () => {
  const language = detectLanguage();
  const initialMessages = await loadLocale(language);

  if (!i18n.isInitialized) {
    await i18n.use(initReactI18next).init({
      resources: initialMessages
        ? {
            [language]: {
              translation: initialMessages
            }
          }
        : undefined,
      lng: language,
      fallbackLng: FALLBACK_LANGUAGE,
      supportedLngs: Object.keys(localeLoaders),
      interpolation: {
        escapeValue: false
      }
    });
  } else {
    if (initialMessages) {
      i18n.addResourceBundle(language, 'translation', initialMessages, true, true);
    }
    await i18n.changeLanguage(language);
  }

  if (typeof document !== 'undefined') {
    document.documentElement.lang = language;
  }

  return i18n;
};

export const loadLanguage = async (language: string) => {
  const normalizedLanguage = normalizeLanguage(language);
  const messages = await loadLocale(normalizedLanguage);

  if (messages) {
    i18n.addResourceBundle(normalizedLanguage, 'translation', messages, true, true);
  }

  await i18n.changeLanguage(normalizedLanguage);

  if (typeof window !== 'undefined') {
    window.localStorage.setItem('i18nextLng', normalizedLanguage);
  }

  if (typeof document !== 'undefined') {
    document.documentElement.lang = normalizedLanguage;
  }

  return normalizedLanguage;
};

export default i18n;
