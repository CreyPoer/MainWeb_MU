import { NextResponse } from 'next/server';

export async function GET() {
    // Return mock data immediately - no external fetch
    const mockMatches = [{
        id: 1,
        competition_name: "BRI Liga 1",
        competition_logo: "https://upload.wikimedia.org/wikipedia/id/6/62/BRI_Liga_1.svg",
        home_team: "Madura United FC",
        home_logo: "https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png",
        away_team: "Persebaya",
        away_logo: "https://upload.wikimedia.org/wikipedia/id/thumb/a/a1/Persebaya_logo.svg/250px-Persebaya_logo.svg.png",
        date: "2026-02-15",
        time: "15:30",
        venue: "Stadion Gelora Ratu Pamelingan",
        is_home: true
    }];

    return NextResponse.json(mockMatches);
}
