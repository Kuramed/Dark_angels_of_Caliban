export interface LessonProgress {
  idAula: number;
  status: 'Concluído' | 'Pendente';
  dataConclusao?: string;
}

export interface Certificate {
  idCertificado: number;
  idCurso: number;
  cursoTitulo: string;
  codigoVerificacao: string;
  dataEmissao: string;
}