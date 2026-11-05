import { z } from "zod";

/** Campo de texto opcional: string vazia é tratada como ausente. */
const optionalText = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v ? v : undefined));

export const lojaSchema = z.object({
  endereco: z.string().trim().min(1),
  horario: z.string().trim().min(1),
});

export const vendedorSchema = z.object({
  nome: z.string().trim().min(1),
  /** 55 + DDD + número, apenas dígitos. */
  telefone: z.string().regex(/^\d{12,13}$/, "Telefone deve ter 55 + DDD + número, só dígitos"),
  foto: optionalText,
});

export const CONDICOES = ["novo", "seminovo"] as const;
export const CORES_ARTE = ["blue", "pink", "purple"] as const;

export const produtoSchema = z.object({
  grupo: z.string().trim().min(1),
  nome: z.string().trim().min(1),
  lanc: optionalText,
  chip: optionalText,
  tela: optionalText,
  camera: optionalText,
  frontal: optionalText,
  arm: optionalText,
  cores: optionalText,
  preco: optionalText,
  foto: optionalText,
  /** Cor do placeholder quando não há foto. */
  cor: z.enum(CORES_ARTE).or(z.literal("")).optional().transform((v) => v || undefined),
  condicao: z.enum(CONDICOES).optional(),
  /** Saúde da bateria em % (seminovos). */
  bateria: z.number().int().min(0).max(100).optional(),
  /** `false` marca o aparelho como esgotado; ausente = disponível. */
  disponivel: z.boolean().optional(),
  itens: z.array(z.string().trim().min(1)).default([]),
});

export const catalogoSchema = z.object({
  loja: lojaSchema,
  vendedores: z.array(vendedorSchema).min(1),
  produtos: z.array(produtoSchema),
});

export type Loja = z.infer<typeof lojaSchema>;
export type Vendedor = z.infer<typeof vendedorSchema>;
export type Produto = z.infer<typeof produtoSchema> & { id: string };
export type Catalogo = Omit<z.infer<typeof catalogoSchema>, "produtos"> & { produtos: Produto[] };
