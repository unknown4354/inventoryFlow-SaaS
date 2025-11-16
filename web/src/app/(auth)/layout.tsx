'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeftIcon, Grid2x2PlusIcon } from 'lucide-react';
import { FloatingPaths } from '@/components/auth/floating-paths';
import { Button } from '@/components/ui/button';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="relative md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2 bg-white dark:bg-black">
            {/* Left Panel - Desktop Only */}
            <div className="bg-white dark:bg-black relative hidden h-full flex-col border-r border-gray-200 dark:border-gray-800 p-10 lg:flex">
                <div className="from-white dark:from-black absolute inset-0 z-10 bg-gradient-to-t via-transparent to-transparent" />
                <div className="z-10 flex items-center gap-2">
                    <Grid2x2PlusIcon className="size-6 text-black dark:text-white" />
                    <p className="text-xl font-semibold text-black dark:text-white">InventoryFlow</p>
                </div>
                <div className="z-10 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-xl text-black dark:text-white">
                            &ldquo;This Platform has helped me to save time and manage my wedding inventory business more efficiently than ever before.&rdquo;
                        </p>
                        <footer className="font-mono text-sm font-semibold text-gray-600 dark:text-gray-400">
                            ~ Rajesh Kumar, Wedding Decorator
                        </footer>
                    </blockquote>
                </div>
                <div className="absolute inset-0 overflow-hidden">
                    <FloatingPaths position={1} />
                    <FloatingPaths position={-1} />
                </div>
            </div>

            {/* Right Panel - Auth Content */}
            <div className="relative flex min-h-screen flex-col justify-center p-4 bg-white dark:bg-black">
                {/* Gradient Background Effects */}
                <div
                    aria-hidden
                    className="absolute inset-0 isolate contain-strict -z-10 opacity-60"
                >
                    <div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(234,88,12,0.06)_0,hsla(0,0%,55%,.02)_50%,rgba(234,88,12,0.01)_80%)] absolute top-0 right-0 h-320 w-140 -translate-y-87.5 rounded-full" />
                    <div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(234,88,12,0.04)_0,rgba(234,88,12,0.01)_80%,transparent_100%)] absolute top-0 right-0 h-320 w-60 [translate:5%_-50%] rounded-full" />
                    <div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(234,88,12,0.04)_0,rgba(234,88,12,0.01)_80%,transparent_100%)] absolute top-0 right-0 h-320 w-60 -translate-y-87.5 rounded-full" />
                </div>

                {/* Back to Home Button */}
                <Button variant="ghost" className="absolute top-7 left-5" asChild>
                    <Link href="/">
                        <ChevronLeftIcon className='size-4 me-2' />
                        Home
                    </Link>
                </Button>

                {/* Auth Content */}
                <div className="mx-auto space-y-4 sm:w-full sm:max-w-md">
                    {/* Logo - Mobile */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <Grid2x2PlusIcon className="size-6 text-black dark:text-white" />
                        <p className="text-xl font-semibold text-black dark:text-white">InventoryFlow</p>
                    </div>

                    {/* Main Content */}
                    {children}
                </div>
            </div>
        </main>
    );
}
