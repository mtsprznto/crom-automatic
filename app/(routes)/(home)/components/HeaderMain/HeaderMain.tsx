"use client";

import { getDateChile } from "@/lib/utils/date";
import Image from "next/image";
import { useState } from "react";

export const HeaderMain = ({ title }: { title: string }) => {
  const fechaHoy = getDateChile();
  const fallbackSrc = "/image/logo.png";
  const [logoSrc, setLogoSrc] = useState(
    "https://www.gstatic.com/classroom/logo_square_rounded.svg"
  );

  return (
    <div className="flex justify-between items-center w-full p-6 md:rounded-b-[0px] bg-eggplant-950 text-eggplant-50">
      <div className="flex items-center gap-2">
        <Image
          src={logoSrc}
          alt="Logo"
          width={50}
          height={50}
          className="w-10 h-10"
          onError={() => setLogoSrc(fallbackSrc)}
        ></Image>
        <h1 className="text-[13px] md:text-3xl font-[500]">{title}</h1>
      </div>
      <div className="text-[10px] md:text-sm font-mono tracking-widest bg-eggplant-50 text-eggplant-950 px-2 py-1 rounded-[20px]">
        {fechaHoy}
      </div>
    </div>
  );
};

export default HeaderMain;
