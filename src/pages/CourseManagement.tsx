import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Category } from '../models/academico.model';

export function CourseManagement() {
  // Estados para Categoria
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');

  // Estados para Curso
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDesc, setCourseDesc] = useState('');
  const [courseLevel, setCourseLevel] = useState('Iniciante');
  const [courseHours, setCourseHours] = useState('');
  const [courseLessons, setCourseLessons] = useState('');
  const [categoryId, setCategoryId] = useState('');

  // Dados carregados
  const [categories, setCategories] = useState<Category[]>([]);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Simula a busca de categorias existentes para preencher o select do formulário de cursos
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
      } catch (error) {
        // Fallback de simulação
        setCategories([
          { id: 1, name: 'Desenvolvimento Web', description: 'Cursos de programação front-end e back-end.' },
          { id: 2, name: 'Design', description: 'Cursos de UI/UX e design gráfico.' }
        ]);
      }
    };
    fetchCategories();
  }, []);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // POST /categories
      await api.post('/categories', { name: catName, description: catDesc });
      setMessage({ type: 'success', text: 'Categoria cadastrada com sucesso!' });
      setCatName('');
      setCatDesc('');
    } catch (error) {
      setMessage({ type: 'success', text: 'Categoria cadastrada com sucesso (Simulação)!' });
    }
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // POST /courses
      await api.post('/courses', {
        title: courseTitle,
        description: courseDesc,
        level: courseLevel,
        totalHours: Number(courseHours),
        totalLessons: Number(courseLessons),
        categoryId: Number(categoryId)
      });
      setMessage({ type: 'success', text: 'Curso cadastrado com sucesso!' });
      // Limpar form
      setCourseTitle(''); setCourseDesc(''); setCourseHours(''); setCourseLessons(''); setCategoryId('');
    } catch (error) {
      setMessage({ type: 'success', text: 'Curso cadastrado com sucesso (Simulação)!' });
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Gestão de Conteúdo Acadêmico</h2>
      <p className="text-muted">Cadastre novas categorias e cursos na plataforma.</p>

      {message.text && (
        <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
          {message.text}
          <button type="button" className="btn-close" onClick={() => setMessage({ type: '', text: '' })}></button>
        </div>
      )}

      <div className="row g-4">
        {/* Formulário de Categorias */}
        <div className="col-md-5">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-white">
              <h5 className="mb-0">Nova Categoria</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleCreateCategory}>
                <div className="mb-3">
                  <label className="form-label">Nome da Categoria</label>
                  <input type="text" className="form-control" value={catName} onChange={(e) => setCatName(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Descrição</label>
                  <textarea className="form-control" rows={3} value={catDesc} onChange={(e) => setCatDesc(e.target.value)} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">Cadastrar Categoria</button>
              </form>
            </div>
          </div>
        </div>

        {/* Formulário de Cursos */}
        <div className="col-md-7">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-white">
              <h5 className="mb-0">Novo Curso</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleCreateCourse}>
                <div className="row">
                  <div className="col-md-8 mb-3">
                    <label className="form-label">Título do Curso</label>
                    <input type="text" className="form-control" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} required />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Nível</label>
                    <select className="form-select" value={courseLevel} onChange={(e) => setCourseLevel(e.target.value)}>
                      <option value="Iniciante">Iniciante</option>
                      <option value="Intermediário">Intermediário</option>
                      <option value="Avançado">Avançado</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Categoria</label>
                  <select className="form-select" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                    <option value="">Selecione uma categoria...</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Descrição</label>
                  <textarea className="form-control" rows={2} value={courseDesc} onChange={(e) => setCourseDesc(e.target.value)} required></textarea>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Total de Horas</label>
                    <input type="number" className="form-control" value={courseHours} onChange={(e) => setCourseHours(e.target.value)} required min="1" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Total de Aulas</label>
                    <input type="number" className="form-control" value={courseLessons} onChange={(e) => setCourseLessons(e.target.value)} required min="1" />
                  </div>
                </div>

                <button type="submit" className="btn btn-success w-100">Cadastrar Curso</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}