'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { Locale } from '@/i18n.config';
import { i18nConfig } from '@/i18n.config';
import { getNestedValue } from '@/lib/i18n';

interface LanguageContextType {
    lang: Locale;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dictionary: Record<string, any>;
    t: (key: string) => string;
    switchLanguage: (newLang: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
    children: React.ReactNode;
    lang: Locale;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dictionary: Record<string, any>;
}

export function LanguageProvider({ children, lang, dictionary }: LanguageProviderProps) {
    const pathname = usePathname();
    const router = useRouter();

    const t = useMemo(() => {
        return (key: string): string => {
            return getNestedValue(dictionary, key);
        };
    }, [dictionary]);

    const switchLanguage = (newLang: Locale) => {
        // Replace current locale prefix in URL with the new one
        const segments = pathname.split('/');
        // segments[0] is empty string (before first /), segments[1] is locale
        if (i18nConfig.locales.includes(segments[1] as Locale)) {
            segments[1] = newLang;
        } else {
            segments.splice(1, 0, newLang);
        }
        router.push(segments.join('/'));
    };

    const value = useMemo(
        () => ({ lang, dictionary, t, switchLanguage }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [lang, dictionary, t, pathname, router]
    );

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
