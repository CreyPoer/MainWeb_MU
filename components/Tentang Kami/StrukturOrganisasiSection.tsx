"use client";

import React, { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import styles from "./StrukturOrganisasiSection.module.css";

type OrgPerson = {
  id: number;
  name: string;
  position: string;
  sequence: 1 | 2 | 4;
  photo: string;
};

const SECTION_AOS_DURATION_MS = 900;
const AFTER_SECTION_DELAY_MS = SECTION_AOS_DURATION_MS + 150;
const CARD_STAGGER_MS = 120;

type OrgCardStyleVars = React.CSSProperties & {
  "--mu-org-delay"?: string;
};

const ORGANIZATION_DATA: OrgPerson[] = [
  {
    id: 1,
    name: "Achsanul Qosasi",
    position: "Presiden Klub",
    sequence: 1,
    photo: "/officials.jpg",
  },
  {
    id: 2,
    name: "Zia Ulhaq Abdurrahim",
    position: "Komisaris",
    sequence: 2,
    photo: "/officials.jpg",
  },
  {
    id: 3,
    name: "Annisa Zhafarina Qosasi",
    position: "Direktur",
    sequence: 2,
    photo: "/officials.jpg",
  },
  {
    id: 4,
    name: "Ferdiansyah Alifurrahman",
    position: "Head of Media",
    sequence: 4,
    photo: "/officials.jpg",
  },
  {
    id: 5,
    name: "Umar Wachdin",
    position: "Manager",
    sequence: 4,
    photo: "/officials.jpg",
  },
  {
    id: 6,
    name: "Hendra Widodo Cahyono P",
    position: "Assisten Manajer",
    sequence: 4,
    photo: "/officials.jpg",
  },
];

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
      <div
        className={styles.photo}
      >
        <Image
          src={person.photo}
          alt={`${person.name} - ${person.position}`}
          fill
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

      <span className={styles.srOnly}>Tier {person.sequence}</span>
    </article>
  );
}

export default function StrukturOrganisasiSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

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
  }, []);

  const { tier1, tier2, tier3 } = useMemo(() => {
    const tier1 = ORGANIZATION_DATA.filter((p) => p.sequence === 1);
    const tier2 = ORGANIZATION_DATA.filter((p) => p.sequence === 2);
    const tier3 = ORGANIZATION_DATA.filter((p) => p.sequence === 4);
    return { tier1, tier2, tier3 };
  }, []);

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
          {/* Tier 1 */}
          <div className={styles.tier1Wrap}>
            <div className={styles.tier1Inner}>
              {tier1.map((person, idx) => (
                <ProfileCard
                  key={person.id}
                  person={person}
                  variant="sm"
                  animDelayMs={AFTER_SECTION_DELAY_MS + idx * CARD_STAGGER_MS}
                />
              ))}
            </div>
          </div>

          {/* Tier 2 */}
          <div className={styles.gridTier2}>
            {tier2.map((person, idx) => (
              <ProfileCard
                key={person.id}
                person={person}
                variant="sm"
                animDelayMs={AFTER_SECTION_DELAY_MS + (tier1.length + idx) * CARD_STAGGER_MS}
              />
            ))}
          </div>

          {/* Tier 3 */}
          <div className={styles.gridTier3}>
            {tier3.map((person, idx) => (
              <ProfileCard
                key={person.id}
                person={person}
                variant="sm"
                animDelayMs={AFTER_SECTION_DELAY_MS + (tier1.length + tier2.length + idx) * CARD_STAGGER_MS}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
