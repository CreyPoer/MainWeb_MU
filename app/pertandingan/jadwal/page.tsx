import React from "react";
import CustomHero from "@/components/Pertandingan/Jadwal dan Hasil/CustomHero";
import MatchContent from "@/components/Pertandingan/Jadwal dan Hasil/MatchContent";
import FooterSection from "@/components/HomePage/FooterSection";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Jadwal dan Hasil | Madura United FC',
    description: 'Jadwal pertandingan dan hasil skor terkini Madura United FC.',
};

export default function JadwalPage() {
    return (
        <main className="bg-neutral-900 min-h-screen">
            <CustomHero
                title="Jadwal dan Hasil"
                bgImage="/jadwal.jpg"
                breadcrumbActive="Jadwal dan Hasil"
            />
            <MatchContent />
            <FooterSection />
        </main>
    );
}
