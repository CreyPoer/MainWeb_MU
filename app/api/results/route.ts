import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin-mu.maduraunitedfc.id/api';
        const storageUrl = baseUrl.replace('/api', '');

        // Fetching last 2 matches
        const response = await fetch(`${baseUrl}/v2/homepage/last-match`, {
            cache: 'no-store'
        });
        const data = await response.json();

        if (data.status === 'OK' && data.result) {
            const m = data.result;
            console.log("Results Data:", JSON.stringify(m, null, 2)); // DEBUG LOG

            // Helper to ensure HTTPS
            const secureUrl = (url: string) => {
                if (!url) return '';
                if (url.startsWith('https://')) return url;
                if (url.startsWith('http://')) return url.replace('http://', 'https://');
                if (url.startsWith('/storage')) return `${storageUrl}${url}`;
                return url;
            };

            // Map to MatchResult interface
            const results = Array.isArray(m) ? m.map((match: any) => {
                let homeScore = 0;
                let awayScore = 0;

                // Handle score mapping
                if (match.home_score !== undefined && match.home_score !== null) {
                    homeScore = Number(match.home_score);
                    awayScore = Number(match.away_score);
                } else if (match.score !== undefined && match.score !== null) {
                    // Fallback to score/opponent_score logic
                    const score = Number(match.score);
                    const opponentScore = Number(match.oppponent_score || match.opponent_score || 0);
                    const isHome = match.is_home === 1 || match.is_home === true || match.is_home === '1';

                    if (isHome) {
                        homeScore = score;
                        awayScore = opponentScore;
                    } else {
                        homeScore = opponentScore;
                        awayScore = score;
                    }
                }

                return {
                    id: match.id,
                    homeTeam: match.home_team || 'Madura United',
                    homeLogo: secureUrl(match.home_team_logo) || '/images/logo-placeholder.png',
                    homeScore: homeScore,
                    awayTeam: match.away_team || 'Opponent',
                    awayLogo: secureUrl(match.away_team_logo) || '/images/logo-placeholder.png',
                    awayScore: awayScore,
                    stadium: match.stadium || 'Stadion Gelora Ratu Pamelingan',
                    date: match.date ? new Date(match.date).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: '2-digit' }) : '',
                    time: match.kickoff_time || match.time_match || '00:00'
                };
            }) : [];

            return NextResponse.json(results);
        }

        return NextResponse.json([]);
    } catch (error) {
        console.error('Error fetching match results:', error);
        return NextResponse.json([]);
    }
}
