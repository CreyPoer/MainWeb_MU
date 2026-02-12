"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaPowerOff, FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

// --- DUMMY DATA ---
const GALLERY_DATA = [
    {
        id: "1",
        title: "Training Session Setup",
        date: "JAN 28, 2026",
        thumbnail: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=1200"
        ]
    },
    {
        id: "2",
        title: "Match Day Preparation",
        date: "JAN 25, 2026",
        thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=1200"
        ]
    },
    {
        id: "3",
        title: "Victory Celebration",
        date: "JAN 20, 2026",
        thumbnail: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=1200"
        ]
    },
];

export default function GallerySection() {
    const [modalData, setModalData] = useState<null | typeof GALLERY_DATA[0]>(null);
    const [sliderIndex, setSliderIndex] = useState(0);

    const openModal = (item: typeof GALLERY_DATA[0]) => {
        setModalData(item);
        setSliderIndex(0); // Reset to first image
    };

    const closeModal = () => {
        setModalData(null);
    };

    // --- SLIDER LOGIC ---
    const nextSlide = () => {
        if (!modalData) return;
        setSliderIndex((prev) => (prev + 1) % modalData.images.length);
    };

    const prevSlide = () => {
        if (!modalData) return;
        setSliderIndex((prev) => (prev - 1 + modalData.images.length) % modalData.images.length);
    };

    const getSlideStyle = (index: number) => {
        // Matches the "greyscale-infinite-swiper" logic slightly adapted for React
        // We need 5 items visible ideally: active, prev, next, prev-prev, next-next
        // But for simplicity and matching the reference visual:
        // Center: Scale 1, Color
        // Side: Scale 0.8, Grayscale

        if (!modalData) return {};

        const totalSlides = modalData.images.length;
        // Calculate position relative to active index
        // We want circular distance
        let diff = index - sliderIndex;
        // Adjust for wrapping
        if (diff > totalSlides / 2) diff -= totalSlides;
        if (diff < -totalSlides / 2) diff += totalSlides;

        let scale = 0.6;
        let opacity = 0.5;
        let zIndex = 1;
        let translateX = diff * 50; // Percent spacing
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
            translateX = 50; // Positive for right
        } else if (diff === -1) {
            scale = 0.8;
            opacity = 0.8;
            zIndex = 5;
            grayscale = 70;
            translateX = -50; // Negative for left
        }

        // Hide distant slides to prevent clutter or overflow issues if not handled by hidden overflow
        const isVisible = Math.abs(diff) <= 2;

        return {
            transform: `translateX(calc(-50% + ${translateX}%)) scale(${scale})`,
            opacity: isVisible ? opacity : 0,
            filter: `grayscale(${grayscale}%)`,
            zIndex: zIndex,
            pointerEvents: diff === 0 ? 'auto' : 'none' // only click active?
        };
    };


    return (
        <section style={{ background: "#ffffffff", padding: "80px 0", position: "relative", overflow: "hidden" }}>

            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
                {/* HEADER */}
                <div style={{ marginBottom: "40px", textAlign: "left" }} data-aos="fade-right">
                    <h4 style={{ color: "#DC2626", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "14px", marginBottom: "8px" }}>
                        Our Memories
                    </h4>
                    <h2 style={{ fontSize: "36px", fontWeight: "900", textTransform: "uppercase", color: "black", lineHeight: "1.2" }}>
                        Latest <span style={{ color: "#DC2626" }}>Gallery</span>
                    </h2>
                </div>

                {/* GRID */}
                <div className="gallery-grid">
                    {GALLERY_DATA.map((item, index) => {
                        const isTopRow = index < 3;
                        return (
                            <div
                                key={item.id}
                                className="gallery-card"
                                data-aos="flip-left"
                                data-aos-delay={index * 100}
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

                                    {/* HOVER OVERLAY */}
                                    <div className={`hover-overlay ${isTopRow ? 'from-top-left' : 'from-top-right'}`}>
                                        <div className="overlay-content">
                                            <h3 className="overlay-title">{item.title}</h3>
                                            <div className="power-btn">
                                                <FaPowerOff size={20} color="#FFD700" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* MODAL */}
            {modalData && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        {/* CLOSE BTN */}
                        <button className="close-btn" onClick={closeModal}>
                            <FaTimes size={24} />
                        </button>

                        {/* SLIDER CONTAINER */}
                        <div className="slider-container">
                            {/* NAVIGATION */}
                            <button className="nav-btn prev" onClick={prevSlide}><FaChevronLeft size={30} /></button>
                            <button className="nav-btn next" onClick={nextSlide}><FaChevronRight size={30} /></button>

                            <div className="slides-wrapper">
                                {modalData.images.map((img, i) => {
                                    const style: any = getSlideStyle(i);
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
                                                style={{ objectFit: "cover", borderRadius: "12px" }}
                                            />
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(1, 1fr);
                    gap: 24px;
                }
                @media (min-width: 640px) {
                    .gallery-grid {
                         grid-template-columns: repeat(2, 1fr);
                    }
                }
                @media (min-width: 1024px) {
                     .gallery-grid {
                         grid-template-columns: repeat(3, 1fr);
                    }
                }

                .gallery-card {
                    aspect-ratio: 4/3;
                    cursor: pointer;
                    overflow: hidden;
                    border-radius: 12px;
                    position: relative;
                }

                .image-wrapper {
                    position: relative;
                    width: 100%;
                    height: 100%;
                }

                .hover-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(220, 38, 38, 0.9) 0%, rgba(0,0,0,0.8) 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: all 0.4s ease;
                }

                /* Animation Directions */
                .from-top-left {
                    transform: translate(-100%, -100%);
                }
                .gallery-card:hover .from-top-left {
                    opacity: 1;
                    transform: translate(0, 0);
                }

                .from-top-right {
                     transform: translate(100%, -100%);
                }
                .gallery-card:hover .from-top-right {
                    opacity: 1;
                     transform: translate(0, 0);
                }


                .overlay-content {
                    text-align: center;
                    color: white;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 16px;
                }

                .overlay-title {
                    font-size: 24px;
                    font-weight: bold;
                    text-transform: uppercase;
                }

                .power-btn {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    border: 2px solid #FFD700;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.2s;
                }
                .power-btn:hover {
                    transform: scale(1.1);
                    background: rgba(255, 215, 0, 0.2);
                }
                

                /* MODAL STYLES */
                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 9999;
                    background-color: rgba(0, 0, 0, 0.85);
                    backdrop-filter: blur(5px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    /* Animation: Scale Up & Fade In */
                    animation: modalEntry 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; 
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
                    perspective: 1000px; /* For 3D feel */
                }

                .slides-wrapper {
                    position: relative;
                    width: 60%; /* Active slide width roughly */
                    height: 80%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .slide-item {
                    position: absolute;
                    top: 0;
                    left: 50%; /* Center origin */
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
                    transition: background 0.3s;
                }
                .nav-btn:hover {
                    background: rgba(220, 38, 38, 0.8);
                }
                .prev { left: 20px; }
                .next { right: 20px; }

                @media (max-width: 768px) {
                     .prev { left: 10px; }
                     .next { right: 10px; }
                     .slides-wrapper { width: 90%; }
                }

            `}</style>
        </section>
    );
}
