"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { FaPowerOff, FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import styles from "../HomePage/MUFAHome.module.css";
import { GalleryItem, Category } from "./galleryData";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MUFAGalleryContent() {
    const { t } = useLanguage();
    const [activeFilter, setActiveFilter] = useState<string>("All");
    const [modalData, setModalData] = useState<GalleryItem | null>(null);
    const [sliderIndex, setSliderIndex] = useState(0);
    const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Categories and Gallery Items in parallel
                const [catRes, galleryRes] = await Promise.all([
                    fetch("/api/gallery/categories"),
                    fetch("/api/gallery?type=MUFA")
                ]);

                const catData = await catRes.json();
                const galleryData = await galleryRes.json();

                let validCategories: { id: number; category: string }[] = [];
                if (Array.isArray(catData)) {
                    validCategories = catData;
                    // Extract unique category names for the filter list
                    const uniqueNames = Array.from(new Set(catData.filter((c: any) => c.category).map((c: any) => c.category))) as string[];
                    setCategories(uniqueNames);
                }

                if (Array.isArray(galleryData)) {
                    const mappedGallery = galleryData.map((item: any) => {
                        // Map categoryId to category name
                        // Ensure loose equality for string/number match
                        const foundCat = validCategories.find((c) => c.id == item.categoryId);
                        return {
                            ...item,
                            // Use found category name, or fallback to item.category if available and not 'Lain-lain', 
                            // otherwise 'Lain-lain' defaults.
                            category: foundCat ? foundCat.category : (item.category && item.category !== 'Lain-lain' ? item.category : 'Lain-lain')
                        };
                    });
                    setGalleryItems(mappedGallery);
                }
            } catch (error) {
                console.error("Failed to fetch gallery data", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const filters = useMemo(() => ["All", ...categories], [categories]);

    const filteredData = useMemo(() => {
        if (activeFilter === "All") return galleryItems;
        return galleryItems.filter((item) => item.category === activeFilter);
    }, [activeFilter, galleryItems]);

    const openModal = (item: GalleryItem) => {
        setModalData(item);
        setSliderIndex(0);
    };

    const closeModal = () => {
        setModalData(null);
    };

    const nextSlide = () => {
        if (!modalData) return;
        setSliderIndex((prev) => (prev + 1) % modalData.images.length);
    };

    const prevSlide = () => {
        if (!modalData) return;
        setSliderIndex((prev) => (prev - 1 + modalData.images.length) % modalData.images.length);
    };

    if (isLoading) {
        return (
            <section className="py-10 md:py-14 bg-slate-950 min-h-screen flex items-center justify-center">
                <div className="text-white text-xl">{t('mufa.gallery_page.loading')}</div>
            </section>
        );
    }

    return (
        <section className="py-10 md:py-14 bg-slate-950 min-h-screen">
            <div className={styles.mufaContainer}>
                {/* HEADER & FILTER */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10" data-aos="fade-up">
                    <div>
                        <p className="text-xs md:text-sm font-semibold tracking-[0.32em] uppercase text-red-400 mb-2">
                            {t('mufa.gallery_page.content_eyebrow')}
                        </p>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white uppercase leading-tight">
                            {t('mufa.gallery_page.content_title')} <span className="text-red-400">{t('mufa.gallery_page.content_title_highlight')}</span>
                        </h2>
                    </div>

                    <div className="flex flex-wrap gap-2 md:gap-3">
                        {filters.map((filter) => {
                            const isActive = activeFilter === filter;
                            return (
                                <button
                                    key={filter}
                                    onClick={() => {
                                        setActiveFilter(filter);
                                        setModalData(null);
                                    }}
                                    className={`px-4 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 ${isActive
                                        ? "bg-red-600 text-white shadow-[0_4px_14px_rgba(220,38,38,0.4)] translate-y-[-1px]"
                                        : "bg-slate-900 border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                                        }`}
                                >
                                    {filter === "All" ? t('mufa.gallery_page.all_filter') : filter}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredData.map((item, index) => (
                        <div
                            key={item.id}
                            className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-slate-900 shadow-xl border border-slate-800 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            onClick={() => openModal(item)}
                        >
                            <Image
                                src={item.thumbnail}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-50"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 p-4 text-center">
                                <div className="w-12 h-12 rounded-full border-2 border-amber-300 flex items-center justify-center bg-black/40 mb-3 shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                                    <FaPowerOff size={20} className="text-amber-300" />
                                </div>
                                <span className="inline-block px-3 py-1 mb-2 rounded-full bg-red-600/90 text-[10px] font-bold tracking-widest uppercase text-white shadow-lg">
                                    {item.category}
                                </span>
                                <h3 className="text-lg font-bold text-white leading-tight mb-1 drop-shadow-md">
                                    {item.title}
                                </h3>
                                <p className="text-[10px] uppercase tracking-widest text-slate-300">
                                    {item.date}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredData.length === 0 && (
                    <div className="text-center py-20 text-slate-500">
                        <p>Tidak ada galeri ditemukan untuk kategori ini.</p>
                    </div>
                )}
            </div>

            {/* MODAL */}
            {
                modalData && (
                    <div
                        className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
                        onClick={closeModal}
                    >
                        <div
                            className="relative w-full max-w-5xl max-h-[90vh] h-[80vh] md:h-auto aspect-auto md:aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-red-600/80 hover:bg-red-600 text-white flex items-center justify-center transition-all hover:rotate-90"
                            >
                                <FaTimes size={18} />
                            </button>

                            {/* Main Image */}
                            <div className="relative flex-1 overflow-hidden group">
                                <Image
                                    src={modalData.images[sliderIndex]}
                                    alt={`Slide ${sliderIndex}`}
                                    fill
                                    className="object-contain bg-black/50"
                                />

                                {/* Navigation Arrows */}
                                <button
                                    onClick={prevSlide}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-red-600/80 text-white backdrop-blur-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <FaChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-red-600/80 text-white backdrop-blur-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <FaChevronRight size={20} />
                                </button>
                            </div>

                            {/* Caption / Footer */}
                            <div className="bg-slate-900/90 border-t border-slate-800 p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-xl w-full z-20">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-[10px] font-bold tracking-widest uppercase text-red-400">
                                            {modalData.category}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-slate-500" />
                                        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
                                            {modalData.date}
                                        </span>
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold text-white">
                                        {modalData.title}
                                    </h3>
                                </div>

                                {/* Thumbnails Indicator */}
                                <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 max-w-[200px] md:max-w-xs scrollbar-hide">
                                    {modalData.images.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSliderIndex(idx)}
                                            className={`relative w-12 h-8 flex-shrink-0 rounded-md overflow-hidden border transition-all ${idx === sliderIndex ? "border-red-500 opacity-100" : "border-transparent opacity-40 hover:opacity-70"
                                                }`}
                                        >
                                            <Image
                                                src={modalData.images[idx]} // Use the actual image for thumbnail
                                                alt="thumb"
                                                fill
                                                className="object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </section >
    );
}
