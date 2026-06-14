export const API_URL = 'http://localhost:4000';

export const apiFetch = async (endpoint: string, options?: RequestInit) => {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${API_URL}${cleanEndpoint}`;

    const defaultHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...(options?.headers || {}),
        },
    };

    try {
        const response = await fetch(url, config);

        if (response.status === 204) return null;

        if (!response.ok) {
            console.error(`Erro na API: ${response.status}`);
            if (config.method === 'GET') return [];
            return {};
        }

        return await response.json();
    } catch (error) {
        console.error("Erro de conexão:", error);
        if (config.method === 'GET') return [];
        return {};
    }
};