import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin-mu.maduraunitedfc.id/api';

        const response = await fetch(`${baseUrl}/v2/news/categories`, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });
        const data = await response.json();

        // data is array of objects: { id, title, slug, status }
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json([]);
    }
}
