import { motion } from 'framer-motion';
import { PathNode } from './PathNode';
import { useGameStore } from '../../store/useGameStore';
import type { Lesson } from '../../types';
import { Avatar } from '../ui/Avatar';

interface JourneyPathProps {
    lessons: Lesson[];
    completedLessons: string[];
    currentLessonId: string | null;
    onLessonSelect: (lessonId: string) => void;
}

export function JourneyPath({ lessons, completedLessons, currentLessonId, onLessonSelect }: JourneyPathProps) {
    const { profile } = useGameStore();

    // Calculate positions for a sine wave path
    // We'll use a fixed height per node and oscillate X
    const NODE_HEIGHT = 100;
    const AMPLITUDE = 80; // How wide the curve is
    const CENTER_X = 150; // Center of the SVG container (assuming 300px width)

    return (
        <div className="relative w-full max-w-[300px] mx-auto">
            {/* SVG Path Line */}
            <svg
                className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
                style={{ height: lessons.length * NODE_HEIGHT + 100 }}
            >
                {/* Draw curve connecting nodes */}
                <path
                    d={lessons.map((_, i) => {
                        const y = i * NODE_HEIGHT + 50; // Center of node
                        const x = CENTER_X + Math.sin(i * 0.8) * AMPLITUDE;

                        if (i === 0) return `M ${x} ${y}`;

                        // Bezier curve to next point
                        const prevY = (i - 1) * NODE_HEIGHT + 50;
                        const prevX = CENTER_X + Math.sin((i - 1) * 0.8) * AMPLITUDE;

                        const cpY1 = prevY + NODE_HEIGHT / 2;
                        const cpY2 = y - NODE_HEIGHT / 2;

                        return `C ${prevX} ${cpY1}, ${x} ${cpY2}, ${x} ${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="#e7e5e4" // stone-200
                    strokeWidth="12"
                    strokeLinecap="round"
                />
            </svg>

            {/* Nodes */}
            <div className="relative z-10 flex flex-col items-center">
                {lessons.map((lesson, index) => {
                    const isCompleted = completedLessons.includes(lesson.id);
                    let status: 'locked' | 'current' | 'completed' = 'locked';
                    if (isCompleted) {
                        status = 'completed';
                    } else if (lesson.id === currentLessonId) {
                        status = 'current';
                    }

                    // Calculate X offset for zigzag
                    const xOffset = Math.sin(index * 0.8) * AMPLITUDE;

                    return (
                        <div key={lesson.id} className="relative" style={{ height: NODE_HEIGHT }}>
                            <PathNode
                                index={index}
                                status={status}
                                onClick={() => onLessonSelect(lesson.id)}
                                xOffset={xOffset}
                            />

                            {/* Avatar Floating above Current Node */}
                            {status === 'current' && (
                                <motion.div
                                    className="absolute -top-16 left-1/2 -ml-8 z-20 pointer-events-none"
                                    style={{ x: xOffset }}
                                    initial={{ y: -10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ type: 'spring', stiffness: 100 }}
                                >
                                    <div className="w-16 h-16 relative">
                                        <Avatar id={profile.avatarId} label={profile.name} className="w-16 h-16 border-4 border-orange-500 shadow-lg bg-white" />
                                        {/* Speech Bubble */}
                                        <motion.div
                                            className="absolute -top-8 -right-12 bg-white px-3 py-1 rounded-xl shadow-md border border-stone-200 text-xs font-bold text-stone-600 whitespace-nowrap"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            Let's go!
                                            <div className="absolute bottom-0 left-0 -mb-1 -ml-1 w-3 h-3 bg-white border-b border-l border-stone-200 transform rotate-45" />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
