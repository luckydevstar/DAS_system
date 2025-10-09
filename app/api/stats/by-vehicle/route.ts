import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(req: Request) {
    const auth = await getAuthUser(req);
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // join vehicle to get the vehicle.type you stored during lookup
    const { data, error } = await supabase
        .from('v_segment_durations')
        .select('vehicle_id, seconds');

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    const secsById = new Map<string, number>();
    for (const r of (data ?? []) as any[]) {
        if (!r.vehicle_id) continue;
        secsById.set(r.vehicle_id, (secsById.get(r.vehicle_id) || 0) + r.seconds);
    }

    // fetch distinct vehicles for this user to map id -> type
    const { data: vehicles } = await supabase
        .from('vehicle')
        .select('id, type, make, model')
        .eq('user_id', auth.userId);

    const byType = new Map<string, number>();
    for (const v of (vehicles ?? []) as any[]) {
        const type = v.type || 'Unknown';
        const secs = secsById.get(v.id) || 0;
        byType.set(type, (byType.get(type) || 0) + secs);
    }

    const out = Array.from(byType, ([vehicleType, seconds]) => ({
        vehicleType,
        hours: seconds / 3600,
    })).sort((a, b) => b.hours - a.hours);

    return NextResponse.json(out);
}
