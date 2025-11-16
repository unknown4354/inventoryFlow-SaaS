'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function AnimatedBackground() {
    // Generate animated grid pattern
    const gridLines = React.useMemo(() => {
        const lines = [];
        const spacing = 80;
        const count = 20;

        // Vertical lines
        for (let i = 0; i < count; i++) {
            lines.push({
                id: `v-${i}`,
                x1: i * spacing,
                y1: 0,
                x2: i * spacing,
                y2: 1600,
                type: 'vertical'
            });
        }

        // Horizontal lines
        for (let i = 0; i < count; i++) {
            lines.push({
                id: `h-${i}`,
                x1: 0,
                y1: i * spacing,
                x2: 1600,
                y2: i * spacing,
                type: 'horizontal'
            });
        }

        return lines;
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 -z-10 opacity-[0.03]">
            <svg
                className="h-full w-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern
                        id="grid"
                        width="80"
                        height="80"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M 80 0 L 0 0 0 80"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.5"
                            className="text-gray-300"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Animated accent lines */}
                {[...Array(3)].map((_, i) => (
                    <motion.line
                        key={i}
                        x1="0"
                        y1={200 + i * 300}
                        x2="100%"
                        y2={200 + i * 300}
                        stroke="rgb(234, 88, 12)"
                        strokeWidth="2"
                        strokeOpacity="0.1"
                        initial={{ pathLength: 0 }}
                        animate={{
                            pathLength: [0, 1, 0],
                            pathOffset: [0, 0.5, 0],
                        }}
                        transition={{
                            duration: 15 + i * 5,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}
