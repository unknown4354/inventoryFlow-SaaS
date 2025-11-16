'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    Users,
    Calendar,
    BarChart3,
    Settings,
    Warehouse,
    Menu,
    X,
    ChevronRight,
    Grid2x2PlusIcon,
    PackageMinus,
    PackagePlus,
    Wrench,
    FileText,
    Boxes
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigationSections = [
    {
        title: null,
        items: [
            { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        ]
    },
    {
        title: 'Inventory',
        items: [
            { name: 'All Items', href: '/dashboard/inventory', icon: Package },
            { name: 'Categories', href: '/dashboard/inventory/categories', icon: Boxes },
            { name: 'Check-Out', href: '/dashboard/inventory/checkout', icon: PackageMinus },
            { name: 'Check-In', href: '/dashboard/inventory/checkin', icon: PackagePlus },
            { name: 'Maintenance', href: '/dashboard/inventory/maintenance', icon: Wrench },
        ]
    },
    {
        title: 'Management',
        items: [
            { name: 'Projects', href: '/dashboard/projects', icon: Calendar },
            { name: 'Clients', href: '/dashboard/clients', icon: Users },
            { name: 'Warehouses', href: '/dashboard/warehouses', icon: Warehouse },
        ]
    },
    {
        title: 'Reports',
        items: [
            { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
            { name: 'Reports', href: '/dashboard/reports', icon: FileText },
        ]
    },
    {
        title: null,
        items: [
            { name: 'Settings', href: '/dashboard/settings', icon: Settings },
        ]
    }
];

export function DashboardSidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

    return (
        <>
            {/* Mobile overlay */}
            {!collapsed && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setCollapsed(true)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 z-50 h-full bg-white border-r border-gray-200 transition-all duration-300 ${
                    collapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'w-64'
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    {!collapsed && (
                        <Link href="/dashboard" className="flex items-center gap-2">
                            <Grid2x2PlusIcon className="h-6 w-6 text-orange-500" />
                            <span className="text-xl font-bold text-black">
                                InventoryFlow
                            </span>
                        </Link>
                    )}

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCollapsed(!collapsed)}
                        className="lg:hidden"
                    >
                        {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
                    </Button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
                    {navigationSections.map((section, sectionIdx) => (
                        <div key={sectionIdx}>
                            {section.title && !collapsed && (
                                <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                    {section.title}
                                </h3>
                            )}
                            <div className="space-y-1">
                                {section.items.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                                                isActive
                                                    ? 'bg-white text-black border border-orange-500 shadow-sm'
                                                    : 'text-gray-600 hover:bg-gray-50 border border-transparent hover:border-gray-200'
                                            }`}
                                        >
                                            <item.icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-orange-500' : ''}`} />
                                            {!collapsed && (
                                                <>
                                                    <span className="font-medium text-sm">{item.name}</span>
                                                    {isActive && (
                                                        <ChevronRight className="h-4 w-4 ml-auto text-orange-500" />
                                                    )}
                                                </>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Collapse toggle (desktop only) */}
                <div className="absolute bottom-4 left-4 right-4 hidden lg:block">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCollapsed(!collapsed)}
                        className="w-full justify-center border-gray-200 hover:border-orange-500"
                    >
                        {collapsed ? <ChevronRight className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    </Button>
                </div>
            </aside>

            {/* Spacer for main content */}
            <div className={`transition-all duration-300 ${collapsed ? 'lg:w-20' : 'w-64'}`} />
        </>
    );
}
