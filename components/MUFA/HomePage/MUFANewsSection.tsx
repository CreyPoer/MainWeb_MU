"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import styles from "./MUFAHome.module.css";

interface NewsItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  author: string;
}

export default function MUFANewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news?category=MUFA&limit=3");
        const result = await res.json();
        const items = Array.isArray(result) ? result : (result.data || []);
        setNews(items);
      } catch (error) {
        console.error("Failed to fetch MUFA news", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (isLoading) {
    return (
      <section id="berita" className={styles.mufaSection}>
        <div className={styles.mufaContainer}>
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  if (news.length === 0) {
    return null; // Or show empty state
  }

  const [featured, ...rest] = news;

  return (
    <section id="berita" className={styles.mufaSection}>
      <div className={styles.mufaContainer}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-xs md:text-sm font-semibold tracking-[0.32em] text-red-400 uppercase mb-2">
              MUFA Updates
            </p>
            <h2
              data-aos="fade-up"
              className="text-2xl md:text-4xl font-extrabold text-white uppercase leading-tight"
            >
              Berita Terbaru <span className="text-red-400">Academy</span>
            </h2>
          </div>
          <Link
            href="/mufa/berita"
            data-aos="fade-left"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-[0.18em] uppercase text-slate-100/90 hover:text-amber-300"
          >
            Lihat Semua Berita <FaArrowRight size={12} />
          </Link>
        </div>

        <div className={styles.mufaNewsGrid}>
          {/* Featured */}
          {featured && (
            <Link
              href={`/news/${featured.slug}`}
              data-aos="fade-right"
              className="group block relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-700/80 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-900/30 hover:border-red-500/70 h-full"
            >
              <div className="relative h-72 md:h-full md:min-h-[360px]">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized // For external images or if domain not configured
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col gap-3">
                  <span className="inline-flex px-3 py-1 rounded-full bg-red-500 text-xs font-semibold tracking-[0.18em] uppercase text-white/90 self-start">
                    Headline
                  </span>
                  <p className="text-xs text-slate-200/80">{featured.date} | {featured.author}</p>
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-snug line-clamp-2">
                    {featured.title}
                  </h3>
                  <p className="hidden md:block text-sm text-slate-200/90 leading-relaxed max-w-2xl line-clamp-2">
                    {featured.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          )}

          {/* List */}
          <div className="flex flex-col gap-4 h-full">
            {rest.map((item, index) => (
              <Link
                href={`/news/${item.slug}`}
                key={item.id}
                data-aos="fade-left"
                data-aos-delay={index * 100}
                className="group flex gap-3 rounded-2xl bg-slate-900/80 border border-slate-700/80 overflow-hidden hover:border-red-500/70 hover:bg-slate-900 transition flex-1"
              >
                <div className="relative w-28 md:w-32 min-h-[96px] h-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                <div className="flex-1 py-3 pr-4 flex flex-col gap-1 justify-center">
                  <p className="text-[11px] md:text-xs text-slate-400 uppercase tracking-[0.18em]">
                    {item.date}
                  </p>
                  <h3 className="text-sm md:text-base font-semibold text-white leading-snug group-hover:text-red-300 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-[11px] md:text-xs text-slate-300/90 line-clamp-2 md:line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
