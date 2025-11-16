'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AtSignIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/lib/validations/auth';

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const form = useForm<ForgotPasswordInput>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: '',
        },
    });

    async function onSubmit(data: ForgotPasswordInput) {
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error(result.error || 'Failed to send reset email');
                return;
            }

            setEmailSent(true);
            toast.success('Password reset link sent! Check your email.');
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    if (emailSent) {
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
                        Check Your Email
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-base">
                        We've sent a password reset link to your email address.
                    </p>
                </div>

                <div className="space-y-4">
                    <Button type="button" className="w-full" asChild>
                        <Link href="/login">Back to Sign In</Link>
                    </Button>

                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                        Didn't receive the email?{' '}
                        <button
                            onClick={() => setEmailSent(false)}
                            className="text-orange-500 hover:text-orange-600 underline underline-offset-4 font-medium"
                        >
                            Try again
                        </button>
                    </p>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="flex flex-col space-y-1">
                <h1 className="font-heading text-2xl font-bold tracking-wide text-black dark:text-white">
                    Forgot Your Password?
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-base">
                    Enter your email address and we'll send you a link to reset your password.
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <div className="relative h-max">
                                        <Input
                                            placeholder="your.email@example.com"
                                            className="peer ps-9"
                                            type="email"
                                            {...field}
                                        />
                                        <div className="text-gray-500 dark:text-gray-400 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                            <AtSignIcon className="size-4" aria-hidden="true" />
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Sending...' : 'Send Reset Link'}
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
