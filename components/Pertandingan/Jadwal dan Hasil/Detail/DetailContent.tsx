"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaFutbol, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';

// --- DUMMY DATA FOR DETAIL VIEW ---
const MATCH_STATS = [
    { label: "Attempts", home: 19, away: 7 },
    { label: "Attempts on target", home: 4, away: 6 },
    { label: "Total Passes", home: 228, away: 172 },
    { label: "Corners", home: 10, away: 4 },
    { label: "Offsides", home: 3, away: 9 },
    { label: "Fouls", home: 12, away: 27 },
    { label: "Yellow Cards", home: 4, away: 5 },
    { label: "Red Cards", home: 0, away: 1 },
];

const MATCH_EVENTS = [
    { minute: "2'", team: "home", player: "David Bennett", type: "goal", assist: "Henry Wilson" },
    { minute: "8'", team: "home", player: "Nicholas Roberts", type: "yellow" },
    { minute: "24'", team: "home", player: "Matthew Anderson", type: "goal" },
    { minute: "59'", team: "home", player: "Brian Evans", type: "goal" },
    { minute: "60'", team: "away", player: "Daniel Robinson", type: "subst", sub: "Michael Turner" },
    { minute: "67'", team: "away", player: "John Foster", type: "yellow" },
    { minute: "75'", team: "away", player: "Jonathan Reed", type: "yellow" },
    { minute: "81'", team: "away", player: "Andrew Harris", type: "goal" },
    { minute: "89'", team: "home", player: "Brian Evans", type: "subst", sub: "Samuel White" },
    { minute: "90+3'", team: "away", player: "John Foster", type: "red" }, // Second yellow leading to red, simplified
];

