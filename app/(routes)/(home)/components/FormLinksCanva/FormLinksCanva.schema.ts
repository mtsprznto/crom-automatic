// app/(routes)/(home)/components/FormLinksCanva/FormLinksCanva.schema.ts
import { z } from "zod"

export const FormLinksSchema = z.object({
  canva_4: z.url({ message: "Debe ser una URL válida" }),
  canva_5: z.url().optional(),
  canva_5_proyecto: z.url().optional(),
  canva_5_orientacion: z.url().optional(),
  canva_6: z.url({ message: "Debe ser una URL válida" }),
})

export type FormLinksType = z.infer<typeof FormLinksSchema>