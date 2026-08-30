import { ui, defaultLang, languages, type SupportedLanguage } from './ui';

export { languages, defaultLang };
export type { SupportedLanguage };

/**
 * Extracts the current locale from the URL pathname.
 * Root '/' -> 'en', '/es/...' -> 'es', etc.
 */
export function getLangFromUrl(url: URL | string): SupportedLanguage {
  const pathname = typeof url === 'string' ? url : url.pathname;
  const segments = pathname.split('/').filter(Boolean);
  const candidate = segments[0] as SupportedLanguage;

  if (candidate && candidate in languages) {
    return candidate;
  }

  return defaultLang;
}

/**
 * Returns a typed translation lookup dictionary for the specified locale.
 */
export function useTranslations(lang: SupportedLanguage) {
  return ui[lang] || ui[defaultLang];
}

/**
 * Generates a localized pathname for a given target language.
 * E.g., ('/how-it-works', 'es') -> '/es/how-it-works'
 * E.g., ('/es/features', 'en') -> '/features' (root is English)
 */
export function getLocalizedPath(pathname: string, targetLang: SupportedLanguage): string {
  const segments = pathname.split('/').filter(Boolean);
  
  // Remove existing language prefix if present
  if (segments.length > 0 && segments[0] in languages) {
    segments.shift();
  }

  const cleanPath = segments.join('/');

  if (targetLang === defaultLang) {
    return cleanPath ? `/${cleanPath}/` : '/';
  }

  return cleanPath ? `/${targetLang}/${cleanPath}/` : `/${targetLang}/`;
}
