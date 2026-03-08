// src/components/optimization/PerformanceMonitor.tsx
'use client';

import { useEffect } from 'react';

export function PerformanceMonitor() {
  useEffect(() => {
    // if (process.env.NODE_ENV === 'production' && 'webVitals' in window) {
    //   // Importación dinámica de las funciones de web-vitals
    //   import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    //     getCLS(console.log);
    //     getFID(console.log);
    //     getFCP(console.log);
    //     getLCP(console.log);
    //     getTTFB(console.log);
    //   });
    // }
  }, []);

  return null;
}