"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaPlay, FaTimes } from "react-icons/fa";

// --- DATA ---
const VIDEO_DATA = [
    { id: "opya-Ta2PgQ", title: "Highlight Match 1", date: "FEB 28, 2018", duration: "10:30" },
    { id: "fZDbSj-mUsI", title: "Highlight Match 2", date: "FEB 28, 2018", duration: "08:15" },
    { id: "avdO-Dyi7Hk", title: "Highlight Match 3", date: "FEB 28, 2018", duration: "12:00" },
    { id: "2N0tdwa1yeM", title: "Highlight Match 4", date: "FEB 28, 2018", duration: "05:45" },
    { id: "Zcfa0IqPQn8", title: "Highlight Match 5", date: "FEB 28, 2018", duration: "09:20" },
    { id: "eT4nHU8_uIo", title: "Highlight Match 6", date: "FEB 28, 2018", duration: "09:20" },
];

export default function VideoHighlightSection() {
    const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
    const [modalVideo, setModalVideo] = useState<string | null>(null);

    // --- HANDLERS ---
    const handleMouseEnter = (id: string) => {
        setHoveredVideo(id);
    };

    const handleMouseLeave = () => {
        setHoveredVideo(null);
    };

    const openModal = (id: string) => {
        setModalVideo(id);
    };

    const closeModal = () => {
        setModalVideo(null);
    };

    return (
        <section style={{ background: "linear-gradient(to top, #2a2a2a 0%, #151515 100%)", padding: "80px 0", position: "relative", overflow: "hidden" }}>

            {/* BACKGROUND TEXT DECORATION (Optional "WATCH HIGHLIGHT" big text behind) */}
            <div style={{
                position: "absolute",
                top: "1%",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "12vw",
                fontWeight: "900",
                color: "rgba(255, 255, 255, 0.14)",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                zIndex: 0
            }} data-aos="zoom-in" data-aos-duration="1500">
                WATCH HIGHLIGHT
            </div>

            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

                {/* HEADER */}
                <div style={{ marginBottom: "40px", textAlign: "left" }} data-aos="fade-down">
                    <h4 style={{ color: "#DC2626", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "14px", marginBottom: "8px" }}>
                        Our Videos
                    </h4>
                    <h2 style={{ fontSize: "36px", fontWeight: "900", textTransform: "uppercase", color: "white", lineHeight: "1.2" }}>
                        Watch <span style={{ color: "#DC2626" }}>Highlights</span>
                    </h2>
                </div>

                {/* GRID LAYOUT */}
                {/* We use CSS Grid via styled-jsx for responsiveness */}
                <div className="video-grid">
                    {VIDEO_DATA.map((video, index) => {
                        // First item is large (span 2 cols, 2 rows) if we want that 'Featured' look
                        // But user said "concept like Image 1". Provided image usually has 1 big, others small. 
                        // Let's make the FIRST video BIG.
                        const isFeatured = index === 0;

                        return (
                            <div
                                key={video.id}
                                className={`video-card ${isFeatured ? "featured" : ""}`}
                                data-aos="zoom-in"
                                data-aos-delay={index * 100}
                                onMouseEnter={() => handleMouseEnter(video.id)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => openModal(video.id)}
                            >
                                {/* CONTENT CONTAINER */}
                                <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "12px", overflow: "hidden", backgroundColor: "#000", cursor: "pointer" }}>

                                    {/* VIDEO/THUMBNAIL LOGIC */}
                                    {hoveredVideo === video.id ? (
                                        <div style={{ position: "relative", width: "100%", height: "100%" }}>
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0`}
                                                title={video.title}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                style={{ position: "absolute", top: 0, left: 0, objectFit: "cover", pointerEvents: "none" }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="thumbnail-wrapper" style={{ position: "relative", width: "100%", height: "100%" }}>
                                            <Image
                                                src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                                                alt={video.title}
                                                fill
                                                style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                                                className="thumbnail-img"
                                            />
                                            {/* OVERLAY for better text reading */}
                                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}></div>

                                            {/* DURATION BADGE */}
                                            <div style={{ position: "absolute", top: "16px", left: "16px", backgroundColor: "rgba(220, 38, 38, 0.9)", color: "white", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "6px" }}>
                                                <FaPlay size={10} /> {video.duration}
                                            </div>

                                            {/* PLAY BUTTON (CENTER) */}
                                            <div className="play-button-wrapper" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                                                <div className="play-btn-circle">
                                                    <FaPlay size={20} color="white" style={{ marginLeft: "4px" }} />
                                                </div>
                                            </div>

                                            {/* INFO (BOTTOM) */}
                                            <div style={{ position: "absolute", bottom: 0, left: 0, padding: "24px", width: "100%" }}>
                                                <p style={{ color: "#9CA3AF", fontSize: "12px", marginBottom: "4px" }}>{video.date}</p>
                                                <h3 style={{ color: "white", fontSize: isFeatured ? "24px" : "18px", fontWeight: "bold", lineHeight: "1.3", textTransform: "uppercase" }}>
                                                    {video.title}
                                                </h3>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>

            {/* MODAL */}
            {modalVideo && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 9999,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        // Red background with 10-20% opacity as requested: "warna merah yang sama seperti tema tapi opcity nya antara 10 sampai 20 pesrsen saja"
                        // #DC2626 is the theme red (220, 38, 38)
                        backgroundColor: "rgba(220, 38, 38, 0.2)",
                        backdropFilter: "blur(5px)"
                    }}
                    onClick={closeModal}
                >
                    <div
                        style={{
                            position: "relative",
                            width: "90%",
                            maxWidth: "1000px",
                            aspectRatio: "16/9",
                            backgroundColor: "black",
                            borderRadius: "16px",
                            overflow: "hidden",
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            style={{
                                position: "absolute",
                                top: "16px",
                                right: "16px",
                                background: "rgba(0,0,0,0.5)",
                                border: "none",
                                color: "white",
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                cursor: "pointer",
                                zIndex: 10,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <FaTimes size={20} />
                        </button>

                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${modalVideo}?autoplay=1`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}

            <style jsx>{`
        .video-grid {
          display: grid;
          gap: 24px;
        }

        /* --- MOBILE SMALL (< 425px) --- */
        /* Row 1: Featured | Row 2: 1 Item. (Total 2) */
        .video-grid {
           grid-template-columns: 1fr;
           grid-auto-rows: 250px;
        }
        .video-card:nth-child(n+3) {
           display: none;
        }

        /* --- MOBILE LARGE (425px - 768px) --- */
        /* Row 1: Featured (Span 2) | Row 2: 2 Items (1 col each). (Total 3) */
        @media (min-width: 425px) {
           .video-grid {
             grid-template-columns: repeat(2, 1fr);
           }
           .video-card.featured {
             grid-column: span 2;
           }
           /* Show 3rd item, hide 4th+ */
           .video-card:nth-child(3) { display: block; } 
           .video-card:nth-child(n+4) { display: none; }
        }

        /* --- TABLET (768px - 1024px) --- */
        /* Row 1: Featured (Span 3) | Row 2: 3 Items (1 col each). (Total 4) */
        @media (min-width: 768px) {
           .video-grid {
             grid-template-columns: repeat(3, 1fr);
           }
           .video-card.featured {
             grid-column: span 3;
           }
           /* Show 4th item, hide 5th+ */
           .video-card:nth-child(4) { display: block; }
           .video-card:nth-child(n+5) { display: none; }
        }

        /* --- DESKTOP (>= 1024px) --- */
        /* Left: Featured (Span 2x2) | Right: Stacked items. All visible. */
        @media (min-width: 1024px) {
           .video-grid {
             grid-template-columns: repeat(3, 1fr);
           }
           .video-card.featured {
             grid-column: span 2;
             grid-row: span 2;
           }
           .video-card:not(.featured) {
             grid-column: span 1;
             grid-row: span 1;
           }
           /* Show all items */
           .video-card:nth-child(n) { display: block; }
        }

        /* Play Button Styles */
        .play-btn-circle {
           width: 60px;
           height: 60px;
           border-radius: 50%;
           background-color: rgba(220, 38, 38, 0.9); /* Theme Red */
           display: flex;
           align-items: center;
           justify-content: center;
           transition: all 0.3s ease;
           box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7);
        }
        
        /* Play Button Hover Animation */
        .video-card:hover .play-btn-circle {
           transform: scale(1.1);
           box-shadow: 0 0 0 10px rgba(220, 38, 38, 0);
           animation: pulse-red 1.5s infinite;
        }

        @keyframes pulse-red {
           0% {
             transform: scale(0.95);
             box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7);
           }
           70% {
             transform: scale(1);
             box-shadow: 0 0 0 10px rgba(220, 38, 38, 0);
           }
           100% {
             transform: scale(0.95);
             box-shadow: 0 0 0 0 rgba(220, 38, 38, 0);
           }
        }
      `}</style>

        </section>
    );
}
