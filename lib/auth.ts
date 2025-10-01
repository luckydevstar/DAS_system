import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcrypt';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function hashPassword(plain: string) {
    return bcrypt.hash(plain, 10);
}

export async function verifyPassword(plain: string, hash: string) {
    return bcrypt.compare(plain, hash);
}

export async function signJwt(payload: object, expiresIn = '30d') {
    return new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime(expiresIn)
        .sign(secret);
}

export async function verifyJwt<T = any>(token: string) {
    const { payload } = await jwtVerify(token, secret);
    return payload as T;
}

export function getAuthUser(req: Request) {
    const h = req.headers.get('authorization') || '';
    const token = h.startsWith('Bearer ') ? h.slice(7) : null;
    if (!token) return null;
    return verifyJwt<{ userId: string }>(token).catch(() => null);
}
