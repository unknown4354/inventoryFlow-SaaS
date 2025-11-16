'use client';

import { motion } from 'framer-motion';
import {
    PackagePlus,
    Search,
    CheckCircle,
    AlertTriangle,
    Calendar,
    User,
    Camera,
    FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CheckInPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-black">Check-In Equipment</h1>
                <p className="text-gray-600 mt-1">Return inventory items from projects</p>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Due Today', value: '18', icon: Calendar, color: 'orange' },
                    { label: 'Overdue', value: '3', icon: AlertTriangle, color: 'red' },
                    { label: 'Checked In Today', value: '24', icon: CheckCircle, color: 'green' },
                    { label: 'Pending Return', value: '42', icon: PackagePlus, color: 'gray' },
                ].map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-xl border border-gray-200 bg-white p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">{stat.label}</p>
                                <p className="text-2xl font-bold text-black mt-1">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-lg ${
                                stat.color === 'orange' ? 'bg-orange-100' :
                                stat.color === 'red' ? 'bg-red-100' :
                                stat.color === 'green' ? 'bg-green-100' :
                                'bg-gray-100'
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
                {[
                    { step: 1, label: 'Scan/Select Items', active: true },
                    { step: 2, label: 'Condition Check', active: false },
                    { step: 3, label: 'Document Issues', active: false },
                    { step: 4, label: 'Confirm Return', active: false },
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
                {/* Left: Items to Check-In */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search by SKU, project, or scan barcode..."
                            className="pl-10 border-gray-200"
                        />
                    </div>

                    {/* Items Due for Return */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <h3 className="font-bold text-black mb-4">Items Due for Return</h3>
                        <div className="space-y-3">
                            {[
                                { name: 'LED Moving Head Light', qty: 12, project: 'Tech Summit 2024', dueDate: 'Today', status: 'due' },
                                { name: 'Truss System 10ft', qty: 6, project: 'Tech Summit 2024', dueDate: 'Today', status: 'due' },
                                { name: '4K Projector', qty: 2, project: 'Corporate Gala', dueDate: '2 days ago', status: 'overdue' },
                                { name: 'Chiavari Chair', qty: 150, project: 'Conference 2024', dueDate: 'Tomorrow', status: 'upcoming' },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                                        item.status === 'overdue'
                                            ? 'border-red-300 bg-red-50 hover:border-red-500'
                                            : item.status === 'due'
                                            ? 'border-orange-300 bg-orange-50 hover:border-orange-500'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <p className="font-medium text-black">{item.name}</p>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Quantity: {item.qty} • Project: {item.project}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Calendar className="h-3 w-3 text-gray-500" />
                                                <span className={`text-xs font-medium ${
                                                    item.status === 'overdue' ? 'text-red-600' :
                                                    item.status === 'due' ? 'text-orange-600' :
                                                    'text-gray-600'
                                                }`}>
                                                    Due: {item.dueDate}
                                                </span>
                                            </div>
                                        </div>
                                        <Button
                                            size="sm"
                                            className={`${
                                                item.status === 'overdue' || item.status === 'due'
                                                    ? 'bg-orange-500 hover:bg-orange-600 text-white'
                                                    : 'bg-white border border-gray-200 hover:border-orange-500 text-black'
                                            }`}
                                        >
                                            Check In
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Check-In Details */}
                <div className="space-y-4">
                    <div className="rounded-xl border-2 border-orange-500 bg-white p-6">
                        <h3 className="font-bold text-black mb-4">Check-In Details</h3>
                        <div className="text-center py-8 text-gray-500">
                            Select items to check in
                        </div>
                    </div>

                    {/* Condition Assessment */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
                        <h3 className="font-bold text-black mb-4">Condition Assessment</h3>

                        <div className="space-y-3">
                            <button className="w-full p-3 rounded-lg border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 transition-colors text-left">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span className="font-medium text-black">Perfect Condition</span>
                                </div>
                            </button>

                            <button className="w-full p-3 rounded-lg border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-colors text-left">
                                <div className="flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                                    <span className="font-medium text-black">Minor Wear</span>
                                </div>
                            </button>

                            <button className="w-full p-3 rounded-lg border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 transition-colors text-left">
                                <div className="flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-red-500" />
                                    <span className="font-medium text-black">Damaged</span>
                                </div>
                            </button>
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                <FileText className="h-4 w-4 inline mr-1" />
                                Notes (Optional)
                            </label>
                            <textarea
                                className="w-full min-h-[80px] px-3 py-2 rounded-lg border border-gray-200 focus:border-orange-500 focus:outline-none resize-none"
                                placeholder="Add any notes about condition, issues, or repairs needed..."
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                <Camera className="h-4 w-4 inline mr-1" />
                                Upload Photos (Optional)
                            </label>
                            <Button variant="outline" className="w-full border-gray-200 hover:border-orange-500">
                                <Camera className="h-4 w-4 mr-2" />
                                Add Photos
                            </Button>
                        </div>

                        <div className="pt-4">
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                <User className="h-4 w-4 inline mr-1" />
                                Received By
                            </label>
                            <Input placeholder="Your name" />
                        </div>

                        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white" disabled>
                            Complete Check-In
                        </Button>
                    </div>
                </div>
            </div>

            {/* Recent Check-Ins */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-xl border border-gray-200 bg-white p-6"
            >
                <h3 className="font-bold text-black mb-4">Recent Check-Ins</h3>
                <div className="space-y-2">
                    {[
                        { item: 'LED Lights x8', project: 'Corporate Event', time: '10 mins ago', status: 'Perfect' },
                        { item: 'Sound System', project: 'Tech Summit', time: '25 mins ago', status: 'Minor Wear' },
                        { item: 'Chairs x50', project: 'Wedding', time: '1 hour ago', status: 'Perfect' },
                    ].map((checkin, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <CheckCircle className={`h-5 w-5 ${
                                    checkin.status === 'Perfect' ? 'text-green-500' : 'text-orange-500'
                                }`} />
                                <div>
                                    <p className="font-medium text-black">{checkin.item}</p>
                                    <p className="text-sm text-gray-600">From: {checkin.project}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                    checkin.status === 'Perfect'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-orange-100 text-orange-700'
                                }`}>
                                    {checkin.status}
                                </span>
                                <p className="text-xs text-gray-500 mt-1">{checkin.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
