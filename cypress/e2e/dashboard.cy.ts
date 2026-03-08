// cypress/e2e/dashboard.cy.ts
describe('Dashboard E2E Tests', () => {
    beforeEach(() => {
        cy.visit('/dashboard');
        cy.intercept('GET', '/api/metrics', {
            statusCode: 200,
            body: {
                metrics: [
                    {
                        id: 'revenue',
                        name: 'Ingresos Totales',
                        value: 125430,
                        previousValue: 118200,
                        unit: 'currency',
                    },
                ],
            },
        }).as('getMetrics');
    });

    it('loads and displays dashboard correctly', () => {
        cy.wait('@getMetrics');

        // Verificar elementos principales
        cy.get('h1').should('contain', 'Dashboard Principal');
        cy.get('[data-testid="metric-card"]').should('have.length.at.least', 1);
        cy.get('[data-testid="time-range-selector"]').should('be.visible');
    });

    it('changes time range and updates data', () => {
        cy.intercept('GET', '/api/chart-data?range=30d', {
            statusCode: 200,
            body: {
                labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
                datasets: [{
                    data: [100, 200, 150, 300]
                }],
            },
        }).as('getChartData30d');

        cy.get('button').contains('30 Días').click();
        cy.wait('@getChartData30d');
        cy.get('canvas').should('be.visible');
    });

    it('handles navigation correctly', () => {
        cy.get('nav a').contains('Analiticas').click();
        cy.url().should('include', '/analytics');
        cy.get('h1').should('contain', 'Analiticas');
    });

    it('searches metrics successfully', () => {
        cy.get('input[placeholder*="Buscar"]').type('ingresos{enter}');
        cy.get('[data-testid="metric-card"]').should('contain', 'Ingresos');
    });

    it('displays error state correctly', () => {
        cy.intercept('GET', '/api/metrics', {
            statusCode: 500,
            body: { error: 'Server error' },
        }).as('getMetricsError');

        cy.reload();
        cy.wait('@getMetricsError');

        cy.get('[data-testid="error-state"]').should('be.visible');
        cy.contains('Error al cargar las métricas').should('be.visible');
    });
});