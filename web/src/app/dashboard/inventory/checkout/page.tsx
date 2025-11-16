'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    PackageMinus,
    Search,
    Calendar,
    User,
    MapPin,
    Plus,
    X,
    Minus,
    Check,
    Camera,
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    AlertCircle,
    Package,
    FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InventoryItem {
    id: string;
    name: string;
    available: number;
    sku: string;
    condition: string;
}

interface SelectedItem {
    item: InventoryItem;
    quantity: number;
    conditionNotes: string;
    photos: string[];
}

const availableItems: InventoryItem[] = [
    { id: '1', name: 'LED Moving Head Light', available: 18, sku: 'ELC-001', condition: 'Excellent' },
    { id: '2', name: 'Truss System 10ft', available: 10, sku: 'STR-001', condition: 'Good' },
    { id: '3', name: '4K Projector', available: 5, sku: 'AV-001', condition: 'Excellent' },
    { id: '4', name: 'Chiavari Chair', available: 350, sku: 'FUR-001', condition: 'Good' },
    { id: '5', name: 'Round Table 60"', available: 45, sku: 'FUR-002', condition: 'Good' },
    { id: '6', name: 'Wireless Microphone', available: 12, sku: 'AUD-001', condition: 'Excellent' },
    { id: '7', name: 'PA Speaker System', available: 8, sku: 'AUD-002', condition: 'Good' },
    { id: '8', name: 'Stage Platform 4x8', available: 20, sku: 'STR-002', condition: 'Fair' },
];

