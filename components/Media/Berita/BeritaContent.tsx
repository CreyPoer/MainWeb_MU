"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaFilter, FaTimes, FaSearch, FaChevronRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

// --- DUMMY DATA ---
const NEWS_DATA = [
    {
        id: 1,
        title: "MADURA UNITED FC SIAP HADAPI MUSIM BARU",
        date: "04 Februari 2026",
        category: "Tim Utama",
        excerpt: "Persiapan matang telah dilakukan oleh skuad Laskar Sape Kerrab menyambut musim kompetisi yang akan segera bergulir dengan target papan atas.",
        image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop", // Football text match
        author: "Admin",
    },
    {
        id: 2,
        title: "AKADEMI U-20 MENUNJUKKAN PERFORMA GEMILANG",
        date: "02 Februari 2026",
        category: "Academy",
        excerpt: "Para pemain muda Madura United U-20 berhasil mencatatkan kemenangan beruntun dalam laga uji coba terakhir mereka.",
        image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1000&auto=format&fit=crop", // Football match
        author: "Reporter 1",
    },
    {
        id: 3,
        title: "REKAP HASIL PERTANDINGAN: MENANG DI KANDANG",
        date: "30 Januari 2026",
        category: "Pertandingan",
        excerpt: "Madura United berhasil mengamankan 3 poin penuh di kandang setelah mengalahkan tamunya dengan skor meyakinkan 2-0.",
        image: "https://images.unsplash.com/photo-1522770179533-24471fcdba45?q=80&w=1000&auto=format&fit=crop",
        author: "Admin",
    },
    {
        id: 4,
        title: "WAWANCARA EKSKLUSIF: PERJALANAN KAPTEN TIM",
        date: "25 Januari 2026",
        category: "Wawancara",
        excerpt: "Simak kisah inspiratif dari kapten tim Madura United tentang perjalanan karirnya hingga memimpin laskar Sape Kerrab.",
        image: "https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=1000&auto=format&fit=crop",
        author: "Reporter 2",
    },
    {
        id: 5,
        title: "PROGRAM LATIHAN KHUSUS PENJAGA GAWANG",
        date: "20 Januari 2026",
        category: "Latihan",
        excerpt: "Pelatih kiper Madura United menerapkan metode latihan baru untuk meningkatkan refleks dan distribusi bola para penjaga gawang.",
        image: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?q=80&w=1000&auto=format&fit=crop",
        author: "Admin",
    },
    {
        id: 6,
        title: "FANS CLUB MADURA UNITED GELAR BAKTI SOSIAL",
        date: "15 Januari 2026",
        category: "Klub",
        excerpt: "K-Conk Mania dan elemen suporter lainnya menggelar aksi sosial sebagai bentuk kepedulian terhadap masyarakat sekitar.",
        image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=1000&auto=format&fit=crop",
        author: "Admin",
    }
];

const CATEGORIES = [
    "Football Clubs", "News", "Transfer", "Match Preview", "Interview", "Academy", "Community"
];

const TAGS = [
    "champions", "league1", "maduraunited", "sapekerrab", "football", "goal", "highlight", "training", "transfer"
];

