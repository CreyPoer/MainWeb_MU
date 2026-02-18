import React from "react";
import CustomHero from "@/components/Pertandingan/Jadwal dan Hasil/CustomHero";
import FooterSection from "@/components/HomePage/FooterSection";
import GalleryContent from "@/components/Media/Gallery/GalleryContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gallery | Madura United FC",
    description:
        "Gallery foto resmi Madura United FC: momen pertandingan, latihan, dan aktivitas klub.",
};

export default function GalleryPage() {
    return (
        <main className="bg-neutral-900 min-h-screen">
            <CustomHero
                title="GALLERY"
                bgImage="/gallery.jpg"
                breadcrumbActive="Gallery"
            />

            <GalleryContent />

            <FooterSection />
        </main>
    );
}
