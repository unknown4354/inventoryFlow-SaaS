'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

function EmailVerificationContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    useEffect(() => {
        if (token) {
            verifyEmail(token);
        } else if (!email) {
            setStatus('error');
            setMessage('Invalid verification link');
        }
    }, [token, email]);

    async function verifyEmail(verificationToken: string) {
        try {
            const response = await fetch(`/api/auth/verify-email?token=${verificationToken}`);
            const result = await response.json();

            if (!response.ok) {
                setStatus('error');
                setMessage(result.error || 'Verification failed');
                toast.error(result.error || 'Email verification failed');
                return;
            }

            setStatus('success');
            setMessage('Your email has been verified successfully!');
            toast.success('Email verified successfully!');

            // Redirect to login after 3 seconds
            setTimeout(() => {
                router.push('/login');
            }, 3000);
        } catch (error) {
            setStatus('error');
            setMessage('An error occurred during verification');
            toast.error('An error occurred. Please try again.');
        }
    }

    if (status === 'loading') {
        return (
            <>
                <div className="flex flex-col space-y-1 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-orange-500" />
                    </div>
                    <h1 className="font-heading text-2xl font-bold tracking-wide text-black dark:text-white">
                        Verifying Your Email
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-base">
                        Please wait while we verify your email address...
                    </p>
                </div>
            </>
        );
    }

    if (status === 'success') {
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
                        Email Verified!
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-base">
                        {message}
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                        Redirecting to sign in...
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

    // Error state
    return (
        <>
            <div className="flex flex-col space-y-1 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                    <svg
                        className="h-8 w-8 text-red-600 dark:text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </div>
                <h1 className="font-heading text-2xl font-bold tracking-wide text-black dark:text-white">
                    Verification Failed
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-base">
                    {message}
                </p>
            </div>

            <div className="space-y-4">
                {email && (
                    <Button
                        type="button"
                        className="w-full"
                        onClick={async () => {
                            // TODO: Implement resend verification email
                            toast.info('Resending verification email...');
                        }}
                    >
                        Resend Verification Email
                    </Button>
                )}
                <Button type="button" variant="outline" className="w-full" asChild>
                    <Link href="/signup">Back to Sign Up</Link>
                </Button>
            </div>
        </>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EmailVerificationContent />
        </Suspense>
    );
}
