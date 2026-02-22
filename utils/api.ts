export const API_BASE_URL = "https://admin-mu.maduraunitedfc.id/api/v2";

export const fetchAPI = async (endpoint: string) => {
    let url = `${API_BASE_URL}${endpoint}`;
    let headers: HeadersInit = {};

    // Bypass public domain loopback issues during Server-Side Rendering (SSR)
    if (typeof window === 'undefined' && process.env.INTERNAL_API_URL) {
        url = `${process.env.INTERNAL_API_URL}${endpoint}`;
        // Ensure the backend receives the correct host header for routing/CORS 
        headers = { Host: new URL(API_BASE_URL).host };
    }

    const res = await fetch(url, { headers });
    if (!res.ok) {
        console.error(`API Error: ${res.status} ${res.statusText} for ${endpoint}`);
        throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }
    return res.json();
};
