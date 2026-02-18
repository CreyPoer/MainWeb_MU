"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaPowerOff, FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

// --- DATA TYPE ---
interface GalleryItem {
    id: string;
    title: string;
    date: string;
    thumbnail: string;
    images: string[];
}

export default function GallerySection() {
    const { t } = useLanguage();
    const [modalData, setModalData] = useState<null | GalleryItem>(null);
    const [sliderIndex, setSliderIndex] = useState(0);
    const [galleryData, setGalleryData] = useState<GalleryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await fetch('/api/gallery');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setGalleryData(data);
                }
            } catch (error) {
                console.error("Failed to fetch gallery", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchGallery();
    }, []);

    const openModal = (item: GalleryItem) => {
        setModalData(item);
        setSliderIndex(0); // Reset to first image
    };

    const closeModal = () => {
        setModalData(null);
    };

    // --- SLIDER LOGIC ---
    const nextSlide = () => {
        if (!modalData || modalData.images.length === 0) return;
        setSliderIndex((prev) => (prev + 1) % modalData.images.length);
    };

    const prevSlide = () => {
        if (!modalData || modalData.images.length === 0) return;
        setSliderIndex((prev) => (prev - 1 + modalData.images.length) % modalData.images.length);
    };

    const getSlideStyle = (index: number) => {
        if (!modalData) return {};
        const totalSlides = modalData.images.length;
        if (totalSlides === 0) return {};

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
            zIndex: zIndex,
            pointerEvents: diff === 0 ? 'auto' : 'none'
        };
    };

    if (isLoading && galleryData.length === 0) {
        return <div style={{ height: '500px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t('common.loading_gallery')}</div>;
    }

    return (
        <section style={{ background: "#ffffffff", padding: "80px 0", position: "relative", overflow: "hidden" }}>

            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
                {/* HEADER */}
                <div style={{ marginBottom: "40px", textAlign: "left" }} data-aos="fade-right">
                    <h4 style={{ color: "#DC2626", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "14px", marginBottom: "8px" }}>
                        {t('section.our_memories')}
                    </h4>
                    <h2 style={{ fontSize: "36px", fontWeight: "900", textTransform: "uppercase", color: "black", lineHeight: "1.2" }}>
                        {t('section.latest')} <span style={{ color: "#DC2626" }}>{t('section.gallery_highlight')}</span>
                    </h2>
                </div>

                {/* GRID */}
                <div className="gallery-grid">
                    {galleryData.slice(0, 3).map((item, index) => {
                        const isTopRow = index < 3;
                        return (
                            <div
                                key={item.id + index}
                                className="gallery-card"
                                data-aos="flip-left"
                                data-aos-delay={index * 100}
                                onClick={() => openModal(item)}
                            >
                                <div className="image-wrapper">
                                    <Image
                                        src={item.thumbnail || '/images/placeholder.png'}
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
                            {modalData.images.length > 1 && (
                                <>
                                    <button className="nav-btn prev" onClick={prevSlide}><FaChevronLeft size={30} /></button>
                                    <button className="nav-btn next" onClick={nextSlide}><FaChevronRight size={30} /></button>
                                </>
                            )}

                            <div className="slides-wrapper">
                                {modalData.images.length > 0 ? (
                                    modalData.images.map((img, i) => {
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
                                    })
                                ) : (
                                    <div style={{ color: 'white' }}>{t('common.no_images')}</div>
                                )}
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
                    width: 35%; /* Active slide width roughly */
                    height: 100%;
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

                @media (min-width: 425px) and (max-width: 768px) {
                    .gallery-card:nth-child(3) {
                        display: none;
                    }
                }

            `}</style>
        </section>
    );
}
