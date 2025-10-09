import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(req: Request) {
    const auth = await getAuthUser(req);
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data, error } = await supabase
        .from('v_segment_durations')
        .select('seconds, city, town, postcode, last_lat, last_lng')
        .eq('user_id', auth.userId);

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    const map = new Map<string, { seconds: number, lat: number, lng: number, n: number }>();

    for (const r of (data ?? []) as any[]) {
        const place = r.city || r.town || r.postcode || 'Unknown';
        const m = map.get(place) ?? { seconds: 0, lat: 0, lng: 0, n: 0 };
        m.seconds += r.seconds;
        if (r.last_lat && r.last_lng) { m.lat += r.last_lat; m.lng += r.last_lng; m.n += 1; }
        map.set(place, m);
    }

    const out = Array.from(map, ([place, v]) => ({
        place,
        hours: v.seconds / 3600,
        lat: v.n ? v.lat / v.n : null,
        lng: v.n ? v.lng / v.n : null,
    })).sort((a, b) => b.hours - a.hours);

    return NextResponse.json(out);
}
