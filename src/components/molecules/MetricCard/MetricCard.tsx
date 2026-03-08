// src/components/molecules/MetricCard/MetricCard.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@components/atoms/Card';
import { Typography } from '@components/atoms/Typography';
import { TrendIndicator } from '@components/atoms/TrendIndicator';
import { formatCurrency, formatPercentage } from '@lib/utils';

export interface MetricCardProps {
  title: string;
  value: number;
  previousValue: number;
  unit: 'currency' | 'percentage' | 'number';
  formatOptions?: Intl.NumberFormatOptions;
  isLoading?: boolean;
  className?: string;
  // Nueva prop para SSR
  serverRendered?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  previousValue,
  unit,
  formatOptions,
  isLoading = false,
  className,
  serverRendered = false,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Evitar hidratación incorrecta en SSR
  const calculateChange = (current: number, previous: number): number => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const formatValue = (val: number): string => {
    switch (unit) {
      case 'currency':
        return formatCurrency(val);
      case 'percentage':
        return formatPercentage(val);
      case 'number':
        return new Intl.NumberFormat('es-ES', formatOptions).format(val);
      default:
        return val.toString();
    }
  };

  const change = calculateChange(value, previousValue);

  // Mostrar skeleton solo en cliente para evitar mismatch con SSR
  if (isLoading && isClient) {
    return (
      <Card className={className}>
        <CardContent className="p-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <Typography variant="label" color="muted" className="mb-1">
          {title}
        </Typography>

        <div className="flex items-baseline justify-between mb-2">
          <Typography variant="h3" className="text-gray-900">
            {formatValue(value)}
          </Typography>
          {/* Solo mostrar trend indicator en cliente */}
          {isClient && <TrendIndicator value={change} size="sm" />}
        </div>

        <Typography variant="caption" color="muted">
          Anterior: {formatValue(previousValue)}
        </Typography>
      </CardContent>
    </Card>
  );
};