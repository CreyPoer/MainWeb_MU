"use client";


import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaBars, FaTimes, FaGlobe } from "react-icons/fa";
import styles from "./MUFAHome.module.css";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MUFANavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { lang, t, switchLanguage } = useLanguage();

  const handleToggleLanguage = () => {
    switchLanguage(lang === 'id' ? 'en' : 'id');
  };

  // Check if we are on the homepage — account for language prefix
  const isHomePage = pathname === `/${lang}/mufa` || pathname === `/${lang}/mufa/`
    || pathname === "/mufa" || pathname === "/mufa/";

  const HOME_MENU = [
    { label: t('mufa.nav.home'), href: "#home", type: "hash" },
    { label: t('mufa.nav.program'), href: "#program", type: "hash" },
    { label: t('mufa.nav.facilities'), href: "#fasilitas", type: "hash" },
    { label: t('mufa.nav.news'), href: "#berita", type: "hash" },
    { label: t('mufa.nav.gallery'), href: "#gallery", type: "hash" },
    { label: t('mufa.nav.video'), href: "#video", type: "hash" },
  ];

  const OTHER_MENU = [
    { label: t('mufa.nav.home'), href: `/${lang}/mufa`, type: "route" },
    { label: t('mufa.nav.news'), href: `/${lang}/mufa/berita`, type: "route" },
    { label: t('mufa.nav.gallery'), href: `/${lang}/mufa/gallery`, type: "route" },
    { label: t('mufa.nav.video'), href: `/${lang}/mufa/video`, type: "route" },
  ];

  const menuItems = isHomePage ? HOME_MENU : OTHER_MENU;

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (item: { label: string; href: string; type: string }) => {
    if (item.type === "hash" && isHomePage) {
      // Smooth scroll on homepage
      const id = item.href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        const offset = 88;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    } else if (item.type === "route") {
      // Direct navigation
      router.push(item.href);
    } else if (item.type === "hash" && !isHomePage) {
      router.push(`/${lang}/mufa${item.href}`);
    }
    setIsMobileOpen(false);
  };

  const navbarClass = `${styles.mufaNavbar} ${isScrolled ? styles.mufaNavbarScrolled : ""
    }`;

  return (
    <header className={navbarClass} data-aos="fade-down" data-aos-duration="800">
      <div className={`${styles.mufaContainer} ${styles.mufaNavbarInner}`}>
        {/* Logo + Brand */}
        <Link href={`/${lang}/mufa`} className="flex items-center gap-3">
          <div className={styles.mufaLogoCircle}>
            <div className={styles.mufaLogoInner}>
              <Image
                src="/logoMUFA.jpg"
                alt="Madura United Football Academy"
                width={56}
                height={56}
                className={styles.mufaLogoImg}
              />
            </div>
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span
              className={`text-xs tracking-[0.35em] font-semibold uppercase transition-colors duration-200 ${isScrolled ? "text-red-200/80" : "text-red-500"
                }`}
            >
              Madura United
            </span>
            <span className="text-sm md:text-base font-extrabold text-slate-50 uppercase">
              Football Academy
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className={styles.mufaNavMenu}>
          {menuItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className={styles.mufaNavLink}
              onClick={() => handleNavClick(item)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-slate-100">
            <a
              href="https://www.instagram.com/akademimaduraunited?igsh=MWJyZjEzZHI4d2YwMw=="
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition" target="_blank"
            >
              <FaInstagram size={14} />
            </a>
            <a
              href="https://www.facebook.com/Maduraunitedfc.official/"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition" target="_blank"
            >
              <FaFacebookF size={14} />
            </a>
            <a
              href="https://x.com/MaduraUnitedFC"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition" target="_blank"
            >
              <FaTwitter size={14} />
            </a>
            <a
              href="https://youtube.com/@maduraunitedacademy812?si=flyzuMc19qy9Ai-I"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition" target="_blank"
            >
              <FaYoutube size={14} />
            </a>
          </div>

          {/* Language Switch */}
          <button
            type="button"
            onClick={handleToggleLanguage}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-100 text-xs font-bold uppercase tracking-wider transition-all duration-200 border border-white/10 hover:border-white/25"
            title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
          >
            <FaGlobe size={12} />
            <span>{lang.toUpperCase()}</span>
          </button>

          <button
            type="button"
            className={styles.mufaMobileToggle}
            onClick={() => setIsMobileOpen((v) => !v)}
          >
            {isMobileOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>

      {isMobileOpen && (
        <div className={styles.mufaMobileMenu}>
          <div className="flex flex-col gap-3">
            {menuItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className="text-sm font-semibold tracking-widest uppercase text-slate-50/90 text-left py-2 border-b border-white/5"
                onClick={() => handleNavClick(item)}
              >
                {item.label}
              </button>
            ))}
            {/* Language Switch in Mobile */}
            <button
              type="button"
              onClick={() => {
                handleToggleLanguage();
                setIsMobileOpen(false);
              }}
              className="flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-slate-50/90 text-left py-2 border-b border-white/5"
            >
              <FaGlobe size={12} />
              {lang === 'id' ? 'Switch to English' : 'Ganti ke Indonesia'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
