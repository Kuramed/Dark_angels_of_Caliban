import { NavLink } from 'react-router-dom';

export function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/">Plataforma Cursos</NavLink>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {/* Menu CORE */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="coreDropdown" role="button" data-bs-toggle="dropdown">
                Core
              </a>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/usuarios">Utilizadores</NavLink></li>
                <li><NavLink className="dropdown-item" to="/categorias">Categorias</NavLink></li>
                <li><NavLink className="dropdown-item" to="/cursos">Cursos</NavLink></li>
              </ul>
            </li>

            {/* Menu CONTEÚDO */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="contentDropdown" role="button" data-bs-toggle="dropdown">
                Conteúdo
              </a>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/modulos">Módulos</NavLink></li>
                <li><NavLink className="dropdown-item" to="/aulas">Aulas</NavLink></li>
              </ul>
            </li>

            {/* Menu CURADORIA */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/trilhas">Trilhas</NavLink>
            </li>

            {/* Menu NEGÓCIO */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/planos">Planos</NavLink>
            </li>
          </ul>

          <div className="d-flex">
            <span className="navbar-text text-light small me-3">Painel Admin</span>
            <button className="btn btn-outline-light btn-sm">Sair</button>
          </div>
        </div>
      </div>
    </nav>
  );
}