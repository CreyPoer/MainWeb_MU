import React from "react";
import { notFound } from "next/navigation";
import DetailHero from "@/components/Pertandingan/Jadwal dan Hasil/Detail/DetailHero";
import DetailContent from "@/components/Pertandingan/Jadwal dan Hasil/Detail/DetailContent";
import FooterSection from "@/components/HomePage/FooterSection";
import {
    RESULTS_DATA_SENIOR,
    UPCOMING_DATA_SENIOR,
    RESULTS_DATA_ACADEMY,
    UPCOMING_DATA_ACADEMY,
    MatchData
} from "@/components/Pertandingan/Jadwal dan Hasil/matchData";
import { Metadata } from "next";

type Props = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
    props: Props
): Promise<Metadata> {
    const params = await props.params;
    const searchParams = await props.searchParams;

    const id = parseInt(params.id);
    const type = searchParams.type as string || 'senior';

    let match: MatchData | undefined;

    if (type === 'academy') {
        match = RESULTS_DATA_ACADEMY.find(m => m.id === id);
    } else {
        match = RESULTS_DATA_SENIOR.find(m => m.id === id);
    }

    if (!match) {
        return {
            title: 'Detail Pertandingan | Madura United FC'
        };
    }

    return {
        title: `${match.homeTeam} vs ${match.awayTeam} | Madura United FC`,
    };
}

export default async function MatchDetailPage(props: Props) {
    const params = await props.params;
    const searchParams = await props.searchParams;

    const id = parseInt(params.id);
    const type = searchParams.type as string || 'senior';

    let match: MatchData | undefined;

    if (type === 'academy') {
        match = RESULTS_DATA_ACADEMY.find(m => m.id === id);
    } else {
        match = RESULTS_DATA_SENIOR.find(m => m.id === id);
    }

    if (!match) {
        notFound();
    }

    return (
        <main className="bg-neutral-900 min-h-screen">
            <DetailHero homeTeam={match.homeTeam} awayTeam={match.awayTeam} />
            <DetailContent />
            <FooterSection />
        </main>
    );
}
