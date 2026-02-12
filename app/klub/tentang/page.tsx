import React from "react";
import type { Metadata } from "next";
import FooterSection from "@/components/HomePage/FooterSection";
import AOSInit from "@/components/HomePage/AOSInit";
import HeroTentang from "@/components/Tentang Kami/HeroTentang";
import TentangContent from "@/components/Tentang Kami/TentangContent";

export const metadata: Metadata = {
  title: "Tentang Madura United FC | Madura United FC",
  description:
    "Profil resmi Madura United FC, sejarah klub, visi, dan nilai-nilai Laskar Sape Kerrab.",
};

export default function TentangMaduraUnitedPage() {
  return (
    <main className="bg-white min-h-screen">
      <AOSInit />
      <HeroTentang />
      <TentangContent />
      <FooterSection />
    </main>
  );
}
