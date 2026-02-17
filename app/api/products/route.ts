import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admin-mu.maduraunitedfc.id/api';
        // Shop might be standard V2 endpoint

        const response = await fetch(`${baseUrl}/v2/shop/products/top-products`, {
            cache: 'no-store'
        });
        const data = await response.json();

        let productsRaw = [];
        if (Array.isArray(data)) {
            productsRaw = data;
        } else {
            productsRaw = data.data || data.result || [];
        }

        console.log("Products Data:", JSON.stringify(data, null, 2)); // DEBUG LOG

        if (Array.isArray(productsRaw)) {
            const products = productsRaw.map((item: any) => ({
                id: item.id,
                name: item.name,
                category: item.category.name || "MERCHANDISE",
                price: item.price_formatted || `Rp ${parseInt(item.price).toLocaleString('id-ID')}`,
                // Handle images
                images: item.images ? item.images.map((img: any) => {
                    const rawUrl = img.image_path || img.url || (img.image ? `${baseUrl.replace('/api', '')}/storage/${img.image}` : null) || img;
                    return typeof rawUrl === 'string' ? rawUrl : '/images/placeholder.png';
                }) : [item.image_url || '/images/placeholder.png']
            })).slice(0, 5); // Take top 5

            return NextResponse.json(products);
        }

        return NextResponse.json([]);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json([]);
    }
}
