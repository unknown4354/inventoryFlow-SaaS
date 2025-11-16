'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Plus,
    Calendar,
    Users,
    FileText,
    PackagePlus,
    Warehouse
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const actions = [
    {
        name: 'Add Inventory',
        icon: PackagePlus,
        description: 'Add new item to inventory',
    },
    {
        name: 'New Project',
        icon: Calendar,
        description: 'Create new project',
    },
    {
        name: 'Add Client',
        icon: Users,
        description: 'Register new client',
    },
    {
        name: 'Check Out',
        icon: Plus,
        description: 'Check out equipment',
    },
    {
        name: 'Generate Report',
        icon: FileText,
        description: 'Create custom report',
    },
    {
        name: 'Add Warehouse',
        icon: Warehouse,
        description: 'Register new warehouse',
    },
];

export function QuickActions() {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-bold text-black mb-6">
                Quick Actions
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {actions.map((action, index) => (
                    <motion.button
                        key={action.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative overflow-hidden rounded-xl border border-gray-200 p-4 text-left hover:border-orange-500 hover:bg-orange-50 transition-all duration-300"
                    >
                        <div className="relative">
                            <div className="inline-flex p-2 rounded-lg bg-gray-100 group-hover:bg-orange-100 mb-3 transition-colors">
                                <action.icon className="h-5 w-5 text-gray-700 group-hover:text-orange-500 transition-colors" />
                            </div>

                            <h4 className="font-semibold text-black mb-1">
                                {action.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                                {action.description}
                            </p>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
