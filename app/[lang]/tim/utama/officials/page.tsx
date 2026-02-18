import React from "react";
import type { Metadata } from "next";
import HeroOfficials from "@/components/Tim/Officials/HeroOfficials";
import OfficialsContent from "@/components/Tim/Officials/OfficialsContent";
import FooterSection from "@/components/HomePage/FooterSection";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Daftar Officials Tim Utama | Madura United FC",
  description: "Daftar resmi tim pelatih dan staf Madura United FC.",
};

export default function DaftarOfficialsPage() {
  return (
    <main className="bg-neutral-900 min-h-screen">
      <HeroOfficials />
      <OfficialsContent />
      <FooterSection />
    </main>
  );
}
