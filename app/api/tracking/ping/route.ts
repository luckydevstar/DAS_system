import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { TrackingPingSchema } from '@/lib/validators';
import { reverseGeocode, timeOfDay } from '@/lib/geo';
import { classifyRoad } from '@/lib/road';

async function getLastOpenSegment(tripId: string, userId: string) {
    const { data } = await supabase
        .from('trip_segment')
        .select('*')
        .eq('trip_id', tripId)
        .eq('user_id', userId)
        .is('stopped_at', null)
        .order('started_at', { ascending: false })
        .limit(1)
        .maybeSingle();
    return data ?? null;
}

export async function POST(req: Request) {
    const auth = await getAuthUser(req);
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const parsed = TrackingPingSchema.parse(await req.json());
        const at = parsed.at ? new Date(parsed.at) : new Date();

        // Validate trip
        const { data: trip } = await supabase
            .from('trip')
            .select('id, user_id, vehicle_id, status')
            .eq('id', parsed.tripId)
            .eq('user_id', auth.userId)
            .single();
        if (!trip || trip.status !== 'running') {
            return NextResponse.json({ error: 'Trip not running' }, { status: 400 });
        }

        // Reverse geocode + classify
        const geo = await reverseGeocode(parsed.lat, parsed.lng);
        const roadType = classifyRoad(geo.ref ?? null, geo.road ?? null);
        const tod = timeOfDay(at);

        // last open segment?
        const last = await getLastOpenSegment(trip.id, auth.userId);

        const sameBucket =
            last &&
            last.road_type === roadType &&
            (last.city ?? null) === (geo.city ?? null) &&
            (last.town ?? null) === (geo.town ?? null) &&
            (last.postcode ?? null) === (geo.postcode ?? null) &&
            last.time_of_day === tod;

        if (sameBucket) {
            // extend the segment
            const { error: uErr } = await supabase
                .from('trip_segment')
                .update({
                    stopped_at: at.toISOString(),
                    last_lat: parsed.lat,
                    last_lng: parsed.lng,
                })
                .eq('id', last.id);
            if (uErr) throw uErr;
            return NextResponse.json({ segmentId: last.id, extended: true });
        } else {
            // close previous segment if any
            if (last) {
                await supabase.from('trip_segment').update({ stopped_at: at.toISOString() }).eq('id', last.id);
            }
            // open new segment
            const { data: seg, error: sErr } = await supabase
                .from('trip_segment')
                .insert({
                    trip_id: trip.id,
                    user_id: auth.userId,
                    vehicle_id: trip.vehicle_id,
                    city: geo.city ?? null,
                    town: geo.town ?? null,
                    postcode: geo.postcode ?? null,
                    country: geo.country ?? null,
                    road_ref: geo.ref ?? null,
                    road_type: roadType,
                    time_of_day: tod,
                    started_at: at.toISOString(),
                    last_lat: parsed.lat,
                    last_lng: parsed.lng,
                })
                .select('id')
                .single();
            if (sErr) throw sErr;

            return NextResponse.json({ segmentId: seg.id, extended: false });
        }
    } catch (err: any) {
        return NextResponse.json({ error: err.message ?? 'Bad Request' }, { status: 400 });
    }
}
