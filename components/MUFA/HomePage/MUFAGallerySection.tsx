import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight, FaTimes, FaPowerOff, FaArrowRight } from "react-icons/fa";
import styles from "./MUFAHome.module.css";

type Album = {
  id: number;
  title: string;
  cover: string;
  images: string[];
};

export default function MUFAGallerySection() {
  const [activeAlbum, setActiveAlbum] = useState<Album | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("/api/gallery?type=MUFA");
        const data = await res.json();
        if (Array.isArray(data)) {
          // Map API data to component structure
          const mappedAlbums = data.map((item: any) => ({
            id: item.id,
            title: item.title,
            cover: item.thumbnail,
            images: item.images
          }));
          setAlbums(mappedAlbums);
        }
      } catch (error) {
        console.error("Failed to fetch MUFA gallery", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const openAlbum = (album: Album) => {
    setActiveAlbum(album);
    setSlideIndex(0);
  };

  const next = () => {
    if (!activeAlbum) return;
    setSlideIndex((prev) => (prev + 1) % activeAlbum.images.length);
  };

  const prev = () => {
    if (!activeAlbum) return;
    setSlideIndex((prev) => (prev - 1 + activeAlbum.images.length) % activeAlbum.images.length);
  };

  if (isLoading) {
    return <div className="py-20 text-center text-white">Loading Gallery...</div>;
  }

  // If no albums, hide section or show empty state? Let's just return nothing or a placeholder if empty
  if (albums.length === 0) {
    return null;
  }

  return (
    <section id="gallery" className={styles.mufaSection}>
      <div className={styles.mufaContainer}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div>
            <p className="text-xs md:text-sm font-semibold tracking-[0.32em] text-red-400 uppercase mb-2">
              Visual Stories
            </p>
            <h2
              data-aos="fade-up"
              className="text-2xl md:text-4xl font-extrabold text-white uppercase leading-tight"
            >
              Gallery <span className="text-red-400">MUFA</span>
            </h2>
          </div>
          <Link
            href="/mufa/gallery"
            data-aos="fade-left"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-[0.18em] uppercase text-slate-100/90 hover:text-amber-300 transition-colors"
          >
            Lihat Selengkapnya <FaArrowRight size={12} />
          </Link>
        </div>

        <div className={styles.mufaGalleryShell}>
          {/* Main Feature (First Item) */}
          <div
            className="relative rounded-3xl overflow-hidden min-h-[260px] bg-slate-900 border border-slate-700"
            data-aos="fade-up"
          >
            {albums.slice(0, 1).map((album) => (
              <button
                key={album.id}
                type="button"
                className="group relative w-full h-full text-left"
                onClick={() => openAlbum(album)}
              >
                <Image
                  src={album.cover}
                  alt={album.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/70 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 hidden group-hover:flex flex-col items-center justify-center gap-4 text-center transition-opacity duration-300">
                  <span className="inline-flex px-3 py-1 rounded-full bg-red-500 text-xs font-semibold tracking-[0.18em] uppercase text-white/90">
                    Featured Moments
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-snug max-w-md">
                    {album.title}
                  </h3>
                  <div className="w-12 h-12 rounded-full border-2 border-amber-300 flex items-center justify-center bg-black/40">
                    <FaPowerOff size={20} className="text-amber-300" />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Grid for other items */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
            {albums.slice(1, 3).map((album, index) => (
              <button
                key={album.id}
                type="button"
                className="relative rounded-2xl overflow-hidden min-h-[120px] bg-slate-900 border border-slate-700 group"
                onClick={() => openAlbum(album)}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <Image
                  src={album.cover}
                  alt={album.title}
                  unoptimized
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 hidden group-hover:flex flex-col items-center justify-center gap-3 text-center transition-opacity duration-300">
                  <div className="w-9 h-9 rounded-full border border-amber-300 flex items-center justify-center bg-black/40">
                    <FaPowerOff size={16} className="text-amber-300" />
                  </div>
                  <h3 className="text-xs md:text-sm font-semibold text-slate-50 leading-snug px-3">
                    {album.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeAlbum && (
        <div
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={() => setActiveAlbum(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-[16/9] rounded-3xl overflow-hidden bg-black border border-slate-600"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeAlbum.images[slideIndex]}
              alt={activeAlbum.title}
              unoptimized
              fill
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-center justify-between gap-3">
              <p className="text-xs md:text-sm text-slate-100 font-semibold">
                {activeAlbum.title}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-50"
                >
                  <FaChevronLeft size={14} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-50"
                >
                  <FaChevronRight size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveAlbum(null)}
                  className="w-9 h-9 rounded-full bg-red-500 hover:bg-red-400 flex items-center justify-center text-white"
                >
                  <FaTimes size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
