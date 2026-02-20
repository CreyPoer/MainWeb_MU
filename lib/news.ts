
export interface NewsDetail {
    id: number;
    title: string;
    content: string | string[];
    image: string;
    date: string;
    slug: string;
    category: string;
    author: string;
    author_bio: string;
    author_image: string;
    tags: string[];
    penerbit: string;
    link_berita: string;
    previous: { id: number; title: string; slug: string } | null;
    next: { id: number; title: string; slug: string } | null;
    related: any[];
}

export async function getNewsDetail(idOrSlug: string): Promise<NewsDetail | null> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin-mu.maduraunitedfc.id/api';
        const storageUrl = baseUrl.replace('/api', '');

        // Fetch the LIST instead of single item (workaround for broken v2/news/{id})
        // Fetch more items to ensure we find it if it's not in the first page
        const queryParams = new URLSearchParams();
        queryParams.set('limit', '50');

        const response = await fetch(`${baseUrl}/v2/news?${queryParams.toString()}`, {
            cache: 'no-store'
        });

        if (!response.ok) {
            console.error(`External API fetch failed: ${response.status}`);
            return null;
        }

        const data = await response.json();

        let newsList: any[] = [];
        if (Array.isArray(data)) {
            newsList = data;
        } else if (data.data && Array.isArray(data.data)) {
            newsList = data.data;
        }

        // Determine if looked up by ID or Slug
        const targetId = parseInt(idOrSlug);
        const isNumericId = !isNaN(targetId) && targetId.toString() === idOrSlug;

        let currentIndex = -1;

        if (isNumericId) {
            currentIndex = newsList.findIndex((item: any) => item.id === targetId);
        } else {
            // Look up by slug
            currentIndex = newsList.findIndex((item: any) => item.slug === idOrSlug);
        }

        if (currentIndex === -1) {
            return null;
        }

        const item = newsList[currentIndex];

        // Construct Detail
        const newsDetail: NewsDetail = {
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
            ,
            previous: null,
            next: null,
            related: []
        };

        // Previous (Item at index + 1, because list is usually desc)
        const prevItem = newsList[currentIndex + 1];
        newsDetail.previous = prevItem ? {
            id: prevItem.id,
            title: prevItem.title,
            slug: prevItem.slug
        } : null;

        // Next (Item at index - 1)
        const nextItem = newsList[currentIndex - 1];
        newsDetail.next = nextItem ? {
            id: nextItem.id,
            title: nextItem.title,
            slug: nextItem.slug
        } : null;

        // Related
        newsDetail.related = newsList
            .filter((n: any) => n.id !== item.id && n.section?.id === item.section?.id)
            .slice(0, 2)
            .map((rel: any) => ({
                id: rel.id,
                title: rel.title,
                image: rel.image_url || ((rel.image_show_fp && !rel.image_show_fp.startsWith('http')) ? `${storageUrl}/storage/articles/${rel.image_show_fp}` : rel.image_show_fp),
                date: rel.created_at ? new Date(rel.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '',
                category: rel.section?.title || 'General',
                author: rel.author?.name || 'Admin',
                slug: rel.slug
            }));

        return newsDetail;

    } catch (error) {
        console.error('Error in getNewsDetail:', error);
        return null;
    }
}
