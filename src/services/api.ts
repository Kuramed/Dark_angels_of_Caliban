import axios from 'axios';

export const api = axios.create({
  // Remova o localhost e cole o URL do Codespaces (sem a barra final)
  baseURL: 'https://orange-couscous-v6wp55rx56692x7q9-3000.app.github.dev',
});

// Interceptor opcional para injetar o Token JWT automaticamente nas requisições protegidas
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});