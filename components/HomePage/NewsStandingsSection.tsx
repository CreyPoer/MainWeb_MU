"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa";

// --- DUMMY DATA ---

const NEWS_DATA = [
    {
        id: 1,
        title: "Madura United Secure Big Win Against Persib",
        description: "Laskar Sape Kerrab showed dominance in a thrilling match at home, securing three crucial points in the title race.",
        image: "/images/dummy/news_match_action_1769655568450.png",
        date: "29 Jan 2026",
    },
    {
        id: 2,
        title: "Training Intensity Ramps Up Ahead of Derby",
        description: "The squad is being put through their paces as the coaching staff prepares for the intense derby clash next week.",
        image: "/images/dummy/news_training_1769655590311.png",
        date: "28 Jan 2026",
    },
    {
        id: 3,
        title: "Coach Praises Team Spirit After Comeback",
        description: "Despite an early setback, the team showed resilience and tactical discipline to turn the game around.",
        image: "/images/dummy/news_coach_1769655607248.png",
        date: "27 Jan 2026",
    },
    {
        id: 4,
        title: "Goal of the Month: Amazing Strike by Lulinha",
        description: "A stunning long-range effort has been voted as the club's goal of the month by fans.",
        image: "/images/dummy/news_goal_1769655624953.png",
        date: "25 Jan 2026",
    },
    {
        id: 5,
        title: "Academy Players Shine in Friendly Match",
        description: "Young prospects from the academy impressed the first-team staff during a mid-week friendly.",
        image: "/images/dummy/news_training_1769655590311.png", // Reusing image
        date: "24 Jan 2026",
    },
];

