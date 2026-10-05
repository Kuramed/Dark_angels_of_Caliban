import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// Interceptor opcional para injetar o Token JWT automaticamente nas requisições protegidas
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});