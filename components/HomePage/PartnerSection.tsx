"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

// --- DATA TYPE ---
interface PartnerItem {
    id: string | number;
    name: string;
    type: string;
    logo: string;
    isMain: boolean;
    link: string;
}

export default function PartnerSection() {
    const { t } = useLanguage();
    const [hoveredId, setHoveredId] = useState<string | number | null>(null);
    const [partnersData, setPartnersData] = useState<PartnerItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const res = await fetch('/api/partners');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setPartnersData(data);
                }
            } catch (error) {
                console.error("Failed to fetch partners", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPartners();
    }, []);

    return (
        <section style={{
            position: 'relative',
            padding: '80px 24px',
            overflow: 'hidden',
            backgroundColor: '#ffffff',
            backgroundImage: 'radial-gradient(circle at top right, #fef2f2, #ffffff, #ffffff)'
        }}>

            <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>

                {/* HEADER */}
                <div style={{ textAlign: 'center', marginBottom: '64px' }} data-aos="fade-down">
                    <h5 style={{
                        color: '#DC2626',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontSize: '14px',
                        marginBottom: '8px'
                    }}>
                        {t('section.partnership')}
                    </h5>
                    <h2 style={{
                        fontSize: '36px',
                        fontWeight: '900',
                        textTransform: 'uppercase',
                        color: '#111827',
                        lineHeight: '1.2'
                    }} className="header-title">
                        {t('section.general_partners')} <br />
                        <span style={{ color: '#DC2626' }}>{t('section.of_madura_united')}</span>
                    </h2>
                </div>


                {/* BENTO GRID */}
                <div className="partner-grid" data-aos="fade-up">
                    {partnersData.map((partner, index) => {
                        const isHovered = hoveredId === partner.id;
                        const hasHover = hoveredId !== null;
                        const isDimmed = hasHover && !isHovered;

                        const isMain = index === 0;

                        // Calculate Initial Transform State
                        let initialTransform = '';
                        if (isMain) {
                            initialTransform = 'scale(0.5) translateY(30px)'; // Pop up
                        } else if (index % 2 === 0) {
                            initialTransform = 'translateX(50px) rotate(5deg)'; // From Right
                        } else {
                            initialTransform = 'translateX(-50px) rotate(-5deg)'; // From Left
                        }

                        return (
                            <a
                                key={partner.id}
                                href={partner.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`partner-card partner-card-custom ${isMain ? 'main-sponsor' : ''}`}
                                style={{
                                    // Use CSS Variables for the animation start state
                                    "--initial-transform": initialTransform,
                                    "--initial-opacity": 0,

                                    // On Hover, we apply a specific transform inline.
                                    ...(isHovered ? { transform: "translateY(-4px) scale(1.01)" } : {}),

                                    // For dimming
                                    ...(isDimmed ? { opacity: 0.4 } : {}),

                                    // Other props
                                    filter: isDimmed ? "grayscale(100%) blur(1px)" : "grayscale(0%) blur(0px)",
                                    borderColor: isHovered ? "rgba(220, 38, 38, 0.3)" : "rgba(0,0,0,0.05)",
                                    transitionDelay: `${index * 100}ms`, // Inline delay
                                    boxShadow: isHovered
                                        ? "0 20px 40px -10px rgba(220, 38, 38, 0.15)"
                                        : "0 4px 6px -1px rgba(0, 0, 0, 0.02)",
                                    zIndex: isHovered ? 10 : 1
                                } as React.CSSProperties}
                                onMouseEnter={() => setHoveredId(partner.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                {/* HOVER GLOW BACKGROUND */}
                                <div
                                    className="glow-effect"
                                    style={{ opacity: isHovered ? 1 : 0 }}
                                />

                                {/* CONTENT */}
                                <div className="card-content">

                                    {/* LOGO */}
                                    <div className="logo-container" style={{
                                        width: isMain ? '280px' : '140px',
                                        height: isMain ? '280px' : '140px',
                                        position: 'relative'
                                    }}>
                                        <Image
                                            src={partner.logo || '/images/placeholder.png'}
                                            alt={partner.name}
                                            fill
                                            style={{
                                                objectFit: 'contain',
                                                filter: isHovered ? 'none' : 'grayscale(100%)',
                                                opacity: isHovered ? 1 : 0.7,
                                                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                                                transition: 'all 0.4s ease'
                                            }}
                                        />
                                    </div>

                                </div>
                            </a>
                        );
                    })}
                </div>

            </div>

            <style jsx>{`
                /* Base Animation State */
                .partner-card-custom {
                    transform: var(--initial-transform, translateY(30px));
                    opacity: var(--initial-opacity, 0); 
                    transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                /* Active State (Triggered by AOS on parent) */
                :global(.partner-grid.aos-animate) .partner-card-custom {
                    opacity: 1;
                    transform: translate3d(0, 0, 0) rotate(0) scale(1);
                }

                /* Grid Layout */
                .partner-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 16px;
                    width: 100%;
                    padding: 32px;
                }

                /* Card Styles */
                .partner-card {
                    background-color: rgba(255, 255, 255, 0.6);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(0, 0, 0, 0.05);
                    border-radius: 16px;
                    position: relative;
                    overflow: hidden;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 180px;
                }

                .card-content {
                    position: relative;
                    z-index: 2;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                    padding: 24px;
                }

                .logo-container {
                    position: relative;
                    transition: all 0.5s ease;
                }

                .glow-effect {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.8), transparent 70%);
                    pointer-events: none;
                    transition: opacity 0.5s ease;
                    z-index: 1;
                }

                /* RESPONSIVE: Desktop */
                @media (min-width: 768px) {
                    .partner-grid {
                        grid-template-columns: repeat(4, 1fr);
                        grid-auto-rows: 200px; /* Fixed height for consistent bento rows */
                    }

                    .main-sponsor {
                        grid-column: span 2;
                        grid-row: span 2;
                        min-height: 416px; /* 200 * 2 + 16 gap */
                    }

                    .header-title {
                        font-size: 48px !important;
                    }
                }

                /* RESPONSIVE: Mobile tweaks */
                @media (max-width: 767px) {
                    .main-sponsor {
                        grid-column: span 2; /* Full width on mobile */
                        min-height: 300px;
                    }
                }
            `}</style>
        </section >
    );
}
