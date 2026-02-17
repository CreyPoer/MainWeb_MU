import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const type = searchParams.get('type');

        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin-mu.maduraunitedfc.id/api';
        const storageUrl = baseUrl.replace('/api', '');

        // Use V1 Slider Endpoint which returns ALL active sliders
        const response = await fetch(`${baseUrl}/slider-home`, {
            cache: 'no-store'
        });
        const data = await response.json();

        // V1 returns { status: 'OK', title: '...', result: [...] }
        if (data.status === 'OK' && Array.isArray(data.result)) {
            let rawSliders = data.result;

            // Filter locally if type is specified
            if (type) {
                rawSliders = rawSliders.filter((s: any) => s.type === type);
            }

            const sliders = rawSliders.map((item: any) => {
                let imageUrl = item.image ? (item.image.startsWith('http') ? item.image : `${storageUrl}/storage/${item.image}`) : '';
                if (imageUrl) {
                    imageUrl = imageUrl.replace('maduraunitedfc.com', 'maduraunitedfc.id');
                }
                return {
                    id: item.id,
                    name: item.title || item.name || '',
                    subtitle: item.subjudul || '',
                    image: imageUrl,
                    link: item.link || '',
                    status: item.status
                };
            });
            return NextResponse.json(sliders);
        }

        return NextResponse.json([]);
    } catch (error) {
        console.error('Error fetching sliders:', error);
        return NextResponse.json([]);
    }
}
