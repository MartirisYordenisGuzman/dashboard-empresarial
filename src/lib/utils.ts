import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
 //Formateadores de datos paa el dashboard
 export const formatCurrency = (value: number): string => {
 return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',

 }).format(value);
};

export const formatPercentage = (value: number): string => {
    return new Intl.NumberFormat('es-ES', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
    }).format(value/100);
};