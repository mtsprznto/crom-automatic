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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormLinksSchema, FormLinksType } from "./FormLinksCanva.schema";
import { CircleQuestionMark, SquareArrowUpRight } from "lucide-react";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

export const FormLinksCanva = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [authUrl, setAuthUrl] = useState<string | null>(null);


  const urlApiValidador = "https://bot-cami-classroom.vercel.app/obtener_ids_cursos"
  const urlApiPublicador = "https://bot-cami-classroom.vercel.app/publicar"

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
    canva_6: "6° básicos",
  };

  // Validar token antes de mostrar formulario
  useEffect(() => {
    const validarToken = async () => {
      try {
        const res = await fetch(
          urlApiValidador
        );
        const result = await res.json();
        
        
        if (result.status === "oauth_required" && result.auth_url) {
          setAuthUrl(result.auth_url);
        }
      } catch (err) {
        console.error("❌ Error al validar token:", err);
        toast.error("Error al validar autenticación");
      }
    };

    validarToken();
  }, []);

  const onSubmit = async (values: FormLinksType) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        urlApiPublicador,
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
        toast.info("🔐 Antes de publicar, debes conectar con Google Classroom");

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
    <div className="md:px-6 md:py-3 w-full md:max-w-[1000px] mx-auto md:px-0 ">
      {authUrl ? (
        <div className="text-center space-y-4">
          <Link
            href={authUrl}
            className="inline-block px-4 py-2 text-sm font-medium text-white bg-eggplant-950 rounded hover:rounded-[10px] hover:bg-eggplant-500 transition duration-300"
          >
            Conectar con Google Classroom
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col">
                <h1 className="text-eggplant-950 text-[13px] md:text-xl">
                  Publicar anuncio
                </h1>
                <p className="text-[11px] md:text-sm text-eggplant-700">
                  Publicar anuncio de la semana en classroom
                </p>
              </div>
              <span
                className="text-eggplant-700 cursor-pointer"
                onClick={() =>
                  window.open("https://www.canva.com/projects", "_blank")
                }
              >
                <Tooltip>
                  <TooltipTrigger className="cursor-pointer">
                    <SquareArrowUpRight className="w-2 h-2 md:w-5 md:h-5" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ir a canva.com</p>
                  </TooltipContent>
                </Tooltip>
              </span>
            </div>
          </div>
          <div className="w-full h-[1px] bg-eggplant-400 rounded-t-[10px] mb-3"></div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-1 w-full md:max-w-[1000px] mx-auto md:bg-eggplant-200 md:rounded-[20px] md:mt-3"
            >
              {Object.keys(form.getValues()).map((key) => (
                <FormField
                  key={key}
                  control={form.control}
                  name={key as keyof FormLinksType}
                  render={({ field }) => (
                    <FormItem className="text-eggplant-950 bg-eggplant-200 px-3 py-3 rounded-[10px]">
                      <div className="flex items-center justify-between ">
                        <FormLabel className="capitalize">
                          {etiquetasPersonalizadas[key as keyof FormLinksType]}
                        </FormLabel>
                        <span className="text-eggplant-700 cursor-pointer">
                          <Tooltip>
                            <TooltipTrigger>
                              <CircleQuestionMark
                                size={18}
                                className="w-4 h-4 md:w-5 md:h-5"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                Solo tienes que copiar el enlace que deseas
                                publicar en ambos cursos.
                              </p>
                            </TooltipContent>
                          </Tooltip>
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
                className="w-full text-eggplant-50 bg-eggplant-950 mt-1 md:mt-3"
              >
                {isLoading && <Loader2 className="animate-spin h-4 w-4" />}
                {isLoading ? "Publicando..." : "Publicar Anuncios"}
              </Button>
            </form>
          </Form>
        </>
      )}
    </div>
  );
};
