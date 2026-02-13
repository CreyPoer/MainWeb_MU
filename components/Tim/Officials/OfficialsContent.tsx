"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { FaMedal, FaClock } from "react-icons/fa";
import { FaFlag } from "react-icons/fa6";
import Flag from "react-world-flags";
import { useSearchParams } from "next/navigation";

type TeamKey = "utama" | "akademi";

type Official = {
  id: number;
  name: string;
  role: string;
  team: TeamKey;
  image: string;
  nationality: string;
  countryCode: string;
  license: string;
  joinYear: string;
  birthDate: string;
};

const OFFICIALS: Official[] = [
  {
    id: 1,
    name: "Fabiano Oliveira",
    role: "Head Coach",
    team: "utama",
    image:
      "https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=600",
    nationality: "Brasil",
    countryCode: "BR",
    license: "UEFA Pro License",
    joinYear: "2023",
    birthDate: "12 Mei 1978",
  },
  {
    id: 2,
    name: "Rudi Hartono",
    role: "Assistant Coach",
    team: "utama",
    image:
      "https://images.pexels.com/photos/995764/pexels-photo-995764.jpeg?auto=compress&cs=tinysrgb&w=600",
    nationality: "Indonesia",
    countryCode: "ID",
    license: "A AFC Coaching License",
    joinYear: "2022",
    birthDate: "3 Februari 1982",
  },
  {
    id: 3,
    name: "Andi Prasetyo",
    role: "Goalkeeper Coach",
    team: "utama",
    image:
      "https://images.pexels.com/photos/61135/pexels-photo-61135.jpeg?auto=compress&cs=tinysrgb&w=600",
    nationality: "Indonesia",
    countryCode: "ID",
    license: "B AFC Goalkeeper License",
    joinYear: "2021",
    birthDate: "9 Oktober 1980",
  },
  {
    id: 4,
    name: "M. Rizal Akbar",
    role: "Team Manager",
    team: "utama",
    image:
      "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=600",
    nationality: "Indonesia",
    countryCode: "ID",
    license: "Manajemen Klub Profesional",
    joinYear: "2020",
    birthDate: "27 Juli 1981",
  },
  {
    id: 5,
    name: "Ardiansyah Putra",
    role: "Head Coach U-20",
    team: "akademi",
    image:
      "https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=600",
    nationality: "Indonesia",
    countryCode: "ID",
    license: "A AFC Youth License",
    joinYear: "2021",
    birthDate: "15 Januari 1986",
  },
  {
    id: 6,
    name: "Junichi Sato",
    role: "Technical Advisor Akademi",
    team: "akademi",
    image:
      "https://images.pexels.com/photos/995764/pexels-photo-995764.jpeg?auto=compress&cs=tinysrgb&w=600",
    nationality: "Jepang",
    countryCode: "JP",
    license: "JFA / UEFA A License",
    joinYear: "2024",
    birthDate: "6 Juni 1979",
  },
];

const teamLabel: Record<TeamKey, string> = {
  utama: "Tim Utama",
  akademi: "Akademi",
};

