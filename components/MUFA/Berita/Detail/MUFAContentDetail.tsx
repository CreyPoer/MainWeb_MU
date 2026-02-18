"use client";


import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaSearch, FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaWhatsapp, FaFilter, FaTimes, FaTag, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MufaNewsDetail } from "../newsData";
import { useLanguage } from "@/contexts/LanguageContext";

interface MUFAContentDetailProps {
  newsItem: any; // MufaNewsDetail; replaced with any to accommodate API structure variation
}

// const SIDEBAR_TAGS = ... (We will fetch these or use passed props if we want)
// For now, let's keep hardcoded or fetch. The plan said "Implement tag fetching". 
// Let's use state for tags.

export default function MUFAContentDetail({ newsItem }: MUFAContentDetailProps) {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarTags, setSidebarTags] = useState<string[]>([]);

  React.useEffect(() => {
    async function fetchTags() {
      try {
        const res = await fetch('/api/tags?category=MUFA');
        const data = await res.json();
        if (Array.isArray(data)) {
          setSidebarTags(data);
        }
      } catch (e) {
        console.error("Failed to fetch tags", e);
      }
    }
    fetchTags();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/${lang}/mufa/berita?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleTagClick = (tag: string) => {
    router.push(`/${lang}/mufa/berita?tag=${encodeURIComponent(tag)}`);
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

            <div className="mufa-news-detail-meta" style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
              <span className="mufa-news-detail-category">{newsItem.category}</span>
              <span className="mufa-news-detail-date">{newsItem.date}</span>
              <div style={{ marginLeft: "auto", display: "flex", gap: "8px", alignItems: "center" }}>
                {[
                  { Icon: FaFacebookF, href: "https://www.facebook.com/Maduraunitedfc.official/", bg: "#1877F2" },
                  { Icon: FaTwitter, href: "https://x.com/MaduraUnitedFC", bg: "#000000" },
                  { Icon: FaInstagram, href: "https://www.instagram.com/akademimaduraunited?igsh=MWJyZjEzZHI4d2YwMw==", bg: "", gradient: "linear-gradient(45deg, #FFDC80, #FCAF45, #F77737, #F56040, #FD1D1D, #E1306C, #C13584, #833AB4, #405DE6)" },
                  { Icon: FaYoutube, href: "https://youtube.com/@maduraunitedacademy812?si=flyzuMc19qy9Ai-I", bg: "#FF0000" },
                ].map(({ Icon, href, bg, gradient }, idx) => (
                  <a key={idx} href={href} target="_blank" rel="noopener noreferrer" style={{
                    width: "32px", height: "32px", borderRadius: "50%",
                    ...(gradient ? { background: gradient } : { backgroundColor: bg }),
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "white", transition: "opacity 0.3s, transform 0.3s",
                    textDecoration: "none", border: "2px solid white"
                  }} className="mufa-social-brand-icon">
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            <div className="mufa-news-detail-content">
              {/* API content is HTML string, usually. If it is array of paragraphs, map it. 
                  Our API route maps body to 'content'. 
                  If it comes as HTML string from wysiwyg:
               */}
              {typeof newsItem.content === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
              ) : (
                Array.isArray(newsItem.content) && newsItem.content.map((paragraph: string, idx: number) => (
                  <p key={idx}>{paragraph}</p>
                ))
              )}
              {newsItem.penerbit && newsItem.link_berita && (
                <p className="mt-4 text-sm italic text-gray-400">
                  {t('mufa.detail.sourced_from')} <a href={newsItem.link_berita} target="_blank" rel="noopener noreferrer" className="text-red-500 underline hover:text-red-400 transition-colors">{newsItem.penerbit}</a>
                </p>
              )}
            </div>

            <hr className="mufa-news-detail-divider" />

            {/* TAGS & SHARE ROW */}
            <div className="mufa-news-detail-bottomRow">
              <div className="mufa-news-detail-tagsRow">
                <span className="mufa-news-detail-tagsLabel">{t('mufa.detail.tags_label')}</span>
                {newsItem.tags.slice(0, 4).map((tag: string) => (
                  <span key={tag} className="mufa-news-detail-tagPill" onClick={() => handleTagClick(tag)} style={{ cursor: "pointer" }}>
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="mufa-news-detail-shareRow">
                <span className="mufa-news-detail-shareLabel">{t('mufa.detail.share_label')}</span>
                {[
                  {
                    Icon: FaFacebookF,
                    label: "Share to Facebook",
                    onClick: () => {
                      const url = window.location.href;
                      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
                    }
                  },
                  {
                    Icon: FaTwitter,
                    label: "Share to Twitter/X",
                    onClick: () => {
                      const url = window.location.href;
                      const text = newsItem.title;
                      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank', 'width=600,height=400');
                    }
                  },
                  {
                    Icon: FaInstagram,
                    label: "Copy link for Instagram",
                    onClick: () => {
                      navigator.clipboard.writeText(window.location.href).then(() => {
                        alert(t('mufa.detail.link_copied'));
                      });
                    }
                  },
                  {
                    Icon: FaWhatsapp,
                    label: "Share to WhatsApp",
                    onClick: () => {
                      const url = window.location.href;
                      const text = `${newsItem.title} - ${url}`;
                      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                    }
                  },
                ].map(({ Icon, label, onClick }, idx) => (
                  <button key={idx} title={label} onClick={onClick} className="mufa-news-detail-shareBtn">
                    <Icon size={14} />
                  </button>
                ))}
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
                <h3>{t('mufa.detail.about_author')} {newsItem.author}</h3>
                <p className="mufa-news-detail-authorDesc">
                  {t('mufa.detail.author_desc')}
                </p>
                <button className="mufa-news-detail-authorLink">
                  {t('mufa.detail.view_all_by')} {newsItem.author}
                </button>
              </div>
            </div>

            {/* PREVIOUS / NEXT POST NAVIGATION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8" data-aos="fade-up">
              {/* Previous Post */}
              {newsItem.previous ? (
                <Link
                  href={`/${lang}/mufa/berita/${newsItem.previous.id}`}
                  className="group relative flex flex-col p-6 rounded-2xl bg-red-500 border border-red-500 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 -translate-x-[150%] skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />

                  <div className="relative z-10 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-white mb-2">
                    <FaChevronLeft size={10} />
                    <span>{t('mufa.detail.previous_post')}</span>
                  </div>
                  <h4 className="relative z-10 text-sm md:text-base font-bold text-dark-900 group-hover:text-white transition-colors line-clamp-2">
                    {newsItem.previous.title}
                  </h4>
                </Link>
              ) : (
                <div /> /* Empty placeholder if no prev post */
              )}

              {/* Next Post */}
              {newsItem.next ? (
                <Link
                  href={`/${lang}/mufa/berita/${newsItem.next.id}`}
                  className="group relative flex flex-col p-6 rounded-2xl bg-red-500 border border-red-500 shadow-sm hover:shadow-lg transition-all duration-300 text-right items-end overflow-hidden"
                >
                  <div className="absolute inset-0 -translate-x-[150%] skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />

                  <div className="relative z-10 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-white mb-2">
                    <span>{t('mufa.detail.next_post')}</span>
                    <FaChevronRight size={10} />
                  </div>
                  <h4 className="relative z-10 text-sm md:text-base font-bold text-dark-900 group-hover:text-white transition-colors line-clamp-2">
                    {newsItem.next.title}
                  </h4>
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* YOU MAY ALSO LIKE SECTION */}
            <div className="mt-12 md:mt-16" data-aos="fade-up">
              <h3 className="text-xl md:text-2xl font-extrabold text-slate-500 uppercase tracking-wide mb-6">
                {t('mufa.detail.you_may_like')}
              </h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {newsItem.related && newsItem.related.map((item: any) => (
                  <article
                    key={item.id}
                    className="group flex flex-col overflow-hidden rounded-3xl bg-slate-900/80 border border-slate-700/70 shadow-[0_18px_45px_rgba(0,0,0,0.65)] hover:border-red-500/70 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(0,0,0,0.9)] transition-transform duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={item.image || '/logo.png'}
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
                        href={`/${lang}/mufa/berita/${item.id}`}
                        className="text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-red-300 transition"
                      >
                        {item.title}
                      </Link>
                      <div className="mt-auto pt-2 border-t border-slate-700/70 flex justify-end">
                        <Link
                          href={`/${lang}/mufa/berita/${item.id}`}
                          className="inline-flex px-4 py-2 rounded-full bg-red-600 text-white text-[10px] font-bold tracking-wider uppercase hover:bg-red-700 transition"
                        >
                          {t('mufa.detail.read_more')}
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
              <h4>{t('mufa.detail.filter_insight')}</h4>
              <button onClick={() => setIsSidebarOpen(false)}>
                <FaTimes size={18} />
              </button>
            </div>

            <div className="mufa-news-detail-sidebarInner">
              {/* SEARCH */}
              <div className="mufa-news-detail-widget">
                <div className="mufa-news-detail-widgetHeader">{t('mufa.detail.search_news')}</div>
                <div className="mufa-news-detail-widgetBody">
                  <div className="mufa-news-detail-searchWrapper">
                    <button onClick={handleSearch} className="mufa-news-detail-searchIconBtn">
                      <FaSearch className="mufa-news-detail-searchIcon" size={14} />
                    </button>
                    <input
                      type="text"
                      placeholder={t('mufa.detail.search_placeholder')}
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
                <div className="mufa-news-detail-widgetHeader">{t('mufa.berita_page.popular_tags')}</div>
                <div className="mufa-news-detail-widgetBody">
                  <div className="mufa-news-detail-tagsCloud">
                    {sidebarTags.map((tag: string) => (
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
