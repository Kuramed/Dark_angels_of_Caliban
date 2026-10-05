import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Course } from '../models/academico.model';

export function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Substitua '/courses' pela rota correspondente do seu back-end NestJS, se houver
        const response = await api.get('/courses');
        setCourses(response.data);
      } catch (err: any) {
        // Se a rota do back-end ainda não estiver criada, simulamos dados estáticos ou exibimos aviso amigável
        setError('Não foi possível carregar os cursos do servidor no momento.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Módulo Acadêmico: Cursos</h2>
          <p className="text-muted">Explore os cursos disponíveis e trilhas de conhecimento.</p>
        </div>
      </div>

      {error && <div className="alert alert-warning">{error}</div>}

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {courses.map((course) => (
            <div className="col-md-4" key={course.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <span className="badge bg-secondary mb-2">{course.level}</span>
                  <h4 className="card-title h5">{course.title}</h4>
                  <p className="card-text text-muted">{course.description}</p>
                </div>
                <div className="card-footer bg-white border-top-0 d-flex justify-content-between align-items-center pb-3">
                  <small className="text-muted">🕒 {course.totalHours}h | 📚 {course.totalLessons} aulas</small>
                  <button className="btn btn-outline-primary btn-sm">Ver Detalhes</button>
                </div>
              </div>
            </div>
          ))}

          {courses.length === 0 && !error && (
            <div className="col-12 text-center py-5 text-muted">
              Nenhum curso cadastrado no momento.
            </div>
          )}
        </div>
      )}
    </div>
  );
}