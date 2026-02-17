import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin-mu.maduraunitedfc.id/api';
        const storageUrl = baseUrl.replace('/api', '');

        const response = await fetch(`${baseUrl}/v2/communities`, {
            cache: 'no-store'
        });
        const data = await response.json();

        const communities = (Array.isArray(data) ? data : []).map((item: any) => {
            let imageUrl = '';
            if (item.image) {
                imageUrl = item.image.startsWith('http')
                    ? item.image
                    : `${storageUrl}/storage/${item.image}`;
            }
            return {
                id: item.id,
                name: item.name,
                image: imageUrl,
                link: item.link || '#',
                description: item.description || '',
            };
        });

        return NextResponse.json(communities);
    } catch (error) {
        console.error('Error fetching communities:', error);
        return NextResponse.json([]);
    }
}
