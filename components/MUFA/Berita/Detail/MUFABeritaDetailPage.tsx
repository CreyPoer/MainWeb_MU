"use client";

import React from "react";
import MUFANavbar from "../../HomePage/MUFANavbar";
import MUFAFooter from "../../HomePage/MUFAFooter";
import { MufaNewsDetail } from "../newsData";
import MUFAHeroDetail from "./MUFAHeroDetail";
import MUFAContentDetail from "./MUFAContentDetail";

interface MUFABeritaDetailPageProps {
  newsItem: MufaNewsDetail;
}

export default function MUFABeritaDetailPage({
  newsItem,
}: MUFABeritaDetailPageProps) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <MUFANavbar />
      <main className="flex-1">
        <MUFAHeroDetail title={newsItem.title} image={newsItem.image} />
        <MUFAContentDetail newsItem={newsItem} />
      </main>
      <MUFAFooter />
    </div>
  );
}
