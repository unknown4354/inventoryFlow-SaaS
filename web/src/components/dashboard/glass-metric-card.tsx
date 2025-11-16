'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface GlassMetricCardProps {
    title: string;
    value: string | number;
    subtitle: string;
    icon: LucideIcon;
    chart?: number[];
    index: number;
}

export function GlassMetricCard({ title, value, subtitle, icon: Icon, chart, index }: GlassMetricCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
            className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:border-orange-500/50 transition-colors"
        >
            {/* Subtle orange glow on hover */}
            <motion.div
                className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
            />

            {/* Content */}
            <div className="relative z-10 p-6">
                {/* Icon */}
                <div className="flex items-start justify-between mb-4">
                    <motion.div
                        className="p-3 rounded-xl bg-gray-100 group-hover:bg-orange-50 transition-colors"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <Icon className="h-6 w-6 text-gray-700 group-hover:text-orange-500 transition-colors" />
                    </motion.div>

                    {/* Mini sparkline */}
                    {chart && chart.length > 0 && (
                        <svg className="w-20 h-8" viewBox="0 0 80 32">
                            <motion.polyline
                                points={chart.map((val, i) => `${(i / (chart.length - 1)) * 80},${32 - (val / Math.max(...chart)) * 28}`).join(' ')}
                                fill="none"
                                stroke={`url(#gradient-${index})`}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, delay: index * 0.1 }}
                            />
                            <defs>
                                <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="rgb(234, 88, 12)" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="rgb(234, 88, 12)" stopOpacity="1" />
                                </linearGradient>
                            </defs>
                        </svg>
                    )}
                </div>

                {/* Title */}
                <p className="text-sm font-medium text-gray-600 mb-2">
                    {title}
                </p>

                {/* Value */}
                <motion.p
                    className="text-3xl font-bold text-black mb-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                >
                    {value}
                </motion.p>

                {/* Subtitle */}
                <p className="text-xs text-gray-500">
                    {subtitle}
                </p>

                {/* Animated bottom border - subtle orange */}
                <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-orange-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                />
            </div>
        </motion.div>
    );
}
