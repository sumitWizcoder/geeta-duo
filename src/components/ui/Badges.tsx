import { motion } from 'framer-motion';
import { Sparkles, Flame } from 'lucide-react';

interface XPBadgeProps {
    xp: number;
    className?: string;
}

export function XPBadge({ xp, className = '' }: XPBadgeProps) {
    return (
        <motion.div
            className={`badge badge-xp ${className}`}
            whileHover={{ scale: 1.1 }}
        >
            <Sparkles className="w-4 h-4" />
            <span>{xp} XP</span>
        </motion.div>
    );
}

interface StreakBadgeProps {
    streak: number;
    className?: string;
}

export function StreakBadge({ streak, className = '' }: StreakBadgeProps) {
    return (
        <motion.div
            className={`badge badge-streak ${className}`}
            whileHover={{ scale: 1.1 }}
        >
            <Flame className="w-4 h-4" />
            <span>{streak} Day Streak</span>
        </motion.div>
    );
}
