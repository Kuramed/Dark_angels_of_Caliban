import { z } from 'zod';

// ==========================================
// TRILHA
// ==========================================
export const TrilhaSchema = z.object({
    id_trilha: z.string().optional(),
    titulo: z.string().min(3, 'O título da trilha é obrigatório'),
    descricao: z.string().min(5, 'Adicione uma descrição para a trilha'),
    id_categoria: z.string().min(1, 'Selecione uma categoria')
});

export type ITrilha = z.infer<typeof TrilhaSchema>;

// ==========================================
// TRILHA - CURSO (Associação)
// ==========================================
export const TrilhaCursoSchema = z.object({
    id_trilha: z.string().min(1, 'ID da trilha é obrigatório'),
    id_curso: z.string().min(1, 'ID do curso é obrigatório'),
    ordem: z.coerce.number().min(1, 'A ordem é obrigatória')
});

export type ITrilhaCurso = z.infer<typeof TrilhaCursoSchema>;

// ==========================================
// CERTIFICADO
// ==========================================
export const CertificadoSchema = z.object({
    id_certificado: z.string().optional(),
    id_usuario: z.string().min(1, 'ID do usuário é obrigatório'),
    id_curso: z.string().min(1, 'ID do curso é obrigatório'),
    id_trilha: z.string().optional(),
    codigoVerificacao: z.string().optional(),
    dataEmissao: z.string().optional()
});

export type ICertificado = z.infer<typeof CertificadoSchema>;