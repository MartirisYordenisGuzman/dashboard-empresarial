// src/components/molecules/ChartContainer/ChartContainer.tsx
import React from 'react';
import { Card } from '@components/atoms/Card';
import { CardContent } from '@components/atoms/Card';
import { Typography } from '@components/atoms/Typography';
import { LoadingSkeleton } from '@components/molecules/LoadingSkeleton';
import { cn } from '@lib/utils';

export interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  error?: string | null;
  height?: number;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  children,
  className,
  isLoading = false,
  error = null,
  height = 400,
}) => {
  if (error) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            <Typography variant="h4" color="error">
              Error al cargar el gráfico
            </Typography>
            <Typography variant="body" color="muted" className="mt-2">
              {error}
            </Typography>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('flex flex-col', className)}>
      <div className="px-6 py-4 border-b border-gray-100">
        <Typography variant="h4" className="text-gray-900">
          {title}
        </Typography>
      </div>

      <div className="flex-1 p-6">
        {isLoading ? (
          <LoadingSkeleton type="chart" count={1} />
        ) : (
          <div style={{ height: `${height}px` }} className="relative">
            {children}
          </div>
        )}
      </div>
    </Card>
  );
};