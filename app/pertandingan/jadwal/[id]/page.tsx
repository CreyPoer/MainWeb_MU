import React from "react";
import { notFound } from "next/navigation";
import DetailHero from "@/components/Pertandingan/Jadwal dan Hasil/Detail/DetailHero";
import DetailContent from "@/components/Pertandingan/Jadwal dan Hasil/Detail/DetailContent";
import FooterSection from "@/components/HomePage/FooterSection";
import {
    MatchData,
    transformMatchData,
    APIMatch
} from "@/components/Pertandingan/Jadwal dan Hasil/matchData";
import { fetchAPI } from "@/utils/api"; // Updated import path
import { Metadata } from "next";

type Props = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function getMatchData(id: string, type: string): Promise<MatchData | null> {
    try {
        const teamRole = type === 'academy' ? 2 : 1;
        // Workaround: Since production API might not have the 'show' endpoint yet,
        // we fetch the latest matches and find the one we need.
        // Fetching 50 should cover both upcoming and recent results.
        const apiData: APIMatch[] = await fetchAPI(`/matches?team_role=${teamRole}&limit=50`);

        if (!apiData || !Array.isArray(apiData)) return null;

        const targetId = parseInt(id);
        const match = apiData.find((m: APIMatch) => m.id === targetId);

        return match ? transformMatchData(match, teamRole) : null;
    } catch (error) {
        console.error("Error fetching match detail:", error);
        return null;
    }
}

export async function generateMetadata(
    props: Props
): Promise<Metadata> {
    const params = await props.params;
    const searchParams = await props.searchParams;

    const id = params.id;
    const type = (searchParams.type as string) || 'senior';

    const match = await getMatchData(id, type);

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

    const id = params.id;
    const type = (searchParams.type as string) || 'senior';

    const match = await getMatchData(id, type);

    if (!match) {
        notFound();
    }

    return (
        <main className="bg-neutral-900 min-h-screen">
            <DetailHero homeTeam={match.homeTeam} awayTeam={match.awayTeam} />
            <DetailContent match={match} />
            <FooterSection />
        </main>
    );
}
