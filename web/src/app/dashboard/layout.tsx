'use client';

import React from 'react';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { AnimatedBackground } from '@/components/dashboard/animated-background';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-white">
            {/* Animated background */}
            <AnimatedBackground />

            {/* Sidebar */}
            <DashboardSidebar />

            {/* Main content area */}
            <div className="flex-1 lg:pl-64">
                {/* Header */}
                <DashboardHeader />

                {/* Page content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
