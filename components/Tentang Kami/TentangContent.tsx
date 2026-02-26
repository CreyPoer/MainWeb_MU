"use client";

import React, { useCallback, useState, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import StrukturOrganisasiSection from "./StrukturOrganisasiSection";
import KomunitasSuporterSection from "./KomunitasSuporterSection";
import SejarahSection from "./SejarahSection";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TentangContent() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [isSwapped, setIsSwapped] = useState(false);
  const [swapCycle, setSwapCycle] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const didPanRef = useRef(false);
  const pendingCompleteRef = useRef(0);
  const activeCycleRef = useRef(0);

  const toggleSwap = useCallback(() => {
    const nextCycle = activeCycleRef.current + 1;
    activeCycleRef.current = nextCycle;
    setSwapCycle(nextCycle);
    // Cukup tunggu 1 completion agar panah muncul segera ketika gerak utama selesai.
    // Spring biasanya masih "settle" sedikit, sehingga kalau nunggu keduanya bisa terasa delay.
    pendingCompleteRef.current = 1;
    setIsAnimating(true);
    setIsSwapped((prev) => !prev);
  }, []);

  const springTransition = useMemo(() => {
    if (shouldReduceMotion) {
      return { duration: 0 };
    }

    return {
      type: "spring" as const,
      stiffness: 420,
      damping: 28,
      mass: 0.65,
    };
  }, [shouldReduceMotion]);

  const handleCardComplete = useCallback(
    (cycleAtStart: number) => {
      if (activeCycleRef.current !== cycleAtStart) return;
      pendingCompleteRef.current -= 1;
      if (pendingCompleteRef.current <= 0) {
        setIsAnimating(false);
      }
    },
    []
  );

  return (
    <section className="w-full pb-16 md:pb-24">
      <div className="w-full text-neutral-200 text-sm md:text-base leading-relaxed space-y-12">
        {/* Sejarah & Perjalanan Madura United FC */}
        <SejarahSection />

        {/* Visi dan Misi - Slanted Overlap Section */}
        <section
          className="visi-misi-section"
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="800"
          style={{
            marginTop: "80px",
            padding: "0 16px",
          }}
        >
          <div className="visi-misi-bg" />
          <div className="visi-misi-inner">
            <div className="visi-misi-grid">
              {/* Visi */}
              <div className="visi-misi-vision" data-aos="fade-right" data-aos-delay="950" data-aos-duration="700">
                <p className="visi-misi-eyebrow">{t('page.about.vision.eyebrow')}</p>
                <h2 className="visi-misi-title">
                  {t('page.about.vision.title')}
                </h2>
                <p className="visi-misi-subtext">
                  {t('page.about.vision.subtext')}
                </p>
              </div>

              {/* Misi - Cards */}
              <div className="visi-misi-cards">
                <article className="visi-misi-card" data-aos="zoom-in" data-aos-delay="1100" data-aos-duration="650">
                  <div className="visi-misi-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M4 20h16M6 17V7.5a2.5 2.5 0 0 1 5 0V17M13 17V10.5a2.5 2.5 0 0 1 5 0V17"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="visi-misi-card-title">{t('page.about.vision.cards.development.title')}</h3>
                    <p className="visi-misi-card-text">
                      {t('page.about.vision.cards.development.text')}
                    </p>
                  </div>
                </article>

                <article
                  className="visi-misi-card visi-misi-card--overlap-1"
                  data-aos="flip-left"
                  data-aos-delay="1250"
                  data-aos-duration="700"
                >
                  <div className="visi-misi-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M12 2.5 5 6v6.5c0 4 2.8 7.4 7 9 4.2-1.6 7-5 7-9V6l-7-3.5Zm0 5a3 3 0 0 1 3 3c0 1.3-.8 2.4-1.9 2.8L12 17l-1.1-3.7A3 3 0 0 1 9 10.5a3 3 0 0 1 3-3Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="visi-misi-card-title">{t('page.about.vision.cards.identity.title')}</h3>
                    <p className="visi-misi-card-text">
                      {t('page.about.vision.cards.identity.text')}
                    </p>
                  </div>
                </article>

                <article
                  className="visi-misi-card visi-misi-card--overlap-2"
                  data-aos="fade-left"
                  data-aos-delay="1400"
                  data-aos-duration="700"
                >
                  <div className="visi-misi-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M12 4a4 4 0 0 1 4 4c0 .5-.1.9-.2 1.3l2.5 1a3 3 0 0 1 1.7 3.9l-1.2 2.9a3 3 0 0 1-3.9 1.7l-2.3-.9-.9 2.3a3 3 0 0 1-3.9 1.7l-2.9-1.2a3 3 0 0 1-1.7-3.9l.9-2.3-2.3-.9A3 3 0 0 1 3 8.6L4.2 5.7A3 3 0 0 1 8.1 4l2.3.9A4 4 0 0 1 12 4Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="visi-misi-card-title">{t('page.about.vision.cards.management.title')}</h3>
                    <p className="visi-misi-card-text">
                      {t('page.about.vision.cards.management.text')}
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* Filosofi Logo & Warna */}
        <section
          className="mu-philosophy"
          data-aos="fade-up"
          data-aos-delay="150"
          data-aos-duration="850"
        >
          <div className="mu-philosophy__shell">
            <div className="mu-philosophy__inner">
              <header className="mu-philosophy__header">
                <div className="mu-philosophy__headerText">
                  <p className="mu-philosophy__eyebrow">{t('page.about.philosophy.eyebrow')}</p>
                  <h2 className="mu-philosophy__title">{t('page.about.philosophy.title')}</h2>
                  <p className="mu-philosophy__subtitle">
                    {t('page.about.philosophy.subtitle')}
                  </p>
                </div>
                <div className="mu-philosophy__divider" aria-hidden="true" />
              </header>

              <div className="mu-philosophy__content">
                <aside className="mu-philosophy__logoWrap">
                  <div
                    className="mu-philosophy__logoCard"
                    data-aos="zoom-in"
                    data-aos-delay="1050"
                    data-aos-duration="700"
                  >
                    <div className="mu-philosophy__logoFrame">
                      <Image
                        src="/logo.png"
                        alt="Logo Madura United FC"
                        width={560}
                        height={560}
                        className="mu-philosophy__logo"
                        sizes="(min-width: 1024px) 320px, (min-width: 768px) 320px, 260px"
                        loading="lazy"
                        priority={false}
                      />
                      <p className="mu-philosophy__logoCaption">{t('page.about.philosophy.logo_caption')}</p>
                    </div>

                    <div className="mu-philosophy__callout" data-aos="fade-up" data-aos-delay="1200" data-aos-duration="650">
                      <p className="mu-philosophy__calloutText">
                        {t('page.about.philosophy.callout_text')}
                      </p>
                    </div>
                  </div>
                </aside>

                <div className="mu-philosophy__panel" data-aos="fade-left" data-aos-delay="1250" data-aos-duration="750">
                  <div className="mu-philosophy__panelHeader">
                    <h3 className="mu-philosophy__panelTitle">{t('page.about.philosophy.panel_title')}</h3>
                    <div className="mu-philosophy__panelRule" aria-hidden="true" />
                  </div>

                  <div className="mu-philosophy__grid">
                    <article className="mu-philosophy__item" data-aos="fade-right" data-aos-delay="1450" data-aos-duration="650">
                      <div className="mu-philosophy__badge">01</div>
                      <div className="mu-philosophy__itemBody">
                        <h4 className="mu-philosophy__itemTitle">{t('page.about.philosophy.items.01.title')}</h4>
                        <p className="mu-philosophy__itemText">
                          {t('page.about.philosophy.items.01.text1')}
                        </p>
                        <p className="mu-philosophy__itemText">
                          <span className="mu-philosophy__itemEm">{t('page.about.philosophy.items.01.text2_em')}</span> {t('page.about.philosophy.items.01.text2')}
                        </p>
                      </div>
                    </article>

                    <article className="mu-philosophy__item" data-aos="flip-up" data-aos-delay="1600" data-aos-duration="700">
                      <div className="mu-philosophy__badge">02</div>
                      <div className="mu-philosophy__itemBody">
                        <h4 className="mu-philosophy__itemTitle">{t('page.about.philosophy.items.02.title')}</h4>
                        <p className="mu-philosophy__itemText">{t('page.about.philosophy.items.02.text1')}</p>
                        <p className="mu-philosophy__itemText">
                          <span className="mu-philosophy__itemEm">{t('page.about.philosophy.items.02.text2_em')}</span> {t('page.about.philosophy.items.02.text2')}
                        </p>
                      </div>
                    </article>

                    <article className="mu-philosophy__item" data-aos="zoom-in" data-aos-delay="1750" data-aos-duration="650">
                      <div className="mu-philosophy__badge">03</div>
                      <div className="mu-philosophy__itemBody">
                        <h4 className="mu-philosophy__itemTitle">{t('page.about.philosophy.items.03.title')}</h4>
                        <p className="mu-philosophy__itemText">{t('page.about.philosophy.items.03.text1')}</p>
                        <p className="mu-philosophy__itemText">
                          <span className="mu-philosophy__itemEm">{t('page.about.philosophy.items.03.text2_em')}</span> {t('page.about.philosophy.items.03.text2')}
                        </p>
                      </div>
                    </article>

                    <article className="mu-philosophy__item" data-aos="fade-left" data-aos-delay="1900" data-aos-duration="650">
                      <div className="mu-philosophy__badge">04</div>
                      <div className="mu-philosophy__itemBody">
                        <h4 className="mu-philosophy__itemTitle">{t('page.about.philosophy.items.04.title')}</h4>
                        <p className="mu-philosophy__itemText">
                          <span className="mu-philosophy__itemEm">{t('page.about.philosophy.items.04.text_em')}</span> {t('page.about.philosophy.items.04.text')}
                        </p>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Home Base */}
        <section className="mu-homebase" data-aos="fade-up" data-aos-delay="200">
          <div className="mu-homebase__shell">
            <div className="mu-homebase__inner">
              <header className="mu-homebase__header">
                <div>
                  <p className="mu-homebase__eyebrow">{t('page.about.homebase.eyebrow')}</p>
                  <h2 className="mu-homebase__title">{t('page.about.homebase.title')}</h2>
                  <p className="mu-homebase__subtitle">
                    {t('page.about.homebase.subtitle')}
                  </p>
                </div>
                <div className="mu-homebase__divider" aria-hidden="true" />
              </header>

              <motion.div
                className="mu-homebase__stage"
                role="button"
                tabIndex={0}
                aria-label="Tukar posisi kartu Home Base"
                style={{ touchAction: "pan-y" }}
                onClick={() => {
                  if (didPanRef.current) {
                    didPanRef.current = false;
                    return;
                  }
                  toggleSwap();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleSwap();
                  }
                }}
                onPanStart={() => {
                  didPanRef.current = false;
                }}
                onPanEnd={(_, info) => {
                  const swipeThreshold = 60;
                  if (Math.abs(info.offset.x) >= swipeThreshold) {
                    didPanRef.current = true;
                    toggleSwap();
                  }
                }}
              >
                <div className="mu-homebase__anim mu-homebase__anim--arrow-1">
                  {/* Arrow: top of Card B -> Card A */}
                  <motion.svg
                    className="mu-homebase__arrow mu-homebase__arrow--top"
                    viewBox="0 0 260 160"
                    fill="none"
                    aria-hidden="true"
                    // Pastikan elemen induk memiliki warna teks (color) yang diset,
                    // karena stroke menggunakan "currentColor".
                    // Misalnya: style={{ color: '#333' }} pada div pembungkusnya.
                    animate={{ opacity: isAnimating ? 0 : 1 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : isAnimating ? 0.04 : 0.02,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Path 1: Garis Lengkung Utama */}
                    <path
                      d="M200 130 C160 60 110 50 60 60"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Path 2: Kepala Panah di Kiri Atas */}
                    <path
                      d="M 75 50 L 60 60 L 70 75"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </div>

                <div className="mu-homebase__anim mu-homebase__anim--arrow-2">
                  {/* Arrow: bottom of Card A -> Card B */}
                  <motion.svg
                    className="mu-homebase__arrow mu-homebase__arrow--bottom"
                    viewBox="0 0 260 160"
                    fill="none"
                    aria-hidden="true"
                    animate={{ opacity: isAnimating ? 0 : 1 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : isAnimating ? 0.04 : 0.02,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Path 1: Garis Lengkung (Hasil rotasi 180 derajat dari versi top) */}
                    <path
                      d="M 60 30 C 100 100, 150 110, 200 100"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Path 2: Kepala Panah (Sekarang berada di kanan bawah, menghadap ke kanan) */}
                    <path
                      d="M 185 110 L 200 100 L 190 85"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </div>

                <div className="mu-homebase__anim mu-homebase__anim--card-a">
                  {/* Card A (SGMRP) */}
                  <motion.div
                    className="mu-homebase__card"
                    initial={false}
                    animate={{
                      top: isSwapped ? "38%" : "0%",
                      left: isSwapped ? "38%" : "0%",
                      zIndex: isSwapped ? 10 : 20,
                      rotate: shouldReduceMotion ? 0 : isSwapped ? 2 : 0,
                    }}
                    transition={springTransition}
                    onAnimationComplete={() => handleCardComplete(swapCycle)}
                  >
                    <Image
                      src="/sgmrp.jpg"
                      alt="Home Base Madura United - Card A"
                      fill
                      className="mu-homebase__img"
                      sizes="(min-width: 1024px) 640px, (min-width: 768px) 62vw, 90vw"
                      loading="lazy"
                      priority={false}
                    />
                    <div className="mu-homebase__badge">{t('page.about.homebase.stadium_main')}</div>
                    <div className="mu-homebase__cardOverlay" aria-hidden="true" />
                    <p className="mu-homebase__caption">{t('page.about.homebase.sgmrp')}</p>
                  </motion.div>
                </div>

                <div className="mu-homebase__anim mu-homebase__anim--card-b">
                  {/* Card B (SGB) */}
                  <motion.div
                    className="mu-homebase__card"
                    initial={false}
                    animate={{
                      top: isSwapped ? "0%" : "38%",
                      left: isSwapped ? "0%" : "38%",
                      zIndex: isSwapped ? 20 : 10,
                      rotate: shouldReduceMotion ? 0 : isSwapped ? -2 : 0,
                    }}
                    transition={springTransition}
                    onAnimationComplete={() => handleCardComplete(swapCycle)}
                  >
                    <Image
                      src="/sgb.jpg"
                      alt="Home Base Madura United - Card B"
                      fill
                      className="mu-homebase__img"
                      sizes="(min-width: 1024px) 640px, (min-width: 768px) 62vw, 90vw"
                      loading="lazy"
                      priority={false}
                    />
                    <div className="mu-homebase__cardOverlay" aria-hidden="true" />
                    <p className="mu-homebase__caption">{t('page.about.homebase.sgb')}</p>
                  </motion.div>
                </div>

              </motion.div>
            </div>
          </div>
        </section>

        <StrukturOrganisasiSection />

        {/* Prestasi & Penghargaan */}
        <section
          className="mu-achievements"
          aria-labelledby="mu-achievements-title"
          data-aos="fade-up"
          data-aos-delay="150"
          data-aos-duration="900"
        >
          <div className="mu-achievements__shell">
            <header className="mu-achievements__header">
              <p className="mu-achievements__eyebrow">{t('page.about.achievements.eyebrow')}</p>
              <h2 id="mu-achievements-title" className="mu-achievements__title">
                {t('page.about.achievements.title')}
              </h2>
            </header>

            <ul className="mu-achievements__grid" role="list">
              <li className="mu-achievements__item">
                <div
                  className="mu-achievements__iconWrap"
                  aria-hidden="true"
                  data-aos="zoom-in"
                  data-aos-anchor=".mu-achievements"
                  data-aos-delay="1200"
                  data-aos-duration="650"
                >
                  <Image
                    src="/suramadu2018.png"
                    alt=""
                    width={512}
                    height={512}
                    sizes="152px"
                    quality={100}
                    className="mu-achievements__icon"
                    loading="lazy"
                    priority={false}
                  />
                </div>
                <h3 className="mu-achievements__itemTitle">{t('page.about.achievements.items.suramadu.title')}</h3>
                <p className="mu-achievements__itemDesc">
                  {t('page.about.achievements.items.suramadu.desc')}
                </p>
              </li>

              <li className="mu-achievements__item">
                <div
                  className="mu-achievements__iconWrap"
                  aria-hidden="true"
                  data-aos="flip-left"
                  data-aos-anchor=".mu-achievements"
                  data-aos-delay="1340"
                  data-aos-duration="700"
                >
                  <Image
                    src="/runnerup.png"
                    alt=""
                    width={512}
                    height={512}
                    sizes="152px"
                    quality={100}
                    className="mu-achievements__icon"
                    loading="lazy"
                    priority={false}
                  />
                </div>
                <h3 className="mu-achievements__itemTitle">{t('page.about.achievements.items.runnerup.title')}</h3>
                <p className="mu-achievements__itemDesc">
                  {t('page.about.achievements.items.runnerup.desc')}
                </p>
              </li>

              <li className="mu-achievements__item">
                <div
                  className="mu-achievements__iconWrap"
                  aria-hidden="true"
                  data-aos="fade-up"
                  data-aos-anchor=".mu-achievements"
                  data-aos-delay="1480"
                  data-aos-duration="650"
                >
                  <Image
                    src="/sertifikatafc.png"
                    alt=""
                    width={512}
                    height={512}
                    sizes="152px"
                    quality={100}
                    className="mu-achievements__icon"
                    loading="lazy"
                    priority={false}
                  />
                </div>
                <h3 className="mu-achievements__itemTitle">{t('page.about.achievements.items.afc.title')}</h3>
                <p className="mu-achievements__itemDesc">
                  {t('page.about.achievements.items.afc.desc')}
                </p>
              </li>

              <li className="mu-achievements__item">
                <div
                  className="mu-achievements__iconWrap"
                  aria-hidden="true"
                  data-aos="zoom-in"
                  data-aos-anchor=".mu-achievements"
                  data-aos-delay="1620"
                  data-aos-duration="650"
                >
                  <Image
                    src="/fairplay.png"
                    alt=""
                    width={512}
                    height={512}
                    sizes="152px"
                    quality={100}
                    className="mu-achievements__icon"
                    loading="lazy"
                    priority={false}
                  />
                </div>
                <h3 className="mu-achievements__itemTitle">{t('page.about.achievements.items.fairplay.title')}</h3>
                <p className="mu-achievements__itemDesc">
                  {t('page.about.achievements.items.fairplay.desc')}
                </p>
              </li>
            </ul>
          </div>
        </section>

        <KomunitasSuporterSection />

      </div>
    </section>
  );
}
