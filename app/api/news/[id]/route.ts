import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');

        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin-mu.maduraunitedfc.id/api';
        const storageUrl = baseUrl.replace('/api', '');

        // Query parameters for V2 News List to populate Next/Prev correctly within context
        const queryParams = new URLSearchParams();
        if (category) queryParams.set('category', category);

        // Fetch the LIST instead of single item, because v2/news/{id} is broken on production
        // and v2/news?id=x is ignored.
        // We will find the item in the list.
        // Fetch more items to ensure we find it if it's not in the first page?
        // For now, let's keep it simple or maybe fetch slightly more?
        // Default pagination often 15. Let's try to fetch a bit more just in case.
        if (!queryParams.has('limit')) {
            queryParams.set('limit', '50');
        }

        const response = await fetch(`${baseUrl}/v2/news?${queryParams.toString()}`, {
            cache: 'no-store'
        });

        if (!response.ok) {
            console.error(`Backend list fetch failed: ${response.status}`);
            return NextResponse.json({ error: 'Failed to fetch news list' }, { status: response.status });
        }

        const data = await response.json();

        let newsList: any[] = [];
        if (Array.isArray(data)) {
            newsList = data;
        } else if (data.data && Array.isArray(data.data)) {
            newsList = data.data;
        }

        // Determine if looked up by ID or Slug
        const targetId = parseInt(id);
        const isNumericId = !isNaN(targetId) && targetId.toString() === id;

        let currentIndex = -1;

        if (isNumericId) {
            currentIndex = newsList.findIndex((item: any) => item.id === targetId);
        } else {
            // Look up by slug
            currentIndex = newsList.findIndex((item: any) => item.slug === id);
        }

        if (currentIndex === -1) {
            return NextResponse.json({ error: 'News not found in recent list' }, { status: 404 });
        }

        const item = newsList[currentIndex];

        // Construct Detail
        const newsDetail = {
            id: item.id,
            title: item.title,
            content: item.body ? item.body : '',
            image: item.image_url || ((item.image_show_fp && !item.image_show_fp.startsWith('http')) ? `${storageUrl}/storage/articles/${item.image_show_fp}` : item.image_show_fp),
            date: item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '',
            slug: item.slug,
            category: item.section?.title || 'General',
            author: item.author?.name || 'Admin',
            author_bio: item.author?.short_biography || 'Tim yang bertanggung jawab dalam membangun citra klub sepak bola Madura United.',
            author_image: item.author?.image ? `${storageUrl}/storage/authors/${item.author.image}` : '/logo.png',
            tags: item.tags ? item.tags.split(',') : [],
            penerbit: item.source || 'Madura United FC',
            link_berita: item.source_url || '#'
        };

        // Previous (Item at index + 1, because list is usually desc)
        const prevItem = newsList[currentIndex + 1];
        const previous = prevItem ? {
            id: prevItem.id,
            title: prevItem.title,
            slug: prevItem.slug
        } : null;

        // Next (Item at index - 1)
        const nextItem = newsList[currentIndex - 1];
        const next = nextItem ? {
            id: nextItem.id,
            title: nextItem.title,
            slug: nextItem.slug
        } : null;

        // Related (Same category, exclude current)
        // If we filtered by category in the list fetch, the list is already same-category.
        // If not, we filter by the item's section.
        const related = newsList
            .filter((n: any) => n.id !== item.id && (category ? true : n.section?.id === item.section?.id))
            .slice(0, 2)
            .map((rel: any) => ({
                id: rel.id,
                title: rel.title,
                image: rel.image_url || ((rel.image_show_fp && !rel.image_show_fp.startsWith('http')) ? `${storageUrl}/storage/articles/${rel.image_show_fp}` : rel.image_show_fp),
                date: rel.created_at ? new Date(rel.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '',
                category: rel.section?.title || 'General',
                author: rel.author?.name || 'Admin',
                slug: rel.slug // Ensure slug is available for related items if needed
            }));

        return NextResponse.json({
            ...newsDetail,
            previous,
            next,
            related
        });

    } catch (error) {
        console.error('Error fetching news detail:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
