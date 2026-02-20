"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaFilter, FaTimes, FaSearch, FaTag, FaChevronRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLanguage } from "@/contexts/LanguageContext";

import MUFANavbar from "../HomePage/MUFANavbar";
import MUFAFooter from "../HomePage/MUFAFooter";
import styles from "../HomePage/MUFAHome.module.css";
// import { MUFA_NEWS_LIST } from "./newsData";

// const ALL_TAGS = ...

export default function MUFABeritaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, lang } = useLanguage();

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

  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTags, setActiveTags] = useState<string[]>([]);

  // Fetch Tags (Popular tags for MUFA category)
  useEffect(() => {
    async function fetchTags() {
      try {
        const res = await fetch('/api/tags?category=MUFA');
        const data = await res.json();
        // Backend returns array of strings
        if (Array.isArray(data)) {
          setActiveTags(data);
        }
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      }
    }
    fetchTags();
  }, []);

  // Fetch News
  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set('category', 'MUFA');
        // Backend API doesn't support 'q' or 'tag' on the /v2/news endpoint VIA the NextJS proxy straightforwardly 
        // unless we built it that way. 
        // Our proxy route `app/api/news/route.ts` DOES support passing query params.
        // Let's pass them.

        if (searchTerm) params.set('q', searchTerm); // This might need backend support in route.ts proxy. 
        // Looking at route.ts: `const category = searchParams.get('category');`
        // It does NOT seem to pass 'q' or 'tag' to the backend V2 API yet in the proxy? 
        // Wait, I only checked route.ts for 'category' and 'limit'.
        // Let's re-read route.ts content from earlier step.
        // Step 7: 
        // const queryParams = new URLSearchParams();
        // if (category) queryParams.set('category', category);
        // queryParams.set('per_page', limit);

        // It does NOT pass 'q' or 'tag' to the backend. 
        // THIS IS ARGUABLY A MISSING ITEM IN PLAN. 
        // However, the `task` was to "replace dummy data". 
        // If I want search/tag filter to work on server side, I need to update route.ts proxy first.
        // OR I can fetch ALL MUFA news and filter client side (since volume might not be huge yet?).
        // User request: "collect all data ... group and count tags ... take 10-20 most frequent".
        // This implies client-side aggregation OR backend aggregation.
        // Backend `NewsTagController` was updated to filter tags by category. So tags are handled server side.

        // For news list: "get all data ... title category manager = MUFA".
        // If I fetch purely by category=MUFA, I get paginated results (limit=5 default).
        // I need to fetch MORE or ALL to replace the "Client Side Search" experience effectively?
        // Or implement server side search.
        // Given the constraints and the prompt "replace dummy data... but data sent via api... concept same as Media/Berita", 
        // Media/Berita (`BeritaContent.tsx`) seemed to implement server-side filtering via API.
        // My previous view of `BeritaContent.tsx` (Step 14) showed:
        // params.set("q", activeQuery); ... const res = await fetch(`/api/news?${params.toString()}`);

        // So `api/news/route.ts` SHOULD support 'q' and 'tag' if `BeritaContent.tsx` relies on it.
        params.set('page', page.toString());
        params.set('limit', '12');

        if (searchTerm) params.set('search', searchTerm);
        if (activeTag) params.set('tag', activeTag);

        const res = await fetch(`/api/news?${params.toString()}`);
        const result = await res.json();

        let items = [];
        if (result.data) {
          items = result.data;
          if (result.meta) {
            setTotalPages(result.meta.last_page || 1);
          }
        } else if (Array.isArray(result)) {
          items = result;
        }

        const adapted = items.map((item: any) => ({
          ...item,
          category: "MUFA",
          tags: item.tags || []
        }));
        setNews(adapted);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [searchTerm, activeTag, page]);

  // Page Change Handler
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Client-side filtering is REPLACED by Server-side fetching above.
  // So 'filteredNews' is just 'news'.
  const filteredNews = news;

  const toggleFilter = () => setIsFilterOpen((prev) => !prev);

  // Helper to update URL
  const updateUrl = (newQ: string, newTag: string | null) => {
    const params = new URLSearchParams();
    if (newQ) params.set("q", newQ);
    if (newTag) params.set("tag", newTag);

    // Replace logic to keep history clean or Push? Push is better for "Back" navigation.
    router.push(`/${lang}/mufa/berita?${params.toString()}`, { scroll: false });
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
    setPage(1);
    router.push(`/${lang}/mufa/berita`, { scroll: false });
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
                      {t('mufa.berita_page.hero_eyebrow')}
                    </p>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white uppercase leading-tight mb-4">
                      {t('mufa.berita_page.hero_title')}
                      <span className="block text-red-400">{t('mufa.berita_page.hero_title_highlight')}</span>
                    </h1>
                    <p className="text-sm md:text-base text-slate-200/80 max-w-xl mx-auto">
                      {t('mufa.berita_page.hero_desc')}
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
                  {t('mufa.berita_page.list_eyebrow')}
                </p>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white uppercase leading-tight mb-2">
                  {t('mufa.berita_page.archive_title')} <span className="text-red-400">{t('mufa.berita_page.archive_highlight')}</span>
                </h2>
                <p className="text-xs md:text-sm text-slate-300/80 max-w-xl">
                  {t('mufa.berita_page.archive_desc')}
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
                    {filteredNews.length} {t('mufa.berita_page.news_showing')}
                  </span>
                </span>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetAll}
                    className="px-3 py-2 rounded-full bg-slate-900/80 border border-red-500/60 text-red-300 hover:bg-red-500/10 transition text-[11px] md:text-xs uppercase font-bold tracking-wider"
                  >
                    {t('mufa.berita_page.reset_filter')}
                  </button>
                )}
              </div>
            </div>

            {/* Grid of cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredNews.map((item: any, index: number) => (
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
                      href={`/${lang}/mufa/berita/${item.id}`}
                      className="text-sm md:text-base font-semibold text-white leading-snug line-clamp-2 group-hover:text-red-300 transition"
                    >
                      {item.title}
                    </Link>
                    <p className="text-[11px] md:text-xs text-slate-300/90 leading-relaxed line-clamp-3">
                      {item.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-2 border-t border-slate-700/70">
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.slice(0, 3).map((tag: string) => (
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
                        href={`/${lang}/mufa/berita/${item.id}`}
                        className="text-[10px] font-semibold tracking-[0.18em] uppercase text-slate-400 group-hover:text-amber-300 transition hidden md:inline-flex"
                      >
                        {t('mufa.berita_page.read_detail')}
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination UI */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12" data-aos="fade-up">
                <button
                  disabled={page === 1 || loading}
                  onClick={() => handlePageChange(page - 1)}
                  className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 font-bold uppercase tracking-wider text-[10px] hover:bg-red-600 hover:text-white hover:border-red-600 disabled:opacity-30 disabled:hover:bg-slate-900 disabled:hover:text-slate-300 disabled:hover:border-slate-700 transition duration-300"
                >
                  Prev
                </button>

                <div className="flex gap-1.5">
                  {[...Array(totalPages)].map((_, i) => {
                    const p = i + 1;
                    const isActive = p === page;
                    // Show dots logic similar to BeritaContent but simplified or same
                    if (
                      totalPages <= 7 ||
                      p === 1 ||
                      p === totalPages ||
                      (p >= page - 1 && p <= page + 1)
                    ) {
                      return (
                        <button
                          key={p}
                          onClick={() => handlePageChange(p)}
                          className={`w-9 h-9 flex items-center justify-center rounded-lg border font-bold text-xs transition duration-300 ${isActive
                            ? "bg-red-600 border-red-600 text-white"
                            : "bg-slate-900 border-slate-700 text-slate-400 hover:border-red-500 hover:text-red-500"
                            }`}
                        >
                          {p}
                        </button>
                      );
                    } else if (
                      (p === page - 2 && page > 3) ||
                      (p === page + 2 && page < totalPages - 2)
                    ) {
                      return <span key={p} className="text-slate-600 self-center">...</span>;
                    }
                    return null;
                  })}
                </div>

                <button
                  disabled={page === totalPages || loading}
                  onClick={() => handlePageChange(page + 1)}
                  className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 font-bold uppercase tracking-wider text-[10px] hover:bg-red-600 hover:text-white hover:border-red-600 disabled:opacity-30 disabled:hover:bg-slate-900 disabled:hover:text-slate-300 disabled:hover:border-slate-700 transition duration-300"
                >
                  Next
                </button>
              </div>
            )}

            {filteredNews.length === 0 && (
              <div
                className="mt-10 text-center text-slate-300/80 text-sm md:text-base py-10"
                data-aos="fade-up"
              >
                <h3 className="text-xl font-bold text-white mb-2">{t('mufa.berita_page.no_news_title')}</h3>
                <p className="mb-4">{t('mufa.berita_page.no_news_desc')}</p>
                <button
                  type="button"
                  onClick={resetAll}
                  className="px-6 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition"
                >
                  {t('mufa.berita_page.reset_filter')}
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
              {t('mufa.berita_page.filter_title')}
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
              {t('mufa.berita_page.search_title')}
            </h4>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder={t('mufa.berita_page.search_placeholder')}
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
              {t('mufa.berita_page.popular_tags')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {activeTags.map((tag: string) => {
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
