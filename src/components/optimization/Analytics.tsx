// src/components/optimization/Analytics.tsx
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useDashboardStore } from '@stores/dashboard-store';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { metrics, filters } = useDashboardStore();

  useEffect(() => {
    // Track page view
    if (typeof window.gtag !== 'undefined' && process.env.NEXT_PUBLIC_GA_ID) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    // Track dashboard interactions
    if (typeof window.gtag !== 'undefined' && metrics.length > 0) {
      window.gtag('event', 'dashboard_loaded', {
        event_category: 'engagement',
        event_label: 'dashboard_view',
        metric_count: metrics.length,
        time_range: filters?.timeRange || '7d',
      });
    }
  }, [metrics.length, filters?.timeRange]);

  return null;
}