"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// --- DATA TYPE ---
interface GalleryAlbum {
    thumbnail: string;
    images: string[];
}

const ESSENTIAL_LINKS_1 = [
    { label: "Home", href: "#home" },
    { label: "Match", href: "#match" },
    { label: "Results", href: "#results" },
    { label: "News & Standings", href: "#news" },
];

const ESSENTIAL_LINKS_2 = [
    { label: "Videos", href: "#videos" },
    { label: "Gallery", href: "#gallery" },
    { label: "Merchandise", href: "#merchandise" },
    { label: "Partners", href: "#partners" },
];

const ESSENTIAL_LINKS_3 = [
    { label: "Pertandingan", href: "/pertandingan/jadwal" },
    { label: "Klasemen", href: "/pertandingan/klasemen" },
    { label: "Tim Utama", href: "/tim/utama/pemain" },
    { label: "Tim Akademi", href: "/tim/utama/pemain?tab=akademi" },
    { label: "Officials", href: "/tim/utama/officials" },
];

const ESSENTIAL_LINKS_4 = [
    { label: "Berita", href: "/media/berita" },
    { label: "Gallery", href: "/media/gallery" },
    { label: "Video", href: "/media/video" },
    { label: "Tentang Kami", href: "/klub/tentang" },
    { label: "MUFA", href: "/mufa" },
];

