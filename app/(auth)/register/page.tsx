"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import "@uploadthing/react/styles.css";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { UploadDropzone } from "@/utils/uploadthing";

type RegisterInput = {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    photoUrl?: string;
    role: "driver" | "admin";
};

export default function RegisterPage() {
    const router = useRouter();
    const sp = useSearchParams();
    const redirectTo = sp.get("redirectTo") || "/dashboard";

    const [submitting, setSubmitting] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [preview, setPreview] = React.useState<string | null>(null);
    const [uploadPct, setUploadPct] = React.useState<number | null>(null); // NEW

    const form = useForm<RegisterInput>({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            phone: "",
            photoUrl: "",
            role: "driver",
        },
        mode: "onBlur",
    });

    function isValidEmail(v: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    }
    function isValidUrlOrEmpty(v?: string) {
        if (!v || v.trim() === "") return true;
        try {
            new URL(v);
            return true;
        } catch {
            return "Must be a valid URL";
        }
    }

    async function onSubmit(values: RegisterInput) {
        setSubmitting(true);
        try {
            // Normalize: omit empty optional fields so backend zod doesn’t see ""
            const payload: Partial<RegisterInput> & {
                fullName: string;
                email: string;
                password: string;
                role: "driver" | "admin";
            } = {
                fullName: values.fullName.trim(),
                email: values.email.trim(),
                password: values.password,
                role: values.role,
            };
            if (values.phone && values.phone.trim() !== "") payload.phone = values.phone.trim();
            if (values.photoUrl && values.photoUrl.trim() !== "") payload.photoUrl = values.photoUrl.trim();

            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();

            if (!res.ok) {
                const message = data?.error || "Registration failed";
                form.setError("email", { message });
                return;
            }

            if (data?.token) localStorage.setItem("das_token", data.token);
            router.push(redirectTo);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unexpected error";
            form.setError("fullName", { message }); // show somewhere visible
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen w-full bg-background flex items-center justify-center px-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Create your account</CardTitle>
                    <CardDescription>Register to access the DAS dashboard.</CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            {/* Full name */}
                            <FormField
                                control={form.control}
                                name="fullName"
                                rules={{
                                    required: "Full name is required",
                                    minLength: { value: 2, message: "Full name is required" },
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Jane Doe" autoComplete="name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                rules={{
                                    required: "Email is required",
                                    validate: (v) => (isValidEmail(v) ? true : "Invalid email"),
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="jane@company.com" autoComplete="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Password + Phone */}
                            <FormField
                                control={form.control}
                                name="password"
                                rules={{
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Min 6 characters" },
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <div className="relative">
                                            <FormControl>
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    autoComplete="new-password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <button
                                                type="button"
                                                className="absolute right-2 top-1/2 transform !-translate-y-[50%] text-sm text-muted-foreground hover:text-foreground"
                                                onClick={() => setShowPassword((s) => !s)}
                                                aria-label={showPassword ? "Hide password" : "Show password"}
                                            >
                                                {showPassword ? "Hide" : "Show"}
                                            </button>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone"
                                rules={{
                                    validate: (v) =>
                                        !v || v.trim() === "" || /^[+0-9()\-.\s]{6,}$/.test(v)
                                            ? true
                                            : "Invalid phone format",
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone (optional)</FormLabel>
                                        <FormControl>
                                            <Input type="tel" placeholder="+44 20 7946 0958" autoComplete="tel" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Role */}
                            <FormField
                                control={form.control}
                                name="role"
                                rules={{ required: "Role is required" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select role" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="driver">Driver</SelectItem>
                                                <SelectItem value="admin">Admin</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Avatar upload via UploadThing */}
                            <div className="space-y-2">
                                <Label>Profile photo (optional)</Label>

                                <UploadDropzone
                                    endpoint="userImage"
                                    // ⛔ remove config={{ mode: "auto" }} if you had it
                                    // (manual mode shows the Upload button)
                                    onClientUploadComplete={(res) => {
                                        const url = (res as Array<{ url: string }> | undefined)?.[0]?.url;
                                        if (url) {
                                            form.setValue("photoUrl", url, { shouldValidate: true });
                                            setPreview(url);
                                        }
                                    }}
                                    onUploadError={(e) => {
                                        const msg = (e as Error)?.message || "Upload failed";
                                        form.setError("photoUrl", { message: msg });
                                    }}
                                    className="rounded-md border border-dashed p-4"
                                />

                                {/* Simple progress bar */}
                                {typeof uploadPct === "number" && (
                                    <div className="mt-2">
                                        <div className="h-2 w-full rounded bg-muted">
                                            <div
                                                className="h-2 rounded bg-primary transition-[width]"
                                                style={{ width: `${uploadPct}%` }}
                                            />
                                        </div>
                                        <p className="mt-1 text-xs text-muted-foreground">{uploadPct}%</p>
                                    </div>
                                )}

                                {preview ? (
                                    <div className="mt-2 flex items-center gap-3">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={preview} alt="Preview" className="h-14 w-14 rounded-full object-cover" />
                                        <span className="text-xs text-muted-foreground truncate">{preview}</span>
                                    </div>
                                ) : null}

                                {/* Manual URL input (optional) */}
                                <FormField
                                    control={form.control}
                                    name="photoUrl"
                                    rules={{ validate: isValidUrlOrEmpty }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="https://…" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button type="submit" className="w-full" disabled={submitting}>
                                {submitting ? "Creating account…" : "Create account"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>

                <CardFooter className="flex flex-col gap-2">
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <a
                            href={`/login?redirectTo=${encodeURIComponent(redirectTo)}`}
                            className="text-primary underline-offset-2 hover:underline"
                        >
                            Sign in
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
