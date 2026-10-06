import { describe, expect, it } from 'vitest';
import { computeStreak } from './useGameStore';

describe('computeStreak', () => {
    it('starts at 1 on the first ever lesson', () => {
        expect(computeStreak(0, '', '2026-10-06')).toBe(1);
    });
    it('does not double count the same day', () => {
        expect(computeStreak(3, '2026-10-06', '2026-10-06')).toBe(3);
    });
    it('increments on consecutive days', () => {
        expect(computeStreak(3, '2026-10-05', '2026-10-06')).toBe(4);
    });
    it('resets after a gap', () => {
        expect(computeStreak(9, '2026-10-01', '2026-10-06')).toBe(1);
    });
});
