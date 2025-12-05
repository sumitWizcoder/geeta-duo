import { motion } from 'framer-motion';
import { Check, Star, Lock } from 'lucide-react';

interface PathNodeProps {
    status: 'locked' | 'current' | 'completed';
    index: number;
    onClick: () => void;
    xOffset?: number; // For zigzag positioning
}

export function PathNode({ status, onClick, xOffset = 0 }: PathNodeProps) {
    const isLocked = status === 'locked';
    const isCompleted = status === 'completed';
    const isCurrent = status === 'current';

    return (
        <div
            className="relative flex justify-center items-center z-10 my-4"
            style={{ transform: `translateX(${xOffset}px)` }}
        >
            {/* Outer Glow/Bounce for Current */}
            {isCurrent && (
                <motion.div
                    className="absolute w-24 h-24 rounded-full bg-orange-200/50"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                />
            )}

            {/* Node Button */}
            <motion.button
                onClick={onClick}
                disabled={isLocked}
                whileHover={!isLocked ? { scale: 1.1 } : {}}
                whileTap={!isLocked ? { scale: 0.9 } : {}}
                className={`w-20 h-20 rounded-full flex items-center justify-center border-b-8 transition-all duration-300 relative
                    ${isCompleted
                        ? 'bg-gradient-to-b from-yellow-400 to-orange-500 border-orange-600 shadow-lg'
                        : isCurrent
                            ? 'bg-gradient-to-b from-orange-400 to-orange-500 border-orange-700 shadow-xl'
                            : 'bg-stone-200 border-stone-300 text-stone-400'
                    }`}
            >
                {/* Icon */}
                <div className="text-white drop-shadow-md">
                    {isCompleted ? (
                        <Check className="w-10 h-10 stroke-[4]" />
                    ) : isLocked ? (
                        <Lock className="w-8 h-8 text-stone-400" />
                    ) : (
                        <Star className="w-10 h-10 fill-white" />
                    )}
                </div>

                {/* Shine Effect for Active/Completed */}
                {!isLocked && (
                    <div className="absolute top-2 left-4 w-4 h-2 bg-white/40 rounded-full -rotate-45" />
                )}
            </motion.button>

            {/* Floating Stars/Particles for Current */}
            {isCurrent && (
                <>
                    <motion.div
                        className="absolute -top-4 -right-4 text-yellow-400"
                        animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                    >
                        ✨
                    </motion.div>
                    <motion.div
                        className="absolute -bottom-2 -left-4 text-orange-400"
                        animate={{ y: [0, -8, 0], opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: 0.7 }}
                    >
                        ✨
                    </motion.div>
                </>
            )}
        </div>
    );
}
