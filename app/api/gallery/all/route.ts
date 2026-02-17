import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const type = searchParams.get('type');
        const limit = searchParams.get('limit');

        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin-mu.maduraunitedfc.id/api';
        const storageUrl = baseUrl.replace('/api', '');

        // Build query string
        const queryParams = new URLSearchParams();
        if (category && category !== 'All') queryParams.append('category', category);
        if (type) queryParams.append('type', type);
        if (limit) queryParams.append('limit', limit);

        const response = await fetch(`${baseUrl}/v2/gallery?${queryParams.toString()}`, {
            cache: 'no-store'
        });
        const data = await response.json();

        if (Array.isArray(data)) {
            const galleries = data.map((item: any) => {
                // Determine images
                const images = item.images ? item.images.map((img: any) => {
                    const rawPath = img.path || `storage/gallery/photos/${img.image_name}`;
                    if (rawPath.startsWith('http')) return rawPath;
                    return `${storageUrl}/${rawPath}`;
                }) : [];

                // Helper to get full thumbnail path
                const getThumbnail = (item: any) => {
                    if (item.thumbnail) {
                        if (item.thumbnail.startsWith('http')) return item.thumbnail;
                        return `${storageUrl}/storage/gallery/thumbnail/${item.thumbnail}`;
                    }
                    if (images.length > 0) return images[0];
                    return '/images/placeholder.png'; // Fallback
                };

                return {
                    id: item.id_gallery || item.id,
                    title: item.title_gallery || item.title,
                    date: item.date_gallery ? new Date(item.date_gallery).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '',
                    thumbnail: getThumbnail(item),
                    images: images,
                    category_id: item.category_id,
                    category: item.category ? item.category.category : 'Lain-lain' // Assuming relationship is loaded or handle null
                };
            });
            return NextResponse.json(galleries);
        }

        return NextResponse.json([]);
    } catch (error) {
        console.error('Error fetching gallery:', error);
        return NextResponse.json([]);
    }
}
