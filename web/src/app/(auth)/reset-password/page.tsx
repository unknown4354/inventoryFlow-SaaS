'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { PasswordInput } from '@/components/auth/password-input';
import { resetPasswordSchema, type ResetPasswordInput } from '@/lib/validations/auth';

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const token = searchParams.get('token');

    const form = useForm<Omit<ResetPasswordInput, 'token'>>({
        resolver: zodResolver(resetPasswordSchema.omit({ token: true })),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    useEffect(() => {
        if (!token) {
            toast.error('Invalid reset link');
            router.push('/forgot-password');
        }
    }, [token, router]);

    async function onSubmit(data: Omit<ResetPasswordInput, 'token'>) {
        if (!token) return;

        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, token }),
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error(result.error || 'Failed to reset password');
                return;
            }

            setSuccess(true);
            toast.success('Password reset successfully!');
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    if (success) {
        return (
            <>
                <div className="flex flex-col space-y-1 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                        <svg
                            className="h-8 w-8 text-green-600 dark:text-green-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <h1 className="font-heading text-2xl font-bold tracking-wide text-black dark:text-white">
                        Password Reset Complete
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-base">
                        Your password has been successfully reset. You can now sign in with your new password.
                    </p>
                </div>

                <div className="space-y-4">
                    <Button type="button" className="w-full" asChild>
                        <Link href="/login">Continue to Sign In</Link>
                    </Button>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="flex flex-col space-y-1">
                <h1 className="font-heading text-2xl font-bold tracking-wide text-black dark:text-white">
                    Reset Your Password
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-base">
                    Enter your new password below.
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <PasswordInput
                                        placeholder="Create a strong password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm New Password</FormLabel>
                                <FormControl>
                                    <PasswordInput
                                        placeholder="Re-enter your password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Resetting...' : 'Reset Password'}
                    </Button>
                </form>
            </Form>

            <p className="text-gray-500 dark:text-gray-400 text-center text-sm">
                Remember your password?{' '}
                <Link
                    href="/login"
                    className="text-orange-500 hover:text-orange-600 underline underline-offset-4 font-medium"
                >
                    Sign in
                </Link>
            </p>
        </>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordForm />
        </Suspense>
    );
}
