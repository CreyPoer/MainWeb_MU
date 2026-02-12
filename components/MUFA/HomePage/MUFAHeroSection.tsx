"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./MUFAHome.module.css";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    title: "THE PATHWAY TO PRO",
    subtitle:
      "Program pembinaan terstruktur dari usia muda menuju tim profesional Madura United FC.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600",
    tag: "Elite Youth Development",
  },
  {
    id: 2,
    title: "LATIHAN BERSTANDAR PROFESIONAL",
    subtitle:
      "Metode latihan modern dengan fasilitas lengkap, fokus pada teknik, taktik, dan mental juara.",
    image:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1920&auto=format&fit=crop",
    tag: "High Performance Training",
  },
  {
    id: 3,
    title: "DIDAMPINGI COACH BERPENGALAMAN",
    subtitle:
      "Tim pelatih berlisensi yang siap mendampingi setiap langkah perjalanan karier sepak bola Anda.",
    image:
      "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&q=80&w=1600",
    tag: "Professional Coaching Staff",
  },
];

export default function MUFAHeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = SLIDES[index];

  return (
    <section id="home" className={`${styles.mufaSection} ${styles.mufaHero}`}>
      <div className={styles.mufaContainer}>
        <div className={styles.mufaHeroSlider}>
          {/* Image */}
          <div className={styles.mufaHeroFrame}>
            <Image
              src={current.image}
              alt={current.title}
              fill
              priority
              className={`${styles.mufaHeroImage} object-cover`}
            />
            {/* Dark + red theme overlays */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-tr from-red-800/55 via-transparent to-transparent mix-blend-screen" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-16 py-10 gap-6 max-w-3xl">

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight uppercase">
                {current.title}
              </h1>

              <p className="text-sm md:text-base text-slate-100/90 max-w-xl">
                {current.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-2">
                <Link
                  href="#program"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full text-xs md:text-sm font-semibold tracking-[0.18em] uppercase bg-amber-400 text-black hover:bg-amber-300 transition shadow-lg shadow-amber-500/30"
                >
                  Lihat Program
                </Link>
                <Link
                  href="#fasilitas"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full text-xs md:text-sm font-semibold tracking-[0.18em] uppercase border border-white/30 text-slate-50 hover:bg-white/5 transition"
                >
                  Jelajahi Fasilitas
                </Link>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className={styles.mufaHeroDots}>
            {SLIDES.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                className={`${styles.mufaHeroDot} ${i === index ? styles.mufaHeroDotActive : ""}`}
                onClick={() => setIndex(i)}
                aria-label={slide.title}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
