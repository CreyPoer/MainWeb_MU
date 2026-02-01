"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaShoppingBag, FaArrowRight } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// --- DUMMY DATA ---
const PRODUCTS = [
    {
        id: 1,
        name: "Home Kit 2024/25",
        category: "JERSEY",
        price: "Rp 599.000",
        images: [
            "/images/merch/red-jersey.png",
            "/images/merch/red-jersey.png", // Duplicate for carousel demo
        ],
    },
    {
        id: 2,
        name: "Away Kit 2024/25",
        category: "JERSEY",
        price: "Rp 599.000",
        images: [
            "/images/merch/away-kit.png",
            "/images/merch/away-kit.png",
        ],
    },
    {
        id: 3,
        name: "MUFC Scarf Red",
        category: "ACCESSORIES",
        price: "Rp 149.000",
        images: [
            "/images/merch/red-scarf.png",
            "/images/merch/red-scarf.png",
        ],
    },
    {
        id: 4,
        name: "Training Jacket",
        category: "APPAREL",
        price: "Rp 450.000",
        images: [
            "/images/merch/red-jacket.png",
            "/images/merch/red-jacket.png",
        ],
    },
    {
        id: 5,
        name: "Third Kit 2024/25",
        category: "JERSEY",
        price: "Rp 599.000",
        images: [
            "/images/merch/away-kit.png", // Reuse away kit for demo or duplicate red
            "/images/merch/red-jersey.png",
        ],
    },
];

