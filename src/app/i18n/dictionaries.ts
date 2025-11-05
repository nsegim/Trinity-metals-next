

// app/i18n/dictionaries.ts
import 'server-only';
import { locales, defaultLocale } from './config';

const dictionaries: Record<string, () => Promise<any>> = {
  en: () => import('./locales/en/translation.json').then(m => m.default),
  kiny: () => import('./locales/kiny/translation.json').then(m => m.default),
  
};

export const getDictionary = async (locale: string) => {
  // @ts-ignore
  if (locales.includes(locale)) {
    return dictionaries[locale]();
  }
  // Fallback to default
  return dictionaries[defaultLocale]();
};

