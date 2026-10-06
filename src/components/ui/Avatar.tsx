import { useId } from 'react';
import { avatarSpecs, defaultAvatarSpec, type AvatarSpec } from '../../utils/avatarUtils';

interface AvatarProps {
    id: string;
    className?: string;
    label?: string;
}

const CURL_POSITIONS: [number, number][] = [[38, 38], [48, 28], [60, 24], [72, 28], [82, 38], [34, 52], [86, 52]];

function HairBack({ s }: { s: AvatarSpec }) {
    switch (s.hairStyle) {
        case 'long':
            return <path d="M30 60C24 30 44 20 60 20C76 20 96 30 90 60L96 112L24 112Z" fill={s.hair} />;
        case 'braids':
            return (
                <g fill={s.hair}>
                    <path d="M33 58C31 32 46 24 60 24C74 24 89 32 87 58Z" />
                    {[0, 1, 2, 3].map((i) => (
                        <g key={i}>
                            <ellipse cx={36 - i * 0.5} cy={78 + i * 9} rx={5.5 - i * 0.6} ry={6} />
                            <ellipse cx={84 + i * 0.5} cy={78 + i * 9} rx={5.5 - i * 0.6} ry={6} />
                        </g>
                    ))}
                </g>
            );
        case 'bun':
            return <circle cx="60" cy="19" r="11" fill={s.hair} />;
        case 'topknot':
            return <circle cx="60" cy="16" r="9" fill={s.hair} />;
        case 'curly':
            return (
                <g fill={s.hair}>
                    {CURL_POSITIONS.map(([cx, cy]) => (
                        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="11" />
                    ))}
                </g>
            );
        default:
            return null;
    }
}

function HairFront({ s }: { s: AvatarSpec }) {
    if (s.hairStyle === 'curly') {
        return <path d="M37 50C40 40 50 36 60 36C72 36 80 40 83 50C78 44 70 42 60 42C50 42 42 44 37 50Z" fill={s.hair} />;
    }
    if (s.hairStyle === 'long' || s.hairStyle === 'braids') {
        // Side-parted fringe
        return <path d="M36 56C34 34 48 28 60 28C74 28 86 34 84 56C80 46 72 38 60 36C54 42 44 48 36 56Z" fill={s.hair} />;
    }
    return <path d="M35 56C33 32 48 26 60 26C74 26 87 32 85 56C82 46 76 40 60 40C44 40 38 46 35 56Z" fill={s.hair} />;
}

export function Avatar({ id, className = 'w-16 h-16', label }: AvatarProps) {
    const s = avatarSpecs[id] ?? defaultAvatarSpec;
    const uid = useId().replace(/:/g, '');
    const bg = `avatar-bg-${uid}`;
    const clip = `avatar-clip-${uid}`;
    const brow = s.hair === '#F5F5F4' ? '#A8A29E' : s.hair;

    return (
        <svg
            viewBox="0 0 120 120"
            className={`${className} shrink-0 rounded-full`}
            role="img"
            aria-label={label ?? 'Avatar'}
        >
            <defs>
                <linearGradient id={bg} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor={s.bgFrom} />
                    <stop offset="1" stopColor={s.bgTo} />
                </linearGradient>
                <clipPath id={clip}>
                    <circle cx="60" cy="60" r="60" />
                </clipPath>
            </defs>
            <g clipPath={`url(#${clip})`}>
                <rect width="120" height="120" fill={`url(#${bg})`} />
                <HairBack s={s} />

                {/* Shoulders and kurta */}
                <path d="M10 124C12 98 34 90 60 90C86 90 108 98 110 124Z" fill={s.outfit} />
                <path d="M44 92L60 112L76 92C70 90 66 89 60 89C54 89 50 90 44 92Z" fill={s.outfitShade} />
                <path d="M60 112L60 124" stroke={s.outfitShade} strokeWidth="2" />

                {/* Neck */}
                <path d="M51 74H69V94C66 99 54 99 51 94Z" fill={s.skinShade} />

                {/* Ears and head */}
                <circle cx="36" cy="62" r="5" fill={s.skin} />
                <circle cx="84" cy="62" r="5" fill={s.skin} />
                <ellipse cx="60" cy="58" rx="24" ry="27" fill={s.skin} />

                {s.beard && (
                    <path d="M38 66C40 90 50 96 60 96C70 96 80 90 82 66C76 76 70 78 60 78C50 78 44 76 38 66Z" fill={s.beard} />
                )}

                <HairFront s={s} />

                {/* Face */}
                <path d="M44 51Q49 48 54 50M66 50Q71 48 76 51" stroke={brow} strokeWidth="2.4" strokeLinecap="round" fill="none" />
                <ellipse cx="49" cy="58" rx="3.2" ry="3.8" fill="#1C1917" />
                <ellipse cx="71" cy="58" rx="3.2" ry="3.8" fill="#1C1917" />
                <circle cx="50.2" cy="56.6" r="1.1" fill="#fff" />
                <circle cx="72.2" cy="56.6" r="1.1" fill="#fff" />
                <path d="M58 62Q60 66 62 64" stroke={s.skinShade} strokeWidth="1.8" strokeLinecap="round" fill="none" />
                <path d="M52 70Q60 77 68 70" stroke="#7C2D12" strokeWidth="2.4" strokeLinecap="round" fill="none" />
                <circle cx="43" cy="67" r="4" fill="#F87171" opacity=".28" />
                <circle cx="77" cy="67" r="4" fill="#F87171" opacity=".28" />

                {s.glasses && (
                    <g stroke="#292524" strokeWidth="2" fill="none">
                        <circle cx="49" cy="58" r="7.5" />
                        <circle cx="71" cy="58" r="7.5" />
                        <path d="M56.5 58H63.5" />
                    </g>
                )}

                {s.mark === 'tilak' && <path d="M60 36V47" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />}
                {s.mark === 'bindi' && <circle cx="60" cy="43" r="2.6" fill="#DC2626" />}
            </g>
        </svg>
    );
}
