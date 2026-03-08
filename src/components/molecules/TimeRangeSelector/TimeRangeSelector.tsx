// src/components/molecules/TimeRangeSelector/TimeRangeSelector.tsx
import React from 'react';
import { Button } from '@components/atoms/Button';
import { Card } from '@components/atoms/Card';
import { Typography } from '@components/atoms/Typography';

export type TimeRange = '24h' | '7d' | '30d' | '90d';

export interface TimeRangeSelectorProps {
  selectedRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
  className?: string;
}

const timeRangeOptions: { value: TimeRange; label: string }[] = [
  { value: '24h', label: '24 Horas' },
  { value: '7d', label: '7 Días' },
  { value: '30d', label: '30 Días' },
  { value: '90d', label: '90 Días' },
];

export const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  selectedRange,
  onRangeChange,
  className,
}) => {
  return (
    <Card className={className} padding="sm" data-testid="time-range-selector">
      <div className="flex items-center justify-between">
        <Typography variant="label" color="muted">
          Rango de Tiempo
        </Typography>
        <div className="flex space-x-1">
          {timeRangeOptions.map((option) => (
            <Button
              key={option.value}
              variant={selectedRange === option.value ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onRangeChange(option.value)}
              className="min-w-[60px]"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};