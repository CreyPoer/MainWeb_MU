import React from "react";
import type { Metadata } from "next";
import HeroPemain from "@/components/Tim/Pemain/HeroPemain";
import PemainContent from "@/components/Tim/Pemain/PemainContent";
import FooterSection from "@/components/HomePage/FooterSection";

export const metadata: Metadata = {
  title: "Daftar Tim Utama | Madura United FC",
  description: "Daftar pemain tim utama Madura United FC.",
};

export default function DaftarPemainPage() {
  return (
    <main className="bg-neutral-900 min-h-screen">
      <HeroPemain />
      <PemainContent />
      <FooterSection />
    </main>
  );
}
