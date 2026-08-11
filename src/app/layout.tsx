import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Raweeroj Thokaeo | Full-Stack Developer",
  description:
    "Full-Stack Developer with experience in React, Node.js, Docker, and infrastructure. Based in Bangkok.",
  openGraph: {
    title: "Raweeroj Thokaeo | Full-Stack Developer",
    description:
      "Full-Stack Developer with experience in React, Node.js, Docker, and infrastructure. Based in Bangkok.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${grotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-bg font-body antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
