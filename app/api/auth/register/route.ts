import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { RegisterSchema } from '@/lib/validators';
import { hashPassword, signJwt } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsed = RegisterSchema.parse(body);

        // check existing
        const { data: existing, error: e1 } = await supabase
            .from('app_user')
            .select('id')
            .eq('email', parsed.email)
            .maybeSingle();
        if (e1) throw e1;
        if (existing) return NextResponse.json({ error: 'Email already registered' }, { status: 409 });

        const password_hash = await hashPassword(parsed.password);

        const { data: user, error: e2 } = await supabase
            .from('app_user')
            .insert({
                email: parsed.email,
                password_hash,
                full_name: parsed.fullName,
                phone: parsed.phone ?? null,
                photo_url: parsed.photoUrl ?? null,
                role: parsed.role ?? 'driver',
            })
            .select('id, email, full_name, role')
            .single();
        if (e2) throw e2;

        const token = await signJwt({ userId: user.id });
        return NextResponse.json({ user, token }, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message ?? 'Bad Request' }, { status: 400 });
    }
}
