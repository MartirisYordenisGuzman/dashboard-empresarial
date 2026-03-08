// src/components/templates/DashboardTemplate/DashboardTemplate.test.tsx
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { DashboardTemplate } from './DashboardTemplate';
import { useDashboard } from '@hooks/useDashboard';

// Mock del hook useDashboard
jest.mock('@hooks/useDashboard');

const mockUseDashboard = useDashboard as jest.MockedFunction<typeof useDashboard>;

describe('DashboardTemplate Integration', () => {
    const mockDashboardData = {
        metrics: [
            {
                id: 'revenue',
                name: 'Ingresos Totales',
                value: 125430,
                previousValue: 118200,
                unit: 'currency' as const,
                timestamp: new Date(),
            },
        ],
        chartData: {
            labels: ['Lun', 'Mar', 'Mié'],
            datasets: [
                {
                    label: 'Ventas',
                    data: [100, 200, 150],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                },
            ],
        },
        filters: { timeRange: '7d' },
        isLoading: false,
        error: null,
        handleTimeRangeChange: jest.fn(),
        setFilters: jest.fn(),
        fetchMetrics: jest.fn(),
        fetchChartData: jest.fn(),
        calculateChange: jest.fn(),
        hasData: true,
        isHydrated: true,
    };

    beforeEach(() => {
        mockUseDashboard.mockReturnValue(mockDashboardData as any);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders complete dashboard with data', async () => {
        render(<DashboardTemplate />);

        // Verificar que se renderizan las métricas
        await waitFor(() => {
            expect(screen.getByText('Ingresos Totales')).toBeInTheDocument();
        }, { timeout: 3000 });

        // Verificar que se renderizan los controles
        expect(screen.getByText(/24 Horas/i)).toBeInTheDocument();
        expect(screen.getByText(/7 Días/i)).toBeInTheDocument();

        // Verificar que se renderizan las secciones
        expect(screen.getByText(/Resumen General/i)).toBeInTheDocument();
        expect(screen.getByText(/Análisis Detallado/i)).toBeInTheDocument();
    });

    it('handles time range selection', async () => {
        render(<DashboardTemplate />);

        const timeRangeButton = screen.getByText(/30 Días/i);
        fireEvent.click(timeRangeButton);

        await waitFor(() => {
            expect(mockDashboardData.handleTimeRangeChange).toHaveBeenCalledWith('30d');
        });
    });

    it('shows loading state', () => {
        mockUseDashboard.mockReturnValue({
            ...mockDashboardData,
            isLoading: true,
            hasData: false,
        } as any);

        render(<DashboardTemplate />);

        // Buscar elementos con clase animate-pulse (skeleton)
        const skeletonElements = document.querySelectorAll('.animate-pulse');
        expect(skeletonElements.length).toBeGreaterThan(0);
    });

    it('handles error state', async () => {
        mockUseDashboard.mockReturnValue({
            ...mockDashboardData,
            error: 'Error al cargar datos',
            hasData: false,
        } as any);

        render(<DashboardTemplate />);

        await waitFor(() => {
            expect(screen.getByText(/Error al cargar los gráficos/i)).toBeInTheDocument();
        });
    });

    it('renders with custom featured metrics and charts', () => {
        render(
            <DashboardTemplate
                featuredMetrics={['revenue']}
                featuredCharts={['revenue']}
            />
        );

        // Verificar que se renderiza correctamente con props personalizadas
        expect(screen.getByText(/Resumen General/i)).toBeInTheDocument();
        expect(screen.getByText(/Análisis Detallado/i)).toBeInTheDocument();
    });
});