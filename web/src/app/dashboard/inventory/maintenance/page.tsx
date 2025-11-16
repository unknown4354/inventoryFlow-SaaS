'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Wrench,
    Calendar,
    AlertTriangle,
    CheckCircle,
    Clock,
    Search,
    Filter,
    Plus,
    X,
    User,
    FileText,
    Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface MaintenanceItem {
    id: string;
    name: string;
    sku: string;
    dueDate: string;
    type: string;
    priority: 'High' | 'Medium' | 'Low';
    status: 'overdue' | 'due' | 'scheduled' | 'in_progress' | 'completed';
    assignedTo?: string;
    notes?: string;
}

const initialOverdueItems: MaintenanceItem[] = [
    { id: '1', name: 'Generator 5KVA', sku: 'GEN-001', dueDate: '3 days ago', type: 'Annual Service', priority: 'High', status: 'overdue' },
    { id: '2', name: 'LED Moving Head Light', sku: 'ELC-001', dueDate: '1 day ago', type: 'Routine Check', priority: 'Medium', status: 'overdue' },
    { id: '3', name: 'Sound System Pro', sku: 'AUD-001', dueDate: '5 days ago', type: 'Calibration', priority: 'High', status: 'overdue' },
];

const initialDueThisWeek: MaintenanceItem[] = [
    { id: '4', name: 'Projector 4K', sku: 'AV-001', dueDate: 'Tomorrow', type: 'Lens Cleaning', priority: 'High', status: 'scheduled' },
    { id: '5', name: 'Truss System', sku: 'STR-001', dueDate: 'In 2 days', type: 'Safety Check', priority: 'High', status: 'scheduled' },
    { id: '6', name: 'Fog Machine', sku: 'FX-001', dueDate: 'In 3 days', type: 'Fluid Replacement', priority: 'Medium', status: 'scheduled' },
    { id: '7', name: 'Wireless Mic Set', sku: 'AUD-002', dueDate: 'In 4 days', type: 'Battery Check', priority: 'Low', status: 'scheduled' },
];

const equipmentOptions = [
    { id: '1', name: 'Generator 5KVA', sku: 'GEN-001' },
    { id: '2', name: 'LED Moving Head Light', sku: 'ELC-001' },
    { id: '3', name: 'Projector 4K', sku: 'AV-001' },
    { id: '4', name: 'Truss System', sku: 'STR-001' },
    { id: '5', name: 'Sound System Pro', sku: 'AUD-001' },
    { id: '6', name: 'Fog Machine', sku: 'FX-001' },
    { id: '7', name: 'Wireless Mic Set', sku: 'AUD-002' },
];

const maintenanceTypes = [
    'Routine Check',
    'Annual Service',
    'Calibration',
    'Lens Cleaning',
    'Safety Check',
    'Fluid Replacement',
    'Battery Check',
    'Repair',
    'Deep Cleaning',
    'Firmware Update'
];

