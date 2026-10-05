import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Certificate } from '../models/curadoria.model';

export function ProgressAndCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Exemplo de requisição para buscar os certificados e progresso do usuário logado
        const response = await api.get('/certificates');
        setCertificates(response.data);
      } catch (err: any) {
        setError('Não foi possível carregar os dados de progresso e certificados.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <h2>Meu Progresso e Certificados</h2>
        <p className="text-muted">Acompanhe suas conquistas acadêmicas e acesse seus certificados validados.</p>
      </div>

      {error && <div className="alert alert-warning">{error}</div>}

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      ) : (
        <div>
          {/* Seção de Certificados Emitidos */}
          <h4 className="mb-3">Certificados Conquistados</h4>
          <div className="row g-4">
            {certificates.map((cert) => (
              <div className="col-md-6" key={cert.idCertificado}>
                <div className="card shadow-sm border-primary">
                  <div className="card-body">
                    <span className="badge bg-success mb-2">Certificado Válido</span>
                    <h5 className="card-title fw-bold">{cert.cursoTitulo}</h5>
                    <p className="card-text text-muted small mb-2">
                      Emitido em: {new Date(cert.dataEmissao).toLocaleDateString('pt-BR')}
                    </p>
                    <div className="alert alert-light border py-2 px-3 small mb-3">
                      <strong>Código de Verificação:</strong> <code>{cert.codigoVerificacao}</code>
                    </div>
                    <button className="btn btn-outline-primary btn-sm w-100">
                      Visualizar Certificado em PDF
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {certificates.length === 0 && !error && (
              <div className="col-12 text-center py-4 text-muted border rounded bg-light">
                Nenhum certificado emitido ainda. Conclua um curso para gerar o seu!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}