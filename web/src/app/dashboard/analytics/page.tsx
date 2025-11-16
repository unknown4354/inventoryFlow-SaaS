'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    TrendingUp,
    DollarSign,
    Package,
    Calendar,
    BarChart3,
    PieChart,
    Activity,
    Target,
    X,
    Download,
    RefreshCw,
    ChevronLeft,
    ChevronRight,
    FileText,
    Table,
    FileSpreadsheet
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MetricData {
    label: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    icon: React.ElementType;
    previousValue: string;
}

interface ChartData {
    month: string;
    revenue: number;
    projects: number;
}

interface CategoryData {
    category: string;
    revenue: string;
    percent: number;
    color: string;
}

export default function AnalyticsPage() {
    const [dateRange, setDateRange] = useState<'7' | '30' | 'custom'>('30');
    const [showCustomRangeModal, setShowCustomRangeModal] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);
    const [showMetricDetailsModal, setShowMetricDetailsModal] = useState(false);
    const [selectedMetric, setSelectedMetric] = useState<MetricData | null>(null);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showComparisonPeriod, setShowComparisonPeriod] = useState(false);
    const [customStartDate, setCustomStartDate] = useState('');
    const [customEndDate, setCustomEndDate] = useState('');
    const [exportFormat, setExportFormat] = useState<'pdf' | 'excel' | 'csv'>('pdf');
    const [exportSuccess, setExportSuccess] = useState(false);

    const metrics: MetricData[] = [
        { label: 'Total Revenue', value: '₹37.2L', change: '+18%', trend: 'up', icon: DollarSign, previousValue: '₹31.5L' },
        { label: 'Utilization Rate', value: '82%', change: '+5%', trend: 'up', icon: TrendingUp, previousValue: '77%' },
        { label: 'Active Projects', value: '23', change: '+3', trend: 'up', icon: Calendar, previousValue: '20' },
        { label: 'Inventory Value', value: '₹2.4Cr', change: '+12%', trend: 'up', icon: Package, previousValue: '₹2.14Cr' },
    ];

    const chartData: ChartData[] = [
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
    ];

    const categoryData: CategoryData[] = [
        { category: 'AV Equipment', revenue: '₹9.5L', percent: 26, color: 'bg-orange-500' },
        { category: 'Industrial Tools', revenue: '₹8.2L', percent: 22, color: 'bg-blue-500' },
        { category: 'Storage Units', revenue: '₹7.1L', percent: 19, color: 'bg-green-500' },
        { category: 'Electronics', revenue: '₹6.3L', percent: 17, color: 'bg-purple-500' },
        { category: 'Safety Equipment', revenue: '₹3.8L', percent: 10, color: 'bg-yellow-500' },
        { category: 'Others', revenue: '₹2.3L', percent: 6, color: 'bg-gray-500' },
    ];

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
        }, 1500);
    };

    const handleExport = () => {
        setExportSuccess(true);
        setTimeout(() => {
            setExportSuccess(false);
            setShowExportModal(false);
        }, 2000);
    };

    const handleApplyCustomRange = () => {
        if (customStartDate && customEndDate) {
            setDateRange('custom');
            setShowCustomRangeModal(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start justify-between"
            >
                <div>
                    <h1 className="text-3xl font-bold text-black dark:text-white">Analytics Dashboard</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Insights and performance metrics</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className={`border-gray-200 dark:border-gray-700 ${dateRange === '7' ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-500' : ''}`}
                        onClick={() => setDateRange('7')}
                    >
                        Last 7 Days
                    </Button>
                    <Button
                        variant="outline"
                        className={`border-gray-200 dark:border-gray-700 ${dateRange === '30' ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-500' : ''}`}
                        onClick={() => setDateRange('30')}
                    >
                        Last 30 Days
                    </Button>
                    <Button
                        className={`${dateRange === 'custom' ? 'bg-orange-600' : 'bg-orange-500'} hover:bg-orange-600 text-white`}
                        onClick={() => setShowCustomRangeModal(true)}
                    >
                        Custom Range
                    </Button>
                    <Button
                        variant="outline"
                        className="border-gray-200 dark:border-gray-700"
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                    >
                        <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    </Button>
                    <Button
                        variant="outline"
                        className="border-gray-200 dark:border-gray-700"
                        onClick={() => setShowExportModal(true)}
                    >
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                </div>
            </motion.div>

            {/* Comparison Toggle */}
            <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600 dark:text-gray-400">Show comparison with previous period</label>
                <button
                    onClick={() => setShowComparisonPeriod(!showComparisonPeriod)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        showComparisonPeriod ? 'bg-orange-500' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                >
                    <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            showComparisonPeriod ? 'translate-x-6' : 'translate-x-1'
                        }`}
                    />
                </button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {metrics.map((metric, index) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6 cursor-pointer hover:border-orange-500 transition-all"
                        onClick={() => {
                            setSelectedMetric(metric);
                            setShowMetricDetailsModal(true);
                        }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                                <metric.icon className="h-5 w-5 text-orange-500" />
                            </div>
                            <span className={`text-sm font-medium ${
                                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                            }`}>
                                {metric.change}
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-black dark:text-white mb-1">{metric.value}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</p>
                        {showComparisonPeriod && (
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                                Previous: {metric.previousValue}
                            </p>
                        )}
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
                    className="lg:col-span-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-black dark:text-white">Revenue Trend</h3>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-orange-500" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">Revenue</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-500" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">Projects</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-80 flex items-end justify-between gap-2">
                        {chartData.map((data, index) => (
                            <div key={data.month} className="flex-1 flex flex-col items-center gap-2 group">
                                <div className="w-full flex flex-col gap-1 relative">
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-black dark:bg-white text-white dark:text-black text-xs px-2 py-1 rounded">
                                        ₹{data.revenue}L
                                    </div>
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${data.revenue * 2}%` }}
                                        transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
                                        className="w-full bg-orange-500 rounded-t-lg hover:bg-orange-600 transition-colors cursor-pointer"
                                    />
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${data.projects * 2}%` }}
                                        transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
                                        className="w-full bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-colors cursor-pointer"
                                    />
                                </div>
                                <span className="text-xs text-gray-600 dark:text-gray-400">{data.month}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Category Breakdown */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <PieChart className="h-5 w-5 text-orange-500" />
                        <h3 className="font-bold text-black dark:text-white">Revenue by Category</h3>
                    </div>

                    <div className="space-y-4">
                        {categoryData.map((item, index) => (
                            <motion.div
                                key={item.category}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 p-2 rounded-lg transition-colors"
                                onClick={() => {
                                    setSelectedCategory(item);
                                    setShowCategoryModal(true);
                                }}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{item.category}</span>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-black dark:text-white">{item.revenue}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-500">{item.percent}%</p>
                                    </div>
                                </div>
                                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
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
                    className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <BarChart3 className="h-5 w-5 text-orange-500" />
                        <h3 className="font-bold text-black dark:text-white">Equipment Utilization</h3>
                    </div>

                    <div className="space-y-4">
                        {[
                            { equipment: 'Industrial Tools', utilization: 92, available: 280, inUse: 258 },
                            { equipment: 'Storage Units', utilization: 88, available: 320, inUse: 282 },
                            { equipment: 'Electronics', utilization: 85, available: 245, inUse: 208 },
                            { equipment: 'AV Equipment', utilization: 78, available: 150, inUse: 117 },
                            { equipment: 'Safety Equipment', utilization: 72, available: 125, inUse: 90 },
                            { equipment: 'Packaging', utilization: 45, available: 30, inUse: 14 },
                        ].map((item, index) => (
                            <motion.div
                                key={item.equipment}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-black dark:text-white">{item.equipment}</span>
                                    <span className="text-sm font-bold text-black dark:text-white">{item.utilization}%</span>
                                </div>
                                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
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
                                <p className="text-xs text-gray-600 dark:text-gray-400">
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
                    className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <Activity className="h-5 w-5 text-orange-500" />
                        <h3 className="font-bold text-black dark:text-white">Monthly Performance</h3>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Revenue Target</span>
                                <span className="text-sm font-bold text-black dark:text-white">₹37.2L / ₹40L</span>
                            </div>
                            <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '93%' }}
                                    transition={{ delay: 0.6, duration: 0.8 }}
                                    className="h-full bg-orange-500 rounded-full"
                                />
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">93% of monthly target achieved</p>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Project Completion</span>
                                <span className="text-sm font-bold text-black dark:text-white">18 / 20 projects</span>
                            </div>
                            <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '90%' }}
                                    transition={{ delay: 0.7, duration: 0.8 }}
                                    className="h-full bg-green-500 rounded-full"
                                />
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">90% completion rate</p>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Customer Satisfaction</span>
                                <span className="text-sm font-bold text-black dark:text-white">4.8 / 5.0</span>
                            </div>
                            <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '96%' }}
                                    transition={{ delay: 0.8, duration: 0.8 }}
                                    className="h-full bg-blue-500 rounded-full"
                                />
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Based on 142 reviews</p>
                        </div>

                        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Key Achievements</h4>
                            <div className="space-y-2">
                                {[
                                    'Record high utilization rate at 82%',
                                    '23 concurrent active projects',
                                    '18% month-over-month growth',
                                    'Zero equipment failures this month',
                                ].map((achievement, i) => (
                                    <div key={i} className="flex items-start gap-2">
                                        <div className="p-1 rounded-full bg-green-100 dark:bg-green-900/30 mt-0.5">
                                            <Target className="h-3 w-3 text-green-600" />
                                        </div>
                                        <span className="text-sm text-gray-700 dark:text-gray-300">{achievement}</span>
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
                            { name: 'Industrial Power Tools', revenue: '₹2.8L', bookings: 42 },
                            { name: 'Warehouse Racks', revenue: '₹2.5L', bookings: 38 },
                            { name: '4K Projectors', revenue: '₹2.2L', bookings: 35 },
                        ]
                    },
                    {
                        title: 'Top Clients',
                        items: [
                            { name: 'TechCorp India', revenue: '₹8.5L', projects: 6 },
                            { name: 'Finance Group Ltd', revenue: '₹6.2L', projects: 4 },
                            { name: 'LogiPro Solutions', revenue: '₹5.8L', projects: 8 },
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
                        className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6"
                    >
                        <h3 className="font-bold text-black dark:text-white mb-4">{section.title}</h3>
                        <div className="space-y-3">
                            {section.items.map((item, i) => (
                                <div key={i} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                                    <p className="font-medium text-black dark:text-white text-sm">{item.name}</p>
                                    <div className="flex items-center justify-between mt-1">
                                        <span className="text-xs text-gray-600 dark:text-gray-400">
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

            {/* Custom Range Modal */}
            <AnimatePresence>
                {showCustomRangeModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setShowCustomRangeModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white dark:bg-black rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-800"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-black dark:text-white">Custom Date Range</h3>
                                <button
                                    onClick={() => setShowCustomRangeModal(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg"
                                >
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                        Start Date
                                    </label>
                                    <Input
                                        type="date"
                                        value={customStartDate}
                                        onChange={(e) => setCustomStartDate(e.target.value)}
                                        className="border-gray-200 dark:border-gray-700 bg-white dark:bg-black"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                        End Date
                                    </label>
                                    <Input
                                        type="date"
                                        value={customEndDate}
                                        onChange={(e) => setCustomEndDate(e.target.value)}
                                        className="border-gray-200 dark:border-gray-700 bg-white dark:bg-black"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button
                                    onClick={handleApplyCustomRange}
                                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                                    disabled={!customStartDate || !customEndDate}
                                >
                                    Apply Range
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setShowCustomRangeModal(false)}
                                    className="border-gray-200 dark:border-gray-700"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Export Modal */}
            <AnimatePresence>
                {showExportModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setShowExportModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white dark:bg-black rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-800"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-black dark:text-white">Export Dashboard</h3>
                                <button
                                    onClick={() => setShowExportModal(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg"
                                >
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>

                            {exportSuccess ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Download className="h-8 w-8 text-green-600" />
                                    </div>
                                    <p className="text-lg font-medium text-black dark:text-white">Export Started!</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Your file will be downloaded shortly.</p>
                                </div>
                            ) : (
                                <>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                        Choose a format to export your analytics data
                                    </p>

                                    <div className="space-y-3">
                                        {[
                                            { value: 'pdf', label: 'PDF Report', icon: FileText, desc: 'Formatted report with charts' },
                                            { value: 'excel', label: 'Excel Spreadsheet', icon: FileSpreadsheet, desc: 'Full data in spreadsheet format' },
                                            { value: 'csv', label: 'CSV File', icon: Table, desc: 'Raw data for analysis' },
                                        ].map((format) => (
                                            <button
                                                key={format.value}
                                                onClick={() => setExportFormat(format.value as 'pdf' | 'excel' | 'csv')}
                                                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                                                    exportFormat === format.value
                                                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                                                        : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <format.icon className={`h-5 w-5 ${exportFormat === format.value ? 'text-orange-500' : 'text-gray-500'}`} />
                                                    <div>
                                                        <p className="font-medium text-black dark:text-white">{format.label}</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">{format.desc}</p>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    <Button
                                        onClick={handleExport}
                                        className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white"
                                    >
                                        <Download className="h-4 w-4 mr-2" />
                                        Export as {exportFormat.toUpperCase()}
                                    </Button>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Metric Details Modal */}
            <AnimatePresence>
                {showMetricDetailsModal && selectedMetric && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setShowMetricDetailsModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white dark:bg-black rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-800"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-black dark:text-white">{selectedMetric.label}</h3>
                                <button
                                    onClick={() => setShowMetricDetailsModal(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg"
                                >
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-center">
                                    <p className="text-4xl font-bold text-orange-500">{selectedMetric.value}</p>
                                    <p className={`text-sm font-medium mt-2 ${
                                        selectedMetric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        {selectedMetric.change} from previous period
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Previous Period</p>
                                        <p className="text-lg font-bold text-black dark:text-white">{selectedMetric.previousValue}</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Trend</p>
                                        <p className={`text-lg font-bold ${selectedMetric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                            {selectedMetric.trend === 'up' ? '↑ Increasing' : '↓ Decreasing'}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        This metric shows consistent growth over the selected period.
                                        Continue monitoring for sustained performance.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Category Details Modal */}
            <AnimatePresence>
                {showCategoryModal && selectedCategory && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setShowCategoryModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white dark:bg-black rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-800"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-black dark:text-white">{selectedCategory.category}</h3>
                                <button
                                    onClick={() => setShowCategoryModal(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg"
                                >
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 text-center">
                                    <p className="text-3xl font-bold text-black dark:text-white">{selectedCategory.revenue}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{selectedCategory.percent}% of total revenue</p>
                                </div>

                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${selectedCategory.color} rounded-full`}
                                        style={{ width: `${selectedCategory.percent}%` }}
                                    />
                                </div>

                                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                                    <h4 className="text-sm font-medium text-black dark:text-white mb-3">Category Insights</h4>
                                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                        <li>• 15% increase from last month</li>
                                        <li>• 45 active rentals in this category</li>
                                        <li>• Average rental duration: 12 days</li>
                                        <li>• Top performing item: Industrial equipment</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
