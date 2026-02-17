import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin-mu.maduraunitedfc.id/api';

        const response = await fetch(`${baseUrl}/v2/gallery/categories`, {
            cache: 'no-store'
        });
        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching gallery categories:', error);
        return NextResponse.json([]);
    }
}
