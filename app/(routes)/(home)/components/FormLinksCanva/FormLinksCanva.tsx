"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormLinksSchema, FormLinksType } from "./FormLinksCanva.schema";
import { CircleQuestionMark } from "lucide-react";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const FormLinksCanva = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormLinksType>({
    resolver: zodResolver(FormLinksSchema),
    defaultValues: {
      canva_4: "",
      canva_5: "",
      canva_5_proyecto: "",
      canva_5_orientacion: "",
      canva_6: "",
    },
  });

  const etiquetasPersonalizadas: Record<keyof FormLinksType, string> = {
    canva_4: "4° básicos",
    canva_5: "5° básicos",
    canva_5_proyecto: "Proyecto 5°",
    canva_5_orientacion: "Orientación 5°",
    canva_6: "6° básico",
  };

  const onSubmit = async (values: FormLinksType) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        "https://bot-cami-classroom.vercel.app/publicar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const result = await res.json();
      if (result.status === "oauth_required" && result.auth_url) {
        window.location.href = result.auth_url; // redirige al flujo OAuth
        return;
      }

      const errorRaw = result["[/publicar] error"];

      if (
        errorRaw &&
        typeof errorRaw === "string" &&
        errorRaw.includes("Invalid API Key")
      ) {
        toast.error("🔒 API Key inválida. Verifica tus credenciales.");
        return;
      }

      console.log(result);
      toast("✅ Enlaces publicados");
    } catch (err) {
      console.error("❌ Error al publicar", err);
      toast.error("Hubo un problema al enviar los enlaces");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-6 py-3">
      <div className="mb-2">
        <h1 className="text-eggplant-950 text-[13px] md:text-xl">
          Publicar anuncio
        </h1>
        <p className="text-[11px] md:text-sm text-eggplant-700">
          Publicar anuncio de la semana en classroom
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-1 max-w-xl md:max-w-[1000px] mx-auto md:bg-eggplant-200 md:rounded-[20px] md:mt-3"
        >
          {Object.keys(form.getValues()).map((key) => (
            <FormField
              key={key}
              control={form.control}
              name={key as keyof FormLinksType}
              render={({ field }) => (
                <FormItem className="text-eggplant-950 bg-eggplant-200 px-3 py-3 rounded-[10px]">
                  <div className="flex items-center justify-between ">
                    <FormLabel className="capitalize ">
                      {etiquetasPersonalizadas[key as keyof FormLinksType]}
                    </FormLabel>
                    <span className="text-eggplant-700">
                      <CircleQuestionMark size={18} />
                    </span>
                  </div>
                  <FormControl className="border-b-[1px] border-eggplant-950 text-[11px] md:text-[14px]">
                    <Input
                      placeholder="https://canva.com/..."
                      {...field}
                      className="text-[11px] md:text-[14px]"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full text-eggplant-50 bg-eggplant-950"
          >
            {isLoading && <Loader2 className="animate-spin h-4 w-4" />}
            {isLoading ? "Publicando..." : "Publicar Anuncios"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
