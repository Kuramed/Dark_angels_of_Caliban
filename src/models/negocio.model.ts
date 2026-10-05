import { z } from "zod";

export const PlanoSchema = z.object({
  id_plano: z.string().optional(),
  nome: z.string().min(3, "O nome do plano é obrigatório"),
  preco: z.coerce.number().min(0, "O preço não pode ser negativo"),
  duracaoMeses: z.coerce
    .number()
    .min(1, "A duração deve ser de pelo menos 1 mês"),
  descricao: z.string().optional(),
});

export type IPlano = z.infer<typeof PlanoSchema>;

export const PagamentoSchema = z.object({
  id_pagamento: z.string().optional(),
  id_usuario: z.string().min(1, "ID do usuário é obrigatório"),
  valor: z.coerce.number().min(0, "O valor não pode ser negativo"),
  status: z.enum(["Pendente", "Aprovado", "Recusado"]).default("Pendente"),
  dataPagamento: z.string().optional(),
});

export type IPagamento = z.infer<typeof PagamentoSchema>;

export const AssinaturaSchema = z.object({
  id_assinatura: z.string().optional(),
  id_usuario: z.string().min(1, "ID do usuário é obrigatório"),
  id_plano: z.string().min(1, "ID do plano é obrigatório"),
  status: z.enum(["Ativa", "Cancelada", "Expirada"]).default("Ativa"),
  dataInicio: z.string().optional(),
});

export type IAssinatura = z.infer<typeof AssinaturaSchema>;
