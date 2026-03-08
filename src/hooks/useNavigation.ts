// src/hooks/useNavigation.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NavigationState {
    isSidebarCollapsed: boolean;
    activeSection: string;
    recentSections: string[];
    
    // Acciones
    toggleSidebar: () => void;
    setActiveSection: (section: string) => void;
    collapseSidebar: () => void;
    expandSidebar: () => void;
}

export const useNavigation = create<NavigationState>()(
    persist(
        (set, get) => ({
            isSidebarCollapsed: false,
            activeSection: 'dashboard',
            recentSections: ['dashboard', 'analytics'],
            
            toggleSidebar: () => {
                set({ isSidebarCollapsed: !get().isSidebarCollapsed });
            },
            
            setActiveSection: (section: string) => {
                const recentSections = [...get().recentSections];
                if (!recentSections.includes(section)) {
                    recentSections.unshift(section);
                    if (recentSections.length > 5) {
                        recentSections.pop();
                    }
                }
                
                set({
                    activeSection: section,
                    recentSections
                });
            },
            
            collapseSidebar: () => {
                set({ isSidebarCollapsed: true });
            },
            
            expandSidebar: () => {
                set({ isSidebarCollapsed: false });
            }
        }),
        {
            name: 'navigation-storage', // nombre para el localStorage
        }
    )
);