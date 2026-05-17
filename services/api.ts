// src/services/api.ts
// Este ficheiro define o endereço do seu backend. 
// Atualmente aponta para o json-server local (porta 4000).

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

    // Se a resposta for vazia (ex: um DELETE), retorna null para não dar erro no JSON
    if (response.status === 204 || response.headers.get('content-length') === '0') {
        return null;
    }

    return response.json();
};