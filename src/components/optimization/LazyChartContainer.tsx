// src/components/optimization/LazyChartContainer.tsx
'use client';

import React, { lazy, Suspense, useState, useEffect } from 'react';
import { ChartContainer } from '@components/molecules/ChartContainer';
import { LoadingSkeleton } from '@components/molecules/LoadingSkeleton';

// Lazy imports para componentes pesados
const LineChart = lazy(() =>
  import('@components/molecules/LineChart').then((module) => ({
    default: module.LineChart
  }))
);

interface LazyChartContainerProps {
  type: 'line';
  title: string;
  data: any;
  height?: number;
  className?: string;
}

export const LazyChartContainer: React.FC<LazyChartContainerProps> = ({
  title,
  data,
  height = 300,
  className
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Intersection Observer para carga cuando el elemento es visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`chart-${title}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [title]);

  const ChartComponent = LineChart;

  if (hasError) {
    return (
      <ChartContainer title={title} height={height} className={className}>
        <div className="text-center text-red-600 py-8">
          Error al cargar el gráfico
        </div>
      </ChartContainer>
    );
  }

  return (
    <div id={`chart-${title}`}>
      {isVisible ? (
        <Suspense fallback={
          <ChartContainer title={title} height={height} className={className}>
            <LoadingSkeleton type="chart" />
          </ChartContainer>
        }>
          <ChartComponent
            title={title}
            data={data}
            height={height}
            className={className}
          />
        </Suspense>
      ) : (
        <ChartContainer title={title} height={height} className={className}>
          <div style={{ height: `${height}px` }} className="flex items-center justify-center">
            <div className="text-gray-500">Cargando gráfico...</div>
          </div>
        </ChartContainer>
      )}
    </div>
  );
};