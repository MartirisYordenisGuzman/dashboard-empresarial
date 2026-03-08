// src/components/organisms/ChartsSection/ChartsSection.tsx
'use client';

import React from 'react';
import { cn } from '@lib/utils';
import { LineChart } from '@components/molecules/LineChart';
import { TimeRangeSelector } from '@components/molecules/TimeRangeSelector';
import { Typography } from '@components/atoms/Typography';
import { useDashboard } from '@hooks/useDashboard';

export interface ChartsSectionProps {
  className?: string;
  charts?: string[];
  title?: string;
}

export const ChartsSection: React.FC<ChartsSectionProps> = ({
  className,
  charts = ['revenue', 'conversion', 'users'],
  title = 'Analiticas en Tiempo Real'
}) => {
  const { chartData, filters, isLoading, error, handleTimeRangeChange } = useDashboard();

  // Transformar datos para diferentes tipos de gráficos
  const getChartData = (chartType: string) => {
    if (!chartData) return null;

    switch (chartType) {
      case 'revenue':
        return {
          labels: chartData.labels,
          datasets: [
            {
              label: 'Ingresos',
              data: chartData.datasets[0].data,
              borderColor: '#3882F6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              fill: true
            }
          ]
        };
      case 'conversion':
        return {
          labels: chartData.labels,
          datasets: [
            {
              label: 'Tasa de Conversión',
              data: chartData.datasets[0].data.map(value => value * 0.1),
              borderColor: '#1e8981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              fill: true
            }
          ]
        };
      case 'users':
        return {
          labels: chartData.labels,
          datasets: [
            {
              label: 'Usuarios Activos',
              data: chartData.datasets[0].data.map(value => value * 2),
              borderColor: '#F59E0B',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              fill: true
            }
          ]
        };
      default:
        return null;
    }
  };

  const chartTitles = {
    revenue: 'Evolución de Ingresos',
    conversion: 'Tasa de Conversión',
    users: 'Usuarios Activos'
  };

  return (
    <section className={cn('space-y-6', className)}>
      {/* Header de la sección */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Typography variant="h2" className="text-gray-900">
            {title}
          </Typography>
          <Typography variant="body" color="muted" className="mt-1">
            Datos actualizados en tiempo real según el rango seleccionado
          </Typography>
        </div>
        <TimeRangeSelector
          selectedRange={filters.timeRange}
          onRangeChange={handleTimeRangeChange}
          className="mt-4 sm:mt-0"
        />
      </div>

      {/* Grid de gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {charts.map((chartType, index) => {
          const data = getChartData(chartType);

          return (
            <LineChart
              key={chartType}
              title={chartTitles[chartType as keyof typeof chartTitles]}
              data={data || { labels: [], datasets: [] }}
              isLoading={isLoading}
              error={error}
              height={300}
              className="animate-fade-in"
            />
          );
        })}
      </div>

      {/* Estado vacío o error */}
      {error && (
        <div className="text-center py-12">
          <Typography variant="h4" color="error" className="mb-2">
            Error al cargar los gráficos
          </Typography>
          <Typography variant="body" color="muted">
            {error}
          </Typography>
        </div>
      )}
    </section>
  );
};