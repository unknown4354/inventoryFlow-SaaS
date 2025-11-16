'use client';

import { motion } from 'framer-motion';
import {
    TrendingUp,
    DollarSign,
    Package,
    Calendar,
    BarChart3,
    PieChart,
    Activity,
    Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AnalyticsPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start justify-between"
            >
                <div>
                    <h1 className="text-3xl font-bold text-black">Analytics Dashboard</h1>
                    <p className="text-gray-600 mt-1">Insights and performance metrics</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-gray-200">Last 7 Days</Button>
                    <Button variant="outline" className="border-gray-200">Last 30 Days</Button>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">Custom Range</Button>
                </div>
            </motion.div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Revenue', value: '₹37.2L', change: '+18%', trend: 'up', icon: DollarSign },
                    { label: 'Utilization Rate', value: '82%', change: '+5%', trend: 'up', icon: TrendingUp },
                    { label: 'Active Projects', value: '23', change: '+3', trend: 'up', icon: Calendar },
                    { label: 'Inventory Value', value: '₹2.4Cr', change: '+12%', trend: 'up', icon: Package },
                ].map((metric, index) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-xl border border-gray-200 bg-white p-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-lg bg-orange-100">
                                <metric.icon className="h-5 w-5 text-orange-500" />
                            </div>
                            <span className={`text-sm font-medium ${
                                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                            }`}>
                                {metric.change}
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-black mb-1">{metric.value}</p>
                        <p className="text-sm text-gray-600">{metric.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-black">Revenue Trend</h3>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-orange-500" />
                                <span className="text-sm text-gray-600">Revenue</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-500" />
                                <span className="text-sm text-gray-600">Projects</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-80 flex items-end justify-between gap-2">
                        {[
                            { month: 'Jan', revenue: 28, projects: 18 },
                            { month: 'Feb', revenue: 32, projects: 20 },
                            { month: 'Mar', revenue: 30, projects: 19 },
                            { month: 'Apr', revenue: 35, projects: 22 },
                            { month: 'May', revenue: 33, projects: 21 },
                            { month: 'Jun', revenue: 38, projects: 24 },
                            { month: 'Jul', revenue: 36, projects: 23 },
                            { month: 'Aug', revenue: 40, projects: 26 },
                            { month: 'Sep', revenue: 38, projects: 25 },
                            { month: 'Oct', revenue: 42, projects: 27 },
                            { month: 'Nov', revenue: 40, projects: 26 },
                            { month: 'Dec', revenue: 45, projects: 29 },
                        ].map((data, index) => (
                            <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                                <div className="w-full flex flex-col gap-1">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${data.revenue * 2}%` }}
                                        transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
                                        className="w-full bg-orange-500 rounded-t-lg"
                                    />
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${data.projects * 2}%` }}
                                        transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
                                        className="w-full bg-blue-500 rounded-t-lg"
                                    />
                                </div>
                                <span className="text-xs text-gray-600">{data.month}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Category Breakdown */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-xl border border-gray-200 bg-white p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <PieChart className="h-5 w-5 text-orange-500" />
                        <h3 className="font-bold text-black">Revenue by Category</h3>
                    </div>

                    <div className="space-y-4">
                        {[
                            { category: 'AV Equipment', revenue: '₹9.5L', percent: 26, color: 'bg-orange-500' },
                            { category: 'Decor Items', revenue: '₹8.2L', percent: 22, color: 'bg-blue-500' },
                            { category: 'Furniture', revenue: '₹7.1L', percent: 19, color: 'bg-green-500' },
                            { category: 'Lighting', revenue: '₹6.3L', percent: 17, color: 'bg-purple-500' },
                            { category: 'Staging', revenue: '₹3.8L', percent: 10, color: 'bg-yellow-500' },
                            { category: 'Others', revenue: '₹2.3L', percent: 6, color: 'bg-gray-500' },
                        ].map((item, index) => (
                            <motion.div
                                key={item.category}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-700">{item.category}</span>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-black">{item.revenue}</p>
                                        <p className="text-xs text-gray-500">{item.percent}%</p>
                                    </div>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.percent}%` }}
                                        transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                                        className={`h-full ${item.color} rounded-full`}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Utilization Metrics */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="rounded-xl border border-gray-200 bg-white p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <BarChart3 className="h-5 w-5 text-orange-500" />
                        <h3 className="font-bold text-black">Equipment Utilization</h3>
                    </div>

                    <div className="space-y-4">
                        {[
                            { equipment: 'Decor Items', utilization: 92, available: 280, inUse: 258 },
                            { equipment: 'Furniture', utilization: 88, available: 320, inUse: 282 },
                            { equipment: 'Lighting', utilization: 85, available: 245, inUse: 208 },
                            { equipment: 'AV Equipment', utilization: 78, available: 150, inUse: 117 },
                            { equipment: 'Staging', utilization: 72, available: 125, inUse: 90 },
                            { equipment: 'Catering', utilization: 45, available: 30, inUse: 14 },
                        ].map((item, index) => (
                            <motion.div
                                key={item.equipment}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                className="p-4 rounded-lg bg-gray-50 hover:bg-orange-50 transition-colors"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-black">{item.equipment}</span>
                                    <span className="text-sm font-bold text-black">{item.utilization}%</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.utilization}%` }}
                                        transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                                        className={`h-full rounded-full ${
                                            item.utilization > 80 ? 'bg-orange-500' :
                                            item.utilization > 60 ? 'bg-blue-500' :
                                            'bg-green-500'
                                        }`}
                                    />
                                </div>
                                <p className="text-xs text-gray-600">
                                    {item.inUse} in use • {item.available - item.inUse} available
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Monthly Performance */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="rounded-xl border border-gray-200 bg-white p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <Activity className="h-5 w-5 text-orange-500" />
                        <h3 className="font-bold text-black">Monthly Performance</h3>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-600">Revenue Target</span>
                                <span className="text-sm font-bold text-black">₹37.2L / ₹40L</span>
                            </div>
                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '93%' }}
                                    transition={{ delay: 0.6, duration: 0.8 }}
                                    className="h-full bg-orange-500 rounded-full"
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">93% of monthly target achieved</p>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-600">Project Completion</span>
                                <span className="text-sm font-bold text-black">18 / 20 projects</span>
                            </div>
                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '90%' }}
                                    transition={{ delay: 0.7, duration: 0.8 }}
                                    className="h-full bg-green-500 rounded-full"
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">90% completion rate</p>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-600">Customer Satisfaction</span>
                                <span className="text-sm font-bold text-black">4.8 / 5.0</span>
                            </div>
                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '96%' }}
                                    transition={{ delay: 0.8, duration: 0.8 }}
                                    className="h-full bg-blue-500 rounded-full"
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Based on 142 reviews</p>
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                            <h4 className="text-sm font-medium text-gray-700 mb-3">Key Achievements</h4>
                            <div className="space-y-2">
                                {[
                                    'Record high utilization rate at 82%',
                                    '23 concurrent active projects',
                                    '18% month-over-month growth',
                                    'Zero equipment failures this month',
                                ].map((achievement, i) => (
                                    <div key={i} className="flex items-start gap-2">
                                        <div className="p-1 rounded-full bg-green-100 mt-0.5">
                                            <Target className="h-3 w-3 text-green-600" />
                                        </div>
                                        <span className="text-sm text-gray-700">{achievement}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    {
                        title: 'Top Performing Equipment',
                        items: [
                            { name: 'LED Moving Head Lights', revenue: '₹2.8L', bookings: 42 },
                            { name: 'Chiavari Chairs', revenue: '₹2.5L', bookings: 38 },
                            { name: '4K Projectors', revenue: '₹2.2L', bookings: 35 },
                        ]
                    },
                    {
                        title: 'Top Clients',
                        items: [
                            { name: 'TechCorp India', revenue: '₹8.5L', projects: 6 },
                            { name: 'Finance Group Ltd', revenue: '₹6.2L', projects: 4 },
                            { name: 'EventPro Productions', revenue: '₹5.8L', projects: 8 },
                        ]
                    },
                    {
                        title: 'Growth Metrics',
                        items: [
                            { name: 'New Clients', value: '+12', period: 'This month' },
                            { name: 'Repeat Bookings', value: '68%', period: 'Up from 62%' },
                            { name: 'Avg Project Value', value: '₹1.6L', period: '+15%' },
                        ]
                    },
                ].map((section, index) => (
                    <motion.div
                        key={section.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="rounded-xl border border-gray-200 bg-white p-6"
                    >
                        <h3 className="font-bold text-black mb-4">{section.title}</h3>
                        <div className="space-y-3">
                            {section.items.map((item, i) => (
                                <div key={i} className="p-3 rounded-lg bg-gray-50">
                                    <p className="font-medium text-black text-sm">{item.name}</p>
                                    <div className="flex items-center justify-between mt-1">
                                        <span className="text-xs text-gray-600">
                                            {'revenue' in item
                                                ? `${'bookings' in item ? item.bookings : (item as { projects: number }).projects} ${'bookings' in item ? 'bookings' : 'projects'}`
                                                : (item as { period: string }).period}
                                        </span>
                                        <span className="text-sm font-bold text-orange-500">
                                            {'revenue' in item ? item.revenue : (item as { value: string }).value}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
