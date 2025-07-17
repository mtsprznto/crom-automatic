"use client";

import { getDateChile } from "@/lib/utils/date";



export const HeaderMain = ({title}: {title: string}) => {

  const fechaHoy = getDateChile()

  return (
    <div className="flex justify-between items-center w-full p-6 md:rounded-b-[0px] bg-eggplant-950 text-eggplant-50">
      <h1 className="text-[13px] md:text-3xl font-sans">
        {title}
      </h1>
      <div className="text-[10px] md:text-sm font-mono tracking-widest bg-eggplant-50 text-eggplant-950 px-2 py-1 rounded-[20px]">
        {fechaHoy}
      </div>
    </div>
  );
};

export default HeaderMain;
