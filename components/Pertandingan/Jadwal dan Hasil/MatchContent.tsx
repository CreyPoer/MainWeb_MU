"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/navigation";
import { MatchData, transformMatchData, APIMatch } from "./matchData";
import { fetchAPI } from "@/utils/api";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MatchContent() {
    const [activeTab, setActiveTab] = useState<'senior' | 'academy'>('senior');
    const [results, setResults] = useState<MatchData[]>([]);
    const [upcoming, setUpcoming] = useState<MatchData[]>([]);
    const [loading, setLoading] = useState(true);
    const [animationClass, setAnimationClass] = useState("fade-in");
    const router = useRouter();
    const { t, lang } = useLanguage();

    const handleMatchClick = (id: number) => {
        router.push(`/${lang}/pertandingan/jadwal/${id}?type=${activeTab}`);
    };

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    // Fetch data when activeTab changes
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const teamRole = activeTab === 'senior' ? 1 : 2; // 1=Senior, 2=Academy/Youth

                // Fetch Finished Matches (Results)
                const finishedData = await fetchAPI(`/matches?status=finished&team_role=${teamRole}&limit=3`);
                const upcomingData = await fetchAPI(`/matches?status=upcoming&team_role=${teamRole}&limit=5`);

                setResults(finishedData.map((m: APIMatch) => transformMatchData(m, teamRole)));
                setUpcoming(upcomingData.map((m: APIMatch) => transformMatchData(m, teamRole)));

            } catch (error) {
                console.error("Error fetching match data:", error);
                // Optionally set empty state or error state
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [activeTab]);

    // Custom Intersection Observer for Scroll Animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target); // Animates only once
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll(".scroll-animate");
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [activeTab, loading]); // Added loading dependency to re-attach observer after data load

    useEffect(() => {
        AOS.refresh();
    }, [activeTab, loading]);

    const handleTabChange = (tab: 'senior' | 'academy') => {
        if (activeTab === tab) return;

        // Start exit animation
        setAnimationClass("slide-out-blur");

        setTimeout(() => {
            setActiveTab(tab);
            // Start enter animation
            setAnimationClass("slide-in-blur");
        }, 300); // Amount of time matching the CSS animation duration
    };

    return (
        <div style={{ backgroundColor: "#F9FAFB", paddingBottom: "80px" }}>

            {/* TAB SWITCHER */}
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "40px", paddingBottom: "10px" }} className="scroll-animate">
                <div style={{
                    backgroundColor: "white",
                    padding: "6px",
                    borderRadius: "50px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    gap: "8px"
                }}>
                    <button
                        onClick={() => handleTabChange('senior')}
                        style={{
                            padding: "10px 24px",
                            borderRadius: "40px",
                            fontSize: "14px",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            backgroundColor: activeTab === 'senior' ? "#DC2626" : "transparent",
                            color: activeTab === 'senior' ? "white" : "#4B5563",
                            border: "none",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            boxShadow: activeTab === 'senior' ? "0 4px 12px rgba(220, 38, 38, 0.3)" : "none"
                        }}
                    >
                        {t('page.schedule.senior_team')}
                    </button>
                    <button
                        onClick={() => handleTabChange('academy')}
                        style={{
                            padding: "10px 24px",
                            borderRadius: "40px",
                            fontSize: "14px",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            backgroundColor: activeTab === 'academy' ? "#DC2626" : "transparent",
                            color: activeTab === 'academy' ? "white" : "#4B5563",
                            border: "none",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            boxShadow: activeTab === 'academy' ? "0 4px 12px rgba(220, 38, 38, 0.3)" : "none"
                        }}
                    >
                        {t('page.schedule.academy_u20')}
                    </button>
                </div>
            </div>

            {/* CONTENT WRAPPER */}
            <div className={animationClass}>

                {loading ? (
                    <div style={{ padding: "100px", textAlign: "center", color: "#6B7280" }}>{t('common.loading')}</div>
                ) : (
                    <>
                        {/* SECTION 1: LATEST MATCH RESULTS */}
                        <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "60px 20px" }}>
                            <div style={{ textAlign: "center", marginBottom: "40px" }}>
                                <h4 style={{ color: "#DC2626", fontWeight: "bold", textTransform: "uppercase", fontSize: "14px", marginBottom: "8px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                                    <span style={{ fontSize: "16px" }}>⚽</span> {activeTab === 'senior' ? t('page.schedule.senior_team') : t('page.schedule.academy_u20')}
                                </h4>
                                <h2 style={{ fontSize: "36px", fontWeight: "900", color: "#111827", textTransform: "uppercase" }}>
                                    {t('page.schedule.latest_match')}
                                </h2>
                            </div>

                            {results.length > 0 ? (
                                <div className="results-grid">
                                    {results.map((match, idx) => {
                                        // Check if this is the last item and the total count is odd
                                        const isLastItemAndOdd = (idx === results.length - 1) && (results.length % 2 !== 0);

                                        return (
                                            <div
                                                key={`${activeTab}-${match.id}`}
                                                className={isLastItemAndOdd ? 'center-odd-card' : ''}
                                                onClick={() => handleMatchClick(match.id)}
                                                style={{
                                                    background: "linear-gradient(155deg, #ffffff 50%, #f3f4f6 50%)",
                                                    borderRadius: "16px",
                                                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                                                    padding: "24px 24px 16px 24px",
                                                    position: "relative",
                                                    overflow: "hidden",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    cursor: "pointer",
                                                    transition: "transform 0.2s ease, box-shadow 0.2s ease"
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = "translateY(-5px)";
                                                    e.currentTarget.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.1)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = "translateY(0)";
                                                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.05)";
                                                }}
                                            >
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", position: "relative", zIndex: 1 }}>
                                                    {/* Home Team */}
                                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", width: "90px" }}>
                                                        <div style={{ position: "relative", width: "64px", height: "64px" }}>
                                                            {match.homeLogo && <Image src={match.homeLogo} alt={match.homeTeam} fill style={{ objectFit: "contain" }} unoptimized />}
                                                        </div>
                                                        <span style={{ fontSize: "12px", fontWeight: "bold", textAlign: "center", lineHeight: "1.2", color: "#111827" }}>{match.homeTeam}</span>
                                                    </div>

                                                    {/* Center: Stadium & Score */}
                                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, marginTop: "8px" }}>

                                                        {/* Stadium */}
                                                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#9CA3AF", marginBottom: "8px", fontWeight: "600" }}>
                                                            <FaMapMarkerAlt style={{ color: "#DC2626" }} /> {match.stadium}
                                                        </div>

                                                        {/* Score */}
                                                        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "48px", fontWeight: "900", color: "#EF4444", lineHeight: "1" }}>
                                                            <span style={{ fontFamily: "sans-serif" }}>{match.homeScore}</span>
                                                            <span style={{ color: "#DC2626", fontSize: "58px", fontWeight: "300" }}>-</span>
                                                            <span style={{ fontFamily: "sans-serif" }}>{match.awayScore}</span>
                                                        </div>

                                                    </div>

                                                    {/* Away Team */}
                                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", width: "90px" }}>
                                                        <div style={{ position: "relative", width: "64px", height: "64px" }}>
                                                            {match.awayLogo && <Image src={match.awayLogo} alt={match.awayTeam} fill style={{ objectFit: "contain" }} unoptimized />}
                                                        </div>
                                                        <span style={{ fontSize: "12px", fontWeight: "bold", textAlign: "center", lineHeight: "1.2", color: "#111827" }}>{match.awayTeam}</span>
                                                    </div>
                                                </div>

                                                {/* Date Bottom */}
                                                <div style={{ marginTop: "auto", textAlign: "center", fontSize: "12px", fontWeight: "700", color: "#6B7280", letterSpacing: "0.5px" }}>
                                                    {match.date} <span style={{ margin: "0 10px", color: "#DC2626" }}>|</span> {match.time}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div style={{ textAlign: "center", color: "#6B7280", padding: "40px" }}>{t('page.schedule.no_results')}</div>
                            )}
                        </section>

                        {/* SECTION 2: UPCOMING MATCHES */}
                        <section style={{ position: "relative", padding: "80px 0", marginTop: "40px" }}>
                            {/* Background Image Overlay */}
                            <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                                <Image
                                    src="/jadwal22.jpg"
                                    alt="Background"
                                    fill
                                    style={{ objectFit: "cover", objectPosition: "center" }}
                                />
                                <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(17, 24, 39, 0.85)" }} />
                            </div>

                            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 20px", position: "relative", zIndex: 10 }}>
                                <div style={{ textAlign: "center", marginBottom: "50px" }} className="scroll-animate">
                                    <h4 style={{ color: "#DC2626", fontWeight: "bold", textTransform: "uppercase", fontSize: "14px", marginBottom: "8px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                                        <span style={{ fontSize: "16px" }}>⚽</span> {t('page.schedule.upcoming')}
                                    </h4>
                                    <h2 style={{ fontSize: "36px", fontWeight: "900", color: "white", textTransform: "uppercase" }}>
                                        {t('section.watch')} {activeTab === 'senior' ? t('page.schedule.senior_team') : t('page.schedule.academy_u20')}
                                    </h2>
                                </div>

                                {upcoming.length > 0 ? (
                                    <div className="upcoming-grid">
                                        {upcoming.map((match, idx) => {
                                            // Logic to center the 5th item (index 4)
                                            // Assuming 2 columns layout on desktop
                                            const isLastItem = idx === upcoming.length - 1 && upcoming.length % 2 !== 0;

                                            return (
                                                <div
                                                    key={`${activeTab}-${match.id}`}
                                                    className={`upcoming-card scroll-animate ${isLastItem ? 'center-card' : ''}`}
                                                    style={{
                                                        backgroundColor: "white",
                                                        borderRadius: "12px",
                                                        overflow: "hidden",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        transitionDelay: `${idx * 100}ms`
                                                    }}
                                                >
                                                    {/* Header: Date & Time */}
                                                    <div style={{
                                                        backgroundColor: "#1F2937",
                                                        color: "#D1D5DB",
                                                        padding: "12px 20px",
                                                        fontSize: "12px",
                                                        fontWeight: "600",
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        textTransform: "uppercase",
                                                        letterSpacing: "0.5px"
                                                    }}>
                                                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                            <FaCalendarAlt /> {match.date}
                                                        </div>

                                                        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "white" }}>
                                                            {match.stadium} <FaMapMarkerAlt style={{ color: "#DC2626" }} />
                                                        </div>
                                                    </div>

                                                    {/* Match Body */}
                                                    <div style={{
                                                        padding: "20px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "space-between",
                                                        flex: 1,
                                                        background: "linear-gradient(to right, #ffffff 50%, #f9fafb 50%)"
                                                    }}>
                                                        {/* Home Team */}
                                                        <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1 }}>
                                                            <div style={{ position: "relative", width: "50px", height: "50px", flexShrink: 0 }}>
                                                                {match.homeLogo && <Image src={match.homeLogo} alt={match.homeTeam} fill style={{ objectFit: "contain" }} unoptimized />}
                                                            </div>
                                                            <span style={{ fontSize: "16px", fontWeight: "800", color: "#111827", textTransform: "uppercase" }}>{match.homeTeam}</span>
                                                        </div>

                                                        {/* VS Badge */}
                                                        <div style={{
                                                            margin: "0 20px",
                                                            fontSize: "24px",
                                                            fontWeight: "900",
                                                            color: "#DC2626",
                                                            fontStyle: "italic",
                                                            textShadow: "1px 1px 0 rgba(0,0,0,0.1)"
                                                        }}>
                                                            VS
                                                        </div>

                                                        {/* Away Team */}
                                                        <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1, justifyContent: "flex-end", textAlign: "right" }}>
                                                            <span style={{ fontSize: "16px", fontWeight: "800", color: "#111827", textTransform: "uppercase" }}>{match.awayTeam}</span>
                                                            <div style={{ position: "relative", width: "50px", height: "50px", flexShrink: 0 }}>
                                                                {match.awayLogo && <Image src={match.awayLogo} alt={match.awayTeam} fill style={{ objectFit: "contain" }} unoptimized />}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Action Button */}
                                                    <div style={{ background: "#DC2626", color: "white", textAlign: "center", padding: "10px", fontWeight: "bold", fontSize: "12px", textTransform: "uppercase", cursor: "pointer", transition: "background 0.3s" }} className="hover:bg-red-700">
                                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                                                            <FaClock /> {match.time}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div style={{ textAlign: "center", color: "white", padding: "40px" }}>{t('page.schedule.no_upcoming')}</div>
                                )}
                            </div>
                        </section>
                    </>
                )}

                {/* CONSOLIDATED STYLES */}
                <style jsx>{`
                    /* ANIMATIONS */
                    @keyframes slideOutBlur {
                        0% {
                            opacity: 1;
                            transform: translateX(0);
                            filter: blur(0);
                        }
                        100% {
                            opacity: 0;
                            transform: translateX(-20px);
                            filter: blur(4px);
                        }
                    }

                    @keyframes slideInBlur {
                        0% {
                            opacity: 0;
                            transform: translateX(20px);
                            filter: blur(4px);
                        }
                        100% {
                            opacity: 1;
                            transform: translateX(0);
                            filter: blur(0);
                        }
                    }

                    .slide-out-blur {
                        animation: slideOutBlur 0.3s forwards ease-in-out;
                    }

                    .slide-in-blur {
                        animation: slideInBlur 0.4s forwards ease-out;
                    }

                    .fade-in {
                        opacity: 1;
                    }

                    /* SCROLL ANIMATION */
                    .scroll-animate {
                        opacity: 0;
                        transform: translateY(30px);
                        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
                    }

                    .scroll-animate.visible {
                        opacity: 1;
                        transform: translateY(0);
                    }

                    /* GRID STYLES */
                    .upcoming-grid, .results-grid {
                        display: grid;
                        grid-template-columns: repeat(1, 1fr);
                        gap: 30px;
                    }
                    
                    @media (min-width: 768px) {
                        .upcoming-grid, .results-grid {
                            grid-template-columns: repeat(2, 1fr);
                        }
                        
                        /* The 5th item (index 4) should span 2 columns and be centered */
                        .center-card, .center-odd-card {
                            grid-column: span 2;
                            width: 60%; /* Adjust width to not look too stretched */
                            margin: 0 auto;
                        }
                        
                        /* For results specifically, usually 3 items, the 3rd one centers */
                        .center-odd-card {
                            width: 60%; /* Or adjust to match card width preference */
                        }
                    }


                    @media (min-width: 1024px) {
                        .results-grid {
                            grid-template-columns: repeat(3, 1fr);
                        }

                        /* On 3 columns, the 3rd item (odd) doesn't need to span or center manually */
                        .results-grid .center-odd-card {
                            grid-column: auto;
                            width: auto;
                            margin: 0;
                        }
                    }

                    /* Mobile Optimization < 425px */
                    @media (max-width: 425px) {
                        /* Header Date & Time */
                        .upcoming-card > div:first-child {
                            font-size: 9px !important;
                            padding: 10px 14px !important;
                        }

                        /* Team Names in Match Body */
                        .upcoming-card span[style*="font-size: 16px"] {
                            font-size: 10px !important;
                        }
                        
                        /* Adjust logo size slightly for balance */
                        .upcoming-card div[style*="width: 50px"] {
                            width: 36px !important;
                            height: 36px !important;
                        }
                        
                        /* VS Text */
                        .upcoming-card div[style*="font-size: 24px"] {
                             font-size: 16px !important;
                             margin: 0 10px !important;
                        }
                    }
                `}</style>
            </div>
        </div>
    );
}
