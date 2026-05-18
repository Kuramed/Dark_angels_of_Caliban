import { apiFetch } from "./api";
import { IPlano, IAssinatura, IPagamento } from "../models/negocio.model";

export const PlanoService = {
  listarTodos: (): Promise<IPlano[]> => apiFetch("/planos"),

  salvar: (plano: IPlano): Promise<IPlano> => {
    if (plano.id_plano) {
      return apiFetch(`/planos/${plano.id_plano}`, {
        method: "PUT",
        body: JSON.stringify(plano),
      });
    }
    return apiFetch("/planos", {
      method: "POST",
      body: JSON.stringify(plano),
    });
  },

  excluir: (id: string): Promise<void> =>
    apiFetch(`/planos/${id}`, { method: "DELETE" }),
};

export const AssinaturaService = {
  listarTodas: (): Promise<IAssinatura[]> => apiFetch("/assinaturas"),

  atualizarStatus: (assinatura: IAssinatura): Promise<IAssinatura> => {
    return apiFetch(`/assinaturas/${assinatura.id_assinatura}`, {
      method: "PUT",
      body: JSON.stringify(assinatura),
    });
  },
};

export const PagamentoService = {
  registrarPagamento: (pagamento: IPagamento): Promise<IPagamento> => {
    return apiFetch("/pagamentos", {
      method: "POST",
      body: JSON.stringify(pagamento),
    });
  },
};
