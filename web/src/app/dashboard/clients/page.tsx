'use client';

import { motion } from 'framer-motion';
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
    Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ClientsPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start justify-between"
            >
                <div>
                    <h1 className="text-3xl font-bold text-black">Clients & Customers</h1>
                    <p className="text-gray-600 mt-1">Manage your client relationships and history</p>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Client
                </Button>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Clients', value: '156', icon: Users, color: 'orange', change: '+12 this month' },
                    { label: 'Active Projects', value: '23', icon: Calendar, color: 'green', change: 'With 18 clients' },
                    { label: 'Total Revenue', value: '₹2.4Cr', icon: TrendingUp, color: 'blue', change: 'All time' },
                    { label: 'Avg Rating', value: '4.8', icon: Star, color: 'yellow', change: 'Based on 142 reviews' },
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
                                stat.color === 'green' ? 'bg-green-100' :
                                stat.color === 'blue' ? 'bg-blue-100' :
                                'bg-yellow-100'
                            }`}>
                                <stat.icon className={`h-5 w-5 ${
                                    stat.color === 'orange' ? 'text-orange-500' :
                                    stat.color === 'green' ? 'text-green-500' :
                                    stat.color === 'blue' ? 'text-blue-500' :
                                    'text-yellow-500'
                                }`} />
                            </div>
                            <p className="text-3xl font-bold text-black">{stat.value}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-700">{stat.label}</p>
                        <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                    </motion.div>
                ))}
            </div>

            {/* Filters and Search */}
            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search clients by name, email, or company..."
                        className="pl-10 border-gray-200"
                    />
                </div>
                <Button variant="outline" className="border-gray-200 hover:border-orange-500">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                </Button>
            </div>

            {/* Client Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { category: 'Corporate', count: 78, color: 'blue' },
                    { category: 'Individual', count: 52, color: 'orange' },
                    { category: 'Event Agencies', count: 26, color: 'green' },
                ].map((cat, index) => (
                    <motion.button
                        key={cat.category}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-lg border-2 transition-all hover:shadow-lg ${
                            cat.color === 'blue' ? 'border-blue-200 hover:border-blue-500' :
                            cat.color === 'orange' ? 'border-orange-200 hover:border-orange-500' :
                            'border-green-200 hover:border-green-500'
                        } bg-white`}
                    >
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-black">{cat.category}</span>
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
                    className="rounded-xl border border-gray-200 bg-white p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <Star className="h-5 w-5 text-orange-500" />
                        <h3 className="font-bold text-black">Top Clients</h3>
                        <span className="ml-auto text-sm text-orange-600 font-medium">By revenue</span>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                name: 'TechCorp India Pvt Ltd',
                                contact: 'Rajesh Kumar',
                                email: 'rajesh@techcorp.in',
                                phone: '+91 98765 43210',
                                projects: 18,
                                revenue: '₹45.2L',
                                rating: 5,
                                type: 'Corporate'
                            },
                            {
                                name: 'Finance Group Ltd',
                                contact: 'Priya Sharma',
                                email: 'priya@financegroup.com',
                                phone: '+91 98765 43211',
                                projects: 12,
                                revenue: '₹32.8L',
                                rating: 5,
                                type: 'Corporate'
                            },
                            {
                                name: 'EventPro Productions',
                                contact: 'Amit Patel',
                                email: 'amit@eventpro.in',
                                phone: '+91 98765 43212',
                                projects: 24,
                                revenue: '₹28.5L',
                                rating: 4,
                                type: 'Agency'
                            },
                        ].map((client, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className="p-4 rounded-lg border border-gray-200 hover:border-orange-500 transition-all cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-start gap-3">
                                        <div className="p-3 rounded-lg bg-orange-100 group-hover:bg-orange-200 transition-colors">
                                            <Building2 className="h-5 w-5 text-orange-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-black group-hover:text-orange-500 transition-colors">
                                                {client.name}
                                            </h4>
                                            <p className="text-sm text-gray-600 mt-1">{client.contact}</p>
                                            <div className="flex items-center gap-1 mt-1">
                                                {Array.from({ length: 5 }, (_, i) => (
                                                    <span key={i} className={`text-sm ${i < client.rating ? 'text-orange-500' : 'text-gray-300'}`}>★</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                                        {client.type}
                                    </span>
                                </div>

                                <div className="space-y-2 mb-3">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Mail className="h-3 w-3" />
                                        <span>{client.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Phone className="h-3 w-3" />
                                        <span>{client.phone}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Package className="h-4 w-4" />
                                        <span>{client.projects} projects</span>
                                    </div>
                                    <span className="text-sm font-bold text-black">{client.revenue}</span>
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
                    className="rounded-xl border border-gray-200 bg-white p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <Users className="h-5 w-5 text-blue-500" />
                        <h3 className="font-bold text-black">Recently Added</h3>
                        <span className="ml-auto text-sm text-blue-600 font-medium">Last 30 days</span>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                name: 'Sharma Family',
                                contact: 'Vikram Sharma',
                                email: 'vikram@email.com',
                                phone: '+91 98765 43213',
                                addedDate: '2 days ago',
                                type: 'Individual',
                                upcomingProject: 'Wedding - Dec 22'
                            },
                            {
                                name: 'StartupX Technologies',
                                contact: 'Neha Gupta',
                                email: 'neha@startupx.io',
                                phone: '+91 98765 43214',
                                addedDate: '5 days ago',
                                type: 'Corporate',
                                upcomingProject: 'Product Launch - Dec 20'
                            },
                            {
                                name: 'Global Tech Inc',
                                contact: 'Arjun Reddy',
                                email: 'arjun@globaltech.com',
                                phone: '+91 98765 43215',
                                addedDate: '1 week ago',
                                type: 'Corporate',
                                upcomingProject: 'Conference - Dec 28'
                            },
                            {
                                name: 'Style Studio Events',
                                contact: 'Meera Krishnan',
                                email: 'meera@stylestudio.in',
                                phone: '+91 98765 43216',
                                addedDate: '2 weeks ago',
                                type: 'Agency',
                                upcomingProject: 'Fashion Show - Jan 5'
                            },
                        ].map((client, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                                className="p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-all cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h4 className="font-bold text-black group-hover:text-blue-500 transition-colors">
                                            {client.name}
                                        </h4>
                                        <p className="text-sm text-gray-600 mt-1">{client.contact}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-xs px-2 py-1 rounded-full ${
                                            client.type === 'Corporate' ? 'bg-blue-100 text-blue-700' :
                                            client.type === 'Agency' ? 'bg-green-100 text-green-700' :
                                            'bg-orange-100 text-orange-700'
                                        }`}>
                                            {client.type}
                                        </span>
                                        <p className="text-xs text-gray-500 mt-2">{client.addedDate}</p>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-3">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Mail className="h-3 w-3" />
                                        <span>{client.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Phone className="h-3 w-3" />
                                        <span>{client.phone}</span>
                                    </div>
                                </div>

                                {client.upcomingProject && (
                                    <div className="pt-3 border-t border-gray-100">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Calendar className="h-4 w-4 text-orange-500" />
                                            <span className="text-gray-700">Upcoming: <span className="font-medium text-black">{client.upcomingProject}</span></span>
                                        </div>
                                    </div>
                                )}
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
                className="rounded-xl border border-gray-200 bg-white p-6"
            >
                <h3 className="font-bold text-black mb-6">Client Activity Summary</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-600">By Revenue Tier</h4>
                        <div className="space-y-2">
                            {[
                                { tier: 'Premium (>₹20L)', count: 15, percentage: 78 },
                                { tier: 'Standard (₹10-20L)', count: 42, percentage: 45 },
                                { tier: 'Basic (<₹10L)', count: 99, percentage: 28 },
                            ].map((item) => (
                                <div key={item.tier}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm text-gray-700">{item.tier}</span>
                                        <span className="text-sm font-bold text-black">{item.count}</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-orange-500 rounded-full"
                                            style={{ width: `${item.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-600">Project Frequency</h4>
                        <div className="space-y-2">
                            {[
                                { freq: 'Monthly+', count: 12, color: 'bg-green-500' },
                                { freq: 'Quarterly', count: 28, color: 'bg-blue-500' },
                                { freq: 'Occasional', count: 116, color: 'bg-gray-500' },
                            ].map((item) => (
                                <div key={item.freq} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                                        <span className="text-sm text-gray-700">{item.freq}</span>
                                    </div>
                                    <span className="text-sm font-bold text-black">{item.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-600">Satisfaction Rating</h4>
                        <div className="space-y-2">
                            {[
                                { stars: 5, count: 89, percentage: 85 },
                                { stars: 4, count: 42, percentage: 40 },
                                { stars: 3, count: 11, percentage: 12 },
                            ].map((item) => (
                                <div key={item.stars}>
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm text-gray-700">{item.stars}</span>
                                            <Star className="h-3 w-3 text-orange-500 fill-orange-500" />
                                        </div>
                                        <span className="text-sm font-bold text-black">{item.count}</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-orange-500 rounded-full"
                                            style={{ width: `${item.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
