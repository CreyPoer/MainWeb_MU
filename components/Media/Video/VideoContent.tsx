"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { FaPlay, FaTimes } from "react-icons/fa";

// --- DATA TYPE ---
interface VideoItem {
    id: string; // YouTube ID
    title: string;
    date: string; // Formatted date string for display
    publishedAt: string; // ISO date string for sorting/filtering
    duration: string;
    type: string;
}

export default function VideoContent() {
    const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
    const [modalVideo, setModalVideo] = useState<string | null>(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedType, setSelectedType] = useState("Semua");
    const [videoData, setVideoData] = useState<VideoItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await fetch('/api/videos/list');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setVideoData(data);
                }
            } catch (error) {
                console.error("Failed to fetch videos", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchVideos();
    }, []);

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

    const filteredVideos = useMemo(() => {
        let items = [...videoData];

        if (selectedType !== "Semua") {
            items = items.filter((video) => video.type === selectedType);
        }

        if (startDate) {
            const start = new Date(startDate);
            items = items.filter((video) => new Date(video.publishedAt) >= start);
        }

        if (endDate) {
            const end = new Date(endDate);
            // End date should include the whole day, so set time to 23:59:59
            const endDateTime = new Date(endDate);
            endDateTime.setHours(23, 59, 59, 999);
            items = items.filter((video) => new Date(video.publishedAt) <= endDateTime);
        }

        // Sort terbaru ke terlama (assuming API returns unsorted or we want to enforce it)
        items.sort(
            (a, b) =>
                new Date(b.publishedAt).getTime() -
                new Date(a.publishedAt).getTime()
        );

        return items;
    }, [startDate, endDate, selectedType, videoData]);

    // Check if any filter is active
    const isFilterActive = startDate !== "" || endDate !== "" || selectedType !== "Semua";

    if (isLoading && videoData.length === 0) {
        return (
            <div style={{ height: '600px', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>Loading videos...</p>
            </div>
        );
    }

    return (
        <section
            style={{
                backgroundColor: "#FFFFFF",
                padding: "80px 0 100px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: "2%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: "12vw",
                    fontWeight: 900,
                    color: "rgba(15, 23, 42, 0.06)",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                    zIndex: 0,
                }}
                data-aos="zoom-in"
                data-aos-duration="1500"
            >
                WATCH HIGHLIGHT
            </div>

            <div
                style={{
                    maxWidth: "1280px",
                    margin: "0 auto",
                    padding: "0 24px",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <div
                    className="video-header"
                    data-aos="fade-down"
                >
                    <div>
                        <h4
                            style={{
                                color: "#DC2626",
                                fontWeight: "bold",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                                fontSize: "14px",
                                marginBottom: "8px",
                            }}
                        >
                            Our Videos
                        </h4>
                        <h2
                            style={{
                                fontSize: "36px",
                                fontWeight: 900,
                                textTransform: "uppercase",
                                color: "#111827",
                                lineHeight: "1.2",
                            }}
                        >
                            Watch {" "}
                            <span style={{ color: "#DC2626" }}>Highlights</span>
                        </h2>
                    </div>

                    <div className="video-filter">
                        <div className="video-filter-group">
                            <span className="video-filter-label">Tipe</span>
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <select
                                    className="video-filter-input"
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    style={{
                                        minWidth: '100px',
                                        cursor: 'pointer',
                                        paddingRight: '40px', // Extra space for arrow
                                        appearance: 'none',   // Remove default arrow
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3F%3E%3C/svg%3E")`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'right 12px center',
                                        backgroundSize: '16px',
                                    }}
                                >
                                    <option value="Semua">Semua</option>
                                    <option value="MUFA">MUFA</option>
                                    <option value="MUTV">MUTV</option>
                                </select>
                            </div>
                        </div>

                        <div className="video-filter-group">
                            <span className="video-filter-label">Dari</span>
                            <input
                                type="date"
                                className="video-filter-input"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="video-filter-group">
                            <span className="video-filter-label">Sampai</span>
                            <input
                                type="date"
                                className="video-filter-input"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>

                        {isFilterActive && (
                            <button
                                type="button"
                                className="video-filter-reset"
                                onClick={() => {
                                    setStartDate("");
                                    setEndDate("");
                                    setSelectedType("Semua");
                                }}
                            >
                                Reset
                            </button>
                        )}
                    </div>
                </div>

                <div className="video-grid">
                    {filteredVideos.map((video, index) => {
                        return (
                            <div
                                key={video.id + index}
                                className="video-card"
                                data-aos="zoom-in"
                                data-aos-delay={index * 100}
                                onMouseEnter={() => handleMouseEnter(video.id)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => openModal(video.id)}
                            >
                                <div
                                    style={{
                                        position: "relative",
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: "12px",
                                        overflow: "hidden",
                                        backgroundColor: "#000",
                                        cursor: "pointer",
                                    }}
                                >
                                    {hoveredVideo === video.id ? (
                                        <div
                                            style={{
                                                position: "relative",
                                                width: "100%",
                                                height: "100%",
                                            }}
                                        >
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0`}
                                                title={video.title}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                style={{
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
                                                    objectFit: "cover",
                                                    pointerEvents: "none",
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            className="thumbnail-wrapper"
                                            style={{
                                                position: "relative",
                                                width: "100%",
                                                height: "100%",
                                            }}
                                        >
                                            <Image
                                                src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                                                alt={video.title}
                                                fill
                                                style={{
                                                    objectFit: "cover",
                                                    transition: "transform 0.5s ease",
                                                }}
                                                className="thumbnail-img"
                                            />

                                            <div
                                                style={{
                                                    position: "absolute",
                                                    inset: 0,
                                                    background:
                                                        "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                                                }}
                                            ></div>

                                            {video.duration && (
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: "16px",
                                                        left: "16px",
                                                        backgroundColor:
                                                            "rgba(220, 38, 38, 0.9)",
                                                        color: "white",
                                                        padding: "4px 8px",
                                                        borderRadius: "4px",
                                                        fontSize: "12px",
                                                        fontWeight: "bold",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "6px",
                                                    }}
                                                >
                                                    <FaPlay size={10} /> {video.duration}
                                                </div>
                                            )}

                                            <div
                                                className="play-button-wrapper"
                                                style={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    left: "50%",
                                                    transform:
                                                        "translate(-50%, -50%)",
                                                }}
                                            >
                                                <div className="play-btn-circle">
                                                    <FaPlay
                                                        size={20}
                                                        color="white"
                                                        style={{ marginLeft: "4px" }}
                                                    />
                                                </div>
                                            </div>

                                            <div
                                                style={{
                                                    position: "absolute",
                                                    bottom: 0,
                                                    left: 0,
                                                    padding: "24px",
                                                    width: "100%",
                                                }}
                                            >
                                                <p
                                                    style={{
                                                        color: "#D1D5DB",
                                                        fontSize: "12px",
                                                        marginBottom: "4px",
                                                    }}
                                                >
                                                    {video.date}
                                                </p>
                                                <h3
                                                    style={{
                                                        color: "white",
                                                        fontSize: "18px",
                                                        fontWeight: "bold",
                                                        lineHeight: "1.3",
                                                        textTransform:
                                                            "uppercase",
                                                    }}
                                                >
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

            {modalVideo && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 9999,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(220, 38, 38, 0.2)",
                        backdropFilter: "blur(5px)",
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
                            boxShadow:
                                "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
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
                                justifyContent: "center",
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
                .video-header {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    margin-bottom: 40px;
                    text-align: left;
                }

                .video-filter {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                    align-items: center;
                    padding: 12px 16px;
                    border-radius: 9px;
                    background: rgba(15, 23, 42, 0.95);
                    box-shadow: 0 10px 25px rgba(15, 23, 42, 0.3);
                }

                .video-filter-group {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .video-filter-label {
                    font-size: 12px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.06em;
                    color: #ffffff;
                }

                .video-filter-input {
                    padding: 6px 10px;
                    border-radius: 999px;
                    border: 1px solid #e5e7eb;
                    font-size: 12px;
                    color: #f9fafb;
                    background-color: #111827;
                    outline: none;
                }

                .video-filter-input:focus {
                    border-color: #dc2626;
                    box-shadow: 0 0 0 1px rgba(220, 38, 38, 0.2);
                }

                .video-filter-reset {
                    padding: 8px 14px;
                    border-radius: 999px;
                    border: none;
                    background-color: #dc2626;
                    color: #ffffff;
                    font-size: 12px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.06em;
                    cursor: pointer;
                    box-shadow: 0 8px 18px rgba(220, 38, 38, 0.25);
                }

                @media (min-width: 768px) {
                    .video-header {
                        flex-direction: row;
                        align-items: flex-end;
                        justify-content: space-between;
                    }

                    .video-filter {
                        justify-content: flex-end;
                    }
                }

                .video-grid {
                    display: grid;
                    gap: 24px;
                    grid-template-columns: 1fr;
                    grid-auto-rows: 250px;
                }

                @media (min-width: 640px) {
                    .video-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (min-width: 1024px) {
                    .video-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }

                .play-btn-circle {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background-color: rgba(220, 38, 38, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7);
                }

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

