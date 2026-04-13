import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fahim — Software Engineer & Creative Technologist",
  description:
    "Portfolio of Fahim — building cross-platform systems at ANF Labs Dubai, crafting 3D renders, and bridging code with creativity. B.Tech CSE, VIT Chennai.",
  keywords: [
    "Fahim",
    "Software Engineer",
    "Creative Technologist",
    "Full Stack Developer",
    "ANF Labs",
    "Portfolio",
  ],
  authors: [{ name: "Fahim" }],
  openGraph: {
    title: "Fahim — Software Engineer & Creative Technologist",
    description:
      "Explore the technical and creative worlds of Fahim.",
    url: "https://mdfahim.in",
    siteName: "Fahim Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fahim — Software Engineer & Creative Technologist",
    description:
      "Explore the technical and creative worlds of Fahim.",
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
      className={`${inter.variable} ${jetbrainsMono.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-body)]">
        {children}
      </body>
    </html>
  );
}
