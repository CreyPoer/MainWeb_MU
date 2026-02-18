"use client";

import React, { useState } from "react";
import styles from "./MUFAHome.module.css";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MUFAFacilitiesSection() {
  const { t } = useLanguage();
  const [active, setActive] = useState<"homebase" | "mutg" | "equipment">("homebase");

  const FACILITY_DATA: Record<
    "homebase" | "mutg" | "equipment",
    { name: string; subtitle: string; items: string[]; image: string }
  > = {
    homebase: {
      name: t('mufa.facilities.homebase_label'),
      subtitle: t('mufa.facilities.homebase_subtitle'),
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1400",
      items: [
        "Area Full Wifi",
        "Guest Room",
        "Tactical Room",
        "Bedroom Full AC",
        "Kitchen",
        "Dining Room",
        "Praying Room",
        "Laundry Room",
        "Washing Room",
        "Toilet",
        "Bus Transportation",
        "Motorcycle Transportation",
      ],
    },
    mutg: {
      name: t('mufa.facilities.mutg_label'),
      subtitle: t('mufa.facilities.mutg_subtitle'),
      image:
        "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&q=80&w=1400",
      items: ["Training Centre", "Fitness Centre"],
    },
    equipment: {
      name: t('mufa.facilities.equipment_label'),
      subtitle: t('mufa.facilities.equipment_subtitle'),
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1400",
      items: [
        "Professional Coach",
        "Master Cook",
        "CBF Curriculum",
        "Health Insurance (BPJS)",
        "Skill-based Formal School",
        "Extra Soft Skill English",
        "Opportunity to compete in Elite Pro Academy (EPA)",
        "Opportunity to be promoted to Senior Team Madura United FC (MUFC)",
        "Opportunity to compete in Liga 2 & Liga 3",
      ],
    },
  };

  const current = FACILITY_DATA[active];

  const selectorCards: { key: typeof active; label: string; image: string }[] = [
    { key: "homebase", label: t('mufa.facilities.homebase_label'), image: FACILITY_DATA.homebase.image },
    { key: "mutg", label: t('mufa.facilities.mutg_label'), image: FACILITY_DATA.mutg.image },
    { key: "equipment", label: t('mufa.facilities.equipment_label'), image: FACILITY_DATA.equipment.image },
  ];

  return (
    <section id="fasilitas" className={styles.mufaSection}>
      <div className={styles.mufaContainer}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-xs md:text-sm font-semibold tracking-[0.32em] text-red-400 uppercase mb-2">
              {t('mufa.facilities.eyebrow')}
            </p>
            <h2
              data-aos="fade-up"
              className="text-2xl md:text-4xl font-extrabold text-white uppercase leading-tight"
            >
              {t('mufa.facilities.title_main')} <span className="text-red-400">{t('mufa.facilities.title_highlight')}</span> {t('mufa.facilities.title_suffix')}
            </h2>
          </div>

        </div>

        <div className={styles.mufaFacilitiesShell}>
          {/* Left selector */}
          <div className="flex flex-col gap-4">
            {selectorCards.map((card) => (
              <button
                key={card.key}
                type="button"
                className={`${styles.mufaFacilitySelectorCard} ${active === card.key ? styles.mufaFacilitySelectorCardActive : ""
                  }`}
                onClick={() => setActive(card.key)}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${card.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "grayscale(40%)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/5" />
                {active === card.key && (
                  <div className="absolute inset-0 bg-gradient-to-r from-red-700/55 via-red-600/35 to-transparent" />
                )}

                <div className="relative z-10 flex items-center justify-between h-full px-5 py-4">
                  <div className="flex flex-col gap-1 text-left">
                    <span className="text-[0.65rem] tracking-[0.18em] uppercase text-slate-200/80">
                      {card.key === "homebase" && t('mufa.facilities.homebase_cat')}
                      {card.key === "mutg" && t('mufa.facilities.mutg_cat')}
                      {card.key === "equipment" && t('mufa.facilities.equipment_cat')}
                    </span>
                    <span className="text-lg md:text-xl font-bold text-white">{card.label}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right detail */}
          <div
            className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-black border border-slate-700/60 p-6 md:p-8 flex flex-col gap-4"
            data-aos="fade-left"
          >
            <div className="flex flex-col gap-2">
              <span className="text-xs tracking-[0.26em] uppercase text-red-300 font-semibold">
                {active === "homebase" && t('mufa.facilities.homebase_label')}
                {active === "mutg" && t('mufa.facilities.mutg_full')}
                {active === "equipment" && t('mufa.facilities.equipment_full')}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white">{current.name}</h3>
              <p className="text-sm md:text-base text-slate-200/90 max-w-xl">{current.subtitle}</p>
            </div>

            <div className="h-px bg-gradient-to-r from-red-500/70 via-amber-200/50 to-transparent" />

            <div className={styles.mufaFacilityBadges}>
              {current.items.map((item) => (
                <span key={item} className={styles.mufaFacilityBadge}>
                  {item}
                </span>
              ))}
            </div>

            {active === "equipment" && (
              <p className="mt-3 text-[11px] md:text-xs text-slate-400 italic">
                {t('mufa.facilities.equipment_note')}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
