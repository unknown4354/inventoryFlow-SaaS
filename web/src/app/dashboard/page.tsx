'use client';

import { motion } from 'framer-motion';
import {
    Package,
    TrendingUp,
    Calendar,
    DollarSign,
    Users,
    Warehouse,
    AlertCircle,
    CheckCircle,
    Zap,
    ShoppingCart
} from 'lucide-react';
import { StockChart } from '@/components/dashboard/stock-chart';
import { GlassMetricCard } from '@/components/dashboard/glass-metric-card';
import { CircularProgress } from '@/components/dashboard/circular-progress';
import { HeatMapCalendar } from '@/components/dashboard/heat-map-calendar';
import { Rotating3DCard } from '@/components/dashboard/rotating-3d-card';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { VendorBreakdown } from '@/components/dashboard/vendor-breakdown';
import { RecentActivity } from '@/components/dashboard/recent-activity';

export default function DashboardPage() {
    const glassMetrics = [
        {
            title: 'Total Inventory Value',
            value: '₹37.2L',
            subtitle: '1,150 items across 6 categories',
            icon: Package,
            chart: [30, 32, 31, 34, 35, 36, 37, 37, 37.2]
        },
        {
            title: 'Utilization Rate',
            value: '82%',
            subtitle: '925 items currently in use',
            icon: TrendingUp,
            chart: [65, 70, 75, 78, 80, 81, 81, 82, 82]
        },
        {
            title: 'Monthly Rental Revenue',
            value: '₹37.2L',
            subtitle: '+18% from last month',
            icon: DollarSign,
            chart: [25, 28, 30, 32, 33, 35, 36, 37, 37.2]
        },
        {
            title: 'Active Projects',
            value: '23',
            subtitle: '12 upcoming this week',
            icon: Calendar,
            chart: [18, 19, 20, 21, 22, 22, 23, 23, 23]
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-8"
            >
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold text-black mb-2">
                        Inventory Overview
                    </h1>
                    <p className="text-gray-600">
                        {new Date().toLocaleDateString('en-IN', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </p>
                </div>

                {/* Subtle orange accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
            </motion.div>

            {/* Glass Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {glassMetrics.map((metric, index) => (
                    <GlassMetricCard key={metric.title} {...metric} index={index} />
                ))}
            </div>

            {/* Stock Chart & Circular Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Stock Chart - takes 2 columns */}
                <div className="lg:col-span-2">
                    <StockChart />
                </div>

                {/* Circular Progress */}
                <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 flex items-center justify-center">
                    <CircularProgress
                        value={925}
                        max={1150}
                        label="In Use"
                        sublabel="Utilization Rate: 82%"
                        color="rgb(234, 88, 12)"
                        size={220}
                    />
                </div>
            </div>

            {/* 3D Rotating Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Rotating3DCard
                    title="Highest Utilization"
                    value="Decor Items"
                    icon={Zap}
                    stats={[
                        { label: 'Utilization Rate', value: '92%' },
                        { label: 'Monthly Revenue', value: '₹8.2L' },
                        { label: 'Items in Use', value: '234/280' },
                    ]}
                />
                <Rotating3DCard
                    title="Best ROI"
                    value="Furniture"
                    icon={TrendingUp}
                    stats={[
                        { label: 'Return on Investment', value: '285%' },
                        { label: 'Monthly Revenue', value: '₹7.1L' },
                        { label: 'Utilization', value: '88%' },
                    ]}
                />
                <Rotating3DCard
                    title="Highest Revenue"
                    value="AV Equipment"
                    icon={ShoppingCart}
                    stats={[
                        { label: 'Monthly Revenue', value: '₹9.5L' },
                        { label: 'Utilization', value: '78%' },
                        { label: 'Avg Revenue/Item', value: '₹6,333' },
                    ]}
                />
            </div>

            {/* Heatmap & Vendor Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <HeatMapCalendar />
                <VendorBreakdown />
            </div>

            {/* Quick Actions */}
            <QuickActions />

            {/* Recent Activity and Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RecentActivity />
                </div>

                {/* Alerts Panel */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="rounded-2xl border border-gray-200 bg-white p-6"
                >
                    <h3 className="text-lg font-bold text-black mb-6">
                        Alerts & Notifications
                    </h3>

                    <div className="space-y-3">
                        <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                            <div className="flex items-start gap-3">
                                <div className="p-1.5 rounded-lg bg-red-100">
                                    <AlertCircle className="h-4 w-4 text-red-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-black text-sm">
                                        Low Stock Alert
                                    </p>
                                    <p className="text-xs text-gray-600 mt-1">
                                        8 items below minimum stock level
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        LED Lights (3), Chairs (2), Generators (1), Speakers (2)
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                            <div className="flex items-start gap-3">
                                <div className="p-1.5 rounded-lg bg-orange-100">
                                    <AlertCircle className="h-4 w-4 text-orange-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-black text-sm">
                                        Maintenance Due
                                    </p>
                                    <p className="text-xs text-gray-600 mt-1">
                                        12 items require maintenance this week
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Generators (4), Projectors (3), Sound Systems (5)
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                            <div className="flex items-start gap-3">
                                <div className="p-1.5 rounded-lg bg-blue-100">
                                    <AlertCircle className="h-4 w-4 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-black text-sm">
                                        Items Due for Return
                                    </p>
                                    <p className="text-xs text-gray-600 mt-1">
                                        18 items expected back this week
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        From 5 active projects
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                            <div className="flex items-start gap-3">
                                <div className="p-1.5 rounded-lg bg-green-100">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-black text-sm">
                                        Equipment Ready
                                    </p>
                                    <p className="text-xs text-gray-600 mt-1">
                                        All equipment for 3 upcoming projects is checked and ready
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="w-full mt-4 py-2 text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors">
                        View all alerts →
                    </button>
                </motion.div>
            </div>

            {/* Upcoming Projects Timeline */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="rounded-2xl border border-gray-200 bg-white p-6"
            >
                <h3 className="text-lg font-bold text-black mb-6">
                    Upcoming Projects
                </h3>

                <div className="space-y-4">
                    {[
                        { name: 'Corporate Event - Tech Summit', date: 'Tomorrow', items: 45, status: 'Ready' },
                        { name: 'Client A - Conference', date: 'Dec 20', items: 32, status: 'In Progress' },
                        { name: 'Client B - Exhibition', date: 'Dec 22', items: 28, status: 'Planning' },
                    ].map((event, index) => (
                        <motion.div
                            key={event.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-orange-50 transition-colors cursor-pointer group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-lg bg-gray-100 group-hover:bg-orange-100 transition-colors">
                                    <Calendar className="h-5 w-5 text-gray-700 group-hover:text-orange-500 transition-colors" />
                                </div>
                                <div>
                                    <p className="font-semibold text-black">
                                        {event.name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {event.items} items assigned
                                    </p>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="text-sm font-medium text-black mb-1">
                                    {event.date}
                                </p>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                    event.status === 'Ready'
                                        ? 'bg-green-100 text-green-700'
                                        : event.status === 'In Progress'
                                        ? 'bg-orange-100 text-orange-700'
                                        : 'bg-gray-100 text-gray-700'
                                }`}>
                                    {event.status}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
