// src/components/optimization/DashboardErrorBoundary.tsx
'use client';

import React from 'react';
import { Card, CardContent } from '@components/atoms/Card';
import { Typography } from '@components/atoms/Typography';
import { Button } from '@components/atoms/Button';

interface Props {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class DashboardErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error Boundary caught an error:', error, errorInfo);

        // Enviar error a servicio de monitoring
        if (process.env.NODE_ENV === 'production') {
            // Integración con servicio como Sentry, LogRocket, etc.
            // Ejemplo: Sentry.captureException(error);
        }
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: undefined });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <Card className="m-4">
                    <CardContent className="p-6 text-center">
                        <Typography variant="h3" color="error" className="mb-2">
                            Algo salió mal
                        </Typography>
                        <Typography variant="body" color="muted" className="mb-4">
                            Ha ocurrido un error inesperado en el dashboard.
                        </Typography>
                        <Button onClick={this.handleRetry} variant="primary">
                            Reintentar
                        </Button>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mt-4 text-left">
                                <summary className="cursor-pointer">Detalles del error (Desarrollo)</summary>
                                <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                                    {this.state.error.stack}
                                </pre>
                            </details>
                        )}
                    </CardContent>
                </Card>
            );
        }

        return this.props.children;
    }
}