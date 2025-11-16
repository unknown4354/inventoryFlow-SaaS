'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CircularProgressProps {
    value: number;
    max: number;
    label: string;
    sublabel: string;
    color: string;
    size?: number;
}

export function CircularProgress({ value, max, label, sublabel, color, size = 200 }: CircularProgressProps) {
    const percentage = (value / max) * 100;
    const circumference = 2 * Math.PI * (size / 2 - 20);
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={size / 2 - 20}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    className="text-gray-200"
                />

                {/* Progress circle */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={size / 2 - 20}
                    fill="none"
                    stroke={color}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                />

                {/* Glow effect */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={size / 2 - 20}
                    fill="none"
                    stroke={color}
                    strokeWidth="20"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="opacity-20 blur-sm"
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            </svg>

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                    className="text-center"
                >
                    <div className="text-4xl font-bold text-black mb-1">
                        {value}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                        {label}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                        of {max}
                    </div>
                </motion.div>
            </div>

            {/* Sublabel */}
            <div className="absolute -bottom-8 left-0 right-0 text-center">
                <p className="text-sm font-medium text-gray-700">
                    {sublabel}
                </p>
            </div>
        </div>
    );
}
