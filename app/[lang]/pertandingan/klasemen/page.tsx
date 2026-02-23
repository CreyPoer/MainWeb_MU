"use client";

import React, { useState, useEffect } from "react";
import FooterSection from "@/components/HomePage/FooterSection";
import StandingsHero from "@/components/Pertandingan/Klasemen/StandingsHero";
import StandingsOverview from "@/components/Pertandingan/Klasemen/StandingsOverview";
import StandingsTable from "@/components/Pertandingan/Klasemen/StandingsTable";
import AOSInit from "@/components/HomePage/AOSInit"; // Reusing AOS Init
import { STANDINGS_DATA, STANDINGS_U20_A, STANDINGS_U20_B, StandingTeam } from "@/components/Pertandingan/Klasemen/data";

export default function KlasemenPage() {
    const [activeCategory, setActiveCategory] = useState<'senior' | 'u20'>('senior');
    const [activeU20Group, setActiveU20Group] = useState<'A' | 'B'>('A');

    const [seniorData, setSeniorData] = useState<StandingTeam[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStandings = async () => {
            try {
                const res = await fetch('/api/standings');
                const data = await res.json();

                if (Array.isArray(data)) {
                    // Map API response to StandingTeam interface
                    // Console log to verify keys if needed: console.log("API Data:", data[0]);

                    const mapped: StandingTeam[] = data.map((item: any, index: number) => ({
                        id: item.team ? item.team.toLowerCase().replace(/\s+/g, '-') : `team-${index}`,
                        position: index + 1,
                        name: item.team,
                        logo: item.logo || '',
                        played: parseInt(item.play || 0),
                        won: parseInt(item.w || 0),
                        drawn: parseInt(item.d || 0),
                        lost: parseInt(item.l || 0),
                        // Try typical keys for goals: mg/kg/sg or gm/gk/gd or gm/ga/gd
                        goalsFor: parseInt(item.gm ?? item.mg ?? item.gf ?? 0),
                        goalsAgainst: parseInt(item.ga ?? item.kg ?? item.gk ?? 0),
                        goalDifference: parseInt(item.gd ?? item.sg ?? 0),
                        points: parseInt(item.pt ?? item.poin ?? 0),
                        // API does not currently return form or nextMatch
                        // Map form data (assuming space separated string like "W W L D W")
                        form: item.form ? item.form.split(' ').map((f: string) => f as "W" | "D" | "L") : undefined,
                        nextMatch: item.next_opponent ? {
                            opponentName: item.next_opponent.opponent,
                            opponentLogo: item.next_opponent.logo
                        } : undefined
                    }));
                    setSeniorData(mapped);
                }
            } catch (error) {
                console.error("Failed to fetch standings", error);
                // Fallback to hardcoded data if API fails? 
                // For now, let's keep empty or use STANDINGS_DATA as initial if verified.
                // But better to show empty/error state or stale data. 
                // We will leave seniorData empty if fetch fails, 
                // but user might want fallback. Let's stick to API data only for Senior.
            } finally {
                setIsLoading(false);
            }
        };

        fetchStandings();
    }, []);

    // Determine current data based on state
    let currentData: StandingTeam[] = [];

    if (activeCategory === 'senior') {
        currentData = seniorData.length > 0 ? seniorData : (isLoading ? [] : []);
        // If loading, sending empty array might show empty table. 
        // Could show loading spinner.
    } else {
        currentData = activeU20Group === 'A' ? STANDINGS_U20_A : STANDINGS_U20_B;
    }

    return (
        <main style={{ backgroundColor: "#F9FAFB", minHeight: "100vh" }}>
            <AOSInit />
            {/* Navbar is strictly client side in this project structure and handled in layout */}

            <StandingsHero />

            {activeCategory === 'senior' && isLoading ? (
                <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "100px 20px", textAlign: "center" }}>
                    <div style={{ fontSize: "18px", fontWeight: "bold", color: "#6B7280" }}>Loading Standings...</div>
                </div>
            ) : (
                <>
                    <StandingsOverview
                        data={currentData}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        activeU20Group={activeU20Group}
                        setActiveU20Group={setActiveU20Group}
                    />
                    <StandingsTable data={currentData} />
                </>
            )}

            <FooterSection />
        </main>
    );
}
