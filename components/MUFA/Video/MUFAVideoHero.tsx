"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import styles from "../HomePage/MUFAHome.module.css";

export default function MUFAVideoHero() {
    const { t } = useLanguage();
    return (
        <section className="pt-6 md:pt-10">
            <div className={styles.mufaContainer}>
                <div className={styles.mufaHeroSlider}>
                    <div className={`${styles.mufaHeroFrame} relative`}>
                        <Image
                            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1600"
                            alt="Video Galeri Madura United Football Academy"
                            fill
                            priority
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
                        <div className="absolute inset-0 flex items-center justify-center px-6">
                            <div
                                className="text-center max-w-2xl"
                                data-aos="fade-up"
                                data-aos-delay="100"
                            >
                                <p className="text-xs md:text-sm font-semibold tracking-[0.32em] uppercase text-red-400 mb-3">
                                    {t('mufa.video_page.hero_eyebrow')}
                                </p>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white uppercase leading-tight mb-4">
                                    {t('mufa.video_page.hero_title')}
                                    <span className="block text-red-400">{t('mufa.video_page.hero_title_highlight')}</span>
                                </h1>
                                <p className="text-sm md:text-base text-slate-200/80 max-w-xl mx-auto">
                                    {t('mufa.video_page.hero_desc')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
