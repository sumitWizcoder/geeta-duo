export interface Question {
    id: string;
    type: 'single-choice' | 'multiple-choice' | 'tap-reveal' | 'fill-blank' | 'match-pairs';
    question: string;
    options?: string[];
    correct: string | string[];
    explanation: string;
    imageUrl?: string;
}

export interface Lesson {
    id: string;
    chapter: string;
    title: string;
    description: string;
    topic: string;
    difficulty: 'kids' | 'beginner' | 'adult';
    xpReward: number;
    concept: {
        title: string;
        content: string[]; // Paragraphs
        imageUrl?: string;
    };
    explore: {
        type: 'flip-card' | 'tap-reveal' | 'match-pairs';
        title: string;
        instruction: string;
        items: {
            id: string;
            front?: string;
            back?: string;
            text?: string;
            imageUrl?: string;
            isRevealed?: boolean;
        }[];
    };
    shloka?: {
        text: string;
        translation: string;
    };
    moral?: string;
    questions: Question[];
    storyMode?: {
        scenes: StoryScene[];
    };
}

export interface StoryScene {
    id: string;
    imageUrl: string;
    character: string;
    dialogue: string;
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    iconUrl: string;
    requirement: string;
}

export interface Avatar {
    id: string;
    name: string;
    imageUrl: string;
    category: 'boy' | 'girl' | 'teen' | 'guide';
}
