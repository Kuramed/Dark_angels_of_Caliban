// Se estiver a testar localmente ou via Codespaces, aponte para a porta 3000
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const apiFetch = async (endpoint: string, options?: RequestInit) => {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${API_URL}${cleanEndpoint}`;

    // Recupera o token JWT salvo no navegador (caso exista)
    const token = localStorage.getItem('access_token');

    const defaultHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    // Se houver um token, adiciona automaticamente no cabeçalho Authorization
    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

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
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error("Erro de conexão:", error);
        if (config.method === 'GET') return [];
        return null;
    }
};