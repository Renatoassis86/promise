import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import ScrollReveal from "@/components/ScrollReveal";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Promise English | Internacionalização Educacional",
  description:
    "Consultoria, formação de professores, certificações internacionais e cursos de inglês para escolas, famílias e educadores cristãos.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={roboto.variable}>
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
