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
    resetCourse: (xpDeduction: number) => void;
    unlockBadge: (badgeId: string) => void;
    resetProgress: () => void;
    setSettings: (settings: Partial<GameSettings>) => void;
}

const localDateKey = (d: Date = new Date()) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export const computeStreak = (streak: number, lastPlayedDate: string, today: string): number => {
    if (lastPlayedDate === today) return streak;
    if (!lastPlayedDate) return 1;
    const diffDays = Math.round((Date.parse(today) - Date.parse(lastPlayedDate)) / 86400000);
    return diffDays === 1 ? streak + 1 : 1;
};

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
        lastPlayedDate: '',
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
                    const today = localDateKey();
                    const { completedLessons, streak, lastPlayedDate } = state.progress;
                    return {
                        progress: {
                            ...state.progress,
                            completedLessons: completedLessons.includes(lessonId)
                                ? completedLessons
                                : [...completedLessons, lessonId],
                            streak: computeStreak(streak, lastPlayedDate, today),
                            lastPlayedDate: today,
                        },
                    };
                }),

            resetCourse: (xpDeduction) =>
                set((state) => {
                    const newXP = Math.max(0, state.progress.xp - xpDeduction);
                    return {
                        progress: {
                            ...state.progress,
                            completedLessons: [],
                            xp: newXP,
                            level: Math.floor(newXP / 100) + 1,
                        },
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
            version: 1,
            migrate: (persisted) => persisted as GameState,
        }
    )
);
