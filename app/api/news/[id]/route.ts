import { NextResponse } from 'next/server';
import { getNewsDetail } from '@/lib/news';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const newsDetail = await getNewsDetail(id);

        if (!newsDetail) {
            return NextResponse.json({ error: 'News not found' }, { status: 404 });
        }

        return NextResponse.json(newsDetail);

    } catch (error) {
        console.error('Error fetching news detail:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
