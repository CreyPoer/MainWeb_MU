"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

interface DetailHeroProps {
    homeTeam: string;
    awayTeam: string;
}

export default function DetailHero({ homeTeam, awayTeam }: DetailHeroProps) {
    return (
        <section style={{ position: "relative", height: "100vh", minHeight: "500px", width: "100%", overflow: "hidden" }}>
            {/* Background Image */}
            <div style={{ position: "absolute", inset: 0, zIndex: -1 }}>
                <Image
                    src="/detail_pertandingan.jpg"
                    alt={`Pertandingan ${homeTeam} vs ${awayTeam}`}
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
                    {homeTeam} vs {awayTeam}
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
                        letterSpacing: "1px",
                        flexWrap: "wrap",
                        justifyContent: "center"
                    }}
                >
                    <Link href="/" style={{ color: "#D1D5DB", textDecoration: "none", transition: "color 0.3s" }} className="hover:text-white">
                        BERANDA
                    </Link>
                    <FaChevronRight size={12} style={{ color: "#DC2626" }} />
                    <Link href="/pertandingan/jadwal" style={{ color: "#D1D5DB", textDecoration: "none", transition: "color 0.3s" }} className="hover:text-white">
                        JADWAL DAN HASIL
                    </Link>
                    <FaChevronRight size={12} style={{ color: "#DC2626" }} />
                    <span style={{ color: "#DC2626" }}>{homeTeam} vs {awayTeam}</span>
                </div>
            </div>
        </section>
    );
}
