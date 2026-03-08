import { Metric, ChartData, TimeRange } from '@/types/dashboard';

class DashboardService {
    private baseURL = process.env.API_BASE_URL || 'https://api.example.com';

    async getMetrics(): Promise<Metric[]> {
        // Simulación de datos - en producción sería una llamada real
        await new Promise(resolve => setTimeout(resolve, 100));

        return [
            {
                id: 'revenue',
                name: 'Ingresos Totales',
                value: 125430,
                previousValue: 118200,
                unit: 'currency',
                timestamp: new Date()
            },
            {
                id: 'conversion',
                name: 'Tasa de Conversión',
                value: 4.3,
                previousValue: 3.8,
                unit: 'percentage',
                timestamp: new Date()
            },
            {
                id: 'users',
                name: 'Usuarios Activos',
                value: 2845,
                previousValue: 2560,
                unit: 'number',
                timestamp: new Date()
            }
        ];
    }

    async getChartData(timeRange: TimeRange): Promise<ChartData | null> {
        await new Promise(resolve => setTimeout(resolve, 150));

        const labels = this.generateLabels(timeRange);

        return {
            labels,
            datasets: [
                {
                    label: 'Ventas',
                    data: labels.map(() => Math.floor(Math.random() * 1000) + 500),
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                }
            ]
        };
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
