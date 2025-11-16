'use client';

import { motion } from 'framer-motion';
import {
    FileText,
    Download,
    Calendar,
    TrendingUp,
    Package,
    DollarSign,
    Users,
    Filter,
    Clock,
    CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start justify-between"
            >
                <div>
                    <h1 className="text-3xl font-bold text-black">Reports</h1>
                    <p className="text-gray-600 mt-1">Generate and download business reports</p>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Custom Report
                </Button>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Reports Generated', value: '142', icon: FileText, color: 'orange' },
                    { label: 'This Month', value: '18', icon: Calendar, color: 'blue' },
                    { label: 'Scheduled', value: '5', icon: Clock, color: 'green' },
                    { label: 'Auto Reports', value: '12', icon: CheckCircle, color: 'purple' },
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
                                stat.color === 'blue' ? 'bg-blue-100' :
                                stat.color === 'green' ? 'bg-green-100' :
                                'bg-purple-100'
                            }`}>
                                <stat.icon className={`h-5 w-5 ${
                                    stat.color === 'orange' ? 'text-orange-500' :
                                    stat.color === 'blue' ? 'text-blue-500' :
                                    stat.color === 'green' ? 'text-green-500' :
                                    'text-purple-500'
                                }`} />
                            </div>
                            <p className="text-3xl font-bold text-black">{stat.value}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-700">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Report Templates */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Financial Reports */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-xl border border-gray-200 bg-white p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <DollarSign className="h-5 w-5 text-orange-500" />
                        <h3 className="font-bold text-black">Financial Reports</h3>
                    </div>

                    <div className="space-y-3">
                        {[
                            { name: 'Revenue Summary', period: 'Monthly', lastGen: '2 days ago' },
                            { name: 'Profit & Loss Statement', period: 'Quarterly', lastGen: '1 week ago' },
                            { name: 'Cash Flow Analysis', period: 'Monthly', lastGen: '3 days ago' },
                            { name: 'Invoice Summary', period: 'Weekly', lastGen: 'Today' },
                            { name: 'Payment Collection', period: 'Monthly', lastGen: '5 days ago' },
                        ].map((report, index) => (
                            <motion.div
                                key={report.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className="p-4 rounded-lg border border-gray-200 hover:border-orange-500 transition-all cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-medium text-black group-hover:text-orange-500 transition-colors">
                                        {report.name}
                                    </h4>
                                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                                        {report.period}
                                    </span>
                                    <span className="text-gray-500">Last: {report.lastGen}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Inventory Reports */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-xl border border-gray-200 bg-white p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <Package className="h-5 w-5 text-blue-500" />
                        <h3 className="font-bold text-black">Inventory Reports</h3>
                    </div>

                    <div className="space-y-3">
                        {[
                            { name: 'Stock Levels', period: 'Daily', lastGen: 'Today' },
                            { name: 'Utilization Analytics', period: 'Weekly', lastGen: '1 day ago' },
                            { name: 'Equipment Valuation', period: 'Monthly', lastGen: '4 days ago' },
                            { name: 'Maintenance Schedule', period: 'Monthly', lastGen: '1 week ago' },
                            { name: 'Asset Depreciation', period: 'Quarterly', lastGen: '2 weeks ago' },
                        ].map((report, index) => (
                            <motion.div
                                key={report.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                                className="p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-all cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-medium text-black group-hover:text-blue-500 transition-colors">
                                        {report.name}
                                    </h4>
                                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                                        {report.period}
                                    </span>
                                    <span className="text-gray-500">Last: {report.lastGen}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Operations Reports */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="rounded-xl border border-gray-200 bg-white p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <TrendingUp className="h-5 w-5 text-green-500" />
                        <h3 className="font-bold text-black">Operations Reports</h3>
                    </div>

                    <div className="space-y-3">
                        {[
                            { name: 'Project Performance', period: 'Monthly', lastGen: '3 days ago' },
                            { name: 'Client Activity', period: 'Monthly', lastGen: '5 days ago' },
                            { name: 'Warehouse Operations', period: 'Weekly', lastGen: '2 days ago' },
                            { name: 'Staff Productivity', period: 'Monthly', lastGen: '1 week ago' },
                            { name: 'Service Quality Metrics', period: 'Monthly', lastGen: '6 days ago' },
                        ].map((report, index) => (
                            <motion.div
                                key={report.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                className="p-4 rounded-lg border border-gray-200 hover:border-green-500 transition-all cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-medium text-black group-hover:text-green-500 transition-colors">
                                        {report.name}
                                    </h4>
                                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                                        {report.period}
                                    </span>
                                    <span className="text-gray-500">Last: {report.lastGen}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Generate Custom Report */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="rounded-xl border-2 border-orange-500 bg-white p-6"
            >
                <h3 className="font-bold text-black mb-6">Generate Custom Report</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Report Type
                            </label>
                            <select className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-orange-500 focus:outline-none">
                                <option>Financial Summary</option>
                                <option>Inventory Analysis</option>
                                <option>Project Performance</option>
                                <option>Client Report</option>
                                <option>Custom Analytics</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Date Range
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <Input type="date" className="border-gray-200" />
                                <Input type="date" className="border-gray-200" />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Format
                            </label>
                            <div className="flex gap-2">
                                {['PDF', 'Excel', 'CSV'].map((format) => (
                                    <button
                                        key={format}
                                        className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all font-medium text-sm"
                                    >
                                        {format}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Include Data
                            </label>
                            <div className="space-y-2">
                                {[
                                    'Revenue & Financials',
                                    'Inventory Metrics',
                                    'Project Details',
                                    'Client Information',
                                    'Staff Performance',
                                    'Warehouse Data',
                                ].map((option) => (
                                    <label key={option} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                                        <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                                        <span className="text-sm text-gray-700">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                    <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Report
                    </Button>
                    <Button variant="outline" className="border-gray-200">
                        <Clock className="h-4 w-4 mr-2" />
                        Schedule
                    </Button>
                </div>
            </motion.div>

            {/* Recent Reports */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="rounded-xl border border-gray-200 bg-white p-6"
            >
                <h3 className="font-bold text-black mb-6">Recent Reports</h3>

                <div className="space-y-3">
                    {[
                        {
                            name: 'Monthly Revenue Summary - December 2024',
                            type: 'Financial',
                            generated: '2 days ago',
                            size: '2.4 MB',
                            format: 'PDF',
                            status: 'Ready'
                        },
                        {
                            name: 'Inventory Utilization Report - Q4 2024',
                            type: 'Inventory',
                            generated: '3 days ago',
                            size: '1.8 MB',
                            format: 'Excel',
                            status: 'Ready'
                        },
                        {
                            name: 'Project Performance Analysis - November 2024',
                            type: 'Operations',
                            generated: '5 days ago',
                            size: '3.1 MB',
                            format: 'PDF',
                            status: 'Ready'
                        },
                        {
                            name: 'Client Activity Report - November 2024',
                            type: 'Operations',
                            generated: '1 week ago',
                            size: '1.2 MB',
                            format: 'Excel',
                            status: 'Ready'
                        },
                    ].map((report, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                            className="p-4 rounded-lg border border-gray-200 hover:border-orange-500 transition-all group"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3 flex-1">
                                    <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-orange-100 transition-colors">
                                        <FileText className="h-5 w-5 text-gray-700 group-hover:text-orange-500 transition-colors" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-black group-hover:text-orange-500 transition-colors">
                                            {report.name}
                                        </h4>
                                        <div className="flex items-center gap-3 mt-2">
                                            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                                                {report.type}
                                            </span>
                                            <span className="text-xs text-gray-500">{report.format}</span>
                                            <span className="text-xs text-gray-500">{report.size}</span>
                                            <span className="text-xs text-gray-500">{report.generated}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                                        {report.status}
                                    </span>
                                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Scheduled Reports */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="rounded-xl border border-gray-200 bg-white p-6"
            >
                <h3 className="font-bold text-black mb-6">Scheduled Reports</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { name: 'Daily Stock Levels', frequency: 'Daily at 9:00 AM', recipients: '3 recipients' },
                        { name: 'Weekly Revenue Summary', frequency: 'Every Monday at 8:00 AM', recipients: '5 recipients' },
                        { name: 'Monthly Financial Report', frequency: '1st of every month', recipients: '8 recipients' },
                        { name: 'Quarterly Performance Review', frequency: 'Every 3 months', recipients: '4 recipients' },
                    ].map((scheduled, index) => (
                        <div
                            key={index}
                            className="p-4 rounded-lg border border-gray-200 bg-gray-50"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium text-black">{scheduled.name}</h4>
                                <Clock className="h-4 w-4 text-orange-500" />
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{scheduled.frequency}</p>
                            <p className="text-xs text-gray-500">{scheduled.recipients}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
