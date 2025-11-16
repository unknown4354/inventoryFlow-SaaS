'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Plus,
    Search,
    Filter,
    Mail,
    Phone,
    MapPin,
    TrendingUp,
    Calendar,
    Package,
    Star,
    Building2,
    X,
    Edit2,
    Trash2,
    AlertCircle,
    Eye,
    FileText,
    User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Client {
    id: string;
    name: string;
    contact: string;
    email: string;
    phone: string;
    address: string;
    type: 'Corporate' | 'Individual' | 'Agency';
    projects: number;
    revenue: string;
    rating: number;
    addedDate: string;
    notes: string;
}

interface ClientProject {
    id: string;
    name: string;
    date: string;
    value: string;
    status: string;
}

export default function ClientsPage() {
    const [clients, setClients] = useState<Client[]>([
        {
            id: '1',
            name: 'TechCorp India Pvt Ltd',
            contact: 'Rajesh Kumar',
            email: 'rajesh@techcorp.in',
            phone: '+91 98765 43210',
            address: 'Bandra Kurla Complex, Mumbai',
            type: 'Corporate',
            projects: 18,
            revenue: '₹45.2L',
            rating: 5,
            addedDate: '2023-06-15',
            notes: 'Premium client, prefers LED screens and high-end AV equipment'
        },
        {
            id: '2',
            name: 'Finance Group Ltd',
            contact: 'Priya Sharma',
            email: 'priya@financegroup.com',
            phone: '+91 98765 43211',
            address: 'Nariman Point, Mumbai',
            type: 'Corporate',
            projects: 12,
            revenue: '₹32.8L',
            rating: 5,
            addedDate: '2023-08-20',
            notes: 'Annual corporate events, always books 3 months in advance'
        },
        {
            id: '3',
            name: 'EventPro Productions',
            contact: 'Amit Patel',
            email: 'amit@eventpro.in',
            phone: '+91 98765 43212',
            address: 'Andheri East, Mumbai',
            type: 'Agency',
            projects: 24,
            revenue: '₹28.5L',
            rating: 4,
            addedDate: '2023-04-10',
            notes: 'Event management agency, frequent orders for various clients'
        },
        {
            id: '4',
            name: 'Sharma Family',
            contact: 'Vikram Sharma',
            email: 'vikram@email.com',
            phone: '+91 98765 43213',
            address: 'Powai, Mumbai',
            type: 'Individual',
            projects: 2,
            revenue: '₹15.2L',
            rating: 5,
            addedDate: '2024-12-13',
            notes: 'High-budget family events'
        },
        {
            id: '5',
            name: 'StartupX Technologies',
            contact: 'Neha Gupta',
            email: 'neha@startupx.io',
            phone: '+91 98765 43214',
            address: 'Whitefield, Bengaluru',
            type: 'Corporate',
            projects: 3,
            revenue: '₹12.5L',
            rating: 5,
            addedDate: '2024-12-10',
            notes: 'Tech startup, modern equipment preferences'
        },
        {
            id: '6',
            name: 'Global Tech Inc',
            contact: 'Arjun Reddy',
            email: 'arjun@globaltech.com',
            phone: '+91 98765 43215',
            address: 'Cyber City, Gurgaon',
            type: 'Corporate',
            projects: 8,
            revenue: '₹22.4L',
            rating: 5,
            addedDate: '2024-12-08',
            notes: 'Multi-location conferences'
        },
        {
            id: '7',
            name: 'Style Studio Events',
            contact: 'Meera Krishnan',
            email: 'meera@stylestudio.in',
            phone: '+91 98765 43216',
            address: 'Colaba, Mumbai',
            type: 'Agency',
            projects: 15,
            revenue: '₹18.9L',
            rating: 4,
            addedDate: '2024-11-30',
            notes: 'Fashion and lifestyle events specialist'
        }
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [showAddClientModal, setShowAddClientModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetailsDrawer, setShowDetailsDrawer] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [showProjectsModal, setShowProjectsModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const [newClient, setNewClient] = useState({
        name: '',
        contact: '',
        email: '',
        phone: '',
        address: '',
        type: 'Corporate' as 'Corporate' | 'Individual' | 'Agency',
        notes: ''
    });

    const [filterOptions, setFilterOptions] = useState({
        type: 'all',
        revenueRange: 'all',
        rating: 'all'
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const [clientProjects] = useState<ClientProject[]>([
        { id: '1', name: 'Tech Summit 2024', date: 'Dec 15-17, 2024', value: '₹8.5L', status: 'In Progress' },
        { id: '2', name: 'Annual Conference', date: 'Nov 10, 2024', value: '₹6.2L', status: 'Completed' },
        { id: '3', name: 'Product Launch', date: 'Oct 5, 2024', value: '₹4.8L', status: 'Completed' },
        { id: '4', name: 'Team Building Event', date: 'Sep 15, 2024', value: '₹3.2L', status: 'Completed' },
    ]);

    const validateClientForm = () => {
        const newErrors: Record<string, string> = {};
        if (!newClient.name.trim()) newErrors.name = 'Company/Client name is required';
        if (!newClient.contact.trim()) newErrors.contact = 'Contact person is required';
        if (!newClient.email.trim()) newErrors.email = 'Email is required';
        if (newClient.email && !/\S+@\S+\.\S+/.test(newClient.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!newClient.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!newClient.address.trim()) newErrors.address = 'Address is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddClient = () => {
        if (!validateClientForm()) return;

        const client: Client = {
            id: Date.now().toString(),
            name: newClient.name,
            contact: newClient.contact,
            email: newClient.email,
            phone: newClient.phone,
            address: newClient.address,
            type: newClient.type,
            projects: 0,
            revenue: '₹0',
            rating: 0,
            addedDate: new Date().toISOString().split('T')[0],
            notes: newClient.notes
        };

        setClients([...clients, client]);
        setShowAddClientModal(false);
        setNewClient({ name: '', contact: '', email: '', phone: '', address: '', type: 'Corporate', notes: '' });
        setErrors({});
    };

    const handleUpdateClient = () => {
        if (!selectedClient) return;
        if (!validateClientForm()) return;

        setClients(clients.map(c =>
            c.id === selectedClient.id
                ? {
                    ...c,
                    name: newClient.name,
                    contact: newClient.contact,
                    email: newClient.email,
                    phone: newClient.phone,
                    address: newClient.address,
                    type: newClient.type,
                    notes: newClient.notes
                }
                : c
        ));
        setShowEditModal(false);
        setSelectedClient(null);
        setNewClient({ name: '', contact: '', email: '', phone: '', address: '', type: 'Corporate', notes: '' });
        setErrors({});
    };

    const handleDeleteClient = () => {
        if (!selectedClient) return;
        setClients(clients.filter(c => c.id !== selectedClient.id));
        setShowDeleteModal(false);
        setSelectedClient(null);
    };

    const openEditModal = (client: Client) => {
        setSelectedClient(client);
        setNewClient({
            name: client.name,
            contact: client.contact,
            email: client.email,
            phone: client.phone,
            address: client.address,
            type: client.type,
            notes: client.notes
        });
        setShowEditModal(true);
    };

    const filteredClients = clients.filter(c => {
        if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !c.contact.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !c.email.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }
        if (selectedCategory && c.type !== selectedCategory) return false;
        if (filterOptions.type !== 'all' && c.type !== filterOptions.type) return false;
        if (filterOptions.rating !== 'all') {
            const minRating = parseInt(filterOptions.rating);
            if (c.rating < minRating) return false;
        }
        return true;
    });

    const topClients = [...filteredClients].sort((a, b) => {
        const aVal = parseFloat(a.revenue.replace('₹', '').replace('L', ''));
        const bVal = parseFloat(b.revenue.replace('₹', '').replace('L', ''));
        return bVal - aVal;
    }).slice(0, 3);

    const recentClients = [...filteredClients].sort((a, b) =>
        new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
    ).slice(0, 4);

    const categoryCount = {
        Corporate: clients.filter(c => c.type === 'Corporate').length,
        Individual: clients.filter(c => c.type === 'Individual').length,
        Agency: clients.filter(c => c.type === 'Agency').length
    };

    const totalRevenue = clients.reduce((sum, c) => {
        const val = parseFloat(c.revenue.replace('₹', '').replace('L', ''));
        return sum + val;
    }, 0);

    const avgRating = (clients.reduce((sum, c) => sum + c.rating, 0) / clients.length).toFixed(1);

    const getRelativeTime = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return '1 day ago';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 14) return '1 week ago';
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return `${Math.floor(diffDays / 30)} months ago`;
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
                    <h1 className="text-3xl font-bold text-black dark:text-white">Clients & Customers</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your client relationships and history</p>
                </div>
                <Button
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => setShowAddClientModal(true)}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Client
                </Button>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Clients', value: clients.length.toString(), icon: Users, color: 'orange', change: `+${recentClients.filter(c => getRelativeTime(c.addedDate).includes('day') || getRelativeTime(c.addedDate) === 'Today').length} this month` },
                    { label: 'Active Projects', value: '23', icon: Calendar, color: 'green', change: `With ${Math.floor(clients.length * 0.6)} clients` },
                    { label: 'Total Revenue', value: `₹${totalRevenue.toFixed(1)}L`, icon: TrendingUp, color: 'blue', change: 'All time' },
                    { label: 'Avg Rating', value: avgRating, icon: Star, color: 'yellow', change: `Based on ${clients.filter(c => c.rating > 0).length} reviews` },
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
                                stat.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                                stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                                'bg-yellow-100 dark:bg-yellow-900/30'
                            }`}>
                                <stat.icon className={`h-5 w-5 ${
                                    stat.color === 'orange' ? 'text-orange-500' :
                                    stat.color === 'green' ? 'text-green-500' :
                                    stat.color === 'blue' ? 'text-blue-500' :
                                    'text-yellow-500'
                                }`} />
                            </div>
                            <p className="text-3xl font-bold text-black dark:text-white">{stat.value}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{stat.label}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{stat.change}</p>
                    </motion.div>
                ))}
            </div>

            {/* Filters and Search */}
            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search clients by name, email, or company..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                    />
                </div>
                <Button
                    variant="outline"
                    className="border-gray-200 dark:border-gray-700 hover:border-orange-500"
                    onClick={() => setShowFilterModal(true)}
                >
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                    {(filterOptions.type !== 'all' || filterOptions.rating !== 'all') && (
                        <span className="ml-2 w-2 h-2 rounded-full bg-orange-500" />
                    )}
                </Button>
            </div>

            {/* Client Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { category: 'Corporate', count: categoryCount.Corporate, color: 'blue' },
                    { category: 'Individual', count: categoryCount.Individual, color: 'orange' },
                    { category: 'Agency', count: categoryCount.Agency, color: 'green' },
                ].map((cat, index) => (
                    <motion.button
                        key={cat.category}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setSelectedCategory(selectedCategory === cat.category ? null : cat.category)}
                        className={`p-4 rounded-lg border-2 transition-all hover:shadow-lg ${
                            selectedCategory === cat.category
                                ? cat.color === 'blue' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' :
                                  cat.color === 'orange' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' :
                                  'border-green-500 bg-green-50 dark:bg-green-900/20'
                                : cat.color === 'blue' ? 'border-blue-200 dark:border-blue-800 hover:border-blue-500' :
                                  cat.color === 'orange' ? 'border-orange-200 dark:border-orange-800 hover:border-orange-500' :
                                  'border-green-200 dark:border-green-800 hover:border-green-500'
                        } bg-white dark:bg-black`}
                    >
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-black dark:text-white">{cat.category}</span>
                            <span className={`text-2xl font-bold ${
                                cat.color === 'blue' ? 'text-blue-500' :
                                cat.color === 'orange' ? 'text-orange-500' :
                                'text-green-500'
                            }`}>{cat.count}</span>
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Clients List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Clients */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <Star className="h-5 w-5 text-orange-500" />
                        <h3 className="font-bold text-black dark:text-white">Top Clients</h3>
                        <span className="ml-auto text-sm text-orange-600 font-medium">By revenue</span>
                    </div>

                    <div className="space-y-4">
                        {topClients.map((client, index) => (
                            <motion.div
                                key={client.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 transition-all cursor-pointer group"
                                onClick={() => {
                                    setSelectedClient(client);
                                    setShowDetailsDrawer(true);
                                }}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-start gap-3">
                                        <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/30 group-hover:bg-orange-200 dark:group-hover:bg-orange-900/50 transition-colors">
                                            <Building2 className="h-5 w-5 text-orange-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-black dark:text-white group-hover:text-orange-500 transition-colors">
                                                {client.name}
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{client.contact}</p>
                                            <div className="flex items-center gap-1 mt-1">
                                                {Array.from({ length: 5 }, (_, i) => (
                                                    <span key={i} className={`text-sm ${i < client.rating ? 'text-orange-500' : 'text-gray-300 dark:text-gray-600'}`}>★</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                        client.type === 'Corporate' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                                        client.type === 'Agency' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                                        'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                                    }`}>
                                        {client.type}
                                    </span>
                                </div>

                                <div className="space-y-2 mb-3">
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <Mail className="h-3 w-3" />
                                        <span>{client.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <Phone className="h-3 w-3" />
                                        <span>{client.phone}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <Package className="h-4 w-4" />
                                        <span>{client.projects} projects</span>
                                    </div>
                                    <span className="text-sm font-bold text-black dark:text-white">{client.revenue}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Recent Clients */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <Users className="h-5 w-5 text-blue-500" />
                        <h3 className="font-bold text-black dark:text-white">Recently Added</h3>
                        <span className="ml-auto text-sm text-blue-600 font-medium">Last 30 days</span>
                    </div>

                    <div className="space-y-4">
                        {recentClients.map((client, index) => (
                            <motion.div
                                key={client.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all cursor-pointer group"
                                onClick={() => {
                                    setSelectedClient(client);
                                    setShowDetailsDrawer(true);
                                }}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h4 className="font-bold text-black dark:text-white group-hover:text-blue-500 transition-colors">
                                            {client.name}
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{client.contact}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-xs px-2 py-1 rounded-full ${
                                            client.type === 'Corporate' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                                            client.type === 'Agency' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                                            'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                                        }`}>
                                            {client.type}
                                        </span>
                                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{getRelativeTime(client.addedDate)}</p>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-3">
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <Mail className="h-3 w-3" />
                                        <span>{client.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <Phone className="h-3 w-3" />
                                        <span>{client.phone}</span>
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="h-4 w-4 text-orange-500" />
                                        <span className="text-gray-700 dark:text-gray-300">
                                            Projects: <span className="font-medium text-black dark:text-white">{client.projects}</span>
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Client Activity Summary */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6"
            >
                <h3 className="font-bold text-black dark:text-white mb-6">Client Activity Summary</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">By Revenue Tier</h4>
                        <div className="space-y-2">
                            {[
                                { tier: 'Premium (>₹20L)', count: clients.filter(c => parseFloat(c.revenue.replace('₹', '').replace('L', '')) > 20).length, percentage: 78 },
                                { tier: 'Standard (₹10-20L)', count: clients.filter(c => {
                                    const val = parseFloat(c.revenue.replace('₹', '').replace('L', ''));
                                    return val >= 10 && val <= 20;
                                }).length, percentage: 45 },
                                { tier: 'Basic (<₹10L)', count: clients.filter(c => parseFloat(c.revenue.replace('₹', '').replace('L', '')) < 10).length, percentage: 28 },
                            ].map((item) => (
                                <div key={item.tier}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm text-gray-700 dark:text-gray-300">{item.tier}</span>
                                        <span className="text-sm font-bold text-black dark:text-white">{item.count}</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-orange-500 rounded-full"
                                            style={{ width: `${(item.count / clients.length) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Project Frequency</h4>
                        <div className="space-y-2">
                            {[
                                { freq: 'Monthly+', count: clients.filter(c => c.projects > 15).length, color: 'bg-green-500' },
                                { freq: 'Quarterly', count: clients.filter(c => c.projects >= 5 && c.projects <= 15).length, color: 'bg-blue-500' },
                                { freq: 'Occasional', count: clients.filter(c => c.projects < 5).length, color: 'bg-gray-500' },
                            ].map((item) => (
                                <div key={item.freq} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-900">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">{item.freq}</span>
                                    </div>
                                    <span className="text-sm font-bold text-black dark:text-white">{item.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Satisfaction Rating</h4>
                        <div className="space-y-2">
                            {[
                                { stars: 5, count: clients.filter(c => c.rating === 5).length },
                                { stars: 4, count: clients.filter(c => c.rating === 4).length },
                                { stars: 3, count: clients.filter(c => c.rating <= 3).length },
                            ].map((item) => (
                                <div key={item.stars}>
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm text-gray-700 dark:text-gray-300">{item.stars}</span>
                                            <Star className="h-3 w-3 text-orange-500 fill-orange-500" />
                                        </div>
                                        <span className="text-sm font-bold text-black dark:text-white">{item.count}</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-orange-500 rounded-full"
                                            style={{ width: `${(item.count / clients.length) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Add Client Modal */}
            <AnimatePresence>
                {showAddClientModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowAddClientModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-black rounded-xl p-6 w-full max-w-lg border border-gray-200 dark:border-gray-800 max-h-[90vh] overflow-y-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-black dark:text-white">Add New Client</h3>
                                <button
                                    onClick={() => setShowAddClientModal(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg"
                                >
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Company/Client Name *
                                    </label>
                                    <Input
                                        value={newClient.name}
                                        onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                                        placeholder="Enter company or client name"
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Contact Person *
                                    </label>
                                    <Input
                                        value={newClient.contact}
                                        onChange={(e) => setNewClient({ ...newClient, contact: e.target.value })}
                                        placeholder="Enter contact person name"
                                        className={errors.contact ? 'border-red-500' : ''}
                                    />
                                    {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Client Type *
                                    </label>
                                    <select
                                        value={newClient.type}
                                        onChange={(e) => setNewClient({ ...newClient, type: e.target.value as 'Corporate' | 'Individual' | 'Agency' })}
                                        className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white"
                                    >
                                        <option value="Corporate">Corporate</option>
                                        <option value="Individual">Individual</option>
                                        <option value="Agency">Agency</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Email *
                                    </label>
                                    <Input
                                        type="email"
                                        value={newClient.email}
                                        onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                                        placeholder="email@example.com"
                                        className={errors.email ? 'border-red-500' : ''}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Phone *
                                    </label>
                                    <Input
                                        value={newClient.phone}
                                        onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                                        placeholder="+91 98765 43210"
                                        className={errors.phone ? 'border-red-500' : ''}
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Address *
                                    </label>
                                    <Input
                                        value={newClient.address}
                                        onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                                        placeholder="Enter business address"
                                        className={errors.address ? 'border-red-500' : ''}
                                    />
                                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Notes
                                    </label>
                                    <textarea
                                        value={newClient.notes}
                                        onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
                                        placeholder="Any special preferences or notes..."
                                        rows={3}
                                        className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setShowAddClientModal(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                                    onClick={handleAddClient}
                                >
                                    Add Client
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Edit Client Modal */}
            <AnimatePresence>
                {showEditModal && selectedClient && (
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
                                <h3 className="text-xl font-bold text-black dark:text-white">Edit Client</h3>
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
                                        Company/Client Name *
                                    </label>
                                    <Input
                                        value={newClient.name}
                                        onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Contact Person *
                                    </label>
                                    <Input
                                        value={newClient.contact}
                                        onChange={(e) => setNewClient({ ...newClient, contact: e.target.value })}
                                        className={errors.contact ? 'border-red-500' : ''}
                                    />
                                    {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Client Type *
                                    </label>
                                    <select
                                        value={newClient.type}
                                        onChange={(e) => setNewClient({ ...newClient, type: e.target.value as 'Corporate' | 'Individual' | 'Agency' })}
                                        className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white"
                                    >
                                        <option value="Corporate">Corporate</option>
                                        <option value="Individual">Individual</option>
                                        <option value="Agency">Agency</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Email *
                                    </label>
                                    <Input
                                        type="email"
                                        value={newClient.email}
                                        onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                                        className={errors.email ? 'border-red-500' : ''}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Phone *
                                    </label>
                                    <Input
                                        value={newClient.phone}
                                        onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                                        className={errors.phone ? 'border-red-500' : ''}
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Address *
                                    </label>
                                    <Input
                                        value={newClient.address}
                                        onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                                        className={errors.address ? 'border-red-500' : ''}
                                    />
                                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Notes
                                    </label>
                                    <textarea
                                        value={newClient.notes}
                                        onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
                                        rows={3}
                                        className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white"
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
                                    onClick={handleUpdateClient}
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
                {showDeleteModal && selectedClient && (
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
                                <h3 className="text-xl font-bold text-black dark:text-white">Delete Client</h3>
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Are you sure you want to delete <span className="font-bold text-black dark:text-white">{selectedClient.name}</span>?
                                This will remove all associated project history.
                            </p>

                            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 mb-6">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    <span className="font-medium">Contact:</span> {selectedClient.contact}<br/>
                                    <span className="font-medium">Projects:</span> {selectedClient.projects}<br/>
                                    <span className="font-medium">Total Revenue:</span> {selectedClient.revenue}
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
                                    onClick={handleDeleteClient}
                                >
                                    Delete Client
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Client Details Drawer */}
            <AnimatePresence>
                {showDetailsDrawer && selectedClient && (
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
                                    <h3 className="text-xl font-bold text-black dark:text-white">Client Details</h3>
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
                                            {selectedClient.type === 'Individual' ? (
                                                <User className="h-8 w-8 text-orange-500" />
                                            ) : (
                                                <Building2 className="h-8 w-8 text-orange-500" />
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-bold text-black dark:text-white">{selectedClient.name}</h4>
                                            <span className={`inline-block mt-2 text-xs px-3 py-1 rounded-full ${
                                                selectedClient.type === 'Corporate' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                                                selectedClient.type === 'Agency' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                                                'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                                            }`}>
                                                {selectedClient.type}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Projects</p>
                                            <p className="text-2xl font-bold text-black dark:text-white">{selectedClient.projects}</p>
                                        </div>
                                        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                                            <p className="text-2xl font-bold text-black dark:text-white">{selectedClient.revenue}</p>
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Rating</p>
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: 5 }, (_, i) => (
                                                <span key={i} className={`text-xl ${i < selectedClient.rating ? 'text-orange-500' : 'text-gray-300 dark:text-gray-600'}`}>★</span>
                                            ))}
                                            <span className="ml-2 text-black dark:text-white font-bold">{selectedClient.rating}/5</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h5 className="font-medium text-gray-700 dark:text-gray-300">Contact Information</h5>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                                                <User className="h-4 w-4 text-orange-500" />
                                                <span className="text-black dark:text-white">{selectedClient.contact}</span>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                                                <Mail className="h-4 w-4 text-orange-500" />
                                                <span className="text-black dark:text-white">{selectedClient.email}</span>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                                                <Phone className="h-4 w-4 text-orange-500" />
                                                <span className="text-black dark:text-white">{selectedClient.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                                                <MapPin className="h-4 w-4 text-orange-500" />
                                                <span className="text-black dark:text-white">{selectedClient.address}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {selectedClient.notes && (
                                        <div>
                                            <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</h5>
                                            <p className="text-gray-600 dark:text-gray-400 p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                                                {selectedClient.notes}
                                            </p>
                                        </div>
                                    )}

                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-500">
                                            Client since: {new Date(selectedClient.addedDate).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Actions</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setShowDetailsDrawer(false);
                                                    setShowProjectsModal(true);
                                                }}
                                            >
                                                <FileText className="h-4 w-4 mr-2" />
                                                View Projects
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setShowDetailsDrawer(false);
                                                    openEditModal(selectedClient);
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
                            className="bg-white dark:bg-black rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-800"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-black dark:text-white">Filter Clients</h3>
                                <button
                                    onClick={() => setShowFilterModal(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg"
                                >
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Client Type
                                    </label>
                                    <select
                                        value={filterOptions.type}
                                        onChange={(e) => setFilterOptions({ ...filterOptions, type: e.target.value })}
                                        className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white"
                                    >
                                        <option value="all">All Types</option>
                                        <option value="Corporate">Corporate</option>
                                        <option value="Individual">Individual</option>
                                        <option value="Agency">Agency</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Minimum Rating
                                    </label>
                                    <select
                                        value={filterOptions.rating}
                                        onChange={(e) => setFilterOptions({ ...filterOptions, rating: e.target.value })}
                                        className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white"
                                    >
                                        <option value="all">All Ratings</option>
                                        <option value="5">5 Stars</option>
                                        <option value="4">4+ Stars</option>
                                        <option value="3">3+ Stars</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => {
                                        setFilterOptions({ type: 'all', revenueRange: 'all', rating: 'all' });
                                        setSelectedCategory(null);
                                    }}
                                >
                                    Reset
                                </Button>
                                <Button
                                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                                    onClick={() => setShowFilterModal(false)}
                                >
                                    Apply Filters
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Client Projects Modal */}
            <AnimatePresence>
                {showProjectsModal && selectedClient && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowProjectsModal(false)}
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
                                    <h3 className="text-xl font-bold text-black dark:text-white">Project History</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedClient.name}</p>
                                </div>
                                <button
                                    onClick={() => setShowProjectsModal(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg"
                                >
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-3 max-h-[400px] overflow-y-auto">
                                {clientProjects.map(project => (
                                    <div
                                        key={project.id}
                                        className="p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-medium text-black dark:text-white">{project.name}</h4>
                                            <span className={`text-xs px-2 py-1 rounded-full ${
                                                project.status === 'In Progress'
                                                    ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                                                    : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                            }`}>
                                                {project.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">{project.date}</span>
                                            <span className="font-bold text-black dark:text-white">{project.value}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Button
                                className="w-full mt-4"
                                variant="outline"
                                onClick={() => setShowProjectsModal(false)}
                            >
                                Close
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
