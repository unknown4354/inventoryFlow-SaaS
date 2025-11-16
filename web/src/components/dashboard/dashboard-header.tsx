'use client';

import React from 'react';
import { Bell, Search, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function DashboardHeader() {
    return (
        <header className="sticky top-0 z-30 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="flex h-16 items-center gap-4 px-6">
                {/* Mobile menu */}
                <Button variant="ghost" size="sm" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                </Button>

                {/* Search */}
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            type="search"
                            placeholder="Search inventory, projects, clients..."
                            className="pl-10 border-gray-200 focus:border-orange-500"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {/* Notifications */}
                    <Button variant="ghost" size="sm" className="relative text-gray-700 hover:text-black">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-orange-500" />
                    </Button>

                    {/* User menu */}
                    <Button variant="ghost" size="sm" className="gap-2 text-gray-700 hover:text-black">
                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-1 ring-orange-500">
                            <User className="h-4 w-4 text-gray-700" />
                        </div>
                        <span className="hidden md:inline font-medium">Admin</span>
                    </Button>
                </div>
            </div>
        </header>
    );
}
