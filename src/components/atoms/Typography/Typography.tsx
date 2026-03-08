// src/components/atoms/Typography/Typography.tsx
import React from 'react';
import { cn } from '@lib/utils';

export interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'label';
  color?: 'primary' | 'secondary' | 'muted' | 'error' | 'success';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  color = 'primary',
  weight = 'normal',
  align = 'left',
  children,
  className,
  ...props
}) => {
  const variantStyles = {
    h1: 'text-4xl font-bold tracking-tight',
    h2: 'text-3xl font-semibold tracking-tight',
    h3: 'text-2xl font-semibold',
    h4: 'text-xl font-medium',
    body: 'text-base leading-relaxed',
    caption: 'text-sm text-gray-600',
    label: 'text-sm font-medium uppercase tracking-wide'
  };

  const colorStyles = {
    primary: 'text-gray-900',
    secondary: 'text-gray-700',
    muted: 'text-gray-500',
    error: 'text-red-600',
    success: 'text-green-600'
  };

  const weightStyles = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const Component = variant.startsWith('h') ? variant as 'h1' | 'h2' | 'h3' | 'h4' : 'p';

  return (
    <Component
      className={cn(
        variantStyles[variant],
        colorStyles[color],
        weightStyles[weight],
        alignStyles[align],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};