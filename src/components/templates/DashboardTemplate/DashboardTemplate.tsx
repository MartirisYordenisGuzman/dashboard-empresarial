// src/components/templates/DashboardTemplate/DashboardTemplate.tsx
'use client';

import React, { useEffect } from 'react';
import { DashboardLayout } from '@components/templates/DashboardLayout';
import { MetricsGrid } from '@components/organisms/MetricsGrid';
import { ChartsSection } from '@components/organisms/ChartsSection';
import { Typography } from '@components/atoms/Typography';
import { Button } from '@components/atoms/Button';
import { useDashboard } from '@hooks/useDashboard';

import { Metric, ChartData } from '@/types/dashboard';

export interface DashboardTemplateProps {
  className?: string;
  featuredMetrics?: string[];
  featuredCharts?: string[];
  initialData?: {
    metrics: Metric[];
    chartData: ChartData | null;
    timestamp: string;
  };
}

export const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
  className,
  featuredMetrics = ['revenue', 'conversion', 'users', 'sessions'],
  featuredCharts = ['revenue', 'conversion', 'users'],
  initialData
}) => {
  const { fetchMetrics, fetchChartData, filters, error } = useDashboard({ initialData });
  const [searchTerm, setSearchTerm] = React.useState('');

  // Cargar datos iniciales
  useEffect(() => {
    const loadInitialData = async () => {
      await Promise.all([
        fetchMetrics(),
        fetchChartData(filters.timeRange)
      ]);
    };

    loadInitialData();
  }, [fetchMetrics, fetchChartData, filters.timeRange]);

  if (error) {
    return (
      <DashboardLayout className={className} onSearch={setSearchTerm}>
        <div className="flex flex-col items-center justify-center min-h-[400px]" data-testid="error-state">
          <Typography variant="h2" color="error" className="mb-4">
            Error al cargar las métricas
          </Typography>
          <Typography variant="body" color="muted">
            {error}
          </Typography>
          <Button variant="primary" className="mt-6" onClick={() => window.location.reload()}>
            Reintentar
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      className={className}
      onSearch={setSearchTerm}
    >
      {/* Sección de Métricas Principales */}
      <section className="mb-8">
        <Typography variant="h1" className="text-gray-900 mb-6" data-testid="main-title">
          Resumen General
        </Typography>
        <MetricsGrid
          metricsFilter={featuredMetrics}
          searchTerm={searchTerm}
          layout="auto"
          className="mb-8"
        />
      </section>

      {/* Sección de Gráficos */}
      <section className="mb-8">
        <ChartsSection
          charts={featuredCharts}
          title="Análisis Detallado"
        />
      </section>

      {/* Sección de Insights */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Widget de Insights */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <Typography variant="h3" className="text-gray-900 mb-4">
            Insights Principales
          </Typography>
          <div className="space-y-3">
            {[
              "Los ingresos han aumentado un 15% respecto al mes anterior",
              "La tasa de conversión se mantiene estable en 4.3%",
              "Los usuarios activos han crecido un 22% este trimestre"
            ].map((insight, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <Typography variant="body" className="text-gray-700">
                  {insight}
                </Typography>
              </div>
            ))}
          </div>
        </div>

        {/* Widget de Actividad Reciente */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <Typography variant="h3" className="text-gray-900 mb-4">
            Actividad Reciente
          </Typography>
          <div className="space-y-4">
            {[
              { action: "Informe generado", time: "Hace 5 min" },
              { action: "Métrica actualizada", time: "Hace 15 min" },
              { action: "Usuario añadido", time: "Hace 1 hora" }
            ].map((activity, index) => (
              <div key={index} className="flex justify-between items-center">
                <Typography variant="body" className="text-gray-700">
                  {activity.action}
                </Typography>
                <Typography variant="caption" color="muted">
                  {activity.time}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};