import { useGameStore } from '../../store/useGameStore';
import { Flame, Gem, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export function RightPanel() {
    const { progress } = useGameStore();

    return (
        <div className="hidden lg:block w-[368px] p-6 fixed right-0 top-0 h-screen overflow-y-auto">
            {/* Top Stats */}
            <div className="flex items-center justify-between gap-4 mb-8">
                {/* Flag/Course (Static for now) */}
                <div className="w-10 h-8 bg-orange-100 rounded-md flex items-center justify-center border-2 border-orange-200">
                    🇮🇳
                </div>

                <div className="flex items-center gap-2 text-orange-500 font-bold">
                    <Flame className="w-5 h-5 fill-current" />
                    <span>{progress.streak}</span>
                </div>

                <div className="flex items-center gap-2 text-blue-500 font-bold">
                    <Gem className="w-5 h-5 fill-current" />
                    <span>{progress.xp}</span>
                </div>

                <div className="flex items-center gap-2 text-red-500 font-bold">
                    <Heart className="w-5 h-5 fill-current" />
                    <span>5</span>
                </div>
            </div>

            {/* Unlock Leaderboards */}
            <div className="border-2 border-stone-200 rounded-2xl p-4 mb-6">
                <h3 className="font-bold text-stone-700 mb-2">Unlock Leaderboards!</h3>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center border-2 border-yellow-200">
                        <TrophyIcon />
                    </div>
                    <p className="text-sm text-stone-500">Complete 3 more lessons to start competing</p>
                </div>
            </div>

            {/* Daily Quests */}
            <div className="border-2 border-stone-200 rounded-2xl p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-stone-700">Daily Quests</h3>
                    <button className="text-blue-500 font-bold text-sm uppercase hover:text-blue-600">View All</button>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <Flame className="w-6 h-6 text-orange-500" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between text-sm font-bold mb-1">
                                <span className="text-stone-700">Earn 20 XP</span>
                                <span className="text-stone-400">{Math.min(progress.xp, 20)}/20</span>
                            </div>
                            <div className="h-3 bg-stone-100 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-orange-400"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min((progress.xp / 20) * 100, 100)}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TrophyIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>
    );
}
