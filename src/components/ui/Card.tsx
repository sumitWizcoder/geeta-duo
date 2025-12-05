import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    glow?: boolean;
    onClick?: () => void;
}

export function Card({ children, className = '', glow = false, onClick }: CardProps) {
    const cardClass = glow ? 'card-glow' : 'card';

    return (
        <motion.div
            className={`${cardClass} ${className} ${onClick ? 'cursor-pointer' : ''}`}
            onClick={onClick}
            whileHover={onClick ? { scale: 1.02 } : {}}
            whileTap={onClick ? { scale: 0.98 } : {}}
        >
            {children}
        </motion.div>
    );
}
