'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    CheckCircle,
    X,
    Plus,
    Trash2,
    Eye,
    Mail,
    Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Report {
    name: string;
    type: string;
    generated: string;
    size: string;
    format: string;
    status: string;
}

interface ScheduledReport {
    id: string;
    name: string;
    frequency: string;
    recipients: string[];
    nextRun: string;
    enabled: boolean;
}

export default function ReportsPage() {
    const [showGenerateModal, setShowGenerateModal] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationProgress, setGenerationProgress] = useState(0);
    const [generationComplete, setGenerationComplete] = useState(false);

    const [reportType, setReportType] = useState('Financial Summary');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedFormat, setSelectedFormat] = useState<'PDF' | 'Excel' | 'CSV'>('PDF');
    const [includeData, setIncludeData] = useState<string[]>([
        'Revenue & Financials',
        'Inventory Metrics',
        'Project Details',
        'Client Information',
        'Staff Performance',
        'Warehouse Data',
    ]);

    const [scheduleName, setScheduleName] = useState('');
    const [scheduleFrequency, setScheduleFrequency] = useState('Weekly');
    const [scheduleTime, setScheduleTime] = useState('09:00');
    const [scheduleRecipients, setScheduleRecipients] = useState<string[]>(['']);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [scheduledReports, setScheduledReports] = useState<ScheduledReport[]>([
        { id: '1', name: 'Daily Stock Levels', frequency: 'Daily at 9:00 AM', recipients: ['admin@company.com', 'warehouse@company.com', 'ops@company.com'], nextRun: 'Tomorrow 9:00 AM', enabled: true },
        { id: '2', name: 'Weekly Revenue Summary', frequency: 'Every Monday at 8:00 AM', recipients: ['cfo@company.com', 'finance@company.com', 'admin@company.com', 'ops@company.com', 'sales@company.com'], nextRun: 'Mon, Nov 18 8:00 AM', enabled: true },
        { id: '3', name: 'Monthly Financial Report', frequency: '1st of every month', recipients: ['ceo@company.com', 'cfo@company.com', 'admin@company.com', 'finance@company.com', 'board@company.com', 'investors@company.com', 'audit@company.com', 'compliance@company.com'], nextRun: 'Dec 1, 2024 8:00 AM', enabled: true },
        { id: '4', name: 'Quarterly Performance Review', frequency: 'Every 3 months', recipients: ['ceo@company.com', 'cfo@company.com', 'admin@company.com', 'board@company.com'], nextRun: 'Jan 1, 2025 8:00 AM', enabled: false },
    ]);

    const [recentReports, setRecentReports] = useState<Report[]>([
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
    ]);

    const handleGenerateReport = () => {
        setIsGenerating(true);
        setGenerationProgress(0);

        const interval = setInterval(() => {
            setGenerationProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setGenerationComplete(true);

                    // Add to recent reports
                    const newReport: Report = {
                        name: `${reportType} - ${new Date().toLocaleDateString()}`,
                        type: reportType.includes('Financial') ? 'Financial' : reportType.includes('Inventory') ? 'Inventory' : 'Operations',
                        generated: 'Just now',
                        size: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
                        format: selectedFormat,
                        status: 'Ready'
                    };
                    setRecentReports([newReport, ...recentReports]);

                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    const handleDownload = (report: Report) => {
        setShowDownloadSuccess(true);
        setTimeout(() => setShowDownloadSuccess(false), 2000);
    };

    const handleToggleDataInclude = (dataType: string) => {
        if (includeData.includes(dataType)) {
            setIncludeData(includeData.filter(d => d !== dataType));
        } else {
            setIncludeData([...includeData, dataType]);
        }
    };

    const handleAddRecipient = () => {
        setScheduleRecipients([...scheduleRecipients, '']);
    };

    const handleRemoveRecipient = (index: number) => {
        setScheduleRecipients(scheduleRecipients.filter((_, i) => i !== index));
    };

    const handleRecipientChange = (index: number, value: string) => {
        const updated = [...scheduleRecipients];
        updated[index] = value;
        setScheduleRecipients(updated);
    };

    const validateSchedule = () => {
        const newErrors: Record<string, string> = {};
        if (!scheduleName.trim()) newErrors.name = 'Report name is required';
        const validRecipients = scheduleRecipients.filter(r => r.trim());
        if (validRecipients.length === 0) newErrors.recipients = 'At least one recipient is required';
        validRecipients.forEach((email, i) => {
            if (email && !/\S+@\S+\.\S+/.test(email)) {
                newErrors[`recipient_${i}`] = 'Invalid email';
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateSchedule = () => {
        if (!validateSchedule()) return;

        const newSchedule: ScheduledReport = {
            id: Date.now().toString(),
            name: scheduleName,
            frequency: `${scheduleFrequency} at ${scheduleTime}`,
            recipients: scheduleRecipients.filter(r => r.trim()),
            nextRun: 'Next scheduled run',
            enabled: true
        };

        setScheduledReports([...scheduledReports, newSchedule]);
        setShowScheduleModal(false);
        setScheduleName('');
        setScheduleRecipients(['']);
    };

    const handleDeleteSchedule = (id: string) => {
        setScheduledReports(scheduledReports.filter(r => r.id !== id));
    };

    const handleToggleSchedule = (id: string) => {
        setScheduledReports(scheduledReports.map(r =>
            r.id === id ? { ...r, enabled: !r.enabled } : r
        ));
    };

    const resetGenerateModal = () => {
        setShowGenerateModal(false);
        setIsGenerating(false);
        setGenerationProgress(0);
        setGenerationComplete(false);
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
                    <h1 className="text-3xl font-bold text-black dark:text-white">Reports</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Generate and download business reports</p>
                </div>
                <Button
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => setShowGenerateModal(true)}
                >
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Custom Report
                </Button>
            </motion.div>

            {/* Download Success Toast */}
            <AnimatePresence>
                {showDownloadSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2"
                    >
                        <CheckCircle className="h-5 w-5" />
                        Download started successfully!
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Reports Generated', value: recentReports.length + 138, icon: FileText, color: 'orange' },
                    { label: 'This Month', value: '18', icon: Calendar, color: 'blue' },
                    { label: 'Scheduled', value: scheduledReports.filter(r => r.enabled).length.toString(), icon: Clock, color: 'green' },
                    { label: 'Auto Reports', value: '12', icon: CheckCircle, color: 'purple' },
                ].map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className={`p-3 rounded-lg ${
                                stat.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30' :
                                stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                                stat.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                                'bg-purple-100 dark:bg-purple-900/30'
                            }`}>
                                <stat.icon className={`h-5 w-5 ${
                                    stat.color === 'orange' ? 'text-orange-500' :
                                    stat.color === 'blue' ? 'text-blue-500' :
                                    stat.color === 'green' ? 'text-green-500' :
                                    'text-purple-500'
                                }`} />
                            </div>
                            <p className="text-3xl font-bold text-black dark:text-white">{stat.value}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{stat.label}</p>
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
                    className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <DollarSign className="h-5 w-5 text-orange-500" />
                        <h3 className="font-bold text-black dark:text-white">Financial Reports</h3>
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
                                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 transition-all cursor-pointer group"
                                onClick={() => {
                                    setReportType(report.name);
                                    setShowGenerateModal(true);
                                }}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-medium text-black dark:text-white group-hover:text-orange-500 transition-colors">
                                        {report.name}
                                    </h4>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-6 w-6 p-0"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDownload({
                                                name: report.name,
                                                type: 'Financial',
                                                generated: report.lastGen,
                                                size: '1.2 MB',
                                                format: 'PDF',
                                                status: 'Ready'
                                            });
                                        }}
                                    >
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                        {report.period}
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-400">Last: {report.lastGen}</span>
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
                    className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <Package className="h-5 w-5 text-blue-500" />
                        <h3 className="font-bold text-black dark:text-white">Inventory Reports</h3>
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
                                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all cursor-pointer group"
                                onClick={() => {
                                    setReportType(report.name);
                                    setShowGenerateModal(true);
                                }}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-medium text-black dark:text-white group-hover:text-blue-500 transition-colors">
                                        {report.name}
                                    </h4>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-6 w-6 p-0"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDownload({
                                                name: report.name,
                                                type: 'Inventory',
                                                generated: report.lastGen,
                                                size: '1.5 MB',
                                                format: 'Excel',
                                                status: 'Ready'
                                            });
                                        }}
                                    >
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                        {report.period}
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-400">Last: {report.lastGen}</span>
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
                    className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <TrendingUp className="h-5 w-5 text-green-500" />
                        <h3 className="font-bold text-black dark:text-white">Operations Reports</h3>
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
                                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 transition-all cursor-pointer group"
                                onClick={() => {
                                    setReportType(report.name);
                                    setShowGenerateModal(true);
                                }}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-medium text-black dark:text-white group-hover:text-green-500 transition-colors">
                                        {report.name}
                                    </h4>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-6 w-6 p-0"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDownload({
                                                name: report.name,
                                                type: 'Operations',
                                                generated: report.lastGen,
                                                size: '2.1 MB',
                                                format: 'PDF',
                                                status: 'Ready'
                                            });
                                        }}
                                    >
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                        {report.period}
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-400">Last: {report.lastGen}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Recent Reports */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6"
            >
                <h3 className="font-bold text-black dark:text-white mb-6">Recent Reports</h3>

                <div className="space-y-3">
                    {recentReports.map((report, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                            className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 transition-all group"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3 flex-1">
                                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/30 transition-colors">
                                        <FileText className="h-5 w-5 text-gray-700 dark:text-gray-300 group-hover:text-orange-500 transition-colors" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-black dark:text-white group-hover:text-orange-500 transition-colors">
                                            {report.name}
                                        </h4>
                                        <div className="flex items-center gap-3 mt-2">
                                            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                                {report.type}
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">{report.format}</span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">{report.size}</span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">{report.generated}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                                        {report.status}
                                    </span>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0"
                                        onClick={() => {
                                            setSelectedReport(report);
                                            setShowPreviewModal(true);
                                        }}
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="bg-orange-500 hover:bg-orange-600 text-white"
                                        onClick={() => handleDownload(report)}
                                    >
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
                className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6"
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-black dark:text-white">Scheduled Reports</h3>
                    <Button
                        variant="outline"
                        className="border-gray-200 dark:border-gray-700"
                        onClick={() => setShowScheduleModal(true)}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Schedule
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {scheduledReports.map((scheduled) => (
                        <div
                            key={scheduled.id}
                            className={`p-4 rounded-lg border ${
                                scheduled.enabled
                                    ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900'
                                    : 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 opacity-60'
                            }`}
                        >
                            <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium text-black dark:text-white">{scheduled.name}</h4>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleToggleSchedule(scheduled.id)}
                                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                                            scheduled.enabled ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                                                scheduled.enabled ? 'translate-x-5' : 'translate-x-1'
                                            }`}
                                        />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteSchedule(scheduled.id)}
                                        className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                                    >
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mb-1">
                                <Clock className="h-4 w-4 text-orange-500" />
                                <p className="text-sm text-gray-600 dark:text-gray-400">{scheduled.frequency}</p>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <Mail className="h-4 w-4 text-gray-500" />
                                <p className="text-xs text-gray-500 dark:text-gray-400">{scheduled.recipients.length} recipients</p>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Next: {scheduled.nextRun}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Generate Report Modal */}
            <AnimatePresence>
                {showGenerateModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={resetGenerateModal}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white dark:bg-black rounded-xl p-6 w-full max-w-2xl border border-gray-200 dark:border-gray-800 max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-black dark:text-white">Generate Custom Report</h3>
                                <button
                                    onClick={resetGenerateModal}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg"
                                >
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>

                            {generationComplete ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="h-10 w-10 text-green-600" />
                                    </div>
                                    <h4 className="text-xl font-bold text-black dark:text-white mb-2">Report Generated!</h4>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6">Your report is ready for download.</p>
                                    <div className="flex gap-3 justify-center">
                                        <Button
                                            className="bg-orange-500 hover:bg-orange-600 text-white"
                                            onClick={() => {
                                                handleDownload(recentReports[0]);
                                                resetGenerateModal();
                                            }}
                                        >
                                            <Download className="h-4 w-4 mr-2" />
                                            Download Now
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={resetGenerateModal}
                                            className="border-gray-200 dark:border-gray-700"
                                        >
                                            Close
                                        </Button>
                                    </div>
                                </div>
                            ) : isGenerating ? (
                                <div className="py-12">
                                    <div className="text-center mb-6">
                                        <h4 className="text-lg font-medium text-black dark:text-white mb-2">Generating Report...</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Please wait while we compile your data</p>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                                        <motion.div
                                            className="bg-orange-500 h-3 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${generationProgress}%` }}
                                        />
                                    </div>
                                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">{generationProgress}% complete</p>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                                    Report Type
                                                </label>
                                                <select
                                                    value={reportType}
                                                    onChange={(e) => setReportType(e.target.value)}
                                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white focus:border-orange-500 focus:outline-none"
                                                >
                                                    <option>Financial Summary</option>
                                                    <option>Inventory Analysis</option>
                                                    <option>Project Performance</option>
                                                    <option>Client Report</option>
                                                    <option>Custom Analytics</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                                    Date Range
                                                </label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <Input
                                                        type="date"
                                                        value={startDate}
                                                        onChange={(e) => setStartDate(e.target.value)}
                                                        className="border-gray-200 dark:border-gray-700 bg-white dark:bg-black"
                                                    />
                                                    <Input
                                                        type="date"
                                                        value={endDate}
                                                        onChange={(e) => setEndDate(e.target.value)}
                                                        className="border-gray-200 dark:border-gray-700 bg-white dark:bg-black"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                                    Format
                                                </label>
                                                <div className="flex gap-2">
                                                    {(['PDF', 'Excel', 'CSV'] as const).map((format) => (
                                                        <button
                                                            key={format}
                                                            onClick={() => setSelectedFormat(format)}
                                                            className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all font-medium text-sm ${
                                                                selectedFormat === format
                                                                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-600'
                                                                    : 'border-gray-200 dark:border-gray-700 hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20'
                                                            }`}
                                                        >
                                                            {format}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
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
                                                        <label key={option} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={includeData.includes(option)}
                                                                onChange={() => handleToggleDataInclude(option)}
                                                                className="rounded border-gray-300 dark:border-gray-600"
                                                            />
                                                            <span className="text-sm text-gray-700 dark:text-gray-300">{option}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                                        <Button
                                            onClick={handleGenerateReport}
                                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                                        >
                                            <FileText className="h-4 w-4 mr-2" />
                                            Generate Report
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => setShowScheduleModal(true)}
                                            className="border-gray-200 dark:border-gray-700"
                                        >
                                            <Clock className="h-4 w-4 mr-2" />
                                            Schedule
                                        </Button>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Schedule Modal */}
            <AnimatePresence>
                {showScheduleModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setShowScheduleModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white dark:bg-black rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-800"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-black dark:text-white">Schedule Report</h3>
                                <button
                                    onClick={() => setShowScheduleModal(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg"
                                >
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                        Report Name
                                    </label>
                                    <Input
                                        value={scheduleName}
                                        onChange={(e) => setScheduleName(e.target.value)}
                                        placeholder="e.g., Weekly Sales Report"
                                        className="border-gray-200 dark:border-gray-700 bg-white dark:bg-black"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                        Frequency
                                    </label>
                                    <select
                                        value={scheduleFrequency}
                                        onChange={(e) => setScheduleFrequency(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white focus:border-orange-500 focus:outline-none"
                                    >
                                        <option>Daily</option>
                                        <option>Weekly</option>
                                        <option>Monthly</option>
                                        <option>Quarterly</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                        Time
                                    </label>
                                    <Input
                                        type="time"
                                        value={scheduleTime}
                                        onChange={(e) => setScheduleTime(e.target.value)}
                                        className="border-gray-200 dark:border-gray-700 bg-white dark:bg-black"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                        Recipients
                                    </label>
                                    {scheduleRecipients.map((email, index) => (
                                        <div key={index} className="flex gap-2 mb-2">
                                            <Input
                                                type="email"
                                                value={email}
                                                onChange={(e) => handleRecipientChange(index, e.target.value)}
                                                placeholder="email@example.com"
                                                className="border-gray-200 dark:border-gray-700 bg-white dark:bg-black"
                                            />
                                            {scheduleRecipients.length > 1 && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleRemoveRecipient(index)}
                                                    className="border-red-200 text-red-500"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                    {errors.recipients && <p className="text-red-500 text-xs mt-1">{errors.recipients}</p>}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleAddRecipient}
                                        className="mt-2 border-gray-200 dark:border-gray-700"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Recipient
                                    </Button>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button
                                    onClick={handleCreateSchedule}
                                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                                >
                                    <Send className="h-4 w-4 mr-2" />
                                    Create Schedule
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setShowScheduleModal(false)}
                                    className="border-gray-200 dark:border-gray-700"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Preview Modal */}
            <AnimatePresence>
                {showPreviewModal && selectedReport && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setShowPreviewModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white dark:bg-black rounded-xl p-6 w-full max-w-lg border border-gray-200 dark:border-gray-800"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-black dark:text-white">Report Preview</h3>
                                <button
                                    onClick={() => setShowPreviewModal(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg"
                                >
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
                                    <div className="flex items-center gap-3 mb-4">
                                        <FileText className="h-8 w-8 text-orange-500" />
                                        <div>
                                            <h4 className="font-medium text-black dark:text-white">{selectedReport.name}</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{selectedReport.type} Report</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-500 dark:text-gray-400">Format</p>
                                            <p className="font-medium text-black dark:text-white">{selectedReport.format}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 dark:text-gray-400">Size</p>
                                            <p className="font-medium text-black dark:text-white">{selectedReport.size}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 dark:text-gray-400">Generated</p>
                                            <p className="font-medium text-black dark:text-white">{selectedReport.generated}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 dark:text-gray-400">Status</p>
                                            <p className="font-medium text-green-600">{selectedReport.status}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                    <h5 className="text-sm font-medium text-black dark:text-white mb-2">Report Contents</h5>
                                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                        <li>• Executive Summary</li>
                                        <li>• Key Performance Indicators</li>
                                        <li>• Detailed Analysis</li>
                                        <li>• Charts and Visualizations</li>
                                        <li>• Recommendations</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button
                                    onClick={() => {
                                        handleDownload(selectedReport);
                                        setShowPreviewModal(false);
                                    }}
                                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                                >
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setShowPreviewModal(false)}
                                    className="border-gray-200 dark:border-gray-700"
                                >
                                    Close
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
