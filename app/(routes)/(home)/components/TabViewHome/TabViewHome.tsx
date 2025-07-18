import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormLinksCanva } from "../FormLinksCanva";
import { CardCoursesView } from "../CardCoursesView";

export const TabViewHome = () => {
  return (
    <div className="mx-auto md:px-0 align-center flex justify-center w-full md:max-w-[1000px] ">
      <Tabs
        defaultValue="cursos-disponibles"
        className="align-center justify-center items-center p-3 w-full"
      >
        <TabsList className="align-center justify-center items-center border border-eggplant-950 w-full md:max-w-[1000px]">
          <TabsTrigger value="cursos-disponibles" className="text-[12px] md:text-[14px]">
            Cursos disponibles
          </TabsTrigger>
          <TabsTrigger value="publicar-cursos" className="text-[12px] md:text-[14px]">
            Publicar cursos
          </TabsTrigger>
        </TabsList>
        <TabsContent value="cursos-disponibles" className="w-full md:max-w-[1000px]">
            <CardCoursesView></CardCoursesView>
        </TabsContent>
        <TabsContent value="publicar-cursos" className="w-full md:max-w-[1000px]">
          <FormLinksCanva></FormLinksCanva>
        </TabsContent>
      </Tabs>
    </div>
  );
};
