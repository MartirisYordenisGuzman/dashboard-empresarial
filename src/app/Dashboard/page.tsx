// src/app/Dashboard/page.tsx
import React from 'react';
import { Metadata } from 'next';
import { DashboardTemplate } from '@components/templates/DashboardTemplate';
import { dashboardService } from '@services/dashboard-service';

export const metadata: Metadata = {
  title: 'Dashboard Principal',
  description: 'Resumen completo de métricas y analíticas empresariales',
};

// Simulación de API call para datos iniciales
async function getInitialDashboardData() {
  try {
    // En un entorno real, esta sería una llamada a tu API
    const [metrics, chartData] = await Promise.all([
      dashboardService.getMetrics(),
      dashboardService.getChartData('7d')
    ]);

    return {
      metrics,
      chartData,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error loading initial data:', error);
    return {
      metrics: [],
      chartData: null,
      timestamp: new Date().toISOString(),
    };
  }
}

export default async function DashboardPage() {
  // Datos cargados en el servidor
  const initialData = await getInitialDashboardData();

  return (
    <DashboardTemplate
      initialData={initialData}
      featuredMetrics={['revenue', 'conversion', 'users', 'sessions']}
      featuredCharts={['revenue', 'conversion', 'users']}
    />
  );
}

// Configuración de revalidación incremental (ISR)
export const revalidate = 300; // 5 minutos
export const dynamic = 'force-dynamic';