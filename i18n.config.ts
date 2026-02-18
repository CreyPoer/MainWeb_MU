export const i18nConfig = {
  locales: ['id', 'en'] as const,
  defaultLocale: 'id' as const,
};

export type Locale = (typeof i18nConfig.locales)[number];
