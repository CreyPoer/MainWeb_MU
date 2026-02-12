"use client";

import React, { useState } from "react";
import FooterSection from "@/components/HomePage/FooterSection";
import StandingsHero from "@/components/Pertandingan/Klasemen/StandingsHero";
import StandingsOverview from "@/components/Pertandingan/Klasemen/StandingsOverview";
import StandingsTable from "@/components/Pertandingan/Klasemen/StandingsTable";
import AOSInit from "@/components/HomePage/AOSInit"; // Reusing AOS Init
import { STANDINGS_DATA, STANDINGS_U20_A, STANDINGS_U20_B } from "@/components/Pertandingan/Klasemen/data";

export default function KlasemenPage() {
    const [activeCategory, setActiveCategory] = useState<'senior' | 'u20'>('senior');
    const [activeU20Group, setActiveU20Group] = useState<'A' | 'B'>('A');

    // Determine current data based on state
    let currentData = STANDINGS_DATA;
    if (activeCategory === 'u20') {
        currentData = activeU20Group === 'A' ? STANDINGS_U20_A : STANDINGS_U20_B;
    }

    return (
        <main style={{ backgroundColor: "#F9FAFB", minHeight: "100vh" }}>
            <AOSInit />
            {/* Navbar is strictly client side in this project structure and handled in layout, 
                but based on user request "navbar footer hero like in schedule page", 
                and schedule page imports navbar in layout.tsx. 
                Wait, the user said "untuk isi halaman nya masih sama untuk navbar... kayak di halaman jadwal".
                In app router, layout wraps page. Layout.tsx has Navbar. 
                So we don't need to import Navbar here if it's already in Layout.
                However, to be safe and consistent with the user's explicit request "like schedule page",
                let's check schedule page (app/pertandingan/jadwal/page.tsx) if available.
                Wait, I checked app/layout.tsx and it HAS Navbar. So Navbar is global.
                I will ONLY render the content parts.
            */}

            <StandingsHero />

            {/* TAB SWITCHER SECTION */}
            <div style={{ maxWidth: "1280px", margin: "-40px auto 40px", padding: "0 20px", position: "relative", zIndex: 20 }}>
                <div style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    padding: "10px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    display: "inline-flex",
                    gap: "8px",
                    flexWrap: "wrap",
                    border: "1px solid #F3F4F6"
                }}>
                    {/* Main Tabs */}
                    <button
                        onClick={() => setActiveCategory('senior')}
                        style={{
                            padding: "12px 24px",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            fontSize: "14px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            backgroundColor: activeCategory === 'senior' ? "#DC2626" : "transparent",
                            color: activeCategory === 'senior' ? "white" : "#4B5563",
                            transition: "all 0.3s",
                            border: "none",
                            cursor: "pointer"
                        }}
                    >
                        Senior Team
                    </button>
                    <button
                        onClick={() => setActiveCategory('u20')}
                        style={{
                            padding: "12px 24px",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            fontSize: "14px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            backgroundColor: activeCategory === 'u20' ? "#DC2626" : "transparent",
                            color: activeCategory === 'u20' ? "white" : "#4B5563",
                            transition: "all 0.3s",
                            border: "none",
                            cursor: "pointer"
                        }}
                    >
                        U-20 Team
                    </button>

                    {/* Divider if U20 selected */}
                    {activeCategory === 'u20' && (
                        <div style={{ width: "1px", backgroundColor: "#E5E7EB", margin: "0 8px" }}></div>
                    )}

                    {/* Sub Tabs for U20 */}
                    {activeCategory === 'u20' && (
                        <>
                            <button
                                onClick={() => setActiveU20Group('A')}
                                style={{
                                    padding: "12px 20px",
                                    borderRadius: "8px",
                                    fontWeight: "bold",
                                    fontSize: "14px",
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
                                    padding: "12px 20px",
                                    borderRadius: "8px",
                                    fontWeight: "bold",
                                    fontSize: "14px",
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

            <StandingsOverview data={currentData} />

            <StandingsTable data={currentData} />

            <FooterSection />
        </main>
    );
}
