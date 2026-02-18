import type { Metadata } from "next";
import { i18nConfig, type Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/i18n";
import { LanguageProvider } from "@/contexts/LanguageContext";
import AppShell from "@/components/AppShell";

export async function generateStaticParams() {
    return i18nConfig.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const meta = dict.meta as Record<string, string>;

    return {
        title: meta.title,
        description: meta.description,
        alternates: {
            languages: {
                'id': '/id',
                'en': '/en',
            },
        },
    };
}

export default async function LangLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dictionary = await getDictionary(lang as Locale);

    return (
        <LanguageProvider lang={lang as Locale} dictionary={dictionary}>
            <AppShell lang={lang as Locale}>{children}</AppShell>
        </LanguageProvider>
    );
}
