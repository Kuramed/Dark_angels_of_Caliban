import React from 'react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="container py-5">
      {/* Hero Section / Banner Principal */}
      <div className="p-5 mb-4 bg-light rounded-3 shadow-sm border text-center">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold mb-3">Bem-vindo à Plataforma de Cursos</h1>
          <p className="col-md-8 fs-4 mx-auto text-muted">
            Gerencie seu aprendizado, explore trilhas de conhecimento e acompanhe seu progresso acadêmico em um só lugar.
          </p>
          <div className="mt-4">
            <Link to="/register" className="btn btn-primary btn-lg me-3 px-4">
              Criar Conta Gratuita
            </Link>
            <Link to="/login" className="btn btn-outline-secondary btn-lg px-4">
              Fazer Login
            </Link>
          </div>
        </div>
      </div>

      {/* Cards de Recursos / Módulos da Plataforma */}
      <div className="row text-center g-4 mt-4">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <div className="fs-1 mb-3">📚</div>
              <h3 className="card-title h5 fw-bold">Módulo Acadêmico</h3>
              <p className="card-text text-muted">
                Explore cursos divididos por categorias, acompanhe aulas organizadas em módulos e siga trilhas estruturadas.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <div className="fs-1 mb-3">📈</div>
              <h3 className="card-title h5 fw-bold">Controle de Progresso</h3>
              <p className="card-text text-muted">
                Marque o status de conclusão das suas aulas e conquiste certificados com códigos exclusivos de verificação.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <div className="fs-1 mb-3">💳</div>
              <h3 className="card-title h5 fw-bold">Planos e Assinaturas</h3>
              <p className="card-text text-muted">
                Gerencie suas assinaturas por meio de um fluxo financeiro integrado e simule pagamentos com segurança.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}