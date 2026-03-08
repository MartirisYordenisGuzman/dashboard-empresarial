// src/components/templates/DashboardLayout/DashboardLayout.tsx
'use client';

import React, { useState } from 'react';
import { cn } from '@lib/utils';
import { Sidebar } from '@components/organisms/Sidebar';
import { Header } from '@components/organisms/Header';

export interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarCollapsed?: boolean;
  onSearch?: (query: string) => void;
  className?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  sidebarCollapsed: initialCollapsed = false,
  onSearch,
  className
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(initialCollapsed);

  const handleNotificationClick = () => {
    console.log('Notificaciones click');
    // Implementar lógica de notificaciones
  };

  const handleAddClick = () => {
    console.log('Añadir nuevo informe');
    // Implementar lógica de añadir
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        onItemClick={(itemId) => console.log('Navegación:', itemId)}
        className={cn(
          'transition-all duration-300',
          isSidebarCollapsed ? 'w-16' : 'w-64'
        )}
      />

      {/* Main Content Area */}
      <main className={cn(
        'min-h-screen transition-all duration-300',
        isSidebarCollapsed ? 'ml-16' : 'ml-64'
      )}>
        {/* Header */}
        <Header
          title="Dashboard Principal"
          subtitle="Resumen completo de las métricas empresariales"
          onSearch={onSearch}
          onNotificationClick={handleNotificationClick}
          onAddClick={handleAddClick}
        />

        {/* Content */}
        <div className={cn('p-6', className)}>
          {children}
        </div>
      </main>
    </div>
  );
};