export default function CheckOutPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Project details form state
    const [projectDetails, setProjectDetails] = useState({
        projectName: '',
        checkoutDate: '',
        expectedReturn: '',
        assignedTo: '',
        location: '',
        notes: ''
    });

    // Form validation errors
    const [errors, setErrors] = useState<Record<string, string>>({});

    const steps = [
        { step: 1, label: 'Select Items' },
        { step: 2, label: 'Project Details' },
        { step: 3, label: 'Condition Check' },
        { step: 4, label: 'Confirm' },
    ];

    const filteredItems = availableItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addItem = (item: InventoryItem) => {
        const existing = selectedItems.find(s => s.item.id === item.id);
        if (existing) {
            if (existing.quantity < item.available) {
                setSelectedItems(selectedItems.map(s =>
                    s.item.id === item.id
                        ? { ...s, quantity: s.quantity + 1 }
                        : s
                ));
            }
        } else {
            setSelectedItems([...selectedItems, {
                item,
                quantity: 1,
                conditionNotes: '',
                photos: []
            }]);
        }
    };

    const removeItem = (itemId: string) => {
        setSelectedItems(selectedItems.filter(s => s.item.id !== itemId));
    };

    const updateQuantity = (itemId: string, delta: number) => {
        setSelectedItems(selectedItems.map(s => {
            if (s.item.id === itemId) {
                const newQty = Math.max(1, Math.min(s.item.available, s.quantity + delta));
                return { ...s, quantity: newQty };
            }
            return s;
        }));
    };

    const updateConditionNotes = (itemId: string, notes: string) => {
        setSelectedItems(selectedItems.map(s =>
            s.item.id === itemId ? { ...s, conditionNotes: notes } : s
        ));
    };

    const validateStep = (step: number): boolean => {
        const newErrors: Record<string, string> = {};

        if (step === 1) {
            if (selectedItems.length === 0) {
                newErrors.items = 'Please select at least one item';
            }
        } else if (step === 2) {
            if (!projectDetails.projectName.trim()) {
                newErrors.projectName = 'Project name is required';
            }
            if (!projectDetails.checkoutDate) {
                newErrors.checkoutDate = 'Check-out date is required';
            }
            if (!projectDetails.expectedReturn) {
                newErrors.expectedReturn = 'Expected return date is required';
            }
            if (!projectDetails.assignedTo.trim()) {
                newErrors.assignedTo = 'Assigned person is required';
            }
            if (!projectDetails.location.trim()) {
                newErrors.location = 'Location is required';
            }
            if (projectDetails.expectedReturn && projectDetails.checkoutDate) {
                if (new Date(projectDetails.expectedReturn) < new Date(projectDetails.checkoutDate)) {
                    newErrors.expectedReturn = 'Return date must be after check-out date';
                }
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            if (currentStep < 4) {
                setCurrentStep(currentStep + 1);
            }
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleConfirm = () => {
        setShowSuccessModal(true);
    };

    const resetForm = () => {
        setSelectedItems([]);
        setProjectDetails({
            projectName: '',
            checkoutDate: '',
            expectedReturn: '',
            assignedTo: '',
            location: '',
            notes: ''
        });
        setCurrentStep(1);
        setShowSuccessModal(false);
        setErrors({});
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-black dark:text-white">Check-Out Equipment</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Assign inventory items to projects</p>
            </motion.div>

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
                                currentStep >= item.step ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-500'
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
                        {/* Left: Item Selection */}
                        <div className="lg:col-span-2 space-y-4">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search inventory items..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                                />
                            </div>

                            {/* Available Items */}
                            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6">
                                <h3 className="font-bold text-black dark:text-white mb-4">Available Items</h3>
                                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                                    {filteredItems.map((item) => {
                                        const selected = selectedItems.find(s => s.item.id === item.id);
                                        return (
                                            <div
                                                key={item.sku}
                                                className={`flex items-center justify-between p-3 rounded-lg border-2 transition-colors ${
                                                    selected
                                                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-950'
                                                        : 'border-gray-200 dark:border-gray-800 hover:border-orange-500'
                                                }`}
                                            >
                                                <div>
                                                    <p className="font-medium text-black dark:text-white">{item.name}</p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        SKU: {item.sku} • {item.available} available • {item.condition}
                                                    </p>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    onClick={() => addItem(item)}
                                                    disabled={selected && selected.quantity >= item.available}
                                                    className={selected
                                                        ? 'bg-orange-500 hover:bg-orange-600 text-white'
                                                        : 'border-gray-200 dark:border-gray-700 hover:border-orange-500'
                                                    }
                                                    variant={selected ? 'default' : 'outline'}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Right: Selected Items */}
                        <div className="space-y-4">
                            <div className="rounded-xl border-2 border-orange-500 bg-white dark:bg-black p-6">
                                <h3 className="font-bold text-black dark:text-white mb-4">
                                    Selected Items ({selectedItems.length})
                                </h3>
                                {selectedItems.length === 0 ? (
                                    <div className="text-center py-8">
                                        <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                                        <p className="text-gray-500 dark:text-gray-500">No items selected</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3 max-h-[400px] overflow-y-auto">
                                        {selectedItems.map((selected) => (
                                            <div
                                                key={selected.item.id}
                                                className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900"
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <p className="font-medium text-black dark:text-white text-sm">
                                                            {selected.item.name}
                                                        </p>
                                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                                            SKU: {selected.item.sku}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(selected.item.id)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-gray-600 dark:text-gray-400">Quantity:</span>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => updateQuantity(selected.item.id, -1)}
                                                            className="w-6 h-6 rounded bg-gray-200 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-700"
                                                        >
                                                            <Minus className="h-3 w-3 text-black dark:text-white" />
                                                        </button>
                                                        <span className="text-sm font-bold text-black dark:text-white w-8 text-center">
                                                            {selected.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(selected.item.id, 1)}
                                                            className="w-6 h-6 rounded bg-gray-200 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-700"
                                                        >
                                                            <Plus className="h-3 w-3 text-black dark:text-white" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {errors.items && (
                                    <p className="text-red-500 text-sm mt-2">{errors.items}</p>
                                )}
                            </div>

                            <Button
                                onClick={nextStep}
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                                disabled={selectedItems.length === 0}
                            >
                                Continue to Project Details
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
                        className="max-w-2xl mx-auto"
                    >
                        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6 space-y-4">
                            <h3 className="font-bold text-black dark:text-white mb-4">Project Information</h3>

                            <div>
                                <Label className="text-black dark:text-white">Project Name *</Label>
                                <Input
                                    value={projectDetails.projectName}
                                    onChange={(e) => setProjectDetails({ ...projectDetails, projectName: e.target.value })}
                                    placeholder="Enter project name"
                                    className="mt-1 border-gray-200 dark:border-gray-700"
                                />
                                {errors.projectName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.projectName}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-black dark:text-white">
                                        <Calendar className="h-4 w-4 inline mr-1" />
                                        Check-Out Date *
                                    </Label>
                                    <Input
                                        type="date"
                                        value={projectDetails.checkoutDate}
                                        onChange={(e) => setProjectDetails({ ...projectDetails, checkoutDate: e.target.value })}
                                        className="mt-1 border-gray-200 dark:border-gray-700"
                                    />
                                    {errors.checkoutDate && (
                                        <p className="text-red-500 text-sm mt-1">{errors.checkoutDate}</p>
                                    )}
                                </div>

                                <div>
                                    <Label className="text-black dark:text-white">
                                        <Calendar className="h-4 w-4 inline mr-1" />
                                        Expected Return *
                                    </Label>
                                    <Input
                                        type="date"
                                        value={projectDetails.expectedReturn}
                                        onChange={(e) => setProjectDetails({ ...projectDetails, expectedReturn: e.target.value })}
                                        className="mt-1 border-gray-200 dark:border-gray-700"
                                    />
                                    {errors.expectedReturn && (
                                        <p className="text-red-500 text-sm mt-1">{errors.expectedReturn}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <Label className="text-black dark:text-white">
                                    <User className="h-4 w-4 inline mr-1" />
                                    Assigned To *
                                </Label>
                                <Input
                                    value={projectDetails.assignedTo}
                                    onChange={(e) => setProjectDetails({ ...projectDetails, assignedTo: e.target.value })}
                                    placeholder="Team member name"
                                    className="mt-1 border-gray-200 dark:border-gray-700"
                                />
                                {errors.assignedTo && (
                                    <p className="text-red-500 text-sm mt-1">{errors.assignedTo}</p>
                                )}
                            </div>

                            <div>
                                <Label className="text-black dark:text-white">
                                    <MapPin className="h-4 w-4 inline mr-1" />
                                    Location *
                                </Label>
                                <Input
                                    value={projectDetails.location}
                                    onChange={(e) => setProjectDetails({ ...projectDetails, location: e.target.value })}
                                    placeholder="Event venue or site"
                                    className="mt-1 border-gray-200 dark:border-gray-700"
                                />
                                {errors.location && (
                                    <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                                )}
                            </div>

                            <div>
                                <Label className="text-black dark:text-white">
                                    <FileText className="h-4 w-4 inline mr-1" />
                                    Additional Notes
                                </Label>
                                <textarea
                                    value={projectDetails.notes}
                                    onChange={(e) => setProjectDetails({ ...projectDetails, notes: e.target.value })}
                                    placeholder="Any special instructions or notes..."
                                    className="mt-1 w-full min-h-[100px] px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 resize-none"
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
                                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                            >
                                Continue to Condition Check
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
                        className="max-w-3xl mx-auto"
                    >
                        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6">
                            <h3 className="font-bold text-black dark:text-white mb-4">Pre-Check-Out Condition Assessment</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                                Document the current condition of each item before check-out
                            </p>

                            <div className="space-y-6">
                                {selectedItems.map((selected, index) => (
                                    <motion.div
                                        key={selected.item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="p-4 rounded-lg border border-gray-200 dark:border-gray-800"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <p className="font-medium text-black dark:text-white">
                                                    {selected.item.name}
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Quantity: {selected.quantity} • Current Condition: {selected.item.condition}
                                                </p>
                                            </div>
                                            <span className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400">
                                                Ready
                                            </span>
                                        </div>

                                        <div className="space-y-3">
                                            <div>
                                                <Label className="text-sm text-gray-700 dark:text-gray-300">Condition Notes</Label>
                                                <textarea
                                                    value={selected.conditionNotes}
                                                    onChange={(e) => updateConditionNotes(selected.item.id, e.target.value)}
                                                    placeholder="Note any existing damage, wear, or issues..."
                                                    className="mt-1 w-full min-h-[60px] px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white text-sm focus:border-orange-500 focus:outline-none resize-none"
                                                />
                                            </div>

                                            <div>
                                                <Label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                                                    <Camera className="h-4 w-4 inline mr-1" />
                                                    Photo Documentation (Optional)
                                                </Label>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="border-gray-200 dark:border-gray-700 hover:border-orange-500"
                                                    >
                                                        <Camera className="h-4 w-4 mr-2" />
                                                        Add Photo
                                                    </Button>
                                                    <div className="flex gap-2">
                                                        {[1, 2].map((i) => (
                                                            <div
                                                                key={i}
                                                                className="w-10 h-10 rounded border border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center"
                                                            >
                                                                <Plus className="h-4 w-4 text-gray-400" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
                                    <h3 className="font-bold text-black dark:text-white">Review Check-Out Details</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Please review all details before confirming
                                    </p>
                                </div>
                            </div>

                            {/* Project Summary */}
                            <div className="mb-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
                                <h4 className="font-semibold text-black dark:text-white mb-3">Project Details</h4>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <span className="text-gray-600 dark:text-gray-400">Project:</span>
                                        <p className="font-medium text-black dark:text-white">{projectDetails.projectName}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600 dark:text-gray-400">Assigned To:</span>
                                        <p className="font-medium text-black dark:text-white">{projectDetails.assignedTo}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600 dark:text-gray-400">Check-Out Date:</span>
                                        <p className="font-medium text-black dark:text-white">
                                            {new Date(projectDetails.checkoutDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600 dark:text-gray-400">Expected Return:</span>
                                        <p className="font-medium text-black dark:text-white">
                                            {new Date(projectDetails.expectedReturn).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-gray-600 dark:text-gray-400">Location:</span>
                                        <p className="font-medium text-black dark:text-white">{projectDetails.location}</p>
                                    </div>
                                    {projectDetails.notes && (
                                        <div className="col-span-2">
                                            <span className="text-gray-600 dark:text-gray-400">Notes:</span>
                                            <p className="font-medium text-black dark:text-white">{projectDetails.notes}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Items Summary */}
                            <div>
                                <h4 className="font-semibold text-black dark:text-white mb-3">
                                    Items ({selectedItems.length})
                                </h4>
                                <div className="space-y-2">
                                    {selectedItems.map((selected) => (
                                        <div
                                            key={selected.item.id}
                                            className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-800"
                                        >
                                            <div>
                                                <p className="font-medium text-black dark:text-white">{selected.item.name}</p>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                                    SKU: {selected.item.sku}
                                                    {selected.conditionNotes && ` • Notes: ${selected.conditionNotes}`}
                                                </p>
                                            </div>
                                            <span className="text-sm font-bold text-orange-500">
                                                x{selected.quantity}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 p-4 rounded-lg bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                                    <div className="text-sm">
                                        <p className="font-medium text-orange-700 dark:text-orange-400">Important</p>
                                        <p className="text-orange-600 dark:text-orange-500">
                                            By confirming this check-out, you acknowledge that all items have been inspected
                                            and documented. The assigned person will be responsible for these items.
                                        </p>
                                    </div>
                                </div>
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
                                onClick={handleConfirm}
                                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                            >
                                <Check className="h-4 w-4 mr-2" />
                                Confirm Check-Out
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

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
                                Check-Out Successful!
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                {selectedItems.length} item(s) have been checked out to{' '}
                                <span className="font-semibold text-black dark:text-white">
                                    {projectDetails.projectName}
                                </span>
                            </p>
                            <div className="space-y-3">
                                <Button
                                    onClick={resetForm}
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                                >
                                    Create Another Check-Out
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setShowSuccessModal(false)}
                                    className="w-full border-gray-200 dark:border-gray-700"
                                >
                                    View Check-Out Details
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
