"use client";


import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaSearch, FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp, FaFilter, FaTimes, FaTag, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MufaNewsDetail, MUFA_NEWS_LIST } from "../newsData";

interface MUFAContentDetailProps {
  newsItem: MufaNewsDetail;
}

const SIDEBAR_TAGS = [
  "academy",
  "trial",
  "match",
  "training",
  "facility",
  "mental",
  "character",
  "goalkeeper",
  "experience",
  "progress",
];

export default function MUFAContentDetail({ newsItem }: MUFAContentDetailProps) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/mufa/berita?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleTagClick = (tag: string) => {
    router.push(`/mufa/berita?tag=${encodeURIComponent(tag)}`);
  };

  return (
    <section className="mufa-news-detail-section">
      <div className="mufa-news-detail-container">
        <div className="mufa-news-detail-layout">
          {/* LEFT: MAIN CONTENT */}
          <div className="mufa-news-detail-main">
            <div className="mufa-news-detail-imageWrapper">
              <Image
                src={newsItem.image}
                alt={newsItem.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="mufa-news-detail-meta">
              <span className="mufa-news-detail-category">{newsItem.category}</span>
              <span className="mufa-news-detail-date">{newsItem.date}</span>
            </div>

            <div className="mufa-news-detail-content">
              {newsItem.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
              {newsItem.penerbit && newsItem.link_berita && (
                <p className="mt-4 text-sm italic text-gray-400">
                  Dilansir dari: <a href={newsItem.link_berita} target="_blank" rel="noopener noreferrer" className="text-red-500 underline hover:text-red-400 transition-colors">{newsItem.penerbit}</a>
                </p>
              )}
            </div>

            <hr className="mufa-news-detail-divider" />

            {/* TAGS & SHARE ROW */}
            <div className="mufa-news-detail-bottomRow">
              <div className="mufa-news-detail-tagsRow">
                <span className="mufa-news-detail-tagsLabel">TAGS:</span>
                {newsItem.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="mufa-news-detail-tagPill" onClick={() => handleTagClick(tag)} style={{ cursor: "pointer" }}>
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="mufa-news-detail-shareRow">
                <span className="mufa-news-detail-shareLabel">SHARE:</span>
                {[FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp].map(
                  (Icon, idx) => (
                    <button key={idx} className="mufa-news-detail-shareBtn">
                      <Icon size={14} />
                    </button>
                  )
                )}
              </div>
            </div>

            {/* AUTHOR */}
            <div className="mufa-news-detail-author">
              <div className="mufa-news-detail-authorAvatar">
                <Image
                  src="/logoMUFA.jpg"
                  alt={newsItem.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mufa-news-detail-authorBody">
                <h3>ABOUT {newsItem.author}</h3>
                <p className="mufa-news-detail-authorDesc">
                  MUFA secara konsisten menghadirkan informasi terkini seputar program,
                  pertandingan, dan pengembangan talenta muda di lingkungan Madura United
                  Football Academy.
                </p>
                <button className="mufa-news-detail-authorLink">
                  Lihat semua berita dari {newsItem.author}
                </button>
              </div>
            </div>

            {/* PREVIOUS / NEXT POST NAVIGATION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8" data-aos="fade-up">
              {/* Previous Post */}
              {MUFA_NEWS_LIST.find((n) => n.id === newsItem.id - 1) ? (
                <Link
                  href={`/mufa/berita/${newsItem.id - 1}`}
                  className="group relative flex flex-col p-6 rounded-2xl bg-red-500 border border-red-500 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 -translate-x-[150%] skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />

                  <div className="relative z-10 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-white mb-2">
                    <FaChevronLeft size={10} />
                    <span>Previous Post</span>
                  </div>
                  <h4 className="relative z-10 text-sm md:text-base font-bold text-dark-900 group-hover:text-white transition-colors line-clamp-2">
                    {MUFA_NEWS_LIST.find((n) => n.id === newsItem.id - 1)?.title}
                  </h4>
                </Link>
              ) : (
                <div /> /* Empty placeholder if no prev post */
              )}

              {/* Next Post */}
              {MUFA_NEWS_LIST.find((n) => n.id === newsItem.id + 1) ? (
                <Link
                  href={`/mufa/berita/${newsItem.id + 1}`}
                  className="group relative flex flex-col p-6 rounded-2xl bg-red-500 border border-red-500 shadow-sm hover:shadow-lg transition-all duration-300 text-right items-end overflow-hidden"
                >
                  <div className="absolute inset-0 -translate-x-[150%] skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />

                  <div className="relative z-10 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-white mb-2">
                    <span>Next Post</span>
                    <FaChevronRight size={10} />
                  </div>
                  <h4 className="relative z-10 text-sm md:text-base font-bold text-dark-900 group-hover:text-white transition-colors line-clamp-2">
                    {MUFA_NEWS_LIST.find((n) => n.id === newsItem.id + 1)?.title}
                  </h4>
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* YOU MAY ALSO LIKE SECTION */}
            <div className="mt-12 md:mt-16" data-aos="fade-up">
              <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 uppercase tracking-wide mb-6">
                You May Also Like
              </h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {MUFA_NEWS_LIST.filter((item) => item.id !== newsItem.id)
                  .slice(0, 2)
                  .map((item) => (
                    <article
                      key={item.id}
                      className="group flex flex-col overflow-hidden rounded-3xl bg-slate-900/80 border border-slate-700/70 shadow-[0_18px_45px_rgba(0,0,0,0.65)] hover:border-red-500/70 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(0,0,0,0.9)] transition-transform duration-300"
                    >
                      <div className="relative h-48 overflow-hidden">
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

                      <div className="flex flex-col flex-1 px-4 pt-4 pb-4 gap-3">
                        <Link
                          href={`/mufa/berita/${item.id}`}
                          className="text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-red-300 transition"
                        >
                          {item.title}
                        </Link>
                        <div className="mt-auto pt-2 border-t border-slate-700/70 flex justify-end">
                          <Link
                            href={`/mufa/berita/${item.id}`}
                            className="inline-flex px-4 py-2 rounded-full bg-red-600 text-white text-[10px] font-bold tracking-wider uppercase hover:bg-red-700 transition"
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
              </div>
            </div>
          </div>

          {/* RIGHT: SIDEBAR */}
          <aside
            className={`mufa-news-detail-sidebar ${isSidebarOpen ? "mufa-news-detail-sidebar-open" : ""
              }`}
          >
            <div className="mufa-news-detail-sidebarHeader-mobile">
              <h4>Filter &amp; Insight</h4>
              <button onClick={() => setIsSidebarOpen(false)}>
                <FaTimes size={18} />
              </button>
            </div>

            <div className="mufa-news-detail-sidebarInner">
              {/* SEARCH */}
              <div className="mufa-news-detail-widget">
                <div className="mufa-news-detail-widgetHeader">Pencarian Berita</div>
                <div className="mufa-news-detail-widgetBody">
                  <div className="mufa-news-detail-searchWrapper">
                    <button onClick={handleSearch} className="mufa-news-detail-searchIconBtn">
                      <FaSearch className="mufa-news-detail-searchIcon" size={14} />
                    </button>
                    <input
                      type="text"
                      placeholder="Cari di berita MUFA..."
                      className="mufa-news-detail-searchInput"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                  </div>
                </div>
              </div>

              {/* TAGS */}
              <div className="mufa-news-detail-widget">
                <div className="mufa-news-detail-widgetHeader">Tags Populer</div>
                <div className="mufa-news-detail-widgetBody">
                  <div className="mufa-news-detail-tagsCloud">
                    {SIDEBAR_TAGS.map((tag) => (
                      <button
                        key={tag}
                        className="mufa-news-detail-tagFilter"
                        onClick={() => handleTagClick(tag)}
                      >
                        <FaTag size={11} />
                        <span>#{tag}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* SIDEBAR TOGGLE (MOBILE) */}
      <button
        className="mufa-news-detail-sidebarToggle"
        onClick={() => setIsSidebarOpen((v) => !v)}
      >
        <FaFilter size={16} />
        <span>Filter</span>
      </button>

      {
        isSidebarOpen && (
          <div
            className="mufa-news-detail-backdrop"
            onClick={() => setIsSidebarOpen(false)}
          />
        )
      }
    </section >
  );
}
