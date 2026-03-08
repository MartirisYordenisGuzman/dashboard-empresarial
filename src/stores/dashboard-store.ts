import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Metric, ChartData, DashboardFilters, TimeRange } from '@/types/dashboard';
import { dashboardService } from '@services/dashboard-service';

interface DashboardState {
    // Estado
    metrics: Metric[];
    chartData: ChartData | null;
    filters: DashboardFilters;
    isLoading: boolean;
    error: string | null;

    // Acciones
    setMetrics: (metrics: Metric[]) => void;
    setChartData: (chartData: ChartData) => void;
    setFilters: (filters: Partial<DashboardFilters>) => void;
    setTimeRange: (timeRange: TimeRange) => void;
    fetchMetrics: () => Promise<void>;
    fetchChartData: (timeRange: TimeRange) => Promise<void>;
    resetError: () => void;
}

// Datos mock iniciales para desarrollo
const initialMetrics: Metric[] = [
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
    }
];

export const useDashboardStore = create<DashboardState>()(
    devtools(
        persist(
            (set) => ({
                metrics: initialMetrics,
                chartData: null,
                filters: {
                    timeRange: '7d',
                    compareWithPrevious: true
                },
                isLoading: false,
                error: null,

                // Acciones 
                setMetrics: (metrics) => set({ metrics }),
                setChartData: (chartData) => set({ chartData }),
                setFilters: (newFilters) => {
                    set((state) => ({
                        filters: { ...state.filters, ...newFilters }
                    }));
                },

                setTimeRange: (timeRange) => {
                    set((state) => ({
                        filters: { ...state.filters, timeRange }
                    }));
                },

                fetchMetrics: async () => {
                    set({ isLoading: true, error: null });

                    try {
                        const metrics = await dashboardService.getMetrics();
                        set({ metrics, isLoading: false });
                    } catch (error: any) {
                        set({ error: error.message || 'Error al cargar métricas', isLoading: false });
                    }
                },
                fetchChartData: async (timeRange) => {
                    set({ isLoading: true, error: null });

                    try {
                        const chartData = await dashboardService.getChartData(timeRange);
                        if (chartData) {
                            set({ chartData, isLoading: false });
                        } else {
                            set({ isLoading: false });
                        }
                    } catch (error: any) {
                        set({ error: error.message || 'Error al cargar datos del gráfico', isLoading: false });
                    }
                },

                resetError: () => set({ error: null })
            }),
            {
                name: 'dashboard-storage',
                partialize: (state) => ({
                    filters: state.filters
                })
            }
        )
    )
);


// Funciones auxiliares para generar datos mock
const generateLabels = (timeRange: TimeRange): string[] => {
    const ranges = {
        '24h': Array.from({ length: 24 }, (_, i) => `${i}h`),
        '7d': ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        '30d': Array.from({ length: 30 }, (_, i) => `${i + 1}`),
        '90d': Array.from({ length: 12 }, (_, i) => `Sem ${i + 1}`)
    };
    return ranges[timeRange];
}

function generateRandomData(timeRange: TimeRange): number[] {
    const length = generateLabels(timeRange).length;
    return Array.from({ length }, () =>
        Math.floor(Math.random() * 1000) + 500);
}
