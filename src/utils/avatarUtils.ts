export const avatarEmojis: Record<string, string> = {
    'avatar-boy-1': '👦🏽',
    'avatar-boy-2': '👦🏾',
    'avatar-girl-1': '👧🏽',
    'avatar-girl-2': '👧🏾',
    'avatar-teen-1': '🧑🏽',
    'avatar-teen-2': '🧑🏾',
    'avatar-guide-1': '🧙🏽‍♂️',
};

export function getAvatarEmoji(id: string): string {
    return avatarEmojis[id] || '👤';
}
