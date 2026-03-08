import { Metric, ChartData, TimeRange } from '@/types/dashboard';

class DashboardService {
    private baseURL = process.env.API_BASE_URL || 'https://api.example.com';

    async getMetrics(): Promise<Metric[]> {
        const response = await fetch('/api/metrics');
        if (!response.ok) throw new Error('Failed to fetch metrics');
        const data = await response.json();
        return data.metrics;
    }

    async getChartData(timeRange: TimeRange): Promise<ChartData | null> {
        const response = await fetch(`/api/chart-data?range=${timeRange}`);
        if (!response.ok) throw new Error('Failed to fetch chart data');
        return await response.json();
    }

    private generateLabels(timeRange: TimeRange): string[] {
        const ranges = {
            '24h': Array.from({ length: 24 }, (_, i) => `${i}h`),
            '7d': ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
            '30d': Array.from({ length: 30 }, (_, i) => `${i + 1}`),
            '90d': Array.from({ length: 12 }, (_, i) => `Sem ${i + 1}`)
        };
        return ranges[timeRange];
    }
}

export const dashboardService = new DashboardService();
