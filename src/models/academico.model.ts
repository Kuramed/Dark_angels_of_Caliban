import { z } from "zod";

export const TrilhaCursoSchema = z.object({
  id_vinculo: z.string().optional(),
  id_trilha: z.string().min(1, "A seleção de uma trilha é obrigatória"),
  id_curso: z.string().min(1, "A seleção de um curso é obrigatória"),
  ordem: z.coerce.number().min(1, "A ordem de apresentação é obrigatória"),
});

export type ITrilhaCurso = z.infer<typeof TrilhaCursoSchema>;
