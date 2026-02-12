import { NextResponse } from 'next/server';

export async function GET() {
    // Return mock data immediately - no external fetch
    const mockSliders = [
        {
            id: 1,
            name: "MADURA UNITED FC Sape Kerrab",
            image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1920&auto=format&fit=crop",
            link: "/media/berita",
            status: 1
        },
        {
            id: 2,
            name: "SUPPORT YOUR LOCAL TEAM",
            image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1920&auto=format&fit=crop",
            link: "/pertandingan/jadwal",
            status: 1
        }
    ];

    return NextResponse.json(mockSliders);
}
