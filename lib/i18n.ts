import type { Locale } from '@/i18n.config';

const dictionaries: Record<Locale, () => Promise<Record<string, unknown>>> = {
    id: () => import('@/locales/id.json').then((m) => m.default),
    en: () => import('@/locales/en.json').then((m) => m.default),
};

export const getDictionary = async (locale: Locale) => {
    return dictionaries[locale]();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getNestedValue(obj: any, key: string): string {
    return key.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : key), obj) as string;
}
