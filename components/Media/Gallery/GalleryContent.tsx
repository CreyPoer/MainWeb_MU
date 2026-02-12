"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { FaPowerOff, FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

type Category = "Pertandingan" | "Latihan" | "Lain-lain";

interface GalleryItem {
    id: string;
    title: string;
    date: string;
    category: Category;
    thumbnail: string;
    images: string[];
}

const GALLERY_DATA: GalleryItem[] = [
    {
        id: "1",
        title: "Match Day: Home Stadium Warm Up",
        date: "08 Februari 2026",
        category: "Pertandingan",
        thumbnail:
            "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=900",
        images: [
            "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=1400",
            "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=1400",
            "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=1400",
            "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1400",
        ],
    },
    {
        id: "2",
        title: "Kick Off Moment: Laskar Sape Kerrab",
        date: "05 Februari 2026",
        category: "Pertandingan",
        thumbnail:
            "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=900",
        images: [
            "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=1400",
            "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=1400",
            "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=1400",
            "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1400",
        ],
    },
    {
        id: "3",
        title: "Intense Training: Finishing Session",
        date: "02 Februari 2026",
        category: "Latihan",
        thumbnail:
            "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=900",
        images: [
            "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1400",
            "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=1400",
            "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&q=80&w=1400",
            "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=1400",
        ],
    },
    {
        id: "4",
        title: "Goalkeeper Special Drills",
        date: "30 Januari 2026",
        category: "Latihan",
        thumbnail:
            "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&q=80&w=900",
        images: [
            "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&q=80&w=1400",
            "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=1400",
            "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=1400",
            "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=1400",
        ],
    },
    {
        id: "5",
        title: "Fans Moment: Celebration with K-Conk",
        date: "28 Januari 2026",
        category: "Lain-lain",
        thumbnail:
            "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=900",
        images: [
            "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=1400",
            "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=1400",
            "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1400",
            "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=1400",
        ],
    },
    {
        id: "6",
        title: "Club Activities: Community Program",
        date: "22 Januari 2026",
        category: "Lain-lain",
        thumbnail:
            "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=900",
        images: [
            "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=1400",
            "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=1400",
            "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1400",
            "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=1400",
        ],
    },
];

const FILTERS: (Category | "All")[] = ["All", "Pertandingan", "Latihan", "Lain-lain"];

