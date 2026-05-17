import { apiFetch } from './api';
import { ITrilha, ICertificado } from '../models/curadoria.model';

export const TrilhaService = {
    listarTodas: (): Promise<ITrilha[]> => apiFetch('/trilhas'),
    
    salvar: (trilha: ITrilha): Promise<ITrilha> => {
        if (trilha.id_trilha) {
            return apiFetch(`/trilhas/${trilha.id_trilha}`, {
                method: 'PUT',
                body: JSON.stringify(trilha)
            });
        }
        return apiFetch('/trilhas', {
            method: 'POST',
            body: JSON.stringify(trilha)
        });
    },
    
    excluir: (id: string): Promise<void> => apiFetch(`/trilhas/${id}`, { method: 'DELETE' })
};

export const CertificadoService = {
    listarTodos: (): Promise<ICertificado[]> => apiFetch('/certificados'),
    
    emitir: (certificado: ICertificado): Promise<ICertificado> => {
        return apiFetch('/certificados', {
            method: 'POST',
            body: JSON.stringify(certificado)
        });
    }
};