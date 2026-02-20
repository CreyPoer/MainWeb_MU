import React from 'react';
import { notFound } from 'next/navigation';
import HeroDetail from '@/components/Media/Berita/Detail/HeroDetail';
import ContentDetail from '@/components/Media/Berita/Detail/ContentDetail';
import FooterSection from '@/components/HomePage/FooterSection';
import { Metadata } from 'next';
import { getNewsDetail } from '@/lib/news';

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const news = await getNewsDetail(id);

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
    const news = await getNewsDetail(id);

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


