import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

interface ConceptIntroProps {
    title: string;
    content: string[];
    imageUrl?: string;
    onComplete: () => void;
}

export function ConceptIntro({ title, content, imageUrl, onComplete }: ConceptIntroProps) {
    return (
        <div className="max-w-2xl mx-auto p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden"
            >
                {imageUrl && (
                    <div className="h-64 overflow-hidden">
                        <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div className="p-8">
                    <h2 className="text-3xl font-bold text-peacock-700 mb-6">{title}</h2>

                    <div className="space-y-4 mb-8">
                        {content.map((paragraph, index) => (
                            <motion.p
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2 }}
                                className="text-lg text-gray-700 leading-relaxed"
                            >
                                {paragraph}
                            </motion.p>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: content.length * 0.2 + 0.5 }}
                        className="flex justify-end"
                    >
                        <Button onClick={onComplete} className="text-lg px-8 py-3">
                            Continue <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
