import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./MUFAHome.module.css";
import { useLanguage } from "@/contexts/LanguageContext";

interface Slide {
  id: number;
  name: string;
  subtitle: string;
  image: string;
  link: string;
}

export default function MUFAHeroSection() {
  const { t } = useLanguage();
  const [slides, setSlides] = useState<Slide[]>([]);
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch("/api/slider?type=MUFA");
        const data = await res.json();
        if (Array.isArray(data)) {
          setSlides(data);
        }
      } catch (error) {
        console.error("Failed to fetch MUFA slides", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides]);

  if (isLoading) {
    return <div className="h-screen bg-black flex items-center justify-center text-white">{t('mufa.hero.loading')}</div>;
  }

  if (slides.length === 0) {
    return null; // Or some fallback
  }

  const current = slides[index];

  return (
    <section id="home" className={`${styles.mufaSection} ${styles.mufaHero}`}>
      <div className={styles.mufaContainer}>
        <div className={styles.mufaHeroSlider}>
          {/* Image */}
          <div className={styles.mufaHeroFrame}>
            <Image
              src={current.image}
              alt={current.name}
              fill
              priority
              className={`${styles.mufaHeroImage} object-cover`}
              key={current.id} // Force re-render for animation if needed
            />
            {/* Dark + red theme overlays */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-tr from-red-800/55 via-transparent to-transparent mix-blend-screen" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-16 py-10 gap-6 max-w-3xl">

              <h1
                data-aos="fade-up"
                data-aos-delay="100"
                className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight uppercase"
              >
                {current.name}
              </h1>

              <p
                data-aos="fade-up"
                data-aos-delay="200"
                className="text-sm md:text-base text-slate-100/90 max-w-xl"
              >
                {current.subtitle}
              </p>

              <div
                data-aos="fade-up"
                data-aos-delay="300"
                className="flex flex-wrap items-center gap-3 mt-2"
              >
                <Link
                  href="#program"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full text-xs md:text-sm font-semibold tracking-[0.18em] uppercase bg-amber-400 text-black hover:bg-amber-300 transition shadow-lg shadow-amber-500/30"
                >
                  {t('mufa.hero.view_program')}
                </Link>
                <Link
                  href="#fasilitas"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full text-xs md:text-sm font-semibold tracking-[0.18em] uppercase border border-white/30 text-slate-50 hover:bg-white/5 transition"
                >
                  {t('mufa.hero.explore_facilities')}
                </Link>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className={styles.mufaHeroDots}>
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                className={`${styles.mufaHeroDot} ${i === index ? styles.mufaHeroDotActive : ""}`}
                onClick={() => setIndex(i)}
                aria-label={slide.name}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
