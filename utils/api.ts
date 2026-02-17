export const API_BASE_URL = "https://admin-mu.maduraunitedfc.id/api/v2";

export const fetchAPI = async (endpoint: string) => {
    const res = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!res.ok) {
        console.error(`API Error: ${res.status} ${res.statusText} for ${endpoint}`);
        throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }
    return res.json();
};
