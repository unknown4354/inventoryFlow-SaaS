'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Zap,
    Building2,
    Camera,
    Sparkles,
    Armchair,
    UtensilsCrossed
} from 'lucide-react';

const vendorTypes = [
    { name: 'Electrical', icon: Zap, count: 145, totalItems: 180, utilization: 72, revenue: '₹4.2L' },
    { name: 'Structures', icon: Building2, count: 89, totalItems: 120, utilization: 85, revenue: '₹5.8L' },
    { name: 'AV Equipment', icon: Camera, count: 123, totalItems: 150, utilization: 78, revenue: '₹6.5L' },
    { name: 'Decor', icon: Sparkles, count: 234, totalItems: 280, utilization: 92, revenue: '₹8.2L' },
    { name: 'Furniture', icon: Armchair, count: 178, totalItems: 220, utilization: 88, revenue: '₹7.1L' },
    { name: 'Catering', icon: UtensilsCrossed, count: 156, totalItems: 200, utilization: 76, revenue: '₹5.4L' },
];

export function VendorBreakdown() {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-bold text-black mb-6">
                Inventory by Category
            </h3>

            <div className="space-y-4">
                {vendorTypes.map((vendor, index) => (
                    <motion.div
                        key={vendor.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-orange-50 transition-colors">
                                    <vendor.icon className="h-4 w-4 text-gray-700 group-hover:text-orange-500 transition-colors" />
                                </div>
                                <div>
                                    <div className="font-medium text-black">
                                        {vendor.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {vendor.count}/{vendor.totalItems} items in use
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-bold text-black">
                                    {vendor.utilization}%
                                </div>
                                <div className="text-xs text-gray-600">
                                    {vendor.revenue}
                                </div>
                            </div>
                        </div>

                        {/* Utilization progress bar */}
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-gray-600 to-orange-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${vendor.utilization}%` }}
                                transition={{ delay: index * 0.1 + 0.2, duration: 0.8, ease: 'easeOut' }}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
