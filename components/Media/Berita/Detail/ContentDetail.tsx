"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaSearch, FaChevronRight, FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp, FaFilter, FaTimes } from "react-icons/fa";

// --- DUMMY DATA FOR SIDEBAR ---
const CATEGORIES = [
    "Football Clubs", "News", "Transfer", "Match Preview", "Interview", "Academy", "Community"
];

const TAGS = [
    "champions", "league1", "maduraunited", "sapekerrab", "football", "goal", "highlight", "training", "transfer", "match", "player", "score"
];

// --- CONTENT COMPONENT ---

interface ContentDetailProps {
    newsItem: {
        id: number;
        title: string;
        date: string;
        category: string;
        image: string;
        content: string[]; // Array of paragraphs
        author: string;
    };
}

export default function ContentDetail({ newsItem }: ContentDetailProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
                                src={newsItem.image}
                                alt={newsItem.title}
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>

                        {/* Meta Info */}
                        <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px", fontSize: "14px" }}>
                            <span style={{ backgroundColor: "#DC2626", color: "white", padding: "4px 12px", borderRadius: "20px", fontWeight: "bold", textTransform: "uppercase", fontSize: "12px" }}>
                                {newsItem.category}
                            </span>
                            <span style={{ color: "#6B7280", fontWeight: "600" }}>
                                {newsItem.date}
                            </span>
                        </div>

                        {/* Content Paragraphs */}
                        <div style={{ fontSize: "16px", lineHeight: "1.8", color: "#374151" }}>
                            {newsItem.content.map((paragraph, idx) => (
                                <p key={idx} style={{ marginBottom: "20px" }}>
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        <hr style={{ margin: "40px 0", borderColor: "#E5E7EB" }} />

                        {/* Share Links & Tags Row */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>

                            {/* --- LEFT: TAGS --- */}
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ fontWeight: "900", textTransform: "uppercase", fontSize: "16px", color: "#111827", letterSpacing: "1px" }}>TAGS:</span>
                                {["articles", "blog"].map((tag, idx) => (
                                    <span key={idx} style={{
                                        backgroundColor: "#F3F4F6",
                                        color: "#6B7280",
                                        padding: "8px 20px",
                                        borderRadius: "30px", // Fully rounded pill
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                    }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* --- RIGHT: SHARE --- */}
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ fontWeight: "900", textTransform: "uppercase", marginRight: "10px", fontSize: "16px", color: "#111827", letterSpacing: "1px" }}>SHARE:</span>
                                {[FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp].map((Icon, idx) => (
                                    <button key={idx} style={{
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

                        {/* --- ABOUT AUTHOR SECTION --- */}
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
                                        src="/logo.png" // Placeholder for author
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
                                <p style={{
                                    fontSize: "15px",
                                    lineHeight: "1.8",
                                    color: "#9CA3AF", // Light gray text
                                    marginBottom: "20px"
                                }}
                                    className="author-desc"
                                >
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit.
                                </p>
                                <a href="#" style={{
                                    color: "#DC2626", // Red
                                    fontWeight: "700",
                                    fontSize: "14px",
                                    textDecoration: "none"
                                }}>
                                    View all posts by {newsItem.author}
                                </a>
                            </div>
                        </div>

                        {/* --- NAVIGATION BUTTONS --- */}
                        <div className="nav-buttons-container" style={{ display: "flex", gap: "30px", marginTop: "60px" }}>

                            {/* Previous Post */}
                            <a href="#" style={{
                                flex: 1,
                                backgroundColor: "white",
                                padding: "40px",
                                textDecoration: "none",
                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                display: "block",
                                transition: "all 0.3s"
                            }}
                                className="hover:translate-y-[-5px] nav-btn"
                            >
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    marginBottom: "15px",
                                    color: "#DC2626",
                                    fontWeight: "700",
                                    fontSize: "14px",
                                    textTransform: "uppercase"
                                }}
                                    className="nav-label"
                                >
                                    <FaChevronRight style={{ transform: "rotate(180deg)", fontSize: "12px" }} />
                                    Previous Post
                                </div>
                                <h4 style={{
                                    fontSize: "24px",
                                    fontWeight: "900",
                                    color: "#111827",
                                    lineHeight: "1.3",
                                    margin: 0,
                                    textTransform: "uppercase"
                                }}>
                                    2018 RATING: WHO’S THE MOST “EXPENSIVE” PLAYER?
                                </h4>
                            </a>

                            {/* Next Post */}
                            <a href="#" style={{
                                flex: 1,
                                backgroundColor: "white",
                                padding: "40px",
                                textDecoration: "none",
                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                display: "block",
                                textAlign: "right",
                                transition: "all 0.3s"
                            }}
                                className="hover:translate-y-[-5px] nav-btn"
                            >
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                    gap: "10px",
                                    marginBottom: "15px",
                                    color: "#DC2626",
                                    fontWeight: "700",
                                    fontSize: "14px",
                                    textTransform: "uppercase"
                                }}
                                    className="nav-label"
                                >
                                    Next Post
                                    <FaChevronRight style={{ fontSize: "12px" }} />
                                </div>
                                <h4 style={{
                                    fontSize: "24px",
                                    fontWeight: "900",
                                    color: "#111827",
                                    lineHeight: "1.3",
                                    margin: 0,
                                    textTransform: "uppercase"
                                }}>
                                    WHAT TO EXPECT FROM THE UPCOMING WORLD CUP?
                                </h4>
                            </a>


                        </div>

                        {/* --- YOU MAY ALSO LIKE SECTION --- */}
                        <div style={{ marginTop: "60px" }}>
                            <h3 style={{
                                fontSize: "24px",
                                fontWeight: "900",
                                textTransform: "uppercase",
                                color: "#111827", // Dark Navy
                                marginBottom: "30px",
                                letterSpacing: "1px"
                            }}>
                                YOUR MAY ALSO LIKE
                            </h3>

                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
                                {[
                                    {
                                        title: "2018 LEAGUE REPORT AND HIGHLIGHTS",
                                        date: "August 1, 2018",
                                        category: "Football Clubs",
                                        desc: "If you missed it, we give you a great recap! Follow our news blog",
                                        image: "/images/dummy/news_match_action_1769655568450.png"
                                    },
                                    {
                                        title: "THE FASTEST GOAL OF THE WORLD CHAMPIONSHIP",
                                        date: "November 4, 2018",
                                        category: "Football Clubs",
                                        desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut",
                                        image: "/images/dummy/news_training_1769655590311.png"
                                    }
                                ].map((item, idx) => (
                                    <div key={idx} style={{ position: "relative", height: "250px", borderRadius: "8px", overflow: "hidden", display: "flex", alignItems: "flex-end" }}>

                                        {/* Background Image */}
                                        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                            />
                                        </div>

                                        {/* Overlay Gradient */}
                                        <div style={{
                                            position: "absolute",
                                            inset: 0,
                                            background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
                                            zIndex: 2
                                        }}></div>

                                        {/* Content Overlay */}
                                        <div style={{ position: "relative", zIndex: 3, padding: "30px", color: "white", width: "100%" }}>

                                            <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "15px" }}>
                                                <span style={{
                                                    backgroundColor: "#DC2626",
                                                    color: "white",
                                                    padding: "4px 12px",
                                                    borderRadius: "20px",
                                                    fontWeight: "bold",
                                                    textTransform: "uppercase",
                                                    fontSize: "10px"
                                                }}>
                                                    {item.category}
                                                </span>
                                                <span style={{ fontSize: "12px", fontWeight: "600", color: "#D1D5DB" }}>
                                                    {item.date}
                                                </span>
                                            </div>

                                            <h4 style={{
                                                fontSize: "20px",
                                                fontWeight: "900",
                                                textTransform: "uppercase",
                                                marginBottom: "10px",
                                                lineHeight: "1.3"
                                            }}>
                                                {item.title}
                                            </h4>

                                            <p style={{
                                                fontSize: "14px",
                                                color: "#E5E7EB",
                                                marginBottom: "20px",
                                                lineHeight: "1.6",
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden"
                                            }}>
                                                {item.desc}
                                            </p>

                                            <button style={{
                                                backgroundColor: "#DC2626",
                                                color: "white",
                                                border: "none",
                                                padding: "10px 25px",
                                                borderRadius: "30px",
                                                fontWeight: "800",
                                                fontSize: "12px",
                                                textTransform: "uppercase",
                                                cursor: "pointer",
                                                transition: "background 0.3s"
                                            }}
                                                className="hover:bg-red-700"
                                            >
                                                READ MORE
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


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
                                        />
                                        <button style={{
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
                                        }}>
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
                                        {CATEGORIES.map((cat, idx) => (
                                            <li key={idx} style={{
                                                marginBottom: "12px",
                                                borderBottom: idx !== CATEGORIES.length - 1 ? "1px solid #E5E7EB" : "none",
                                                paddingBottom: idx !== CATEGORIES.length - 1 ? "12px" : "0"
                                            }}>
                                                <a href="#" style={{
                                                    display: "block",
                                                    textDecoration: "none",
                                                    color: "#111827",
                                                    fontWeight: "700",
                                                    fontSize: "14px",
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.5px",
                                                    transition: "color 0.2s"
                                                }}
                                                    className="hover:text-red-600"
                                                >
                                                    {cat}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* TAGS WIDGET */}
                            <div style={{ backgroundColor: "white", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
                                <WidgetHeader title="Tags" />
                                <div style={{ padding: "30px" }}>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                                        {TAGS.map((tag, idx) => (
                                            <span key={idx} style={{
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
