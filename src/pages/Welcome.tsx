import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import { Avatar } from '../components/ui/Avatar';

export function Welcome() {
    const navigate = useNavigate();
    const { profile, setProfile } = useGameStore();
    const [step, setStep] = useState<'intro' | 'form'>('intro');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    if (profile.name && profile.avatarId) return <Navigate to="/dashboard" replace />;

    const handleStart = () => {
        if (!firstName.trim() || !lastName.trim()) return;
        const first = firstName.trim();
        const last = lastName.trim();

        const username = `${first.toLowerCase()}.${last.toLowerCase()}.${Math.floor(Math.random() * 1000)}`;
        const displayName = `${first} ${last}`;

        setProfile({
            name: displayName,
            username: username,
        });

        navigate('/avatar-selection');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#FFFDF5]">
            <motion.div
                className="text-center max-w-2xl w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Mascot Avatar */}
                <motion.div
                    className="mb-8 flex justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                    <Avatar id="avatar-guide-1" label="Your guide" className="w-44 h-44 sm:w-48 sm:h-48 shadow-2xl border-4 border-white" />
                </motion.div>

                {step === 'intro' ? (
                    <>
                        <motion.h1
                            className="text-display-xl font-bold text-stone-800 mb-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            Learn the Gita
                        </motion.h1>

                        <motion.h2
                            className="text-display-lg font-semibold text-orange-600 mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            in a Fun Way!
                        </motion.h2>

                        <motion.p
                            className="text-body-lg text-stone-600 mb-8 max-w-md mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            Discover ancient wisdom through interactive lessons, fun quizzes, and exciting challenges!
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                        >
                            <Button
                                onClick={() => setStep('form')}
                                className="text-xl px-8 py-4 shadow-xl hover:shadow-2xl transition-all mx-auto"
                            >
                                <Sparkles className="w-6 h-6 mr-2 inline" />
                                Get Started
                            </Button>
                        </motion.div>
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white p-8 rounded-3xl shadow-xl border-2 border-stone-100 max-w-md mx-auto"
                    >
                        <h2 className="text-title font-bold text-stone-800 mb-6">What should we call you?</h2>

                        <div className="space-y-4 text-left">
                            <div>
                                <label className="block text-sm font-bold text-stone-500 mb-2 font-outfit">First Name</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full p-4 rounded-xl border-2 border-stone-200 focus:border-orange-400 focus:outline-none font-bold text-stone-700 bg-stone-50"
                                    placeholder="Arjuna"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-stone-500 mb-2 font-outfit">Last Name</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full p-4 rounded-xl border-2 border-stone-200 focus:border-orange-400 focus:outline-none font-bold text-stone-700 bg-stone-50"
                                    placeholder="Pandava"
                                />
                            </div>

                            <Button
                                onClick={handleStart}
                                className="w-full mt-4 py-4 text-lg"
                                disabled={!firstName || !lastName}
                            >
                                Continue
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* Floating decorative elements */}
                <motion.div
                    className="absolute top-20 left-20 text-6xl opacity-20"
                    animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                    ✨
                </motion.div>

                <motion.div
                    className="absolute bottom-20 right-20 text-6xl opacity-20"
                    animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                >
                    🌸
                </motion.div>
            </motion.div>
        </div>
    );
}
