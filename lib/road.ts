export type RoadType = 'MOTORWAY' | 'A' | 'B' | 'OTHER';

export function classifyRoad(ref?: string | null, roadName?: string | null): RoadType {
    const s = (ref || roadName || '').toUpperCase().replace(/\s+/g, '');
    if (/^M\d+/.test(s)) return 'MOTORWAY';
    if (/^A\d+/.test(s)) return 'A';
    if (/^B\d+/.test(s)) return 'B';
    return 'OTHER';
}
