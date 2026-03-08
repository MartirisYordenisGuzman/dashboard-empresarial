// src/components/molecules/LoadingSkeleton/LoadingSkeleton.tsx
import React from 'react';
import { Card } from '@components/atoms/Card';
import { cn } from '@lib/utils';

export interface LoadingSkeletonProps {
  type?: 'metric' | 'chart' | 'table' | 'card';
  count?: number;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  type = 'card',
  count = 1,
  className,
}) => {
  const renderMetricSkeleton = () => (
    <Card className="p-4">
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
      </div>
    </Card>
  );

  const renderChartSkeleton = () => (
    <Card className="p-6">
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="h-48 bg-gray-200 rounded mb-4"></div>
        <div className="flex justify-between">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-3 bg-gray-200 rounded w-1/6"></div>
          ))}
        </div>
      </div>
    </Card>
  );

  const renderTableSkeleton = () => (
    <Card className="p-6">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex justify-between mb-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/6"></div>
          </div>
        ))}
      </div>
    </Card>
  );

  const renderCardSkeleton = () => (
    <Card>
      <div className="animate-pulse p-6">
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-20 bg-gray-200 rounded w-full"></div>
      </div>
    </Card>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'metric':
        return renderMetricSkeleton();
      case 'chart':
        return renderChartSkeleton();
      case 'table':
        return renderTableSkeleton();
      case 'card':
      default:
        return renderCardSkeleton();
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{renderSkeleton()}</div>
      ))}
    </div>
  );
};