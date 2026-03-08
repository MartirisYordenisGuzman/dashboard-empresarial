// src/components/atoms/TrendIndicator/TrendIndicator.tsx
import React from 'react';
import { cn } from '@lib/utils';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from '@heroicons/react/24/outline';

export interface TrendIndicatorProps {
    value: number;
    className?: string;
    showIcon?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export const TrendIndicator: React.FC<TrendIndicatorProps> = ({
  value,
  className,
  showIcon = true,
  size = 'md',
}) => {
  const isPositive = value > 0;
  const isNeutral = value === 0;

  const sizeStyles = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const iconSize = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  const Icon = isPositive ? ArrowUpIcon : isNeutral ? MinusIcon : ArrowDownIcon;

  return (
    <div
      className={cn(
        'inline-flex items-center font-medium',
        isPositive && 'text-green-600',
        isNeutral && 'text-gray-500',
        !isPositive && !isNeutral && 'text-red-600',
        sizeStyles[size],
        className
      )}
    >
      {showIcon && <Icon className={cn(iconSize[size], 'mr-1')} />}
      <span>
        {isPositive ? '+' : ''}
        {value.toFixed(1)}%
      </span>
    </div>
  );
};