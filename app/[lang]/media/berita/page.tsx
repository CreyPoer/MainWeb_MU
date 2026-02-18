import React from 'react';
import CustomHero from '@/components/Pertandingan/Jadwal dan Hasil/CustomHero';
import FooterSection from '@/components/HomePage/FooterSection';
import BeritaContent from '@/components/Media/Berita/BeritaContent';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Berita | Madura United FC',
    description: 'Berita terbaru seputar Madura United FC, update pemain, hasil pertandingan, dan info klub terkini.',
};

export default async function BeritaPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedSearchParams = await searchParams;
    const category = resolvedSearchParams?.category;
    const tag = resolvedSearchParams?.tag;
    const query = resolvedSearchParams?.q;
    const author = resolvedSearchParams?.author;

    let activeFilter = undefined;
    if (category && typeof category === "string") {
        activeFilter = { type: 'category', value: category };
    } else if (tag && typeof tag === "string") {
        activeFilter = { type: 'tag', value: tag };
    } else if (query && typeof query === "string") {
        activeFilter = { type: 'q', value: query };
    } else if (author && typeof author === "string") {
        activeFilter = { type: 'author', value: author };
    }

    return (
        <main className="bg-neutral-900 min-h-screen">
            <CustomHero
                titleKey="page.news.title"
                bgImage="/berita.jpg"
                breadcrumbKey="page.news.breadcrumb"
                activeFilter={activeFilter}
            />

            <BeritaContent />

            <FooterSection />
        </main>
    );
}
