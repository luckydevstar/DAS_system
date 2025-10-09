export function classifyRoad(ref: string | null, name: string | null): 'MOTORWAY' | 'A' | 'B' | 'OTHER' {
    const text = (ref || name || '').toUpperCase();
    if (/^M\d+/.test(text)) return 'MOTORWAY';
    if (/^A\d+/.test(text)) return 'A';
    if (/^B\d+/.test(text)) return 'B';
    return 'OTHER';
}
