import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";


const poppins = Poppins({
  subsets: ["latin"],
  weight:["200","400","500","800"]
});


export const metadata: Metadata = {
  title: "CROM | Automatización",
  description: "App publicar publicar en classroom",
  manifest:"/manifest.json"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${poppins.className}  antialiased`}
      >
        {children}
        <Toaster></Toaster>
      </body>
    </html>
  );
}
