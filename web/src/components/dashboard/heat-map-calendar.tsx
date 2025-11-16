'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface DayData {
    date: string;
    count: number;
}

export function HeatMapCalendar() {
    // Generate 12 weeks of data
    const weeks = 12;
    const daysPerWeek = 7;

    const generateData = (): DayData[][] => {
        const data: DayData[][] = [];
        for (let week = 0; week < weeks; week++) {
            const weekData: DayData[] = [];
            for (let day = 0; day < daysPerWeek; day++) {
                weekData.push({
                    date: `Week ${week + 1}, Day ${day + 1}`,
                    count: Math.floor(Math.random() * 20),
                });
            }
            data.push(weekData);
        }
        return data;
    };

    const data = React.useMemo(generateData, []);
    const maxCount = Math.max(...data.flat().map(d => d.count));

    const getColor = (count: number) => {
        if (count === 0) return 'bg-gray-100';
        const intensity = count / maxCount;
        if (intensity < 0.25) return 'bg-gray-200';
        if (intensity < 0.5) return 'bg-gray-400';
        if (intensity < 0.75) return 'bg-gray-600';
        return 'bg-orange-500';
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-bold text-black mb-2">
                Activity Heatmap
            </h3>
            <p className="text-sm text-gray-600 mb-6">
                Inventory movements over the past 12 weeks
            </p>

            <div className="flex gap-1.5 overflow-x-auto">
                {data.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1.5">
                        {week.map((day, dayIndex) => (
                            <motion.div
                                key={`${weekIndex}-${dayIndex}`}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                    delay: (weekIndex * daysPerWeek + dayIndex) * 0.005,
                                    type: 'spring',
                                    stiffness: 300,
                                }}
                                whileHover={{ scale: 1.3, zIndex: 10 }}
                                className={`w-4 h-4 rounded ${getColor(day.count)} cursor-pointer relative group transition-colors`}
                                title={`${day.date}: ${day.count} movements`}
                            >
                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                                    {day.count} movements
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-black rotate-45" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-2 mt-6">
                <span className="text-xs text-gray-500">Less</span>
                <div className="flex gap-1">
                    <div className="w-4 h-4 rounded bg-gray-100 border border-gray-200" />
                    <div className="w-4 h-4 rounded bg-gray-200" />
                    <div className="w-4 h-4 rounded bg-gray-400" />
                    <div className="w-4 h-4 rounded bg-gray-600" />
                    <div className="w-4 h-4 rounded bg-orange-500" />
                </div>
                <span className="text-xs text-gray-500">More</span>
            </div>
        </div>
    );
}
