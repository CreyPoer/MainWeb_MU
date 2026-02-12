"use client";

import React from "react";
import { FaRoute, FaUserGraduate, FaMedal } from "react-icons/fa";
import styles from "./MUFAHome.module.css";

const PROGRAMS = [
  {
    age: "U-16",
    badge: "Junior Development",
    icon: <FaUserGraduate size={22} />,
    title: "MUFA Junior Development U-16",
    description:
      "Fokus pada penguasaan teknik dasar, karakter, dan pemahaman taktik sederhana sebagai fondasi pemain modern.",
  },
  {
    age: "U-18",
    badge: "Youth Elite",
    icon: <FaRoute size={22} />,
    title: "MUFA Youth Elite U-18",
    description:
      "Pendalaman taktik, intensitas latihan tinggi, dan pembiasaan pada ritme kompetisi nasional tingkat elite.",
  },
  {
    age: "U-20",
    badge: "Pro Transition",
    icon: <FaMedal size={22} />,
    title: "MUFA Pro Transition U-20",
    description:
      "Mempersiapkan pemain untuk transisi ke level profesional, termasuk EPA, Liga 2, dan promosi ke tim utama.",
  },
];

export default function MUFAProgramSection() {
  return (
    <section id="program" className={styles.mufaSection}>
      <div className={styles.mufaContainer}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-xs md:text-sm font-semibold tracking-[0.32em] text-red-400 uppercase mb-2">
              The Pathway to Pro
            </p>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white uppercase leading-tight">
              Program Pembinaan <span className="text-red-400">Berjenjang</span>
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-300 max-w-xl">
              Tiga level program yang saling terhubung, dirancang untuk mengantar pemain muda menuju jenjang
              profesional bersama Madura United FC.
            </p>
          </div>
        </div>

        <div className={styles.mufaProgramGrid}>
          {PROGRAMS.map((program) => (
            <article key={program.age} className={styles.mufaProgramCard}>
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
                  Pathway
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
              Setiap peserta akan melalui proses seleksi, program latihan terukur, dan monitoring perkembangan secara
              berkala oleh tim pelatih MUFA.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-amber-400 text-black text-xs md:text-sm font-bold tracking-[0.22em] uppercase shadow-lg shadow-amber-500/40 hover:bg-amber-300 transition"
            >
              Daftar Sekarang
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-slate-300/60 text-slate-50 text-xs md:text-sm font-semibold tracking-[0.18em] uppercase hover:bg-white/5 transition"
            >
              Download Guidebook
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
