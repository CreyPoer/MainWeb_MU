import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin-mu.maduraunitedfc.id/api';
        const storageUrl = baseUrl.replace('/api', '');

        const response = await fetch(`${baseUrl}/v2/homepage/next-match`, {
            cache: 'no-store'
        });
        const data = await response.json();

        if (data.status === 'OK' && data.result) {
            const m = data.result;
            console.log("Match Data:", JSON.stringify(m, null, 2)); // DEBUG LOG

            const secureUrl = (url: string) => {
                if (!url) return '';
                let finalUrl = url;
                if (url.startsWith('https://')) finalUrl = url;
                else if (url.startsWith('http://')) finalUrl = url.replace('http://', 'https://');
                else if (url.startsWith('/storage')) finalUrl = `${storageUrl}${url}`;
                else finalUrl = `${storageUrl}/storage/${url}`; // Handle bare relative paths

                return finalUrl.replace('maduraunitedfc.com', 'maduraunitedfc.id');
            };

            const match = {
                id: m.id,
                competition_name: m.competition?.name || 'Competition',
                competition_logo: secureUrl(m.competition?.logo || m.competition?.logo_path),
                home_team: m.home_team || 'Madura United FC',
                home_logo: secureUrl(m.home_team_logo),
                away_team: m.away_team || 'Opponent',
                away_logo: secureUrl(m.away_team_logo),
                date: m.date || '',
                time: m.kickoff_time || m.time_match || '00:00',
                venue: m.stadium || 'Stadion Gelora Ratu Pamelingan',
                is_home: m.is_home === 1 || m.is_home === true
            };

            return NextResponse.json([match]);
        }

        return NextResponse.json([]);
    } catch (error) {
        console.error('Error fetching matches:', error);
        return NextResponse.json([]);
    }
}
