// /app/api/face/verify/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { FaceVerifyJsonSchema } from '@/lib/validators';
import { rekognition } from '@/lib/aws';
import { CompareFacesCommand } from '@aws-sdk/client-rekognition';
import { fetchUrlToBuffer, fileToBuffer } from '@/lib/image';

export const dynamic = 'force-dynamic';  // ensure Node runtime
export const runtime = 'nodejs';

const SIM_THRESHOLD = Number(process.env.REKOGNITION_SIMILARITY ?? 85); // percent

async function getLiveImageBytes(req: Request): Promise<Buffer> {
    const ctype = req.headers.get('content-type') || '';
    if (ctype.includes('multipart/form-data')) {
        const form = await req.formData();
        const file = form.get('image');
        if (!(file instanceof File)) throw new Error('image file is required');
        return fileToBuffer(file);
    } else {
        // JSON with { imageUrl }
        const body = await req.json();
        const parsed = FaceVerifyJsonSchema.parse(body);
        return fetchUrlToBuffer(parsed.imageUrl);
    }
}

export async function POST(req: Request) {
    const auth = await getAuthUser(req);
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        // 1) Load reference image URL from DB
        const { data: user, error } = await supabase
            .from('app_user')
            .select('photo_url')
            .eq('id', auth.userId)
            .single();
        if (error || !user?.photo_url) {
            return NextResponse.json({ error: 'No reference photo on file' }, { status: 400 });
        }

        // 2) Read target (live) bytes and reference bytes into memory
        const targetBytes = await getLiveImageBytes(req);        // live capture
        const sourceBytes = await fetchUrlToBuffer(user.photo_url); // registration photo

        // 3) Call Rekognition CompareFaces
        const cmd = new CompareFacesCommand({
            SourceImage: { Bytes: sourceBytes }, // reference (registration)
            TargetImage: { Bytes: targetBytes }, // live selfie
            SimilarityThreshold: SIM_THRESHOLD,  // server-side threshold
        });
        const result = await rekognition.send(cmd);

        // 4) Decide pass/fail
        const best = result.FaceMatches?.[0];
        const similarity = best?.Similarity ?? 0;
        const verified = similarity >= SIM_THRESHOLD;

        return NextResponse.json({
            verified,
            similarity,                 // % (0..100)
            threshold: SIM_THRESHOLD,
            facesFoundInTarget: (result.FaceMatches ?? []).length,
            // Optional: return bounding boxes if you want UX overlays later
            // box: best?.Face?.BoundingBox
        });
    } catch (err: any) {
        return NextResponse.json({ error: err.message ?? 'Bad Request' }, { status: 400 });
    }
}
