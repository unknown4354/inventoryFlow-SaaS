'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    PackagePlus,
    Search,
    CheckCircle,
    AlertTriangle,
    Calendar,
    User,
    Camera,
    FileText,
    X,
    Check,
    ArrowLeft,
    ArrowRight,
    AlertCircle,
    Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ReturnItem {
    id: string;
    name: string;
    qty: number;
    project: string;
    dueDate: string;
    status: 'due' | 'overdue' | 'upcoming';
    sku: string;
}

interface SelectedReturnItem extends ReturnItem {
    condition: 'perfect' | 'minor_wear' | 'damaged' | null;
    damageNotes: string;
    photos: string[];
}

const itemsDueForReturn: ReturnItem[] = [
    { id: '1', name: 'LED Moving Head Light', qty: 12, project: 'Tech Summit 2024', dueDate: 'Today', status: 'due', sku: 'ELC-001' },
    { id: '2', name: 'Truss System 10ft', qty: 6, project: 'Tech Summit 2024', dueDate: 'Today', status: 'due', sku: 'STR-001' },
    { id: '3', name: '4K Projector', qty: 2, project: 'Corporate Gala', dueDate: '2 days ago', status: 'overdue', sku: 'AV-001' },
    { id: '4', name: 'Chiavari Chair', qty: 150, project: 'Conference 2024', dueDate: 'Tomorrow', status: 'upcoming', sku: 'FUR-001' },
    { id: '5', name: 'PA Speaker System', qty: 4, project: 'Music Festival', dueDate: '3 days ago', status: 'overdue', sku: 'AUD-002' },
    { id: '6', name: 'Round Table 60"', qty: 25, project: 'Annual Meeting', dueDate: 'In 2 days', status: 'upcoming', sku: 'FUR-002' },
];

