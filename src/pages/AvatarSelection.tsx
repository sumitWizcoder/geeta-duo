import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Button } from '../components/ui/Button';
import avatarsData from '../data/avatars.json';
import { avatarEmojis } from '../utils/avatarUtils';

// Removed local avatarEmojis definition

export function AvatarSelection() {
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState<string>('');
    const { setProfile, profile } = useGameStore();

    const handleContinue = () => {
        if (selectedId) {
            setProfile({ avatarId: selectedId });
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 text-center">
            <motion.div
                className="max-w-4xl w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient text-center mb-4">
                    Choose Your Avatar, {profile.name.split(' ')[0]}!
                </h1>
                <p className="text-xl text-gray-600 text-center mb-8">
                    Pick a character that represents you!
                </p>

                {/* Avatar Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    {avatarsData.map((avatar, index) => (
                        <motion.div
                            key={avatar.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedId(avatar.id)}
                            className={`cursor-pointer p-6 rounded-3xl transition-all ${selectedId === avatar.id
                                ? 'bg-gradient-to-br from-peacock-400 to-peacock-600 shadow-glow'
                                : 'bg-white shadow-lg hover:shadow-xl'
                                }`}
                        >
                            <div className="text-center">
                                <div className="text-7xl mb-3">
                                    {avatarEmojis[avatar.id] || '👤'}
                                </div>
                                <p
                                    className={`font-semibold ${selectedId === avatar.id ? 'text-white' : 'text-peacock-700'
                                        }`}
                                >
                                    {avatar.name}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Continue Button */}
                <div className="text-center">
                    <Button
                        onClick={handleContinue}
                        disabled={!selectedId}
                        className="text-lg px-8"
                    >
                        Continue
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
