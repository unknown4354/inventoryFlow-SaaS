'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface DataPoint {
    date: string;
    value: number;
    high: number;
    low: number;
}

const data: DataPoint[] = [
    { date: 'Mon', value: 850000, high: 920000, low: 820000 },
    { date: 'Tue', value: 920000, high: 950000, low: 880000 },
    { date: 'Wed', value: 880000, high: 920000, low: 850000 },
    { date: 'Thu', value: 1050000, high: 1080000, low: 1020000 },
    { date: 'Fri', value: 1120000, high: 1150000, low: 1090000 },
    { date: 'Sat', value: 1280000, high: 1320000, low: 1250000 },
    { date: 'Sun', value: 1350000, high: 1380000, low: 1320000 },
];

export function StockChart() {
    const maxValue = Math.max(...data.map(d => d.high));
    const minValue = Math.min(...data.map(d => d.low));
    const range = maxValue - minValue;

    const getY = (value: number) => {
        return ((maxValue - value) / range) * 100;
    };

    // Create path for the main line
    const linePath = data.map((point, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = getY(point.value);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    // Create path for the area gradient
    const areaPath = `${linePath} L 100 100 L 0 100 Z`;

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 relative overflow-hidden">
            {/* Header */}
            <div className="relative z-10 mb-6">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-black">
                        Weekly Rental Revenue
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                            +18.5%
                        </span>
                    </div>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-black">
                        ₹13.5L
                    </span>
                    <span className="text-sm text-gray-600">
                        This Week
                    </span>
                </div>
            </div>

            {/* Chart */}
            <div className="relative h-64">
                <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="w-full h-full"
                >
                    {/* Gradient definition */}
                    <defs>
                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgb(234, 88, 12)" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="rgb(234, 88, 12)" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Grid lines */}
                    {[0, 25, 50, 75, 100].map((y) => (
                        <line
                            key={y}
                            x1="0"
                            y1={y}
                            x2="100"
                            y2={y}
                            stroke="currentColor"
                            strokeWidth="0.2"
                            className="text-gray-300 dark:text-gray-700"
                        />
                    ))}

                    {/* Area gradient */}
                    <motion.path
                        d={areaPath}
                        fill="url(#chartGradient)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    />

                    {/* Main line */}
                    <motion.path
                        d={linePath}
                        fill="none"
                        stroke="rgb(234, 88, 12)"
                        strokeWidth="0.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: 'easeInOut' }}
                    />

                    {/* Candlesticks */}
                    {data.map((point, i) => {
                        const x = (i / (data.length - 1)) * 100;
                        const yHigh = getY(point.high);
                        const yLow = getY(point.low);
                        const yValue = getY(point.value);
                        const isUp = i === 0 || point.value >= data[i - 1].value;

                        return (
                            <g key={i}>
                                {/* High-Low line */}
                                <motion.line
                                    x1={x}
                                    y1={yHigh}
                                    x2={x}
                                    y2={yLow}
                                    stroke={isUp ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'}
                                    strokeWidth="0.3"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.6 }}
                                    transition={{ delay: i * 0.1 }}
                                />

                                {/* Data point */}
                                <motion.circle
                                    cx={x}
                                    cy={yValue}
                                    r="1"
                                    fill={isUp ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.1 + 0.5 }}
                                    className="cursor-pointer"
                                    whileHover={{ scale: 1.5 }}
                                />
                            </g>
                        );
                    })}
                </svg>

                {/* Hover tooltips */}
                <div className="absolute inset-0 flex">
                    {data.map((point, i) => (
                        <div
                            key={i}
                            className="flex-1 group/point relative"
                        >
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0 group-hover/point:opacity-100 transition-opacity pointer-events-none">
                                <div className="bg-black dark:bg-white text-white dark:text-black px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap mb-2 shadow-lg">
                                    <div className="font-bold">₹{(point.value / 100000).toFixed(1)}L</div>
                                    <div className="text-gray-300 dark:text-gray-700">H: ₹{(point.high / 100000).toFixed(1)}L</div>
                                    <div className="text-gray-300 dark:text-gray-700">L: ₹{(point.low / 100000).toFixed(1)}L</div>
                                </div>
                                <div className="w-2 h-2 bg-black dark:bg-white rotate-45 mx-auto -mt-1" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Labels */}
            <div className="flex justify-between mt-4 text-xs text-gray-600 dark:text-gray-400 font-medium">
                {data.map((point) => (
                    <span key={point.date}>{point.date}</span>
                ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t-2 border-gray-200">
                <div>
                    <p className="text-xs text-gray-600 mb-1">Peak Day</p>
                    <p className="text-lg font-bold text-green-600">
                        ₹{(maxValue / 100000).toFixed(1)}L
                    </p>
                </div>
                <div>
                    <p className="text-xs text-gray-600 mb-1">Lowest Day</p>
                    <p className="text-lg font-bold text-gray-600">
                        ₹{(minValue / 100000).toFixed(1)}L
                    </p>
                </div>
                <div>
                    <p className="text-xs text-gray-600 mb-1">Weekly Growth</p>
                    <p className="text-lg font-bold text-orange-600">
                        +₹{((data[data.length - 1].value - data[0].value) / 100000).toFixed(1)}L
                    </p>
                </div>
            </div>
        </div>
    );
}
