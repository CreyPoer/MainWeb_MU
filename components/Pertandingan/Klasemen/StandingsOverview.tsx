"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { FaTrophy, FaArrowUp, FaArrowDown, FaShieldAlt, FaFutbol, FaMinusCircle } from "react-icons/fa";
import { StandingTeam } from "./data";

interface StandingsOverviewProps {
    data: StandingTeam[];
}

export default function StandingsOverview({ data }: StandingsOverviewProps) {
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
                {title}
            </span>
            <div style={{ fontSize: "32px", fontWeight: "900", color: color, display: "flex", flexDirection: "column", alignItems: "center", lineHeight: "1" }}>
                {value}
                {valueLabel && <span style={{ fontSize: "12px", color: color, marginTop: "4px", fontWeight: "600" }}>{valueLabel}</span>}
            </div>
        </div>
    );

    return (
        <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "60px 20px 40px" }} data-aos="fade-up">
            <div style={{ marginBottom: "40px" }}>
                <h2 style={{ fontSize: "32px", fontWeight: "900", textTransform: "uppercase", color: "#111827", marginBottom: "8px" }}>
                    Overview Statistics
                </h2>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }} className="overview-header">
                    <p style={{ fontSize: "14px", color: "#6B7280", fontWeight: "600", textTransform: "uppercase" }}>
                        Season 2025-2026
                    </p>
                    <p style={{ fontSize: "14px", color: "#6B7280" }}>
                        <span style={{ marginRight: "20px" }}>LAST UPDATE: 03 FEB 2026</span>
                        <span>NEXT UPDATE: 10 FEB 2026</span>
                    </p>
                </div>
            </div>

            {/* Cards Grid */}
            <div className="overview-grid" style={{ padding: "20px" }}>
                <OverviewCard
                    title="Most Goals"
                    team={stats.mostGoals}
                    valueLabel="GOALS SCORED"
                    value={stats.mostGoals.goalsFor}
                    icon={<FaFutbol />}
                    color="#059669" // Green
                />
                <OverviewCard
                    title="Best Defense"
                    team={stats.bestDefense}
                    valueLabel="GOALS CONCEDED"
                    value={stats.bestDefense.goalsAgainst}
                    icon={<FaShieldAlt />}
                    color="#2563EB" // Blue
                />
                <OverviewCard
                    title="Hardest to Beat"
                    team={stats.toughToBeat}
                    valueLabel="LOSSES"
                    value={stats.toughToBeat.lost}
                    icon={<FaMinusCircle />}
                    color="#D97706" // Amber
                />
                <OverviewCard
                    title="Most Losses"
                    team={stats.mostLoss}
                    valueLabel="LOSSES"
                    value={stats.mostLoss.lost}
                    icon={<FaArrowDown />}
                    color="#DC2626" // Red
                />
                <OverviewCard
                    title="Draw Specialists"
                    team={stats.drawKing}
                    valueLabel="DRAWS"
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
                    /* Solid Red Shadow: 6px to right, 6px down, 0 blur */
                    box-shadow: 6px 6px 0px 0px #DC2626; 
                    transition: all 0.2s ease;
                }

                :global(.overview-card:hover) {
                    /* On hover, move card slightly up-left and extend shadow for 'pop' effect */
                    transform: translate(-2px, -2px);
                    box-shadow: 8px 8px 0px 0px #DC2626; 
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
