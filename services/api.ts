
export const API_URL = 'http://localhost:4000';

export const apiFetch = async (endpoint: string, options?: RequestInit) => {
    const url = `${API_URL}${endpoint}`;
    
    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options?.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    if (response.status === 204 || response.headers.get('content-length') === '0') {
        return null;
    }

    return response.json();
};