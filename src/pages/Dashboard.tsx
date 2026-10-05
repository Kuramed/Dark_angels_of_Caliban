import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // O interceptor do axios adiciona automaticamente o Bearer Token do localStorage
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (err: any) {
        if (err.response?.status === 401) {
          // Se não estiver autorizado, limpa o token e redireciona para o login
          localStorage.removeItem('access_token');
          navigate('/login');
        } else {
          setError('Erro ao carregar os dados do painel.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Painel de Controle (Dashboard)</h2>
          <p className="text-muted">Bem-vindo à área restrita da Plataforma de Cursos.</p>

          {error && <div className="alert alert-danger">{error}</div>}

          {loading ? (
            <div className="text-center my-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
            </div>
          ) : (
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0">Usuários Cadastrados na Plataforma</h5>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0 align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Data de Cadastro</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{new Date(user.createdAt).toLocaleDateString('pt-BR')}</td>
                        </tr>
                      ))}
                      {users.length === 0 && (
                        <tr>
                          <td colSpan={4} className="text-center py-3 text-muted">
                            Nenhum usuário encontrado.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}