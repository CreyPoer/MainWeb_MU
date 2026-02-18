import React from "react";
import { Metadata } from "next";
import CustomHero from "@/components/Pertandingan/Jadwal dan Hasil/CustomHero";
import FooterSection from "@/components/HomePage/FooterSection";
import VideoContent from "@/components/Media/Video/VideoContent";

export const metadata: Metadata = {
    title: "Video | Madura United FC",
    description:
        "Kumpulan video resmi Madura United FC: highlight pertandingan, latihan, dan aktivitas klub.",
};

export default function VideoPage() {
    return (
        <main className="bg-neutral-900 min-h-screen">
            <CustomHero
                title="VIDEO"
                bgImage="/video.jpg"
                breadcrumbActive="Video"
            />

            <VideoContent />

            <FooterSection />
        </main>
    );
}
