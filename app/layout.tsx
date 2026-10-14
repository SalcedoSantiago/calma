import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Manrope } from "next/font/google";
import { LifeBuoy } from "lucide-react";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CALMA · Un espacio para hacer una pausa",
  description: "Un recorrido de autorregulación ante impulsos de piromanía y cleptomanía. No reemplaza la atención profesional.",
};

export const viewport: Viewport = { themeColor: "#F8FAFF" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${manrope.variable} antialiased`}>
      <body className="min-h-dvh font-sans text-[17px] leading-relaxed">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-30 focus:rounded-full focus:bg-white focus:px-4 focus:py-2">
          Saltar al contenido
        </a>
        <header className="mx-auto flex max-w-2xl items-center justify-between px-5 pt-5">
          <Link href="/" className="text-lg font-semibold tracking-[0.3em]">CALMA</Link>
          <Link href="/apoyo" className="glass inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm text-muted hover:text-ink">
            <LifeBuoy size={15} aria-hidden /> Buscar apoyo
          </Link>
        </header>
        <main id="main" className="mx-auto max-w-2xl px-4 pt-8 pb-16 sm:px-6">{children}</main>
      </body>
    </html>
  );
}
