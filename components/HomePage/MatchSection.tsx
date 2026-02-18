'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import FlipCountdown from './FlipCountdown';
import { useLanguage } from '@/contexts/LanguageContext';

interface Match {
    id: number;
    competition_name: string;
    home_team: string;
    home_logo: string | null;
    away_team: string;
    away_logo: string | null;
    date: string;
    time: string;
    venue: string;
    is_home: boolean;
    competition_logo?: string;
}

export default function MatchSection() {
    const { t } = useLanguage();
    const [matches, setMatches] = useState<Match[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchMatches();
    }, []);

    const fetchMatches = async () => {
        try {
            const response = await fetch('/api/matches');
            const data = await response.json();
            setMatches(Array.isArray(data) ? data : []);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching matches:', error);
            setIsLoading(false);
        }
    };

    if (isLoading) return null;
    if (matches.length === 0) return null;

    const nextMatch = matches[0];

    // Format Date & Time
    const dateObj = new Date(nextMatch.date);
    const months = t('match.months') as unknown as string[];
    const monthNames = Array.isArray(months) ? months : ["JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI", "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER"];
    const formattedDate = `${monthNames[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
    const formattedVenue = nextMatch.venue ? nextMatch.venue.toUpperCase() : 'STADION GELORA RATU PAMELINGAN';

    // Time 24h
    const pad = (n: number) => n.toString().padStart(2, '0');
    const [hours, minutes] = nextMatch.time.split(':');
    const formattedTime = `${pad(parseInt(hours))}:${pad(parseInt(minutes))}`;

    return (
        <section className="relative w-full min-h-[550px] flex items-center justify-center bg-[#D32F2F] overflow-hidden" style={{ color: '#FFFFFF', marginBottom: '50px' }}>

            {/* 1. BACKGROUND: CSS Blend Mode (Robust) */}
            {/* Combines Image + Red Color + Multiply Mode in one layer */}
            <div
                className="absolute inset-0 z-0 w-full h-full"
                style={{
                    backgroundImage: "url('/SGMRP.png')",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundColor: '#D32F2F',       // The Red Base
                    backgroundBlendMode: 'multiply',  // The Blending Magic
                    opacity: 1 // Full opacity since we are blending
                }}
            />

            {/* 2. GRADIENT OVERLAY (For Text Readability) */}
            <div className="absolute inset-0 z-1 bg-gradient-to-t from-black/80 via-black/20 to-black/30 mix-blend-multiply opacity-60" />

            <div className="container mx-auto relative z-10 w-full max-w-[1600px] flex flex-col items-center justify-center py-12 px-4 md:px-8">

                {/* 1. BADGE - MODERN SKEWED STYLE */}
                <div className="mb-8 md:mb-12 w-full flex flex-col items-center justify-center" style={{ marginBottom: 'clamp(2rem, 4vw, 4rem)' }} data-aos="fade-up">
                    <div className="relative inline-block transform -skew-x-12 bg-black border-2 border-white shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-transform hover:scale-105 active:scale-95"
                        style={{
                            padding: 'clamp(0.75rem, 1.5vw, 1rem) clamp(2rem, 3vw, 3rem)'
                        }}>

                        <span className="block transform skew-x-12 text-white font-black uppercase tracking-[0.2em] leading-none drop-shadow-md"
                            style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1.6rem)' }}>
                            {t('match.next_match')}
                        </span>
                    </div>

                    {/* COUNTDOWN */}
                    {nextMatch && (
                        <div className="mt-12 md:mt-16 w-full flex justify-center" style={{ marginTop: 'clamp(1rem, 3vw, 3rem)' }}>
                            <FlipCountdown targetDate={`${nextMatch.date}T${nextMatch.time}`} />
                        </div>
                    )}
                </div>

                {/* 2. MATCH ROW - GRID LAYOUT WITH SEPARATE COLUMNS */}
                <div className="w-full" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)', gap: 'clamp(0.5rem, 2vw, 2rem)', alignItems: 'center' }} data-aos="fade-up" data-aos-delay="100">

                    {/* LEFT SIDE: Home Team -> Grid with 2 columns [Name | Logo] - Logo in center */}
                    <div className="hidden md:grid" style={{ gridTemplateColumns: '1fr auto', gap: 'clamp(1rem, 3vw, 3rem)', alignItems: 'center', justifyContent: 'end' }}>
                        {/* Name Column - ALWAYS stays in its column (OUTER LEFT) */}
                        <div className="flex justify-end items-center" style={{ overflow: 'visible' }}>
                            <h2 className="font-black uppercase text-white tracking-tighter leading-none text-right" style={{ fontSize: 'clamp(2rem, 4vw, 5rem)', whiteSpace: 'normal' }}>
                                {nextMatch.home_team}
                            </h2>
                        </div>
                        {/* Logo Column - ALWAYS stays in its column (CENTER) */}
                        <div className="shrink-0 transition-transform duration-500 hover:scale-110" style={{ position: 'relative', zIndex: 10 }}>
                            {nextMatch.home_logo ? (
                                <Image
                                    src={nextMatch.home_logo}
                                    alt={nextMatch.home_team}
                                    width={180}
                                    height={180}
                                    className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                                    style={{ width: 'clamp(50px, 12vw, 140px)', height: 'clamp(50px, 12vw, 140px)' }}
                                />
                            ) : (
                                <div className="bg-white/10 rounded-full flex items-center justify-center text-[10px]" style={{ width: 'clamp(50px, 12vw, 140px)', height: 'clamp(50px, 12vw, 140px)' }}>NO LOGO</div>
                            )}
                        </div>
                    </div>

                    {/* Mobile: Home Team */}
                    <div className="md:hidden flex items-center gap-2 justify-end">
                        <div className="flex flex-col justify-center items-end">
                            <h2 className="font-black uppercase text-white tracking-tighter leading-none text-right" style={{ fontSize: '1rem', maxWidth: '100px', lineHeight: '1.2' }}>
                                {nextMatch.home_team}
                            </h2>
                        </div>
                        <div className="shrink-0 transition-transform duration-500 hover:scale-110">
                            {nextMatch.home_logo ? (
                                <Image
                                    src={nextMatch.home_logo}
                                    alt={nextMatch.home_team}
                                    width={180}
                                    height={180}
                                    className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                                    style={{ width: 'clamp(50px, 12vw, 140px)', height: 'clamp(50px, 12vw, 140px)' }}
                                />
                            ) : (
                                <div className="bg-white/10 rounded-full flex items-center justify-center text-[10px]" style={{ width: 'clamp(50px, 12vw, 140px)', height: 'clamp(50px, 12vw, 140px)' }}>NO LOGO</div>
                            )}
                        </div>
                    </div>

                    {/* CENTER: VS SEPARATOR */}
                    <div className="flex flex-col items-center justify-center relative z-10 mx-2 md:mx-4">
                        {/* Competition Logo - WHITE CIRCLE FORCED */}
                        {nextMatch.competition_logo && (
                            <div className="mb-4 shadow-lg flex items-center justify-center transform hover:scale-105 transition-all duration-300"
                                style={{ backgroundColor: '#ffffff', borderRadius: '20%', padding: 'clamp(4px, 1.5vw, 8px)' }}>
                                <img
                                    src={nextMatch.competition_logo}
                                    alt="Competition Logo"
                                    width="60"
                                    height="60"
                                    className="object-contain"
                                    style={{ width: 'clamp(24px, 5vw, 50px)', height: 'clamp(24px, 5vw, 50px)' }}
                                />
                            </div>
                        )}
                        <span className="font-bold text-white leading-none select-none" style={{ fontSize: 'clamp(2rem, 6vw, 6rem)', textShadow: '0 4px 8px rgba(0,0,0,0.5)' }}>
                            - : -
                        </span>
                    </div>

                    {/* RIGHT SIDE: Away Team -> Grid with 2 columns [Logo | Name] - Logo in center */}
                    <div className="hidden md:grid" style={{ gridTemplateColumns: 'auto 1fr', gap: 'clamp(1rem, 3vw, 3rem)', alignItems: 'center', justifyContent: 'start' }}>
                        {/* Logo Column - ALWAYS stays in its column (CENTER) */}
                        <div className="shrink-0 transition-transform duration-500 hover:scale-110">
                            {nextMatch.away_logo ? (
                                <Image
                                    src={nextMatch.away_logo}
                                    alt={nextMatch.away_team}
                                    width={180}
                                    height={180}
                                    className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                                    style={{ width: 'clamp(50px, 12vw, 140px)', height: 'clamp(50px, 12vw, 140px)' }}
                                />
                            ) : (
                                <div className="bg-white/10 rounded-full flex items-center justify-center text-[10px]" style={{ width: 'clamp(50px, 12vw, 140px)', height: 'clamp(50px, 12vw, 140px)' }}>NO LOGO</div>
                            )}
                        </div>
                        {/* Name Column - ALWAYS stays in its column (OUTER) */}
                        <div className="flex justify-start items-center" style={{ overflow: 'visible' }}>
                            <h2 className="font-black uppercase text-white tracking-tighter leading-none text-left" style={{ fontSize: 'clamp(2rem, 4vw, 5rem)', whiteSpace: 'nowrap' }}>
                                {nextMatch.away_team}
                            </h2>
                        </div>
                    </div>

                    {/* Mobile: Away Team */}
                    <div className="md:hidden flex items-center gap-2 justify-start">
                        <div className="shrink-0 transition-transform duration-500 hover:scale-110">
                            {nextMatch.away_logo ? (
                                <Image
                                    src={nextMatch.away_logo}
                                    alt={nextMatch.away_team}
                                    width={180}
                                    height={180}
                                    className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                                    style={{ width: 'clamp(50px, 12vw, 140px)', height: 'clamp(50px, 12vw, 140px)' }}
                                />
                            ) : (
                                <div className="bg-white/10 rounded-full flex items-center justify-center text-[10px]" style={{ width: 'clamp(50px, 12vw, 140px)', height: 'clamp(50px, 12vw, 140px)' }}>NO LOGO</div>
                            )}
                        </div>
                        <div className="flex flex-col justify-center items-start">
                            <h2 className="font-black uppercase text-white tracking-tighter leading-none text-left" style={{ fontSize: '1rem', maxWidth: '100px', lineHeight: '1.2' }}>
                                {nextMatch.away_team}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* 3. DETAILS ROW */}
                <div className="mt-12 text-center space-y-2 px-4 w-full" style={{ marginBottom: '10px' }} data-aos="fade-up" data-aos-delay="200">
                    <p className="text-white font-black uppercase tracking-[0.2em] text-xs md:text-base drop-shadow-md leading-relaxed">
                        {formattedDate} | {formattedVenue}
                    </p>
                    <p className="text-white font-bold text-2xl md:text-6xl tracking-tight leading-none">
                        {formattedTime} WIB
                    </p>
                </div>

            </div>
        </section>
    );
}
