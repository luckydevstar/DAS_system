import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { FaceVerifySchema } from '@/lib/validators';

function cosineSim(a: number[], b: number[]) {
    const dot = a.reduce((s, v, i) => s + v * b[i], 0);
    const na = Math.sqrt(a.reduce((s, v) => s + v * v, 0));
    const nb = Math.sqrt(b.reduce((s, v) => s + v * v, 0));
    return dot / (na * nb + 1e-8);
}

async function computeEmbeddingFromUrl(_url: string): Promise<number[]> {
    // TODO: plug your real model
    return Array.from({ length: 128 }, () => Math.random());
}

export async function POST(req: Request) {
    const auth = await getAuthUser(req);
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const parsed = FaceVerifySchema.parse(await req.json());

        const { data: face } = await supabase
            .from('user_face').select('embedding').eq('user_id', auth.userId).eq('is_active', true).maybeSingle();

        if (!face?.embedding) {
            return NextResponse.json({ verified: false, reason: 'No enrolled face' }, { status: 400 });
        }

        const probe = await computeEmbeddingFromUrl(parsed.imageUrl);
        const sim = cosineSim(face.embedding as number[], probe);
        const threshold = 0.7; // adjust after you test your model

        return NextResponse.json({ verified: sim >= threshold, score: sim });
    } catch (err: any) {
        return NextResponse.json({ error: err.message ?? 'Bad Request' }, { status: 400 });
    }
}
