'use client';

import { motion } from 'framer-motion';
import {
    Wrench,
    Calendar,
    AlertTriangle,
    CheckCircle,
    Clock,
    TrendingUp,
    Search,
    Filter,
    Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function MaintenancePage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start justify-between"
            >
                <div>
                    <h1 className="text-3xl font-bold text-black">Maintenance Tracking</h1>
                    <p className="text-gray-600 mt-1">Schedule and track equipment maintenance</p>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule Maintenance
                </Button>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Due This Week', value: '12', icon: Calendar, color: 'orange', trend: '+2 from last week' },
                    { label: 'Overdue', value: '3', icon: AlertTriangle, color: 'red', trend: 'Needs attention' },
                    { label: 'Completed Today', value: '7', icon: CheckCircle, color: 'green', trend: '82% on time' },
                    { label: 'In Progress', value: '5', icon: Clock, color: 'blue', trend: 'Avg: 2.3 days' },
                ].map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-xl border border-gray-200 bg-white p-6"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className={`p-3 rounded-lg ${
                                stat.color === 'orange' ? 'bg-orange-100' :
                                stat.color === 'red' ? 'bg-red-100' :
                                stat.color === 'green' ? 'bg-green-100' :
                                'bg-blue-100'
                            }`}>
                                <stat.icon className={`h-5 w-5 ${
                                    stat.color === 'orange' ? 'text-orange-500' :
                                    stat.color === 'red' ? 'text-red-500' :
                                    stat.color === 'green' ? 'text-green-500' :
                                    'text-blue-500'
                                }`} />
                            </div>
                            <p className="text-3xl font-bold text-black">{stat.value}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-700">{stat.label}</p>
                        <p className="text-xs text-gray-500 mt-1">{stat.trend}</p>
                    </motion.div>
                ))}
            </div>

            {/* Filters and Search */}
            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search equipment..."
                        className="pl-10 border-gray-200"
                    />
                </div>
                <Button variant="outline" className="border-gray-200 hover:border-orange-500">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                </Button>
            </div>

            {/* Maintenance Schedule */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Overdue & Due Soon */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Overdue */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl border border-red-200 bg-red-50 p-6"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                            <h3 className="font-bold text-black">Overdue Maintenance</h3>
                            <span className="ml-auto text-sm text-red-600 font-medium">3 items</span>
                        </div>
                        <div className="space-y-3">
                            {[
                                { name: 'Generator 5KVA', sku: 'GEN-001', dueDate: '3 days ago', type: 'Annual Service' },
                                { name: 'LED Moving Head Light', sku: 'ELC-001', dueDate: '1 day ago', type: 'Routine Check' },
                                { name: 'Sound System Pro', sku: 'AUD-001', dueDate: '5 days ago', type: 'Calibration' },
                            ].map((item, index) => (
                                <motion.div
                                    key={item.sku}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-4 rounded-lg bg-white border border-red-200"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <p className="font-medium text-black">{item.name}</p>
                                            <p className="text-sm text-gray-600 mt-1">SKU: {item.sku}</p>
                                            <div className="flex items-center gap-4 mt-2">
                                                <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">
                                                    {item.type}
                                                </span>
                                                <span className="text-xs text-red-600 font-medium">
                                                    Due: {item.dueDate}
                                                </span>
                                            </div>
                                        </div>
                                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                                            Schedule Now
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Due This Week */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="rounded-xl border border-gray-200 bg-white p-6"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Calendar className="h-5 w-5 text-orange-500" />
                            <h3 className="font-bold text-black">Due This Week</h3>
                            <span className="ml-auto text-sm text-orange-600 font-medium">12 items</span>
                        </div>
                        <div className="space-y-3">
                            {[
                                { name: 'Projector 4K', sku: 'AV-001', dueDate: 'Tomorrow', type: 'Lens Cleaning', priority: 'High' },
                                { name: 'Truss System', sku: 'STR-001', dueDate: 'In 2 days', type: 'Safety Check', priority: 'High' },
                                { name: 'Fog Machine', sku: 'FX-001', dueDate: 'In 3 days', type: 'Fluid Replacement', priority: 'Medium' },
                                { name: 'Wireless Mic Set', sku: 'AUD-002', dueDate: 'In 4 days', type: 'Battery Check', priority: 'Low' },
                            ].map((item, index) => (
                                <motion.div
                                    key={item.sku}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    className="p-4 rounded-lg border border-gray-200 hover:border-orange-500 transition-colors"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium text-black">{item.name}</p>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                                    item.priority === 'High' ? 'bg-red-100 text-red-700' :
                                                    item.priority === 'Medium' ? 'bg-orange-100 text-orange-700' :
                                                    'bg-gray-100 text-gray-700'
                                                }`}>
                                                    {item.priority}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1">SKU: {item.sku}</p>
                                            <div className="flex items-center gap-4 mt-2">
                                                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                                                    {item.type}
                                                </span>
                                                <span className="text-xs text-gray-600 font-medium">
                                                    Due: {item.dueDate}
                                                </span>
                                            </div>
                                        </div>
                                        <Button size="sm" variant="outline" className="border-gray-200 hover:border-orange-500">
                                            View Details
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Maintenance Calendar & Stats */}
                <div className="space-y-4">
                    {/* Quick Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="rounded-xl border border-gray-200 bg-white p-6"
                    >
                        <h3 className="font-bold text-black mb-4">Maintenance Stats</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-600">On-Time Completion</span>
                                    <span className="text-sm font-bold text-black">82%</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-orange-500 rounded-full" style={{ width: '82%' }} />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-600">Avg Completion Time</span>
                                    <span className="text-sm font-bold text-black">2.3 days</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 rounded-full" style={{ width: '65%' }} />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-600">Monthly Cost</span>
                                    <span className="text-sm font-bold text-black">₹1.2L</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }} />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Maintenance Types */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="rounded-xl border border-gray-200 bg-white p-6"
                    >
                        <h3 className="font-bold text-black mb-4">By Type</h3>
                        <div className="space-y-3">
                            {[
                                { type: 'Routine Check', count: 18, color: 'bg-blue-500' },
                                { type: 'Repairs', count: 7, color: 'bg-red-500' },
                                { type: 'Calibration', count: 5, color: 'bg-orange-500' },
                                { type: 'Cleaning', count: 12, color: 'bg-green-500' },
                            ].map((item, index) => (
                                <div key={item.type} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                                        <span className="text-sm text-gray-700">{item.type}</span>
                                    </div>
                                    <span className="text-sm font-bold text-black">{item.count}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Recent Completions */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="rounded-xl border border-gray-200 bg-white p-6"
                    >
                        <h3 className="font-bold text-black mb-4">Recently Completed</h3>
                        <div className="space-y-3">
                            {[
                                { item: 'LED Lights', type: 'Routine Check', time: '2 hours ago' },
                                { item: 'Generator', type: 'Oil Change', time: '5 hours ago' },
                                { item: 'Speakers', type: 'Calibration', time: '1 day ago' },
                            ].map((completion, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-black">{completion.item}</p>
                                        <p className="text-xs text-gray-600">{completion.type}</p>
                                        <p className="text-xs text-gray-500 mt-1">{completion.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
