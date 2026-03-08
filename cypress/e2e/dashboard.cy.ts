// cypress/e2e/dashboard.cy.ts
describe('Dashboard E2E Tests', () => {
    beforeEach(() => {
        // Interceptores con wildcards para mayor robustez
        cy.intercept('GET', '**/api/metrics*').as('getMetrics');
        cy.intercept('GET', '**/api/chart-data*').as('getChartData');
        cy.visit('/');
    });

    it('loads and displays dashboard correctly', () => {
        // Esperar a que la página cargue y el título sea visible
        cy.get('[data-testid="main-title"]', { timeout: 10000 }).should('be.visible');
        cy.contains('Resumen General').should('be.visible');

        // Verificar métricas sin depender estrictamente del wait si ya están presentes
        cy.get('[data-testid="metric-card"]').should('have.length.at.least', 1);
    });

    it('changes time range and updates data', () => {
        // Interceptar cualquier llamada a chart-data
        cy.intercept('GET', '**/api/chart-data*').as('anyChartData');

        cy.get('[data-testid="time-range-selector"]').contains('30 Días').click();

        // Esperar a que algo cambie o la petición termine
        cy.wait('@anyChartData');
        cy.get('canvas').should('be.visible');
    });

    it('handles navigation correctly', () => {
        // Encontrar el link de Analíticas en el Sidebar
        cy.get('nav a').contains(/Anal[íi]ticas/i).click();
        cy.url().should('include', '/analytics');
    });

    it('searches metrics successfully', () => {
        cy.get('input[placeholder*="Buscar"]').type('ingresos');
        cy.get('[data-testid="metric-card"]').should('contain', 'Ingresos');
    });

    it('displays error state correctly', () => {
        // Interceptar métricas con error
        cy.intercept('GET', '**/api/metrics*', {
            statusCode: 500,
            body: { error: 'Server error' },
            delay: 500
        }).as('getMetricsError');

        // Visitamos / (que no tiene data inicial del servidor, por lo que disparará el fetch en el cliente)
        cy.visit('/');

        // Debería mostrar el estado de error
        cy.get('[data-testid="error-state"]', { timeout: 15000 }).should('be.visible');
        cy.contains('Error al cargar las métricas').should('be.visible');
    });
});