import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { AlertTriangle } from 'lucide-react';

interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
    isDanger?: boolean;
}

export function ConfirmationModal({
    isOpen,
    title,
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    onConfirm,
    onCancel,
    isDanger = false,
}: ConfirmationModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={onCancel}
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl w-full max-w-md relative z-10 border-4 border-stone-100"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDanger ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                                <AlertTriangle className="w-8 h-8" />
                            </div>

                            <h3 className="text-2xl font-bold text-stone-800 mb-2 font-fredoka">
                                {title}
                            </h3>
                            <p className="text-stone-600 mb-8 font-outfit">
                                {message}
                            </p>

                            <div className="flex gap-4 w-full">
                                <Button
                                    variant="outline"
                                    onClick={onCancel}
                                    className="flex-1"
                                >
                                    {cancelLabel}
                                </Button>
                                <Button
                                    variant={isDanger ? 'primary' : 'secondary'} // Use primary (orange) for danger as it's more prominent, or custom red style
                                    onClick={onConfirm}
                                    className={`flex-1 ${isDanger ? '!bg-red-500 !border-red-600 hover:!bg-red-600' : ''}`}
                                >
                                    {confirmLabel}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
