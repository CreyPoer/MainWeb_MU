import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaPlay, FaTimes, FaArrowRight } from "react-icons/fa";
import styles from "./MUFAHome.module.css";
import { useLanguage } from "@/contexts/LanguageContext";

interface Video {
  id: string;
  title: string;
  date: string;
  duration: string;
}

export default function MUFAVideoSection() {
  const { t, lang } = useLanguage();
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/videos?channel=MUFA");
        const data = await res.json();
        if (Array.isArray(data)) {
          setVideos(data);
        }
      } catch (error) {
        console.error("Failed to fetch MUFA videos", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (isLoading) {
    return <div className="py-20 text-center text-white">{t('mufa.hero.loading')}</div>;
  }

  // If no videos, do we hide or show empty? 
  // Let's show empty state or nothing
  if (videos.length === 0) {
    return null;
  }

  return (
    <section id="video" className={styles.mufaSection}>
      <div className={styles.mufaContainer}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div>
            <p className="text-xs md:text-sm font-semibold tracking-[0.32em] text-red-400 uppercase mb-2">
              {t('mufa.video.eyebrow')}
            </p>
            <h2
              data-aos="fade-up"
              className="text-2xl md:text-4xl font-extrabold text-white uppercase leading-tight"
            >
              {t('mufa.video.title_main')} <span className="text-red-400">{t('mufa.video.title_highlight')}</span> {t('mufa.video.title_suffix')}
            </h2>
          </div>
          <Link
            href={`/${lang}/mufa/video`}
            data-aos="fade-left"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-[0.18em] uppercase text-slate-100/90 hover:text-amber-300"
            onClick={e => e.stopPropagation()}
          >
            {t('mufa.video.view_all')} <FaArrowRight size={12} />
          </Link>
        </div>

        <div className="grid gap-4 md:gap-6 md:grid-cols-3 md:auto-rows-[180px] lg:auto-rows-[220px]">
          {videos.map((video, idx) => {
            const isMain = idx === 0;
            const isHovered = hovered === video.id;
            return (
              <button
                key={video.id}
                type="button"
                onClick={() => setActive(video.id)}
                onMouseEnter={() => setHovered(video.id)}
                onMouseLeave={() => setHovered(null)}
                className={`relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-900/80 group ${isMain
                  ? "min-h-[220px] md:row-span-2 md:col-span-2"
                  : "min-h-[160px] md:col-span-1 md:row-span-1"
                  }`}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="absolute inset-0">
                  {isHovered ? (
                    <iframe
                      className="w-full h-full object-cover pointer-events-none"
                      src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  ) : (
                    <>
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    </>
                  )}
                </div>
                {!isHovered && (
                  <div className="relative z-10 flex flex-col justify-between h-full p-4 md:p-6">
                    <div className="flex items-center justify-between text-[11px] md:text-xs text-slate-200/90">
                      <span className="px-2 py-1 rounded-full bg-red-500 text-white font-semibold tracking-[0.18em] uppercase flex items-center gap-1">
                        <FaPlay size={9} /> {video.duration}
                      </span>
                      <span>{video.date}</span>
                    </div>
                    <h3 className="mt-4 text-left text-sm md:text-lg font-semibold text-white leading-snug max-w-full">
                      {video.title}
                    </h3>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-red-700/20 backdrop-blur-sm px-4"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-[16/9] bg-black rounded-3xl overflow-hidden border border-red-400/50 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute z-10 top-3 right-3 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white"
            >
              <FaTimes size={16} />
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${active}?autoplay=1`}
              title="MUFA video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
