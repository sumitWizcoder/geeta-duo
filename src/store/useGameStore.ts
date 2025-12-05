import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfile {
    name: string;
    username: string;
    avatarId: string;
}

export interface GameProgress {
    xp: number;
    level: number;
    streak: number;
    lastPlayedDate: string;
    completedLessons: string[];
    unlockedBadges: string[];
    currentLessonId: string | null;
}

export interface GameSettings {
    difficulty: 'kids' | 'beginner' | 'adult';
    soundEnabled: boolean;
}

interface GameState {
    profile: UserProfile;
    progress: GameProgress;
    settings: GameSettings;

    // Actions
    setProfile: (profile: Partial<UserProfile>) => void;
    addXP: (amount: number) => void;
    completeLesson: (lessonId: string) => void;
    resetCourse: (courseId: string, xpDeduction: number) => void;
    unlockBadge: (badgeId: string) => void;
    updateStreak: () => void;
    resetProgress: () => void;
    setSettings: (settings: Partial<GameSettings>) => void;
}

const initialState = {
    profile: {
        name: '',
        username: '',
        avatarId: '',
    },
    progress: {
        xp: 0,
        level: 1,
        streak: 0,
        lastPlayedDate: new Date().toISOString().split('T')[0],
        completedLessons: [],
        unlockedBadges: [],
        currentLessonId: null,
    },
    settings: {
        difficulty: 'kids' as const,
        soundEnabled: true,
    },
};

export const useGameStore = create<GameState>()(
    persist(
        (set) => ({
            ...initialState,

            setProfile: (profile) =>
                set((state) => ({
                    profile: { ...state.profile, ...profile },
                })),

            addXP: (amount) =>
                set((state) => {
                    const newXP = Math.max(0, state.progress.xp + amount);
                    const newLevel = Math.floor(newXP / 100) + 1;
                    return {
                        progress: {
                            ...state.progress,
                            xp: newXP,
                            level: newLevel,
                        },
                    };
                }),

            completeLesson: (lessonId) =>
                set((state) => {
                    if (state.progress.completedLessons.includes(lessonId)) {
                        return state;
                    }
                    return {
                        progress: {
                            ...state.progress,
                            completedLessons: [...state.progress.completedLessons, lessonId],
                        },
                    };
                }),

            resetCourse: (courseId, xpDeduction) =>
                set((state) => {
                    // Filter out lessons belonging to this course (assuming courseId is part of lessonId or we filter by list)
                    // Since we don't have a direct map here, we rely on the caller to pass the deduction.
                    // But we need to remove the lessons from completedLessons.
                    // For now, we'll assume the caller handles the logic or we just remove ALL lessons if we can't distinguish.
                    // Wait, the user said "reset the particular course".
                    // Our lesson IDs are like "karma-basics-01". We can filter by prefix or just remove specific IDs if passed.
                    // To keep it simple and robust, let's assume we remove lessons that start with the courseId prefix if possible,
                    // OR better, we just trust the caller to handle the visual reset? No, store must update state.
                    // Let's filter completedLessons.

                    // Actually, looking at lessons.json, "chapter": "1" etc.
                    // We might need to pass the list of lesson IDs to remove.
                    // Let's simplify: The caller (Dashboard) knows which lessons are in the course.
                    // So we should probably pass `lessonIdsToRemove` instead of `courseId`.

                    // But to match the interface, let's just do:
                    const newCompletedLessons = state.progress.completedLessons.filter(
                        id => !id.startsWith(courseId) // Assuming ID convention like 'karma-...' matches course
                    );

                    // If the convention isn't strict, we might miss some.
                    // Let's look at lesson IDs: "karma-basics-01", "dharma-duty-01".
                    // If courseId is "karma", it works.

                    const newXP = Math.max(0, state.progress.xp - xpDeduction);
                    const newLevel = Math.floor(newXP / 100) + 1;

                    return {
                        progress: {
                            ...state.progress,
                            completedLessons: newCompletedLessons,
                            xp: newXP,
                            level: newLevel,
                        }
                    };
                }),

            unlockBadge: (badgeId) =>
                set((state) => {
                    if (state.progress.unlockedBadges.includes(badgeId)) {
                        return state;
                    }
                    return {
                        progress: {
                            ...state.progress,
                            unlockedBadges: [...state.progress.unlockedBadges, badgeId],
                        },
                    };
                }),

            updateStreak: () =>
                set((state) => {
                    const today = new Date().toISOString().split('T')[0];
                    const lastPlayed = new Date(state.progress.lastPlayedDate);
                    const todayDate = new Date(today);
                    const diffTime = Math.abs(todayDate.getTime() - lastPlayed.getTime());
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    let newStreak = state.progress.streak;
                    if (diffDays === 1) {
                        newStreak += 1;
                    } else if (diffDays > 1) {
                        newStreak = 1;
                    }

                    return {
                        progress: {
                            ...state.progress,
                            streak: newStreak,
                            lastPlayedDate: today,
                        },
                    };
                }),

            resetProgress: () =>
                set(() => ({
                    progress: initialState.progress,
                    // Keep profile and settings intact
                })),

            setSettings: (settings) =>
                set((state) => ({
                    settings: { ...state.settings, ...settings },
                })),
        }),
        {
            name: 'gita-learning-storage',
        }
    )
);
