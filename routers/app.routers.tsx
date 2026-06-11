import { Routes, Route, Navigate } from 'react-router-dom';

import { UsuarioTable } from '../pages/Core/Usuarios/UsuarioTable';
import { UsuarioForm } from '../pages/Core/Usuarios/UsuarioForm';
import { CategoriaTable } from '../pages/Core/Categorias/CategoriaTable';
import { CategoriaForm } from '../pages/Core/Categorias/CategoriaForm';
import { CursoTable } from '../pages/Core/Cursos/CursoTable';
import { CursoForm } from '../pages/Core/Cursos/CursoForm';
import { ModuloTable } from '../pages/Conteudo/Modulos/ModuloTable';
import { ModuloForm } from '../pages/Conteudo/Modulos/ModuloForm';
import { AulaTable } from '../pages/Conteudo/Aulas/AulaTable';
import { AulaForm } from '../pages/Conteudo/Aulas/AulaForm';
import { TrilhaTable } from '../pages/Curadoria/Trilhas/TrilhaTable';
import { TrilhaForm } from '../pages/Curadoria/Trilhas/TrilhaForm';
import { PlanoTable } from '../pages/Negocio/PlanoTable';
import { PlanoForm } from '../pages/Negocio/PlanoForm';
import { MatriculaTable } from '../pages/Interacao/Matriculas/MatriculaTable';
import { MatriculaForm } from '../pages/Interacao/Matriculas/MatriculaForm';
import { AvaliacaoTable } from '../pages/Interacao/Avaliacoes/AvaliacaoTable';
import { AvaliacaoForm } from '../pages/Interacao/Avaliacoes/AvaliacaoForm';

export function AppRouters() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/usuarios" />} />
            <Route path="/usuarios" element={<UsuarioTable />} />
            <Route path="/usuarios/novo" element={<UsuarioForm />} />
            <Route path="/usuarios/editar/:id" element={<UsuarioForm />} />
            <Route path="/categorias" element={<CategoriaTable />} />
            <Route path="/categorias/novo" element={<CategoriaForm />} />
            <Route path="/categorias/editar/:id" element={<CategoriaForm />} />
            <Route path="/cursos" element={<CursoTable />} />
            <Route path="/cursos/novo" element={<CursoForm />} />
            <Route path="/cursos/editar/:id" element={<CursoForm />} />
            <Route path="/modulos" element={<ModuloTable />} />
            <Route path="/modulos/novo" element={<ModuloForm />} />
            <Route path="/modulos/editar/:id" element={<ModuloForm />} />
            <Route path="/aulas" element={<AulaTable />} />
            <Route path="/aulas/novo" element={<AulaForm />} />
            <Route path="/aulas/editar/:id" element={<AulaForm />} />
            <Route path="/trilhas" element={<TrilhaTable />} />
            <Route path="/trilhas/novo" element={<TrilhaForm />} />
            <Route path="/trilhas/editar/:id" element={<TrilhaForm />} />
            <Route path="/planos" element={<PlanoTable />} />
            <Route path="/planos/novo" element={<PlanoForm />} />
            <Route path="/planos/editar/:id" element={<PlanoForm />} />
            <Route path="/matriculas" element={<MatriculaTable />} />
            <Route path="/matriculas/novo" element={<MatriculaForm />} />
            <Route path="/matriculas/editar/:id" element={<MatriculaForm />} />
            <Route path="/avaliacoes" element={<AvaliacaoTable />} />
            <Route path="/avaliacoes/novo" element={<AvaliacaoForm />} />
        </Routes>
    );
}