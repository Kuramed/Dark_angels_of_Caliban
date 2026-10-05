import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

// Interface para tipar os usuários
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

// Interface para tipar os cursos
interface Curso {
  id: number;
  nome: string; 
  descricao: string;
}

export function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // PROTEÇÃO DE ROTA: Verifica se existe um token salvo
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
      return; 
    }

    const fetchData = async () => {
      try {
        // Busca usuários e cursos simultaneamente
        const [usersResponse, cursosResponse] = await Promise.all([
          api.get('/users'),
          api.get('/cursos')
        ]);
        
        // LOG PARA DEBUG: Veja no console do navegador o que está chegando
        console.log('Resposta de Usuários da API:', usersResponse.data);
        console.log('Resposta de Cursos da API:', cursosResponse.data);
        
        // Salva os dados no estado
        setUsers(usersResponse.data);
        setCursos(cursosResponse.data);

      } catch (err: any) {
        // Se o token for inválido ou expirado (Status 401)
        if (err.response?.status === 401) {
          localStorage.removeItem('access_token');
          navigate('/login');
        } else {
          setError('Erro ao carregar os dados da plataforma.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) return <div className="container mt-4">Carregando painel...</div>;
  if (error) return <div className="container mt-4 text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2>Painel de Controle (Dashboard)</h2>
      <p>Bem-vindo à área restrita da Plataforma de Cursos.</p>

      {/* Tabela de Usuários */}
      <div className="card mb-4">
        <div className="card-header fw-bold">Usuários Cadastrados na Plataforma</div>
        <div className="card-body">
          <table className="table table-striped table-hover mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Data de Cadastro</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) && users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.createdAt}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center text-muted">
                    Nenhum usuário cadastrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabela de Cursos */}
      <div className="card mb-4">
        <div className="card-header fw-bold">Cursos Disponíveis</div>
        <div className="card-body">
          <table className="table table-striped table-hover mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome do Curso</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {/* Verificação de segurança: checa se 'cursos' é realmente uma lista */}
              {Array.isArray(cursos) && cursos.length > 0 ? (
                cursos.map((curso) => (
                  <tr key={curso.id}>
                    <td>{curso.id}</td>
                    <td>{curso.nome}</td> 
                    <td>{curso.descricao}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center text-muted">
                    Nenhum curso encontrado ou formato de dado incorreto (verifique o console).
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}