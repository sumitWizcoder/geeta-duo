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
import chapterData from '../data/chapters.json';
import type { Lesson } from '../types';

const lessons = lessonsData as Lesson[];

const chapterIcons: Record<string, React.ReactNode> = {
    Shield: <Shield />, Sun: <Sun />, RefreshCw: <RefreshCw />, Lightbulb: <Lightbulb />,
    Trophy: <Trophy />, Heart: <Heart />, Gem: <Gem />, Leaf: <Leaf />, Eye: <Eye />,
    Map: <MapIcon />, Activity: <Activity />, Swords: <Swords />,
};

export function Dashboard() {
    const navigate = useNavigate();
    const { progress, resetCourse } = useGameStore();
    const completedLessons = progress.completedLessons;
    const [showResetModal, setShowResetModal] = useState(false);

    const handleResetCourse = () => {
        const completedLessonIds = new Set(completedLessons);
        const xpToDeduct = lessons
            .filter(l => completedLessonIds.has(l.id))
            .reduce((acc, l) => acc + l.xpReward, 0);

        resetCourse(xpToDeduct);
        setShowResetModal(false);
    };

    const currentLessonId = lessons.find(l => !completedLessons.includes(l.id))?.id || null;
    const chapters = chapterData
        .map(c => ({
            ...c,
            icon: chapterIcons[c.icon] ?? <Shield />,
            lessons: lessons.filter(l => l.chapter === c.id),
        }))
        .filter(c => c.lessons.length > 0);

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
                                    currentLessonId={currentLessonId}
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
