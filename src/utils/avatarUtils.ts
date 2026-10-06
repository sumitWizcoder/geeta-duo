export type HairStyle = 'short' | 'topknot' | 'long' | 'braids' | 'bun' | 'curly';

export interface AvatarSpec {
    skin: string;
    skinShade: string;
    hair: string;
    hairStyle: HairStyle;
    outfit: string;
    outfitShade: string;
    bgFrom: string;
    bgTo: string;
    mark: 'tilak' | 'bindi' | 'none';
    glasses?: boolean;
    beard?: string;
}

export const avatarSpecs: Record<string, AvatarSpec> = {
    'avatar-boy-1': { skin: '#E3AA7A', skinShade: '#C98E5F', hair: '#1B1209', hairStyle: 'short', outfit: '#F59E0B', outfitShade: '#D97706', bgFrom: '#FFE8C7', bgTo: '#FDBA74', mark: 'tilak' },
    'avatar-boy-2': { skin: '#B97A4B', skinShade: '#9C6238', hair: '#120C08', hairStyle: 'curly', outfit: '#2563EB', outfitShade: '#1D4ED8', bgFrom: '#DBEAFE', bgTo: '#93C5FD', mark: 'none' },
    'avatar-girl-1': { skin: '#E8B48A', skinShade: '#CF966B', hair: '#1A0F0A', hairStyle: 'long', outfit: '#DB2777', outfitShade: '#BE185D', bgFrom: '#FCE7F3', bgTo: '#F9A8D4', mark: 'bindi' },
    'avatar-girl-2': { skin: '#BF8556', skinShade: '#A06A42', hair: '#140B07', hairStyle: 'braids', outfit: '#0D9488', outfitShade: '#0F766E', bgFrom: '#CCFBF1', bgTo: '#5EEAD4', mark: 'bindi' },
    'avatar-teen-1': { skin: '#D49A6A', skinShade: '#B97F51', hair: '#231710', hairStyle: 'short', outfit: '#16A34A', outfitShade: '#15803D', bgFrom: '#DCFCE7', bgTo: '#86EFAC', mark: 'tilak', glasses: true },
    'avatar-teen-2': { skin: '#CC9060', skinShade: '#AF7647', hair: '#1F120B', hairStyle: 'bun', outfit: '#7C3AED', outfitShade: '#6D28D9', bgFrom: '#EDE9FE', bgTo: '#C4B5FD', mark: 'bindi' },
    'avatar-guide-1': { skin: '#C48A5C', skinShade: '#A8714A', hair: '#F5F5F4', hairStyle: 'topknot', outfit: '#F97316', outfitShade: '#EA580C', bgFrom: '#FEF3C7', bgTo: '#FCD34D', mark: 'tilak', beard: '#F5F5F4' },
};

export const defaultAvatarSpec: AvatarSpec = {
    skin: '#D6A27A', skinShade: '#BC875F', hair: '#2A1B12', hairStyle: 'short',
    outfit: '#A8A29E', outfitShade: '#78716C', bgFrom: '#F5F5F4', bgTo: '#D6D3D1', mark: 'none',
};
