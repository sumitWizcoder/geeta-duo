import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Trophy } from 'lucide-react';
import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';

export function LessonComplete() {
    const navigate = useNavigate();
    const location = useLocation();
    const { score, total, xpEarned } = location.state || { score: 0, total: 0, xpEarned: 0 };
    const [showConfetti, setShowConfetti] = useState(true);

    const percentage = Math.round((score / total) * 100);
    const isPerfect = score === total;

    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}

            <motion.div
                className="max-w-2xl w-full text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
            >
                {/* Trophy Animation */}
                <motion.div
                    className="mb-8"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
                >
                    <div className="text-9xl mb-4">
                        {isPerfect ? '🏆' : percentage >= 70 ? '⭐' : '💪'}
                    </div>
                </motion.div>

                {/* Title */}
                <motion.h1
                    className="text-5xl font-display font-bold text-gradient mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {isPerfect
                        ? 'Perfect Score!'
                        : percentage >= 70
                            ? 'Great Job!'
                            : 'Keep Learning!'}
                </motion.h1>

                {/* Message */}
                <motion.p
                    className="text-xl text-gray-600 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    {isPerfect
                        ? "You're learning like a warrior! 🎯"
                        : percentage >= 70
                            ? 'Your wisdom is growing! ✨'
                            : 'Keep going — every step counts! 💫'}
                </motion.p>

                {/* Stats Card */}
                <motion.div
                    className="card-glow p-8 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <div className="grid grid-cols-3 gap-6">
                        <div>
                            <div className="text-4xl font-bold text-peacock-600 mb-2">
                                {score}/{total}
                            </div>
                            <div className="text-sm text-gray-600">Correct Answers</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-saffron-600 mb-2">
                                {percentage}%
                            </div>
                            <div className="text-sm text-gray-600">Score</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-lotus-600 mb-2">
                                +{xpEarned}
                            </div>
                            <div className="text-sm text-gray-600">XP Earned</div>
                        </div>
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    className="flex gap-4 justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <Button onClick={() => navigate('/dashboard')}>
                        <Trophy className="w-5 h-5 mr-2 inline" />
                        Continue Learning
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
}
