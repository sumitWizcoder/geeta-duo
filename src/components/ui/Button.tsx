import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}

export function Button({
    children,
    onClick,
    variant = 'primary',
    disabled = false,
    className = '',
    type = 'button',
}: ButtonProps) {
    const baseClass = variant === 'primary'
        ? 'btn-primary'
        : variant === 'secondary'
            ? 'btn-secondary'
            : 'btn-outline';

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
        >
            {children}
        </motion.button>
    );
}