export default function MaintenancePage() {
    const [overdueItems, setOverdueItems] = useState<MaintenanceItem[]>(initialOverdueItems);
    const [dueThisWeek, setDueThisWeek] = useState<MaintenanceItem[]>(initialDueThisWeek);
    const [searchTerm, setSearchTerm] = useState('');
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<MaintenanceItem | null>(null);
    const [completedToday, setCompletedToday] = useState(7);
    const [inProgressCount, setInProgressCount] = useState(5);

    const [scheduleForm, setScheduleForm] = useState({
        equipmentId: '',
        maintenanceType: '',
        priority: 'Medium' as 'High' | 'Medium' | 'Low',
        scheduledDate: '',
        assignedTo: '',
        notes: ''
    });

    const [filterOptions, setFilterOptions] = useState({
        type: '',
        priority: '',
        status: ''
    });

    const [recentCompletions, setRecentCompletions] = useState([
        { item: 'LED Lights', type: 'Routine Check', time: '2 hours ago' },
        { item: 'Generator', type: 'Oil Change', time: '5 hours ago' },
        { item: 'Speakers', type: 'Calibration', time: '1 day ago' },
    ]);

    const stats = [
        { label: 'Due This Week', value: dueThisWeek.length.toString(), icon: Calendar, color: 'orange', trend: '+2 from last week' },
        { label: 'Overdue', value: overdueItems.length.toString(), icon: AlertTriangle, color: 'red', trend: 'Needs attention' },
        { label: 'Completed Today', value: completedToday.toString(), icon: CheckCircle, color: 'green', trend: '82% on time' },
        { label: 'In Progress', value: inProgressCount.toString(), icon: Clock, color: 'blue', trend: 'Avg: 2.3 days' },
    ];

    const maintenanceTypeStats = [
        { type: 'Routine Check', count: 18, color: 'bg-blue-500' },
        { type: 'Repairs', count: 7, color: 'bg-red-500' },
        { type: 'Calibration', count: 5, color: 'bg-orange-500' },
        { type: 'Cleaning', count: 12, color: 'bg-green-500' },
    ];

    const handleScheduleMaintenance = () => {
        if (!scheduleForm.equipmentId || !scheduleForm.maintenanceType || !scheduleForm.scheduledDate) {
            return;
        }

        const equipment = equipmentOptions.find(e => e.id === scheduleForm.equipmentId);
        if (!equipment) return;

        const newItem: MaintenanceItem = {
            id: Date.now().toString(),
            name: equipment.name,
            sku: equipment.sku,
            dueDate: new Date(scheduleForm.scheduledDate).toLocaleDateString(),
            type: scheduleForm.maintenanceType,
            priority: scheduleForm.priority,
            status: 'scheduled',
            assignedTo: scheduleForm.assignedTo,
            notes: scheduleForm.notes
        };

        setDueThisWeek([...dueThisWeek, newItem]);
        setShowScheduleModal(false);
        resetScheduleForm();
    };

    const handleScheduleNow = (item: MaintenanceItem) => {
        setScheduleForm({
            equipmentId: item.id,
            maintenanceType: item.type,
            priority: item.priority,
            scheduledDate: '',
            assignedTo: '',
            notes: ''
        });
        setShowScheduleModal(true);
    };

    const handleViewDetails = (item: MaintenanceItem) => {
        setSelectedItem(item);
        setShowDetailsModal(true);
    };

    const handleMarkCompleted = (item: MaintenanceItem) => {
        setOverdueItems(overdueItems.filter(i => i.id !== item.id));
        setDueThisWeek(dueThisWeek.filter(i => i.id !== item.id));
        setCompletedToday(completedToday + 1);
        setRecentCompletions([
            { item: item.name, type: item.type, time: 'Just now' },
            ...recentCompletions.slice(0, 9)
        ]);
    };

    const resetScheduleForm = () => {
        setScheduleForm({
            equipmentId: '',
            maintenanceType: '',
            priority: 'Medium',
            scheduledDate: '',
            assignedTo: '',
            notes: ''
        });
    };

    const filteredDueThisWeek = dueThisWeek.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.sku.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = !filterOptions.type || item.type === filterOptions.type;
        const matchesPriority = !filterOptions.priority || item.priority === filterOptions.priority;
        return matchesSearch && matchesType && matchesPriority;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
                <div>
                    <h1 className="text-3xl font-bold text-black dark:text-white">Maintenance Tracking</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Schedule and track equipment maintenance</p>
                </div>
                <Button
                    onClick={() => {
                        resetScheduleForm();
                        setShowScheduleModal(true);
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule Maintenance
                </Button>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className={`p-3 rounded-lg ${
                                stat.color === 'orange' ? 'bg-orange-100 dark:bg-orange-950' :
                                stat.color === 'red' ? 'bg-red-100 dark:bg-red-950' :
                                stat.color === 'green' ? 'bg-green-100 dark:bg-green-950' :
                                'bg-blue-100 dark:bg-blue-950'
                            }`}>
                                <stat.icon className={`h-5 w-5 ${
                                    stat.color === 'orange' ? 'text-orange-500' :
                                    stat.color === 'red' ? 'text-red-500' :
                                    stat.color === 'green' ? 'text-green-500' :
                                    'text-blue-500'
                                }`} />
                            </div>
                            <p className="text-3xl font-bold text-black dark:text-white">{stat.value}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{stat.label}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{stat.trend}</p>
                    </motion.div>
                ))}
            </div>

            {/* Filters and Search */}
            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search equipment..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                    />
                </div>
                <Button
                    variant="outline"
                    onClick={() => setShowFilterModal(true)}
                    className="border-gray-200 dark:border-gray-700 hover:border-orange-500"
                >
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                </Button>
            </div>

            {/* Maintenance Schedule */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Overdue & Due Soon */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Overdue */}
                    {overdueItems.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/50 p-6"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <AlertTriangle className="h-5 w-5 text-red-500" />
                                <h3 className="font-bold text-black dark:text-white">Overdue Maintenance</h3>
                                <span className="ml-auto text-sm text-red-600 dark:text-red-400 font-medium">
                                    {overdueItems.length} items
                                </span>
                            </div>
                            <div className="space-y-3">
                                {overdueItems.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="p-4 rounded-lg bg-white dark:bg-black border border-red-200 dark:border-red-800"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <p className="font-medium text-black dark:text-white">{item.name}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">SKU: {item.sku}</p>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <span className="text-xs px-2 py-1 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400">
                                                        {item.type}
                                                    </span>
                                                    <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                                                        Due: {item.dueDate}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleMarkCompleted(item)}
                                                    className="border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950"
                                                >
                                                    <CheckCircle className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleScheduleNow(item)}
                                                    className="bg-orange-500 hover:bg-orange-600 text-white"
                                                >
                                                    Schedule Now
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Due This Week */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Calendar className="h-5 w-5 text-orange-500" />
                            <h3 className="font-bold text-black dark:text-white">Scheduled Maintenance</h3>
                            <span className="ml-auto text-sm text-orange-600 dark:text-orange-400 font-medium">
                                {filteredDueThisWeek.length} items
                            </span>
                        </div>
                        <div className="space-y-3">
                            {filteredDueThisWeek.length === 0 ? (
                                <div className="text-center py-8 text-gray-500 dark:text-gray-500">
                                    No scheduled maintenance matching your filters
                                </div>
                            ) : (
                                filteredDueThisWeek.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + index * 0.1 }}
                                        className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-500 transition-colors"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="font-medium text-black dark:text-white">{item.name}</p>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                                                        item.priority === 'High' ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400' :
                                                        item.priority === 'Medium' ? 'bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400' :
                                                        'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-400'
                                                    }`}>
                                                        {item.priority}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">SKU: {item.sku}</p>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-400">
                                                        {item.type}
                                                    </span>
                                                    <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                                                        Due: {item.dueDate}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleMarkCompleted(item)}
                                                    className="border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950"
                                                >
                                                    <CheckCircle className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleViewDetails(item)}
                                                    className="border-gray-200 dark:border-gray-700 hover:border-orange-500"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Maintenance Calendar & Stats */}
                <div className="space-y-4">
                    {/* Quick Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6"
                    >
                        <h3 className="font-bold text-black dark:text-white mb-4">Maintenance Stats</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">On-Time Completion</span>
                                    <span className="text-sm font-bold text-black dark:text-white">82%</span>
                                </div>
                                <div className="h-2 bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '82%' }}
                                        transition={{ delay: 0.5, duration: 0.8 }}
                                        className="h-full bg-orange-500 rounded-full"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Avg Completion Time</span>
                                    <span className="text-sm font-bold text-black dark:text-white">2.3 days</span>
                                </div>
                                <div className="h-2 bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '65%' }}
                                        transition={{ delay: 0.6, duration: 0.8 }}
                                        className="h-full bg-green-500 rounded-full"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Monthly Cost</span>
                                    <span className="text-sm font-bold text-black dark:text-white">₹1.2L</span>
                                </div>
                                <div className="h-2 bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '45%' }}
                                        transition={{ delay: 0.7, duration: 0.8 }}
                                        className="h-full bg-blue-500 rounded-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Maintenance Types */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6"
                    >
                        <h3 className="font-bold text-black dark:text-white mb-4">By Type</h3>
                        <div className="space-y-3">
                            {maintenanceTypeStats.map((item) => (
                                <div key={item.type} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">{item.type}</span>
                                    </div>
                                    <span className="text-sm font-bold text-black dark:text-white">{item.count}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Recent Completions */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6"
                    >
                        <h3 className="font-bold text-black dark:text-white mb-4">Recently Completed</h3>
                        <div className="space-y-3">
                            {recentCompletions.map((completion, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-black dark:text-white">{completion.item}</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">{completion.type}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{completion.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Schedule Maintenance Modal */}
            <AnimatePresence>
                {showScheduleModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowScheduleModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-black dark:text-white">Schedule Maintenance</h2>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowScheduleModal(false)}
                                    className="hover:bg-gray-100 dark:hover:bg-gray-900"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <Label className="text-black dark:text-white">Equipment *</Label>
                                    <select
                                        value={scheduleForm.equipmentId}
                                        onChange={(e) => setScheduleForm({ ...scheduleForm, equipmentId: e.target.value })}
                                        className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-orange-500 focus:outline-none"
                                    >
                                        <option value="">Select equipment</option>
                                        {equipmentOptions.map(eq => (
                                            <option key={eq.id} value={eq.id}>{eq.name} ({eq.sku})</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <Label className="text-black dark:text-white">Maintenance Type *</Label>
                                    <select
                                        value={scheduleForm.maintenanceType}
                                        onChange={(e) => setScheduleForm({ ...scheduleForm, maintenanceType: e.target.value })}
                                        className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-orange-500 focus:outline-none"
                                    >
                                        <option value="">Select type</option>
                                        {maintenanceTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <Label className="text-black dark:text-white">Priority *</Label>
                                    <div className="grid grid-cols-3 gap-3 mt-1">
                                        {(['High', 'Medium', 'Low'] as const).map((priority) => (
                                            <button
                                                key={priority}
                                                type="button"
                                                onClick={() => setScheduleForm({ ...scheduleForm, priority })}
                                                className={`p-2 rounded-lg border-2 transition-all ${
                                                    scheduleForm.priority === priority
                                                        ? priority === 'High'
                                                            ? 'border-red-500 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400'
                                                            : priority === 'Medium'
                                                            ? 'border-orange-500 bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-400'
                                                            : 'border-gray-500 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-400'
                                                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                                                }`}
                                            >
                                                {priority}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-black dark:text-white">
                                        <Calendar className="h-4 w-4 inline mr-1" />
                                        Scheduled Date *
                                    </Label>
                                    <Input
                                        type="date"
                                        value={scheduleForm.scheduledDate}
                                        onChange={(e) => setScheduleForm({ ...scheduleForm, scheduledDate: e.target.value })}
                                        className="mt-1 border-gray-200 dark:border-gray-700"
                                    />
                                </div>

                                <div>
                                    <Label className="text-black dark:text-white">
                                        <User className="h-4 w-4 inline mr-1" />
                                        Assigned Technician
                                    </Label>
                                    <Input
                                        value={scheduleForm.assignedTo}
                                        onChange={(e) => setScheduleForm({ ...scheduleForm, assignedTo: e.target.value })}
                                        placeholder="Technician name"
                                        className="mt-1 border-gray-200 dark:border-gray-700"
                                    />
                                </div>

                                <div>
                                    <Label className="text-black dark:text-white">
                                        <FileText className="h-4 w-4 inline mr-1" />
                                        Notes
                                    </Label>
                                    <textarea
                                        value={scheduleForm.notes}
                                        onChange={(e) => setScheduleForm({ ...scheduleForm, notes: e.target.value })}
                                        placeholder="Additional notes or instructions..."
                                        className="mt-1 w-full min-h-[80px] px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-orange-500 focus:outline-none resize-none"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowScheduleModal(false)}
                                    className="flex-1 border-gray-200 dark:border-gray-700"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleScheduleMaintenance}
                                    disabled={!scheduleForm.equipmentId || !scheduleForm.maintenanceType || !scheduleForm.scheduledDate}
                                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                                >
                                    Schedule Maintenance
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* View Details Modal */}
            <AnimatePresence>
                {showDetailsModal && selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowDetailsModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-6 w-full max-w-md"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-black dark:text-white">Maintenance Details</h2>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowDetailsModal(false)}
                                    className="hover:bg-gray-100 dark:hover:bg-gray-900"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Equipment</p>
                                    <p className="font-medium text-black dark:text-white">{selectedItem.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500">SKU: {selectedItem.sku}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Type</p>
                                        <p className="font-medium text-black dark:text-white">{selectedItem.type}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Priority</p>
                                        <span className={`text-xs px-2 py-1 rounded-full ${
                                            selectedItem.priority === 'High' ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400' :
                                            selectedItem.priority === 'Medium' ? 'bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400' :
                                            'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-400'
                                        }`}>
                                            {selectedItem.priority}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Scheduled Date</p>
                                    <p className="font-medium text-black dark:text-white">{selectedItem.dueDate}</p>
                                </div>

                                {selectedItem.assignedTo && (
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Assigned To</p>
                                        <p className="font-medium text-black dark:text-white">{selectedItem.assignedTo}</p>
                                    </div>
                                )}

                                {selectedItem.notes && (
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Notes</p>
                                        <p className="text-black dark:text-white">{selectedItem.notes}</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowDetailsModal(false)}
                                    className="flex-1 border-gray-200 dark:border-gray-700"
                                >
                                    Close
                                </Button>
                                <Button
                                    onClick={() => {
                                        handleMarkCompleted(selectedItem);
                                        setShowDetailsModal(false);
                                    }}
                                    className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                                >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Mark Complete
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Filter Modal */}
            <AnimatePresence>
                {showFilterModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowFilterModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-6 w-full max-w-md"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-black dark:text-white">Filter Maintenance</h2>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowFilterModal(false)}
                                    className="hover:bg-gray-100 dark:hover:bg-gray-900"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <Label className="text-black dark:text-white">Maintenance Type</Label>
                                    <select
                                        value={filterOptions.type}
                                        onChange={(e) => setFilterOptions({ ...filterOptions, type: e.target.value })}
                                        className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-orange-500 focus:outline-none"
                                    >
                                        <option value="">All Types</option>
                                        {maintenanceTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <Label className="text-black dark:text-white">Priority</Label>
                                    <select
                                        value={filterOptions.priority}
                                        onChange={(e) => setFilterOptions({ ...filterOptions, priority: e.target.value })}
                                        className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-orange-500 focus:outline-none"
                                    >
                                        <option value="">All Priorities</option>
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setFilterOptions({ type: '', priority: '', status: '' });
                                        setShowFilterModal(false);
                                    }}
                                    className="flex-1 border-gray-200 dark:border-gray-700"
                                >
                                    Clear Filters
                                </Button>
                                <Button
                                    onClick={() => setShowFilterModal(false)}
                                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                                >
                                    Apply Filters
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
