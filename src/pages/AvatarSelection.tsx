import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Button } from '../components/ui/Button';
import avatarsData from '../data/avatars.json';

import { Avatar } from '../components/ui/Avatar';

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
                <h1 className="text-display-lg font-bold text-gradient text-center mb-3">
                    Choose Your Avatar, {profile.name.split(' ')[0]}!
                </h1>
                <p className="text-body-lg text-stone-600 text-center mb-8">
                    Pick a character that represents you!
                </p>

                {/* Avatar Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-10">
                    {avatarsData.map((avatar, index) => (
                        <motion.div
                            key={avatar.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedId(avatar.id)}
                            className={`cursor-pointer p-4 md:p-6 rounded-3xl transition-all ${selectedId === avatar.id
                                ? 'bg-gradient-to-br from-peacock-400 to-peacock-600 shadow-glow'
                                : 'bg-white shadow-sm hover:shadow-xl'
                                }`}
                        >
                            <div className="flex flex-col items-center gap-3">
                                <Avatar id={avatar.id} label={avatar.name} className="w-24 h-24 md:w-28 md:h-28 ring-4 ring-white shadow-md" />
                                <span className={`font-display font-semibold text-lg ${selectedId === avatar.id ? 'text-white' : 'text-stone-700'}`}>
                                    {avatar.name}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Continue Button */}
                <div className="text-center flex justify-center items-center">
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