export default function DetailContent() {
    const [activeTab, setActiveTab] = useState<'statistics' | 'events'>('statistics');

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    return (
        <div style={{ backgroundColor: "#F9FAFB", paddingBottom: "60px" }}>

            {/* --- HEADER SECTION --- */}
            <div data-aos="fade-down" style={{ backgroundColor: "#F3F4F6", paddingTop: "90px", paddingBottom: "40px" }}>
                <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center", position: "relative" }}>

                    {/* LEAGUE BADGE */}
                    <div style={{
                        position: "absolute",
                        top: "-60px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "#DC2626",
                        color: "white",
                        padding: "8px 20px",
                        fontWeight: "bold",
                        fontSize: "14px",
                        textTransform: "uppercase",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                    }}>
                        National League
                    </div>

                    <div className="header-content" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "0 20px" }}>

                        {/* HOME TEAM */}
                        <div className="team-column" style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "250px" }}>
                            <div style={{ width: "100px", height: "100px", position: "relative", marginBottom: "20px" }}>
                                <Image
                                    src="https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png"
                                    alt="Home"
                                    fill
                                    style={{ objectFit: "contain" }}
                                />
                            </div>
                            <h2 style={{ fontSize: "24px", fontWeight: "900", color: "#111827", textTransform: "uppercase", marginBottom: "16px" }}>
                                ATLETICOS FC
                            </h2>
                            {/* Scorers Home */}
                            <div style={{ fontSize: "16px", color: "#6B7280", lineHeight: "1.8", textAlign: "center" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "center" }}>
                                    <FaFutbol size={20} /> Bennett 2'
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "center" }}>
                                    <FaFutbol size={20} /> Anderson 24'
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "center" }}>
                                    <FaFutbol size={20} /> Evans 59'
                                </div>
                            </div>
                        </div>

                        {/* CENTER SCORE & PITCH */}
                        <div className="center-column" style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>

                            {/* SCORE */}
                            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "30px" }}>
                                <div style={{ backgroundColor: "#111827", color: "white", fontSize: "60px", fontWeight: "bold", padding: "10px 30px", borderRadius: "4px" }}>4</div>
                                <div style={{ fontSize: "60px", fontWeight: "bold", color: "#9CA3AF" }}>:</div>
                                <div style={{ backgroundColor: "#111827", color: "white", fontSize: "60px", fontWeight: "bold", padding: "10px 30px", borderRadius: "4px" }}>1</div>
                            </div>

                            {/* PITCH GRAPHIC */}
                            <div className="pitch-container" style={{ position: "relative", width: "400px", height: "200px", marginBottom: "20px" }}>
                                <Image
                                    src="/lapangan1.png"
                                    alt="Pitch"
                                    fill
                                    style={{ objectFit: "cover", borderRadius: "8px" }}
                                />
                            </div>

                            <div style={{ fontSize: "14px", fontWeight: "bold", color: "#6B7280", textTransform: "uppercase" }}>
                                January 24, 2031, Emirates Stadium
                            </div>
                            <div style={{ fontSize: "20px", fontWeight: "900", color: "#111827" }}>
                                12:00 PM
                            </div>
                        </div>

                        {/* AWAY TEAM */}
                        <div className="team-column" style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "250px" }}>
                            <div style={{ width: "100px", height: "100px", position: "relative", marginBottom: "20px" }}>
                                <Image
                                    src="https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg"
                                    alt="Away"
                                    fill
                                    style={{ objectFit: "contain" }}
                                />
                            </div>
                            <h2 style={{ fontSize: "24px", fontWeight: "900", color: "#111827", textTransform: "uppercase", marginBottom: "16px" }}>
                                AILTON FC
                            </h2>
                            {/* Scorers Away */}
                            <div style={{ fontSize: "16px", color: "#6B7280", lineHeight: "1.8", textAlign: "center" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "center" }}>
                                    <FaFutbol size={20} /> Harris 81'
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* --- TAB NAVIGATION --- */}
            <div data-aos="fade-up" style={{ display: "flex", justifyContent: "center", gap: "40px", margin: "40px 0" }}>
                <button
                    onClick={() => setActiveTab('statistics')}
                    style={{
                        padding: "10px 0",
                        fontSize: "14px",
                        fontWeight: "900",
                        textTransform: "uppercase",
                        color: activeTab === 'statistics' ? "#DC2626" : "#4B5563",
                        border: "none",
                        outline: "none",
                        borderBottom: activeTab === 'statistics' ? "3px solid #DC2626" : "3px solid transparent",
                        background: "none",
                        cursor: "pointer",
                        transition: "all 0.3s"
                    }}
                >
                    Statistics
                </button>
                <button
                    onClick={() => setActiveTab('events')}
                    style={{
                        padding: "10px 0",
                        fontSize: "14px",
                        fontWeight: "900",
                        textTransform: "uppercase",
                        color: activeTab === 'events' ? "#DC2626" : "#4B5563",
                        border: "none",
                        outline: "none",
                        borderBottom: activeTab === 'events' ? "3px solid #DC2626" : "3px solid transparent",
                        background: "none",
                        cursor: "pointer",
                        transition: "all 0.3s"
                    }}
                >
                    Match Events
                </button>
            </div>

            {/* --- CONTENT AREA --- */}
            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px" }}>

                {/* STATISTICS TAB */}
                {activeTab === 'statistics' && (
                    <div className="fade-in">
                        {/* Possession Bar */}
                        <div data-aos="fade-up" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px", fontWeight: "bold", fontSize: "18px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <Image src="https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png" width={48} height={48} alt="Home" />
                                <span>67%</span>
                            </div>
                            <span style={{ fontSize: "14px", color: "#6B7280", textTransform: "uppercase" }}>Ball Possession</span>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <span>33%</span>
                                <Image src="https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" width={48} height={48} alt="Away" />
                            </div>
                        </div>
                        <div data-aos="fade-up" style={{ height: "8px", width: "100%", display: "flex", borderRadius: "4px", overflow: "hidden", marginBottom: "40px" }}>
                            <div style={{ width: "67%", backgroundColor: "#DC2626" }}></div>
                            <div style={{ width: "33%", backgroundColor: "#9CA3AF" }}></div>
                        </div>

                        {/* Stats Table */}
                        <div className="stats-list" style={{ maxWidth: "600px", margin: "0 auto", display: "flex", flexDirection: "column" }}>
                            {MATCH_STATS.map((stat, idx) => {
                                const isYellow = stat.label === "Yellow Cards";
                                const isRed = stat.label === "Red Cards";

                                return (
                                    <div key={idx} data-aos="fade-up" data-aos-delay={idx * 50} style={{
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "16px 20px",
                                        backgroundColor: idx % 2 === 0 ? "white" : "#F3F4F6",
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                        color: "#111827"
                                    }}>
                                        {/* Home Stat */}
                                        <div style={{ flex: 1, textAlign: "left", display: "flex", alignItems: "center", gap: "8px" }}>
                                            <span>{stat.home}</span>
                                            {isYellow && <div style={{ width: "12px", height: "16px", backgroundColor: "#FCD34D", borderRadius: "2px" }} />}
                                            {isRed && <div style={{ width: "12px", height: "16px", backgroundColor: "#DC2626", borderRadius: "2px" }} />}
                                        </div>

                                        {/* Label */}
                                        <div style={{ flex: 2, textAlign: "center", color: "#6B7280", fontWeight: "normal" }}>{stat.label}</div>

                                        {/* Away Stat */}
                                        <div style={{ flex: 1, textAlign: "right", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px" }}>
                                            {isYellow && <div style={{ width: "12px", height: "16px", backgroundColor: "#FCD34D", borderRadius: "2px" }} />}
                                            {isRed && <div style={{ width: "12px", height: "16px", backgroundColor: "#DC2626", borderRadius: "2px" }} />}
                                            <span>{stat.away}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* MATCH EVENTS TAB */}
                {activeTab === 'events' && (
                    <div className="fade-in">
                        {/* Events Header with Logos */}
                        <div data-aos="fade-down" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", padding: "0 20px" }}>
                            <Image src="https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png" width={48} height={48} alt="Home" />
                            <Image src="https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" width={48} height={48} alt="Away" />
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>

                            {MATCH_EVENTS.map((event, idx) => (
                                <div key={idx} className="event-row" data-aos="fade-up" data-aos-delay={idx * 50} style={{
                                    display: "flex",
                                    alignItems: "stretch", // Changed to stretch to allow line to fill height
                                    backgroundColor: idx % 2 === 0 ? "#e7e8e9ff" : "white",
                                    borderBottom: "1px solid #E5E7EB"
                                }}>
                                    {/* HOME SIDE */}
                                    <div style={{ flex: 1, textAlign: "right", padding: "20px", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "10px" }}>
                                        {event.team === 'home' && (
                                            <>
                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                    <span style={{ fontWeight: "bold", color: "#111827" }}>{event.player}</span>
                                                    {event.assist && <span style={{ fontSize: "12px", color: "#6B7280" }}>{event.assist}</span>}
                                                    {event.sub && <span style={{ fontSize: "12px", color: "#6B7280" }}>{event.sub}</span>}
                                                </div>
                                                {event.type === 'goal' && <FaFutbol />}
                                                {event.type === 'yellow' && <div style={{ width: "12px", height: "16px", backgroundColor: "#FCD34D", borderRadius: "2px" }} />}
                                                {event.type === 'red' && <div style={{ width: "12px", height: "16px", backgroundColor: "#DC2626", borderRadius: "2px" }} />}
                                                {event.type === 'subst' && (
                                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2px" }}>
                                                        <FaArrowRight size={14} color="#22C55E" style={{ transform: "translateX(2px)" }} />
                                                        <FaArrowLeft size={14} color="#DC2626" style={{ transform: "translateX(-2px)" }} />
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>

                                    {/* CENTER MINUTE - BADGE & LINE */}
                                    <div style={{ width: "80px", position: "relative", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px 0" }}>
                                        {/* Line Segment */}
                                        <div style={{
                                            position: "absolute",
                                            top: 0,
                                            bottom: 0,
                                            left: "50%",
                                            width: "3px",
                                            backgroundColor: "#DC2626",
                                            transform: "translateX(-50%)",
                                            zIndex: 0
                                        }}></div>

                                        {/* Minute Badge */}
                                        <span style={{
                                            position: "relative",
                                            zIndex: 10,
                                            backgroundColor: idx % 2 === 0 ? "#e7e8e9ff" : "white", // Match row bg
                                            padding: "2px 8px",
                                            borderRadius: "55px",
                                            fontWeight: "900",
                                            fontSize: "14px",
                                            color: "#111827",
                                            border: "4px solid #DC2626"
                                        }}>
                                            {event.minute}
                                        </span>
                                    </div>

                                    {/* AWAY SIDE */}
                                    <div style={{ flex: 1, textAlign: "left", padding: "20px", display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "10px" }}>
                                        {event.team === 'away' && (
                                            <>
                                                {event.type === 'goal' && <FaFutbol />}
                                                {event.type === 'yellow' && <div style={{ width: "12px", height: "16px", backgroundColor: "#FCD34D", borderRadius: "2px" }} />}
                                                {event.type === 'red' && <div style={{ width: "12px", height: "16px", backgroundColor: "#DC2626", borderRadius: "2px" }} />}
                                                {event.type === 'subst' && (
                                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2px" }}>
                                                        <FaArrowRight size={14} color="#22C55E" style={{ transform: "translateX(2px)" }} />
                                                        <FaArrowLeft size={14} color="#DC2626" style={{ transform: "translateX(-2px)" }} />
                                                    </div>
                                                )}
                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                    <span style={{ fontWeight: "bold", color: "#111827" }}>{event.player}</span>
                                                    {event.assist && <span style={{ fontSize: "12px", color: "#6B7280" }}>{event.assist}</span>}
                                                    {event.sub && <span style={{ fontSize: "12px", color: "#6B7280" }}>{event.sub}</span>}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div >

            <style jsx>{`
                .fade-in {
                    animation: fadeIn 0.5s ease-in-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 768px) {
                    .header-content {
                        flex-direction: row !important; /* Keep horizontal */
                        align-items: flex-start;
                        gap: 5px;
                        padding: 0 5px !important;
                    }

                    .team-column {
                        width: auto !important;
                        flex: 1;
                        padding: 0;
                    }

                    /* Scale down Club Logos */
                    .team-column > div:first-child { 
                        width: 50px !important; 
                        height: 50px !important; 
                        margin-bottom: 5px !important;
                    }

                    /* Scale down Team Names */
                    .team-column h2 {
                        font-size: 10px !important;
                        margin-bottom: 5px !important;
                        word-break: break-word; /* Prevent overflow */
                    }
                    
                    /* Hide or scale Scorers */
                    .team-column > div:last-child {
                        font-size: 10px !important;
                        line-height: 1.2 !important;
                    }

                    .center-column {
                        width: auto !important;
                        flex: 1.5; /* Give center slightly more space */
                        margin: 0 !important;
                    }

                    /* Scale Score */
                    .center-column > div:first-child {
                        gap: 5px !important;
                        margin-bottom: 10px !important;
                    }
                    .center-column > div:first-child > div {
                        font-size: 20px !important;
                        padding: 5px 10px !important;
                    }

                    /* Scale Pitch */
                    .pitch-container {
                        width: 100% !important;
                        height: 100px !important; /* Fixed small height */
                        margin-bottom: 10px !important;
                    }
                    
                    .stats-list {
                        width: 100% !important;
                    }

                    .event-row {
                        padding: 10px !important;
                        font-size: 12px; 
                    }
                }
            `}</style>
        </div >
    );
}
