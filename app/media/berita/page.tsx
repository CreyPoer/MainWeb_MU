import React from 'react';
import CustomHero from '@/components/Pertandingan/Jadwal dan Hasil/CustomHero';
import FooterSection from '@/components/HomePage/FooterSection';
import BeritaContent from '@/components/Media/Berita/BeritaContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Berita | Madura United FC',
    description: 'Berita terbaru seputar Madura United FC, update pemain, hasil pertandingan, dan info klub terkini.',
};

export default function BeritaPage() {
    return (
        <main className="bg-neutral-900 min-h-screen">
            <CustomHero
                title="Berita"
                bgImage="/berita.jpg"
                breadcrumbActive="Berita"
            />

            <BeritaContent />

            <FooterSection />
        </main>
    );
}
