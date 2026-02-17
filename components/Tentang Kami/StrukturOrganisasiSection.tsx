"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import styles from "./StrukturOrganisasiSection.module.css";

type OrgPerson = {
  id: number;
  name: string;
  position: string;
  sequence: number;
  photo: string;
};

const SECTION_AOS_DURATION_MS = 900;
const AFTER_SECTION_DELAY_MS = SECTION_AOS_DURATION_MS + 150;
const CARD_STAGGER_MS = 120;

type OrgCardStyleVars = React.CSSProperties & {
  "--mu-org-delay"?: string;
};

function ProfileCard({
  person,
  variant,
  animDelayMs,
}: {
  person: OrgPerson;
  variant: "lg" | "md" | "sm";
  animDelayMs?: number;
}) {
  const cardSize = variant === "lg" ? styles.cardLg : variant === "md" ? styles.cardMd : styles.cardSm;
  const nameSize = variant === "lg" ? styles.nameLg : variant === "md" ? styles.nameMd : styles.nameSm;
  const roleSize = variant === "lg" ? styles.roleLg : variant === "md" ? styles.roleMd : styles.roleSm;

  return (
    <article
      className={`${styles.card} ${cardSize}`}
      style={
        animDelayMs === undefined
          ? undefined
          : ({ "--mu-org-delay": `${animDelayMs}ms` } as OrgCardStyleVars)
      }
    >
      <div className={styles.cardInner}>
        {/* Front Face */}
        <div className={styles.cardFront}>
          <div className={styles.photo}>
            <Image
              src={person.photo}
              alt={`${person.name} - ${person.position}`}
              fill
              unoptimized
              className="object-cover"
              sizes={
                variant === "lg"
                  ? "(min-width: 1024px) 220px, 60vw"
                  : variant === "md"
                    ? "(min-width: 1024px) 200px, 50vw"
                    : "(min-width: 1024px) 180px, 45vw"
              }
              priority={false}
            />
          </div>

          <p className={`${styles.name} ${nameSize}`}>{person.name}</p>
          <p className={`${styles.role} ${roleSize}`}>{person.position}</p>
        </div>

        {/* Back Face */}
        <div className={styles.cardBack}>
          <div className={styles.backLogo}>
            <Image
              src="/logo.png"
              alt="Madura United FC"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
          <p className={styles.backPosition}>{person.position}</p>
        </div>
      </div>

      <span className={styles.srOnly}>Tier {person.sequence}</span>
    </article>
  );
}

export default function StrukturOrganisasiSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [orgData, setOrgData] = useState<OrgPerson[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch organization structure data from API
  useEffect(() => {
    const fetchStructures = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://admin-mu.maduraunitedfc.id/api/v2/structures");
        if (!res.ok) throw new Error("Failed to fetch structures");
        const data = await res.json();

        const mapped: OrgPerson[] = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          position: item.position,
          sequence: parseInt(item.sequence, 10),
          photo: item.photo
            ? `https://admin-mu.maduraunitedfc.id/storage/${item.photo}`
            : "/officials.jpg",
        }));

        setOrgData(mapped);
      } catch (error) {
        console.error("Error fetching organization structures:", error);
        setOrgData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStructures();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || loading) return;

    const rect = el.getBoundingClientRect();
    const initiallyInView = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
    el.classList.add(styles.isReady);

    if (initiallyInView) {
      el.classList.add(styles.inView);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.inView);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loading]);

  // Group by unique sequence values (ascending) for pyramid layout
  const tiers = useMemo(() => {
    if (orgData.length === 0) return [];

    const sequenceSet = [...new Set(orgData.map((p) => p.sequence))].sort((a, b) => a - b);
    return sequenceSet.map((seq) => orgData.filter((p) => p.sequence === seq));
  }, [orgData]);

  // Calculate cumulative card count for stagger animation delay
  const getCumulativeCount = (tierIndex: number) => {
    let count = 0;
    for (let i = 0; i < tierIndex; i++) {
      count += tiers[i].length;
    }
    return count;
  };

  // Pick grid style based on tier index (0 = top of pyramid)
  const getTierGridClass = (tierIndex: number) => {
    if (tierIndex === 0) return null; // tier1 uses special wrap
    if (tierIndex === 1) return styles.gridTier2;
    return styles.gridTier3;
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
    >
      <div className={styles.shell}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Tentang Kami</p>
          <h2 className={styles.title}>Struktur Organisasi</h2>
          <p className={styles.subtitle}>
            Susunan kepengurusan Madura United FC ditampilkan dalam format bertingkat (piramida) berdasarkan jabatan.
          </p>
        </header>

        <div className={styles.body}>
          {loading && (
            <p style={{ textAlign: "center", color: "#6b7280", padding: "2rem 0" }}>
              Memuat data struktur organisasi...
            </p>
          )}

          {!loading && orgData.length === 0 && (
            <p style={{ textAlign: "center", color: "#6b7280", padding: "2rem 0" }}>
              Tidak ada data struktur organisasi.
            </p>
          )}

          {!loading && tiers.map((tierPersons, tierIdx) => {
            const cumulativeCount = getCumulativeCount(tierIdx);

            // First tier (smallest sequence) — centered single / few cards
            if (tierIdx === 0) {
              return (
                <div key={tierIdx} className={styles.tier1Wrap}>
                  <div className={styles.tier1Inner}>
                    {tierPersons.map((person, idx) => (
                      <ProfileCard
                        key={person.id}
                        person={person}
                        variant="sm"
                        animDelayMs={AFTER_SECTION_DELAY_MS + (cumulativeCount + idx) * CARD_STAGGER_MS}
                      />
                    ))}
                  </div>
                </div>
              );
            }

            // Remaining tiers
            const gridClass = getTierGridClass(tierIdx);
            return (
              <div key={tierIdx} className={gridClass || undefined}>
                {tierPersons.map((person, idx) => (
                  <ProfileCard
                    key={person.id}
                    person={person}
                    variant="sm"
                    animDelayMs={AFTER_SECTION_DELAY_MS + (cumulativeCount + idx) * CARD_STAGGER_MS}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
