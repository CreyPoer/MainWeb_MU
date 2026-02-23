"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { FaTrophy, FaArrowUp, FaArrowDown, FaShieldAlt, FaFutbol, FaMinusCircle } from "react-icons/fa";
import { StandingTeam } from "./data";
import { useLanguage } from "@/contexts/LanguageContext";

interface StandingsOverviewProps {
    data: StandingTeam[];
    activeCategory: 'senior' | 'u20';
    setActiveCategory: (cat: 'senior' | 'u20') => void;
    activeU20Group: 'A' | 'B';
    setActiveU20Group: (group: 'A' | 'B') => void;
}

export default function StandingsOverview({ data, activeCategory, setActiveCategory, activeU20Group, setActiveU20Group }: StandingsOverviewProps) {
    const { t } = useLanguage();
    // --- CALCULATE METRICS ---
    const stats = useMemo(() => {
        if (!data || data.length === 0) return null;

        // 1. Top Ranked
        const topRanked = data[0]; // Assumes sorted by position

        // 2. Most Productive (Highest GF)
        const mostGoals = [...data].sort((a, b) => b.goalsFor - a.goalsFor)[0];

        // 3. Best Defense (Lowest GA)
        const bestDefense = [...data].sort((a, b) => a.goalsAgainst - b.goalsAgainst)[0];

        // 4. Draw Kings (Highest Draws)
        const drawKing = [...data].sort((a, b) => b.drawn - a.drawn)[0];

        // 5. Tough to Beat (Fewest Losses)
        const toughToBeat = [...data].sort((a, b) => a.lost - b.lost)[0];

        // 6. Most Points Lost (Highest Loss)
        const mostLoss = [...data].sort((a, b) => b.lost - a.lost)[0];


        return { topRanked, mostGoals, bestDefense, drawKing, toughToBeat, mostLoss };
    }, [data]);

    if (!stats) return null;

    const OverviewCard = ({ title, team, valueLabel, value, icon, color = "#DC2626" }: { title: string, team: StandingTeam, valueLabel: string, value: string | number, icon: any, color?: string }) => (
        <div style={{
            backgroundColor: "white",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            minWidth: "200px",
            flex: 1
        }} className="overview-card">
            <div style={{ width: "64px", height: "64px", position: "relative", marginBottom: "16px" }}>
                <Image src={team.logo} alt={team.name} fill style={{ objectFit: "contain" }} />
            </div>
            <h4 style={{ fontSize: "14px", fontWeight: "900", color: "#111827", textTransform: "uppercase", marginBottom: "4px", lineHeight: "1.2", height: "34px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {team.name}
            </h4>
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#6B7280", textTransform: "uppercase", marginBottom: "12px", letterSpacing: "0.5px" }}>
                {t(title)}
            </span>
            <div style={{ fontSize: "32px", fontWeight: "900", color: color, display: "flex", flexDirection: "column", alignItems: "center", lineHeight: "1" }}>
                {value}
                {valueLabel && <span style={{ fontSize: "12px", color: color, marginTop: "4px", fontWeight: "600" }}>{t(valueLabel)}</span>}
            </div>
        </div>
    );

    return (
        <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "60px 20px 40px" }} data-aos="fade-up">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px", marginBottom: "40px" }} className="overview-header-container">
                {/* Titles (Left) */}
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                        <p style={{ fontSize: "14px", color: "#6B7280", fontWeight: "600" }}>
                            {t('page.standings.overview.season')} 2025-2026
                        </p>
                    </div>
                    <h2 style={{ fontSize: "32px", fontWeight: "900", textTransform: "uppercase", color: "#111827", margin: 0 }}>
                        {t('page.standings.overview.title')}
                    </h2>
                </div>

                {/* TAB SWITCHER SECTION (Right) */}
                <div style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    padding: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    display: "inline-flex",
                    gap: "6px",
                    flexWrap: "wrap",
                    border: "1px solid #F3F4F6",
                }}>
                    {/* Main Tabs */}
                    <button
                        onClick={() => setActiveCategory('senior')}
                        style={{
                            padding: "8px 16px",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            fontSize: "12px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            backgroundColor: activeCategory === 'senior' ? "#DC2626" : "transparent",
                            color: activeCategory === 'senior' ? "white" : "#4B5563",
                            transition: "all 0.3s",
                            border: "none",
                            cursor: "pointer"
                        }}
                    >
                        {t('page.schedule.senior_team') || 'Senior Team'}
                    </button>
                    <button
                        onClick={() => setActiveCategory('u20')}
                        style={{
                            padding: "8px 16px",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            fontSize: "12px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            backgroundColor: activeCategory === 'u20' ? "#DC2626" : "transparent",
                            color: activeCategory === 'u20' ? "white" : "#4B5563",
                            transition: "all 0.3s",
                            border: "none",
                            cursor: "pointer"
                        }}
                    >
                        {t('page.schedule.academy_u20') || 'U-20 Team'}
                    </button>

                    {/* Divider if U20 selected */}
                    {activeCategory === 'u20' && (
                        <div style={{ width: "1px", backgroundColor: "#E5E7EB", margin: "0 4px" }}></div>
                    )}

                    {/* Sub Tabs for U20 */}
                    {activeCategory === 'u20' && (
                        <>
                            <button
                                onClick={() => setActiveU20Group('A')}
                                style={{
                                    padding: "8px 16px",
                                    borderRadius: "8px",
                                    fontWeight: "bold",
                                    fontSize: "12px",
                                    backgroundColor: activeU20Group === 'A' ? "#1F2937" : "#F3F4F6",
                                    color: activeU20Group === 'A' ? "white" : "#6B7280",
                                    transition: "all 0.3s",
                                    border: "none",
                                    cursor: "pointer"
                                }}
                            >
                                Group A
                            </button>
                            <button
                                onClick={() => setActiveU20Group('B')}
                                style={{
                                    padding: "8px 16px",
                                    borderRadius: "8px",
                                    fontWeight: "bold",
                                    fontSize: "12px",
                                    backgroundColor: activeU20Group === 'B' ? "#1F2937" : "#F3F4F6",
                                    color: activeU20Group === 'B' ? "white" : "#6B7280",
                                    transition: "all 0.3s",
                                    border: "none",
                                    cursor: "pointer"
                                }}
                            >
                                Group B
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Cards Grid */}
            <div className="overview-grid" style={{ padding: "20px" }}>
                <OverviewCard
                    title="page.standings.overview.most_goals"
                    team={stats.mostGoals}
                    valueLabel="page.standings.overview.scored_label"
                    value={stats.mostGoals.goalsFor}
                    icon={<FaFutbol />}
                    color="#059669" // Green
                />
                <OverviewCard
                    title="page.standings.overview.best_defense"
                    team={stats.bestDefense}
                    valueLabel="page.standings.overview.conceded_label"
                    value={stats.bestDefense.goalsAgainst}
                    icon={<FaShieldAlt />}
                    color="#2563EB" // Blue
                />
                <OverviewCard
                    title="page.standings.overview.hardest_beat"
                    team={stats.toughToBeat}
                    valueLabel="page.standings.overview.losses_label"
                    value={stats.toughToBeat.lost}
                    icon={<FaMinusCircle />}
                    color="#D97706" // Amber
                />
                <OverviewCard
                    title="page.standings.overview.most_losses"
                    team={stats.mostLoss}
                    valueLabel="page.standings.overview.losses_label"
                    value={stats.mostLoss.lost}
                    icon={<FaArrowDown />}
                    color="#DC2626" // Red
                />
                <OverviewCard
                    title="page.standings.overview.draw_specialist"
                    team={stats.drawKing}
                    valueLabel="page.standings.overview.draws_label"
                    value={stats.drawKing.drawn}
                    icon={<FaMinusCircle />}
                    color="#4B5563" // Gray
                />
            </div>

            <style jsx>{`
                .overview-grid {
                    display: flex;
                    gap: 16px; /* Spacing between cards */
                    overflow-x: auto; /* Allow scroll on small screens */
                    padding-bottom: 20px; /* Space for scrollbar */
                    padding-top: 10px; /* Space for hover animation */
                }
                
                :global(.overview-card) {
                    border: 1px solid #E5E7EB;
                    border-radius: 12px;
                    background-color: white;
                    /* Show no box-shadow normally */
                    box-shadow: none; 
                    transition: all 0.2s ease;
                }

                :global(.overview-card:hover) {
                    /* On hover, move card slightly up-left and reveal the red shadow */
                    transform: translate(-2px, -2px);
                    box-shadow: 6px 6px 0px 0px #DC2626; 
                }
                
                @media (max-width: 1024px) {
                     .overview-grid {
                        flex-wrap: nowrap; /* Force single row with scroll */
                     }
                     :global(.overview-card) {
                        min-width: 200px; /* Ensure cards don't shrink too much */
                     }
                }
                 /* Hide scrollbar for clean look but allow scroll */
                .overview-grid::-webkit-scrollbar {
                    height: 6px;
                }
                .overview-grid::-webkit-scrollbar-thumb {
                    background: #DC2626;
                    border-radius: 4px;
                }
                .overview-grid::-webkit-scrollbar-track {
                    background: #F3F4F6;
                }
            `}</style>
        </section>
    );
}
