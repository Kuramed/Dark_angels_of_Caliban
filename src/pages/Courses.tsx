import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Course, Category } from '../models/academico.model';

export function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Busca os cursos e as categorias em paralelo
        const [coursesRes, categoriesRes] = await Promise.all([
          api.get('/courses'),
          api.get('/categories')
        ]);
        setCourses(coursesRes.data);
        setCategories(categoriesRes.data);
      } catch (err: any) {
        // Fallback de dados para simulação caso a API não esteja ativa
        setCourses([
          { id: 1, title: 'Desenvolvimento Web Fullstack', description: 'Curso completo de front e back-end', level: 'Iniciante', totalLessons: 10, totalHours: 40, category: { id: 1, name: 'Desenvolvimento Web', description: 'Prog' } },
          { id: 2, title: 'UI/UX Design Avançado', description: 'Design de interfaces modernas', level: 'Avançado', totalLessons: 8, totalHours: 30, category: { id: 2, name: 'Design', description: 'UI' } }
        ]);
        setCategories([
          { id: 1, name: 'Desenvolvimento Web', description: 'Prog' },
          { id: 2, name: 'Design', description: 'UI' }
        ]);
        setError('Exibindo dados simulados de cursos e categorias.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtra os cursos com base na categoria selecionada
  const filteredCourses = selectedCategory 
    ? courses.filter(course => course.category?.id === Number(selectedCategory) || (course as any).categoryId === Number(selectedCategory))
    : courses;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h2>Módulo Acadêmico: Cursos</h2>
          <p className="text-muted mb-0">Explore os cursos disponíveis e filtre por categoria.</p>
        </div>

        {/* Filtro por Categoria */}
        <div className="w-auto" style={{ minWidth: '250px' }}>
          <select 
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Todas as Categorias</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {error && <div className="alert alert-warning py-2">{error}</div>}

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {filteredCourses.map((course) => (
            <div className="col-md-4" key={course.id}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-secondary">{course.level}</span>
                    {course.category && <small className="text-primary fw-bold">{course.category.name}</small>}
                  </div>
                  <h4 className="card-title h5 fw-bold">{course.title}</h4>
                  <p className="card-text text-muted">{course.description}</p>
                </div>
                <div className="card-footer bg-white border-top-0 d-flex justify-content-between align-items-center pb-3">
                  <small className="text-muted">🕒 {course.totalHours}h | 📚 {course.totalLessons} aulas</small>
                  <a href={`/courses/${course.id}`} className="btn btn-outline-primary btn-sm">Ver Detalhes</a>
                </div>
              </div>
            </div>
          ))}

          {filteredCourses.length === 0 && (
            <div className="col-12 text-center py-5 text-muted border rounded bg-light">
              Nenhum curso encontrado para esta categoria.
            </div>
          )}
        </div>
      )}
    </div>
  );
}