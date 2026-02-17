"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { FaPlay, FaTimes, FaCalendarAlt } from "react-icons/fa";
import styles from "../HomePage/MUFAHome.module.css";

const VIDEO_API_URL = "/api/videos/list";

interface Video {
    id: string;
    title: string;
    date: string;
    publishedAt: string;
    duration: string;
    thumbnail: string;
    type?: string;
}

export default function MUFAVideoContent() {
    const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
    const [modalVideo, setModalVideo] = useState<string | null>(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [videos, setVideos] = useState<Video[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch videos from API
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await fetch(VIDEO_API_URL);
                const data = await res.json();

                if (Array.isArray(data)) {
                    // Filter only MUFA videos
                    const mufaVideos = data.filter((video: Video) => video.type === 'MUFA');
                    setVideos(mufaVideos);
                }
            } catch (error) {
                console.error("Failed to fetch MUFA videos:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVideos();
    }, []);

    const filteredVideos = useMemo(() => {
        let items = [...videos];

        if (startDate) {
            const start = new Date(startDate);
            items = items.filter((video) => new Date(video.publishedAt) >= start);
        }

        if (endDate) {
            const end = new Date(endDate);
            items = items.filter((video) => new Date(video.publishedAt) <= end);
        }

        // Sort terbaru ke terlama
        items.sort(
            (a, b) =>
                new Date(b.publishedAt).getTime() -
                new Date(a.publishedAt).getTime()
        );

        return items;
    }, [videos, startDate, endDate]);

    return (
        <section className="py-10 md:py-14 bg-slate-950 min-h-screen">
            <div className={styles.mufaContainer}>
                {/* HEADER & FILTER */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10" data-aos="fade-up">
                    <div>
                        <p className="text-xs md:text-sm font-semibold tracking-[0.32em] uppercase text-red-400 mb-2">
                            Latest Updates
                        </p>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white uppercase leading-tight">
                            Watch <span className="text-red-400">Highlights</span>
                        </h2>
                    </div>

                    <div className="flex flex-wrap gap-2 md:gap-3 items-center bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Dari:</span>
                            <input
                                type="date"
                                className="bg-slate-950 text-white text-xs px-3 py-1.5 rounded-lg border border-slate-700 focus:border-red-500 outline-none"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Sampai:</span>
                            <input
                                type="date"
                                className="bg-slate-950 text-white text-xs px-3 py-1.5 rounded-lg border border-slate-700 focus:border-red-500 outline-none"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                setStartDate("");
                                setEndDate("");
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-colors ml-2"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                {/* LOADING STATE */}
                {isLoading && (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p>Memuat video MUFA...</p>
                    </div>
                )}

                {/* VIDEO GRID */}
                {!isLoading && (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredVideos.map((video, index) => (
                            <div
                                key={video.id}
                                className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer bg-slate-900 border border-slate-800 shadow-lg hover:shadow-red-900/20 hover:border-red-500/50 transition-all duration-300"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                                onMouseEnter={() => setHoveredVideo(video.id)}
                                onMouseLeave={() => setHoveredVideo(null)}
                                onClick={() => setModalVideo(video.id)}
                            >
                                {/* Thumbnail / Preview */}
                                <div className="absolute inset-0">
                                    {hoveredVideo === video.id ? (
                                        <iframe
                                            className="w-full h-full object-cover pointer-events-none scale-110"
                                            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0`}
                                            title={video.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        />
                                    ) : (
                                        <>
                                            <Image
                                                src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                                                alt={video.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />

                                            {/* Play Button Icon */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center pl-1 shadow-[0_0_20px_rgba(220,38,38,0.5)] group-hover:scale-110 transition-transform duration-300">
                                                    <FaPlay size={16} />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Info Overlay (Only when not hovering or always visible at bottom?) 
                                    Let's keep it visible at bottom like requested design 
                                */}
                                {!hoveredVideo && (
                                    <div className="absolute bottom-0 left-0 w-full p-4 z-10">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                                                <FaPlay size={8} /> {video.duration}
                                            </span>
                                            <span className="text-slate-300 text-[10px] font-medium flex items-center gap-1">
                                                <FaCalendarAlt size={10} /> {video.date}
                                            </span>
                                        </div>
                                        <h3 className="text-white font-bold text-sm leading-tight line-clamp-2 group-hover:text-red-400 transition-colors">
                                            {video.title}
                                        </h3>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {!isLoading && filteredVideos.length === 0 && (
                    <div className="text-center py-20 text-slate-500">
                        <p>Tidak ada video ditemukan untuk rentang tanggal ini.</p>
                    </div>
                )}
            </div>

            {/* MODAL */}
            {modalVideo && (
                <div
                    className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
                    onClick={() => setModalVideo(null)}
                >
                    <div
                        className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setModalVideo(null)}
                            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center transition-all"
                        >
                            <FaTimes size={18} />
                        </button>
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${modalVideo}?autoplay=1`}
                            title="Video Player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
