// /lib/aws.ts
import { RekognitionClient } from '@aws-sdk/client-rekognition';

export const rekognition = new RekognitionClient({
    region: process.env.AWS_REGION!,
});