// 18 Teams for BRI Liga 1 2025/2026 (Dummy Data based on real teams)
const STANDINGS_DATA = [
    { id: "arema", name: "Arema FC", played: 16, w: 10, d: 3, l: 3, gd: 16, pts: 33, logo: "https://upload.wikimedia.org/wikipedia/id/thumb/4/40/Logo_Arema_FC_2017_logo.svg/250px-Logo_Arema_FC_2017_logo.svg.png" },
    { id: "borneo", name: "Borneo FC", played: 16, w: 9, d: 4, l: 3, gd: 14, pts: 31, logo: "https://upload.wikimedia.org/wikipedia/id/4/4d/Logo_Borneo_FC.svg" },
    { id: "persib", name: "Persib Bandung", played: 16, w: 9, d: 3, l: 4, gd: 12, pts: 30, logo: "https://upload.wikimedia.org/wikipedia/id/thumb/0/0d/Logo_Persib_Bandung.png/330px-Logo_Persib_Bandung.png" },
    { id: "persebaya", name: "Persebaya Surabaya", played: 16, w: 8, d: 5, l: 3, gd: 8, pts: 29, logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e6/Persebaya_Surabaya_logo.svg/1200px-Persebaya_Surabaya_logo.svg.png" },
    { id: "psis", name: "PSIS Semarang", played: 16, w: 8, d: 4, l: 4, gd: 5, pts: 28, logo: "https://upload.wikimedia.org/wikipedia/id/thumb/7/7b/PSIS_Semarang_Logo_2019.svg/1200px-PSIS_Semarang_Logo_2019.svg.png" },
    { id: "persija", name: "Persija Jakarta", played: 16, w: 7, d: 6, l: 3, gd: 4, pts: 27, logo: "https://upload.wikimedia.org/wikipedia/id/thumb/1/1d/Logo_Persija_Jakarta.svg/1200px-Logo_Persija_Jakarta.svg.png" },
    { id: "bali", name: "Bali United", played: 16, w: 7, d: 5, l: 4, gd: 6, pts: 26, logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/36/Bali_United_FC_logo.svg/1200px-Bali_United_FC_logo.svg.png" },
    { id: "dewa", name: "Dewa United", played: 16, w: 6, d: 7, l: 3, gd: 3, pts: 25, logo: "https://upload.wikimedia.org/wikipedia/id/thumb/5/53/Dewa_United_FC_logo.svg/1200px-Dewa_United_FC_logo.svg.png" },
    { id: "madura", name: "Madura United FC", played: 16, w: 6, d: 5, l: 5, gd: 2, pts: 23, logo: "https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png" },
    { id: "persik", name: "Persik Kediri", played: 16, w: 6, d: 4, l: 6, gd: 0, pts: 22, logo: "https://upload.wikimedia.org/wikipedia/id/thumb/e/e6/Persik_Kediri_Logo_2019.svg/1200px-Persik_Kediri_Logo_2019.svg.png" },
    { id: "psm", name: "PSM Makassar", played: 16, w: 5, d: 6, l: 5, gd: -1, pts: 21, logo: "https://upload.wikimedia.org/wikipedia/id/thumb/1/1f/Logo_PSM_Makassar.svg/1200px-Logo_PSM_Makassar.svg.png" },
    { id: "persita", name: "Persita Tangerang", played: 16, w: 5, d: 4, l: 7, gd: -3, pts: 19, logo: "https://upload.wikimedia.org/wikipedia/id/thumb/6/6b/Logo_Persita_Tangerang_2020.svg/1200px-Logo_Persita_Tangerang_2020.svg.png" },
    { id: "barito", name: "Barito Putera", played: 16, w: 4, d: 5, l: 7, gd: -5, pts: 17, logo: "https://upload.wikimedia.org/wikipedia/id/thumb/5/53/Logo_Barito_Putera.svg/1200px-Logo_Barito_Putera.svg.png" },
    { id: "pss", name: "PSS Sleman", played: 16, w: 4, d: 4, l: 8, gd: -7, pts: 16, logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/32/PSS_Sleman_logo.svg/1200px-PSS_Sleman_logo.svg.png" },
    { id: "persis", name: "Persis Solo", played: 16, w: 3, d: 5, l: 8, gd: -9, pts: 14, logo: "https://upload.wikimedia.org/wikipedia/id/thumb/7/7b/Logo_Persis_Solo.svg/1200px-Logo_Persis_Solo.svg.png" },
    { id: "malut", name: "Malut United", played: 16, w: 3, d: 4, l: 9, gd: -10, pts: 13, logo: "https://upload.wikimedia.org/wikipedia/id/archive/0/08/20230605151528%21Malut_United_FC_Logo.png" },
    { id: "psbs", name: "PSBS Biak", played: 16, w: 2, d: 4, l: 10, gd: -12, pts: 10, logo: "https://upload.wikimedia.org/wikipedia/id/9/9b/Logo_PSBS_Biak_baru.png" },
    { id: "semen", name: "Semen Padang", played: 16, w: 1, d: 5, l: 10, gd: -15, pts: 8, logo: "https://upload.wikimedia.org/wikipedia/id/1/1e/Semen_Padang_FC.png" },
];

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
    const [newsIndex, setNewsIndex] = useState(0);

    // --- NEWS LOGIC ---
    const handleNextNews = () => {
        setNewsIndex((prev) => (prev + 1) % NEWS_DATA.length);
    };

    const handlePrevNews = () => {
        setNewsIndex((prev) => (prev - 1 + NEWS_DATA.length) % NEWS_DATA.length);
    };

    const maxVisible = 4;
    let start = 0;
    if (newsIndex >= maxVisible) {
        start = newsIndex - maxVisible + 1;
    }
    // Clamp start
    if (start > NEWS_DATA.length - maxVisible) start = NEWS_DATA.length - maxVisible;
    if (start < 0) start = 0;

    const visibleItems = NEWS_DATA.slice(start, start + maxVisible);

    // --- STANDINGS LOGIC (Concept 2: Top 3 ... MU ... Bottom 2) ---
    const standingsRows = useMemo(() => {
        const muIndex = STANDINGS_DATA.findIndex((t) => t.id === "madura");
        const total = STANDINGS_DATA.length;

        let rowsToDisplay: StandingsRow[] = [];

        const pushRow = (idx: number) => {
            rowsToDisplay.push({ ...STANDINGS_DATA[idx], rank: idx + 1, type: "data" });
        };
        const pushSeparator = () => {
            rowsToDisplay.push({ id: "sep-" + Math.random(), name: "...", rank: 0, played: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0, logo: "", type: "separator" });
        };

        // Show Top 3
        [0, 1, 2].forEach(i => pushRow(i));

        pushSeparator();

        // Show MU
        pushRow(muIndex);

        pushSeparator();

        // Show Bottom 2
        const startBottom = total - 2;
        for (let i = startBottom; i < total; i++) {
            pushRow(i);
        }

        return rowsToDisplay;

    }, []);

    return (
        <section
            style={{
                maxWidth: '1280px',
                margin: '0 auto',
                paddingTop: '100px', // REDUCED from 200px to 140px
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
                        <h4 style={{ color: '#DC2626', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '14px', marginBottom: '4px' }}>Our Blog</h4>
                        <h2 style={{ fontSize: '32px', fontWeight: '900', textTransform: 'uppercase', color: '#111827', lineHeight: '1.2' }}>
                            Recent Club <span style={{ color: '#DC2626' }}>News</span>
                        </h2>
                    </div>

                    {/* Widget Card */}
                    <div style={{
                        backgroundColor: '#ffffff',
                        // EXPLICIT PADDING PROPERTIES to avoid conflict errors
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
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={NEWS_DATA[newsIndex].id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ position: 'relative', width: '100%', height: '100%' }}
                                >
                                    <Image
                                        src={NEWS_DATA[newsIndex].image}
                                        alt={NEWS_DATA[newsIndex].title}
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
                                            {NEWS_DATA[newsIndex].title}
                                        </motion.h3>
                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2, duration: 0.3 }}
                                            style={{ fontSize: '16px', color: '#e5e7eb', marginBottom: '24px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                                        >
                                            {NEWS_DATA[newsIndex].description}
                                        </motion.p>
                                        <Link href={`/media/berita/${NEWS_DATA[newsIndex].id}`} passHref>
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
                                                Read More
                                            </motion.button>
                                        </Link>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Thumbnails List (Right) */}
                        <div className="news-list" style={{ width: '30%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div className="news-thumbnails-inner" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', overflow: 'hidden' }}>
                                {visibleItems.map((item) => {
                                    const isActive = item.id === NEWS_DATA[newsIndex].id;
                                    return (
                                        <div
                                            key={item.id}
                                            className="news-thumbnail-item"
                                            onClick={() => setNewsIndex(NEWS_DATA.findIndex(n => n.id === item.id))}
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
                                                    src={item.image}
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
                        <h5 style={{ fontSize: '14px', fontWeight: 'bold', color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Season 2025-2026</h5>
                        <h3 style={{ fontSize: '32px', fontWeight: '900', textTransform: 'uppercase', color: '#111827', lineHeight: '1.2' }}>League Table</h3>
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
                    }} data-aos="fade-up" data-aos-delay="200">
                        <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', overflowX: 'auto' }}>
                            <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
                                <thead style={{ backgroundColor: '#B91C1C', color: 'white', height: '56px', position: 'sticky', top: 0, zIndex: 10 }}>
                                    <tr>
                                        <th style={{ padding: '12px', textAlign: 'center', width: '40px' }}>#</th>
                                        <th style={{ padding: '12px', textAlign: 'left' }}>FOOTBALL CLUB</th>
                                        <th style={{ padding: '12px', textAlign: 'center' }}>P</th>
                                        <th style={{ padding: '12px', textAlign: 'center' }}>W</th>
                                        <th style={{ padding: '12px', textAlign: 'center' }}>D</th>
                                        <th style={{ padding: '12px', textAlign: 'center' }}>L</th>
                                        <th style={{ padding: '12px', textAlign: 'center' }}>PTS</th>
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
                                        const isMU = row.id === "madura";
                                        const rowStyle = isMU ? { backgroundColor: '#FEF2F2', borderLeft: '6px solid #DC2626' } : { borderBottom: '1px solid #F3F4F6' };

                                        return (
                                            <tr key={row.id} style={rowStyle}>
                                                <td style={{ padding: '16px 8px', textAlign: 'center', fontWeight: 'bold', fontSize: '16px' }}>{row.rank}</td>
                                                <td style={{ padding: '16px 8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <div style={{ width: '32px', height: '32px', position: 'relative', flexShrink: 0 }}>
                                                        {row.logo && (row.logo.startsWith("http") || row.logo.startsWith("/")) ? (
                                                            <Image src={row.logo} alt={row.name} fill style={{ objectFit: 'contain' }} />
                                                        ) : (
                                                            <div style={{ width: '100%', height: '100%', backgroundColor: '#E5E7EB', borderRadius: '50%', fontSize: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{row.name.substring(0, 2)}</div>
                                                        )}
                                                    </div>
                                                    <span style={{
                                                        color: isMU ? '#B91C1C' : '#111827',
                                                        fontWeight: '800',
                                                        fontSize: '14px',
                                                        textTransform: 'uppercase',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        maxWidth: '120px'
                                                    }}>
                                                        {row.name}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '16px 8px', textAlign: 'center', fontWeight: '600' }}>{row.played}</td>
                                                <td style={{ padding: '16px 8px', textAlign: 'center', fontWeight: '600' }}>{row.w}</td>
                                                <td style={{ padding: '16px 8px', textAlign: 'center', fontWeight: '600' }}>{row.d}</td>
                                                <td style={{ padding: '16px 8px', textAlign: 'center', fontWeight: '600' }}>{row.l}</td>
                                                <td style={{ padding: '16px 8px', textAlign: 'center', fontWeight: '900', fontSize: '16px' }}>{row.pts}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div style={{ marginTop: 'auto', padding: '16px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #f3f4f6' }}>
                            <Link href="/pertandingan/klasemen" passHref>
                                <motion.button
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#DC2626', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                    Fixtures and Matches <FaArrowRight />
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
            .news-list {
                width: 100% !important;
                height: auto !important;
                flex: none !important;
            }
            .news-thumbnails-inner {
                flex-direction: row !important;
                gap: 8px !important;
            }
            .news-thumbnail-item {
                 flex: 1 !important;
                 height: 80px !important;
            }
        }
      `}</style>
        </section>
    );
}
