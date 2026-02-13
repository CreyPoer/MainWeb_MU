"use client";


import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaBars, FaTimes } from "react-icons/fa";
import styles from "./MUFAHome.module.css";

const HOME_MENU = [
  { label: "Beranda", href: "#home", type: "hash" },
  { label: "Program", href: "#program", type: "hash" },
  { label: "Fasilitas", href: "#fasilitas", type: "hash" },
  { label: "Berita", href: "#berita", type: "hash" },
  { label: "Gallery", href: "#gallery", type: "hash" },
  { label: "Video", href: "#video", type: "hash" },
];

const OTHER_MENU = [
  { label: "Beranda", href: "/mufa", type: "route" },
  { label: "Berita", href: "/mufa/berita", type: "route" },
  { label: "Gallery", href: "/mufa/gallery", type: "route" },
  { label: "Video", href: "/mufa/video", type: "route" },
];

export default function MUFANavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Check if we are on the homepage (either root /mufa or just /mufa/)
  // Adjust logic if your homepage is different. Assuming /mufa is home based on context.
  const isHomePage = pathname === "/mufa" || pathname === "/mufa/";

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
      // If we are on another page and click a hash link (shouldn't happen with current menu logic, but safe to handle)
      router.push(`/mufa${item.href}`);
    }
    setIsMobileOpen(false);
  };

  const navbarClass = `${styles.mufaNavbar} ${isScrolled ? styles.mufaNavbarScrolled : ""
    }`;

  return (
    <header className={navbarClass} data-aos="fade-down" data-aos-duration="800">
      <div className={`${styles.mufaContainer} ${styles.mufaNavbarInner}`}>
        {/* Logo + Brand */}
        <Link href="/mufa" className="flex items-center gap-3">
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
              href="#"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition"
            >
              <FaInstagram size={14} />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition"
            >
              <FaFacebookF size={14} />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition"
            >
              <FaTwitter size={14} />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition"
            >
              <FaYoutube size={14} />
            </a>
          </div>

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
          </div>
        </div>
      )}
    </header>
  );
}
