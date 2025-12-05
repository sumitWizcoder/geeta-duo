import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';
import { Button } from '../components/ui/Button';
import { ConfirmationModal } from '../components/ui/ConfirmationModal';
import { Module } from '../components/dashboard/Module';
import { JourneyPath } from '../components/dashboard/JourneyPath';
import { Sidebar } from '../components/dashboard/Sidebar';
import { RightPanel } from '../components/dashboard/RightPanel';
import { Trophy, RefreshCw, Sun, Shield, Lightbulb, Heart, Gem, Leaf, Eye, Map as MapIcon, Activity, Swords } from 'lucide-react';
import lessonsData from '../data/lessons.json';
import type { Lesson } from '../types';

const lessons = lessonsData as Lesson[];

export function Dashboard() {
    const navigate = useNavigate();
    const { progress, updateStreak, resetCourse } = useGameStore();
    const completedLessons = progress.completedLessons;
    const [showResetModal, setShowResetModal] = useState(false);

    // Update streak on dashboard load
    React.useEffect(() => {
        updateStreak();
    }, [updateStreak]);

    const handleResetCourse = () => {
        const completedLessonIds = new Set(completedLessons);
        const xpToDeduct = lessons
            .filter(l => completedLessonIds.has(l.id))
            .reduce((acc, l) => acc + l.xpReward, 0);

        resetCourse('', xpToDeduct);
        setShowResetModal(false);
    };

    // Group lessons by Chapter
    const chapters = [
        {
            id: '1',
            title: 'Arjuna\'s Doubt',
            description: 'The sadness of the warrior',
            color: 'bg-stone-500',
            icon: <Shield />,
            lessons: lessons.filter(l => l.chapter === '1')
        },
        {
            id: '2',
            title: 'Eternal Soul',
            description: 'Sankhya Yoga',
            color: 'bg-blue-600',
            icon: <Sun />,
            lessons: lessons.filter(l => l.chapter === '2')
        },
        {
            id: '3',
            title: 'Karma Yoga',
            description: 'The Art of Action',
            color: 'bg-orange-500',
            icon: <RefreshCw />,
            lessons: lessons.filter(l => l.chapter === '3')
        },
        {
            id: '4',
            title: 'Divine Knowledge',
            description: 'Wisdom & Avatar',
            color: 'bg-purple-600',
            icon: <Lightbulb />,
            lessons: lessons.filter(l => l.chapter === '4')
        },
        {
            id: '5',
            title: 'Renunciation',
            description: 'Karma Sanyasa',
            color: 'bg-teal-500',
            icon: <Shield />,
            lessons: lessons.filter(l => l.chapter === '5')
        },
        {
            id: '6',
            title: 'Meditation',
            description: 'Dhyana Yoga',
            color: 'bg-indigo-500',
            icon: <Trophy />,
            lessons: lessons.filter(l => l.chapter === '6')
        },
        {
            id: '7',
            title: 'Wisdom',
            description: 'God everywhere',
            color: 'bg-yellow-500',
            icon: <Sun />,
            lessons: lessons.filter(l => l.chapter === '7')
        },
        {
            id: '8',
            title: 'Imperishable',
            description: 'Path of Light',
            color: 'bg-red-500',
            icon: <Heart />,
            lessons: lessons.filter(l => l.chapter === '8')
        },
        {
            id: '9',
            title: 'Royal Secret',
            description: 'King of Knowledge',
            color: 'bg-pink-600',
            icon: <Gem />,
            lessons: lessons.filter(l => l.chapter === '9')
        },
        {
            id: '10',
            title: 'Divine Glories',
            description: 'Vibhuti Yoga',
            color: 'bg-emerald-500',
            icon: <Leaf />,
            lessons: lessons.filter(l => l.chapter === '10')
        },
        {
            id: '11',
            title: 'Cosmic Form',
            description: 'Thousand Suns',
            color: 'bg-amber-600',
            icon: <Eye />,
            lessons: lessons.filter(l => l.chapter === '11')
        },
        {
            id: '12',
            title: 'Bhakti Yoga',
            description: 'Path of Love',
            color: 'bg-rose-500',
            icon: <Heart />,
            lessons: lessons.filter(l => l.chapter === '12')
        },
        {
            id: '13',
            title: 'Field & Knower',
            description: 'Nature vs Soul',
            color: 'bg-lime-600',
            icon: <MapIcon />,
            lessons: lessons.filter(l => l.chapter === '13')
        },
        {
            id: '14',
            title: 'Three Gunas',
            description: 'Ropes of Nature',
            color: 'bg-cyan-600',
            icon: <Activity />,
            lessons: lessons.filter(l => l.chapter === '14')
        },
        {
            id: '16',
            title: 'Divine & Demonic',
            description: 'Good vs Bad Habits',
            color: 'bg-slate-700',
            icon: <Swords />,
            lessons: lessons.filter(l => l.chapter === '16')
        }
    ];

    return (
        <div className="min-h-screen bg-[#FFFDF5] flex">
            {/* Left Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 md:ml-[256px] lg:mr-[368px] min-h-screen">
                <div className="max-w-[600px] mx-auto pt-8 pb-20 px-4">
                    {/* Modules */}
                    <div className="space-y-4">
                        {chapters.map((chapter) => (
                            <Module
                                key={chapter.id}
                                title={chapter.title}
                                description={chapter.description}
                                color={chapter.color}
                                icon={chapter.icon}
                            >
                                <JourneyPath
                                    lessons={chapter.lessons}
                                    completedLessons={completedLessons}
                                    currentLessonId={lessons.find(l => !completedLessons.includes(l.id))?.id || null}
                                    onLessonSelect={(id) => navigate(`/lesson/${id}`)}
                                />
                            </Module>
                        ))}
                    </div>

                    {/* Reset Button (Bottom) */}
                    <div className="flex justify-center mt-12 mb-12">
                        <Button
                            variant="outline"
                            onClick={() => setShowResetModal(true)}
                            className="text-stone-400 hover:text-red-500 border-stone-200 hover:border-red-200 text-sm"
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Restart Course
                        </Button>
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <RightPanel />

            <ConfirmationModal
                isOpen={showResetModal}
                title="Restart Course?"
                message="Are you sure? You will lose all progress and XP gained in this course. This cannot be undone."
                confirmLabel="Yes, Restart"
                onConfirm={handleResetCourse}
                onCancel={() => setShowResetModal(false)}
                isDanger={true}
            />
        </div>
    );
}
