'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
    title: string;
    value: string | number;
    change?: number;
    icon: LucideIcon;
    trend?: 'up' | 'down' | 'neutral';
    index: number;
}

export function MetricCard({ title, value, change, icon: Icon, trend = 'neutral', index }: MetricCardProps) {
    const trendColor = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-lg border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6 hover:border-orange-500 transition-all duration-300"
        >
            {/* Animated background glow */}
            <motion.div
                className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: 'radial-gradient(circle at center, rgba(234, 88, 12, 0.1) 0%, transparent 70%)'
                }}
            />

            {/* Icon */}
            <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950">
                    <Icon className="h-6 w-6 text-orange-600 dark:text-orange-500" />
                </div>

                {change !== undefined && (
                    <span className={`text-sm font-medium ${trendColor}`}>
                        {change > 0 ? '+' : ''}{change}%
                    </span>
                )}
            </div>

            {/* Title */}
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                {title}
            </p>

            {/* Value */}
            <p className="text-3xl font-bold text-black dark:text-white">
                {value}
            </p>

            {/* Animated border on hover */}
            <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
}
