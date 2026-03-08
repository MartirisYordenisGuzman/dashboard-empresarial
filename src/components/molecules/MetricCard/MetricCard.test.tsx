// src/components/molecules/MetricCard/MetricCard.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MetricCard } from './MetricCard';

const mockMetric = {
    title: 'Ingresos Totales',
    value: 125430,
    previousValue: 118200,
    unit: 'currency' as const,
};

// Helper para ignorar espacios y caracteres especiales de formato
const matchFormattedText = (text: string) => {
    // Normalizar: eliminar espacios, comas, puntos para comparar solo los números y símbolos esenciales
    const normalize = (str: string) => str.replace(/[\s\u00A0,.]+/g, '');
    const normalizedTarget = normalize(text);
    return (content: string, element: Element | null) => {
        return normalize(content).includes(normalizedTarget);
    };
};

describe('MetricCard Component', () => {
    it('renders metric data correctly', () => {
        render(<MetricCard {...mockMetric} />);

        expect(screen.getByText('Ingresos Totales')).toBeInTheDocument();
        // Comprobar que el valor numérico está presente ignorando formato
        expect(screen.getByText(matchFormattedText('125430'))).toBeInTheDocument();
        expect(screen.getAllByText(/€/)[0]).toBeInTheDocument();
        expect(screen.getByText(/Anterior:/)).toBeInTheDocument();
    });

    it('shows positive trend correctly', async () => {
        render(<MetricCard {...mockMetric} />);

        const trendIndicator = await screen.findByText(matchFormattedText('6.1%'));
        expect(trendIndicator).toBeInTheDocument();
        expect(trendIndicator.closest('.text-green-600')).toBeInTheDocument();
    });

    it('shows negative trend correctly', async () => {
        const negativeMetric = {
            ...mockMetric,
            value: 100000,
            previousValue: 120000,
        };

        render(<MetricCard {...negativeMetric} />);

        const trendIndicator = await screen.findByText(matchFormattedText('16.7%'));
        expect(trendIndicator).toBeInTheDocument();
        expect(trendIndicator.closest('.text-red-600')).toBeInTheDocument();
    });

    it('displays loading state', async () => {
        render(<MetricCard {...mockMetric} isLoading />);

        const skeletonElements = await screen.findAllByRole('generic');
        const hasPulse = Array.from(skeletonElements).some(el => el.classList.contains('animate-pulse'));
        expect(hasPulse).toBe(true);
    });

    it('formats percentage values correctly', () => {
        const percentageMetric = {
            title: 'Tasa de Conversión',
            value: 4.3,
            previousValue: 3.8,
            unit: 'percentage' as const,
        };

        render(<MetricCard {...percentageMetric} />);

        expect(screen.getByText(matchFormattedText('4.3%'))).toBeInTheDocument();
    });

    it('formats number values correctly', () => {
        const numberMetric = {
            title: 'Usuarios Activos',
            value: 2845,
            previousValue: 2560,
            unit: 'number' as const,
        };

        render(<MetricCard {...numberMetric} />);

        expect(screen.getByText(matchFormattedText('2845'))).toBeInTheDocument();
    });
});