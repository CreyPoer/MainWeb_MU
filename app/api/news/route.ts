import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const category = searchParams.get('category');
        const page = searchParams.get('page') || '1';
        const limit = searchParams.get('limit') || searchParams.get('per_page') || '10';
        const search = searchParams.get('search') || searchParams.get('q');
        const tag = searchParams.get('tag');

        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin-mu.maduraunitedfc.id/api';
        const storageUrl = baseUrl.replace('/api', '');

        // Query parameters for V2 News
        const queryParams = new URLSearchParams();
        if (category) queryParams.set('category', category);
        if (search) queryParams.set('search', search);
        if (tag) queryParams.set('tag', tag);
        queryParams.set('per_page', limit);
        queryParams.set('page', page);

        const query = `?${queryParams.toString()}`;

        const response = await fetch(`${baseUrl}/v2/news${query}`, {
            cache: 'no-store'
        });
        const data = await response.json();

        // data is a paginated response: { current_page, data: [...], last_page, ... }
        let newsItems: any[] = [];
        if (data && Array.isArray(data.data)) {
            newsItems = data.data.map((item: any) => {
                let imageUrl = item.image_show_fp
                    ? (item.image_show_fp.startsWith('http') ? item.image_show_fp : `${storageUrl}/storage/articles/${item.image_show_fp}`)
                    : '/images/placeholder.png'; // Fallback

                // Fix potential double slash or wrong path if needed, similar to other routes
                if (imageUrl.includes('maduraunitedfc.com')) {
                    imageUrl = imageUrl.replace('maduraunitedfc.com', 'maduraunitedfc.id');
                }

                return {
                    id: item.id,
                    slug: item.slug,
                    title: item.title,
                    excerpt: item.body ? item.body.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : '', // Simple strip tags
                    date: item.stardate ? new Date(item.stardate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '',
                    image: imageUrl,
                    author: item.author ? item.author.name : 'Admin',
                    tags: item.tags ? item.tags.split(',').filter((t: string) => t.trim() !== '') : [],
                    category: item.section ? item.section.title : 'Berita'
                };
            });
        }

        // Return in paginated format expected by BeritaContent.tsx
        return NextResponse.json({
            data: newsItems,
            meta: {
                current_page: data.current_page || 1,
                last_page: data.last_page || 1,
                per_page: data.per_page || parseInt(limit),
                total: data.total || newsItems.length,
            }
        });
    } catch (error) {
        console.error('Error fetching news:', error);
        return NextResponse.json({ data: [], meta: { current_page: 1, last_page: 1, per_page: 10, total: 0 } });
    }
}
