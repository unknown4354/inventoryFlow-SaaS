'use client';

import React from 'react';
import { motion } from 'framer-motion';

const data = [
    { day: 'Mon', utilization: 75 },
    { day: 'Tue', utilization: 82 },
    { day: 'Wed', utilization: 65 },
    { day: 'Thu', utilization: 90 },
    { day: 'Fri', utilization: 88 },
    { day: 'Sat', utilization: 95 },
    { day: 'Sun', utilization: 78 },
];

export function UtilizationChart() {
    const maxValue = Math.max(...data.map(d => d.utilization));

    return (
        <div className="rounded-lg border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-black dark:text-white">
                    Inventory Utilization (7 Days)
                </h3>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    Average: 82%
                </span>
            </div>

            <div className="flex items-end justify-between h-64 gap-4">
                {data.map((item, index) => (
                    <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                        {/* Bar */}
                        <div className="relative w-full h-full flex items-end">
                            <motion.div
                                className="w-full rounded-t-lg bg-gradient-to-t from-orange-500 to-orange-600 relative group cursor-pointer"
                                initial={{ height: 0 }}
                                animate={{ height: `${(item.utilization / maxValue) * 100}%` }}
                                transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
                                whileHover={{ scale: 1.05 }}
                            >
                                {/* Tooltip on hover */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {item.utilization}%
                                </div>
                            </motion.div>
                        </div>

                        {/* Label */}
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {item.day}
                        </span>
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-6 border-t-2 border-gray-200 dark:border-gray-800 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Utilization Rate</span>
                </div>
            </div>
        </div>
    );
}
