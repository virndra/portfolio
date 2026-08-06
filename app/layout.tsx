import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Silkscreen, JetBrains_Mono, Herr_Von_Muellerhoff } from "next/font/google";
import FloatingNav from "@/components/FloatingNav";
import "./globals.css";

const herrVonMuellerhoff = Herr_Von_Muellerhoff({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-signature",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-silkscreen",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Vir",
  description: "Portfolio of Veerendra Pradeep (aka Vir) — E-Rank Developer, Full Stack Engineer.",
  keywords: ["Veerendra Pradeep", "Vir", "E-Rank Dev", "Full Stack Developer", "Portfolio"],
  authors: [{ name: "Veerendra Pradeep" }],
  icons: {
    icon: "/onepeice_favicon.png",
    shortcut: "/onepeice_favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${herrVonMuellerhoff.variable} ${cormorant.variable} ${silkscreen.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] font-mono selection:bg-neutral-500 selection:text-white transition-colors duration-300"
      >
        {children}
        <FloatingNav />
        <Script src="/oneko.js" data-cat="/oneko.gif" strategy="afterInteractive" />
      </body>
    </html>
  );
}




