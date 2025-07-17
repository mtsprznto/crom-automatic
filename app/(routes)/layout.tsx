
import React from "react";

export default function LayoutRoutes({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen md:h-full bg-eggplant-100">
      <div className="flex h-full">
        <div className="w-full h-full lg:pl-0">
          <div className="">{children}</div>
        </div>
      </div>
    </main>
  );
}
