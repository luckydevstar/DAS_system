import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { TrackingStartSchema } from '@/lib/validators';

export async function POST(req: Request) {
    const auth = await getAuthUser(req);
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const parsed = TrackingStartSchema.parse(await req.json());

        // Ensure the vehicle belongs to user and is verified
        const { data: vehicle, error: vErr } = await supabase
            .from('vehicle')
            .select('id, is_verified')
            .eq('id', parsed.vehicleId)
            .eq('user_id', auth.userId)
            .single();
        if (vErr || !vehicle) return NextResponse.json({ error: 'Vehicle not found' }, { status: 400 });
        if (!vehicle.is_verified) return NextResponse.json({ error: 'Vehicle not verified yet' }, { status: 400 });

        // Close any dangling running trips (safety)
        await supabase.from('trip').update({ status: 'stopped', stopped_at: new Date().toISOString() })
            .eq('user_id', auth.userId).eq('status', 'running');

        const { data: trip, error } = await supabase
            .from('trip')
            .insert({ user_id: auth.userId, vehicle_id: vehicle.id, status: 'running' })
            .select('id, started_at')
            .single();
        if (error) throw error;

        return NextResponse.json({ trip });
    } catch (err: any) {
        return NextResponse.json({ error: err.message ?? 'Bad Request' }, { status: 400 });
    }
}
