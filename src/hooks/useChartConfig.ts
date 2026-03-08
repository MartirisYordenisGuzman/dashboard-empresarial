// src/hooks/useChartConfig.ts
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { useEffect } from 'react';

// Registrar componentes de Chart.js una sola vez
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export interface ChartConfig {
  type: 'line' | 'bar';
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
    fill?: boolean;
  }[];
  options?: any;
}

export const useChartConfig = () => {
  // Configuración global de Chart.js
  useEffect(() => {
    ChartJS.defaults.font.family = 'Inter, system-ui, sans-serif';
    ChartJS.defaults.color = '#6B7280';
    ChartJS.defaults.borderColor = 'rgba(229, 231, 235, 0.5)';
  }, []);

  const getDefaultOptions = (title: string): any => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
        }
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: '600'
        }
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1F2937',
        bodyColor: '#374151',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        cornerRadius: 6,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ' ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('es-ES').format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(229, 231, 235, 0.5)',
        },
        ticks: {
          callback: function(value: any) {
            return new Intl.NumberFormat('es-ES', {
              notation: 'compact',
              compactDisplay: 'short'
            }).format(value);
          }
        }
      }
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear'
      }
    }
  });

  const colorPalette = {
    primary: '#3882F6',
    secondary: '#1B8981',
    tertiary: '#F59E08',
    quaternary: '#EF4444',
    background: 'rgb(59, 130, 246, 0.1)'
  };

  return {
    getDefaultOptions,
    colorPalette
  };
};