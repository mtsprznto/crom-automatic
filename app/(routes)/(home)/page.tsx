import { HeaderMain, TabViewHome } from "./components";

export default async function Home() {
  return (
    <div>
      <HeaderMain title="Publicar en Classroom"></HeaderMain>
      <div className="w-full md:max-w-[1000px] mx-auto md:px-0">
        <TabViewHome></TabViewHome>
      </div>
      
    </div>
  );
}
