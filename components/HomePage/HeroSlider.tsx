'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Slider {
    id: number;
    name: string;
    subtitle?: string;
    image: string;
    link: string | null;
    status: number;
}

export default function HeroSlider() {
    const [sliders, setSliders] = useState<Slider[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        fetchSliders();
    }, []);

    useEffect(() => {
        if (sliders.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliders.length);
            setAnimationKey((prev) => prev + 1); // Force animation restart
        }, 5000);

        return () => clearInterval(interval);
    }, [sliders]);

    const fetchSliders = async () => {
        try {
            const response = await fetch('/api/slider');
            const data = await response.json();
            setSliders(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching sliders:', error);
            setIsLoading(false);
        }
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        setAnimationKey((prev) => prev + 1); // Force animation restart
    };

    if (isLoading) {
        return (
            <div className="hero-slider-loading">
                <div className="spinner"></div>
            </div>
        );
    }

    // Fallback hero when no sliders available
    if (sliders.length === 0) {
        return (
            <div className="hero-slider">
                <div className="hero-slide active" style={{
                    backgroundImage: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
                }}>
                    <div className="hero-overlay"></div>
                    <div className="hero-content">
                        <h1 className="hero-title">
                            <span className="highlight">MADURA</span> <span className="highlight">UNITED</span> FC
                        </h1>
                        <p style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '2rem' }}>
                            Sape Kerrab Madura United!
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="hero-slider">
            {sliders.map((slider, index) => (
                <div
                    key={`${slider.id}-${index === currentSlide ? animationKey : 'inactive'}`}
                    className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                    style={{
                        backgroundImage: `url(${slider.image.startsWith('http') ? slider.image : `https://admin-mu.maduraunitedfc.com/storage/${slider.image}`})`
                    }}
                >
                    <div className="hero-overlay"></div>
                    <div className="hero-content">
                        <h1 className="hero-title">
                            {slider.name.split(' ').map((word, i) => {
                                // Highlight specific words with red background
                                const highlightWords = ['MADURA', 'UNITED','BERSATU','SAPE','KERRAB'];
                                if (highlightWords.some(hw => word.toUpperCase().includes(hw))) {
                                    return (
                                        <span key={i} className="highlight">
                                            {word}{' '}
                                        </span>
                                    );
                                }
                                return <span key={i}>{word} </span>;
                            })}
                        </h1>
                        {slider.subtitle && (
                            <p className="hero-subtitle">
                                {slider.subtitle}
                            </p>
                        )}
                        {slider.link && (
                            <Link href={slider.link} className="hero-cta">
                                READ MORE
                                <span className="arrow">→</span>
                            </Link>
                        )}
                    </div>
                </div>
            ))}

            {/* Slide Indicators */}
            <div className="slide-indicators">
                {sliders.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`indicator ${index === currentSlide ? 'active' : ''}`}
                    >
                        {String(index + 1).padStart(2, '0')}
                    </button>
                ))}
            </div>
        </div>
    );
}
