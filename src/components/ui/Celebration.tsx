import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowSize } from 'react-use';
import { Button } from './Button';

interface CelebrationProps {
    show: boolean;
    message?: string;
    earnedXP?: number;
    shloka?: {
        text: string;
        translation: string;
    };
    moral?: string;
    onComplete?: () => void;
}

export function Celebration({ show, message, earnedXP, shloka, moral, onComplete }: CelebrationProps) {
    const { width, height } = useWindowSize();
    const [dismissed, setDismissed] = useState(false);
    const [prevShow, setPrevShow] = useState(show);
    if (show !== prevShow) {
        setPrevShow(show);
        setDismissed(false);
    }
    const isVisible = show && !dismissed;

    useEffect(() => {
        // Only auto-dismiss if there is no educational content (shloka/moral)
        if (show && !shloka && !moral) {
            const timer = setTimeout(() => {
                setDismissed(true);
                if (onComplete) onComplete();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [show, onComplete, shloka, moral]);

    const handleContinue = () => {
        setDismissed(true);
        if (onComplete) onComplete();
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                >
                    <Confetti
                        width={width}
                        height={height}
                        recycle={false}
                        numberOfPieces={500}
                        gravity={0.2}
                    />
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-lg w-full border-4 border-yellow-400"
                    >
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 text-center">
                            <h2 className="text-3xl font-bold text-orange-600 mb-2 font-fredoka">
                                {message || 'Lesson Completed!'}
                            </h2>
                            {earnedXP !== undefined && (
                                <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-orange-200 mt-2 text-orange-600 font-bold">
                                    <span>🌟</span>
                                    <span>+{earnedXP} XP</span>
                                </div>
                            )}
                        </div>

                        {(shloka || moral) && (
                            <div className="p-8 space-y-6">
                                {shloka && (
                                    <div className="text-center space-y-3">
                                        <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wider">Ancient Wisdom</h3>
                                        <p className="text-2xl font-medium text-stone-900 leading-relaxed">"{shloka.text}"</p>
                                        <p className="text-lg text-stone-800 border-t-2 border-stone-100 pt-3 mt-3">{shloka.translation}</p>
                                    </div>
                                )}

                                {moral && (
                                    <div className="bg-yellow-50 p-6 rounded-2xl border-2 border-yellow-200 text-center shadow-sm">
                                        <h3 className="text-base font-bold text-yellow-800 mb-2 uppercase tracking-wide">💡 Golden Lesson</h3>
                                        <p className="text-stone-900 font-bold text-lg leading-snug">{moral}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="p-6 bg-stone-50 border-t border-stone-100 flex justify-center">
                            <Button onClick={handleContinue} className="w-full max-w-xs">
                                Continue
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
