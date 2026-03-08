// src/app/api/metrics/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        metrics: [
            {
                id: 'revenue',
                name: 'Ingresos Totales',
                value: 125430,
                previousValue: 118200,
                unit: 'currency',
            },
            {
                id: 'conversion',
                name: 'Tasa de Conversión',
                value: 4.3,
                previousValue: 3.8,
                unit: 'percentage',
            },
            {
                id: 'users',
                name: 'Usuarios Activos',
                value: 2845,
                previousValue: 2560,
                unit: 'number',
            }
        ]
    });
}
