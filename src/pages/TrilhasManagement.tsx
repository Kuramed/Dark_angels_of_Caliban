import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Course, Category } from '../models/academico.model';

export function TrilhasManagement() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [idCategoria, setIdCategoria] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<{ idCurso: number; ordem: number }[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Carrega categorias e cursos para os selects de associação
    const fetchData = async () => {
      try {
        const catRes = await api.get('/categorias');
        const courseRes = await api.get('/cursos');
        setCategories(catRes.data);
        setCourses(courseRes.data);
      } catch (err) {
        // Fallback simulado caso precise
      }
    };
    fetchData();
  }, []);

  const handleAddCourseToTrilha = (idCurso: number) => {
    if (selectedCourses.some(c => c.idCurso === idCurso)) return;
    setSelectedCourses([...selectedCourses, { idCurso, ordem: selectedCourses.length + 1 }]);
  };

  const handleRemoveCourse = (idCurso: number) => {
    setSelectedCourses(selectedCourses.filter(c => c.idCurso !== idCurso));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/trilhas', {
        titulo,
        descricao,
        idCategoria: Number(idCategoria),
        cursos: selectedCourses
      });
      setMessage('Trilha de conhecimento cadastrada com sucesso!');
      setTitulo('');
      setDescricao('');
      setIdCategoria('');
      setSelectedCourses([]);
    } catch (err) {
      setMessage('Erro ao cadastrar trilha. Verifique os dados.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Gestão de Trilhas de Conhecimento</h2>
      <p className="text-muted">Crie trilhas estruturadas agrupando cursos em sequência[cite: 9].</p>

      {message && <div className="alert alert-info">{message}</div>}

      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Título da Trilha</label>
              <input 
                type="text" 
                className="form-control" 
                value={titulo} 
                onChange={(e) => setTitulo(e.target.value)} 
                required 
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Descrição</label>
              <textarea 
                className="form-control" 
                rows={3} 
                value={descricao} 
                onChange={(e) => setDescricao(e.target.value)} 
                required 
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Categoria Relacionada</label>
              <select 
                className="form-select" 
                value={idCategoria} 
                onChange={(e) => setIdCategoria(e.target.value)} 
                required
              >
                <option value="">Selecione uma categoria...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold">Vincular Cursos à Trilha</label>
              <div className="list-group mb-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {courses.map((course) => (
                  <div className="list-group-item d-flex justify-content-between align-items-center" key={course.id}>
                    <span>{course.title}</span>
                    <button 
                      type="button" 
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleAddCourseToTrilha(course.id)}
                    >
                      Adicionar à Trilha
                    </button>
                  </div>
                ))}
              </div>

              <h6 className="text-muted">Cursos Selecionados (Ordem Sequencial):</h6>
              <ul className="list-group">
                {selectedCourses.map((item, index) => {
                  const courseObj = courses.find(c => c.id === item.idCurso);
                  return (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={item.idCurso}>
                      <span>Passo {index + 1}: {courseObj?.title || `Curso ID ${item.idCurso}`}</span>
                      <button 
                        type="button" 
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveCourse(item.idCurso)}
                      >
                        Remover
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <button type="submit" className="btn btn-success w-100">Salvar Trilha</button>
          </form>
        </div>
      </div>
    </div>
  );
}