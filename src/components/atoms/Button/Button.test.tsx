// src/components/atoms/Button/Button.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
    it('renders correctly with default props', () => {
        render(<Button>Click me</Button>);
        
        const button = screen.getByRole('button', { name: /click me/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('bg-primary-500');
    });

    it('renders with secondary variant', () => {
        render(<Button variant="secondary">Secondary Button</Button>);

        const button = screen.getByRole('button');
        expect(button).toHaveClass('bg-gray-100');
    });

    it('handles click events', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Clickable</Button>);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('shows loading state correctly', () => {
        render(<Button isLoading>Button</Button>);

        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
        expect(button).toHaveTextContent('Cargando...');
    });

    it('applies custom className', () => {
        render(<Button className="custom-class">Button</Button>);

        const button = screen.getByRole('button');
        expect(button).toHaveClass('custom-class');
    });
});