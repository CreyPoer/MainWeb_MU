import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin-mu.maduraunitedfc.id/api';

        // Fetch a larger list of videos (limit=100)
        const response = await fetch(`${baseUrl}/v2/videos?limit=100`, {
            cache: 'no-store'
        });
        const data = await response.json();

        if (Array.isArray(data)) {
            const videos = data.map((item: any) => {
                // Determine Video ID
                let videoId = item.url;
                const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
                const match = item.url ? item.url.match(regex) : null;
                if (match && match[1]) {
                    videoId = match[1];
                }

                // Use upload_date if available, otherwise fallback to created_at
                const dateSource = item.upload_date || item.created_at;

                return {
                    id: videoId,
                    title: item.title,
                    // Format date: "7 Februari 2025"
                    date: dateSource ? new Date(dateSource).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '',
                    // Keep original date for sorting/filtering if needed
                    publishedAt: dateSource || new Date().toISOString(),
                    duration: item.duration || '00:00',
                    thumbnail: item.thumbnail,
                    type: item.channel ? String(item.channel).trim().toUpperCase() : null // Ensure uppercase for filtering
                };
            });
            return NextResponse.json(videos);
        }

        return NextResponse.json([]);
    } catch (error) {
        console.error('Error fetching video list:', error);
        return NextResponse.json([]);
    }
}