export default function FooterSection() {
    const pathname = usePathname();
    const isHomepage = pathname === "/";

    const [galleryImages, setGalleryImages] = useState<GalleryAlbum[]>([]);
    const [activeAlbum, setActiveAlbum] = useState<GalleryAlbum | null>(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await fetch('/api/footer-gallery');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setGalleryImages(data);
                }
            } catch (error) {
                console.error("Failed to fetch footer gallery", error);
            }
        };
        fetchGallery();
    }, []);

    const openModal = (item: GalleryAlbum) => {
        setActiveAlbum(item);
        setCurrentSlideIndex(0);
    };

    const closeModal = () => {
        setActiveAlbum(null);
        setCurrentSlideIndex(0);
    };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (activeAlbum) {
            setCurrentSlideIndex((prev) => (prev + 1) % activeAlbum.images.length);
        }
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (activeAlbum) {
            setCurrentSlideIndex((prev) => (prev - 1 + activeAlbum.images.length) % activeAlbum.images.length);
        }
    };

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        // Only prevent default and scroll if it's an anchor link on the homepage
        if (isHomepage && href.startsWith("#")) {
            e.preventDefault();
            const targetId = href.replace('#', '');
            const element = document.getElementById(targetId);
            if (element) {
                const headerOffset = 100; // Adjust for fixed navbar
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }
    };

    return (
        <footer style={{ backgroundColor: "#111111", color: "#9CA3AF", paddingTop: "80px", position: "relative" }}>

            {/* Main Footer Content */}
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 60px" }}>
                <div className="footer-grid">

                    {/* COLUMN 1: BRAND */}
                    <div className="footer-col" data-aos="fade-up">
                        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "24px" }}>
                            <Image
                                src="https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png"
                                alt="Madura United FC Logo"
                                width={100}
                                height={100}
                                style={{ objectFit: "contain" }}
                            />
                            <div>
                                <h3 style={{ color: "white", fontWeight: "900", fontSize: "28px", lineHeight: "1", textTransform: "uppercase" }}>
                                    Madura<br />United FC
                                </h3>
                                <span style={{ fontSize: "14px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "2px", color: "#DC2626", display: "block", marginTop: "4px" }}>Football Club</span>
                            </div>
                        </div>
                        <p style={{ fontSize: "14px", lineHeight: "1.6", marginBottom: "32px", color: "#D1D5DB" }}>
                            It was the end of a period in the 1980s in which it seemed like every championship matchup featured the Laskar Sape Kerrab sports club.
                        </p>

                        {/* Social Icons */}
                        <div style={{ display: "flex", gap: "12px" }}>
                            {[
                                { Icon: FaFacebookF, href: "https://www.facebook.com/Maduraunitedfc.official/" },
                                { Icon: FaTwitter, href: "https://x.com/MaduraUnitedFC" },
                                { Icon: FaInstagram, href: "https://www.instagram.com/maduraunited.fc?igsh=bmYxY201MWx6Yjkz" },
                                { Icon: FaYoutube, href: "https://youtube.com/@maduraunitedfc?si=nVakpGhvYmyS3HBb" },
                            ].map(({ Icon, href }, idx) => (
                                <a key={idx} href={href} target="_blank" rel="noopener noreferrer" style={{
                                    width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#1F2937",
                                    display: "flex", alignItems: "center", justifyContent: "center", color: "white",
                                    transition: "background-color 0.3s"
                                }} className="social-link">
                                    <Icon size={14} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* COLUMN 2: ESSENTIAL LINKS */}
                    <div className="footer-col" data-aos="fade-up" data-aos-delay="100">
                        <h4 className="footer-heading">
                            <span style={{ color: "#DC2626", marginRight: "8px" }}>—</span> Essential Links
                        </h4>

                        {isHomepage ? (
                            <div style={{ display: "flex", gap: "40px" }}>
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    {ESSENTIAL_LINKS_1.map((link, idx) => (
                                        <li key={idx} style={{ marginBottom: "16px" }}>
                                            <a
                                                href={link.href}
                                                className="footer-link"
                                                onClick={(e) => handleSmoothScroll(e, link.href)}
                                            >
                                                <span className="link-dot"></span>
                                                {link.label.toUpperCase()}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    {ESSENTIAL_LINKS_2.map((link, idx) => (
                                        <li key={idx} style={{ marginBottom: "16px" }}>
                                            <a
                                                href={link.href}
                                                className="footer-link"
                                                onClick={(e) => handleSmoothScroll(e, link.href)}
                                            >
                                                <span className="link-dot"></span>
                                                {link.label.toUpperCase()}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div style={{ display: "flex", gap: "40px" }}>
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    {ESSENTIAL_LINKS_3.map((link, idx) => (
                                        <li key={idx} style={{ marginBottom: "16px" }}>
                                            <a
                                                href={link.href}
                                                className="footer-link"
                                                onClick={(e) => handleSmoothScroll(e, link.href)}
                                            >
                                                <span className="link-dot"></span>
                                                {link.label.toUpperCase()}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    {ESSENTIAL_LINKS_4.map((link, idx) => (
                                        <li key={idx} style={{ marginBottom: "16px" }}>
                                            <a
                                                href={link.href}
                                                className="footer-link"
                                                onClick={(e) => handleSmoothScroll(e, link.href)}
                                            >
                                                <span className="link-dot"></span>
                                                {link.label.toUpperCase()}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* COLUMN 3: GET IN TOUCH */}
                    <div className="footer-col" data-aos="fade-up" data-aos-delay="200">
                        <h4 className="footer-heading">
                            <span style={{ color: "#DC2626", marginRight: "8px" }}>—</span> Get In Touch
                        </h4>

                        <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "24px" }}>
                            <li style={{ display: "flex", gap: "16px" }}>
                                <FaEnvelope style={{ color: "#DC2626", marginTop: "4px" }} />
                                <div>
                                    <span style={{ display: "block", color: "white", fontWeight: "bold", fontSize: "14px", marginBottom: "4px" }}>EMAIL</span>
                                    <span style={{ fontSize: "14px" }}>info@maduraunited.com</span>
                                </div>
                            </li>
                            <li style={{ display: "flex", gap: "16px" }}>
                                <FaPhoneAlt style={{ color: "#DC2626", marginTop: "4px" }} />
                                <div>
                                    <span style={{ display: "block", color: "white", fontWeight: "bold", fontSize: "14px", marginBottom: "4px" }}>PHONE</span>
                                    <span style={{ fontSize: "14px" }}>098 777 888 90</span>
                                </div>
                            </li>
                            <li style={{ display: "flex", gap: "16px" }}>
                                <FaMapMarkerAlt style={{ color: "#DC2626", marginTop: "4px", flexShrink: 0 }} />
                                <div>
                                    <span style={{ display: "block", color: "white", fontWeight: "bold", fontSize: "14px", marginBottom: "4px" }}>LOCATION</span>
                                    <span style={{ fontSize: "14px" }}>Jl. Raya Panglegur No. 10, Pamekasan, Madura, Jawa Timur</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* COLUMN 4: POST GALLERY */}
                    <div className="footer-col" data-aos="fade-up" data-aos-delay="300">
                        <h4 className="footer-heading">
                            <span style={{ color: "#DC2626", marginRight: "8px" }}>—</span> Post Gallery
                        </h4>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
                            {galleryImages.map((item, idx) => (
                                <div key={idx} style={{ position: "relative", aspectRatio: "1/1", borderRadius: "4px", overflow: "hidden", cursor: "pointer" }} onClick={() => openModal(item)}>
                                    <Image
                                        src={item.thumbnail || '/logo.png'}
                                        alt={`Gallery ${idx + 1}`}
                                        fill
                                        style={{ objectFit: "cover" }}
                                    />
                                    <div className="gallery-overlay">
                                        <div style={{ color: "white", fontWeight: "bold", fontSize: "12px", textTransform: "uppercase", border: "1px solid white", padding: "4px 8px" }}>View Album</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* Copyright BOttom */}
            <div style={{ borderTop: "1px solid #1F2937", padding: "24px", textAlign: "center", backgroundColor: "#0f0f0f" }}>
                <p style={{ fontSize: "13px", color: "#6B7280", letterSpacing: "0.5px" }}>
                    COPYRIGHT & DESIGN BY <span style={{ color: "white", fontWeight: "bold" }}>MADURA UNITED</span> - 2026
                </p>
            </div>

            {/* MODAL */}
            {activeAlbum && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={closeModal}>
                            <FaTimes size={24} />
                        </button>

                        {activeAlbum.images.length > 1 && (
                            <button className="nav-btn prev" onClick={prevImage}>
                                <FaChevronLeft size={24} />
                            </button>
                        )}

                        <div style={{ position: "relative", width: "100%", height: "100%" }}>
                            {activeAlbum.images.length > 0 ? (
                                <Image
                                    src={activeAlbum.images[currentSlideIndex]}
                                    alt={`Selected Gallery Image ${currentSlideIndex + 1}`}
                                    fill
                                    style={{ objectFit: "contain" }}
                                />
                            ) : (
                                <div style={{ color: 'white' }}>No images available</div>
                            )}
                        </div>

                        {activeAlbum.images.length > 1 && (
                            <button className="nav-btn next" onClick={nextImage}>
                                <FaChevronRight size={24} />
                            </button>
                        )}

                        {/* Slide Indicator */}
                        <div style={{ position: "absolute", bottom: "-30px", color: "white", fontSize: "14px" }}>
                            {currentSlideIndex + 1} / {activeAlbum.images.length}
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .gallery-overlay {
                    position: absolute;
                    inset: 0;
                    background: rgba(0,0,0,0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.3s;
                }
                div[onClick]:hover .gallery-overlay {
                    opacity: 1;
                }

                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 9999;
                    background-color: rgba(0, 0, 0, 0.9);
                    backdrop-filter: blur(5px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.3s ease-out;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .modal-content {
                    position: relative;
                    width: 90vw;
                    height: 80vh;
                    max-width: 1000px;
                    display: flex;
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
                    transition: transform 0.2s;
                }
                .close-btn:hover {
                    transform: scale(1.1);
                    color: #DC2626;
                }

                .nav-btn {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(255, 255, 255, 0.1);
                    border: none;
                    color: white;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 50;
                    transition: all 0.3s;
                }
                .nav-btn:hover {
                    background: rgba(220, 38, 38, 1);
                }
                .prev { left: -60px; }
                .next { right: -60px; }

                @media (max-width: 768px) {
                    .prev { left: 10px; background: rgba(0,0,0,0.5); }
                    .next { right: 10px; background: rgba(0,0,0,0.5); }
                }

                .footer-grid {
                    display: grid;
                    grid-template-columns: 1.2fr 1fr 1fr 0.8fr;
                    gap: 40px;
                }
                .footer-col {
                    display: flex;
                    flex-direction: column;
                }
                .footer-heading {
                    color: white;
                    font-size: 18px;
                    font-weight: 800;
                    text-transform: uppercase;
                    margin-bottom: 32px;
                    display: flex;
                    align-items: center;
                }
                .footer-link {
                    color: #9CA3AF;
                    text-decoration: none;
                    font-size: 15px;
                    font-weight: 600;
                    text-transform: uppercase;
                    transition: color 0.2s;
                    display: flex;
                    align-items: center;
                }
                .footer-link:hover {
                    color: #DC2626 !important;
                }
                .social-link:hover {
                    background-color: #DC2626 !important;
                }

                .link-dot {
                    width: 6px;
                    height: 6px;
                    background-color: #4B5563;
                    border-radius: 50%;
                    display: inline-block;
                    margin-right: 10px;
                    vertical-align: middle;
                    transition: background-color 0.2s;
                }
                .footer-link:hover .link-dot, .footer-link-secondary:hover .link-dot {
                    background-color: #DC2626 !important;
                }

                @media (max-width: 1024px) {
                    .footer-grid {
                        grid-template-columns: 1fr 1fr;
                        gap: 48px;
                    }
                }

                @media (max-width: 640px) {
                    .footer-grid {
                        grid-template-columns: 1fr;
                        gap: 48px;
                    }
                }
            `}</style>
        </footer>
    );
}
