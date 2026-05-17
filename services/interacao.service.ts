import { apiFetch } from './api';
import { IMatricula, IAvaliacao } from '../models/interacao.model';

const fixId = (item: any, idName: string) => {
    if (!item) return item;
    return { ...item, [idName]: item[idName] || item.id };
};

export const MatriculaService = {
    listarTodas: async (): Promise<IMatricula[]> => {
        const data = await apiFetch('/matriculas');
        return data.map((item: any) => fixId(item, 'id_matricula'));
    },
    salvar: (matricula: IMatricula): Promise<IMatricula> => {
        const id = matricula.id_matricula || (matricula as any).id;
        return apiFetch(id ? `/matriculas/${id}` : '/matriculas', {
            method: id ? 'PUT' : 'POST',
            body: JSON.stringify(matricula)
        });
    },
    excluir: (id: string): Promise<void> => apiFetch(`/matriculas/${id}`, { method: 'DELETE' })
};

export const AvaliacaoService = {
    listarPorCurso: async (id_curso: string): Promise<IAvaliacao[]> => {
        const url = id_curso ? `/avaliacoes?id_curso=${id_curso}` : '/avaliacoes';
        const data = await apiFetch(url);
        return data.map((item: any) => fixId(item, 'id_avaliacao'));
    },
    salvar: (avaliacao: IAvaliacao): Promise<IAvaliacao> => {
        return apiFetch('/avaliacoes', {
            method: 'POST',
            body: JSON.stringify(avaliacao)
        });
    }
};