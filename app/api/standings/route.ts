import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin-mu.maduraunitedfc.id/api';
        const storageUrl = baseUrl.replace('/api', '');

        const response = await fetch(`${baseUrl}/v2/homepage/standings`, {
            cache: 'no-store'
        });
        const data = await response.json();

        if (data.status === 'OK' && Array.isArray(data.result)) {
            const secureUrl = (url: string) => {
                if (!url) return null;
                if (url.startsWith('https://')) return url;
                if (url.startsWith('http://')) return url.replace('http://', 'https://');
                if (url.startsWith('/storage')) return `${storageUrl}${url}`;
                return `${storageUrl}/storage/${url}`;
            };

            const result = data.result.map((item: any) => {
                let logoUrl = item.logo;
                if (!logoUrl) {
                    // Generate logo from team name: lowercase, specific format
                    // "BORNEO FC SAMARINDA" -> "borneo-fc-samarinda.png"
                    const filename = item.team.toLowerCase().replace(/\s+/g, '-') + '.png';
                    // Assume it lives in the standard competition logo path
                    logoUrl = `competitions/opponent-logo/${filename}`;
                }

                if (item.next_opponent && item.next_opponent.opponent) {
                    const opFilename = item.next_opponent.opponent.toLowerCase().replace(/\s+/g, '-') + '.png';
                    item.next_opponent.logo = secureUrl(`competitions/opponent-logo/${opFilename}`);
                }

                return {
                    ...item,
                    logo: secureUrl(logoUrl)
                };
            });

            return NextResponse.json(result);
        }

        return NextResponse.json([]);
    } catch (error) {
        console.error('Error fetching standings:', error);
        return NextResponse.json([]);
    }
}
