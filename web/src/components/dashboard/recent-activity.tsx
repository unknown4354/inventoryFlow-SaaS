'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    PackagePlus,
    PackageMinus,
    Calendar,
    UserPlus,
    Wrench,
    AlertTriangle
} from 'lucide-react';

const activities = [
    {
        id: 1,
        type: 'checkout',
        icon: PackageMinus,
        title: 'AV Equipment checked out',
        description: '8x LED Moving Head Lights, 4x Speakers - Project Expo 2025',
        time: '1 hour ago',
    },
    {
        id: 2,
        type: 'checkin',
        icon: PackagePlus,
        title: 'Furniture returned',
        description: '150x Chiavari Chairs, 20x Round Tables - All items inspected',
        time: '3 hours ago',
    },
    {
        id: 3,
        type: 'maintenance',
        icon: Wrench,
        title: 'Generator maintenance',
        description: '15KVA Diesel Generator - Oil change and filter replacement',
        time: '4 hours ago',
    },
    {
        id: 4,
        type: 'booking',
        icon: Calendar,
        title: 'New project booked',
        description: 'Tech Conference - Dec 20, 2025 (₹8.5L estimated)',
        time: '6 hours ago',
    },
    {
        id: 5,
        type: 'checkout',
        icon: PackageMinus,
        title: 'Decor items dispatched',
        description: '50x Crystal Centerpieces, 10x Backdrop Frames - Corporate Gala',
        time: '8 hours ago',
    },
    {
        id: 6,
        type: 'alert',
        icon: AlertTriangle,
        title: 'Low stock alert',
        description: 'Portable LED Lights - Only 5 remaining (min: 15)',
        time: '1 day ago',
    },
];

export function RecentActivity() {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-bold text-black mb-6">
                Recent Activity
            </h3>

            <div className="space-y-2">
                {activities.map((activity, index) => (
                    <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex gap-4 group cursor-pointer hover:bg-orange-50 p-3 rounded-lg transition-colors"
                    >
                        <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-orange-100 transition-colors shrink-0">
                            <activity.icon className="h-5 w-5 text-gray-700 group-hover:text-orange-500 transition-colors" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-black truncate">
                                {activity.title}
                            </p>
                            <p className="text-sm text-gray-600 truncate">
                                {activity.description}
                            </p>
                        </div>

                        <span className="text-xs text-gray-500 whitespace-nowrap self-start mt-0.5">
                            {activity.time}
                        </span>
                    </motion.div>
                ))}
            </div>

            <button className="w-full mt-4 py-2 text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors">
                View all activity →
            </button>
        </div>
    );
}
