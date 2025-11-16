'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AtSignIcon } from 'lucide-react';
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
import { loginSchema, type LoginInput } from '@/lib/validations/auth';

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const form = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });

    async function onSubmit(data: LoginInput) {
        setIsLoading(true);

        try {
            const result = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (result?.error) {
                toast.error(result.error);
            } else {
                toast.success('Welcome back!');
                router.push('/dashboard');
                router.refresh();
            }
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
                    Sign In to Your Account
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-base">
                    Welcome back! Please enter your details.
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
                                        placeholder="Enter your password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex items-center justify-between">
                        <FormField
                            control={form.control}
                            name="rememberMe"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal cursor-pointer">
                                        Remember me
                                    </FormLabel>
                                </FormItem>
                            )}
                        />

                        <Link
                            href="/forgot-password"
                            className="text-sm text-orange-500 hover:text-orange-600 underline underline-offset-4"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                </form>
            </Form>

            <p className="text-gray-500 dark:text-gray-400 text-center text-sm">
                Don't have an account?{' '}
                <Link
                    href="/signup"
                    className="text-orange-500 hover:text-orange-600 underline underline-offset-4 font-medium"
                >
                    Sign up
                </Link>
            </p>
        </>
    );
}
