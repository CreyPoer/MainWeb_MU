"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import styles from "./KomunitasSuporterSection.module.css";
import { useLanguage } from "@/contexts/LanguageContext";

type SupporterCommunity = {
  id: number;
  name: string;
  image: string;
  link: string;
  description: string;
};

const SECTION_ANIM_DURATION_S = 0.95;
const AFTER_SECTION_BUFFER_MS = 150;

export default function KomunitasSuporterSection() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [sectionAnimDone, setSectionAnimDone] = useState(false);
  const [gridInView, setGridInView] = useState(false);
  const [communities, setCommunities] = useState<SupporterCommunity[]>([]);
  const [loading, setLoading] = useState(true);
  const startCards = sectionAnimDone && gridInView;

  useEffect(() => {
    async function fetchCommunities() {
      try {
        const res = await fetch("/api/community");
        const data = await res.json();
        if (Array.isArray(data)) {
          setCommunities(data);
        }
      } catch (err) {
        console.error("Error fetching communities:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCommunities();
  }, []);

  const sectionVariants: Variants = useMemo(
    () => ({
      hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: SECTION_ANIM_DURATION_S,
          ease: [0.16, 1, 0.3, 1],
        },
      },
    }),
    [shouldReduceMotion]
  );

  const gridVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: 1 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.28,
        },
      },
    }),
    []
  );

  const cardVariants: Variants = useMemo(() => {
    const presets = [
      { x: -56, y: 40, rotate: -4, scale: 0.94 },
      { x: 56, y: 36, rotate: 4, scale: 0.94 },
      { x: -44, y: 46, rotate: 3, scale: 0.93 },
      { x: 44, y: 44, rotate: -3, scale: 0.93 },
    ];

    const enterTransition = shouldReduceMotion
      ? ({ duration: 0.9, ease: [0.16, 1, 0.3, 1] } as const)
      : ({ duration: 0.95, ease: [0.16, 1, 0.3, 1] } as const);

    return {
      hidden: (index: number) => {
        const p = presets[index % presets.length];
        return shouldReduceMotion
          ? { opacity: 0, x: 0, y: 18, rotate: 0, scale: 0.98, filter: "blur(6px)" }
          : { opacity: 0, filter: "blur(8px)", ...p };
      },
      show: (index: number) => {
        const overshoot = shouldReduceMotion ? 1 : index % 2 === 0 ? 1.015 : 1.02;
        return {
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
          scale: overshoot,
          filter: "blur(0px)",
          transition: enterTransition,
        };
      },
      hover: {
        scale: 1.05,
        y: -10,
        transition: { type: "spring" as const, stiffness: 360, damping: 26, mass: 0.8 },
      },
    };
  }, [shouldReduceMotion]);

  return (
    <motion.section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="komunitas-suporter-title"
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      onAnimationComplete={(definition) => {
        if (shouldReduceMotion) {
          setSectionAnimDone(true);
          return;
        }
        if (definition !== "show") return;
        window.setTimeout(() => setSectionAnimDone(true), AFTER_SECTION_BUFFER_MS);
      }}
    >
      {/* Background photo (Fading Spirit Concept) */}
      <div className={styles.bgPhoto} aria-hidden="true" />

      {/* Overlay gradient: transparent top -> solid white mid/bottom */}
      <div className={styles.bgOverlay} aria-hidden="true" />

      <div className={styles.container}>
        <header className={styles.header} data-aos="fade-up" data-aos-delay="250">
          <div>
            <p className={styles.eyebrow}>
              {t('page.about.eyebrow').toUpperCase()}
            </p>
            <h2
              id="komunitas-suporter-title"
              className={styles.title}
            >
              {t('page.about.community_title').toUpperCase()}
            </h2>
          </div>
          <div className={styles.rule} aria-hidden="true" />
        </header>

        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem 0", color: "#888" }}>
            {t('page.about.loading_community')}
          </div>
        ) : communities.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem 0", color: "#888" }}>
            {t('page.about.no_community')}
          </div>
        ) : (
          <motion.div
            className={styles.grid}
            initial="hidden"
            animate={startCards ? "show" : "hidden"}
            variants={gridVariants}
            viewport={{ once: true, amount: 0.2 }}
            onViewportEnter={() => setGridInView(true)}
          >
            {communities.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className={styles.card}
                custom={index}
                variants={cardVariants}
                whileHover={shouldReduceMotion ? undefined : "hover"}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
                aria-label={`Buka ${item.name}`}
              >
                {/* Hover accent bottom line */}
                <motion.div
                  className={styles.accent}
                  variants={{
                    hover: { opacity: 1, scaleX: 1 },
                    show: { opacity: 0, scaleX: 0 },
                  }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  aria-hidden="true"
                />

                <div className={styles.logoWrap}>
                  <motion.div
                    className="relative"
                    variants={{
                      hover: { scale: 1.1 },
                      show: { scale: 1 },
                    }}
                    transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.7 }}
                  >
                    <Image
                      src={item.image || "/placeholder.png"}
                      alt={`Logo ${item.name}`}
                      width={160}
                      height={160}
                      className={styles.logo}
                      sizes="96px"
                      quality={100}
                      loading="lazy"
                      priority={false}
                      unoptimized
                    />
                  </motion.div>
                </div>

                <h3 className={styles.cardTitle}>
                  {item.name}
                </h3>
                <p className={styles.cardDesc}>
                  {item.description}
                </p>
              </motion.a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
