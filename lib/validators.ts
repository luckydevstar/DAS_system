import { z } from 'zod';

export const RegisterSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
    fullName: z.string().min(1),
    phone: z.string().optional(),
    photoUrl: z.string().url().optional(),
    role: z.enum(['driver', 'admin']).optional()
});

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const PlateLookupSchema = z.object({
    plate: z.string().min(2), // we'll normalize server-side
});

// verification accepts either multipart (file) or JSON { imageUrl }
export const FaceVerifyJsonSchema = z.object({
    imageUrl: z.string().url(),
});

export const TrackingStartSchema = z.object({
    vehicleId: z.string().uuid(),
});

export const TrackingPingSchema = z.object({
    tripId: z.string().uuid(),
    lat: z.number().finite(),
    lng: z.number().finite(),
    at: z.string().datetime().optional(), // ISO; default: now
});

export const TrackingStopSchema = z.object({
    tripId: z.string().uuid(),
});
