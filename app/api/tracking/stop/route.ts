import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { TrackingStopSchema } from '@/lib/validators';

export async function POST(req: Request) {
    const auth = await getAuthUser(req);
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const parsed = TrackingStopSchema.parse(await req.json());
        const now = new Date().toISOString();

        // Close trip
        const { data: trip } = await supabase
            .from('trip')
            .select('id, user_id, status')
            .eq('id', parsed.tripId)
            .eq('user_id', auth.userId)
            .single();

        if (!trip || trip.status !== 'running') {
            return NextResponse.json({ error: 'Trip not running' }, { status: 400 });
        }

        await supabase.from('trip').update({ status: 'stopped', stopped_at: now }).eq('id', parsed.tripId);

        // Close last open segment
        await supabase.from('trip_segment')
            .update({ stopped_at: now })
            .eq('trip_id', parsed.tripId)
            .eq('user_id', auth.userId)
            .is('stopped_at', null);

        return NextResponse.json({ stopped: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message ?? 'Bad Request' }, { status: 400 });
    }
}
