import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DentalFlow 2.0 - Sistema de Gestión Dental",
  description: "Sistema completo de gestión para clínicas dentales y laboratorios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
