import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin-mu.maduraunitedfc.id/api';

        const searchParams = request.nextUrl.searchParams;
        const category = searchParams.get('category');

        const query = category ? `?category=${category}` : '';

        const response = await fetch(`${baseUrl}/v2/news/tags${query}`, {
            next: { revalidate: 0 } // No cache for now to debug filter
        });
        if (!response.ok) {
            const text = await response.text();
            console.error(`Backend error (${response.status}):`, text.substring(0, 200)); // Log first 200 chars
            return NextResponse.json([]);
        }

        let data;
        try {
            data = await response.json();
        } catch (e) {
            const text = await response.text();
            console.error('Error parsing JSON:', e);
            console.error('Response body prefix:', text.substring(0, 500));
            return NextResponse.json([]);
        }

        // data is array of strings: ["tag1", "tag2", ...]
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching tags:', error);
        return NextResponse.json([]);
    }
}