export default function CheckInPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItems, setSelectedItems] = useState<SelectedReturnItem[]>([]);
    const [receivedBy, setReceivedBy] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showDamageModal, setShowDamageModal] = useState(false);
    const [currentDamageItem, setCurrentDamageItem] = useState<SelectedReturnItem | null>(null);
    const [recentCheckIns, setRecentCheckIns] = useState([
        { item: 'LED Lights x8', project: 'Corporate Event', time: '10 mins ago', status: 'Perfect' },
        { item: 'Sound System', project: 'Tech Summit', time: '25 mins ago', status: 'Minor Wear' },
        { item: 'Chairs x50', project: 'Conference', time: '1 hour ago', status: 'Perfect' },
    ]);

    const steps = [
        { step: 1, label: 'Scan/Select Items' },
        { step: 2, label: 'Condition Check' },
        { step: 3, label: 'Document Issues' },
        { step: 4, label: 'Confirm Return' },
    ];

    const stats = [
        { label: 'Due Today', value: itemsDueForReturn.filter(i => i.status === 'due').length.toString(), icon: Calendar, color: 'orange' },
        { label: 'Overdue', value: itemsDueForReturn.filter(i => i.status === 'overdue').length.toString(), icon: AlertTriangle, color: 'red' },
        { label: 'Checked In Today', value: recentCheckIns.length.toString(), icon: CheckCircle, color: 'green' },
        { label: 'Pending Return', value: itemsDueForReturn.length.toString(), icon: PackagePlus, color: 'gray' },
    ];

    const filteredItems = itemsDueForReturn.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleItemSelection = (item: ReturnItem) => {
        const exists = selectedItems.find(s => s.id === item.id);
        if (exists) {
            setSelectedItems(selectedItems.filter(s => s.id !== item.id));
        } else {
            setSelectedItems([...selectedItems, {
                ...item,
                condition: null,
                damageNotes: '',
                photos: []
            }]);
        }
    };

    const setItemCondition = (itemId: string, condition: 'perfect' | 'minor_wear' | 'damaged') => {
        setSelectedItems(selectedItems.map(item =>
            item.id === itemId ? { ...item, condition } : item
        ));

        if (condition === 'damaged') {
            const item = selectedItems.find(i => i.id === itemId);
            if (item) {
                setCurrentDamageItem({ ...item, condition });
                setShowDamageModal(true);
            }
        }
    };

    const updateDamageNotes = (itemId: string, notes: string) => {
        setSelectedItems(selectedItems.map(item =>
            item.id === itemId ? { ...item, damageNotes: notes } : item
        ));
    };

    const nextStep = () => {
        if (currentStep === 1 && selectedItems.length === 0) return;
        if (currentStep === 2 && selectedItems.some(item => !item.condition)) return;
        if (currentStep === 3 && !receivedBy.trim()) return;
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleConfirm = () => {
        // Add to recent check-ins
        const newCheckIns = selectedItems.map(item => ({
            item: `${item.name} x${item.qty}`,
            project: item.project,
            time: 'Just now',
            status: item.condition === 'perfect' ? 'Perfect' : item.condition === 'minor_wear' ? 'Minor Wear' : 'Damaged'
        }));
        setRecentCheckIns([...newCheckIns, ...recentCheckIns].slice(0, 10));
        setShowSuccessModal(true);
    };

    const resetForm = () => {
        setSelectedItems([]);
        setReceivedBy('');
        setCurrentStep(1);
        setShowSuccessModal(false);
    };

    const allConditionsSet = selectedItems.every(item => item.condition !== null);
    const hasDamagedItems = selectedItems.some(item => item.condition === 'damaged');

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-black dark:text-white">Check-In Equipment</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Return inventory items from projects</p>
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
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                                <p className="text-2xl font-bold text-black dark:text-white mt-1">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-lg ${
                                stat.color === 'orange' ? 'bg-orange-100 dark:bg-orange-950' :
                                stat.color === 'red' ? 'bg-red-100 dark:bg-red-950' :
                                stat.color === 'green' ? 'bg-green-100 dark:bg-green-950' :
                                'bg-gray-100 dark:bg-gray-900'
                            }`}>
                                <stat.icon className={`h-6 w-6 ${
                                    stat.color === 'orange' ? 'text-orange-500' :
                                    stat.color === 'red' ? 'text-red-500' :
                                    stat.color === 'green' ? 'text-green-500' :
                                    'text-gray-500'
                                }`} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
                {steps.map((item, index) => (
                    <div key={item.step} className="flex items-center flex-1">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                                currentStep === item.step
                                    ? 'bg-orange-500 text-white'
                                    : currentStep > item.step
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                            }`}>
                                {currentStep > item.step ? (
                                    <Check className="h-5 w-5" />
                                ) : (
                                    item.step
                                )}
                            </div>
                            <span className={`font-medium hidden sm:block ${
                                currentStep >= item.step ? 'text-black dark:text-white' : 'text-gray-500'
                            }`}>
                                {item.label}
                            </span>
                        </div>
                        {index < 3 && (
                            <div className={`flex-1 h-0.5 mx-4 ${
                                currentStep > item.step ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-800'
                            }`} />
                        )}
                    </div>
                ))}
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
                {currentStep === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                    >
                        {/* Left: Items to Check-In */}
                        <div className="lg:col-span-2 space-y-4">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search by SKU, project, or scan barcode..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                                />
                            </div>

                            {/* Items Due for Return */}
                            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6">
                                <h3 className="font-bold text-black dark:text-white mb-4">Items Due for Return</h3>
                                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                                    {filteredItems.map((item, index) => {
                                        const isSelected = selectedItems.some(s => s.id === item.id);
                                        return (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                onClick={() => toggleItemSelection(item)}
                                                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                                                    isSelected
                                                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-950'
                                                        : item.status === 'overdue'
                                                        ? 'border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/50 hover:border-red-500'
                                                        : item.status === 'due'
                                                        ? 'border-orange-300 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/50 hover:border-orange-500'
                                                        : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                                                }`}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                                                isSelected
                                                                    ? 'border-orange-500 bg-orange-500'
                                                                    : 'border-gray-300 dark:border-gray-600'
                                                            }`}>
                                                                {isSelected && <Check className="h-3 w-3 text-white" />}
                                                            </div>
                                                            <p className="font-medium text-black dark:text-white">{item.name}</p>
                                                        </div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 ml-7">
                                                            Quantity: {item.qty} • Project: {item.project} • SKU: {item.sku}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-2 ml-7">
                                                            <Calendar className="h-3 w-3 text-gray-500" />
                                                            <span className={`text-xs font-medium ${
                                                                item.status === 'overdue' ? 'text-red-600 dark:text-red-400' :
                                                                item.status === 'due' ? 'text-orange-600 dark:text-orange-400' :
                                                                'text-gray-600 dark:text-gray-400'
                                                            }`}>
                                                                Due: {item.dueDate}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                                        item.status === 'overdue' ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400' :
                                                        item.status === 'due' ? 'bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400' :
                                                        'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-400'
                                                    }`}>
                                                        {item.status === 'overdue' ? 'Overdue' : item.status === 'due' ? 'Due Today' : 'Upcoming'}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Right: Selected Items */}
                        <div className="space-y-4">
                            <div className="rounded-xl border-2 border-orange-500 bg-white dark:bg-black p-6">
                                <h3 className="font-bold text-black dark:text-white mb-4">
                                    Selected for Check-In ({selectedItems.length})
                                </h3>
                                {selectedItems.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500 dark:text-gray-500">
                                        Click on items to select for check-in
                                    </div>
                                ) : (
                                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                                        {selectedItems.map(item => (
                                            <div
                                                key={item.id}
                                                className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <p className="font-medium text-black dark:text-white text-sm">{item.name}</p>
                                                        <p className="text-xs text-gray-600 dark:text-gray-400">Qty: {item.qty}</p>
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleItemSelection(item);
                                                        }}
                                                        className="text-gray-400 hover:text-red-500"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <Button
                                onClick={nextStep}
                                disabled={selectedItems.length === 0}
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                            >
                                Continue to Condition Check
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </div>
                    </motion.div>
                )}

                {currentStep === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6">
                            <h3 className="font-bold text-black dark:text-white mb-4">Condition Assessment</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                                Assess the condition of each returned item
                            </p>

                            <div className="space-y-6">
                                {selectedItems.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="p-4 rounded-lg border border-gray-200 dark:border-gray-800"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <p className="font-medium text-black dark:text-white">{item.name}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Quantity: {item.qty} • From: {item.project}
                                                </p>
                                            </div>
                                            {item.condition && (
                                                <span className={`text-xs px-2 py-1 rounded-full ${
                                                    item.condition === 'perfect' ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400' :
                                                    item.condition === 'minor_wear' ? 'bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400' :
                                                    'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400'
                                                }`}>
                                                    {item.condition === 'perfect' ? 'Perfect' : item.condition === 'minor_wear' ? 'Minor Wear' : 'Damaged'}
                                                </span>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-3 gap-3">
                                            <button
                                                onClick={() => setItemCondition(item.id, 'perfect')}
                                                className={`p-3 rounded-lg border-2 transition-all ${
                                                    item.condition === 'perfect'
                                                        ? 'border-green-500 bg-green-50 dark:bg-green-950'
                                                        : 'border-gray-200 dark:border-gray-700 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-950'
                                                }`}
                                            >
                                                <CheckCircle className={`h-5 w-5 mx-auto mb-1 ${
                                                    item.condition === 'perfect' ? 'text-green-500' : 'text-gray-400'
                                                }`} />
                                                <span className={`text-xs font-medium block ${
                                                    item.condition === 'perfect' ? 'text-green-700 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
                                                }`}>Perfect</span>
                                            </button>

                                            <button
                                                onClick={() => setItemCondition(item.id, 'minor_wear')}
                                                className={`p-3 rounded-lg border-2 transition-all ${
                                                    item.condition === 'minor_wear'
                                                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-950'
                                                        : 'border-gray-200 dark:border-gray-700 hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950'
                                                }`}
                                            >
                                                <AlertTriangle className={`h-5 w-5 mx-auto mb-1 ${
                                                    item.condition === 'minor_wear' ? 'text-orange-500' : 'text-gray-400'
                                                }`} />
                                                <span className={`text-xs font-medium block ${
                                                    item.condition === 'minor_wear' ? 'text-orange-700 dark:text-orange-400' : 'text-gray-600 dark:text-gray-400'
                                                }`}>Minor Wear</span>
                                            </button>

                                            <button
                                                onClick={() => setItemCondition(item.id, 'damaged')}
                                                className={`p-3 rounded-lg border-2 transition-all ${
                                                    item.condition === 'damaged'
                                                        ? 'border-red-500 bg-red-50 dark:bg-red-950'
                                                        : 'border-gray-200 dark:border-gray-700 hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-950'
                                                }`}
                                            >
                                                <AlertCircle className={`h-5 w-5 mx-auto mb-1 ${
                                                    item.condition === 'damaged' ? 'text-red-500' : 'text-gray-400'
                                                }`} />
                                                <span className={`text-xs font-medium block ${
                                                    item.condition === 'damaged' ? 'text-red-700 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'
                                                }`}>Damaged</span>
                                            </button>
                                        </div>

                                        {item.damageNotes && (
                                            <div className="mt-3 p-2 rounded bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800">
                                                <p className="text-xs text-red-700 dark:text-red-400">
                                                    <strong>Damage Notes:</strong> {item.damageNotes}
                                                </p>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <Button
                                variant="outline"
                                onClick={prevStep}
                                className="flex-1 border-gray-200 dark:border-gray-700"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back
                            </Button>
                            <Button
                                onClick={nextStep}
                                disabled={!allConditionsSet}
                                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                            >
                                Continue
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </div>
                    </motion.div>
                )}

                {currentStep === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-2xl mx-auto"
                    >
                        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6 space-y-4">
                            <h3 className="font-bold text-black dark:text-white mb-4">Final Documentation</h3>

                            {hasDamagedItems && (
                                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800">
                                    <div className="flex items-start gap-3">
                                        <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-red-700 dark:text-red-400">Damaged Items Detected</p>
                                            <p className="text-sm text-red-600 dark:text-red-500">
                                                {selectedItems.filter(i => i.condition === 'damaged').length} item(s) marked as damaged.
                                                These will be flagged for maintenance review.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div>
                                <Label className="text-black dark:text-white">
                                    <User className="h-4 w-4 inline mr-1" />
                                    Received By *
                                </Label>
                                <Input
                                    value={receivedBy}
                                    onChange={(e) => setReceivedBy(e.target.value)}
                                    placeholder="Your name"
                                    className="mt-1 border-gray-200 dark:border-gray-700"
                                />
                            </div>

                            <div>
                                <Label className="text-black dark:text-white mb-2 block">
                                    <Camera className="h-4 w-4 inline mr-1" />
                                    Upload Photos (Optional)
                                </Label>
                                <Button variant="outline" className="w-full border-gray-200 dark:border-gray-700 hover:border-orange-500">
                                    <Camera className="h-4 w-4 mr-2" />
                                    Add Photos
                                </Button>
                                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                                    Upload photos for documentation, especially for damaged items
                                </p>
                            </div>

                            <div>
                                <Label className="text-black dark:text-white">
                                    <FileText className="h-4 w-4 inline mr-1" />
                                    Additional Notes
                                </Label>
                                <textarea
                                    placeholder="Any additional notes about the return..."
                                    className="mt-1 w-full min-h-[100px] px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-orange-500 focus:outline-none resize-none"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <Button
                                variant="outline"
                                onClick={prevStep}
                                className="flex-1 border-gray-200 dark:border-gray-700"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back
                            </Button>
                            <Button
                                onClick={nextStep}
                                disabled={!receivedBy.trim()}
                                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                            >
                                Review & Confirm
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </div>
                    </motion.div>
                )}

                {currentStep === 4 && (
                    <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-950">
                                    <CheckCircle className="h-6 w-6 text-orange-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-black dark:text-white">Review Check-In Details</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Confirm all items and conditions are correct
                                    </p>
                                </div>
                            </div>

                            <div className="mb-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Received By:</span>
                                    <span className="font-medium text-black dark:text-white">{receivedBy}</span>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Date:</span>
                                    <span className="font-medium text-black dark:text-white">{new Date().toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {selectedItems.map(item => (
                                    <div
                                        key={item.id}
                                        className="p-4 rounded-lg border border-gray-200 dark:border-gray-800"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-black dark:text-white">{item.name}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Qty: {item.qty} • From: {item.project}
                                                </p>
                                                {item.damageNotes && (
                                                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                                        Notes: {item.damageNotes}
                                                    </p>
                                                )}
                                            </div>
                                            <span className={`text-xs px-3 py-1 rounded-full ${
                                                item.condition === 'perfect' ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400' :
                                                item.condition === 'minor_wear' ? 'bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400' :
                                                'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400'
                                            }`}>
                                                {item.condition === 'perfect' ? 'Perfect' : item.condition === 'minor_wear' ? 'Minor Wear' : 'Damaged'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {hasDamagedItems && (
                                <div className="mt-6 p-4 rounded-lg bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                                        <div className="text-sm">
                                            <p className="font-medium text-orange-700 dark:text-orange-400">Maintenance Required</p>
                                            <p className="text-orange-600 dark:text-orange-500">
                                                Damaged items will be automatically scheduled for maintenance review
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3 mt-6">
                            <Button
                                variant="outline"
                                onClick={prevStep}
                                className="flex-1 border-gray-200 dark:border-gray-700"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back
                            </Button>
                            <Button
                                onClick={handleConfirm}
                                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                            >
                                <Check className="h-4 w-4 mr-2" />
                                Complete Check-In
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Recent Check-Ins */}
            {currentStep === 1 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6"
                >
                    <h3 className="font-bold text-black dark:text-white mb-4">Recent Check-Ins</h3>
                    <div className="space-y-2">
                        {recentCheckIns.map((checkin, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <CheckCircle className={`h-5 w-5 ${
                                        checkin.status === 'Perfect' ? 'text-green-500' :
                                        checkin.status === 'Minor Wear' ? 'text-orange-500' :
                                        'text-red-500'
                                    }`} />
                                    <div>
                                        <p className="font-medium text-black dark:text-white">{checkin.item}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">From: {checkin.project}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                        checkin.status === 'Perfect'
                                            ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400'
                                            : checkin.status === 'Minor Wear'
                                            ? 'bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400'
                                            : 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400'
                                    }`}>
                                        {checkin.status}
                                    </span>
                                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{checkin.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Success Modal */}
            <AnimatePresence>
                {showSuccessModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-8 w-full max-w-md text-center"
                        >
                            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-950 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle className="h-8 w-8 text-green-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
                                Check-In Complete!
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                {selectedItems.length} item(s) have been successfully checked in
                            </p>

                            {hasDamagedItems && (
                                <div className="mb-6 p-3 rounded-lg bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800">
                                    <p className="text-sm text-orange-700 dark:text-orange-400">
                                        Damaged items have been flagged for maintenance
                                    </p>
                                </div>
                            )}

                            <div className="space-y-3">
                                <Button
                                    onClick={resetForm}
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                                >
                                    Check In More Items
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setShowSuccessModal(false)}
                                    className="w-full border-gray-200 dark:border-gray-700"
                                >
                                    View Check-In Report
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Damage Details Modal */}
            <AnimatePresence>
                {showDamageModal && currentDamageItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowDamageModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-6 w-full max-w-lg"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-black dark:text-white">Document Damage</h2>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowDamageModal(false)}
                                    className="hover:bg-gray-100 dark:hover:bg-gray-900"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800">
                                <p className="font-medium text-red-700 dark:text-red-400">{currentDamageItem.name}</p>
                                <p className="text-sm text-red-600 dark:text-red-500">Quantity: {currentDamageItem.qty}</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <Label className="text-black dark:text-white">Damage Description *</Label>
                                    <textarea
                                        value={selectedItems.find(i => i.id === currentDamageItem.id)?.damageNotes || ''}
                                        onChange={(e) => updateDamageNotes(currentDamageItem.id, e.target.value)}
                                        placeholder="Describe the damage in detail..."
                                        className="mt-1 w-full min-h-[100px] px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-orange-500 focus:outline-none resize-none"
                                    />
                                </div>

                                <div>
                                    <Label className="text-black dark:text-white mb-2 block">
                                        <Camera className="h-4 w-4 inline mr-1" />
                                        Damage Photos
                                    </Label>
                                    <Button variant="outline" className="w-full border-gray-200 dark:border-gray-700 hover:border-orange-500">
                                        <Camera className="h-4 w-4 mr-2" />
                                        Upload Photos
                                    </Button>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowDamageModal(false)}
                                    className="flex-1 border-gray-200 dark:border-gray-700"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() => setShowDamageModal(false)}
                                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                                >
                                    Save Damage Report
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
