"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import styles from "./MUFAHome.module.css";

const NAV_LINKS = [
  { label: "Beranda", href: "#home" },
  { label: "Program", href: "#program" },
  { label: "Fasilitas", href: "#fasilitas" },
  { label: "Berita", href: "#berita" },
  { label: "Gallery", href: "#gallery" },
  { label: "Video", href: "#video" },
];

const FOOTER_GALLERY = [
  "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1521410843008-dce7a1f4e0f3?auto=format&fit=crop&q=80&w=800",
];

export default function MUFAFooter() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const offset = 96;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <footer
      className={styles.mufaFooter}
      style={{ color: "#dc2626", paddingTop: "80px", position: "relative" }}
    >
      {/* Main Footer Content */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 60px" }}>
        <div className="mufa-footer-grid">

          {/* COLUMN 1: BRAND */}
          <div className="mufa-footer-col" data-aos="fade-up">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginBottom: "24px",
              }}
            >
              <div className={styles.mufaLogoCircle}>
                <div className={styles.mufaLogoInner}>
                  <Image
                    src="/logoMUFA.jpg"
                    alt="Madura United Football Academy"
                    width={80}
                    height={80}
                    className={styles.mufaLogoImg}
                  />
                </div>
              </div>
              <div>
                <h3
                  style={{
                    color: "white",
                    fontWeight: 900,
                    fontSize: "24px",
                    lineHeight: "1.1",
                    textTransform: "uppercase",
                  }}
                >
                  Madura United
                  <br />
                  Football Academy
                </h3>
              </div>
            </div>
            <p
              style={{
                fontSize: "14px",
                lineHeight: "1.6",
                marginBottom: "28px",
                color: "#FDECEC",
                maxWidth: "420px",
              }}
            >
              MUFA merupakan program pembinaan resmi Madura United FC yang mempersiapkan talenta muda melalui
              kurikulum terstruktur, fasilitas modern, dan jalur jelas menuju sepak bola profesional.
            </p>

            {/* Social Icons */}
            <div style={{ display: "flex", gap: "12px" }}>
              {[FaInstagram, FaFacebookF, FaTwitter, FaYoutube].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "#1F2937",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    transition: "background-color 0.3s, transform 0.2s",
                  }}
                  className="mufa-social-link"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* COLUMN 2: NAVIGASI */}
          <div className="mufa-footer-col" data-aos="fade-up" data-aos-delay="100">
            <h4 className="mufa-footer-heading">
              <span style={{ color: "#FCA5A5", marginRight: "8px" }}>—</span> Navigasi
            </h4>

            <div style={{ display: "flex", gap: "40px" }}>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {NAV_LINKS.slice(0, 3).map((link) => (
                  <li key={link.label} style={{ marginBottom: "14px" }}>
                    <a
                      href={link.href}
                      onClick={(e) => handleScroll(e, link.href)}
                      className="mufa-footer-link"
                    >
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          backgroundColor: "#FCA5A5",
                          borderRadius: "50%",
                          display: "inline-block",
                          marginRight: "10px",
                          verticalAlign: "middle",
                        }}
                      />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {NAV_LINKS.slice(3).map((link) => (
                  <li key={link.label} style={{ marginBottom: "14px" }}>
                    <a
                      href={link.href}
                      onClick={(e) => handleScroll(e, link.href)}
                      className="mufa-footer-link"
                    >
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          backgroundColor: "#FCA5A5",
                          borderRadius: "50%",
                          display: "inline-block",
                          marginRight: "10px",
                          verticalAlign: "middle",
                        }}
                      />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* COLUMN 3: GALLERY */}
          <div className="mufa-footer-col" data-aos="fade-up" data-aos-delay="200">
            <h4 className="mufa-footer-heading">
              <span style={{ color: "#FCA5A5", marginRight: "8px" }}>—</span> Gallery
            </h4>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
              {FOOTER_GALLERY.map((src, idx) => (
                <div
                  key={idx}
                  style={{
                    position: "relative",
                    aspectRatio: "1/1",
                    borderRadius: "6px",
                    overflow: "hidden",
                    backgroundColor: "#111827",
                  }}
                >
                  <Image
                    src={src}
                    alt={`Gallery ${idx + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 4: CTA KE WEBSITE UTAMA */}
          <div className="mufa-footer-col" data-aos="fade-up" data-aos-delay="300">
            <h4 className="mufa-footer-heading">
              <span style={{ color: "#FCA5A5", marginRight: "8px" }}>—</span> Jelajahi Lebih Jauh
            </h4>
            <p
              style={{
                fontSize: "14px",
                lineHeight: "1.7",
                color: "#FDECEC",
                marginBottom: "20px",
              }}
            >
              Ingin mengetahui informasi lengkap mengenai tim utama, jadwal pertandingan, dan berita terbaru Madura
              United FC?
            </p>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "14px 26px",
                borderRadius: "999px",
                border: "1px solid #FCA5A5",
                backgroundColor: "#1F2937",
                color: "#F9FAFB",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textDecoration: "none",
                boxShadow: "0 18px 45px rgba(0,0,0,0.7)",
                transition:
                  "background-color 0.25s ease, color 0.25s ease, transform 0.15s ease, box-shadow 0.25s ease",
              }}
              className="mufa-footer-cta"
            >
              Ke Website Utama Madura United FC
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: "1px solid #7F1D1D",
          padding: "24px",
          textAlign: "center",
          backgroundColor: "rgba(0,0,0,0.35)",
        }}
      >
        <p style={{ fontSize: "13px", color: "#FECACA", letterSpacing: "0.5px" }}>
          © 2026 <span style={{ color: "white", fontWeight: "bold" }}>Madura United Football Academy</span>. All
          rights reserved.
        </p>
      </div>

      <style jsx>{`
        .mufa-footer-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr 1fr 0.9fr;
          gap: 40px;
        }
        .mufa-footer-col {
          display: flex;
          flex-direction: column;
        }
        .mufa-footer-heading {
          color: #fee2e2;
          font-size: 18px;
          font-weight: 800;
          text-transform: uppercase;
          margin-bottom: 28px;
          display: flex;
          align-items: center;
          letter-spacing: 0.18em;
        }
        .mufa-footer-link {
          color: #fee2e2;
          text-decoration: none;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          letter-spacing: 0.18em;
        }
        .mufa-footer-link:hover {
          color: #fbbf24;
        }
        .mufa-social-link:hover {
          background-color: #dc2626 !important;
          transform: translateY(-2px);
        }
        .mufa-footer-cta:hover {
          background-color: #111827;
          color: #fef9c3;
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 26px 60px rgba(0, 0, 0, 0.9);
        }

        @media (max-width: 1024px) {
          .mufa-footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
        }

        @media (max-width: 640px) {
          .mufa-footer-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
    </footer>
  );
}
