import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(req: Request) {
    const auth = await getAuthUser(req);
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data, error } = await supabase
        .from('v_segment_durations')
        .select('time_of_day, seconds')
        .eq('user_id', auth.userId);

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    let day = 0, night = 0;
    for (const r of (data ?? []) as any[]) {
        if (r.time_of_day === 'NIGHT') night += r.seconds;
        else day += r.seconds;
    }
    return NextResponse.json({ dayHours: day / 3600, nightHours: night / 3600 });
}
