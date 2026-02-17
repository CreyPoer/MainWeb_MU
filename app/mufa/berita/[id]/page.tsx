import React from "react";
import { notFound } from "next/navigation";
import MUFABeritaDetailPage from "../../../../components/MUFA/Berita/Detail/MUFABeritaDetailPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getNewsDetail(id: string) {
  // Use a fallback that works for server-side fetching in local dev (usually localhost:3000)
  // In production, this env var should be set.
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  try {
    const res = await fetch(`${baseUrl}/api/news/${id}?category=MUFA`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error("Error fetching news detail:", e);
    return null;
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const newsItem = await getNewsDetail(id);

  if (!newsItem || newsItem.error) {
    notFound();
  }

  return <MUFABeritaDetailPage newsItem={newsItem} />;
}
