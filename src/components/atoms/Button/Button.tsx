import React from 'react';
import {cn} from '@/lib/utils';

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
        variant?: 'primary' | 'secondary' | 'outline';
        size?: 'sm' | 'md' | 'lg';
        isLoading?: boolean;
    }

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    className,
    disabled,
    ...props

}) => {
    const baseStyles = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2';


const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-300',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 focus:gray-300',
    outline: 'border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-primary-300'
};

const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
};

return (
    <button 
    className={cn(
            baseStyles,
            variants[variant],
            sizes[size],
            (disabled || isLoading) && 'opacity-50 cursor-not-allowed',
            className
        )}
        disabled={disabled || isLoading}
        {...props}
        >
            {isLoading ? (
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Cargando...
                </div>
            ): (
                children
            )}
        </button>
    );
};