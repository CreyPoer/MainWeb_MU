"use client";

import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import styles from "./KomunitasSuporterSection.module.css";

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
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [sectionAnimDone, setSectionAnimDone] = useState(false);
  const [gridInView, setGridInView] = useState(false);
  const startCards = sectionAnimDone && gridInView;

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
          // Slower + clearer stagger
          staggerChildren: 0.28,
        },
      },
    }),
    []
  );

  const cardVariants: Variants = useMemo(() => {
    // 4 cards: make each entrance animation slightly different.
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

  const communities: SupporterCommunity[] = useMemo(
    () => [
      {
        id: 1,
        name: "K-Conk Mania",
        image: "/kconk.png",
        link: "https://www.facebook.com/madura4rt/",
        description:
          "K-Conk Mania adalah kelompok suporter Madura United yang berbasis di Bangkalan.",
      },
      {
        id: 2,
        name: "Trunojoyo Mania",
        image: "/trunojoyo.png",
        link: "https://id-id.facebook.com/Truman.id",
        description:
          "Trunojoyo Mania adalah basis suporter Madura United yang mewakili wilayah Sampang.",
      },
      {
        id: 3,
        name: "Taretan Dhibi'",
        image: "/taretan.png",
        link: "https://www.facebook.com/Taretandhibi/",
        description:
          "Taretan Dhibi' adalah komunitas suporter yang mengedepankan persaudaraan di Pamekasan.",
      },
      {
        id: 4,
        name: "Peccot Mania",
        image: "/peccot.png",
        link: "https://www.facebook.com/PeccotManiaSoengenep/",
        description:
          "Peccot Mania adalah kelompok suporter militan dari ujung timur pulau Madura, Sumenep.",
      },
    ],
    []
  );

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
              TENTANG KAMI
            </p>
            <h2
              id="komunitas-suporter-title"
              className={styles.title}
            >
              KOMUNITAS SUPORTER
            </h2>
          </div>
          <div className={styles.rule} aria-hidden="true" />
        </header>

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
              aria-label={`Buka ${item.name} di Facebook`}
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
                    src={item.image}
                    alt={`Logo ${item.name}`}
                    width={160}
                    height={160}
                    className={styles.logo}
                    sizes="96px"
                    quality={100}
                    loading="lazy"
                    priority={false}
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
      </div>
    </motion.section>
  );
}
