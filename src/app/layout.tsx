// src/app/layout.tsx

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemedLayout } from "./components/ThemedLayout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Project Portfolio",
  description:
    "A dynamic portfolio built with Next.js, React, and TypeScript. Features an adaptive UI, sortable project lists with Framer Motion, and a modular architecture.",
};

const themeScript = `
  (function() {
    try {
      const theme = localStorage.getItem('theme') || 'glassy-blue';
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {
      console.error('Error setting theme from localStorage', e);
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemedLayout>{children}</ThemedLayout>
      </body>
    </html>
  );
}
