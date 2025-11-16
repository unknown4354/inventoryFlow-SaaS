'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function FloatingPaths({ position }: { position: number }) {
    // Generate box-shaped paths with varying sizes
    const paths = React.useMemo(() => {
        const boxes = [];
        const numBoxes = 8;

        for (let i = 0; i < numBoxes; i++) {
            const scale = 1 + (i * 0.2);
            const offset = i * 20 * position;
            const centerX = 348 + offset;
            const centerY = 158;

            // Calculate box dimensions
            const width = 80 * scale;
            const height = 60 * scale;
            const x = centerX - width / 2;
            const y = centerY - height / 2;

            // Create rectangular path
            boxes.push({
                id: `box-${i}`,
                d: `M ${x} ${y} L ${x + width} ${y} L ${x + width} ${y + height} L ${x} ${y + height} Z`,
                width: 1.2 + i * 0.1,
                opacity: 0.12 + i * 0.04,
                duration: 20 + i * 4,
            });
        }

        return boxes;
    }, [position]);

    return (
        <div className="pointer-events-none absolute inset-0 opacity-40">
            <svg
                className="h-full w-full text-black dark:text-white"
                viewBox="0 0 696 316"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
            >
                <title>Background Box Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={path.opacity}
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{
                            pathLength: [0, 1, 0],
                            pathOffset: [0, 0.3, 0],
                        }}
                        transition={{
                            duration: path.duration,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            repeatType: 'loop',
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}
