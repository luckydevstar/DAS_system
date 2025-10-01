import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { LoginSchema } from '@/lib/validators';
import { verifyPassword, signJwt } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const parsed = LoginSchema.parse(await req.json());
        const { data: user, error } = await supabase
            .from('app_user')
            .select('id, email, password_hash, full_name, role')
            .eq('email', parsed.email)
            .single();
        if (error || !user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

        const ok = await verifyPassword(parsed.password, user.password_hash);
        if (!ok) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

        const token = await signJwt({ userId: user.id });
        delete (user as any).password_hash;
        return NextResponse.json({ user, token });
    } catch (err: any) {
        return NextResponse.json({ error: err.message ?? 'Bad Request' }, { status: 400 });
    }
}
