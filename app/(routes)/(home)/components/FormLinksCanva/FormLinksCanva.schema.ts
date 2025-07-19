import { z } from "zod";

const linkOptional = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || /^https?:\/\/.+\..+/.test(value),
    { message: "Debe ser un enlace válido" }
  );

export const FormLinksSchema = z.object({
  canva_4: linkOptional,
  canva_5: linkOptional,
  canva_5_proyecto: linkOptional,
  canva_5_orientacion: linkOptional,
  canva_6: linkOptional,
});

export type FormLinksType = z.infer<typeof FormLinksSchema>;
