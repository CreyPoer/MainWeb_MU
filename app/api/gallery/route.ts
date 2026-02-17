import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const type = searchParams.get('type');
        const query = type ? `?type=${type}` : '';

        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin-mu.maduraunitedfc.id/api';
        const storageUrl = baseUrl.replace('/api', '');

        // Use V2 Gallery Controller which supports 'type' filtering natively
        const response = await fetch(`${baseUrl}/v2/gallery${query}`, {
            cache: 'no-store'
        });
        const data = await response.json();

        let galleries: any[] = [];
        if (Array.isArray(data)) {
            galleries = data.map((item: any) => {
                // Determine images
                const images = item.images ? item.images.map((img: any) => {
                    const rawPath = img.path || `storage/gallery/photos/${img.image_name}`;
                    if (rawPath.startsWith('http')) return rawPath;
                    return `${storageUrl}/${rawPath}`;
                }) : [];

                return {
                    id: item.id_gallery || item.id,
                    title: item.title_gallery || item.title || '',
                    date: item.date_gallery ? new Date(item.date_gallery).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '',
                    // Thumbnail logic
                    thumbnail: item.thumbnail ? `${storageUrl}/storage/gallery/thumbnail/${item.thumbnail}` : (images[0] || ''),
                    images: images,
                    category: item.category ? item.category.category : 'Lain-lain',
                    categoryId: item.category_id
                };
            });
        }

        return NextResponse.json(galleries);
    } catch (error) {
        console.error('Error fetching gallery:', error);
        return NextResponse.json([]);
    }
}
