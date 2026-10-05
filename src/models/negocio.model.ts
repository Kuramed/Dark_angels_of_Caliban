export interface Plan {
  idPlano: number;
  nome: string;
  descricao: string;
  preco: number;
  duracaoMeses: number;
}

export interface Subscription {
  idAssinatura: number;
  idUsuario: number;
  idPlano: number;
  dataInicio: string;
  dataFim: string;
}

export interface PaymentSimulation {
  idPlano: number;
  metodoPagamento: 'Cartão de Crédito' | 'Pix' | 'Boleto';
}