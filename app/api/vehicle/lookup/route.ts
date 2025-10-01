import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { PlateLookupSchema } from '@/lib/validators';
import { normalizePlate } from '@/lib/utils';

export async function POST(req: Request) {
    const auth = await getAuthUser(req);
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const body = await req.json();
        const parsed = PlateLookupSchema.parse(body);
        const plate = normalizePlate(parsed.plate);

        const url = `${process.env.UKVD_ENDPOINT}?v=2&api_nullitems=1&auth_apikey=${process.env.UKVD_API_KEY}&key_VRM=${encodeURIComponent(plate)}`;

        const r = await fetch(url, { method: 'GET' });
        if (!r.ok) {
            return NextResponse.json({ error: 'UKVD lookup failed' }, { status: 502 });
        }
        const payload = await r.json();

        // Map to your fields. Adjust paths according to the package you subscribe to.
        const vd = payload?.Response?.DataItems?.VehicleRegistration ?? {};
        const type =
            vd?.BodyTypeDescription ??
            vd?.VehicleClass ?? null;

        const vehicle = {
            user_id: auth.userId,
            plate,
            make: vd?.Make ?? null,
            model: vd?.Model ?? null,
            color: vd?.Colour ?? null,
            type,
            raw: payload,
            is_verified: true
        };

        // Upsert for this user+plate
        const { data, error } = await supabase
            .from('vehicle')
            .upsert(vehicle, { onConflict: 'user_id,plate' })
            .select('id, plate, make, model, color, type, is_verified')
            .single();

        if (error) throw error;
        return NextResponse.json({ vehicle: data });
    } catch (err: any) {
        return NextResponse.json({ error: err.message ?? 'Bad Request' }, { status: 400 });
    }
}
