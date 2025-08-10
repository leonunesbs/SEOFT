import "~/styles/globals.css";

import { type Metadata, type Viewport } from "next";
import { Open_Sans } from "next/font/google";

import { Analytics } from "@vercel/analytics/next";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "~/components/organisms/theme-provider";
import { Toaster } from "~/components/ui/toaster";
import { TRPCReactProvider } from "~/trpc/react";

const openSans = Open_Sans({ subsets: ["latin"] });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://seoft.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "iSEOFT - Plataforma Exclusiva do Setor de Oftalmologia do HGF",
    template: "%s | iSEOFT",
  },
  description:
    "Descubra o iSEOFT, a plataforma auxiliar do Setor de Oftalmologia do HGF. Otimize sua rotina com ferramentas exclusivas para residentes e colaboradores do hospital. Acesse informações e recursos indispensáveis para o seu dia a dia.",
  applicationName: "iSEOFT - Setor de Oftalmologia HGF",
  generator: "Next.js",
  keywords: [
    "oftalmologia",
    "HGF",
    "iSEOFT",
    "SEOFT",
    "Setor de Oftalmologia",
    "residentes",
    "hospital geral de fortaleza",
    "ferramentas para médicos",
    "recursos oftalmologia",
  ],
  authors: [{ name: "Leonardo Nunes", url: "https://github.com/leonunesbs" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
    languages: { "pt-BR": "/" },
  },
  openGraph: {
    title: "iSEOFT - Plataforma Auxiliar do Setor de Oftalmologia do HGF",
    description:
      "Bem-vindo à iSEOFT, uma plataforma desenvolvida exclusivamente para o Setor de Oftalmologia do HGF. Ferramentas otimizadas para residentes, integração eficiente e recursos exclusivos para colaboradores. Descubra mais!",
    url: "/",
    siteName: "SEOFT",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/iSEOFT-logo.png",
        width: 512,
        height: 512,
        alt: "Logo do SEOFT - Setor de Oftalmologia do HGF",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@leonunesbs",
    title: "SEOFT - Ferramentas Exclusivas para Oftalmologia no HGF",
    description:
      "O iSEOFT é a solução definitiva para residentes e colaboradores do Setor de Oftalmologia do HGF. Recursos personalizados e integração para otimizar sua rotina. Acesse já!",
    images: ["/iSEOFT-logo.png"],
  },
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: "/favicon/favicon-96x96.png",
    apple: "/favicon/apple-touch-icon.png",
    shortcut: "/favicon/favicon.ico",
    other: [
      { rel: "icon", url: "/favicon/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head />
      <body className={openSans.className}>
        <TRPCReactProvider>
          <SessionProvider>
            <ThemeProvider>
              {children}
              <Toaster />
              <Analytics />
            </ThemeProvider>
          </SessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