export default function MerchandiseSection() {
    return (
        <section
            style={{
                position: "relative",
                backgroundColor: "#DC2626", // Theme Red
                backgroundImage: "linear-gradient(to bottom, #DC2626, #991b1b)", // Red gradient
                padding: "60px 0",
                overflow: "hidden",
            }}
        >
            {/* --- HEADER --- */}
            <div className="container mx-auto px-4 mb-8 relative text-center"> {/* Reduced margin-bottom */}
                {/* 1. Huge Background Text (Layer 1) */}
                <h1
                    data-aos="zoom-in"
                    data-aos-duration="1500"
                    style={{
                        position: "absolute",
                        top: "50%", // Centered vertically in the header app
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: "clamp(60px, 15vw, 200px)",
                        fontWeight: "900",
                        color: "rgba(0, 0, 0, 0.1)",
                        whiteSpace: "nowrap",
                        zIndex: 0,
                        pointerEvents: "none",
                        fontFamily: "fantasy, sans-serif",
                        textTransform: "uppercase"
                    }}
                >
                    CLUB MERCH
                </h1>

                {/* 2. Content Header (Layer 2) */}
                <div style={{ position: "relative", zIndex: 1, marginTop: "0" }} data-aos="fade-up"> {/* Reset margin */}
                    <h4
                        style={{
                            color: "#FFFFFF",
                            fontWeight: "bold",
                            fontSize: "14px",
                            letterSpacing: "2px",
                            marginBottom: "10px",
                            textTransform: "uppercase",
                            textShadow: "0 1px 2px rgba(0,0,0,0.3)"
                        }}
                    >
                        Online Store
                    </h4>
                    <h2
                        className="text-white"
                        style={{
                            fontSize: "clamp(24px, 4vw, 42px)",
                            fontWeight: "800",
                            textTransform: "uppercase",
                            lineHeight: "1.2",
                            maxWidth: "800px",
                            margin: "0 auto",
                            textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                        }}
                    >
                        Support Your Favorite Team With <span style={{ color: "white" }}>Branded Accessories</span>
                    </h2>
                </div>
            </div>



            {/* --- PRODUCT CAROUSEL WRAPPER --- */}
            {/* Added a dedicated wrapper for layout + navigation buttons */}
            <div className="container mx-auto merch-container-trigger" data-aos="fade-up" style={{ position: "relative", zIndex: 2, paddingLeft: "80px", paddingRight: "80px" }}>

                {/* Custom Navigation Buttons (Placed outside Swiper) */}
                <button className="custom-prev-btn">
                    <FaArrowRight style={{ transform: "rotate(180deg)" }} />
                </button>
                <button className="custom-next-btn">
                    <FaArrowRight />
                </button>

                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    // Connect to custom buttons
                    navigation={{
                        nextEl: ".custom-next-btn",
                        prevEl: ".custom-prev-btn",
                    }}
                    className="product-swiper"
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    style={{ overflow: "hidden" }} // Force HIDDEN overflow ensuring strict clipping
                >
                    {PRODUCTS.map((product, index) => (
                        <SwiperSlide key={product.id}>
                            <div
                                className="merch-card-custom group"
                                style={{
                                    transitionDelay: `${index * 150}ms`, // Inline style for stagger
                                    backgroundColor: "#1a1a1a",
                                    borderRadius: "16px",
                                    overflow: "hidden",
                                    border: "1px solid rgba(255, 255, 255, 0.2)",
                                    // Remove inline transition that conflicts with our CSS
                                    // Use CSS class for base transition
                                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                    position: "relative",
                                }}
                            >
                                {/* --- INNER IMAGE SLIDER (Mini Carousel per Card) --- */}
                                <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden" }}>
                                    <Swiper
                                        modules={[Pagination]}
                                        pagination={{ clickable: true, dynamicBullets: true }}
                                        spaceBetween={0}
                                        slidesPerView={1}
                                        style={{ height: "100%", width: "100%" }}
                                        nested={true}
                                        className="inner-image-swiper"
                                    >
                                        {product.images.map((img, idx) => (
                                            <SwiperSlide key={idx}>
                                                <div style={{ width: "100%", height: "100%", position: "relative" }}>
                                                    <Image
                                                        src={img}
                                                        alt={`${product.name} - ${idx + 1}`}
                                                        fill
                                                        style={{ objectFit: "cover" }}
                                                        className="group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    {/* Action Button Overlay */}
                                    <div
                                        style={{
                                            position: "absolute",
                                            bottom: "20px",
                                            left: "20px",
                                            right: "20px",
                                            background: "rgba(0, 0, 0, 0.7)",
                                            backdropFilter: "blur(10px)",
                                            borderRadius: "12px",
                                            padding: "12px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            zIndex: 10,
                                            borderTop: "1px solid rgba(255,255,255,0.2)"
                                        }}
                                    >
                                        <div>
                                            <p style={{ color: "#ccc", fontSize: "10px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase" }}>
                                                {product.category}
                                            </p>
                                            <h3 style={{ color: "white", fontSize: "16px", fontWeight: "bold", lineHeight: "1.2" }}>
                                                {product.name}
                                            </h3>
                                        </div>
                                        <div style={{ textAlign: "right" }}>
                                            <p style={{ color: "#DC2626", alignSelf: "start", fontSize: "14px", fontWeight: "bold" }}>
                                                {product.price}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    style={{
                                        width: "100%",
                                        padding: "16px",
                                        background: "white",
                                        color: "#DC2626",
                                        border: "none",
                                        fontWeight: "bold",
                                        textTransform: "uppercase",
                                        fontSize: "14px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "8px",
                                        cursor: "pointer",
                                        transition: "background 0.3s ease",
                                    }}
                                    className="hover:bg-gray-100"
                                >
                                    <FaShoppingBag /> Buy Now
                                </button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* --- FOOTER BUTTON --- */}
            <div className="container mx-auto px-4 mt-8 text-center" style={{ position: "relative", zIndex: 1 }}>
                <a
                    href="#"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "14px 32px",
                        backgroundColor: "transparent",
                        border: "1px solid rgba(255, 255, 255, 0.4)",
                        color: "white",
                        fontSize: "14px",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        borderRadius: "50px",
                        transition: "all 0.3s ease",
                        textDecoration: "none"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "white";
                        e.currentTarget.style.color = "#DC2626";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "white";
                    }}
                >
                    Selengkapnya <FaArrowRight />
                </a>
            </div>

            <style jsx global>{`
                .merch-card-custom {
                    opacity: 0;
                    transform: scale(0.8);
                    transition: all 0.8s cubic-bezier(0.215, 0.610, 0.355, 1.000);
                }
                
                /* HOVER EFFECT: Peel/Peek next slide */
                /* We shift the SLIDES, not the wrapper, so Swiper's internal drag logic (on wrapper) still works */
                :global(.merch-card-custom:hover .inner-image-swiper .swiper-slide) {
                    transform: translateX(-15%);
                    transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }
                /* Trigger animation when parent (swiper wrapper or container) has aos-animate */
                 :global(.merch-container-trigger.aos-animate) .merch-card-custom {
                    opacity: 1;
                    transform: scale(1);
                }

                .product-swiper {
                    padding-bottom: 50px !important;
                    /* overflow is now handled by inline style on component to be HIDDEN */
                }
                .product-swiper .swiper-pagination-bullet {
                    background: rgba(255,255,255,0.5);
                    opacity: 0.5;
                }
                .product-swiper .swiper-pagination-bullet-active {
                    background: white;
                    opacity: 1;
                }
                
                /* CUSTOM NAV BUTTON STYLES */
                .custom-prev-btn,
                .custom-next-btn {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 50px;
                    height: 50px;
                    background: rgba(255,255,255,0.1);
                    color: white;
                    border: 1px solid rgba(255,255,255,0.3);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 10;
                    backdrop-filter: blur(4px);
                    transition: all 0.3s ease;
                }
                .custom-prev-btn:hover,
                .custom-next-btn:hover {
                    background: white;
                    color: #DC2626;
                }
                .custom-prev-btn {
                    left: 10px; /* Inside the container padding area */
                }
                .custom-next-btn {
                    right: 10px; /* Inside the container padding area */
                }
                .custom-prev-btn.swiper-button-disabled,
                .custom-next-btn.swiper-button-disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
            `}</style>
        </section >
    );
}
