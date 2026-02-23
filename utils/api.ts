export const API_BASE_URL = "https://admin-mu.maduraunitedfc.id/api/v2";

export const fetchAPI = async (endpoint: string) => {
    let url = `${API_BASE_URL}${endpoint}`;
    let headers: HeadersInit = {};

    // Bypass public domain loopback issues during Server-Side Rendering (SSR)
    // Only use INTERNAL_API_URL if we are strictly in production.
    if (typeof window === 'undefined' && process.env.INTERNAL_API_URL && process.env.NODE_ENV === 'production') {
        url = `${process.env.INTERNAL_API_URL}${endpoint}`;
        // Ensure the backend receives the correct host header for routing/CORS 
        headers = { Host: new URL(API_BASE_URL).host };
    }

    try {
        const res = await fetch(url, { headers });
        if (!res.ok) {
            console.error(`API Error: ${res.status} ${res.statusText} for ${endpoint} (URL: ${url})`);
            throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
        }
        return await res.json();
    } catch (error: any) {
        // Fallback to public URL if internal URL fetch fails
        if (url !== `${API_BASE_URL}${endpoint}`) {
            console.warn(`Internal API fetch failed, falling back to public URL: ${API_BASE_URL}${endpoint}`);
            const fbRes = await fetch(`${API_BASE_URL}${endpoint}`);
            if (!fbRes.ok) {
                console.error(`Fallback API Error: ${fbRes.status} ${fbRes.statusText} for ${endpoint}`);
                throw new Error(`Failed to fetch data: ${fbRes.status} ${fbRes.statusText}`);
            }
            return await fbRes.json();
        }
        throw error;
    }
};
