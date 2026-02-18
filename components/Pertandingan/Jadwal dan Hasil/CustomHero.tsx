"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

interface CustomHeroProps {
    title?: string;
    titleKey?: string;
    bgImage?: string;
    breadcrumbActive?: string;
    breadcrumbKey?: string;
    activeFilter?: {
        type: string;
        value: string;
    };
}

export default function CustomHero({
    title,
    titleKey,
    bgImage = "/jadwal.jpg",
    breadcrumbActive,
    breadcrumbKey,
    activeFilter
}: CustomHeroProps) {
    const { t, lang } = useLanguage();

    let displayTitle = title;
    if (!displayTitle) {
        if (activeFilter) {
            // "Kategori: Match Report" -> "Category: Match Report"
            // Keys: news.category_prefix, etc.
            const prefixKeyMap: { [key: string]: string } = {
                category: 'category_prefix',
                tag: 'tag_prefix',
                q: 'search_prefix',
                author: 'author_prefix'
            };
            const prefixKey = prefixKeyMap[activeFilter.type];
            if (prefixKey) {
                displayTitle = `${t(`news.${prefixKey}`)}: ${activeFilter.type === 'tag' ? '#' : ''}${activeFilter.type === 'q' ? `"${activeFilter.value}"` : activeFilter.value}`;
            } else {
                displayTitle = activeFilter.value;
            }
        } else if (titleKey) {
            displayTitle = t(titleKey);
        } else {
            // Default fallback if nothing passed (legacy for Jadwal)
            displayTitle = t('page.schedule.title');
        }
    }

    const displayBreadcrumb = breadcrumbActive || (breadcrumbKey ? t(breadcrumbKey) : t('page.schedule.breadcrumb'));
    return (
        <section style={{ position: "relative", height: "100vh", minHeight: "500px", width: "100%", overflow: "hidden", backgroundColor: "#111827" }}>
            {/* Background Image */}
            <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                <Image
                    src={bgImage}
                    alt="Hero Background"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    priority
                />
                {/* Overlay */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)"
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
                    padding: "0 20px"
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
                    {displayTitle}
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
                    <span style={{ color: "#DC2626" }}>{displayBreadcrumb}</span>
                </div>
            </div>
        </section>
    );
}
