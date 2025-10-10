import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError } from "uploadthing/server"; // if you add auth

const f = createUploadthing();

export const ourFileRouter = {
    // avatar endpoint for your Register page
    userImage: f({
        image: { maxFileSize: "4MB", maxFileCount: 1 },
    })
        // optional auth middleware if you want it
        // .middleware(async ({ req }) => {
        //   const user = await auth(req)
        //   if (!user) throw new UploadThingError("Unauthorized");
        //   return { userId: user.id };
        // })
        .onUploadComplete(async ({ file /*, metadata */ }) => {
            // Runs on server after upload. You can persist file info here if needed.
            // file.ufsUrl is the canonical URL on the server.
            // Returning data is optional; client also receives `url`.
            return { ok: true };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
