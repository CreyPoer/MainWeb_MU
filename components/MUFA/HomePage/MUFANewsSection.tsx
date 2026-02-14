"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import styles from "./MUFAHome.module.css";

const NEWS_ITEMS = [
  {
    id: 1,
    title: "Trial Day MUFA: Ratusan Talenta Muda Ikuti Seleksi",
    excerpt:
      "Prospek pemain dari berbagai daerah datang ke Pamekasan untuk mengikuti seleksi program MUFA musim baru.",
    date: "Feb 02, 2026",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 2,
    title: "Sesi Coaching Clinic Bersama Tim Utama Madura United",
    excerpt:
      "Peserta MUFA mendapat kesempatan berlatih langsung dengan pemain dan pelatih tim utama di MUTG.",
    date: "Jan 28, 2026",
    image:
      "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "U-18 MUFA Menang Besar di Laga Uji Coba",
    excerpt:
      "Skuad U-18 menunjukkan progres signifikan dalam uji coba melawan tim akademi lain di Jawa Timur.",
    date: "Jan 21, 2026",
    image:
      "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=1200",
  },
];

export default function MUFANewsSection() {
  const [featured, ...rest] = NEWS_ITEMS;

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
          <Link
            href={`/mufa/berita/${featured.id}`}
            data-aos="fade-right"
            className="group block relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-700/80 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-900/30 hover:border-red-500/70"
          >
            <div className="relative h-72 md:h-[360px]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col gap-3">
                <span className="inline-flex px-3 py-1 rounded-full bg-red-500 text-xs font-semibold tracking-[0.18em] uppercase text-white/90 self-start">
                  Headline
                </span>
                <p className="text-xs text-slate-200/80">{featured.date}</p>
                <h3 className="text-xl md:text-2xl font-bold text-white leading-snug">
                  {featured.title}
                </h3>
                <p className="hidden md:block text-sm text-slate-200/90 leading-relaxed max-w-2xl">
                  {featured.excerpt}
                </p>
              </div>
            </div>
          </Link>

          {/* List */}
          <div className="flex flex-col gap-4">
            {rest.map((item, index) => (
              <Link
                href={`/mufa/berita/${item.id}`}
                key={item.id}
                data-aos="fade-left"
                data-aos-delay={index * 100}
                className="group flex gap-3 rounded-2xl bg-slate-900/80 border border-slate-700/80 overflow-hidden hover:border-red-500/70 hover:bg-slate-900 transition"
              >
                <div className="relative w-28 md:w-32 min-h-[96px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 py-3 pr-4 flex flex-col gap-1">
                  <p className="text-[11px] md:text-xs text-slate-400 uppercase tracking-[0.18em]">
                    {item.date}
                  </p>
                  <h3 className="text-sm md:text-base font-semibold text-white leading-snug group-hover:text-red-300">
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
