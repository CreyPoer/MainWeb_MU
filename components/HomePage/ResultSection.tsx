'use client';
// Updated: 2026-01-29 01:10 - Fully Responsive Fixed

import React from 'react';
import Image from 'next/image';

interface MatchResult {
    id: number;
    homeTeam: string;
    homeLogo: string;
    homeScore: number;
    awayTeam: string;
    awayLogo: string;
    awayScore: number;
    stadium: string;
    date: string;
    time: string;
}

export default function ResultSection() {
    // Dummy data dengan logo dari internet
    const matchResults: MatchResult[] = [
        {
            id: 1,
            homeTeam: 'Kicks Academy',
            homeLogo: 'https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png',
            homeScore: 3,
            awayTeam: 'Soccer Club',
            awayLogo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
            awayScore: 1,
            stadium: 'Golden Stadium',
            date: '10.03.22',
            time: '06.00 PM'
        },
        {
            id: 2,
            homeTeam: 'Wolves Soccer',
            homeLogo: 'https://upload.wikimedia.org/wikipedia/en/f/fc/Wolverhampton_Wanderers.svg',
            homeScore: 2,
            awayTeam: 'Kicks Academy',
            awayLogo: 'https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png',
            awayScore: 2,
            stadium: 'Winner Stadium',
            date: '10.03.15',
            time: '08.30 PM'
        }
    ];

    return (
        <section className="relative h-0 z-10 pointer-events-none">
            {/* Floating Widget Container */}
            <div
                className="absolute shadow-2xl pointer-events-auto"
                style={{
                    left: '0',
                    right: '0',
                    margin: '0 auto',
                    top: '-150px',
                    width: '95%',
                    maxWidth: '1200px',
                    background: 'linear-gradient(to top, #2a2a2a 0%, #151515 100%)',
                    borderRadius: '1rem 1rem 0rem 0rem',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column', // Heading Top, Cards Bottom on Mobile
                    gap: '1.5rem'
                }}
            >
                {/* Desktop: Switch to Row Layout */}
                <style jsx>{`
                    /* Hide scrollbar for Chrome, Safari and Opera */
                    .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                    }
                    /* Hide scrollbar for IE, Edge and Firefox */
                    .scrollbar-hide {
                        -ms-overflow-style: none;  /* IE and Edge */
                        scrollbar-width: none;  /* Firefox */
                    }
                    
                    @media (min-width: 768px) {
                        div[class*="absolute"] {
                            flex-direction: row !important;
                            align-items: center !important;
                            padding: 2rem !important;
                            gap: 2rem !important;
                            top: -98px !important;
                            border-radius: 1.5rem 1.5rem 0 0 !important;
                        }
                    }
                `}</style>

                {/* Left: Heading */}
                <div className="flex items-center gap-4 shrink-0 lg:w-[280px]">
                    {/* Icon Bola Sepak Dark Mode - Fixed Size */}
                    <div style={{ position: 'relative', width: '40px', height: '40px', flexShrink: 0 }}>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            style={{ width: '100%', height: '100%' }}
                        >
                            <circle cx="12" cy="12" r="10" fill="#111111" stroke="#FFFFFF" strokeWidth="1.5" />
                            <path d="M12 7L16.5 10.5L15 16H9L7.5 10.5L12 7Z" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="1" strokeLinejoin="round" />
                            <path d="M12 7V2" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M16.5 10.5L21 9" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M15 16L18 20" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M9 16L6 20" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M7.5 10.5L3 9" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>

                    {/* Text - WHITE */}
                    <div>
                        <h2 style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.2, marginBottom: '4px' }}>
                            Latest Matches
                        </h2>
                        <h3 style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: 900, lineHeight: 1.1 }}>
                            Updates from Our Last Game
                        </h3>
                    </div>
                </div>

                {/* Right: Cards Container - HORIZONTAL SCROLL ON MOBILE */}
                <div
                    className="scrollbar-hide"
                    style={{
                        display: 'flex',
                        flexDirection: 'row', // Force Row for horizontal scroll
                        gap: '1rem',
                        overflowX: 'auto', // Enable Horizontal Scroll
                        paddingBottom: '0.5rem', // Space for scrollbar (hidden but safety)
                        width: '100%',
                        scrollSnapType: 'x mandatory' // Snap effect
                    }}
                >
                    {matchResults.map((match, index) => (
                        <div
                            key={match.id}
                            data-aos="fade-left"
                            data-aos-delay={index * 150}
                            data-aos-offset="200"
                            data-aos-anchor-placement="center-bottom"
                            style={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: '1rem',
                                padding: '1rem',
                                flex: '0 0 100%', // Each card takes full width on mobile
                                minWidth: '280px', // Prevent squishing
                                maxWidth: '100%',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                scrollSnapAlign: 'center' // Snap to center
                            }}
                        >
                            {/* LEFT: Home Team */}
                            <div className="flex flex-col items-center gap-2 w-16 md:w-20">
                                <div style={{ position: 'relative', width: '50px', height: '50px' }}>
                                    <Image
                                        src={match.homeLogo}
                                        alt={match.homeTeam}
                                        fill
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                                <span style={{ fontSize: '11px', fontWeight: 'bold', textAlign: 'center', color: '#000000', lineHeight: 1.2 }}>
                                    {match.homeTeam}
                                </span>
                            </div>

                            {/* CENTER: Score & Details */}
                            <div className="flex flex-col items-center flex-1 px-2">
                                {/* Stadium */}
                                <div className="flex items-center gap-1 mb-1">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#EF4444">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                    </svg>
                                    <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#111111', whiteSpace: 'nowrap' }}>
                                        {match.stadium}
                                    </span>
                                </div>

                                {/* Score Big */}
                                <div className="flex items-center gap-3">
                                    <span style={{ fontSize: '32px', fontWeight: 900, color: '#EF4444', lineHeight: 1 }}>{match.homeScore}</span>
                                    <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#111111', lineHeight: 1 }}>-</span>
                                    <span style={{ fontSize: '32px', fontWeight: 900, color: '#EF4444', lineHeight: 1 }}>{match.awayScore}</span>
                                </div>

                                {/* Date */}
                                <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#333333', marginTop: '4px' }}>
                                    {match.date} - {match.time}
                                </span>
                            </div>

                            {/* RIGHT: Away Team */}
                            <div className="flex flex-col items-center gap-2 w-16 md:w-20">
                                <div style={{ position: 'relative', width: '50px', height: '50px' }}>
                                    <Image
                                        src={match.awayLogo}
                                        alt={match.awayTeam}
                                        fill
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                                <span style={{ fontSize: '11px', fontWeight: 'bold', textAlign: 'center', color: '#000000', lineHeight: 1.2 }}>
                                    {match.awayTeam}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Desktop Override for Flex reset */}
                <style jsx>{`
                    @media (min-width: 768px) {
                        /* Reset logic for desktop: No scroll, side-by-side flex */
                        .scrollbar-hide {
                            overflow-x: visible !important;
                            flex-wrap: nowrap !important;
                            gap: 1rem !important;
                        }
                        .scrollbar-hide > div {
                            flex: 1 !important;
                            min-width: 0 !important;
                            scroll-snap-align: none !important;
                        }
                    }
                `}</style>
            </div>
        </section>
    );
}
