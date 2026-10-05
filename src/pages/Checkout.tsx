import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Plan } from '../models/negocio.model';

export function Checkout() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'Cartão de Crédito' | 'Pix' | 'Boleto'>('Cartão de Crédito');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await api.get('/plans');
        setPlans(response.data);
      } catch (err: any) {
        // Fallback de dados para simulação caso a rota do back-end ainda não esteja populada
        setPlans([
          { idPlano: 1, nome: 'Plano Mensal', descricao: 'Acesso total a todos os cursos por 1 mês.', preco: 49.90, duracaoMeses: 1 },
          { idPlano: 2, nome: 'Plano Anual', descricao: 'Acesso total com desconto especial por 12 meses.', preco: 499.90, duracaoMeses: 12 }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    setError('');
    setSuccessMessage('');

    try {
      // Simulação do envio do pagamento para a API
      await api.post('/payments', {
        idPlano: selectedPlan.idPlano,
        valorPago: selectedPlan.preco,
        metodoPagamento: paymentMethod,
        idTransacaoGateway: `TRX-${Math.floor(Math.random() * 1000000)}`
      });

      setSuccessMessage(`Assinatura do ${selectedPlan.nome} realizada com sucesso! Transação aprovada.`);
      setSelectedPlan(null);
    } catch (err: any) {
      // Caso ocorra falha na API, simulamos o sucesso visual para fins didáticos do fluxo
      setSuccessMessage(`Assinatura do ${selectedPlan.nome} simulada com sucesso via ${paymentMethod}!`);
      setSelectedPlan(null);
    }
  };

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <h2>Módulo Financeiro: Planos e Assinaturas</h2>
        <p className="text-muted">Escolha o plano ideal para a sua jornada de aprendizado e realize o pagamento.</p>
      </div>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {plans.map((plan) => (
            <div className="col-md-6" key={plan.idPlano}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body d-flex flex-column">
                  <h4 className="card-title fw-bold">{plan.nome}</h4>
                  <p className="card-text text-muted">{plan.descricao}</p>
                  <h3 className="text-primary fw-bold my-3">
                    R$ {plan.preco.toFixed(2)} <small className="text-muted fs-6">/ {plan.duracaoMeses} mês(es)</small>
                  </h3>
                  <button 
                    className="btn btn-primary mt-auto w-100"
                    onClick={() => setSelectedPlan(plan)}
                  >
                    Assinar Agora
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Simulação de Pagamento */}
      {selectedPlan && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Checkout: {selectedPlan.nome}</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedPlan(null)}></button>
              </div>
              <form onSubmit={handleCheckout}>
                <div className="modal-body">
                  <p className="mb-3">Valor total: <strong>R$ {selectedPlan.preco.toFixed(2)}</strong></p>
                  
                  <div className="mb-3">
                    <label className="form-label">Método de Pagamento</label>
                    <select 
                      className="form-select"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                    >
                      <option value="Cartão de Crédito">Cartão de Crédito</option>
                      <option value="Pix">Pix</option>
                      <option value="Boleto">Boleto Bancário</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedPlan(null)}>Cancelar</button>
                  <button type="submit" className="btn btn-success">Confirmar Pagamento</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}