export default function BeritaContent() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get filter values from URL
    const activeCategory = searchParams.get("category");
    const activeTag = searchParams.get("tag");
    const activeQuery = searchParams.get("q");
    const activeAuthor = searchParams.get("author");

    // Filter Logic
    const filteredNews = useMemo(() => {
        return NEWS_DATA.filter((news) => {
            // 1. Filter by Category
            if (activeCategory && news.category.toLowerCase() !== activeCategory.toLowerCase()) {
                return false;
            }
            // 2. Filter by Search Query
            if (activeQuery && !news.title.toLowerCase().includes(activeQuery.toLowerCase())) {
                return false;
            }
            // 3. Filter by Tag
            if (activeTag) {
                const content = `${news.title} ${news.excerpt} ${news.category}`.toLowerCase();
                if (!content.includes(activeTag.toLowerCase())) {
                    return false;
                }
            }
            // 4. Filter by Author
            // @ts-ignore
            if (activeAuthor && news.author && news.author.toLowerCase() !== activeAuthor.toLowerCase()) {
                return false;
            }
            return true;
        });
    }, [activeCategory, activeTag, activeQuery, activeAuthor]);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const resetAll = () => {
        setSearchQuery("");
        router.push('/media/berita');
        if (window.innerWidth < 1024) setIsFilterOpen(false);
    };

    // Helper to push URL
    const updateFilter = (type: "category" | "tag" | "q", value: string | null) => {
        const params = new URLSearchParams(searchParams.toString());

        // Reset others when setting one, or combine? 
        // Typically category and tag might be exclusive or combined.
        // Let's implement exclusive for simplicity in this request (User asked "Category OR Tag").
        // But Search can be combined or separate.
        // Let's clear others for a clean "Filter by X" experience as requested for the Hero Title change.

        if (value) {
            // If selecting a category, clear tag/search to make the Title clear "Kategori: X"
            if (type === "category") {
                params.delete("tag");
                params.delete("q");
                params.set("category", value);
            } else if (type === "tag") {
                params.delete("category");
                params.delete("q");
                params.set("tag", value);
            } else if (type === "q") {
                // Search might want to keep category, but let's clear for "Search: X" hero title simplicity
                params.delete("category");
                params.delete("tag");
                params.set("q", value);
            }
        } else {
            params.delete(type);
        }

        router.push(`/media/berita?${params.toString()}`);
        if (window.innerWidth < 1024) setIsFilterOpen(false); // Close sidebar on mobile selection
    };

    return (
        <div style={{ backgroundColor: "#111827", minHeight: "100vh", position: "relative", overflowX: "hidden" }}>

            {/* --- MAIN CONTENT: 4-COLUMN CHECKERBOARD GRID --- */}
            <div className="news-grid-container" style={{ width: "100%", padding: "0" }}>
                {filteredNews.length > 0 ? (
                    filteredNews.map((news, index) => {
                        // Logic for Checkerboard Pattern in 4 columns (Desktop)
                        // Desktop Row 0 (Items 0, 1): Text-Image | Text-Image
                        // Desktop Row 1 (Items 2, 3): Image-Text | Image-Text
                        // ... and so on.

                        const rowNumber = Math.floor(index / 2);

                        // Logic Flags
                        const swapTablet = index % 2 !== 0; // Swap every 2nd item on tablet (Item 1, 3, 5...)
                        const swapDesktop = rowNumber % 2 !== 0; // Swap every 2nd row on desktop (Row 1, 3...)

                        // Image Cell Component
                        const ImageCell = (
                            <div
                                key={`img-${news.id}`}
                                style={{
                                    position: "relative",
                                    height: "250px", // Fixed height for consistent grid
                                    overflow: "hidden",
                                    width: "100%"
                                }}
                                className="group grid-image-cell"
                            >
                                <Image
                                    src={news.image}
                                    alt={news.title}
                                    fill
                                    style={{
                                        objectFit: "cover",
                                        objectPosition: "center",
                                        transition: "transform 0.5s ease"
                                    }}
                                    className="group-hover:scale-110"
                                />
                                {/* Overlay */}
                                <div style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%)"
                                }} />

                                {/* Mobile Category Badge (Only show on mobile layout via CSS media query if needed, keeping simple here) */}
                                <div className="mobile-only-badge" style={{ position: "absolute", top: "10px", left: "10px", zIndex: 10 }}>
                                    <span style={{ backgroundColor: "#DC2626", color: "white", fontSize: "10px", padding: "2px 8px", borderRadius: "10px", fontWeight: "bold", textTransform: "uppercase" }}>
                                        {news.category}
                                    </span>
                                </div>
                            </div>
                        );

                        // Text Cell Component
                        const TextCell = (
                            <div
                                key={`txt-${news.id}`}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    padding: "40px 30px",
                                    backgroundColor: "white",
                                    position: "relative",
                                    height: "250px", // Match Image Height
                                    width: "100%"
                                }}
                                className="grid-text-cell"
                            >
                                <div style={{ marginBottom: "16px" }}>
                                    <span className="desktop-only-badge" style={{
                                        backgroundColor: "#DC2626",
                                        color: "white",
                                        fontSize: "10px",
                                        fontWeight: "800",
                                        padding: "4px 10px",
                                        textTransform: "uppercase",
                                        borderRadius: "20px",
                                        display: "inline-block",
                                        marginRight: "10px"
                                    }}>
                                        {news.category}
                                    </span>
                                    <span style={{ color: "#656972ff", fontSize: "12px", fontWeight: "700", textTransform: "uppercase" }}>
                                        {news.date}
                                    </span>
                                </div>

                                <h3 style={{
                                    fontSize: "18px",
                                    fontWeight: "900",
                                    lineHeight: "1.3",
                                    marginBottom: "12px",
                                    color: "#111827",
                                    textTransform: "uppercase",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden"
                                }}>
                                    {news.title}
                                </h3>

                                <div style={{ marginTop: "20px" }}>
                                    <Link
                                        href={`/media/berita/${news.id}`}
                                        style={{
                                            backgroundColor: "#DC2626",
                                            color: "white",
                                            padding: "8px 16px",
                                            fontSize: "10px",
                                            fontWeight: "800",
                                            textTransform: "uppercase",
                                            letterSpacing: "1px",
                                            borderRadius: "20px",
                                            display: "inline-block",
                                            transition: "background 0.3s",
                                            textDecoration: "none"
                                        }}
                                        className="hover:bg-red-800"
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        );

                        // Always render Text then Image in DOM.
                        // Control visual order via CSS classes on the wrapper.
                        const wrapperClass = `
                        news-grid-item-wrapper 
                        ${swapTablet ? 'swap-tablet' : ''} 
                        ${swapDesktop ? 'swap-desktop' : ''}
                    `;

                        return (
                            <div
                                key={news.id}
                                style={{
                                    display: "contents",
                                    // @ts-ignore
                                    "--item-order": index * 2
                                } as React.CSSProperties}
                                className={wrapperClass}
                            >
                                {TextCell}
                                {ImageCell}
                            </div>
                        );
                    })
                ) : (
                    <div style={{ padding: "100px", textAlign: "center", color: "white", width: "100%", gridColumn: "1 / -1" }}>
                        <h3 style={{ fontSize: "2rem", fontWeight: "bold" }}>Tidak ada berita ditemukan.</h3>
                        <p style={{ marginTop: "10px", color: "#9CA3AF" }}>Coba kata kunci atau filter lain.</p>
                        <button
                            onClick={() => router.push('/media/berita')}
                            style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#DC2626", color: "white", borderRadius: "8px", fontWeight: "bold", border: "none", cursor: "pointer" }}
                        >
                            Reset Filter
                        </button>
                    </div>
                )}
            </div>

            {/* --- STICKY FILTER BUTTON --- */}
            <button
                onClick={toggleFilter}
                style={{
                    position: "fixed",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 9999,
                    backgroundColor: "#DC2626",
                    color: "white",
                    padding: "20px 8px",
                    borderTopLeftRadius: "8px",
                    borderBottomLeftRadius: "8px",
                    boxShadow: "-4px 0 15px rgba(0,0,0,0.3)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    border: "none"
                }}
            >
                <FaFilter size={16} style={{ marginBottom: "8px" }} />
                <span style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    fontWeight: "800",
                    fontSize: "12px",
                    letterSpacing: "2px",
                    textTransform: "uppercase"
                }}>
                    Filter
                </span>
            </button>

            {/* --- OFFCANVAS SIDEBAR --- */}
            <div
                className={isFilterOpen ? "offcanvas-open" : "offcanvas-closed"}
                style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    height: "100%",
                    width: "400px",
                    maxWidth: "85vw", // For mobile safety
                    backgroundColor: "white",
                    boxShadow: "-10px 0 30px rgba(0,0,0,0.5)",
                    zIndex: 10000,
                    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    transform: isFilterOpen ? "translateX(0)" : "translateX(100%)",
                    overflowY: "auto"
                }}
            >
                {/* Header */}
                <div style={{ backgroundColor: "#111827", padding: "25px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "white" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <h3 style={{ fontSize: "20px", fontWeight: "900", textTransform: "uppercase", letterSpacing: "1px" }}>Filter News</h3>
                        {(activeCategory || activeTag || activeQuery || activeAuthor) && (
                            <button
                                onClick={resetAll}
                                style={{
                                    fontSize: "12px",
                                    color: "#FCA5A5",
                                    background: "none",
                                    border: "1px solid #7F1D1D",
                                    padding: "4px 10px",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    textTransform: "uppercase",
                                    fontWeight: "bold",
                                    transition: "all 0.2s"
                                }}
                                className="hover:bg-red-900 hover:text-white"
                            >
                                Reset
                            </button>
                        )}
                    </div>
                    <button onClick={toggleFilter} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>
                        <FaTimes size={24} />
                    </button>
                </div>

                <div style={{ padding: "30px" }}>
                    {/* Search */}
                    <div style={{ marginBottom: "40px" }}>
                        <h4 style={{ fontSize: "14px", fontWeight: "900", textTransform: "uppercase", marginBottom: "15px", color: "#9CA3AF", letterSpacing: "1px" }}>
                            Keyword Search
                        </h4>
                        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                            <input
                                type="text"
                                placeholder="Type to search..."
                                style={{
                                    width: "100%",
                                    padding: "15px 20px",
                                    paddingRight: "50px",
                                    backgroundColor: "#F3F4F6",
                                    border: "2px solid transparent",
                                    borderRadius: "8px",
                                    outline: "none",
                                    color: "#111827",
                                    fontWeight: "600",
                                    transition: "border-color 0.3s"
                                }}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={(e) => e.target.style.borderColor = "#DC2626"}
                                onBlur={(e) => e.target.style.borderColor = "transparent"}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        updateFilter('q', searchQuery);
                                    }
                                }}
                            />
                            <button
                                onClick={() => updateFilter('q', searchQuery)}
                                style={{ position: "absolute", right: "15px", color: "#DC2626", background: "none", border: "none", cursor: "pointer" }}
                            >
                                <FaSearch size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Categories */}
                    <div style={{ marginBottom: "40px" }}>
                        <h4 style={{ fontSize: "14px", fontWeight: "900", textTransform: "uppercase", marginBottom: "15px", color: "#9CA3AF", letterSpacing: "1px" }}>
                            Categories
                        </h4>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            {CATEGORIES.map((cat, idx) => (
                                <li key={idx} style={{ marginBottom: "10px" }}>
                                    <div
                                        onClick={() => updateFilter('category', cat)}
                                        style={{
                                            color: activeCategory === cat ? "#DC2626" : "#111827",
                                            fontWeight: "700",
                                            fontSize: "15px",
                                            textTransform: "uppercase",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            padding: "10px",
                                            borderRadius: "6px",
                                            transition: "all 0.2s",
                                            textDecoration: "none",
                                            cursor: "pointer",
                                            backgroundColor: activeCategory === cat ? "#FEF2F2" : "transparent"
                                        }}
                                        className="category-link"
                                    >
                                        {cat}
                                        <FaChevronRight size={12} color={activeCategory === cat ? "#DC2626" : "#D1D5DB"} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tags */}
                    <div>
                        <h4 style={{ fontSize: "14px", fontWeight: "900", textTransform: "uppercase", marginBottom: "15px", color: "#9CA3AF", letterSpacing: "1px" }}>
                            Popular Tags
                        </h4>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                            {TAGS.map((tag, idx) => (
                                <span
                                    key={idx}
                                    style={{
                                        backgroundColor: activeTag === tag ? "#DC2626" : "white",
                                        color: activeTag === tag ? "white" : "#4B5563",
                                        padding: "8px 16px",
                                        borderRadius: "30px",
                                        fontSize: "12px",
                                        fontWeight: "700",
                                        cursor: "pointer",
                                        border: activeTag === tag ? "1px solid #DC2626" : "1px solid #E5E7EB",
                                        transition: "all 0.2s"
                                    }}
                                    onClick={() => updateFilter('tag', tag)}
                                    className="tag-item"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Backdrop */}
            {isFilterOpen && (
                <div
                    onClick={toggleFilter}
                    style={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "rgba(0,0,0,0.6)",
                        zIndex: 9999,
                        backdropFilter: "blur(4px)"
                    }}
                />
            )}

            {/* CSS Grid & Media Queries */}
            <style jsx>{`
                /* GRID SETUP */
                .news-grid-container {
                    display: grid;
                    grid-template-columns: 1fr; /* Mobile Default: 1 Col */
                }

                .mobile-only-badge { display: block; }
                .desktop-only-badge { display: none; }
                
                /* =========================================
                   ORDERING LOGIC FOR CHECKERBOARD LAYOUT
                   We use 'calc' with '--item-order' to ensure items 
                   stay in their grid slots (0, 1, 2, 3...) globally 
                   while allowing us to swap the two cells (Img/Text) within that slot.
                   ========================================= */

                /* ----------------------------------
                   MOBILE (< 768px)
                   Stack: Image Top (1), Text Bottom (2)
                   ---------------------------------- */
                @media (max-width: 767px) {
                    .news-grid-container :global(.grid-image-cell) { order: calc(var(--item-order) + 1); }
                    .news-grid-container :global(.grid-text-cell) { order: calc(var(--item-order) + 2); }
                }

                /* ----------------------------------
                   TABLET (768px - 1023px)
                   2 Columns. Zigzag by ITEM.
                   Even Items: Text(1)-Img(2). Odd Items: Img(1)-Text(2).
                   ---------------------------------- */
                @media (min-width: 768px) and (max-width: 1023px) {
                    .news-grid-container {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    
                    /* Default (Ex: Even Items): Text 1, Img 2 */
                    .news-grid-item-wrapper:not(.swap-tablet) :global(.grid-text-cell) { order: calc(var(--item-order) + 1); }
                    .news-grid-item-wrapper:not(.swap-tablet) :global(.grid-image-cell) { order: calc(var(--item-order) + 2); }

                    /* Swapped (Ex: Odd Items): Text 2, Img 1 */
                    .news-grid-item-wrapper.swap-tablet :global(.grid-text-cell) { order: calc(var(--item-order) + 2); }
                    .news-grid-item-wrapper.swap-tablet :global(.grid-image-cell) { order: calc(var(--item-order) + 1); }
                }

                /* ----------------------------------
                   DESKTOP (>= 1024px)
                   4 Columns. Zigzag by ROW.
                   Even Row: Text(1)-Img(2). Odd Row: Img(1)-Text(2).
                   ---------------------------------- */
                @media (min-width: 1024px) {
                    .news-grid-container {
                        grid-template-columns: repeat(4, 1fr);
                    }
                    .mobile-only-badge { display: none; }
                    .desktop-only-badge { display: inline-block; }

                    /* Default (Even Rows): Text 1, Img 2 */
                    .news-grid-item-wrapper:not(.swap-desktop) :global(.grid-text-cell) { order: calc(var(--item-order) + 1); }
                    .news-grid-item-wrapper:not(.swap-desktop) :global(.grid-image-cell) { order: calc(var(--item-order) + 2); }

                    /* Swapped (Odd Rows): Text 2, Img 1 */
                    .news-grid-item-wrapper.swap-desktop :global(.grid-text-cell) { order: calc(var(--item-order) + 2); }
                    .news-grid-item-wrapper.swap-desktop :global(.grid-image-cell) { order: calc(var(--item-order) + 1); }
                }
            `}</style>
        </div>
    );
}
