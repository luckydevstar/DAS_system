import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { FaceEnrollSchema } from '@/lib/validators';

async function computeEmbeddingFromUrl(_url: string): Promise<number[]> {
    // TODO: call your model/service here. For now, return a mock 128-dim vector.
    return Array.from({ length: 128 }, () => Math.random());
}

export async function POST(req: Request) {
    const auth = await getAuthUser(req);
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const parsed = FaceEnrollSchema.parse(await req.json());
        const embedding = await computeEmbeddingFromUrl(parsed.imageUrl);

        // Deactivate old
        await supabase.from('user_face').update({ is_active: false }).eq('user_id', auth.userId);

        const { data, error } = await supabase.from('user_face').insert({
            user_id: auth.userId,
            image_url: parsed.imageUrl,
            embedding: embedding,
            is_active: true
        }).select('id').single();
        if (error) throw error;

        return NextResponse.json({ faceId: data.id, enrolled: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message ?? 'Bad Request' }, { status: 400 });
    }
}
