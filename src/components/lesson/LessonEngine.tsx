import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import type { Question } from '../../types';
import { ProgressBar } from '../ui/ProgressBar';
import { Button } from '../ui/Button';
import { CheckCircle, XCircle } from 'lucide-react';

interface LessonEngineProps {
    lessonId: string;
    questions: Question[];
    xpReward: number;
    onComplete?: (earnedXP: number) => void;
}

export function LessonEngine({ lessonId, questions, xpReward, onComplete }: LessonEngineProps) {
    const { addXP, completeLesson, progress } = useGameStore();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [score, setScore] = useState(0);

    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    const handleAnswerSelect = (answer: string) => {
        if (showFeedback) return;
        setSelectedAnswer(answer);
    };

    const handleSubmit = () => {
        if (!selectedAnswer) return;

        const correct = selectedAnswer === currentQuestion.correct;
        setIsCorrect(correct);
        setShowFeedback(true);

        if (correct) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (isLastQuestion) {
            // Calculate XP: Full for first time, 20% for retries
            const isRevisit = progress.completedLessons.includes(lessonId);
            const earnedXP = isRevisit ? Math.floor(xpReward * 0.2) : xpReward;

            addXP(earnedXP);
            completeLesson(lessonId);

            if (onComplete) onComplete(earnedXP);
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setShowFeedback(false);
            setIsCorrect(false);
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-3xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-8">
                    <ProgressBar
                        current={currentQuestionIndex + 1}
                        total={questions.length}
                    />
                    <p className="text-sm text-gray-600 mt-2 text-center">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </p>
                </div>

                {/* Question Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestionIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="card-glow p-8 mb-6"
                    >
                        <h2 className="text-2xl font-bold text-peacock-700 mb-6">
                            {currentQuestion.question}
                        </h2>

                        {/* Options */}
                        <div className="space-y-4 mb-6">
                            {currentQuestion.options?.map((option, index) => {
                                const isSelected = selectedAnswer === option;
                                const showCorrect = showFeedback && option === currentQuestion.correct;
                                const showWrong = showFeedback && isSelected && !isCorrect;

                                return (
                                    <motion.button
                                        key={index}
                                        onClick={() => handleAnswerSelect(option)}
                                        disabled={showFeedback}
                                        className={`w-full p-4 rounded-2xl border-2 text-left font-semibold transition-all ${showCorrect
                                            ? 'border-green-500 bg-green-50'
                                            : showWrong
                                                ? 'border-red-500 bg-red-50 animate-wiggle'
                                                : isSelected
                                                    ? 'border-peacock-500 bg-peacock-50'
                                                    : 'border-gray-300 hover:border-peacock-300 hover:bg-peacock-50'
                                            }`}
                                        whileHover={!showFeedback ? { scale: 1.02 } : {}}
                                        whileTap={!showFeedback ? { scale: 0.98 } : {}}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{option}</span>
                                            {showCorrect && <CheckCircle className="w-6 h-6 text-green-600" />}
                                            {showWrong && <XCircle className="w-6 h-6 text-red-600" />}
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Feedback */}
                        <AnimatePresence>
                            {showFeedback && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className={`p-4 rounded-2xl mb-4 ${isCorrect ? 'bg-green-100' : 'bg-red-100'
                                        }`}
                                >
                                    <p className={`font-bold mb-2 ${isCorrect ? 'text-green-700' : 'text-red-700'
                                        }`}>
                                        {isCorrect ? '🎉 Great job!' : '💪 Keep trying!'}
                                    </p>
                                    <p className="text-gray-700">{currentQuestion.explanation}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            {!showFeedback ? (
                                <Button
                                    onClick={handleSubmit}
                                    disabled={!selectedAnswer}
                                    className="flex-1"
                                >
                                    Check Answer
                                </Button>
                            ) : (
                                <Button onClick={handleNext} className="flex-1">
                                    {isLastQuestion ? 'Complete Lesson' : 'Next Question'}
                                </Button>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
