import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Course } from '../models/academico.model';

export function ModuleLessonManagement() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  
  // Estados para Módulo
  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleOrder, setModuleOrder] = useState('1');

  // Estados para Aula
  const [modules, setModules] = useState<any[]>([]);
  const [selectedModuleId, setSelectedModuleId] = useState('');
  const [lessonTitle, setLessonTitle] = useState('');
  const [contentType, setContentType] = useState<'Vídeo' | 'Texto' | 'Quiz'>('Vídeo');
  const [contentUrl, setContentUrl] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('');
  const [lessonOrder, setLessonOrder] = useState('1');

  const [message, setMessage] = useState({ type: '', text: '' });

  // Carrega os cursos disponíveis
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        setCourses(response.data);
      } catch (err) {
        // Fallback de dados para simulação
        setCourses([
          { id: 1, title: 'Desenvolvimento Web Fullstack', description: 'Curso completo', level: 'Iniciante', totalLessons: 10, totalHours: 40 }
        ]);
      }
    };
    fetchCourses();
  }, []);

  // Simula o carregamento de módulos do curso selecionado
  useEffect(() => {
    if (selectedCourseId) {
      // Aqui você faria um GET /courses/:id/modules
      setModules([
        { id: 1, title: 'Introdução ao React', order: 1 },
        { id: 2, title: 'Componentes e Props', order: 2 }
      ]);
    } else {
      setModules([]);
    }
  }, [selectedCourseId]);

  const handleCreateModule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post(`/courses/${selectedCourseId}/modules`, {
        title: moduleTitle,
        order: Number(moduleOrder)
      });
      setMessage({ type: 'success', text: 'Módulo adicionado com sucesso!' });
      setModuleTitle('');
      setModuleOrder('1');
    } catch (err) {
      setMessage({ type: 'success', text: 'Módulo adicionado com sucesso (Simulação)!' });
    }
  };

  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post(`/modules/${selectedModuleId}/lessons`, {
        title: lessonTitle,
        contentType,
        contentUrl,
        durationMinutes: Number(durationMinutes),
        order: Number(lessonOrder)
      });
      setMessage({ type: 'success', text: 'Aula adicionada com sucesso!' });
      setLessonTitle('');
      setContentUrl('');
      setDurationMinutes('');
      setLessonOrder('1');
    } catch (err) {
      setMessage({ type: 'success', text: 'Aula adicionada com sucesso (Simulação)!' });
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Estrutura de Módulos e Aulas</h2>
      <p className="text-muted">Organize o conteúdo programático dos cursos respeitando a ordenação sequencial.</p>

      {message.text && (
        <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
          {message.text}
          <button type="button" className="btn-close" onClick={() => setMessage({ type: '', text: '' })}></button>
        </div>
      )}

      {/* Seleção do Curso Pai */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <label className="form-label fw-bold">Selecione o Curso para Gerenciar:</label>
          <select 
            className="form-select"
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
          >
            <option value="">Escolha um curso...</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>{course.title}</option>
            ))}
          </select>
        </div>
      </div>

      {selectedCourseId && (
        <div className="row g-4">
          {/* Formulário de Módulos */}
          <div className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-white">
                <h5 className="mb-0">1. Adicionar Módulo ao Curso</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleCreateModule}>
                  <div className="mb-3">
                    <label className="form-label">Título do Módulo</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={moduleTitle} 
                      onChange={(e) => setModuleTitle(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Ordem de Sequência</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      value={moduleOrder} 
                      onChange={(e) => setModuleOrder(e.target.value)} 
                      required 
                      min="1" 
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Salvar Módulo</button>
                </form>
              </div>
            </div>
          </div>

          {/* Formulário de Aulas */}
          <div className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-white">
                <h5 className="mb-0">2. Adicionar Aula ao Módulo</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleCreateLesson}>
                  <div className="mb-3">
                    <label className="form-label">Selecione o Módulo</label>
                    <select 
                      className="form-select"
                      value={selectedModuleId}
                      onChange={(e) => setSelectedModuleId(e.target.value)}
                      required
                    >
                      <option value="">Escolha um módulo...</option>
                      {modules.map((mod) => (
                        <option key={mod.id} value={mod.id}>Módulo {mod.order}: {mod.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Título da Aula</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={lessonTitle} 
                      onChange={(e) => setLessonTitle(e.target.value)} 
                      required 
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Tipo de Conteúdo</label>
                      <select 
                        className="form-select"
                        value={contentType}
                        onChange={(e) => setContentType(e.target.value as any)}
                      >
                        <option value="Vídeo">Vídeo</option>
                        <option value="Texto">Texto</option>
                        <option value="Quiz">Quiz</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Duração (Minutos)</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        value={durationMinutes} 
                        onChange={(e) => setDurationMinutes(e.target.value)} 
                        required 
                        min="1" 
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">URL do Conteúdo</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="https://..." 
                      value={contentUrl} 
                      onChange={(e) => setContentUrl(e.target.value)} 
                      required 
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Ordem da Aula no Módulo</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      value={lessonOrder} 
                      onChange={(e) => setLessonOrder(e.target.value)} 
                      required 
                      min="1" 
                    />
                  </div>

                  <button type="submit" className="btn btn-success w-100">Salvar Aula</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}