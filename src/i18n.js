import { translations as colorTranslations } from './colorsets/css-named-colors.js';

const translations = {
  en: {
    ui: {
      next: 'Next Color →',
      title: "What's That Color?",
      reveal: 'Reveal Options',
    },
  },
  de: {
    ui: {
      next: 'Nächste Farbe →',
      title: 'Wie heißt die Farbe?',
      reveal: 'Optionen anzeigen',
    },
  },
};

export const LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
];

export function getLocale() {
  return localStorage.getItem('ntc-locale') || 'de';
}

export function setLocale(code) {
  localStorage.setItem('ntc-locale', code);
  document.dispatchEvent(new CustomEvent('localechange', { detail: { code } }));
}

export function t(key) {
  const locale = getLocale();
  const [section, name] = key.split('.');
  return (
    translations[locale]?.[section]?.[name] ??
    translations['en']?.[section]?.[name] ??
    key
  );
}

export function tColor(name) {
  const locale = getLocale();
  return (
    colorTranslations[locale]?.[name] ??
    colorTranslations['en']?.[name] ??
    name
  );
}
