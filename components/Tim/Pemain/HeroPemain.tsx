"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroPemain() {
  const { t, lang } = useLanguage();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "500px",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#111827",
      }}
    >
      {/* Background Image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/ruang_ganti.jpg"
          alt="Hero Background Pemain"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)",
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
          padding: "0 20px",
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
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          {t('page.players.title')}
        </h1>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "14px",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          <Link href={`/${lang}/`} style={{ color: "#D1D5DB", textDecoration: "none" }} className="hover:text-white">
            {t('nav.home')}
          </Link>
          <span style={{ margin: "0 8px", color: "#DC2626" }}>&gt;</span>
          <span style={{ color: "#DC2626" }}>{t('page.players.breadcrumb')}</span>
        </div>
      </div>
    </section>
  );
}
