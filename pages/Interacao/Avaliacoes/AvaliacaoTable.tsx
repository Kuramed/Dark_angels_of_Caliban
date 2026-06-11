import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IAvaliacao } from "../../../models/interacao.model";
import { AvaliacaoService } from "../../../services/interacao.service";

export function AvaliacaoTable() {
  const [avaliacoes, setAvaliacoes] = useState<IAvaliacao[]>([]);

  useEffect(() => {
    AvaliacaoService.listarPorCurso("").then(setAvaliacoes);
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Avaliações dos Cursos</h2>
        <Link to="/avaliacoes/novo" className="btn btn-primary">
          Nova Avaliação
        </Link>
      </div>

      <table className="table table-striped border shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Nota</th>
            <th>Comentário</th>
            <th>ID Curso</th>
            <th>ID Aluno</th>
          </tr>
        </thead>
        <tbody>
          {avaliacoes.map((av) => (
            <tr key={av.id_avaliacao}>
              <td>
                <strong>{av.nota} / 5</strong>
              </td>
              <td className="small">{av.comentario}</td>
              <td>{av.id_curso}</td>
              <td>{av.id_usuario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
