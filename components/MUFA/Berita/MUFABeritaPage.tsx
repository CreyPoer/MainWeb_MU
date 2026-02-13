"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaFilter, FaTimes, FaSearch, FaTag, FaChevronRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

import MUFANavbar from "../HomePage/MUFANavbar";
import MUFAFooter from "../HomePage/MUFAFooter";
import styles from "../HomePage/MUFAHome.module.css";
import { MUFA_NEWS_LIST } from "./newsData";

const ALL_TAGS = Array.from(
  new Set(MUFA_NEWS_LIST.flatMap((item) => item.tags))
).sort();

export default function MUFABeritaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // Initialize state from URL params if available, otherwise default
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [activeTag, setActiveTag] = useState<string | null>(searchParams.get("tag") || null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  // Sync state with URL params when they change (e.g. back button or external navigation)
  useEffect(() => {
    const q = searchParams.get("q");
    const tag = searchParams.get("tag");
    // Ensure we handle "reset" properly - if param is null (removed), reset state
    setSearchTerm(q || "");
    setActiveTag(tag || null);

    // If we have params and we are on mobile/wide screens, maybe we don't need to auto-open sidebar, 
    // but the filter logic below will pick it up.
  }, [searchParams]);

  const filteredNews = useMemo(() => {
    return MUFA_NEWS_LIST.filter((item) => {
      // If we have a searchTerm, filter by it
      const matchesSearch = searchTerm
        ? [
          item.title,
          item.category,
          item.excerpt,
          item.tags.join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
        : true;

      // If we have an activeTag, filter by it
      const matchesTag = activeTag ? item.tags.includes(activeTag) : true;

      return matchesSearch && matchesTag;
    });
  }, [searchTerm, activeTag]);

  const toggleFilter = () => setIsFilterOpen((prev) => !prev);

  // Helper to update URL
  const updateUrl = (newQ: string, newTag: string | null) => {
    const params = new URLSearchParams();
    if (newQ) params.set("q", newQ);
    if (newTag) params.set("tag", newTag);

    // Replace logic to keep history clean or Push? Push is better for "Back" navigation.
    router.push(`/mufa/berita?${params.toString()}`, { scroll: false });
  };

  const handleTagClick = (tag: string) => {
    const newTag = activeTag === tag ? null : tag;
    // We rely on URL sync, but optimistic UI update is fine too.
    // However, since we sync on useEffect, let's just push URL.
    // setActiveTag(newTag); // Optional if using optimistic
    updateUrl(searchTerm, newTag);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    // Debouncing could be added here.
  };

  const handleSearchSubmit = () => {
    updateUrl(searchTerm, activeTag);
  };

  const resetAll = () => {
    setSearchTerm("");
    setActiveTag(null);
    router.push("/mufa/berita", { scroll: false });
    if (window.innerWidth < 1024) setIsFilterOpen(false);
  };

  const hasActiveFilters = searchTerm !== "" || activeTag !== null;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <MUFANavbar />

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="pt-6 md:pt-10">
          <div className={styles.mufaContainer}>
            <div className={styles.mufaHeroSlider}>
              <div className={`${styles.mufaHeroFrame} relative`}>
                <Image
                  src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1600"
                  alt="Berita Madura United Football Academy"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
                <div className="absolute inset-0 flex items-center justify-center px-6">
                  <div
                    className="text-center max-w-2xl"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <p className="text-xs md:text-sm font-semibold tracking-[0.32em] uppercase text-red-400 mb-3">
                      MUFA Newsroom
                    </p>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white uppercase leading-tight mb-4">
                      Berita Terbaru
                      <span className="block text-red-400">Football Academy</span>
                    </h1>
                    <p className="text-sm md:text-base text-slate-200/80 max-w-xl mx-auto">
                      Update terkini seputar program, pertandingan, dan aktivitas pengembangan
                      pemain muda di Madura United Football Academy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* List Section */}
        <section className="py-10 md:py-14">
          <div className={styles.mufaContainer}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div data-aos="fade-up">
                <p className="text-[11px] md:text-xs font-semibold tracking-[0.32em] uppercase text-red-400 mb-2">
                  Daftar Berita
                </p>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white uppercase leading-tight mb-2">
                  Arsip Berita <span className="text-red-400">MUFA</span>
                </h2>
                <p className="text-xs md:text-sm text-slate-300/80 max-w-xl">
                  Jelajahi rangkaian cerita dan perkembangan terbaru dari setiap program
                  pembinaan yang berjalan di akademi.
                </p>
              </div>

              <div
                className="flex items-center gap-3 text-[11px] md:text-xs text-slate-300/80"
                data-aos="fade-up"
                data-aos-delay="80"
              >
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-slate-900/80 border border-slate-700/70">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>
                    {filteredNews.length} dari {MUFA_NEWS_LIST.length} berita tampil
                  </span>
                </span>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetAll}
                    className="px-3 py-2 rounded-full bg-slate-900/80 border border-red-500/60 text-red-300 hover:bg-red-500/10 transition text-[11px] md:text-xs uppercase font-bold tracking-wider"
                  >
                    Reset Filter
                  </button>
                )}
              </div>
            </div>

            {/* Grid of cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredNews.map((item, index) => (
                <article
                  key={item.id}
                  className="group flex flex-col overflow-hidden rounded-3xl bg-slate-900/80 border border-slate-700/70 shadow-[0_18px_45px_rgba(0,0,0,0.65)] hover:border-red-500/70 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(0,0,0,0.9)] transition-transform duration-300"
                  data-aos="fade-up"
                  data-aos-delay={80 + index * 40}
                >
                  <div className="relative h-48 md:h-44 lg:h-40 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="inline-flex px-3 py-1 rounded-full bg-red-600/90 text-[10px] font-semibold tracking-[0.18em] uppercase text-white/90">
                        {item.category}
                      </span>
                      <span className="text-[10px] text-slate-200/85 font-medium bg-black/40 px-2 py-1 rounded-full">
                        {item.date}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 px-4 pt-4 pb-4 md:pb-5 gap-3">
                    <Link
                      href={`/mufa/berita/${item.id}`}
                      className="text-sm md:text-base font-semibold text-white leading-snug line-clamp-2 group-hover:text-red-300 transition"
                    >
                      {item.title}
                    </Link>
                    <p className="text-[11px] md:text-xs text-slate-300/90 leading-relaxed line-clamp-3">
                      {item.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-2 border-t border-slate-700/70">
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.slice(0, 3).map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => handleTagClick(tag)}
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border text-[10px] transition ${activeTag === tag
                                ? "bg-red-500 text-white border-red-500"
                                : "border-red-500/50 bg-red-500/15 text-red-200 hover:bg-red-600 hover:text-white"
                              }`}
                          >
                            <FaTag size={9} />
                            <span>#{tag}</span>
                          </button>
                        ))}
                      </div>
                      <Link
                        href={`/mufa/berita/${item.id}`}
                        className="text-[10px] font-semibold tracking-[0.18em] uppercase text-slate-400 group-hover:text-amber-300 transition hidden md:inline-flex"
                      >
                        Baca Detail
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredNews.length === 0 && (
              <div
                className="mt-10 text-center text-slate-300/80 text-sm md:text-base py-10"
                data-aos="fade-up"
              >
                <h3 className="text-xl font-bold text-white mb-2">Tidak ada berita ditemukan.</h3>
                <p className="mb-4">Coba kata kunci atau filter lain.</p>
                <button
                  type="button"
                  onClick={resetAll}
                  className="px-6 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <MUFAFooter />

      {/* Sticky Filter Button */}
      <button
        type="button"
        onClick={toggleFilter}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[60] flex flex-col items-center gap-2 px-2 py-4 rounded-l-xl bg-red-600 text-white shadow-[-4px_0_15px_rgba(0,0,0,0.45)] border border-r-0 border-red-700/80 hover:bg-red-700 transition-colors"
      >
        <FaFilter size={16} />
        <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase writing-mode-vertical">
          Filter
        </span>
      </button>

      {/* Offcanvas Filter Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full max-w-[85vw] w-[400px] bg-white z-[70] shadow-[-10px_0_30px_rgba(0,0,0,0.65)] transform transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${isFilterOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Sidebar Header */}
        <div className="bg-slate-900 text-white px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-extrabold uppercase tracking-[0.1em]">
              Filter Berita
            </h3>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetAll}
                className="text-xs text-red-300 border border-red-800 px-3 py-1 rounded uppercase font-bold hover:bg-red-900 hover:text-white transition"
              >
                Reset
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={toggleFilter}
            className="w-9 h-9 flex items-center justify-center text-white hover:text-red-400 transition"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="px-8 py-8 space-y-8 overflow-y-auto h-[calc(100%-80px)]">
          {/* Search */}
          <div>
            <h4 className="text-sm font-extrabold tracking-[0.1em] uppercase text-slate-400 mb-4">
              Pencarian Kata Kunci
            </h4>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Type to search..."
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
                className="w-full pl-5 pr-12 py-3.5 rounded-lg bg-slate-100 border-2 border-transparent text-slate-900 font-semibold placeholder:text-slate-400 focus:outline-none focus:border-red-600 focus:bg-white transition-colors"
              />
              <button
                className="absolute right-4 text-red-600 hover:text-red-800 transition"
                onClick={handleSearchSubmit}
              >
                <FaSearch size={18} />
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-5">
            <h4 className="text-sm font-extrabold tracking-[0.1em] uppercase text-slate-400 mb-4">
              Tags Populer
            </h4>
            <div className="flex flex-wrap gap-2">
              {ALL_TAGS.map((tag) => {
                const active = activeTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagClick(tag)}
                    className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold transition border ${active
                        ? "bg-red-600 text-white border-red-600"
                        : "bg-white text-slate-600 border-slate-200 hover:border-red-300 hover:text-red-600"
                      }`}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px]"
          onClick={toggleFilter}
        />
      )}

      <style jsx>{`
        .writing-mode-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </div>
  );
}
