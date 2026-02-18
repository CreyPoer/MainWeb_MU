"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import StrukturOrganisasiSection from "./StrukturOrganisasiSection";
import KomunitasSuporterSection from "./KomunitasSuporterSection";
import { useLanguage } from "@/contexts/LanguageContext";

type TimelinePoint = { x: number; y: number };

export default function TentangContent() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [isSwapped, setIsSwapped] = useState(false);
  const [swapCycle, setSwapCycle] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const didPanRef = useRef(false);
  const pendingCompleteRef = useRef(0);
  const activeCycleRef = useRef(0);

  const timelineRef = useRef<HTMLDivElement | null>(null);
  const circle1Ref = useRef<HTMLDivElement | null>(null);
  const circle2Ref = useRef<HTMLDivElement | null>(null);
  const circle3Ref = useRef<HTMLDivElement | null>(null);
  const connector12Ref = useRef<HTMLDivElement | null>(null);
  const connector23Ref = useRef<HTMLDivElement | null>(null);
  const path12Ref = useRef<SVGPathElement | null>(null);
  const path23Ref = useRef<SVGPathElement | null>(null);
  const didRunTimelineAnimRef = useRef(false);

  const [timelineSvgBox, setTimelineSvgBox] = useState<{ width: number; height: number } | null>(null);
  const [timelinePaths, setTimelinePaths] = useState<{ d12: string; d23: string } | null>(null);
  const [showNode2, setShowNode2] = useState(true);
  const [showNode3, setShowNode3] = useState(true);
  const [useSvgTimeline, setUseSvgTimeline] = useState(false);

  const orthogonalBetween = useCallback((a: TimelinePoint, b: TimelinePoint, midY: number) => {
    const dx = b.x - a.x;
    const dy1 = midY - a.y;
    const dy2 = b.y - midY;

    // Default radius (px) for rounded corners; clamped per-segment.
    const baseRadius = 22;

    const dirX = Math.sign(dx) || 1;
    const dirY1 = Math.sign(dy1) || 1;
    const dirY2 = Math.sign(dy2) || 1;

    const maxR1 = Math.min(Math.abs(dy1), Math.abs(dx) / 2);
    const maxR2 = Math.min(Math.abs(dy2), Math.abs(dx) / 2);
    const r1 = Math.max(0, Math.min(baseRadius, maxR1));
    const r2 = Math.max(0, Math.min(baseRadius, maxR2));

    // If geometry is too tight, fallback to sharp orthogonal.
    if (!Number.isFinite(dx) || !Number.isFinite(dy1) || !Number.isFinite(dy2) || (r1 === 0 && r2 === 0)) {
      return `M ${a.x} ${a.y} L ${a.x} ${midY} L ${b.x} ${midY} L ${b.x} ${b.y}`;
    }

    let d = `M ${a.x} ${a.y}`;

    // Corner near A: vertical -> horizontal
    if (r1 > 0) {
      d += ` L ${a.x} ${midY - dirY1 * r1}`;
      d += ` Q ${a.x} ${midY} ${a.x + dirX * r1} ${midY}`;
    } else {
      d += ` L ${a.x} ${midY}`;
    }

    // Corner near B: horizontal -> vertical
    if (r2 > 0) {
      d += ` L ${b.x - dirX * r2} ${midY}`;
      d += ` Q ${b.x} ${midY} ${b.x} ${midY + dirY2 * r2}`;
    } else {
      d += ` L ${b.x} ${midY}`;
    }

    d += ` L ${b.x} ${b.y}`;
    return d;
  }, []);

  const computeTimelineSvg = useCallback(() => {
    if (typeof window !== "undefined" && !window.matchMedia("(min-width: 768px)").matches) {
      setUseSvgTimeline(false);
      return;
    }

    const timelineEl = timelineRef.current;
    const node1 = circle1Ref.current;
    const node2 = circle2Ref.current;
    const node3 = circle3Ref.current;
    if (!timelineEl || !node1 || !node2 || !node3) return;

    const wrapRect = timelineEl.getBoundingClientRect();
    const r1 = node1.getBoundingClientRect();
    const r2 = node2.getBoundingClientRect();
    const r3 = node3.getBoundingClientRect();

    const p1 = { x: r1.left - wrapRect.left + r1.width / 2, y: r1.top - wrapRect.top + r1.height / 2 };
    const p2 = { x: r2.left - wrapRect.left + r2.width / 2, y: r2.top - wrapRect.top + r2.height / 2 };
    const p3 = { x: r3.left - wrapRect.left + r3.width / 2, y: r3.top - wrapRect.top + r3.height / 2 };

    const width = Math.max(1, Math.round(wrapRect.width));
    const height = Math.max(1, Math.round(wrapRect.height));

    const getConnectorMidY = (rowEl: HTMLDivElement | null, fallback: number) => {
      if (!rowEl) return fallback;
      const hr = rowEl.querySelector("hr") as HTMLHRElement | null;
      const rect = (hr ?? rowEl).getBoundingClientRect();
      const y = rect.top - wrapRect.top + rect.height / 2;
      if (!Number.isFinite(y)) return fallback;
      return Math.max(0, Math.min(height, y));
    };

    const fallback12 = (p1.y + p2.y) / 2;
    const fallback23 = (p2.y + p3.y) / 2;
    const midY12 = getConnectorMidY(connector12Ref.current, fallback12);
    const midY23 = getConnectorMidY(connector23Ref.current, fallback23);

    setTimelineSvgBox({ width, height });
    setTimelinePaths({ d12: orthogonalBetween(p1, p2, midY12), d23: orthogonalBetween(p2, p3, midY23) });
    setUseSvgTimeline(true);
  }, [orthogonalBetween]);

  useEffect(() => {
    const timelineEl = timelineRef.current;
    if (!timelineEl) return;

    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(() => computeTimelineSvg());
    };

    schedule();
    window.addEventListener("resize", schedule);

    const ro = new ResizeObserver(() => schedule());
    ro.observe(timelineEl);

    return () => {
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [computeTimelineSvg]);

  useEffect(() => {
    const timelineEl = timelineRef.current;
    if (!timelineEl) return;

    if (shouldReduceMotion) {
      const raf = window.requestAnimationFrame(() => {
        setShowNode2(true);
        setShowNode3(true);
      });

      return () => window.cancelAnimationFrame(raf);
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        if (didRunTimelineAnimRef.current) return;

        didRunTimelineAnimRef.current = true;
        setShowNode2(false);
        setShowNode3(false);

        const run = async () => {
          const p12 = path12Ref.current;
          const p23 = path23Ref.current;
          if (!p12 || !p23) {
            setShowNode2(true);
            setShowNode3(true);
            return;
          }

          const prepare = (pathEl: SVGPathElement) => {
            const len = pathEl.getTotalLength();
            pathEl.style.strokeDasharray = `${len}`;
            pathEl.style.strokeDashoffset = `${len}`;
            pathEl.getBoundingClientRect();
            pathEl.style.transition = "stroke-dashoffset 900ms ease";
            return len;
          };

          prepare(p12);
          prepare(p23);
          p23.style.transition = "none";

          p12.style.strokeDashoffset = "0";
          await new Promise((r) => window.setTimeout(r, 920));
          setShowNode2(true);
          await new Promise((r) => window.setTimeout(r, 220));

          p23.style.transition = "stroke-dashoffset 900ms ease";
          p23.style.strokeDashoffset = "0";
          await new Promise((r) => window.setTimeout(r, 920));
          setShowNode3(true);
        };

        void run();
      },
      { threshold: 0.35 }
    );

    io.observe(timelineEl);
    return () => io.disconnect();
  }, [shouldReduceMotion]);

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
        <section className="space-y-6" data-aos="fade-up">
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "32px 24px",
            }}
          >
            <div style={{ marginBottom: "28px" }}>
              <h2
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#b91c1c",
                }}
              >
                {t('page.about.history.title')}
              </h2>
              <p
                style={{
                  marginTop: "10px",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  color: "#374151",
                }}
              >
                {t('page.about.history.desc')}
              </p>
            </div>

            {/* Timeline dengan curved journey line */}
            <div
              ref={timelineRef}
              className={useSvgTimeline ? "mu-history-timeline mu-history-timeline--svg" : "mu-history-timeline"}
            >
              {useSvgTimeline && timelineSvgBox && timelinePaths ? (
                <svg
                  className="mu-history-timeline__svg"
                  width={timelineSvgBox.width}
                  height={timelineSvgBox.height}
                  viewBox={`0 0 ${timelineSvgBox.width} ${timelineSvgBox.height}`}
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path ref={path12Ref} d={timelinePaths.d12} className="mu-history-timeline__path" />
                  <path ref={path23Ref} d={timelinePaths.d23} className="mu-history-timeline__path" />
                </svg>
              ) : null}

              {/* Era Fondasi */}
              <div className="timeline-row how-it-works">
                <div className="col-2 text-center bottom">
                  <div ref={circle1Ref} className="circle">1</div>
                </div>
                <div className="col-6">
                  <div className="mu-step-label">{t('page.about.history.foundation.label')}</div>
                  <div className="mu-step-title">{t('page.about.history.foundation.title')}</div>
                  <p className="mu-step-body">
                    {t('page.about.history.foundation.body')}
                  </p>
                </div>
              </div>

              {/* Path between 1-2 */}
              <div ref={connector12Ref} className="timeline-row timeline">
                <div className="col-2">
                  <div className="corner top-right" />
                </div>
                <div className="col-8">
                  <hr />
                </div>
                <div className="col-2">
                  <div className="corner left-bottom" />
                </div>
              </div>

              {/* Era Transisi */}
              <div className="timeline-row how-it-works justify-end">
                <div className="col-6 text-right">
                  <div className="mu-step-label">{t('page.about.history.transition.label')}</div>
                  <div className="mu-step-title">{t('page.about.history.transition.title')}</div>
                  <p className="mu-step-body">
                    {t('page.about.history.transition.body')}
                  </p>
                </div>
                <div className="col-2 text-center full">
                  <div
                    ref={circle2Ref}
                    className={showNode2 ? "circle mu-history-timeline__node is-visible" : "circle mu-history-timeline__node is-hidden"}
                  >
                    2
                  </div>
                </div>
              </div>

              {/* Path between 2-3 */}
              <div ref={connector23Ref} className="timeline-row timeline">
                <div className="col-2">
                  <div className="corner right-bottom" />
                </div>
                <div className="col-8">
                  <hr />
                </div>
                <div className="col-2">
                  <div className="corner top-left" />
                </div>
              </div>

              {/* Era Kebangkitan */}
              <div className="timeline-row how-it-works">
                <div className="col-2 text-center top">
                  <div
                    ref={circle3Ref}
                    className={showNode3 ? "circle mu-history-timeline__node is-visible" : "circle mu-history-timeline__node is-hidden"}
                  >
                    3
                  </div>
                </div>
                <div className="col-6">
                  <div className="mu-step-label">{t('page.about.history.revival.label')}</div>
                  <div className="mu-step-title">{t('page.about.history.revival.title')}</div>
                  <p className="mu-step-body">
                    {t('page.about.history.revival.body1')}
                  </p>
                  <p className="mu-step-body">
                    {t('page.about.history.revival.body2')}
                  </p>
                  <p className="mu-step-body">
                    {t('page.about.history.revival.body3')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

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
                      <span className="mu-philosophy__pill">{t('page.about.philosophy.callout_pill')}</span>
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
