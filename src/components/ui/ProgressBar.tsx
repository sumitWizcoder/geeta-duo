import { motion } from 'framer-motion';

interface ProgressBarProps {
    current: number;
    total: number;
    className?: string;
}

export function ProgressBar({ current, total, className = '' }: ProgressBarProps) {
    const percentage = Math.min((current / total) * 100, 100);

    return (
        <div className={`progress-bar ${className}`}>
            <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            />
        </div>
    );
}
