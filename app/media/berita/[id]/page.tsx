import React from 'react';
import { notFound } from 'next/navigation';
import HeroDetail from '@/components/Media/Berita/Detail/HeroDetail';
import ContentDetail from '@/components/Media/Berita/Detail/ContentDetail';
import FooterSection from '@/components/HomePage/FooterSection';
import { Metadata } from 'next';

// Helper to fetch data
async function getNewsItem(id: string) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/news/${id}`, {
            cache: 'no-store'
        });

        if (!res.ok) return null;

        return res.json();
    } catch (error) {
        console.error("Error fetching news detail:", error);
        return null;
    }
}

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const news = await getNewsItem(id);

    if (!news) {
        return {
            title: 'Berita Tidak Ditemukan | Madura United FC',
        };
    }

    // Strip HTML for description if needed, simpler approach
    const desc = news.content ? news.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : 'Berita Madura United FC';

    return {
        title: `${news.title} | Berita Madura United`,
        description: desc,
        openGraph: {
            images: [news.image],
        },
    };
}

export default async function NewsDetailPage({ params }: Props) {
    const { id } = await params;
    const news = await getNewsItem(id);

    if (!news) {
        notFound();
    }

    return (
        <main className="bg-neutral-900 min-h-screen">
            {/* Custom Hero */}
            <HeroDetail
                title={news.title}
                image={news.image}
            />

            {/* Content with Sidebar */}
            <ContentDetail newsItem={news} />

            <FooterSection />
        </main>
    );
}
