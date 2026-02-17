import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin-mu.maduraunitedfc.id/api';
        const storageUrl = baseUrl.replace('/api', '');

        const response = await fetch(`${baseUrl}/v2/homepage/partners`, {
            cache: 'no-store'
        });
        const data = await response.json();

        if (data.status === 'OK' && Array.isArray(data.result)) {
            const partners = data.result.map((item: any) => {
                let logoUrl = item.logo ? (item.logo.startsWith('http') ? item.logo : `${storageUrl}/storage/${item.logo}`) : item.image_full_path;
                if (logoUrl) {
                    logoUrl = logoUrl.replace('maduraunitedfc.com', 'maduraunitedfc.id');
                }
                return {
                    id: item.id || item.id_partner,
                    name: item.name,
                    type: item.priority === 1 ? "MAIN SPONSOR" : "OFFICIAL PARTNER",
                    logo: logoUrl,
                    isMain: item.priority === 1,
                    link: item.link || "#"
                };
            });
            return NextResponse.json(partners);
        }

        return NextResponse.json([]);
    } catch (error) {
        console.error('Error fetching partners:', error);
        return NextResponse.json([]);
    }
}
