// src/components/organisms/Sidebar/Sidebar.tsx
'use client';

import React, { useState } from 'react';
import { cn } from '@lib/utils';
import { Typography } from '@components/atoms/Typography';
import { Card } from '@components/atoms/Card';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    ChartBarIcon,
    HomeIcon,
    UsersIcon,
    CogIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';

export interface SidebarItem {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
    badge?: number;
    isActive?: boolean;
}

export interface SidebarProps {
    className?: string;
    onItemClick?: (itemId: string) => void;
}

const navigationItems: SidebarItem[] = [
    {
        id: 'dashboard',
        label: 'Dashboard Principal',
        icon: HomeIcon,
        href: '/dashboard',
        isActive: true
    },
    {
        id: 'analytics',
        label: 'Analíticas',
        icon: ChartBarIcon,
        href: '/analytics',
        badge: 3
    },
    {
        id: 'customers',
        label: 'Clientes',
        icon: UsersIcon,
        href: '/customers'
    },
    {
        id: 'settings',
        label: 'Configuración',
        icon: CogIcon,
        href: '/settings'
    }
];

export const Sidebar: React.FC<SidebarProps> = ({
    className,
    onItemClick
}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    const handleItemClick = (itemId: string) => {
        onItemClick?.(itemId);
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <Card
            className={cn(
                'fixed left-0 top-0 h-full z-40 transition-all duration-300',
                'border-r border-gray-200 rounded-none shadow-lg',
                isCollapsed ? 'w-16' : 'w-64',
                className
            )}
            shadow="none"
            border={false}
        >
            {/* Header del Sidebar */}
            <div className={cn(
                'flex items-center border-b border-gray-100 p-4',
                isCollapsed ? 'justify-center' : 'justify-between'
            )}>
                {!isCollapsed && (
                    <Typography variant="h3" className="text-primary-600">
                        BizDash
                    </Typography>
                )}
                <button
                    onClick={toggleCollapse}
                    className={cn(
                        'p-1 rounded-lg hover:bg-gray-100 transition-colors',
                        'focus:outline-none focus:ring-2 focus:ring-primary-300'
                    )}
                >
                    {isCollapsed ? (
                        <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                    ) : (
                        <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                    )}
                </button>
            </div>

            {/* Navegación */}
            <nav className="mt-6">
                <ul className="space-y-1 px-2">
                    {navigationItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <li key={item.id}>
                                <Link
                                    href={item.href}
                                    onClick={() => handleItemClick(item.id)}
                                    className={cn(
                                        'w-full flex items-center rounded-lg px-3 py-2 transition-all',
                                        'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-300',
                                        pathname === item.href || (item.id === 'dashboard' && pathname === '/')
                                            ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                                            : 'text-gray-700'
                                    )}
                                >
                                    <Icon className="h-5 w-5 flex-shrink-0" />
                                    {!isCollapsed && (
                                        <>
                                            <Typography
                                                variant="body"
                                                weight="medium"
                                                className={cn(
                                                    'ml-3 transition-opacity duration-200 flex-1 text-left',
                                                    isCollapsed ? 'opacity-0 w-0' : 'opacity-100'
                                                )}
                                            >
                                                {item.label}
                                            </Typography>
                                            {item.badge && (
                                                <span className={cn(
                                                    'ml-auto inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                                                    pathname === item.href || (item.id === 'dashboard' && pathname === '/')
                                                        ? 'bg-primary-100 text-primary-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                )}>
                                                    {item.badge}
                                                </span>
                                            )}
                                        </>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer del Sidebar */}
            {!isCollapsed && (
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                            <Typography variant="body" weight="bold" className="text-white text-sm">
                                JD
                            </Typography>
                        </div>
                        <div className="flex-1 min-w-0">
                            <Typography variant="body" weight="medium" className="truncate">
                                Juan Díaz
                            </Typography>
                            <Typography variant="caption" color="muted" className="truncate">
                                Administrador
                            </Typography>
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
};