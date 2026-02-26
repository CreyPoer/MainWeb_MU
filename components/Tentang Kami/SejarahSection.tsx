"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import styles from "./SejarahSection.module.css";

type TimelinePoint = { x: number; y: number };

export default function SejarahSection() {
    const { t } = useLanguage();
    const shouldReduceMotion = useReducedMotion();

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

    return (
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
                    className={useSvgTimeline ? `${styles.muHistoryTimeline} ${styles.muHistoryTimelineSvgMode}` : styles.muHistoryTimeline}
                >
                    {useSvgTimeline && timelineSvgBox && timelinePaths ? (
                        <svg
                            className={styles.muHistoryTimelineSvg}
                            width={timelineSvgBox.width}
                            height={timelineSvgBox.height}
                            viewBox={`0 0 ${timelineSvgBox.width} ${timelineSvgBox.height}`}
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >
                            <path ref={path12Ref} d={timelinePaths.d12} className={styles.muHistoryTimelinePath} />
                            <path ref={path23Ref} d={timelinePaths.d23} className={styles.muHistoryTimelinePath} />
                        </svg>
                    ) : null}

                    {/* Era Fondasi */}
                    <div className={`${styles.timelineRow} ${styles.timelineRowHowItWorks} ${styles.howItWorks}`}>
                        <div className={`${styles.col2} ${styles.col2Bottom} text-center`}>
                            <div ref={circle1Ref} className={styles.circle}>1</div>
                        </div>
                        <div className={styles.col6}>
                            <div className={styles.muStepLabel}>{t('page.about.history.foundation.label')}</div>
                            <div className={styles.muStepTitle}>{t('page.about.history.foundation.title')}</div>
                            <p className={styles.muStepBody}>
                                {t('page.about.history.foundation.body')}
                            </p>
                        </div>
                    </div>

                    {/* Path between 1-2 */}
                    <div ref={connector12Ref} className={`${styles.timelineRow} ${styles.timelineRowTimeline}`}>
                        <div className={styles.col2}>
                            <div className={`${styles.corner} ${styles.topRight}`} />
                        </div>
                        <div className={styles.col8}>
                            <hr />
                        </div>
                        <div className={styles.col2}>
                            <div className={`${styles.corner} ${styles.leftBottom}`} />
                        </div>
                    </div>

                    {/* Era Transisi */}
                    <div className={`${styles.timelineRow} ${styles.timelineRowHowItWorks} ${styles.howItWorks} ${styles.timelineRowJustifyEnd}`}>
                        <div className={`${styles.col6} ${styles.textRight}`}>
                            <div className={styles.muStepLabel}>{t('page.about.history.transition.label')}</div>
                            <div className={styles.muStepTitle}>{t('page.about.history.transition.title')}</div>
                            <p className={styles.muStepBody}>
                                {t('page.about.history.transition.body')}
                            </p>
                        </div>
                        <div className={`${styles.col2} ${styles.col2Full} text-center`}>
                            <div
                                ref={circle2Ref}
                                className={showNode2 ? `${styles.circle} ${styles.muHistoryTimelineNode} ${styles.muHistoryTimelineNodeIsVisible}` : `${styles.circle} ${styles.muHistoryTimelineNode} ${styles.muHistoryTimelineNodeIsHidden}`}
                            >
                                2
                            </div>
                        </div>
                    </div>

                    {/* Path between 2-3 */}
                    <div ref={connector23Ref} className={`${styles.timelineRow} ${styles.timelineRowTimeline}`}>
                        <div className={styles.col2}>
                            <div className={`${styles.corner} ${styles.rightBottom}`} />
                        </div>
                        <div className={styles.col8}>
                            <hr />
                        </div>
                        <div className={styles.col2}>
                            <div className={`${styles.corner} ${styles.topLeft}`} />
                        </div>
                    </div>

                    {/* Era Kebangkitan */}
                    <div className={`${styles.timelineRow} ${styles.timelineRowHowItWorks} ${styles.howItWorks}`}>
                        <div className={`${styles.col2} ${styles.col2Top} text-center`}>
                            <div
                                ref={circle3Ref}
                                className={showNode3 ? `${styles.circle} ${styles.muHistoryTimelineNode} ${styles.muHistoryTimelineNodeIsVisible}` : `${styles.circle} ${styles.muHistoryTimelineNode} ${styles.muHistoryTimelineNodeIsHidden}`}
                            >
                                3
                            </div>
                        </div>
                        <div className={styles.col6}>
                            <div className={styles.muStepLabel}>{t('page.about.history.revival.label')}</div>
                            <div className={styles.muStepTitle}>{t('page.about.history.revival.title')}</div>
                            <p className={styles.muStepBody}>
                                {t('page.about.history.revival.body1')}
                            </p>
                            <p className={styles.muStepBody}>
                                {t('page.about.history.revival.body2')}
                            </p>
                            <p className={styles.muStepBody}>
                                {t('page.about.history.revival.body3')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
