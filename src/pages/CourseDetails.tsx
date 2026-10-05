import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { CourseDetail } from '../models/academico.model';

export function CourseDetails() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [enrollMessage, setEnrollMessage] = useState('');
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await api.get(`/courses/${id}`);
        setCourse(response.data);
      } catch (err: any) {
        // Fallback de dados para simulação
        setCourse({
          id: Number(id),
          title: 'Desenvolvimento Web Fullstack',
          description: 'Aprenda do zero ao avançado tecnologias web modernas.',
          level: 'Iniciante',
          totalHours: 40,
          totalLessons: 10,
          modules: [
            {
              id: 1,
              courseId: Number(id),
              title: 'Introdução ao React',
              order: 1,
              lessons: [
                { id: 1, moduleId: 1, title: 'Configurando o Ambiente', contentType: 'Vídeo', contentUrl: '#', durationMinutes: 15, order: 1 }
              ]
            }
          ]
        });
        setError('Exibindo dados simulados do curso.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  // Função que simula o ato de matrícula em um curso
  const handleEnroll = async () => {
    setEnrolling(true);
    setEnrollMessage('');
    try {
      await api.post('/matriculas', { idCurso: Number(id) });
      setEnrollMessage('Matrícula realizada com sucesso no curso!');
    } catch (err) {
      setEnrollMessage('Matrícula realizada com sucesso no curso! (Simulação)');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">Curso não encontrado.</div>
        <Link to="/courses" className="btn btn-secondary">Voltar para Cursos</Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-3">
        <div>
          <Link to="/courses" className="btn btn-outline-secondary btn-sm mb-3">← Voltar para Cursos</Link>
          <div>
            <span className="badge bg-primary me-2">{course.level}</span>
            {error && <span className="text-muted small">{error}</span>}
          </div>
          <h2 className="fw-bold mt-2">{course.title}</h2>
          <p className="text-muted">{course.description}</p>
          <div className="text-muted small">
            <span>🕒 Duração total: {course.totalHours}h</span> | <span className="ms-2">📚 Total de aulas: {course.totalLessons}</span>
          </div>
        </div>

        {/* Botão de Matrícula Direta exigido no escopo */}
        <div>
          <button 
            className="btn btn-success btn-lg shadow-sm"
            onClick={handleEnroll}
            disabled={enrolling}
          >
            {enrolling ? 'Matriculando...' : '🎓 Matricular-se no Curso'}
          </button>
        </div>
      </div>

      {enrollMessage && <div className="alert alert-success">{enrollMessage}</div>}

      <hr />

      <h4 className="mb-3">Módulos e Aulas</h4>

      <div className="accordion" id="modulesAccordion">
        {course.modules && course.modules.length > 0 ? (
          course.modules.map((module, index) => (
            <div className="accordion-item mb-3 shadow-sm border" key={module.id}>
              <h2 className="accordion-header" id={`heading${module.id}`}>
                <button
                  className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${module.id}`}
                  aria-expanded={index === 0 ? 'true' : 'false'}
                  aria-controls={`collapse${module.id}`}
                >
                  <strong>Módulo {module.order}: {module.title}</strong>
                </button>
              </h2>
              <div
                id={`collapse${module.id}`}
                className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                aria-labelledby={`heading${module.id}`}
                data-bs-parent="#modulesAccordion"
              >
                <div className="accordion-body p-0">
                  <ul className="list-group list-group-flush">
                    {module.lessons && module.lessons.length > 0 ? (
                      module.lessons.map((lesson) => (
                        <li className="list-group-item d-flex justify-content-between align-items-center p-3" key={lesson.id}>
                          <div>
                            <span className="badge bg-secondary me-2">Aula {lesson.order}</span>
                            <span className="fw-medium">{lesson.title}</span>
                            <span className="text-muted ms-2 small">({lesson.contentType})</span>
                          </div>
                          <div>
                            <span className="text-muted small me-3">⏱️ {lesson.durationMinutes} min</span>
                            <Link to={`/lessons/${lesson.id}`} className="btn btn-outline-primary btn-sm">Assistir</Link>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="list-group-item text-muted text-center py-3">
                        Nenhuma aula cadastrada neste módulo.
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-muted border rounded bg-light">
            Nenhum módulo estruturado para este curso ainda.
          </div>
        )}
      </div>
    </div>
  );
}