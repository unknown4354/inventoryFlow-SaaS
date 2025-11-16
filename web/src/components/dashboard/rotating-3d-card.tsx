'use client';

import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface Rotating3DCardProps {
    title: string;
    value: string;
    icon: LucideIcon;
    stats: { label: string; value: string }[];
}

export function Rotating3DCard({ title, value, icon: Icon, stats }: Rotating3DCardProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    const handleMouse = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(event.clientX - centerX);
        y.set(event.clientY - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div className="perspective-1000" onMouseMove={handleMouse} onMouseLeave={handleMouseLeave}>
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="relative rounded-2xl overflow-hidden group bg-white border border-gray-200 hover:border-orange-500/50 transition-colors"
            >
                {/* Subtle orange glow on hover */}
                <motion.div
                    className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
                />

                {/* Content */}
                <div className="relative z-10 p-6">
                    {/* Icon */}
                    <motion.div
                        className="w-16 h-16 rounded-2xl bg-gray-100 group-hover:bg-orange-50 flex items-center justify-center mb-4 transition-colors"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Icon className="h-8 w-8 text-gray-700 group-hover:text-orange-500 transition-colors" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-sm font-medium text-gray-600 mb-2">
                        {title}
                    </h3>

                    {/* Value */}
                    <p className="text-4xl font-bold text-black mb-6">
                        {value}
                    </p>

                    {/* Stats */}
                    <div className="space-y-3">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center justify-between"
                            >
                                <span className="text-sm text-gray-500">{stat.label}</span>
                                <span className="text-sm font-semibold text-black">{stat.value}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </motion.div>
        </div>
    );
}
