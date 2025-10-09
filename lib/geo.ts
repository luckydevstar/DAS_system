// Reverse geocode (best-effort) and simple time-of-day bucket
export type RevGeo = {
    city?: string | null;
    town?: string | null;
    postcode?: string | null;
    country?: string | null;
    road?: string | null; // name
    ref?: string | null;  // e.g. A406 / M25
};

export async function reverseGeocode(lat: number, lng: number): Promise<RevGeo> {
    const key = process.env.GOOGLE_MAPS_KEY;
    if (!key) return {};
    try {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`;
        const r = await fetch(url);
        const j = await r.json();
        const res = j?.results?.[0];
        const comps: any[] = res?.address_components ?? [];
        const get = (t: string) => comps.find(c => Array.isArray(c.types) && c.types.includes(t))?.long_name;

        // try to infer road name/ref from first result
        const road = res?.address_components?.find((c: any) => c.types?.includes('route'))?.long_name ?? null;
        // if route is like "A406", treat as ref; otherwise keep road and try to parse a ref-like token
        const token = (road || '').toUpperCase().match(/\b([ABM]\d{1,4})\b/)?.[1] || null;

        return {
            city: get('postal_town') || get('locality') || get('administrative_area_level_2') || null,
            town: get('postal_town') || null,
            postcode: get('postal_code') || null,
            country: get('country') || null,
            road: road || null,
            ref: token,
        };
    } catch {
        return {};
    }
}

export function timeOfDay(at: Date): 'DAY' | 'NIGHT' {
    // UK-ish heuristic (tweak later with sun times if you want)
    const h = at.getUTCHours();
    return (h >= 20 || h < 6) ? 'NIGHT' : 'DAY';
}
