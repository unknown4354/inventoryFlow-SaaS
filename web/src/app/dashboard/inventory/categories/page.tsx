'use client';

import { motion } from 'framer-motion';
import {
    Zap,
    Building2,
    Camera,
    Sparkles,
    Armchair,
    UtensilsCrossed,
    Plus,
    Edit,
    Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = [
    {
        id: 1,
        name: 'Electrical',
        icon: Zap,
        items: 145,
        totalValue: '₹24.5L',
        utilization: 72,
        color: 'from-yellow-500 to-orange-500',
        description: 'Generators, Lights, Power Distribution'
    },
    {
        id: 2,
        name: 'Structures',
        icon: Building2,
        items: 89,
        totalValue: '₹18.2L',
        utilization: 85,
        color: 'from-blue-500 to-cyan-500',
        description: 'Trusses, Stages, Barricades, Scaffolding'
    },
    {
        id: 3,
        name: 'AV Equipment',
        icon: Camera,
        items: 123,
        totalValue: '₹32.8L',
        utilization: 78,
        color: 'from-purple-500 to-pink-500',
        description: 'Projectors, Screens, Sound Systems, Microphones'
    },
    {
        id: 4,
        name: 'Decor',
        icon: Sparkles,
        items: 234,
        totalValue: '₹15.6L',
        utilization: 92,
        color: 'from-pink-500 to-rose-500',
        description: 'Centerpieces, Backdrops, Floral, Props'
    },
    {
        id: 5,
        name: 'Furniture',
        icon: Armchair,
        items: 178,
        totalValue: '₹28.4L',
        utilization: 88,
        color: 'from-green-500 to-emerald-500',
        description: 'Chairs, Tables, Sofas, Counters'
    },
    {
        id: 6,
        name: 'Catering',
        icon: UtensilsCrossed,
        items: 156,
        totalValue: '₹19.8L',
        utilization: 76,
        color: 'from-orange-500 to-red-500',
        description: 'Warmers, Chafing Dishes, Beverage Dispensers'
    },
];

export default function CategoriesPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-3xl font-bold text-black">Inventory Categories</h1>
                    <p className="text-gray-600 mt-1">Manage vendor-specific inventory types</p>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Category
                </Button>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-xl border border-gray-200 bg-white p-4"
                >
                    <p className="text-sm text-gray-600 mb-1">Total Categories</p>
                    <p className="text-2xl font-bold text-black">6</p>
                    <p className="text-xs text-gray-500 mt-1">Vendor types</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-xl border border-gray-200 bg-white p-4"
                >
                    <p className="text-sm text-gray-600 mb-1">Total Items</p>
                    <p className="text-2xl font-bold text-black">925</p>
                    <p className="text-xs text-gray-500 mt-1">Across all categories</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-xl border border-gray-200 bg-white p-4"
                >
                    <p className="text-sm text-gray-600 mb-1">Total Value</p>
                    <p className="text-2xl font-bold text-black">₹139.3L</p>
                    <p className="text-xs text-gray-500 mt-1">Combined inventory value</p>
                </motion.div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category, index) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="group rounded-xl border-2 border-gray-200 bg-white hover:border-orange-500 transition-all overflow-hidden"
                    >
                        <div className="p-6">
                            {/* Icon and Name */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 rounded-xl bg-gray-100 group-hover:bg-orange-50 transition-colors">
                                    <category.icon className="h-6 w-6 text-gray-700 group-hover:text-orange-500 transition-colors" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-black mb-1">{category.name}</h3>
                            <p className="text-sm text-gray-600 mb-4">{category.description}</p>

                            {/* Stats */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Total Items</span>
                                    <span className="text-sm font-bold text-black">{category.items}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Total Value</span>
                                    <span className="text-sm font-bold text-black">{category.totalValue}</span>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm text-gray-600">Utilization</span>
                                        <span className="text-sm font-bold text-black">{category.utilization}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-gray-600 to-orange-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${category.utilization}%` }}
                                            transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* View Details Button */}
                        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full hover:bg-orange-50 hover:text-orange-600"
                            >
                                View Items →
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
