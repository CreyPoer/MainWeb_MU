'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from './FlipCountdown.module.css';

// The animated card. We use key-based remounting to trigger CSS animations.
const FlipCard = ({ previous, current }: { previous: number | string; current: number | string }) => {
    return (
        <div className={styles.digit_cont}>
            {/* Static Bottom (Old Digit) */}
            <div className={styles.last_placeholder}>
                <span>{previous}</span>
            </div>

            {/* Static Top (New Digit) */}
            <div className={styles.new_placeholder}>
                <span>{current}</span>
            </div>

            {/* Animation: Old Top rotating down */}
            <div className={styles.last_rotate}>
                <span>{previous}</span>
            </div>

            {/* Animation: New Bottom rotating up */}
            <div className={styles.new_rotate}>
                <div className={styles.rotated}>
                    <span>{current}</span>
                </div>
            </div>
        </div>
    );
};

// Controls the state and passes previous/current to FlipCard
const FlipUnit = ({ digit }: { digit: number }) => {
    // We track the *previous* digit relative to the *last render*.
    // However, to force a remount of FlipCard with a new key, we need to know when 'digit' changes.
    const [display, setDisplay] = useState({ current: digit, previous: digit });

    // Store previous digit in ref to access it during updates
    const prevDigitRef = useRef(digit);

    useEffect(() => {
        if (digit !== display.current) {
            // New digit arrived. Update state to trigger animation.
            setDisplay({
                current: digit,
                previous: prevDigitRef.current
            });
            prevDigitRef.current = digit;
        }
    }, [digit, display.current]);

    // key={display.current} forces React to destroy the old FlipCard and create a new one,
    // thereby restarting the CSS animations defined in .last_rotate/.new_rotate
    return (
        <FlipCard
            key={`${display.current}-${display.previous}`} // Unique key ensures remount
            current={display.current}
            previous={display.previous}
        />
    );
};

// Group Component
const FlipGroup = ({ value, unit }: { value: number; unit: string }) => {
    const padded = String(value).padStart(2, '0');
    const digit1 = parseInt(padded[0]);
    const digit2 = parseInt(padded[1]);

    return (
        <div className={styles.interval_cont}>
            <div className={styles.digits}>
                <FlipUnit digit={digit1} />
                <FlipUnit digit={digit2} />
            </div>
            <div className={styles.description}>{unit}</div>
        </div>
    );
};

interface FlipCountdownProps {
    targetDate: string;
}

export default function FlipCountdown({ targetDate }: FlipCountdownProps) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = new Date(targetDate).getTime() - new Date().getTime();
            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                };
            }
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className={styles.wrapper}>
            <FlipGroup value={timeLeft.days} unit="Hari" />
            <div className={styles.separator}>:</div>
            <FlipGroup value={timeLeft.hours} unit="Jam" />
            <div className={styles.separator}>:</div>
            <FlipGroup value={timeLeft.minutes} unit="Menit" />
            <div className={styles.separator}>:</div>
            <FlipGroup value={timeLeft.seconds} unit="Detik" />
        </div>
    );
}
