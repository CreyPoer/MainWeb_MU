import React from 'react';
import CustomHero from '@/components/Pertandingan/Jadwal dan Hasil/CustomHero';
import FooterSection from '@/components/HomePage/FooterSection';
import BeritaContent from '@/components/Media/Berita/BeritaContent';
import { Metadata } from 'next';

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

    let heroTitle = "Berita";
    if (category && typeof category === "string") {
        heroTitle = `Kategori: ${category}`;
    } else if (tag && typeof tag === "string") {
        heroTitle = `Tag: #${tag}`;
    } else if (query && typeof query === "string") {
        heroTitle = `Pencarian: "${query}"`;
    } else if (author && typeof author === "string") {
        heroTitle = `Penulis: ${author}`;
    }

    return (
        <main className="bg-neutral-900 min-h-screen">
            <CustomHero
                title={heroTitle}
                bgImage="/berita.jpg"
                breadcrumbActive="Berita"
            />

            <BeritaContent />

            <FooterSection />
        </main>
    );
}
