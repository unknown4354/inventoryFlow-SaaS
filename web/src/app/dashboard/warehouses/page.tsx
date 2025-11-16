'use client';

import { motion } from 'framer-motion';
import {
    Warehouse,
    Plus,
    Search,
    MapPin,
    Package,
    TrendingUp,
    AlertTriangle,
    Users,
    Thermometer,
    Shield,
    Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function WarehousesPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start justify-between"
            >
                <div>
                    <h1 className="text-3xl font-bold text-black">Warehouses</h1>
                    <p className="text-gray-600 mt-1">Manage storage facilities and inventory distribution</p>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Warehouse
                </Button>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Warehouses', value: '6', icon: Warehouse, color: 'orange', detail: '3 active, 3 standby' },
                    { label: 'Total Capacity', value: '2,850', icon: Package, color: 'blue', detail: 'items capacity' },
                    { label: 'Current Stock', value: '1,150', icon: TrendingUp, color: 'green', detail: '40% utilization' },
                    { label: 'Staff Members', value: '24', icon: Users, color: 'purple', detail: 'Across all locations' },
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
                        <p className="text-xs text-gray-500 mt-1">{stat.detail}</p>
                    </motion.div>
                ))}
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    placeholder="Search warehouses..."
                    className="pl-10 border-gray-200"
                />
            </div>

            {/* Warehouses Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[
                    {
                        name: 'Main Warehouse - Andheri',
                        location: 'Andheri East, Mumbai, Maharashtra',
                        capacity: 850,
                        current: 680,
                        staff: 8,
                        temperature: '22°C',
                        humidity: '45%',
                        status: 'Optimal',
                        categories: ['AV Equipment', 'Lighting', 'Staging'],
                        security: 'High',
                        lastInspection: '2 days ago'
                    },
                    {
                        name: 'South Warehouse - Bandra',
                        location: 'Bandra West, Mumbai, Maharashtra',
                        capacity: 650,
                        current: 425,
                        staff: 6,
                        temperature: '23°C',
                        humidity: '48%',
                        status: 'Good',
                        categories: ['Furniture', 'Decor', 'Tenting'],
                        security: 'High',
                        lastInspection: '1 week ago'
                    },
                    {
                        name: 'North Distribution Center',
                        location: 'Goregaon West, Mumbai, Maharashtra',
                        capacity: 500,
                        current: 45,
                        staff: 4,
                        temperature: '24°C',
                        humidity: '52%',
                        status: 'Warning',
                        categories: ['Catering', 'Miscellaneous'],
                        security: 'Medium',
                        lastInspection: '3 days ago'
                    },
                    {
                        name: 'Premium Storage - Powai',
                        location: 'Powai, Mumbai, Maharashtra',
                        capacity: 400,
                        current: 0,
                        staff: 3,
                        temperature: '21°C',
                        humidity: '42%',
                        status: 'Optimal',
                        categories: ['High-Value Equipment'],
                        security: 'Maximum',
                        lastInspection: '1 day ago'
                    },
                    {
                        name: 'East Facility - Navi Mumbai',
                        location: 'Vashi, Navi Mumbai, Maharashtra',
                        capacity: 300,
                        current: 0,
                        staff: 2,
                        temperature: '22°C',
                        humidity: '44%',
                        status: 'Standby',
                        categories: ['Overflow Storage'],
                        security: 'Medium',
                        lastInspection: '5 days ago'
                    },
                    {
                        name: 'Workshop & Maintenance',
                        location: 'Kurla, Mumbai, Maharashtra',
                        capacity: 150,
                        current: 0,
                        staff: 5,
                        temperature: '25°C',
                        humidity: '50%',
                        status: 'Active',
                        categories: ['Repairs', 'Maintenance'],
                        security: 'High',
                        lastInspection: 'Today'
                    },
                ].map((warehouse, index) => {
                    const utilizationPercent = (warehouse.current / warehouse.capacity) * 100;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="rounded-xl border border-gray-200 bg-white p-6 hover:border-orange-500 transition-all cursor-pointer group"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-3 rounded-lg bg-orange-100 group-hover:bg-orange-200 transition-colors">
                                        <Warehouse className="h-6 w-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-black group-hover:text-orange-500 transition-colors">
                                            {warehouse.name}
                                        </h3>
                                        <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                                            <MapPin className="h-3 w-3" />
                                            <span>{warehouse.location}</span>
                                        </div>
                                    </div>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                    warehouse.status === 'Optimal' ? 'bg-green-100 text-green-700' :
                                    warehouse.status === 'Good' ? 'bg-blue-100 text-blue-700' :
                                    warehouse.status === 'Warning' ? 'bg-orange-100 text-orange-700' :
                                    warehouse.status === 'Active' ? 'bg-orange-100 text-orange-700' :
                                    'bg-gray-100 text-gray-700'
                                }`}>
                                    {warehouse.status}
                                </span>
                            </div>

                            {/* Capacity */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-600">Capacity Utilization</span>
                                    <span className="text-sm font-bold text-black">
                                        {warehouse.current} / {warehouse.capacity} items
                                    </span>
                                </div>
                                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all ${
                                            utilizationPercent > 80 ? 'bg-red-500' :
                                            utilizationPercent > 60 ? 'bg-orange-500' :
                                            'bg-green-500'
                                        }`}
                                        style={{ width: `${utilizationPercent}%` }}
                                    />
                                </div>
                                <span className="text-xs text-gray-500 mt-1 block">
                                    {utilizationPercent.toFixed(0)}% utilized
                                </span>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-3 mb-4">
                                <div className="p-3 rounded-lg bg-gray-50">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Thermometer className="h-4 w-4 text-gray-600" />
                                        <span className="text-xs text-gray-600">Temp</span>
                                    </div>
                                    <p className="text-sm font-bold text-black">{warehouse.temperature}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-gray-50">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Zap className="h-4 w-4 text-gray-600" />
                                        <span className="text-xs text-gray-600">Humidity</span>
                                    </div>
                                    <p className="text-sm font-bold text-black">{warehouse.humidity}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-gray-50">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Users className="h-4 w-4 text-gray-600" />
                                        <span className="text-xs text-gray-600">Staff</span>
                                    </div>
                                    <p className="text-sm font-bold text-black">{warehouse.staff}</p>
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="mb-4">
                                <p className="text-xs text-gray-600 mb-2">Storage Categories</p>
                                <div className="flex flex-wrap gap-1">
                                    {warehouse.categories.map((cat, i) => (
                                        <span
                                            key={i}
                                            className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
                                        >
                                            {cat}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-2">
                                    <Shield className={`h-4 w-4 ${
                                        warehouse.security === 'Maximum' ? 'text-green-500' :
                                        warehouse.security === 'High' ? 'text-blue-500' :
                                        'text-orange-500'
                                    }`} />
                                    <span className="text-xs text-gray-600">
                                        {warehouse.security} Security
                                    </span>
                                </div>
                                <span className="text-xs text-gray-500">
                                    Inspected: {warehouse.lastInspection}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Inventory Distribution */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="rounded-xl border border-gray-200 bg-white p-6"
            >
                <h3 className="font-bold text-black mb-6">Inventory Distribution Across Warehouses</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-600">By Category</h4>
                        <div className="space-y-2">
                            {[
                                { category: 'AV Equipment', count: 280, warehouses: 2 },
                                { category: 'Lighting', count: 245, warehouses: 2 },
                                { category: 'Furniture', count: 320, warehouses: 1 },
                                { category: 'Decor', count: 180, warehouses: 1 },
                                { category: 'Staging', count: 125, warehouses: 1 },
                            ].map((item) => (
                                <div key={item.category} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                                    <div>
                                        <span className="text-sm font-medium text-black">{item.category}</span>
                                        <p className="text-xs text-gray-500">{item.warehouses} warehouse(s)</p>
                                    </div>
                                    <span className="text-sm font-bold text-black">{item.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-600">Utilization by Location</h4>
                        <div className="space-y-3">
                            {[
                                { name: 'Andheri', percent: 80, color: 'orange' },
                                { name: 'Bandra', percent: 65, color: 'blue' },
                                { name: 'Goregaon', percent: 9, color: 'green' },
                            ].map((location) => (
                                <div key={location.name}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm text-gray-700">{location.name}</span>
                                        <span className="text-sm font-bold text-black">{location.percent}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${
                                                location.color === 'orange' ? 'bg-orange-500' :
                                                location.color === 'blue' ? 'bg-blue-500' :
                                                'bg-green-500'
                                            }`}
                                            style={{ width: `${location.percent}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-600">Recent Activity</h4>
                        <div className="space-y-2">
                            {[
                                { action: 'Items transferred', from: 'Andheri', to: 'Bandra', time: '2 hours ago' },
                                { action: 'Inspection completed', from: 'Workshop', to: '', time: 'Today' },
                                { action: 'New stock received', from: 'Andheri', to: '', time: 'Yesterday' },
                            ].map((activity, i) => (
                                <div key={i} className="p-2 rounded-lg bg-gray-50">
                                    <p className="text-sm font-medium text-black">{activity.action}</p>
                                    <p className="text-xs text-gray-600 mt-1">
                                        {activity.from} {activity.to && `→ ${activity.to}`}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Alerts */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="rounded-xl border border-orange-200 bg-orange-50 p-6"
            >
                <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    <h3 className="font-bold text-black">Warehouse Alerts</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-white border border-orange-200">
                        <p className="font-medium text-black">High Utilization Warning</p>
                        <p className="text-sm text-gray-600 mt-1">
                            Main Warehouse - Andheri is at 80% capacity. Consider redistributing inventory.
                        </p>
                    </div>
                    <div className="p-4 rounded-lg bg-white border border-orange-200">
                        <p className="font-medium text-black">Humidity Alert</p>
                        <p className="text-sm text-gray-600 mt-1">
                            North Distribution Center humidity levels above optimal range.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
