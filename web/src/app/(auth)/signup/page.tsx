'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AtSignIcon, UserIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { GoogleButton } from '@/components/auth/google-button';
import { AuthSeparator } from '@/components/auth/auth-separator';
import { PasswordInput } from '@/components/auth/password-input';
import { signupSchema, type SignupInput } from '@/lib/validations/auth';

export default function SignupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const form = useForm<SignupInput>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            acceptTerms: false,
        },
    });

    async function onSubmit(data: SignupInput) {
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error(result.error || 'Failed to create account');
                return;
            }

            toast.success('Account created! Please check your email to verify your account.');
            router.push('/verify-email?email=' + encodeURIComponent(data.email));
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    async function handleGoogleSignIn() {
        setIsGoogleLoading(true);
        try {
            await signIn('google', { callbackUrl: '/dashboard' });
        } catch (error) {
            toast.error('Failed to sign in with Google');
            setIsGoogleLoading(false);
        }
    }

    return (
        <>
            <div className="flex flex-col space-y-1">
                <h1 className="font-heading text-2xl font-bold tracking-wide text-black dark:text-white">
                    Create Your Account
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-base">
                    Get started with InventoryFlow today.
                </p>
            </div>

            <div className="space-y-2">
                <GoogleButton onClick={handleGoogleSignIn} isLoading={isGoogleLoading} />
            </div>

            <AuthSeparator />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <div className="relative h-max">
                                        <Input
                                            placeholder="John Doe"
                                            className="peer ps-9"
                                            type="text"
                                            {...field}
                                        />
                                        <div className="text-gray-500 dark:text-gray-400 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                            <UserIcon className="size-4" aria-hidden="true" />
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

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

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
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
                                <FormLabel>Confirm Password</FormLabel>
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

                    <FormField
                        control={form.control}
                        name="acceptTerms"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="leading-none">
                                    <FormLabel className="text-sm font-normal cursor-pointer">
                                        I agree to the{' '}
                                        <Link
                                            href="/terms"
                                            className="text-orange-500 hover:text-orange-600 underline underline-offset-4"
                                        >
                                            Terms of Service
                                        </Link>{' '}
                                        and{' '}
                                        <Link
                                            href="/privacy"
                                            className="text-orange-500 hover:text-orange-600 underline underline-offset-4"
                                        >
                                            Privacy Policy
                                        </Link>
                                    </FormLabel>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Creating account...' : 'Create Account'}
                    </Button>
                </form>
            </Form>

            <p className="text-gray-500 dark:text-gray-400 text-center text-sm">
                Already have an account?{' '}
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
