'use client';

import { motion } from 'framer-motion';
import {
    PackageMinus,
    Search,
    Calendar,
    User,
    MapPin,
    Plus,
    X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CheckOutPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-black">Check-Out Equipment</h1>
                <p className="text-gray-600 mt-1">Assign inventory items to projects</p>
            </motion.div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
                {[
                    { step: 1, label: 'Select Items', active: true },
                    { step: 2, label: 'Project Details', active: false },
                    { step: 3, label: 'Condition Check', active: false },
                    { step: 4, label: 'Confirm', active: false },
                ].map((item, index) => (
                    <div key={item.step} className="flex items-center flex-1">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                                item.active
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-gray-200 text-gray-600'
                            }`}>
                                {item.step}
                            </div>
                            <span className={`font-medium ${item.active ? 'text-black' : 'text-gray-500'}`}>
                                {item.label}
                            </span>
                        </div>
                        {index < 3 && (
                            <div className="flex-1 h-0.5 bg-gray-200 mx-4" />
                        )}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Item Selection */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search inventory items..."
                            className="pl-10 border-gray-200"
                        />
                    </div>

                    {/* Available Items */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <h3 className="font-bold text-black mb-4">Available Items</h3>
                        <div className="space-y-3">
                            {[
                                { name: 'LED Moving Head Light', available: 18, sku: 'ELC-001' },
                                { name: 'Truss System 10ft', available: 10, sku: 'STR-001' },
                                { name: '4K Projector', available: 5, sku: 'AV-001' },
                                { name: 'Chiavari Chair', available: 350, sku: 'FUR-001' },
                            ].map((item) => (
                                <div
                                    key={item.sku}
                                    className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-orange-500 transition-colors cursor-pointer"
                                >
                                    <div>
                                        <p className="font-medium text-black">{item.name}</p>
                                        <p className="text-sm text-gray-600">SKU: {item.sku} • {item.available} available</p>
                                    </div>
                                    <Button size="sm" variant="outline" className="border-gray-200 hover:border-orange-500">
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Selected Items */}
                <div className="space-y-4">
                    <div className="rounded-xl border-2 border-orange-500 bg-white p-6">
                        <h3 className="font-bold text-black mb-4">Selected Items (0)</h3>
                        <div className="text-center py-8 text-gray-500">
                            No items selected
                        </div>
                    </div>

                    {/* Project Info */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
                        <h3 className="font-bold text-black mb-4">Project Information</h3>

                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                                Project Name
                            </label>
                            <Input placeholder="Enter project name" />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                                <Calendar className="h-4 w-4 inline mr-1" />
                                Check-Out Date
                            </label>
                            <Input type="date" />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                                <Calendar className="h-4 w-4 inline mr-1" />
                                Expected Return
                            </label>
                            <Input type="date" />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                                <User className="h-4 w-4 inline mr-1" />
                                Assigned To
                            </label>
                            <Input placeholder="Team member name" />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                                <MapPin className="h-4 w-4 inline mr-1" />
                                Location
                            </label>
                            <Input placeholder="Event venue" />
                        </div>

                        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white" disabled>
                            Continue to Condition Check
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
