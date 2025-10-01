type GeoResult = {
    city?: string | null;
    town?: string | null;
    postcode?: string | null;
    country?: string | null;
    road?: string | null;   // street name
    ref?: string | null;    // e.g., M25, A40, B1234
};

export async function reverseGeocode(lat: number, lng: number): Promise<GeoResult> {
    // Prefer Nominatim (no key); respect usage policy (add a UA)
    const base = process.env.NOMINATIM_BASE || 'https://nominatim.openstreetmap.org';
    const url = `${base}/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=17&addressdetails=1&extratags=1&namedetails=1`;
    const r = await fetch(url, {
        headers: { 'User-Agent': 'driver-tracker/1.0 (contact@example.com)' }
    });
    if (!r.ok) return {};
    const j = await r.json();

    const addr = j?.address || {};
    const ref = j?.extratags?.ref || j?.namedetails?.ref || j?.ref || null;
    const road = addr?.road ?? addr?.pedestrian ?? j?.name ?? null;

    return {
        city: addr?.city ?? addr?.village ?? addr?.hamlet ?? addr?.county ?? null,
        town: addr?.town ?? null,
        postcode: addr?.postcode ?? null,
        country: addr?.country ?? null,
        road,
        ref,
    };
}

// Simple day/night classifier; improve later with sun times if needed
export function timeOfDay(date: Date): 'DAY' | 'NIGHT' {
    const h = date.getUTCHours(); // using UTC. For local, use tz-aware or lat/lng sunrise.
    return (h >= 6 && h < 18) ? 'DAY' : 'NIGHT';
}
