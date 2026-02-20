"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeroDetailProps {
    title: string;
    image: string;
}

export default function HeroDetail({ title, image }: HeroDetailProps) {
    const { t, lang } = useLanguage();
    return (
        <div
            style={{
                position: "relative",
                height: "260px", // Tidak terlalu tinggi
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
            }}
        >
            {/* Background Image with Parallax-like fixed attachment if desired, but simple absolute is safer for now */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    zIndex: 0,
                }}
            />

            {/* Dark Overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    zIndex: 1,
                }}
            />

            {/* Content */}
            <div
                style={{
                    position: "relative",
                    zIndex: 10,
                    top: "20%",
                    textAlign: "left",
                    padding: "0 20px",
                    maxWidth: "1200px",
                    width: "100%",
                    color: "white",
                }}
            >
                <h1
                    className="hero-title"
                    style={{
                        // fontSize removed here, handled by style jsx
                        fontWeight: "900",
                        textTransform: "uppercase",
                        marginBottom: "16px",
                        lineHeight: "1.2",
                    }}
                >
                    {title}
                </h1>

                {/* Breadcrumb: Beranda > Berita > Judul */}
                <div
                    className="hero-breadcrumb"
                    style={{
                        // fontSize moved to style jsx
                        fontWeight: "600",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        color: "#D1D5DB", // Light gray
                    }}
                >
                    <Link href={`/${lang}/`} style={{ color: "#D1D5DB", textDecoration: "none" }} className="hover:text-white transition-colors">
                        {t('page.news.breadcrumb_home')}
                    </Link>
                    <span style={{ margin: "0 10px" }}>&gt;</span>
                    <Link href={`/${lang}/media/berita`} style={{ color: "#D1D5DB", textDecoration: "none" }} className="hover:text-white transition-colors">
                        {t('page.news.breadcrumb_news')}
                    </Link>
                    <span style={{ margin: "0 10px" }}>&gt;</span>
                    <span style={{ color: "#DC2626" }}>{title}</span> {/* Judul highlight red */}
                </div>
            </div>

            <style jsx>{`
                .hero-title {
                    font-size: 36px;
                }
                .hero-breadcrumb {
                    font-size: 14px;
                }

                @media (max-width: 1024px) {
                    .hero-title {
                        font-size: 24px;
                    }
                }

                @media (max-width: 425px) {
                    .hero-breadcrumb {
                        font-size: 10px;
                    }
                }
            `}</style>
        </div >
    );
}
