// src/components/molecules/LineChart/LineChart.tsx
'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartContainer } from '@components/molecules/ChartContainer';
import { useChartConfig } from '@hooks/useChartConfig';

export interface LineChartProps {
    title: string;
    data: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            borderColor?: string;
            backgroundColor?: string;
            fill?: boolean;
        }[];
    };
    isLoading?: boolean;
    error?: string | null;
    className?: string;
    height?: number;
}

export const LineChart: React.FC<LineChartProps> = ({
    title,
    data,
    isLoading = false,
    error = null,
    className,
    height = 400,
}) => {
    const { getDefaultOptions, colorPalette } = useChartConfig();

    const chartData = {
        labels: data.labels,
        datasets: data.datasets.map((dataset, index) => ({
            ...dataset,
            borderColor: dataset.borderColor || [colorPalette.primary, colorPalette.secondary, colorPalette.tertiary][index % 3],
            backgroundColor: dataset.backgroundColor || (dataset.fill 
                ? `rgba(${parseInt(colorPalette.primary.slice(1, 3), 16)}, ${parseInt(colorPalette.primary.slice(3, 5), 16)}, ${parseInt(colorPalette.primary.slice(5, 7), 16)}, 0.1)` 
                : 'transparent'
            ),
            borderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 6,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: dataset.borderColor || [colorPalette.primary, colorPalette.secondary, colorPalette.tertiary][index % 3],
            pointBorderWidth: 2,
            tension: 0.1,
            fill: dataset.fill || false,
        })),
    };

    const options = getDefaultOptions(title);

    return (
        <ChartContainer
            title={title}
            isLoading={isLoading}
            error={error}
            className={className}
            height={height}
        >
            <Line data={chartData} options={options} />
        </ChartContainer>
    );
};