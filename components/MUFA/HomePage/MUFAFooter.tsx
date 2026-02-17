"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import styles from "./MUFAHome.module.css";

const HOME_LINKS = [
  { label: "Beranda", href: "#home", type: "hash" },
  { label: "Program", href: "#program", type: "hash" },
  { label: "Fasilitas", href: "#fasilitas", type: "hash" },
  { label: "Berita", href: "#berita", type: "hash" },
  { label: "Gallery", href: "#gallery", type: "hash" },
  { label: "Video", href: "#video", type: "hash" },
];

const OTHER_LINKS = [
  { label: "Beranda", href: "/mufa", type: "route" },
  { label: "Berita", href: "/mufa/berita", type: "route" },
  { label: "Gallery", href: "/mufa/gallery", type: "route" },
  { label: "Video", href: "/mufa/video", type: "route" },
];

type Album = {
  id: number;
  cover: string;
  images: string[];
};

export default function MUFAFooter() {
  const pathname = usePathname();
  const [activeAlbum, setActiveAlbum] = useState<Album | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [footerGallery, setFooterGallery] = useState<Album[]>([]);

  // Check if homepage
  const isHomePage = pathname === "/mufa" || pathname === "/mufa/";
  const filteredNavLinks = isHomePage ? HOME_LINKS : OTHER_LINKS;

  useEffect(() => {
    const fetchFooterGallery = async () => {
      try {
        const res = await fetch('/api/footer-gallery?type=MUFA');
        const data = await res.json();
        if (Array.isArray(data)) {
          // Map to Album structure
          // API returns { thumbnail: string, images: string[] }
          // We need to add an 'id' - index or something
          const mapped = data.map((item: any, idx: number) => ({
            id: idx + 1,
            cover: item.thumbnail,
            images: item.images
          }));
          setFooterGallery(mapped);
        }
      } catch (error) {
        console.error("Failed to fetch MUFA footer gallery", error);
      }
    };
    fetchFooterGallery();
  }, []);

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

  const openAlbum = (album: Album) => {
    setActiveAlbum(album);
    setSlideIndex(0);
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeAlbum) return;
    setSlideIndex((prev) => (prev + 1) % activeAlbum.images.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeAlbum) return;
    setSlideIndex((prev) => (prev - 1 + activeAlbum.images.length) % activeAlbum.images.length);
  };

  return (
    <>
      <footer
        className={styles.mufaFooter}
        style={{ color: "#dc2626", paddingTop: "80px", position: "relative" }}
      >
        {/* Main Footer Content */}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 60px" }}>
          <div className={styles.mufaFooterGrid}>

            {/* COLUMN 1: BRAND */}
            <div className={styles.mufaFooterCol} data-aos="fade-up">
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
                {[
                  { Icon: FaInstagram, href: "https://www.instagram.com/akademimaduraunited?igsh=MWJyZjEzZHI4d2YwMw==" },
                  { Icon: FaFacebookF, href: "https://www.facebook.com/Maduraunitedfc.official/" },
                  { Icon: FaTwitter, href: "https://x.com/MaduraUnitedFC" },
                  { Icon: FaYoutube, href: "https://youtube.com/@maduraunitedacademy812?si=flyzuMc19qy9Ai-I" },
                ].map(({ Icon, href }, idx) => (
                  <a
                    key={idx}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
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
                    className={styles.mufaSocialLink}
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            {/* COLUMN 2: NAVIGASI */}
            <div className={styles.mufaFooterCol} data-aos="fade-up" data-aos-delay="100">
              <h4 className={styles.mufaFooterHeading}>
                <span style={{ color: "#FCA5A5", marginRight: "8px" }}>—</span> Navigasi
              </h4>

              <div style={{ display: "flex", gap: "40px" }}>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {filteredNavLinks.slice(0, Math.ceil(filteredNavLinks.length / 2)).map((link) => (
                    <li key={link.label} style={{ marginBottom: "14px" }}>
                      {link.type === "hash" && isHomePage ? (
                        <a
                          href={link.href}
                          onClick={(e) => handleScroll(e, link.href)}
                          className={styles.mufaFooterLink}
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
                      ) : (
                        <Link
                          href={link.href}
                          className={styles.mufaFooterLink}
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
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {filteredNavLinks.slice(Math.ceil(filteredNavLinks.length / 2)).map((link) => (
                    <li key={link.label} style={{ marginBottom: "14px" }}>
                      {link.type === "hash" && isHomePage ? (
                        <a
                          href={link.href}
                          onClick={(e) => handleScroll(e, link.href)}
                          className={styles.mufaFooterLink}
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
                      ) : (
                        <Link
                          href={link.href}
                          className={styles.mufaFooterLink}
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
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* COLUMN 3: GALLERY */}
            <div className={styles.mufaFooterCol} data-aos="fade-up" data-aos-delay="200">
              <h4 className={styles.mufaFooterHeading}>
                <span style={{ color: "#FCA5A5", marginRight: "8px" }}>—</span> Gallery
              </h4>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
                {footerGallery.map((album) => (
                  <button
                    key={album.id}
                    type="button"
                    onClick={() => openAlbum(album)}
                    style={{
                      position: "relative",
                      aspectRatio: "1/1",
                      borderRadius: "6px",
                      overflow: "hidden",
                      backgroundColor: "#111827",
                      cursor: "pointer",
                      border: "none",
                      padding: 0,
                      width: "100%",
                      display: "block",
                    }}
                    className="group"
                  >
                    <Image
                      src={album.cover}
                      alt={`Gallery ${album.id}`}
                      fill
                      style={{ objectFit: "cover" }}
                      className="group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Subtle overlay on hover just to indicate clickability, no text/buttons as requested */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                ))}
              </div>
            </div>

            {/* COLUMN 4: CTA KE WEBSITE UTAMA */}
            <div className={styles.mufaFooterCol} data-aos="fade-up" data-aos-delay="300">
              <h4 className={styles.mufaFooterHeading}>
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
                className={styles.mufaFooterCta}
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
      </footer>

      {/* LIGHTBOX POPUP */}
      {activeAlbum && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={() => setActiveAlbum(null)}
        >
          <div
            className="relative w-full max-w-5xl aspect-[16/9] bg-black border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main Image */}
            <div className="relative flex-1 bg-black">
              {activeAlbum.images.length > 0 && (
                <Image
                  src={activeAlbum.images[slideIndex]}
                  alt={`Gallery ${activeAlbum.id} - ${slideIndex + 1}`}
                  fill
                  className="object-contain"
                  quality={90}
                />
              )}

              {/* Navigation Buttons */}
              <button
                type="button"
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 text-white flex items-center justify-center transition-colors backdrop-blur-sm"
              >
                <FaChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 text-white flex items-center justify-center transition-colors backdrop-blur-sm"
              >
                <FaChevronRight size={16} />
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveAlbum(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-600/90 hover:bg-red-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105"
              >
                <FaTimes size={16} />
              </button>
            </div>

            {/* Thumbnail Strip (Optional - kept simple as requested, but adding counter) */}
            <div className="h-14 bg-neutral-900 border-t border-white/10 flex items-center justify-between px-6">
              <span className="text-slate-400 text-sm font-medium">
                Image {slideIndex + 1} of {activeAlbum.images.length}
              </span>
              {/* Small thumbs could go here if needed later */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
