"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaSearch, FaChevronRight, FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp, FaYoutube, FaFilter, FaTimes } from "react-icons/fa";

interface ContentDetailProps {
    newsItem: {
        id: number;
        title: string;
        date: string;
        category: string;
        image: string;
        content: string; // HTML String now
        author: string;
        author_bio?: string;
        author_image?: string;
        tags: string[];
        penerbit?: string;
        link_berita?: string;
        previous?: { id: number; title: string; slug: string } | null;
        next?: { id: number; title: string; slug: string } | null;
        related?: {
            id: number;
            title: string;
            image: string;
            date: string;
            category: string;
            author: string;
        }[];
    };
}

export default function ContentDetail({ newsItem }: ContentDetailProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    // Dynamic Filters
    const [categories, setCategories] = useState<any[]>([]);
    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, tagRes] = await Promise.all([
                    fetch('/api/categories'),
                    fetch('/api/tags')
                ]);

                const catData = await catRes.json();
                const tagData = await tagRes.json();

                if (Array.isArray(catData)) setCategories(catData);
                if (Array.isArray(tagData)) setTags(tagData);

            } catch (error) {
                console.error("Failed to fetch sidebar data:", error);
            }
        };
        fetchData();
    }, []);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            router.push(`/media/berita?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleCategoryClick = (category: string) => {
        router.push(`/media/berita?category=${encodeURIComponent(category)}`);
    };

    const handleTagClick = (tag: string) => {
        router.push(`/media/berita?tag=${encodeURIComponent(tag)}`);
    };

    const handleAuthorClick = (author: string) => {
        router.push(`/media/berita?author=${encodeURIComponent(author)}`);
    };

    // Helper for Sidebar Widget Title
    const WidgetHeader = ({ title }: { title: string }) => (
        <div style={{
            backgroundColor: "#111827", // Dark Navy
            padding: "15px 20px",
            borderLeft: "5px solid #DC2626", // Red Accent
            display: "flex",
            alignItems: "center"
        }}>
            <h4 style={{
                fontSize: "14px",
                fontWeight: "800",
                textTransform: "uppercase",
                color: "white",
                letterSpacing: "1.5px",
                margin: 0
            }}>
                {title}
            </h4>
        </div>
    );

    return (
        <div style={{ backgroundColor: "#F9FAFB", padding: "60px 0" }}>
            <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "40px" }}>

                    {/* --- LEFT: MAIN CONTENT --- */}
                    <div style={{ flex: 3, minWidth: "300px" }}>

                        {/* News Image (In Content) */}
                        <div style={{ position: "relative", width: "100%", height: "400px", marginBottom: "30px", borderRadius: "8px", overflow: "hidden" }}>
                            <Image
                                src={newsItem.image || '/logo.png'}
                                alt={newsItem.title}
                                fill
                                unoptimized
                                style={{ objectFit: "cover" }}
                            />
                        </div>

                        {/* Meta Info */}
                        <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px", fontSize: "14px", flexWrap: "wrap" }}>
                            <span style={{ backgroundColor: "#DC2626", color: "white", padding: "4px 12px", borderRadius: "20px", fontWeight: "bold", textTransform: "uppercase", fontSize: "12px" }}>
                                {newsItem.category}
                            </span>
                            <span style={{ color: "#6B7280", fontWeight: "600" }}>
                                {newsItem.date}
                            </span>
                            <span style={{ color: "#6B7280", fontWeight: "600" }}>
                                By {newsItem.author}
                            </span>
                            <div style={{ marginLeft: "auto", display: "flex", gap: "8px", alignItems: "center" }}>
                                {[
                                    { Icon: FaFacebookF, href: "https://www.facebook.com/Maduraunitedfc.official/", color: "#1877F2" },
                                    { Icon: FaTwitter, href: "https://x.com/MaduraUnitedFC", color: "#000000" },
                                    { Icon: FaInstagram, href: "https://www.instagram.com/maduraunited.fc?igsh=bmYxY201MWx6Yjkz", color: "", gradient: "linear-gradient(45deg, #FFDC80, #FCAF45, #F77737, #F56040, #FD1D1D, #E1306C, #C13584, #833AB4, #405DE6)" },
                                    { Icon: FaYoutube, href: "https://youtube.com/@maduraunitedfc?si=nVakpGhvYmyS3HBb", color: "#FF0000" },
                                ].map(({ Icon, href, color, gradient }, idx) => (
                                    <a key={idx} href={href} target="_blank" rel="noopener noreferrer" style={{
                                        width: "32px", height: "32px", borderRadius: "50%",
                                        ...(gradient ? { background: gradient } : { backgroundColor: color }),
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: "white", transition: "opacity 0.3s, transform 0.3s",
                                        textDecoration: "none"
                                    }} className="social-brand-icon">
                                        <Icon size={14} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Content Paragraphs - RENDER HTML SAFELY */}
                        <div
                            style={{ fontSize: "16px", lineHeight: "1.8", color: "#374151" }}
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: newsItem.content }}
                        />

                        {newsItem.penerbit && newsItem.link_berita && (
                            <p style={{ marginTop: "20px", fontSize: "14px", fontStyle: "italic", color: "#6B7280" }}>
                                Dilansir dari: <a href={newsItem.link_berita} target="_blank" rel="noopener noreferrer" style={{ color: "#DC2626", textDecoration: "underline" }}>{newsItem.penerbit}</a>
                            </p>
                        )}


                        <hr style={{ margin: "40px 0", borderColor: "#E5E7EB" }} />

                        {/* Share Links & Tags Row */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>

                            {/* --- LEFT: TAGS --- */}
                            {newsItem.tags && newsItem.tags.length > 0 && (
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <span style={{ fontWeight: "900", textTransform: "uppercase", fontSize: "16px", color: "#111827", letterSpacing: "1px" }}>TAGS:</span>
                                    {newsItem.tags.map((tag, idx) => (
                                        <span key={idx}
                                            onClick={() => handleTagClick(tag)}
                                            style={{
                                                backgroundColor: "#F3F4F6",
                                                color: "#6B7280",
                                                padding: "8px 20px",
                                                borderRadius: "30px", // Fully rounded pill
                                                fontSize: "14px",
                                                fontWeight: "600",
                                                cursor: "pointer",
                                            }}
                                            className="hover:bg-red-600 hover:text-white"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* --- RIGHT: SHARE --- */}
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ fontWeight: "900", textTransform: "uppercase", marginRight: "10px", fontSize: "16px", color: "#111827", letterSpacing: "1px" }}>SHARE:</span>
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
                                                alert('Link berhasil disalin! Kamu bisa paste di Instagram Story atau DM.');
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
                                    <button key={idx} title={label} onClick={onClick} style={{
                                        width: "40px", height: "40px", borderRadius: "50%",
                                        backgroundColor: "#111827",
                                        color: "white",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        border: "none", cursor: "pointer", transition: "background 0.3s"
                                    }}
                                        className="hover:bg-red-600"
                                    >
                                        <Icon size={14} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* --- ABOUT AUTHOR SECTION (Optional, can be hidden if no author data) --- */}
                        <div style={{
                            backgroundColor: "#0F172A", // Dark Navy/Black
                            padding: "40px",
                            marginTop: "60px",
                            display: "flex",
                            gap: "30px",
                            alignItems: "flex-start",
                            color: "white"
                        }}>
                            {/* Author Image */}
                            <div style={{ flexShrink: 0 }}>
                                <div style={{ width: "100px", height: "100px", position: "relative", overflow: "hidden", backgroundColor: "#374151" }}>
                                    <img
                                        src={newsItem.author_image || "/logo.png"}
                                        alt={newsItem.author}
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                </div>
                            </div>

                            {/* Author Content */}
                            <div>
                                <h3 style={{
                                    fontSize: "18px",
                                    fontWeight: "900",
                                    textTransform: "uppercase",
                                    marginBottom: "15px",
                                    letterSpacing: "1px"
                                }}>
                                    ABOUT {newsItem.author}
                                </h3>
                                <div style={{
                                    fontSize: "15px",
                                    lineHeight: "1.8",
                                    color: "#9CA3AF", // Light gray text
                                    marginBottom: "20px"
                                }}
                                    className="author-desc"
                                    dangerouslySetInnerHTML={{ __html: newsItem.author_bio || 'Madura United Author' }}
                                />
                                <div
                                    onClick={() => handleAuthorClick(newsItem.author)}
                                    style={{
                                        color: "#DC2626", // Red
                                        fontWeight: "700",
                                        fontSize: "14px",
                                        textDecoration: "none",
                                        cursor: "pointer"
                                    }}
                                >
                                    View all posts by {newsItem.author}
                                </div>
                            </div>
                        </div>

                        {/* --- PREV / NEXT NAVIGATION --- */}
                        <div style={{ display: "flex", justifyContent: "space-between", gap: "20px", marginTop: "40px" }} className="nav-buttons-container">
                            {newsItem.previous ? (
                                <Link href={`/media/berita/${newsItem.previous.id}`} style={{ textDecoration: "none", flex: 1 }}>
                                    <div style={{
                                        backgroundColor: "white",
                                        padding: "30px",
                                        border: "1px solid #E5E7EB",
                                        borderRadius: "8px",
                                        transition: "all 0.3s",
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center"
                                    }}
                                        className="nav-btn hover:border-red-600 group"
                                    >
                                        <span className="nav-label" style={{
                                            fontSize: "12px",
                                            fontWeight: "800",
                                            textTransform: "uppercase",
                                            color: "#9CA3AF",
                                            marginBottom: "8px",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "5px"
                                        }}>
                                            <FaChevronRight style={{ transform: "rotate(180deg)" }} /> Previous
                                        </span>
                                        <h4 style={{
                                            fontSize: "16px",
                                            fontWeight: "900",
                                            // Color moved to CSS for hover effect
                                            margin: 0,
                                            lineHeight: "1.4"
                                        }}
                                            className="nav-title transition-colors"
                                        >
                                            {newsItem.previous.title}
                                        </h4>
                                    </div>
                                </Link>
                            ) : <div style={{ flex: 1 }}></div>}

                            {newsItem.next ? (
                                <Link href={`/media/berita/${newsItem.next.id}`} style={{ textDecoration: "none", flex: 1 }}>
                                    <div style={{
                                        backgroundColor: "white",
                                        padding: "30px",
                                        border: "1px solid #E5E7EB",
                                        borderRadius: "8px",
                                        transition: "all 0.3s",
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "flex-end",
                                        textAlign: "right"
                                    }}
                                        className="nav-btn hover:border-red-600 group"
                                    >
                                        <span className="nav-label" style={{
                                            fontSize: "12px",
                                            fontWeight: "800",
                                            textTransform: "uppercase",
                                            color: "#9CA3AF",
                                            marginBottom: "8px",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "5px"
                                        }}>
                                            Next <FaChevronRight />
                                        </span>
                                        <h4 style={{
                                            fontSize: "16px",
                                            fontWeight: "900",
                                            // Color moved to CSS for hover effect
                                            margin: 0,
                                            lineHeight: "1.4"
                                        }}
                                            className="nav-title transition-colors"
                                        >
                                            {newsItem.next.title}
                                        </h4>
                                    </div>
                                </Link>
                            ) : <div style={{ flex: 1 }}></div>}
                        </div>

                        {/* --- RELATED NEWS --- */}
                        {newsItem.related && newsItem.related.length > 0 && (
                            <div style={{ marginTop: "60px" }}>
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "15px",
                                    marginBottom: "30px"
                                }}>
                                    <div style={{ width: "40px", height: "4px", backgroundColor: "#DC2626" }}></div>
                                    <h3 style={{
                                        fontSize: "24px",
                                        fontWeight: "900",
                                        textTransform: "uppercase",
                                        color: "#111827",
                                        margin: 0
                                    }}>
                                        Related News
                                    </h3>
                                </div>

                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "30px" }}>
                                    {newsItem.related.map((item) => (
                                        <Link href={`/media/berita/${item.id}`} key={item.id} style={{ textDecoration: "none" }}>
                                            <div className="group">
                                                <div style={{
                                                    position: "relative",
                                                    height: "200px",
                                                    marginBottom: "15px",
                                                    overflow: "hidden",
                                                    borderRadius: "8px"
                                                }}>
                                                    <Image
                                                        src={item.image || '/logo.png'}
                                                        alt={item.title}
                                                        fill
                                                        unoptimized
                                                        style={{ objectFit: "cover", transition: "transform 0.5s" }}
                                                        className="group-hover:scale-110"
                                                    />
                                                    <div style={{
                                                        position: "absolute",
                                                        top: "10px",
                                                        left: "10px",
                                                        backgroundColor: "#DC2626",
                                                        color: "white",
                                                        fontSize: "10px",
                                                        fontWeight: "bold",
                                                        padding: "4px 8px",
                                                        borderRadius: "4px",
                                                        textTransform: "uppercase"
                                                    }}>
                                                        {item.category}
                                                    </div>
                                                </div>
                                                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", fontSize: "12px", color: "#6B7280" }}>
                                                    <span>{item.date}</span>
                                                </div>
                                                <h4 style={{
                                                    fontSize: "16px",
                                                    fontWeight: "800",
                                                    color: "#111827",
                                                    lineHeight: "1.4",
                                                    margin: 0,
                                                    textTransform: "uppercase"
                                                }}
                                                    className="group-hover:text-red-600 transition-colors"
                                                >
                                                    {item.title}
                                                </h4>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* --- RIGHT: STICKY SIDEBAR (Responsive Offcanvas) --- */}
                    <div
                        className={`sidebar-container ${isSidebarOpen ? "open" : ""}`}
                        style={{ flex: 1, minWidth: "300px" }}
                    >
                        {/* Mobile Header for Sidebar (Close Button) */}
                        <div className="sidebar-mobile-header" style={{ display: "none", padding: "20px", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #E5E7EB", marginBottom: "20px" }}>
                            <h4 style={{ margin: 0, fontSize: "16px", fontWeight: "800", textTransform: "uppercase" }}>Sidebar Menu</h4>
                            <button onClick={() => setIsSidebarOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444" }}>
                                <FaTimes size={20} />
                            </button>
                        </div>

                        <div style={{ position: "sticky", top: "100px" }}>

                            {/* SEARCH WIDGET */}
                            <div style={{ backgroundColor: "white", marginBottom: "30px", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
                                <WidgetHeader title="Search" />
                                <div style={{ padding: "30px" }}>
                                    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                        <input
                                            type="text"
                                            placeholder="search ..."
                                            style={{
                                                width: "100%",
                                                padding: "15px 20px",
                                                paddingRight: "60px",
                                                backgroundColor: "#F3F4F6",
                                                border: "none",
                                                borderRadius: "30px", // Fully rounded
                                                outline: "none",
                                                fontSize: "14px",
                                                color: "#6B7280"
                                            }}
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        />
                                        <button
                                            onClick={handleSearch}
                                            style={{
                                                position: "absolute",
                                                right: "5px",
                                                top: "50%",
                                                transform: "translateY(-50%)",
                                                backgroundColor: "#DC2626",
                                                color: "white",
                                                border: "none",
                                                width: "40px",
                                                height: "40px",
                                                borderRadius: "50%",
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}
                                        >
                                            <FaSearch size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* CATEGORIES WIDGET */}
                            <div style={{ backgroundColor: "white", marginBottom: "30px", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
                                <WidgetHeader title="Categories" />
                                <div style={{ padding: "20px 30px" }}>
                                    <ul style={{ listStyle: "none", padding: 0 }}>
                                        {categories.map((cat, idx) => (
                                            <li key={idx} style={{
                                                marginBottom: "12px",
                                                borderBottom: idx !== categories.length - 1 ? "1px solid #E5E7EB" : "none",
                                                paddingBottom: idx !== categories.length - 1 ? "12px" : "0"
                                            }}>
                                                <div
                                                    onClick={() => handleCategoryClick(cat.title)}
                                                    style={{
                                                        display: "block",
                                                        textDecoration: "none",
                                                        color: "#111827",
                                                        fontWeight: "700",
                                                        fontSize: "14px",
                                                        textTransform: "uppercase",
                                                        letterSpacing: "0.5px",
                                                        transition: "color 0.2s",
                                                        cursor: "pointer"
                                                    }}
                                                    className="hover:text-red-600"
                                                >
                                                    {cat.title}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* TAGS WIDGET */}
                            <div style={{ backgroundColor: "white", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
                                <WidgetHeader title="Popular Tags" />
                                <div style={{ padding: "30px" }}>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                                        {tags.map((tag, idx) => (
                                            <span key={idx}
                                                onClick={() => handleTagClick(tag)}
                                                style={{
                                                    backgroundColor: "#F3F4F6",
                                                    color: "#6B7280",
                                                    padding: "8px 16px",
                                                    borderRadius: "20px",
                                                    fontSize: "12px",
                                                    fontWeight: "600",
                                                    cursor: "pointer",
                                                    transition: "all 0.2s"
                                                }}
                                                className="hover:bg-red-600 hover:text-white"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            {/* --- MOBILE TOGGLE BUTTON --- */}
            <button
                className="sidebar-toggle-btn"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
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
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    border: "none",
                    // Display handled by CSS
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

            {/* --- BACKDROP --- */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="sidebar-backdrop"
                    style={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        zIndex: 9998,
                        backdropFilter: "blur(2px)"
                    }}
                />
            )}

            <style jsx>{`
                .hover\\:bg-red-600:hover { background-color: #DC2626 !important; }
                .hover\\:text-white:hover { color: white !important; }
                .hover\\:text-red-600:hover { color: #DC2626 !important; }

                .social-brand-icon:hover {
                    opacity: 0.85;
                    transform: scale(1.15);
                }

                /* NAV BUTTON HOVER OFFSET & COLOR */
                .nav-title { color: #111827; }
                .nav-btn:hover .nav-title { color: #DC2626 !important; }

                /* DEFAULT (DESKTOP) */
                .sidebar-toggle-btn { display: none; }
                .sidebar-backdrop { display: none; }
                
                /* MOBILE / TABLET (< 1024px) */
                @media (max-width: 1023px) {
                    .sidebar-toggle-btn { display: flex !important; }
                    .sidebar-backdrop { display: block !important; }

                    .sidebar-container {
                        position: fixed !important;
                        top: 0;
                        right: 0;
                        width: 320px !important;
                        height: 100vh;
                        background-color: white;
                        z-index: 9999;
                        transform: translateX(100%);
                        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                        box-shadow: -5px 0 20px rgba(0,0,0,0.1);
                        overflow-y: auto;
                        padding: 0 !important;
                    }

                    .sidebar-container.open {
                        transform: translateX(0);
                    }

                    .sidebar-mobile-header {
                        display: flex !important;
                    }
                }

                /* MOBILE SMALL (< 425px) */
                @media (max-width: 425px) {
                    .author-desc {
                        display: none !important;
                    }
                    .nav-buttons-container {
                        gap: 15px !important;
                    }
                    .nav-btn {
                        padding: 20px !important;
                    }
                    .nav-btn h4 {
                        font-size: 14px !important;
                    }
                    .nav-btn .nav-label {
                        font-size: 10px !important;
                    }
                }
            `}</style>
        </div>
    );
}
