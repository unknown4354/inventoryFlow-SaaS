'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    Zap,
    X,
    Edit2,
    Trash2,
    AlertCircle,
    ArrowRightLeft,
    UserPlus,
    Settings,
    Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface WarehouseData {
    id: string;
    name: string;
    location: string;
    capacity: number;
    current: number;
    staff: number;
    temperature: string;
    humidity: string;
    status: 'Optimal' | 'Good' | 'Warning' | 'Active' | 'Standby';
    categories: string[];
    security: 'Maximum' | 'High' | 'Medium';
    lastInspection: string;
    manager: string;
    contact: string;
}

interface StaffMember {
    id: string;
    name: string;
    role: string;
    phone: string;
}

export default function WarehousesPage() {
    const [warehouses, setWarehouses] = useState<WarehouseData[]>([
        {
            id: '1',
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
            lastInspection: '2 days ago',
            manager: 'Rahul Mehta',
            contact: '+91 98765 43220'
        },
        {
            id: '2',
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
            lastInspection: '1 week ago',
            manager: 'Priya Desai',
            contact: '+91 98765 43221'
        },
        {
            id: '3',
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
            lastInspection: '3 days ago',
            manager: 'Amit Singh',
            contact: '+91 98765 43222'
        },
        {
            id: '4',
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
            lastInspection: '1 day ago',
            manager: 'Vikram Joshi',
            contact: '+91 98765 43223'
        },
        {
            id: '5',
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
            lastInspection: '5 days ago',
            manager: 'Neha Verma',
            contact: '+91 98765 43224'
        },
        {
            id: '6',
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
            lastInspection: 'Today',
            manager: 'Suresh Patil',
            contact: '+91 98765 43225'
        },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [showAddWarehouseModal, setShowAddWarehouseModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetailsDrawer, setShowDetailsDrawer] = useState(false);
    const [showTransferModal, setShowTransferModal] = useState(false);
    const [showStaffModal, setShowStaffModal] = useState(false);
    const [showAlertSettingsModal, setShowAlertSettingsModal] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState<WarehouseData | null>(null);

    const [newWarehouse, setNewWarehouse] = useState({
        name: '',
        location: '',
        capacity: '',
        manager: '',
        contact: '',
        security: 'High' as 'Maximum' | 'High' | 'Medium',
        categories: ''
    });

    const [transferForm, setTransferForm] = useState({
        sourceWarehouse: '',
        destinationWarehouse: '',
        itemCount: '',
        itemCategory: ''
    });

    const [newStaffMember, setNewStaffMember] = useState({
        name: '',
        role: '',
        phone: ''
    });

    const [warehouseStaff] = useState<StaffMember[]>([
        { id: '1', name: 'Rahul Mehta', role: 'Manager', phone: '+91 98765 43220' },
        { id: '2', name: 'Sanjay Kumar', role: 'Supervisor', phone: '+91 98765 43230' },
        { id: '3', name: 'Deepak Sharma', role: 'Inventory Clerk', phone: '+91 98765 43231' },
        { id: '4', name: 'Pooja Nair', role: 'Quality Inspector', phone: '+91 98765 43232' },
    ]);

    const [alertSettings, setAlertSettings] = useState({
        capacityThreshold: '80',
        temperatureMin: '18',
        temperatureMax: '26',
        humidityMax: '55'
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateWarehouseForm = () => {
        const newErrors: Record<string, string> = {};
        if (!newWarehouse.name.trim()) newErrors.name = 'Warehouse name is required';
        if (!newWarehouse.location.trim()) newErrors.location = 'Location is required';
        if (!newWarehouse.capacity || parseInt(newWarehouse.capacity) <= 0) {
            newErrors.capacity = 'Valid capacity is required';
        }
        if (!newWarehouse.manager.trim()) newErrors.manager = 'Manager name is required';
        if (!newWarehouse.contact.trim()) newErrors.contact = 'Contact is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddWarehouse = () => {
        if (!validateWarehouseForm()) return;

        const warehouse: WarehouseData = {
            id: Date.now().toString(),
            name: newWarehouse.name,
            location: newWarehouse.location,
            capacity: parseInt(newWarehouse.capacity),
            current: 0,
            staff: 0,
            temperature: '22°C',
            humidity: '45%',
            status: 'Standby',
            categories: newWarehouse.categories.split(',').map(c => c.trim()).filter(c => c),
            security: newWarehouse.security,
            lastInspection: 'Today',
            manager: newWarehouse.manager,
            contact: newWarehouse.contact
        };

        setWarehouses([...warehouses, warehouse]);
        setShowAddWarehouseModal(false);
        setNewWarehouse({ name: '', location: '', capacity: '', manager: '', contact: '', security: 'High', categories: '' });
        setErrors({});
    };

    const handleUpdateWarehouse = () => {
        if (!selectedWarehouse) return;
        if (!validateWarehouseForm()) return;

        setWarehouses(warehouses.map(w =>
            w.id === selectedWarehouse.id
                ? {
                    ...w,
                    name: newWarehouse.name,
                    location: newWarehouse.location,
                    capacity: parseInt(newWarehouse.capacity),
                    manager: newWarehouse.manager,
                    contact: newWarehouse.contact,
                    security: newWarehouse.security,
                    categories: newWarehouse.categories.split(',').map(c => c.trim()).filter(c => c)
                }
                : w
        ));
        setShowEditModal(false);
        setSelectedWarehouse(null);
        setNewWarehouse({ name: '', location: '', capacity: '', manager: '', contact: '', security: 'High', categories: '' });
        setErrors({});
    };

    const handleDeleteWarehouse = () => {
        if (!selectedWarehouse) return;
        setWarehouses(warehouses.filter(w => w.id !== selectedWarehouse.id));
        setShowDeleteModal(false);
        setSelectedWarehouse(null);
    };

    const openEditModal = (warehouse: WarehouseData) => {
        setSelectedWarehouse(warehouse);
        setNewWarehouse({
            name: warehouse.name,
            location: warehouse.location,
            capacity: warehouse.capacity.toString(),
            manager: warehouse.manager,
            contact: warehouse.contact,
            security: warehouse.security,
            categories: warehouse.categories.join(', ')
        });
        setShowEditModal(true);
    };

    const handleTransfer = () => {
        if (!transferForm.sourceWarehouse || !transferForm.destinationWarehouse || !transferForm.itemCount) {
            return;
        }

        const count = parseInt(transferForm.itemCount);
        setWarehouses(warehouses.map(w => {
            if (w.id === transferForm.sourceWarehouse) {
                return { ...w, current: Math.max(0, w.current - count) };
            }
            if (w.id === transferForm.destinationWarehouse) {
                return { ...w, current: Math.min(w.capacity, w.current + count) };
            }
            return w;
        }));

        setShowTransferModal(false);
        setTransferForm({ sourceWarehouse: '', destinationWarehouse: '', itemCount: '', itemCategory: '' });
    };

    const filteredWarehouses = warehouses.filter(w =>
        w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalCapacity = warehouses.reduce((sum, w) => sum + w.capacity, 0);
    const totalCurrent = warehouses.reduce((sum, w) => sum + w.current, 0);
    const totalStaff = warehouses.reduce((sum, w) => sum + w.staff, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start justify-between"
            >
                <div>
                    <h1 className="text-3xl font-bold text-black dark:text-white">Warehouses</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Manage storage facilities and inventory distribution</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="border-gray-200 dark:border-gray-700"
                        onClick={() => setShowTransferModal(true)}
                    >
                        <ArrowRightLeft className="h-4 w-4 mr-2" />
                        Transfer
                    </Button>
                    <Button
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                        onClick={() => setShowAddWarehouseModal(true)}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Warehouse
                    </Button>
                </div>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Warehouses', value: warehouses.length.toString(), icon: Warehouse, color: 'orange', detail: `${warehouses.filter(w => w.status !== 'Standby').length} active` },
                    { label: 'Total Capacity', value: totalCapacity.toLocaleString(), icon: Package, color: 'blue', detail: 'items capacity' },
                    { label: 'Current Stock', value: totalCurrent.toLocaleString(), icon: TrendingUp, color: 'green', detail: `${((totalCurrent / totalCapacity) * 100).toFixed(0)}% utilization` },
                    { label: 'Staff Members', value: totalStaff.toString(), icon: Users, color: 'purple', detail: 'Across all locations' },
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
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{stat.detail}</p>
                    </motion.div>
                ))}
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    placeholder="Search warehouses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                />
            </div>

            {/* Warehouses Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredWarehouses.map((warehouse, index) => {
                    const utilizationPercent = (warehouse.current / warehouse.capacity) * 100;

                    return (
                        <motion.div
                            key={warehouse.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6 hover:border-orange-500 transition-all cursor-pointer group"
                            onClick={() => {
                                setSelectedWarehouse(warehouse);
                                setShowDetailsDrawer(true);
                            }}
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/30 group-hover:bg-orange-200 dark:group-hover:bg-orange-900/50 transition-colors">
                                        <Warehouse className="h-6 w-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-black dark:text-white group-hover:text-orange-500 transition-colors">
                                            {warehouse.name}
                                        </h3>
                                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            <MapPin className="h-3 w-3" />
                                            <span>{warehouse.location}</span>
                                        </div>
                                    </div>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                    warehouse.status === 'Optimal' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                                    warehouse.status === 'Good' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                                    warehouse.status === 'Warning' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' :
                                    warehouse.status === 'Active' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' :
                                    'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                                }`}>
                                    {warehouse.status}
                                </span>
                            </div>

                            {/* Capacity */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Capacity Utilization</span>
                                    <span className="text-sm font-bold text-black dark:text-white">
                                        {warehouse.current} / {warehouse.capacity} items
                                    </span>
                                </div>
                                <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all ${
                                            utilizationPercent > 80 ? 'bg-red-500' :
                                            utilizationPercent > 60 ? 'bg-orange-500' :
                                            'bg-green-500'
                                        }`}
                                        style={{ width: `${utilizationPercent}%` }}
                                    />
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-500 mt-1 block">
                                    {utilizationPercent.toFixed(0)}% utilized
                                </span>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-3 mb-4">
                                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Thermometer className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                        <span className="text-xs text-gray-600 dark:text-gray-400">Temp</span>
                                    </div>
                                    <p className="text-sm font-bold text-black dark:text-white">{warehouse.temperature}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Zap className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                        <span className="text-xs text-gray-600 dark:text-gray-400">Humidity</span>
                                    </div>
                                    <p className="text-sm font-bold text-black dark:text-white">{warehouse.humidity}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Users className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                        <span className="text-xs text-gray-600 dark:text-gray-400">Staff</span>
                                    </div>
                                    <p className="text-sm font-bold text-black dark:text-white">{warehouse.staff}</p>
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="mb-4">
                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Storage Categories</p>
                                <div className="flex flex-wrap gap-1">
                                    {warehouse.categories.map((cat, i) => (
                                        <span
                                            key={i}
                                            className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                                        >
                                            {cat}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-2">
                                    <Shield className={`h-4 w-4 ${
                                        warehouse.security === 'Maximum' ? 'text-green-500' :
                                        warehouse.security === 'High' ? 'text-blue-500' :
                                        'text-orange-500'
                                    }`} />
                                    <span className="text-xs text-gray-600 dark:text-gray-400">
                                        {warehouse.security} Security
                                    </span>
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-500">
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
                className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6"
            >
                <h3 className="font-bold text-black dark:text-white mb-6">Inventory Distribution Across Warehouses</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">By Category</h4>
                        <div className="space-y-2">
                            {[
                                { category: 'AV Equipment', count: 280, warehouses: 2 },
                                { category: 'Lighting', count: 245, warehouses: 2 },
                                { category: 'Furniture', count: 320, warehouses: 1 },
                                { category: 'Decor', count: 180, warehouses: 1 },
                                { category: 'Staging', count: 125, warehouses: 1 },
                            ].map((item) => (
                                <div key={item.category} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-900">
                                    <div>
                                        <span className="text-sm font-medium text-black dark:text-white">{item.category}</span>
                                        <p className="text-xs text-gray-500 dark:text-gray-500">{item.warehouses} warehouse(s)</p>
                                    </div>
                                    <span className="text-sm font-bold text-black dark:text-white">{item.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Utilization by Location</h4>
                        <div className="space-y-3">
                            {warehouses.slice(0, 3).map((warehouse) => {
                                const percent = (warehouse.current / warehouse.capacity) * 100;
                                return (
                                    <div key={warehouse.id}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm text-gray-700 dark:text-gray-300">{warehouse.name.split(' - ')[1] || warehouse.name.split(' ')[0]}</span>
                                            <span className="text-sm font-bold text-black dark:text-white">{percent.toFixed(0)}%</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${
                                                    percent > 70 ? 'bg-orange-500' :
                                                    percent > 40 ? 'bg-blue-500' :
                                                    'bg-green-500'
                                                }`}
                                                style={{ width: `${percent}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Recent Activity</h4>
                        <div className="space-y-2">
                            {[
                                { action: 'Items transferred', from: 'Andheri', to: 'Bandra', time: '2 hours ago' },
                                { action: 'Inspection completed', from: 'Workshop', to: '', time: 'Today' },
                                { action: 'New stock received', from: 'Andheri', to: '', time: 'Yesterday' },
                            ].map((activity, i) => (
                                <div key={i} className="p-2 rounded-lg bg-gray-50 dark:bg-gray-900">
                                    <p className="text-sm font-medium text-black dark:text-white">{activity.action}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                        {activity.from} {activity.to && `→ ${activity.to}`}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{activity.time}</p>
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
                className="rounded-xl border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20 p-6"
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                        <h3 className="font-bold text-black dark:text-white">Warehouse Alerts</h3>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAlertSettingsModal(true)}
                        className="border-orange-200 dark:border-orange-700"
                    >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {warehouses.filter(w => (w.current / w.capacity) * 100 > 75).map(w => (
                        <div key={w.id} className="p-4 rounded-lg bg-white dark:bg-black border border-orange-200 dark:border-orange-800">
                            <p className="font-medium text-black dark:text-white">High Utilization Warning</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {w.name} is at {((w.current / w.capacity) * 100).toFixed(0)}% capacity. Consider redistributing inventory.
                            </p>
                        </div>
                    ))}
                    {warehouses.filter(w => parseInt(w.humidity) > 50).map(w => (
                        <div key={w.id} className="p-4 rounded-lg bg-white dark:bg-black border border-orange-200 dark:border-orange-800">
                            <p className="font-medium text-black dark:text-white">Humidity Alert</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {w.name} humidity levels at {w.humidity} - above optimal range.
                            </p>
                        </div>
                    ))}
                    {warehouses.filter(w => (w.current / w.capacity) * 100 <= 75).length === warehouses.length && warehouses.filter(w => parseInt(w.humidity) > 50).length === 0 && (
                        <div className="p-4 rounded-lg bg-white dark:bg-black border border-green-200 dark:border-green-800">
                            <p className="font-medium text-green-700 dark:text-green-400">All Systems Normal</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                No critical alerts at this time.
                            </p>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Add Warehouse Modal */}
            <AnimatePresence>
                {showAddWarehouseModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowAddWarehouseModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-black rounded-xl p-6 w-full max-w-lg border border-gray-200 dark:border-gray-800 max-h-[90vh] overflow-y-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-black dark:text-white">Add New Warehouse</h3>
                                <button
                                    onClick={() => setShowAddWarehouseModal(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg"
                                >
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Warehouse Name *
                                    </label>
                                    <Input
                                        value={newWarehouse.name}
                                        onChange={(e) => setNewWarehouse({ ...newWarehouse, name: e.target.value })}
                                        placeholder="e.g., Main Warehouse - Location"
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Location *
                                    </label>
                                    <Input
                                        value={newWarehouse.location}
                                        onChange={(e) => setNewWarehouse({ ...newWarehouse, location: e.target.value })}
                                        placeholder="Full address"
                                        className={errors.location ? 'border-red-500' : ''}
                                    />
                                    {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Capacity (items) *
                                    </label>
                                    <Input
                                        type="number"
                                        value={newWarehouse.capacity}
                                        onChange={(e) => setNewWarehouse({ ...newWarehouse, capacity: e.target.value })}
                                        placeholder="Maximum item capacity"
                                        className={errors.capacity ? 'border-red-500' : ''}
                                    />
                                    {errors.capacity && <p className="text-red-500 text-xs mt-1">{errors.capacity}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Manager *
                                    </label>
                                    <Input
                                        value={newWarehouse.manager}
                                        onChange={(e) => setNewWarehouse({ ...newWarehouse, manager: e.target.value })}
                                        placeholder="Manager name"
                                        className={errors.manager ? 'border-red-500' : ''}
                                    />
                                    {errors.manager && <p className="text-red-500 text-xs mt-1">{errors.manager}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Contact *
                                    </label>
                                    <Input
                                        value={newWarehouse.contact}
                                        onChange={(e) => setNewWarehouse({ ...newWarehouse, contact: e.target.value })}
                                        placeholder="+91 98765 43210"
                                        className={errors.contact ? 'border-red-500' : ''}
                                    />
                                    {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Security Level
                                    </label>
                                    <select
                                        value={newWarehouse.security}
                                        onChange={(e) => setNewWarehouse({ ...newWarehouse, security: e.target.value as 'Maximum' | 'High' | 'Medium' })}
                                        className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white"
                                    >
                                        <option value="Maximum">Maximum</option>
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Storage Categories (comma-separated)
                                    </label>
                                    <Input
                                        value={newWarehouse.categories}
                                        onChange={(e) => setNewWarehouse({ ...newWarehouse, categories: e.target.value })}
                                        placeholder="AV Equipment, Lighting, Furniture..."
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setShowAddWarehouseModal(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                                    onClick={handleAddWarehouse}
                                >
                                    Add Warehouse
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Edit Warehouse Modal */}
            <AnimatePresence>
                {showEditModal && selectedWarehouse && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowEditModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-black rounded-xl p-6 w-full max-w-lg border border-gray-200 dark:border-gray-800 max-h-[90vh] overflow-y-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-black dark:text-white">Edit Warehouse</h3>
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg"
                                >
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Warehouse Name *
                                    </label>
                                    <Input
                                        value={newWarehouse.name}
                                        onChange={(e) => setNewWarehouse({ ...newWarehouse, name: e.target.value })}
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Location *
                                    </label>
                                    <Input
                                        value={newWarehouse.location}
                                        onChange={(e) => setNewWarehouse({ ...newWarehouse, location: e.target.value })}
                                        className={errors.location ? 'border-red-500' : ''}
                                    />
                                    {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Capacity (items) *
                                    </label>
                                    <Input
                                        type="number"
                                        value={newWarehouse.capacity}
                                        onChange={(e) => setNewWarehouse({ ...newWarehouse, capacity: e.target.value })}
                                        className={errors.capacity ? 'border-red-500' : ''}
                                    />
                                    {errors.capacity && <p className="text-red-500 text-xs mt-1">{errors.capacity}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Manager *
                                    </label>
                                    <Input
                                        value={newWarehouse.manager}
                                        onChange={(e) => setNewWarehouse({ ...newWarehouse, manager: e.target.value })}
                                        className={errors.manager ? 'border-red-500' : ''}
                                    />
                                    {errors.manager && <p className="text-red-500 text-xs mt-1">{errors.manager}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Contact *
                                    </label>
                                    <Input
                                        value={newWarehouse.contact}
                                        onChange={(e) => setNewWarehouse({ ...newWarehouse, contact: e.target.value })}
                                        className={errors.contact ? 'border-red-500' : ''}
                                    />
                                    {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Security Level
                                    </label>
                                    <select
                                        value={newWarehouse.security}
                                        onChange={(e) => setNewWarehouse({ ...newWarehouse, security: e.target.value as 'Maximum' | 'High' | 'Medium' })}
                                        className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white"
                                    >
                                        <option value="Maximum">Maximum</option>
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Storage Categories
                                    </label>
                                    <Input
                                        value={newWarehouse.categories}
                                        onChange={(e) => setNewWarehouse({ ...newWarehouse, categories: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button
                                    variant="outline"
                                    className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    onClick={() => {
                                        setShowEditModal(false);
                                        setShowDeleteModal(true);
                                    }}
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                </Button>
                                <Button
                                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                                    onClick={handleUpdateWarehouse}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {showDeleteModal && selectedWarehouse && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowDeleteModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-black rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-800"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30">
                                    <AlertCircle className="h-6 w-6 text-red-600" />
                                </div>
                                <h3 className="text-xl font-bold text-black dark:text-white">Delete Warehouse</h3>
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Are you sure you want to delete <span className="font-bold text-black dark:text-white">{selectedWarehouse.name}</span>?
                                {selectedWarehouse.current > 0 && (
                                    <span className="block mt-2 text-orange-600">
                                        Warning: This warehouse contains {selectedWarehouse.current} items that need to be transferred first.
                                    </span>
                                )}
                            </p>

                            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 mb-6">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    <span className="font-medium">Location:</span> {selectedWarehouse.location}<br/>
                                    <span className="font-medium">Current Stock:</span> {selectedWarehouse.current} items<br/>
                                    <span className="font-medium">Staff:</span> {selectedWarehouse.staff} members
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                                    onClick={handleDeleteWarehouse}
                                    disabled={selectedWarehouse.current > 0}
                                >
                                    Delete Warehouse
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Warehouse Details Drawer */}
            <AnimatePresence>
                {showDetailsDrawer && selectedWarehouse && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50"
                        onClick={() => setShowDetailsDrawer(false)}
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 h-full w-full max-w-xl bg-white dark:bg-black border-l border-gray-200 dark:border-gray-800 overflow-y-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-black dark:text-white">Warehouse Details</h3>
                                    <button
                                        onClick={() => setShowDetailsDrawer(false)}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg"
                                    >
                                        <X className="h-5 w-5 text-gray-500" />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-4 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                                            <Warehouse className="h-8 w-8 text-orange-500" />
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-bold text-black dark:text-white">{selectedWarehouse.name}</h4>
                                            <div className="flex items-center gap-2 mt-2">
                                                <MapPin className="h-4 w-4 text-gray-500" />
                                                <span className="text-gray-600 dark:text-gray-400">{selectedWarehouse.location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Capacity</p>
                                            <p className="text-2xl font-bold text-black dark:text-white">{selectedWarehouse.capacity}</p>
                                            <p className="text-xs text-gray-500">items max</p>
                                        </div>
                                        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Current Stock</p>
                                            <p className="text-2xl font-bold text-black dark:text-white">{selectedWarehouse.current}</p>
                                            <p className="text-xs text-gray-500">{((selectedWarehouse.current / selectedWarehouse.capacity) * 100).toFixed(0)}% utilized</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 text-center">
                                            <Thermometer className="h-5 w-5 text-orange-500 mx-auto mb-1" />
                                            <p className="text-sm font-bold text-black dark:text-white">{selectedWarehouse.temperature}</p>
                                            <p className="text-xs text-gray-500">Temperature</p>
                                        </div>
                                        <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 text-center">
                                            <Zap className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                                            <p className="text-sm font-bold text-black dark:text-white">{selectedWarehouse.humidity}</p>
                                            <p className="text-xs text-gray-500">Humidity</p>
                                        </div>
                                        <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 text-center">
                                            <Shield className="h-5 w-5 text-green-500 mx-auto mb-1" />
                                            <p className="text-sm font-bold text-black dark:text-white">{selectedWarehouse.security}</p>
                                            <p className="text-xs text-gray-500">Security</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Manager Information</h5>
                                        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
                                            <p className="font-bold text-black dark:text-white">{selectedWarehouse.manager}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{selectedWarehouse.contact}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Storage Categories</h5>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedWarehouse.categories.map((cat, i) => (
                                                <span key={i} className="text-sm px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400">
                                                    {cat}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-500">
                                            Status: <span className={`font-medium ${
                                                selectedWarehouse.status === 'Optimal' ? 'text-green-600' :
                                                selectedWarehouse.status === 'Good' ? 'text-blue-600' :
                                                selectedWarehouse.status === 'Warning' ? 'text-orange-600' :
                                                'text-gray-600'
                                            }`}>{selectedWarehouse.status}</span>
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                                            Last Inspection: {selectedWarehouse.lastInspection}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Actions</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setShowDetailsDrawer(false);
                                                    setTransferForm({ ...transferForm, sourceWarehouse: selectedWarehouse.id });
                                                    setShowTransferModal(true);
                                                }}
                                            >
                                                <ArrowRightLeft className="h-4 w-4 mr-2" />
                                                Transfer
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setShowDetailsDrawer(false);
                                                    setShowStaffModal(true);
                                                }}
                                            >
                                                <UserPlus className="h-4 w-4 mr-2" />
                                                Manage Staff
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setShowDetailsDrawer(false);
                                                    openEditModal(selectedWarehouse);
                                                }}
                                            >
                                                <Edit2 className="h-4 w-4 mr-2" />
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="text-red-600"
                                                onClick={() => {
                                                    setShowDetailsDrawer(false);
                                                    setShowDeleteModal(true);
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Transfer Modal */}
            <AnimatePresence>
                {showTransferModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowTransferModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-black rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-800"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-black dark:text-white">Transfer Inventory</h3>
                                <button
                                    onClick={() => setShowTransferModal(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg"
                                >
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Source Warehouse
                                    </label>
                                    <select
                                        value={transferForm.sourceWarehouse}
                                        onChange={(e) => setTransferForm({ ...transferForm, sourceWarehouse: e.target.value })}
                                        className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white"
                                    >
                                        <option value="">Select source</option>
                                        {warehouses.filter(w => w.current > 0).map(w => (
                                            <option key={w.id} value={w.id}>{w.name} ({w.current} items)</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Destination Warehouse
                                    </label>
                                    <select
                                        value={transferForm.destinationWarehouse}
                                        onChange={(e) => setTransferForm({ ...transferForm, destinationWarehouse: e.target.value })}
                                        className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white"
                                    >
                                        <option value="">Select destination</option>
                                        {warehouses.filter(w => w.id !== transferForm.sourceWarehouse).map(w => (
                                            <option key={w.id} value={w.id}>{w.name} ({w.capacity - w.current} available)</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Number of Items
                                    </label>
                                    <Input
                                        type="number"
                                        value={transferForm.itemCount}
                                        onChange={(e) => setTransferForm({ ...transferForm, itemCount: e.target.value })}
                                        placeholder="Enter quantity"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Category (optional)
                                    </label>
                                    <Input
                                        value={transferForm.itemCategory}
                                        onChange={(e) => setTransferForm({ ...transferForm, itemCategory: e.target.value })}
                                        placeholder="e.g., AV Equipment"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setShowTransferModal(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                                    onClick={handleTransfer}
                                    disabled={!transferForm.sourceWarehouse || !transferForm.destinationWarehouse || !transferForm.itemCount}
                                >
                                    Transfer Items
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Manage Staff Modal */}
            <AnimatePresence>
                {showStaffModal && selectedWarehouse && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowStaffModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-black rounded-xl p-6 w-full max-w-lg border border-gray-200 dark:border-gray-800"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-black dark:text-white">Manage Staff</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedWarehouse.name}</p>
                                </div>
                                <button
                                    onClick={() => setShowStaffModal(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg"
                                >
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto">
                                {warehouseStaff.map(staff => (
                                    <div
                                        key={staff.id}
                                        className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between"
                                    >
                                        <div>
                                            <p className="font-medium text-black dark:text-white">{staff.name}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{staff.role}</p>
                                            <p className="text-xs text-gray-500">{staff.phone}</p>
                                        </div>
                                        <Button variant="outline" size="sm" className="text-red-600">
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                                <h4 className="font-medium text-black dark:text-white mb-3">Add Staff Member</h4>
                                <div className="space-y-3">
                                    <Input
                                        value={newStaffMember.name}
                                        onChange={(e) => setNewStaffMember({ ...newStaffMember, name: e.target.value })}
                                        placeholder="Name"
                                    />
                                    <Input
                                        value={newStaffMember.role}
                                        onChange={(e) => setNewStaffMember({ ...newStaffMember, role: e.target.value })}
                                        placeholder="Role"
                                    />
                                    <Input
                                        value={newStaffMember.phone}
                                        onChange={(e) => setNewStaffMember({ ...newStaffMember, phone: e.target.value })}
                                        placeholder="Phone"
                                    />
                                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                                        <UserPlus className="h-4 w-4 mr-2" />
                                        Add Member
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Alert Settings Modal */}
            <AnimatePresence>
                {showAlertSettingsModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowAlertSettingsModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-black rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-800"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-black dark:text-white">Alert Settings</h3>
                                <button
                                    onClick={() => setShowAlertSettingsModal(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg"
                                >
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Capacity Alert Threshold (%)
                                    </label>
                                    <Input
                                        type="number"
                                        value={alertSettings.capacityThreshold}
                                        onChange={(e) => setAlertSettings({ ...alertSettings, capacityThreshold: e.target.value })}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Alert when warehouse exceeds this capacity</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Min Temperature (°C)
                                        </label>
                                        <Input
                                            type="number"
                                            value={alertSettings.temperatureMin}
                                            onChange={(e) => setAlertSettings({ ...alertSettings, temperatureMin: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Max Temperature (°C)
                                        </label>
                                        <Input
                                            type="number"
                                            value={alertSettings.temperatureMax}
                                            onChange={(e) => setAlertSettings({ ...alertSettings, temperatureMax: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Max Humidity (%)
                                    </label>
                                    <Input
                                        type="number"
                                        value={alertSettings.humidityMax}
                                        onChange={(e) => setAlertSettings({ ...alertSettings, humidityMax: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setShowAlertSettingsModal(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                                    onClick={() => setShowAlertSettingsModal(false)}
                                >
                                    Save Settings
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
