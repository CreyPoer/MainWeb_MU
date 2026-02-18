"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

export default function StandingsHero() {
    const { t, lang } = useLanguage();
    return (
        <section style={{ position: "relative", height: "100vh", minHeight: "400px", width: "100%", overflow: "hidden", backgroundColor: "#111827" }}>
            {/* Background - Failsafe Color #111827 added to section above */}
            <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                {/* Image */}
                <Image
                    src="/klasemen.jpg"
                    alt="Stadion Background"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    priority
                />
                {/* Gradient Overlay - ensuring text readability */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%)",
                        zIndex: 1
                    }}
                />
            </div>

            {/* Content */}
            <div
                style={{
                    position: "relative",
                    zIndex: 10,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    textAlign: "center",
                    padding: "0 20px",
                    marginTop: "40px"
                }}
                data-aos="fade-up"
            >
                <h1
                    className="hero-title"
                    style={{
                        fontSize: "clamp(32px, 5vw, 64px)",
                        fontWeight: "900",
                        textTransform: "uppercase",
                        letterSpacing: "2px",
                        marginBottom: "20px",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
                    }}
                >
                    {t('page.standings.title')}
                </h1>

                {/* Breadcrumb */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontSize: "14px",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        letterSpacing: "1px"
                    }}
                >
                    <Link href={`/${lang}/`} style={{ color: "#D1D5DB", textDecoration: "none", transition: "color 0.3s" }} className="hover:text-white">
                        {t('nav.home')}
                    </Link>
                    <FaChevronRight size={12} style={{ color: "#DC2626" }} />
                    <span style={{ color: "#DC2626" }}>{t('page.standings.breadcrumb')}</span>
                </div>
            </div>
        </section>
    );
}
