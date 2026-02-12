import React from "react";
import { notFound } from "next/navigation";
import MUFABeritaDetailPage from "../../../../components/MUFA/Berita/Detail/MUFABeritaDetailPage";
import { MUFA_NEWS_DETAILS } from "../../../../components/MUFA/Berita/newsData";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const numericId = Number(id);
  const newsItem = MUFA_NEWS_DETAILS.find((item) => item.id === numericId);

  if (!newsItem) {
    notFound();
  }

  return <MUFABeritaDetailPage newsItem={newsItem} />;
}
