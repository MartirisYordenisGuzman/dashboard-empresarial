// src/app/api/chart-data/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '7d';

    // Mock data based on range
    const labels = {
        '24h': Array.from({ length: 24 }, (_, i) => `${i}h`),
        '7d': ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        '30d': Array.from({ length: 30 }, (_, i) => `${i + 1}`),
        '90d': Array.from({ length: 12 }, (_, i) => `Sem ${i + 1}`)
    }[range as '24h' | '7d' | '30d' | '90d'] || [];

    return NextResponse.json({
        labels,
        datasets: [
            {
                label: 'Ventas',
                data: labels.map(() => Math.floor(Math.random() * 1000) + 500),
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
            }
        ]
    });
}
