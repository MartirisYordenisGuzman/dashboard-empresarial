import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: {
    default: 'BizDash - Dashboard Empresarial',
    template: '%s | BizDash'
  },
  description: 'Panel de control avanzado con métricas empresariales en tiempo real. Visualiza KPIs, analíticas y tendencias de tu negocio.',
  keywords: ['dashboard', 'métricas', 'analítica', 'business intelligence', 'KPI'],
  authors: [{ name: 'Equipo BizDash' }],
  creator: 'BizDash Team',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://bizdash.example.com',
    title: 'BizDash - Dashboard Empresarial',
    description: 'Panel de control avanzado con métricas empresariales en tiempo real',
    siteName: 'BizDash',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@bizdash',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'tu-codigo-de-verificacion',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}