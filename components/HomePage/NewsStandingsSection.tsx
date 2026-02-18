"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

interface NewsItem {
    id: number;
    title: string;
    description: string;
    image: string;
    date: string;
    slug?: string;
}

interface StandingsRow {
    id: string | number;
    name: string;
    played: number;
    w: number;
    d: number;
    l: number;
    gd: number;
    pts: number;
    logo: string;
    rank: number;
    type?: string;
}

export default function NewsStandingsSection() {
    const { lang, t } = useLanguage();
    const [newsIndex, setNewsIndex] = useState(0);
    const [newsData, setNewsData] = useState<NewsItem[]>([]);
    const [standingsData, setStandingsData] = useState<StandingsRow[]>([]);
    const [isLoadingNews, setIsLoadingNews] = useState(true);
    const [isLoadingStandings, setIsLoadingStandings] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await fetch('/api/news');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setNewsData(data);
                } else if (data.data && Array.isArray(data.data)) {
                    setNewsData(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch news", error);
            } finally {
                setIsLoadingNews(false);
            }
        };

        const fetchStandings = async () => {
            try {
                const res = await fetch('/api/standings');
                const data = await res.json();
                let tableData: any[] = [];

                if (Array.isArray(data)) {
                    tableData = data;
                } else if (data.data && Array.isArray(data.data)) {
                    tableData = data.data;
                }

                if (tableData.length > 0) {
                    const mapped = tableData.map((item: any, index: number) => ({
                        id: item.team, // Use team name as ID
                        name: item.team,
                        played: parseInt(item.play),
                        w: parseInt(item.w),
                        d: parseInt(item.d),
                        l: parseInt(item.l),
                        gd: parseInt(item.gd),
                        pts: parseInt(item.pt),
                        logo: item.logo || '',
                        rank: index + 1
                    }));
                    setStandingsData(mapped);
                }
            } catch (error) {
                console.error("Failed to fetch standings", error);
            } finally {
                setIsLoadingStandings(false);
            }
        };

        fetchNews();
        fetchStandings();
    }, []);

    // --- NEWS LOGIC ---
    const handleNextNews = () => {
        if (newsData.length === 0) return;
        setNewsIndex((prev) => (prev + 1) % newsData.length);
    };

    const handlePrevNews = () => {
        if (newsData.length === 0) return;
        setNewsIndex((prev) => (prev - 1 + newsData.length) % newsData.length);
    };

    const maxVisible = 4;
    let start = 0;
    if (newsIndex >= maxVisible) {
        start = newsIndex - maxVisible + 1;
    }
    // Clamp start
    if (start > newsData.length - maxVisible) start = newsData.length - maxVisible;
    if (start < 0) start = 0;

    const visibleItems = newsData.slice(start, start + maxVisible);

    const standingsRows = useMemo(() => {
        if (standingsData.length === 0) return [];

        const total = standingsData.length;
        // Robust finding of Madura United
        const muIndex = standingsData.findIndex((t) =>
            t.name.toLowerCase().includes("madura united") ||
            t.name.toLowerCase() === "madura united fc" ||
            t.name.toLowerCase() === "madura united"
        );

        let rowsToDisplay: StandingsRow[] = [];
        const seenIds = new Set<string | number>();

        // Helper to push row if unique
        const pushRow = (idx: number) => {
            if (idx >= 0 && idx < total) {
                const item = standingsData[idx];
                if (!seenIds.has(item.id)) {
                    rowsToDisplay.push({ ...item, type: "data" });
                    seenIds.add(item.id);
                }
            }
        };

        const pushSeparator = () => {
            if (rowsToDisplay.length > 0 && rowsToDisplay[rowsToDisplay.length - 1].type !== "separator") {
                rowsToDisplay.push({ id: "sep-" + Math.random(), name: "...", rank: 0, played: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0, logo: "", type: "separator" });
            }
        };

        // Always show Top 3
        pushRow(0);
        pushRow(1);
        pushRow(2);

        // If MU not found, show Top 3 ... Bottom 3
        if (muIndex === -1) {
            pushSeparator();
            pushRow(total - 3);
            pushRow(total - 2);
            pushRow(total - 1);
            return rowsToDisplay;
        }

        // Logic based on MU Position

        // CASE 1: MU in Top 3 (Index < 3) 
        // OR 
        // CASE 3: MU in Bottom 3 (Index >= total - 3)
        // -> Show Top 3 ... Bottom 3
        if (muIndex < 3 || muIndex >= total - 3) {
            // Gap between Top 3 and Bottom 3?
            if (total > 6) {
                pushSeparator();
            }
            // Show Bottom 3
            // Ensure we don't duplicate if total is small (e.g. 5 teams)
            // Indices: 0,1,2 ... total-3, total-2, total-1
            pushRow(total - 3);
            pushRow(total - 2);
            pushRow(total - 1);
        }

        // CASE 2: MU in Middle
        // (Index >= 3 AND Index < total - 3)
        else {
            // Check connectivity to Top 3 (Index 2)
            // If MU is Rank 4 (Index 3), needed direct connection?
            // "kalo tim madura united fc berada di klasemen 4 itu kan masuk konsep 2 nah "..." diatas barid miliki ... tidak perlu di tampilkan"
            if (muIndex === 3) {
                // Direct append (no separator)
                pushRow(muIndex);
            } else {
                // Gap
                pushSeparator();
                pushRow(muIndex);
            }

            // Check connectivity to Bottom
            // Concept 2 says: Show Bottom 2 (total-2, total-1)
            // Check relationship between muIndex and total-2

            // "begitupun kalo tim madura united fc berada di klasmeen nomor 4 dari yang terbawah tu "..." dibawah baris data ... tidak perlu di tampilkan"
            // Rank 4 from bottom is Index = total - 4.
            // Next items are total-3, total-2, total-1.
            // Concept 2 usually shows Bottom 2 (total-2).
            // Gap is total-3.

            if (muIndex === total - 4) {
                // Connect directly to bottom
                // Fill gap (total-3)
                pushRow(total - 3);
                // Then Bottom 2
                pushRow(total - 2);
                pushRow(total - 1);
            } else {
                // Gap
                pushSeparator();
                // Show Bottom 2
                pushRow(total - 2);
                pushRow(total - 1);
            }
        }

        return rowsToDisplay;

    }, [standingsData]);

    if (isLoadingNews && isLoadingStandings) {
        return <div style={{ padding: '100px', textAlign: 'center' }}>{t('common.loading')}</div>;
    }

    const currentNews = newsData[newsIndex] || { id: 0, title: '', description: '', image: '', date: '' };

    return (
        <section
            className="news-standings-section"
            style={{
                maxWidth: '1280px',
                margin: '0 auto',
                paddingTop: '100px',
                paddingBottom: '50px',
            }}
        >

            {/* Grid Container */}
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '24px', alignItems: 'stretch' }}>

                {/* --- LATEST NEWS COLUMN (60%) --- */}
                <div style={{
                    flex: '1 1 58%',
                    minWidth: '300px',
                    display: 'flex',
                    flexDirection: 'column'
                }} className="news-widget-responsive-col">

                    {/* Title */}
                    <div style={{ marginBottom: '24px' }} data-aos="fade-right">
                        <h4 style={{ color: '#DC2626', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '14px', marginBottom: '4px' }}>{t('section.our_blog')}</h4>
                        <h2 style={{ fontSize: '32px', fontWeight: '900', textTransform: 'uppercase', color: '#111827', lineHeight: '1.2' }}>
                            {t('section.recent_club_news')} <span style={{ color: '#DC2626' }}>{t('section.news_highlight')}</span>
                        </h2>
                    </div>

                    {/* Widget Card */}
                    <div style={{
                        backgroundColor: '#ffffff',
                        paddingTop: '16px',
                        paddingBottom: '16px',
                        paddingLeft: '16px',
                        paddingRight: '16px',
                        borderRadius: '12px',
                        border: '1px solid #f3f4f6',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '16px',
                        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                        height: '600px'
                    }} className="news-widget-responsive-card" data-aos="fade-up" data-aos-delay="100">

                        {/* Main Content (Left) */}
                        <div className="news-main-image" style={{ flex: '1', position: 'relative', overflow: 'hidden', borderRadius: '8px', height: '100%' }}>
                            {newsData.length > 0 && (
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentNews.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        style={{ position: 'relative', width: '100%', height: '100%' }}
                                    >
                                        <Image
                                            src={currentNews.image || '/images/placeholder.png'}
                                            alt={currentNews.title}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                        {/* Overlay */}
                                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4), transparent)' }} />

                                        {/* Text */}
                                        <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '32px', width: '100%', color: 'white', zIndex: 10 }}>
                                            <motion.h3
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1, duration: 0.3 }}
                                                style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', lineHeight: 1.1 }}
                                            >
                                                {currentNews.title}
                                            </motion.h3>
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2, duration: 0.3 }}
                                                style={{ fontSize: '16px', color: '#e5e7eb', marginBottom: '24px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                                                dangerouslySetInnerHTML={{ __html: currentNews.description }}
                                            />
                                            <Link href={`/${lang}/media/berita/${currentNews.slug || currentNews.id}`} passHref>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    style={{
                                                        backgroundColor: '#DC2626', color: 'white', padding: '12px 28px',
                                                        fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase',
                                                        borderRadius: '9999px', border: 'none', cursor: 'pointer',
                                                        boxShadow: '0 4px 6px -1px rgba(220, 38, 38, 0.3)'
                                                    }}
                                                >
                                                    {t('common.read_more')}
                                                </motion.button>
                                            </Link>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            )}
                        </div>

                        {/* Thumbnails List (Right) */}
                        <div className="news-list" style={{ width: '30%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div className="news-thumbnails-inner" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', overflow: 'hidden' }}>
                                {visibleItems.map((item) => {
                                    const isActive = item.id === currentNews.id;
                                    return (
                                        <div
                                            key={item.id}
                                            className="news-thumbnail-item"
                                            onClick={() => setNewsIndex(newsData.findIndex(n => n.id === item.id))}
                                            style={{
                                                position: 'relative',
                                                cursor: 'pointer',
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                border: isActive ? '3px solid #DC2626' : '3px solid transparent',
                                                opacity: isActive ? 1 : 0.7,
                                                transition: 'all 0.3s',
                                                flex: 1
                                            }}
                                        >
                                            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                                                <Image
                                                    src={item.image || '/images/placeholder.png'}
                                                    alt={item.title}
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                />
                                                {isActive && (
                                                    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(220, 38, 38, 0.2)', mixBlendMode: 'multiply' }} />
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Arrows */}
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', paddingTop: '8px' }}>
                                <button
                                    onClick={handlePrevNews}
                                    style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#DC2626', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}
                                >
                                    <FaChevronLeft size={16} />
                                </button>
                                <button
                                    onClick={handleNextNews}
                                    style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#DC2626', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}
                                >
                                    <FaChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- LEAGUE TABLE COLUMN (40%) --- */}
                <div style={{
                    flex: '1 1 38%',
                    minWidth: '300px',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {/* Title */}
                    <div style={{ marginBottom: '24px' }} data-aos="fade-left">
                        <h5 style={{ fontSize: '14px', fontWeight: 'bold', color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{t('section.season')}</h5>
                        <h3 style={{ fontSize: '32px', fontWeight: '900', textTransform: 'uppercase', color: '#111827', lineHeight: '1.2' }}>{t('section.league_table')}</h3>
                    </div>

                    {/* Widget Card */}
                    <div style={{
                        backgroundColor: '#ffffff',
                        paddingBottom: '16px',
                        borderRadius: '12px',
                        border: '1px solid #f3f4f6',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '600px',
                        width: '100%',
                        overflow: 'hidden'
                    }} className="standings-widget-card" data-aos="fade-up" data-aos-delay="200">
                        <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', overflowX: 'auto' }}>
                            <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
                                <thead style={{ backgroundColor: '#B91C1C', color: 'white', height: '56px', position: 'sticky', top: 0, zIndex: 10 }}>
                                    <tr>
                                        <th style={{ padding: '12px', textAlign: 'center', width: '40px' }}>#</th>
                                        <th style={{ padding: '12px', textAlign: 'left' }}>{t('section.football_club')}</th>
                                        <th style={{ padding: '12px', textAlign: 'center' }}>{t('common.played')}</th>
                                        <th style={{ padding: '12px', textAlign: 'center' }}>{t('common.won')}</th>
                                        <th style={{ padding: '12px', textAlign: 'center' }}>{t('common.draw')}</th>
                                        <th style={{ padding: '12px', textAlign: 'center' }}>{t('common.lost')}</th>
                                        <th style={{ padding: '12px', textAlign: 'center' }}>{t('common.pts')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {standingsRows.map((row, idx) => {
                                        if (row.type === "separator") {
                                            return (
                                                <tr key={row.id}>
                                                    <td colSpan={7} style={{ textAlign: 'center', fontWeight: '900', color: '#6B7280', padding: '8px', backgroundColor: '#F9FAFB', fontSize: '20px', letterSpacing: '4px', lineHeight: '1' }}>. . .</td>
                                                </tr>
                                            )
                                        }
                                        const isMU = row.name.toLowerCase().includes("madura united") || row.name.toLowerCase() === "madura united fc";
                                        const rowStyle = isMU ? { backgroundColor: '#FEE2E2', borderLeft: '6px solid #B91C1C' } : { borderBottom: '1px solid #F3F4F6', backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB' };

                                        return (
                                            <tr key={row.id} style={rowStyle}>
                                                <td className="standings-cell-rank" style={{ padding: '16px 8px', textAlign: 'center', fontWeight: 'bold', fontSize: '16px' }}>{row.rank}</td>
                                                <td className="standings-cell-team" style={{ padding: '16px 8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <div className="team-logo" style={{ width: '32px', height: '32px', position: 'relative', flexShrink: 0 }}>
                                                        {row.logo && (row.logo.startsWith("http") || row.logo.startsWith("/")) ? (
                                                            <Image src={row.logo} alt={row.name} fill style={{ objectFit: 'contain' }} />
                                                        ) : (
                                                            <div style={{ width: '100%', height: '100%', backgroundColor: '#E5E7EB', borderRadius: '50%', fontSize: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{row.name.substring(0, 2)}</div>
                                                        )}
                                                    </div>
                                                    <span className="team-name" style={{
                                                        color: isMU ? '#B91C1C' : '#111827',
                                                        fontWeight: '800',
                                                        fontSize: '14px',
                                                        textTransform: 'uppercase',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        maxWidth: '170px'
                                                    }}>
                                                        {row.name}
                                                    </span>
                                                </td>
                                                <td className="standings-cell-stat" style={{ padding: '16px 8px', textAlign: 'center', fontWeight: '600' }}>{row.played}</td>
                                                <td className="standings-cell-stat" style={{ padding: '16px 8px', textAlign: 'center', fontWeight: '600' }}>{row.w}</td>
                                                <td className="standings-cell-stat" style={{ padding: '16px 8px', textAlign: 'center', fontWeight: '600' }}>{row.d}</td>
                                                <td className="standings-cell-stat" style={{ padding: '16px 8px', textAlign: 'center', fontWeight: '600' }}>{row.l}</td>
                                                <td className="standings-cell-pts" style={{ padding: '16px 8px', textAlign: 'center', fontWeight: '900', fontSize: '16px' }}>{row.pts}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div style={{ marginTop: 'auto', padding: '16px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #f3f4f6' }}>
                            <Link href={`/${lang}/pertandingan/klasemen`} passHref>
                                <motion.button
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#DC2626', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                    {t('section.fixtures_and_matches')} <FaArrowRight />
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>

            {/* Responsive Styles Injection */}
            <style jsx>{`
        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #f3f4f6;
            border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #B91C1C;
            border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #991b1b;
        }

        @media (max-width: 768px) {
            .news-widget-responsive-card {
                flex-direction: column !important;
                height: auto !important; /* Allow auto height on mobile */
            }
            .news-main-image {
                width: 100% !important;
                height: 300px !important;
                flex: none !important;
            }
            .team-name {
                max-width: 220px !important;
            }
            .news-list {
                width: 100% !important;
                height: auto !important;
                flex: none !important;
            }
            .news-thumbnails-inner {
                flex-direction: row !important;
                gap: 8px !important;
                height: auto !important;
            }
            .news-thumbnail-item {
                 flex: 1 !important;
                 height: 80px !important;
                 width: auto !important;
            }
            /* Override flex: 1 for thumbnails on mobile to make them visible and equal width */
        }

        @media (max-width: 425px) {
            .news-standings-section {
                padding-top: 140px !important;
            }
            
            /* Table Adjustments for Mobile */
            th, 
            .standings-cell-rank,
            .standings-cell-team,
            .standings-cell-stat,
            .standings-cell-pts {
                padding: 8px 4px !important;
                font-size: 11px !important;
            }
            
            .team-logo {
                width: 24px !important;
                height: 24px !important;
            }

            .team-name {
                font-size: 10px !important;
                max-width: 150px !important;
            }
            
            .standings-cell-rank {
                font-size: 12px !important;
            }
            
            .standings-cell-pts {
                font-size: 12px !important;
            }
            .standings-widget-card {
                height: auto !important;
            }
        }
      `}</style>
        </section>
    );
}
