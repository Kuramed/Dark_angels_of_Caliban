import { Routes, Route, Navigate } from 'react-router-dom';

// --- Módulo CORE ---
import { UsuarioTable } from '../pages/Core/Usuarios/UsuarioTable';
import { UsuarioForm } from '../pages/Core/Usuarios/UsuarioForm';
import { CategoriaTable } from '../pages/Core/Categorias/CategoriaTable';
import { CategoriaForm } from '../pages/Core/Categorias/CategoriaForm';
import { CursoTable } from '../pages/Core/Cursos/CursoTable';
import { CursoForm } from '../pages/Core/Cursos/CursoForm';

// --- Módulo CONTEÚDO ---
import { ModuloTable } from '../pages/Conteudo/Modulos/ModuloTable';
import { ModuloForm } from '../pages/Conteudo/Modulos/ModuloForm';
import { AulaTable } from '../pages/Conteudo/Aulas/AulaTable';
import { AulaForm } from '../pages/Conteudo/Aulas/AulaForm';

// --- Módulo CURADORIA ---
import { TrilhaTable } from '../pages/Curadoria/Trilhas/TrilhaTable';
import { TrilhaForm } from '../pages/Curadoria/Trilhas/TrilhaForm';

// --- Módulo NEGÓCIO (Ajustado para ficheiros diretos na pasta) ---
import { PlanoTable } from '../pages/Negocio/PlanoTable';
import { PlanoForm } from '../pages/Negocio/PlanoForm';

// --- Módulo INTERAÇÃO (Ajustado para a sua estrutura real) ---
import { MatriculaTable } from '../pages/Matriculas/MatriculaTable';
import { MatriculaForm } from '../pages/Matriculas/MatriculaForm';
import { AvaliacaoTable } from '../pages/Avaliacoes/AvaliacaoTable';
import { AvaliacaoForm } from '../pages/Avaliacoes/AvaliacaoForm';

export function AppRouters() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/usuarios" />} />

            {/* UTILIZADORES */}
            <Route path="/usuarios" element={<UsuarioTable />} />
            <Route path="/usuarios/novo" element={<UsuarioForm />} />
            <Route path="/usuarios/editar/:id" element={<UsuarioForm />} />

            {/* CATEGORIAS */}
            <Route path="/categorias" element={<CategoriaTable />} />
            <Route path="/categorias/novo" element={<CategoriaForm />} />
            <Route path="/categorias/editar/:id" element={<CategoriaForm />} />

            {/* CURSOS */}
            <Route path="/cursos" element={<CursoTable />} />
            <Route path="/cursos/novo" element={<CursoForm />} />
            <Route path="/cursos/editar/:id" element={<CursoForm />} />

            {/* CONTEÚDO */}
            <Route path="/modulos" element={<ModuloTable />} />
            <Route path="/modulos/novo" element={<ModuloForm />} />
            <Route path="/modulos/editar/:id" element={<ModuloForm />} />
            <Route path="/aulas" element={<AulaTable />} />
            <Route path="/aulas/novo" element={<AulaForm />} />
            <Route path="/aulas/editar/:id" element={<AulaForm />} />

            {/* TRILHAS E PLANOS */}
            <Route path="/trilhas" element={<TrilhaTable />} />
            <Route path="/trilhas/novo" element={<TrilhaForm />} />
            <Route path="/trilhas/editar/:id" element={<TrilhaForm />} />
            <Route path="/planos" element={<PlanoTable />} />
            <Route path="/planos/novo" element={<PlanoForm />} />
            <Route path="/planos/editar/:id" element={<PlanoForm />} />

            {/* MATRÍCULAS E AVALIAÇÕES */}
            <Route path="/matriculas" element={<MatriculaTable />} />
            <Route path="/matriculas/novo" element={<MatriculaForm />} />
            <Route path="/matriculas/editar/:id" element={<MatriculaForm />} />
            <Route path="/avaliacoes" element={<AvaliacaoTable />} />
            <Route path="/avaliacoes/novo" element={<AvaliacaoForm />} />
        </Routes>
    );
}