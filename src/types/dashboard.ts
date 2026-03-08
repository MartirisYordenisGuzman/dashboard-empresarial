export interface Metric {
    id: string;
    name: string;
    value: number;
    previousValue: number;
    unit: 'currency' | 'percentage' | 'number';
    timestamp: Date;
}

export interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
    }[];
}

export type TimeRange = '24h' | '7d' | '30d' | '90d';

export interface DashboardFilters {
    timeRange: TimeRange;
    category?: string;
    compareWithPrevious: boolean;
}