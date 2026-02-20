import React from "react";
import { notFound } from "next/navigation";
import MUFABeritaDetailPage from "@/components/MUFA/Berita/Detail/MUFABeritaDetailPage";
import { getNewsDetail } from "@/lib/news";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const newsItem = await getNewsDetail(id);

  if (!newsItem) {
    notFound();
  }

  return <MUFABeritaDetailPage newsItem={newsItem} />;
}
