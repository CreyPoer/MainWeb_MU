"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import MUFANavbar from "../HomePage/MUFANavbar";
import MUFAFooter from "../HomePage/MUFAFooter";
import MUFAVideoHero from "./MUFAVideoHero";
import MUFAVideoContent from "./MUFAVideoContent";

export default function MUFAVideoPage() {
    useEffect(() => {
        AOS.init({ duration: 700, once: true });
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col">
            <MUFANavbar />

            <main className="flex-1 pt-24">
                <MUFAVideoHero />
                <MUFAVideoContent />
            </main>

            <MUFAFooter />
        </div>
    );
}
