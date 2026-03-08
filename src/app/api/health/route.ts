// src/app/api/health/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Verificar conexión a base de datos
        const dbStatus = await checkDatabaseConnection();

        // Verificar servicios externos
        const externalServices = await checkExternalServices();

        const healthStatus = {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            version: process.env.npm_package_version,
            dependencies: {
                database: dbStatus,
                ...externalServices,
            },
        };

        return NextResponse.json(healthStatus);
    } catch (error) {
        return NextResponse.json(
            {
                status: 'unhealthy',
                timestamp: new Date().toISOString(),
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 503 }
        );
    }
}

async function checkDatabaseConnection() {
    // Implementar verificación real de base de datos
    // Ejemplo con Prisma:
    // await prisma.$queryRaw`SELECT 1`
    
    return { 
        status: 'connected', 
        responseTime: '15ms' 
    };
}

async function checkExternalServices() {
    // Verificar servicios externos
    // Aquí puedes verificar APIs externas, Redis, etc.
    
    return {
        analytics: { status: 'connected' },
        cache: { status: 'connected' },
    };
}