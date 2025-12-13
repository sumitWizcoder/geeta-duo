import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LessonEngine } from '../components/lesson/LessonEngine';
import { ConceptIntro } from '../components/lesson/ConceptIntro';
import { ConceptExplore } from '../components/lesson/ConceptExplore';
import { Celebration } from '../components/ui/Celebration';
import { ArrowLeft } from 'lucide-react';
import lessonsData from '../data/lessons.json';
import type { Lesson as LessonType } from '../types';

const lessons = lessonsData as LessonType[];

type LessonPhase = 'intro' | 'explore' | 'quiz';

export function Lesson() {
    const { lessonId } = useParams<{ lessonId: string }>();
    const navigate = useNavigate();
    const [phase, setPhase] = useState<LessonPhase>('intro');
    const [showCelebration, setShowCelebration] = useState(false);

    const [earnedXP, setEarnedXP] = useState(0);

    const lesson = lessons.find((l) => l.id === lessonId);

    if (!lesson) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FFFDF5]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-stone-700 mb-4 font-fredoka">
                        Lesson not found
                    </h2>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-orange-600 hover:underline font-outfit"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const handleQuizComplete = (xp: number) => {
        setEarnedXP(xp);
        setShowCelebration(true);
    };

    return (
        <div className="min-h-screen bg-[#FFFDF5]">
            <Celebration
                show={showCelebration}
                message="Lesson Completed!"
                earnedXP={earnedXP}
                shloka={lesson.shloka}
                moral={lesson.moral}
                onComplete={() => navigate('/dashboard')}
            />

            {/* Back Button */}
            <div className="p-4 mb-10">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-stone-600 hover:text-orange-600 font-bold transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                    Back to Dashboard
                </button>
            </div>

            {/* Lesson Header */}
            <div className="text-center mb-6">
                <h1 className="text-4xl font-bold text-orange-600 mb-6 font-fredoka">{lesson.title}</h1>
                <div className="flex justify-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${phase === 'intro' ? 'bg-orange-100 text-orange-700' : 'bg-stone-100 text-stone-400'}`}>
                        Concept
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${phase === 'explore' ? 'bg-orange-100 text-orange-700' : 'bg-stone-100 text-stone-400'}`}>
                        Explore
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${phase === 'quiz' ? 'bg-orange-100 text-orange-700' : 'bg-stone-100 text-stone-400'}`}>
                        Quiz
                    </span>
                </div>
            </div>

            {/* Phase Content */}
            <div className="container mx-auto px-4 pb-12">
                {phase === 'intro' && lesson.concept && (
                    <ConceptIntro
                        title={lesson.concept.title}
                        content={lesson.concept.content}
                        imageUrl={lesson.concept.imageUrl}
                        onComplete={() => setPhase('explore')}
                    />
                )}

                {phase === 'explore' && lesson.explore && (
                    <ConceptExplore
                        type={lesson.explore.type}
                        title={lesson.explore.title}
                        instruction={lesson.explore.instruction}
                        items={lesson.explore.items}
                        onComplete={() => setPhase('quiz')}
                    />
                )}

                {phase === 'quiz' && (
                    <LessonEngine
                        lessonId={lesson.id}
                        questions={lesson.questions}
                        xpReward={lesson.xpReward}
                        onComplete={handleQuizComplete}
                    />
                )}
            </div>
        </div>
    );
}