export default function GalleryContent() {
    const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>("All");
    const [modalData, setModalData] = useState<GalleryItem | null>(null);
    const [sliderIndex, setSliderIndex] = useState(0);

    const filteredData = useMemo(() => {
        if (activeFilter === "All") return GALLERY_DATA;
        return GALLERY_DATA.filter((item) => item.category === activeFilter);
    }, [activeFilter]);

    const openModal = (item: GalleryItem) => {
        setModalData(item);
        setSliderIndex(0);
    };

    const closeModal = () => {
        setModalData(null);
    };

    const nextSlide = () => {
        if (!modalData) return;
        setSliderIndex((prev) => (prev + 1) % modalData.images.length);
    };

    const prevSlide = () => {
        if (!modalData) return;
        setSliderIndex((prev) => (prev - 1 + modalData.images.length) % modalData.images.length);
    };

    const getSlideStyle = (index: number) => {
        if (!modalData) return {};

        const totalSlides = modalData.images.length;
        let diff = index - sliderIndex;

        if (diff > totalSlides / 2) diff -= totalSlides;
        if (diff < -totalSlides / 2) diff += totalSlides;

        let scale = 0.6;
        let opacity = 0.5;
        let zIndex = 1;
        let translateX = diff * 50;
        let grayscale = 100;

        if (diff === 0) {
            scale = 1;
            opacity = 1;
            zIndex = 10;
            translateX = 0;
            grayscale = 0;
        } else if (diff === 1) {
            scale = 0.8;
            opacity = 0.8;
            zIndex = 5;
            grayscale = 70;
            translateX = 50;
        } else if (diff === -1) {
            scale = 0.8;
            opacity = 0.8;
            zIndex = 5;
            grayscale = 70;
            translateX = -50;
        }

        const isVisible = Math.abs(diff) <= 2;

        return {
            transform: `translateX(calc(-50% + ${translateX}%)) scale(${scale})`,
            opacity: isVisible ? opacity : 0,
            filter: `grayscale(${grayscale}%)`,
            zIndex,
            pointerEvents: diff === 0 ? "auto" : "none",
        } as React.CSSProperties;
    };

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
                    maxWidth: "1280px",
                    margin: "0 auto",
                    padding: "0 24px",
                }}
            >
                {/* HEADER & FILTER */}
                <div className="gallery-header" data-aos="fade-up">
                    <div className="gallery-header-text">
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
                            Our Memories
                        </h4>
                        <h2
                            style={{
                                fontSize: "36px",
                                fontWeight: 900,
                                textTransform: "uppercase",
                                color: "#111827",
                                lineHeight: 1.2,
                            }}
                        >
                            Club <span style={{ color: "#DC2626" }}>Photo Gallery</span>
                        </h2>
                    </div>

                    <div className="gallery-filters">
                        {FILTERS.map((filter) => {
                            const isActive = activeFilter === filter;
                            return (
                                <button
                                    key={filter}
                                    onClick={() => {
                                        setActiveFilter(filter);
                                        setModalData(null);
                                    }}
                                    style={{
                                        padding: "8px 18px",
                                        borderRadius: "999px",
                                        border: isActive ? "none" : "1px solid #E5E7EB",
                                        backgroundColor: isActive ? "#DC2626" : "#FFFFFF",
                                        color: isActive ? "#FFFFFF" : "#4B5563",
                                        fontSize: "12px",
                                        fontWeight: 700,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.06em",
                                        cursor: "pointer",
                                        boxShadow: isActive
                                            ? "0 10px 20px rgba(220,38,38,0.3)"
                                            : "0 2px 4px rgba(0,0,0,0.04)",
                                        transition:
                                            "background-color 0.25s ease, color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
                                        transform: isActive ? "translateY(-1px)" : "translateY(0)",
                                    }}
                                >
                                    {filter === "All" ? "All" : filter}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* GRID */}
                <div className="gallery-grid">
                    {filteredData.map((item, index) => (
                        <div
                            key={item.id}
                            className="gallery-card fade-in-card"
                            data-aos="zoom-in-up"
                            data-aos-delay={index * 80}
                            onClick={() => openModal(item)}
                        >
                            <div className="image-wrapper">
                                <Image
                                    src={item.thumbnail}
                                    alt={item.title}
                                    fill
                                    style={{ objectFit: "cover" }}
                                    className="gallery-img"
                                />

                                <div className="hover-overlay">
                                    <div className="overlay-inner">
                                        <div className="power-btn">
                                            <FaPowerOff size={20} color="#FFD700" />
                                        </div>
                                        <div className="overlay-content">
                                            <p className="overlay-date">{item.date}</p>
                                            <h3 className="overlay-title">{item.title}</h3>
                                            <span className="overlay-category">{item.category}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* MODAL */}
            {modalData && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="close-btn" onClick={closeModal}>
                            <FaTimes size={24} />
                        </button>

                        <div className="slider-container">
                            <button className="nav-btn prev" onClick={prevSlide}>
                                <FaChevronLeft size={30} />
                            </button>
                            <button className="nav-btn next" onClick={nextSlide}>
                                <FaChevronRight size={30} />
                            </button>

                            <div className="slides-wrapper">
                                {modalData.images.map((img, i) => {
                                    const style = getSlideStyle(i);
                                    return (
                                        <div
                                            key={i}
                                            className="slide-item"
                                            style={style}
                                        >
                                            <Image
                                                src={img}
                                                alt={`Slide ${i}`}
                                                fill
                                                style={{
                                                    objectFit: "cover",
                                                    borderRadius: "12px",
                                                }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .gallery-header {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    margin-bottom: 40px;
                }

                .gallery-header-text {
                    text-align: left;
                }

                .gallery-filters {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                }

                @media (min-width: 768px) {
                    .gallery-header {
                        flex-direction: row;
                        align-items: flex-end;
                        justify-content: space-between;
                    }

                    .gallery-header-text {
                        max-width: 50%;
                    }
                }

                .gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(1, minmax(0, 1fr));
                    gap: 24px;
                }

                @media (min-width: 640px) {
                    .gallery-grid {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }
                }

                @media (min-width: 1024px) {
                    .gallery-grid {
                        grid-template-columns: repeat(3, minmax(0, 1fr));
                    }
                }

                .gallery-card {
                    aspect-ratio: 4 / 3;
                    cursor: pointer;
                    overflow: hidden;
                    border-radius: 14px;
                    position: relative;
                    background: #f9fafb;
                    box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
                    transform-origin: center;
                    transition: transform 0.25s ease, box-shadow 0.25s ease;
                }

                .gallery-card:hover {
                    transform: translateY(-6px) scale(1.01);
                    box-shadow: 0 18px 35px rgba(15, 23, 42, 0.16);
                }

                .image-wrapper {
                    position: relative;
                    width: 100%;
                    height: 100%;
                }

                .gallery-img {
                    transition: transform 0.4s ease, filter 0.4s ease;
                }

                .gallery-card:hover .gallery-img {
                    transform: scale(1.05);
                    filter: brightness(0.45);
                }

                .hover-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        180deg,
                        rgba(15, 23, 42, 0.05) 0%,
                        rgba(15, 23, 42, 0.85) 100%
                    );
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                    opacity: 0;
                    transform: translateY(24px);
                    transition: opacity 0.35s ease, transform 0.35s ease;
                }

                .gallery-card:hover .hover-overlay {
                    opacity: 1;
                    transform: translateY(0);
                }

                .overlay-inner {
                    width: 100%;
                    max-width: 90%;
                    padding: 0 16px 18px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-end;
                    gap: 10px;
                }

                .overlay-content {
                    width: 100%;
                    padding: 14px 16px 16px;
                    border-radius: 14px;
                    background: rgba(15, 23, 42, 0.9);
                    border: 1px solid rgba(148, 163, 184, 0.35);
                    backdrop-filter: blur(10px);
                    color: #f9fafb;
                    text-align: left;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    box-shadow: 0 16px 35px rgba(15, 23, 42, 0.55);
                }

                .overlay-date {
                    font-size: 10px;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    color: #9ca3af;
                }

                .overlay-title {
                    font-size: 15px;
                    font-weight: 800;
                    text-transform: uppercase;
                    line-height: 1.35;
                }

                .overlay-category {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 3px 10px;
                    border-radius: 999px;
                    font-size: 10px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.14em;
                    background: #dc2626;
                    color: #f9fafb;
                    margin-top: 2px;
                }

                .power-btn {
                    width: 56px;
                    height: 56px;
                    border-radius: 999px;
                    border: 2px solid #facc15;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: radial-gradient(
                        circle at 30% 0%,
                        rgba(250, 204, 21, 0.3) 0%,
                        rgba(15, 23, 42, 0.95) 55%
                    );
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                    box-shadow: 0 0 0 rgba(250, 204, 21, 0.5);
                }

                .power-btn:hover {
                    transform: scale(1.06) translateY(-1px);
                    box-shadow: 0 0 20px rgba(250, 204, 21, 0.8);
                }

                .fade-in-card {
                    opacity: 0;
                    transform: translateY(18px);
                    animation: fadeInUp 0.45s ease forwards;
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(18px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 9999;
                    background-color: rgba(0, 0, 0, 0.88);
                    backdrop-filter: blur(6px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: modalEntry 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)
                        forwards;
                }

                @keyframes modalEntry {
                    0% {
                        opacity: 0;
                        transform: scale(0.5) translateY(50px);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }

                .modal-content {
                    width: 90vw;
                    height: 80vh;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                .close-btn {
                    position: absolute;
                    top: -40px;
                    right: 0;
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    z-index: 100;
                }

                .slider-container {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    perspective: 1000px;
                }

                .slides-wrapper {
                    position: relative;
                    width: 60%;
                    height: 80%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .slide-item {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    width: 100%;
                    height: 100%;
                    transition: all 0.5s ease-in-out;
                    transform-origin: center center;
                }

                .nav-btn {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(255, 255, 255, 0.1);
                    border: none;
                    color: white;
                    padding: 16px;
                    border-radius: 50%;
                    cursor: pointer;
                    z-index: 50;
                    transition: background 0.3s ease;
                }

                .nav-btn:hover {
                    background: rgba(220, 38, 38, 0.85);
                }

                .prev {
                    left: 20px;
                }

                .next {
                    right: 20px;
                }

                @media (max-width: 768px) {
                    .prev {
                        left: 10px;
                    }

                    .next {
                        right: 10px;
                    }

                    .slides-wrapper {
                        width: 90%;
                        height: 70%;
                    }
                }
            `}</style>
        </section>
    );
}
