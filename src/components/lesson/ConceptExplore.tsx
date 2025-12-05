import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface ExploreItem {
    id: string;
    front?: string;
    back?: string;
    text?: string;
    imageUrl?: string;
    isRevealed?: boolean;
}

interface ConceptExploreProps {
    type: 'flip-card' | 'tap-reveal' | 'match-pairs';
    title: string;
    instruction: string;
    items: ExploreItem[];
    onComplete: () => void;
}

export function ConceptExplore({ type, title, instruction, items, onComplete }: ConceptExploreProps) {
    const [revealedItems, setRevealedItems] = useState<string[]>([]);

    const isComplete = revealedItems.length === items.length;

    const handleItemClick = (id: string) => {
        if (!revealedItems.includes(id)) {
            setRevealedItems([...revealedItems, id]);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
            >
                <h2 className="text-3xl font-bold text-peacock-700 mb-2">{title}</h2>
                <p className="text-xl text-gray-600">{instruction}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {items.map((item) => (
                    <ExploreCard
                        key={item.id}
                        item={item}
                        type={type}
                        isRevealed={revealedItems.includes(item.id)}
                        onReveal={() => handleItemClick(item.id)}
                    />
                ))}
            </div>

            <AnimatePresence>
                {isComplete && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center"
                    >
                        <Button onClick={onComplete} className="text-lg px-8 py-3 animate-bounce-slow">
                            Start Quiz <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ExploreCard({
    item,
    type,
    isRevealed,
    onReveal,
}: {
    item: ExploreItem;
    type: string;
    isRevealed: boolean;
    onReveal: () => void;
}) {
    return (
        <motion.div
            className="relative h-64 cursor-pointer perspective-1000"
            onClick={onReveal}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <motion.div
                className={`w-full h-full transition-all duration-500 transform-style-3d ${isRevealed ? 'rotate-y-180' : ''
                    }`}
                style={{ transformStyle: 'preserve-3d', transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >
                {/* Front */}
                <div className="absolute w-full h-full backface-hidden bg-white rounded-2xl shadow-lg border-2 border-peacock-100 flex flex-col items-center justify-center p-6 text-center">
                    {type === 'flip-card' ? (
                        <h3 className="text-xl font-bold text-peacock-700">{item.front}</h3>
                    ) : (
                        <h3 className="text-xl font-bold text-gray-700">{item.text}</h3>
                    )}
                    <p className="text-sm text-gray-400 mt-4">(Tap to reveal)</p>
                </div>

                {/* Back */}
                <div
                    className="absolute w-full h-full backface-hidden bg-gradient-to-br from-peacock-50 to-lotus-50 rounded-2xl shadow-xl border-2 border-peacock-200 flex flex-col items-center justify-center p-6 text-center"
                    style={{ transform: 'rotateY(180deg)' }}
                >
                    {type === 'flip-card' ? (
                        <>
                            <h3 className="text-xl font-bold text-peacock-800 mb-2">{item.back}</h3>
                            <p className="text-gray-600">{item.text}</p>
                        </>
                    ) : (
                        <>
                            <CheckCircle className="w-12 h-12 text-green-500 mb-2" />
                            <h3 className="text-xl font-bold text-peacock-800">{item.back}</h3>
                        </>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}
