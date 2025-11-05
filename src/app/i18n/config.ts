// i18n/config.ts
export const locales = ['en', 'kiny', 'fr'] as const;   // ← add more if you need
export const defaultLocale = 'en' as const;

export type Locale = typeof locales[number];