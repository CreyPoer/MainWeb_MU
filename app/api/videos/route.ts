import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const channel = searchParams.get('channel');

        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin-mu.maduraunitedfc.id/api';

        // Use V2 Video Controller which returns a list. 
        // It accepts 'limit'. Passing a higher limit to ensure we get MUFA videos.
        const response = await fetch(`${baseUrl}/v2/videos?limit=50`, {
            cache: 'no-store'
        });
        const data = await response.json();

        // V2 Video Controller returns array directly: return response()->json( $videos );

        let videos: any[] = [];
        if (Array.isArray(data)) {
            let rawVideos = data;

            // Filter locally if channel is specified
            if (channel) {
                rawVideos = rawVideos.filter((v: any) => v.channel === channel);
            }

            videos = rawVideos.map((item: any) => {
                // Determine Video ID
                let videoId = item.url;
                const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
                const match = item.url ? item.url.match(regex) : null;
                if (match && match[1]) {
                    videoId = match[1];
                }

                return {
                    id: videoId,
                    title: item.title,
                    date: item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '',
                    duration: item.duration || '00:00',
                    thumbnail: item.thumbnail
                };
            });
        }

        return NextResponse.json(videos.slice(0, 3)); // Limit to 3 for consistency with frontend expectations if needed, or let frontend handle it.
    } catch (error) {
        console.error('Error fetching videos:', error);
        return NextResponse.json([]);
    }
}
