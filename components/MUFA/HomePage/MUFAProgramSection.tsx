"use client";

import React from "react";
import { FaRoute, FaUserGraduate, FaMedal } from "react-icons/fa";
import styles from "./MUFAHome.module.css";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MUFAProgramSection() {
  const { t } = useLanguage();

  const PROGRAMS = [
    {
      age: "U-16",
      badge: t('mufa.program.junior_badge'),
      icon: <FaUserGraduate size={22} />,
      title: t('mufa.program.junior_title'),
      description: t('mufa.program.junior_desc'),
    },
    {
      age: "U-18",
      badge: t('mufa.program.youth_badge'),
      icon: <FaRoute size={22} />,
      title: t('mufa.program.youth_title'),
      description: t('mufa.program.youth_desc'),
    },
    {
      age: "U-20",
      badge: t('mufa.program.pro_badge'),
      icon: <FaMedal size={22} />,
      title: t('mufa.program.pro_title'),
      description: t('mufa.program.pro_desc'),
    },
  ];

  return (
    <section id="program" className={styles.mufaSection}>
      <div className={styles.mufaContainer}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-xs md:text-sm font-semibold tracking-[0.32em] text-red-400 uppercase mb-2">
              {t('mufa.program.eyebrow')}
            </p>
            <h2
              data-aos="fade-up"
              className="text-2xl md:text-4xl font-extrabold text-white uppercase leading-tight"
            >
              {t('mufa.program.title_main')} <span className="text-red-400">{t('mufa.program.title_highlight')}</span>
            </h2>
            <p
              data-aos="fade-up"
              data-aos-delay="100"
              className="mt-3 text-sm md:text-base text-slate-300 max-w-xl"
            >
              {t('mufa.program.subtitle')}
            </p>
          </div>
        </div>

        <div className={styles.mufaProgramGrid}>
          {PROGRAMS.map((program, index) => (
            <article
              key={program.age}
              className={styles.mufaProgramCard}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-red-500/25 border border-red-400/50 flex items-center justify-center text-amber-300">
                    {program.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[0.65rem] tracking-[0.22em] uppercase text-slate-300/80 font-semibold">
                      {program.badge}
                    </span>
                    <span className="text-lg font-bold text-white">{program.age}</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-[0.7rem] font-semibold tracking-[0.16em] uppercase bg-black/40 border border-amber-300/50 text-amber-200">
                  {t('mufa.program.pathway')}
                </span>
              </div>

              <div className="h-px bg-gradient-to-r from-red-500/60 via-amber-300/40 to-transparent mt-4 mb-3" />

              <h3 className="text-base md:text-lg font-bold text-white mb-2">
                {program.title}
              </h3>
              <p className="text-xs md:text-sm text-slate-200/90 leading-relaxed">
                {program.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4 items-center justify-between">
          <div className="max-w-xl text-xs md:text-sm text-slate-300">
            <p>
              {t('mufa.program.monitoring_note')}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSe_Gn9b1DIkdMei2MMc2LWTq9SRD6QyKsdZlovBjNAsOXmXgw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-amber-400 text-black text-xs md:text-sm font-bold tracking-[0.22em] uppercase shadow-lg shadow-amber-500/40 hover:bg-amber-300 transition"
            >
              {t('mufa.program.register_now')}
            </a>
            <a
              href="https://drive.google.com/file/d/145qqfm1E9BV3xuQcSpBN50KbqLFjoj1m/view"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-slate-300/60 text-slate-50 text-xs md:text-sm font-semibold tracking-[0.18em] uppercase hover:bg-white/5 transition"
            >
              {t('mufa.program.download_guidebook')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
