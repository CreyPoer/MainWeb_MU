"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

// --- DUMMY DATA ---
const GALLERY_IMAGES = [
    "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=400&auto=format&fit=crop",
];

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

export default function FooterSection() {

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
                            {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, idx) => (
                                <a key={idx} href="#" style={{
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

                        <div style={{ display: "flex", gap: "40px" }}>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {ESSENTIAL_LINKS_1.map((link, idx) => (
                                    <li key={idx} style={{ marginBottom: "16px" }}>
                                        <a
                                            href={link.href}
                                            className="footer-link"
                                            onClick={(e) => handleSmoothScroll(e, link.href)}
                                        >
                                            <span style={{ width: "6px", height: "6px", backgroundColor: "#4B5563", borderRadius: "50%", display: "inline-block", marginRight: "10px", verticalAlign: "middle" }}></span>
                                            {link.label}
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
                                            <span style={{ width: "6px", height: "6px", backgroundColor: "#4B5563", borderRadius: "50%", display: "inline-block", marginRight: "10px", verticalAlign: "middle" }}></span>
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
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
                            {GALLERY_IMAGES.map((src, idx) => (
                                <div key={idx} style={{ position: "relative", aspectRatio: "1/1", borderRadius: "4px", overflow: "hidden" }}>
                                    <Image
                                        src={src}
                                        alt={`Gallery ${idx + 1}`}
                                        fill
                                        style={{ objectFit: "cover" }}
                                    />
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

            <style jsx>{`
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
                    font-size: 13px;
                    font-weight: 600;
                    text-transform: uppercase;
                    transition: color 0.2s;
                    display: flex;
                    align-items: center;
                }
                .footer-link:hover {
                    color: #DC2626;
                }
                .social-link:hover {
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
