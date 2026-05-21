import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Providers from "@/components/providers";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Bearded Mountaineer | Sacred Garden & Lodge en Cusco, Perú",
  description: "Experimenta el avistamiento del colibrí pico de espada (Ensifera ensifera), recorre las rutas sagradas de observación de aves y hospédate en nuestras cabañas rústicas de alta calidad en San Salvador, Cusco.",
  keywords: ["lodge cusco", "avistamiento de colibríes", "ensifera ensifera", "observación de aves perú", "fotografía de naturaleza", "turismo cusco"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${inter.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#faf9f6] text-[#2c3e2b] font-sans flex flex-col">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
