'use client';

import { useDashboardStore } from '@stores/dashboard-store';
import { useCallback, useEffect } from 'react';
import { Metric, ChartData, TimeRange } from '@/types/dashboard';

interface UseDashboardOptions {
  initialData?: {
    metrics: Metric[];
    chartData: ChartData | null;
    timestamp: string;
  };
}

export const useDashboard = (options: UseDashboardOptions = {}) => {
  const {
    metrics,
    chartData,
    filters,
    isLoading,
    error,
    setTimeRange,
    setFilters,
    fetchMetrics,
    fetchChartData
  } = useDashboardStore();

  // Hidratación del store con datos del servidor
  useEffect(() => {
    if (options.initialData) {
      useDashboardStore.getState().setMetrics(options.initialData.metrics);
      if (options.initialData.chartData) {
        useDashboardStore.getState().setChartData(options.initialData.chartData);
      }
    }
  }, [options.initialData]);

  const handleTimeRangeChange = useCallback((timeRange: TimeRange) => {
    setTimeRange(timeRange);
  }, [setTimeRange]);

  const calculateChange = useCallback((current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  }, []);

  return {
    // Estado
    metrics: options.initialData?.metrics || metrics,
    chartData: options.initialData?.chartData || chartData,
    filters,
    isLoading,
    error,

    // Acciones
    handleTimeRangeChange,
    setFilters,
    fetchMetrics,
    fetchChartData,
    calculateChange,

    // Utilidades
    hasData: (options.initialData?.metrics || metrics).length > 0,
    isHydrated: !options.initialData
  };
};
