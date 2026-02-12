"use client";

import React from "react";
import Link from "next/link";

interface HeroDetailProps {
    title: string;
    image: string;
}

export default function HeroDetail({ title, image }: HeroDetailProps) {
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
                    style={{
                        fontSize: "36px", // Large title
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
                    style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        color: "#D1D5DB", // Light gray
                    }}
                >
                    <Link href="/" style={{ color: "#D1D5DB", textDecoration: "none" }} className="hover:text-white transition-colors">
                        Beranda
                    </Link>
                    <span style={{ margin: "0 10px" }}>&gt;</span>
                    <Link href="/media/berita" style={{ color: "#D1D5DB", textDecoration: "none" }} className="hover:text-white transition-colors">
                        Berita
                    </Link>
                    <span style={{ margin: "0 10px" }}>&gt;</span>
                    <span style={{ color: "#DC2626" }}>{title}</span> {/* Judul highlight red */}
                </div>
            </div>
        </div >
    );
}
