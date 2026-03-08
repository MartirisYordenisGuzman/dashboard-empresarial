// src/hooks/useDashboard.test.tsx
import { renderHook, act } from '@testing-library/react';
import { useDashboard } from './useDashboard';
import { useDashboardStore } from '@stores/dashboard-store';

// Mock del store
jest.mock('@stores/dashboard-store');

const mockStore = {
    metrics: [],
    chartData: null,
    filters: { timeRange: '7d' },
    isLoading: false,
    error: null,
    setMetrics: jest.fn(),
    setChartData: jest.fn(),
    setTimeRange: jest.fn(),
    setFilters: jest.fn(),
    fetchMetrics: jest.fn(),
    fetchChartData: jest.fn(),
};

describe('useDashboard Hook', () => {
    beforeEach(() => {
        (useDashboardStore as unknown as jest.Mock).mockReturnValue(mockStore);
        (useDashboardStore.getState as jest.Mock).mockReturnValue(mockStore);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('returns initial state correctly', () => {
        const { result } = renderHook(() => useDashboard());

        expect(result.current.metrics).toEqual([]);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.hasData).toBe(false);
    });

    it('handles time range change', () => {
        const { result } = renderHook(() => useDashboard());

        act(() => {
            result.current.handleTimeRangeChange('30d');
        });

        expect(mockStore.setTimeRange).toHaveBeenCalledWith('30d');
    });

    it('calculates percentage change correctly', () => {
        const { result } = renderHook(() => useDashboard());

        const change = result.current.calculateChange(150, 100);
        expect(change).toBe(50);

        const negativeChange = result.current.calculateChange(80, 100);
        expect(negativeChange).toBe(-20);
    });

    it('handles zero previous value', () => {
        const { result } = renderHook(() => useDashboard());

        const change = result.current.calculateChange(100, 0);
        expect(change).toBe(0);
    });

    it('hydrates store with initial data', () => {
        const initialData = {
            metrics: [{ id: 'revenue', value: 1000, name: 'Test', previousValue: 0, unit: 'number' as const, timestamp: new Date() }],
            chartData: { labels: [], datasets: [] },
            timestamp: '2024-01-01'
        };

        renderHook(() => useDashboard({ initialData }));

        expect(mockStore.setMetrics).toHaveBeenCalledWith(initialData.metrics);
        expect(mockStore.setChartData).toHaveBeenCalledWith(initialData.chartData);
    });

    it('returns initial data when provided', () => {
        const initialData = {
            metrics: [{ id: 'revenue', value: 1000, name: 'Test', previousValue: 0, unit: 'number' as const, timestamp: new Date() }],
            chartData: { labels: [], datasets: [] },
            timestamp: '2024-01-01'
        };

        const { result } = renderHook(() => useDashboard({ initialData }));

        expect(result.current.metrics).toEqual(initialData.metrics);
        expect(result.current.chartData).toEqual(initialData.chartData);
        expect(result.current.isHydrated).toBe(false);
    });

    it('handles loading state correctly', () => {
        const loadingStore = {
            ...mockStore,
            isLoading: true
        };
        (useDashboardStore as unknown as jest.Mock).mockReturnValue(loadingStore);

        const { result } = renderHook(() => useDashboard());

        expect(result.current.isLoading).toBe(true);
    });
});