export default function OfficialsContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTeam, setActiveTeam] = useState<TeamKey>(
    tabParam === "akademi" ? "akademi" : "utama"
  );
  const gridRef = useRef<HTMLDivElement | null>(null);

  const filteredOfficials = useMemo(
    () => OFFICIALS.filter((o) => o.team === activeTeam),
    [activeTeam]
  );

  // Animasi muncul saat card masuk viewport
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".official-card"));
    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    cards.forEach((card) => {
      card.classList.remove("in-view");
      observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, [filteredOfficials]);

  return (
    <section className="officials-section">
      <div className="officials-container">
        {/* Header + Tabs */}
        <div className="officials-header">
          <div className="officials-header-text">
            <p className="officials-eyebrow">Madura United FC</p>
            <h2 className="officials-title">Daftar Officials</h2>
            <p className="officials-subtitle">
              Tim pelatih dan staf profesional yang bekerja di balik layar
              untuk memastikan skuad Madura United FC tampil maksimal di setiap
              pertandingan.
            </p>
          </div>

          <div className="officials-tab-switcher">
            {(["utama", "akademi"] as TeamKey[]).map((key) => {
              const isActive = activeTeam === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveTeam(key)}
                  className={`officials-tab ${isActive ? "active" : ""}`}
                >
                  {teamLabel[key]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid Cards */}
        <div className="officials-grid" ref={gridRef}>
          {filteredOfficials.map((official) => {
            const isMainTeam = official.team === "utama";

            return (
              <article key={official.id} className="official-card">
                <div className="official-card-inner">
                  {/* Ribbon */}
                  <div className="official-ribbon">
                    <span className="official-ribbon-team">
                      {teamLabel[official.team]}
                    </span>
                    <span
                      className={`official-role-badge ${isMainTeam ? "utama" : "akademi"
                        }`}
                    >
                      {official.role}
                    </span>
                  </div>

                  {/* Foto potrait besar di tengah */}
                  <div className="official-photo-block">
                    <div className="official-photo-wrapper">
                      <Image
                        src={official.image}
                        alt={official.name}
                        fill
                        sizes="180px"
                        className="official-photo"
                      />
                      <div className="official-photo-gradient" />
                      <div className="official-photo-name">
                        <p className="official-name">{official.name}</p>
                      </div>
                    </div>
                  </div>

                  {/* Info bento */}
                  <div className="official-meta">
                    <div className="official-meta-item">
                      <div className="official-meta-label">
                        <FaMedal className="official-meta-icon medal" />
                        <span>Lisensi</span>
                      </div>
                      <p className="official-meta-text">{official.license}</p>
                    </div>

                    <div className="official-meta-item">
                      <div className="official-meta-label">
                        <FaFlag className="official-meta-icon flag" />
                        <span>Negara</span>
                      </div>
                      <div className="official-meta-flag-row">
                        <span className="official-flag-wrapper">
                          <Flag
                            code={official.countryCode}
                            alt={official.nationality}
                            style={{
                              width: 24,
                              height: 18,
                              display: "block",
                            }}
                          />
                        </span>
                        <p className="official-meta-text">
                          {official.nationality}
                        </p>
                      </div>
                    </div>

                    <div className="official-meta-item">
                      <div className="official-meta-label">
                        <FaClock className="official-meta-icon clock" />
                        <span>Bergabung</span>
                      </div>
                      <p className="official-meta-year">{official.joinYear}</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="official-footer">
                    <span className="official-footer-pill">
                      Official {teamLabel[official.team]}
                    </span>
                    <div className="official-footer-birth">
                      <span className="official-footer-birth-label">
                        Tanggal Lahir
                      </span>
                      <span className="official-footer-birth-value">
                        {official.birthDate}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .officials-section {
          background: radial-gradient(circle at top, #fee2e2 0, #f9fafb 40%, #e5e7eb 100%);
          padding: 3.5rem 1rem 4.5rem;
        }

        .officials-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .officials-header {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .officials-header {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        .officials-eyebrow {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: #b91c1c;
        }

        .officials-title {
          margin-top: 0.35rem;
          font-size: 1.9rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: #111827;
        }

        @media (min-width: 768px) {
          .officials-title {
            font-size: 2.2rem;
          }
        }

        .officials-subtitle {
          margin-top: 0.5rem;
          max-width: 36rem;
          font-size: 0.9rem;
          color: #4b5563;
        }

        .officials-tab-switcher {
          display: inline-flex;
          align-self: flex-start;
          padding: 0.25rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 18px 40px rgba(148, 163, 184, 0.4);
          border: 1px solid rgba(148, 163, 184, 0.6);
          backdrop-filter: blur(18px);
        }

        .officials-tab {
          border: none;
          border-radius: 999px;
          padding: 0.55rem 1.5rem;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          cursor: pointer;
          color: #4b5563;
          background: transparent;
          transition: all 0.25s ease;
        }

        .officials-tab:hover {
          color: #111827;
        }

        .officials-tab.active {
          background: linear-gradient(135deg, #ef4444, #b91c1c);
          color: #f9fafb;
          box-shadow: 0 14px 32px rgba(220, 38, 38, 0.45);
        }

        .officials-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          grid-auto-rows: 1fr;
        }

        @media (min-width: 640px) {
          .officials-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (min-width: 1024px) {
          .officials-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        .official-card {
          position: relative;
          border-radius: 24px;
          padding: 1px;
          background: linear-gradient(135deg, #1f2937, #991b1b);
          box-shadow: 0 26px 70px rgba(0, 0, 0, 0.8);
          overflow: hidden;
          height: 100%;
          display: flex;
          opacity: 0;
          transform: translateY(24px) scale(0.98);
          transition:
            transform 0.5s cubic-bezier(0.22, 0.8, 0.32, 1),
            opacity 0.5s ease,
            box-shadow 0.28s ease,
            background 0.28s ease;
        }

        .official-card.in-view {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .official-card:nth-child(1) {
          transition-delay: 0.02s;
        }

        .official-card:nth-child(2) {
          transition-delay: 0.06s;
        }

        .official-card:nth-child(3) {
          transition-delay: 0.1s;
        }

        .official-card:nth-child(4) {
          transition-delay: 0.14s;
        }

        .official-card:nth-child(5) {
          transition-delay: 0.18s;
        }

        .official-card:nth-child(6) {
          transition-delay: 0.22s;
        }

        .official-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 30px 90px rgba(248, 113, 113, 0.55);
          background: linear-gradient(135deg, #dc2626, #7f1d1d);
        }

        .official-card-inner {
          position: relative;
          border-radius: 22px;
          background: radial-gradient(circle at top left, rgba(248, 113, 113, 0.26), transparent 45%),
            rgba(15, 23, 42, 0.96);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .official-ribbon {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 1.1rem;
          background: linear-gradient(90deg, rgba(15, 23, 42, 0.95), rgba(31, 41, 55, 0.95));
          border-bottom: 1px solid rgba(148, 163, 184, 0.4);
        }

        .official-ribbon-team {
          font-size: 0.6rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: #f9fafb;
        }

        .official-role-badge {
          font-size: 0.6rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          padding: 0.25rem 0.9rem;
          border-radius: 999px;
          color: #f9fafb;
          box-shadow: 0 10px 26px rgba(0, 0, 0, 0.65);
        }

        .official-role-badge.utama {
          background: linear-gradient(135deg, #ef4444, #b91c1c);
        }

        .official-role-badge.akademi {
          background: linear-gradient(135deg, #6b7280, #374151);
        }

        .official-photo-block {
          padding: 0.95rem 1.1rem 0.45rem;
        }

        .official-photo-wrapper {
          position: relative;
          width: 100%;
          height: 60vh;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(15, 23, 42, 0.9);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.75);
          background: #020617;
        }

        .official-photo {
          object-fit: cover;
          object-position: center;
        }

        .official-photo-gradient {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to bottom, rgba(0, 0, 0, 0.78), transparent 40%, rgba(220, 38, 38, 0.8));
        }

        .official-photo-name {
          position: absolute;
          bottom: 0.95rem;
          left: 0.9rem;
          right: 0.9rem;
          text-align: center;
        }

        .official-name {
          font-size: 1.1rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #f9fafb;
          text-shadow: 0 4px 16px rgba(0, 0, 0, 0.95);
        }

        .official-meta {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.75rem;
          padding: 0.9rem 1.1rem 0.8rem;
          font-size: 0.75rem;
          color: #e5e7eb;
        }

        .official-meta-item {
          border-radius: 18px;
          padding: 0.65rem 0.65rem 0.6rem;
          background: rgba(15, 23, 42, 0.96);
          border: 1px solid rgba(148, 163, 184, 0.5);
          box-shadow: inset 0 0 18px rgba(0, 0, 0, 0.55);
        }

        .official-meta-label {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #d1d5db;
        }

        .official-meta-icon {
          width: 0.9rem;
          height: 0.9rem;
        }

        .official-meta-icon.medal {
          color: #facc15;
        }

        .official-meta-icon.flag {
          color: #38bdf8;
        }

        .official-meta-icon.clock {
          color: #34d399;
        }

        .official-meta-text {
          margin-top: 0.3rem;
          font-size: 0.7rem;
        }

        .official-meta-flag-row {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          margin-top: 0.35rem;
        }

        .official-flag-wrapper {
          display: inline-flex;
          padding: 0.08rem;
          background: rgba(15, 23, 42, 0.9);
        }

        .official-meta-year {
          text-align: center;
          margin-top: 0.3rem;
          font-size: 1.8rem;
          font-weight: 700;
          color: #fef2f2;
        }

        .official-meta-caption {
          margin-top: 0.05rem;
          font-size: 0.64rem;
          color: #9ca3af;
        }

        .official-footer {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding: 0.6rem 1.1rem 0.85rem;
          border-top: 1px solid rgba(148, 163, 184, 0.5);
          margin-top: 0.1rem;
        }

        .official-footer-pill {
          display: inline-flex;
          align-items: center;
          padding: 0.35rem 0.9rem;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(249, 250, 251, 0.16);
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #e5e7eb;
        }

        .official-footer-birth {
          text-align: right;
          font-size: 0.7rem;
          color: #9ca3af;
        }

        .official-footer-birth-label {
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          color: #6b7280;
        }

        .official-footer-birth-value {
          display: block;
          margin-top: 0.18rem;
          color: #e5e7eb;
        }

        @media (max-width: 640px) {
          .officials-section {
            padding-top: 2.5rem;
          }

          .officials-title {
            font-size: 1.7rem;
          }

          .official-meta {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </section>
  );
}
