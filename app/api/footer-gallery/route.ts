import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const type = searchParams.get('type');
        // Use params to V2 Gallery
        const queryParams = new URLSearchParams();
        if (type) queryParams.set('type', type);
        queryParams.set('limit', '4');
        const query = `?${queryParams.toString()}`;

        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin-mu.maduraunitedfc.id/api';
        const storageUrl = baseUrl.replace('/api', '');

        // Use V2 Gallery Controller which supports 'type' filtering natively
        const response = await fetch(`${baseUrl}/v2/gallery${query}`, {
            cache: 'no-store'
        });
        const data = await response.json();

        // V2 Gallery returns the array directly

        let galleryData: any[] = [];
        if (Array.isArray(data)) {
            galleryData = data.map((item: any) => {
                // Construct images array
                const images = item.images ? item.images.map((img: any) => {
                    const rawPath = img.path || `storage/gallery/photos/${img.image_name}`;
                    if (rawPath.startsWith('http')) return rawPath;
                    return `${storageUrl}/${rawPath}`;
                }) : [];

                // Thumbnail logic
                let thumbnail = '/images/placeholder.png';
                if (item.thumbnail) {
                    thumbnail = `${storageUrl}/storage/gallery/thumbnail/${item.thumbnail}`;
                } else if (images.length > 0) {
                    thumbnail = images[0];
                }

                return {
                    thumbnail: thumbnail,
                    images: images
                };
            });
        }

        return NextResponse.json(galleryData);
    } catch (error) {
        console.error('Error fetching footer gallery:', error);
        return NextResponse.json([]);
    }
}
