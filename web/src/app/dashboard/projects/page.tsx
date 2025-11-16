'use client';

import { motion } from 'framer-motion';
import {
    Calendar,
    Plus,
    Search,
    Filter,
    MapPin,
    Users,
    Package,
    TrendingUp,
    Clock,
    CheckCircle,
    AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ProjectsPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start justify-between"
            >
                <div>
                    <h1 className="text-3xl font-bold text-black">Projects Management</h1>
                    <p className="text-gray-600 mt-1">Track and manage all your rental projects</p>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    New Project
                </Button>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Active Projects', value: '23', icon: Clock, color: 'orange', change: '+3 this week' },
                    { label: 'Upcoming', value: '12', icon: Calendar, color: 'blue', change: 'Next 7 days' },
                    { label: 'Total Revenue', value: '₹37.2L', icon: TrendingUp, color: 'green', change: '+18% MoM' },
                    { label: 'Equipment Utilization', value: '82%', icon: Package, color: 'purple', change: '925/1150 items' },
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
                        <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                    </motion.div>
                ))}
            </div>

            {/* Calendar View */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border border-gray-200 bg-white p-6"
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-black text-lg">December 2024</h3>
                    <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-gray-200">Previous</Button>
                        <Button size="sm" variant="outline" className="border-gray-200">Today</Button>
                        <Button size="sm" variant="outline" className="border-gray-200">Next</Button>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                    {/* Day headers */}
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                            {day}
                        </div>
                    ))}

                    {/* Calendar days */}
                    {Array.from({ length: 35 }, (_, i) => {
                        const day = i - 0; // Adjust based on month start
                        const isToday = day === 15;
                        const hasEvent = [3, 5, 8, 12, 15, 18, 20, 22, 25, 28].includes(day);
                        const eventCount = hasEvent ? Math.floor(Math.random() * 3) + 1 : 0;

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.01 }}
                                className={`aspect-square p-2 rounded-lg border transition-all cursor-pointer ${
                                    isToday
                                        ? 'border-orange-500 bg-orange-50'
                                        : hasEvent
                                        ? 'border-gray-200 bg-white hover:border-orange-300'
                                        : 'border-gray-100 bg-gray-50 hover:bg-white'
                                }`}
                            >
                                <div className="text-sm font-medium text-black mb-1">{day > 0 && day <= 31 ? day : ''}</div>
                                {hasEvent && day > 0 && day <= 31 && (
                                    <div className="space-y-1">
                                        {Array.from({ length: eventCount }, (_, j) => (
                                            <div
                                                key={j}
                                                className="h-1 rounded-full bg-orange-500"
                                                style={{ width: `${60 + j * 15}%` }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500" />
                        <span className="text-sm text-gray-600">Active Projects</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-sm text-gray-600">Upcoming</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-sm text-gray-600">Completed</span>
                    </div>
                </div>
            </motion.div>

            {/* Filters and Search */}
            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search projects..."
                        className="pl-10 border-gray-200"
                    />
                </div>
                <Button variant="outline" className="border-gray-200 hover:border-orange-500">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                </Button>
            </div>

            {/* Projects List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Active Projects */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-xl border border-gray-200 bg-white p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <Clock className="h-5 w-5 text-orange-500" />
                        <h3 className="font-bold text-black">Active Projects</h3>
                        <span className="ml-auto text-sm text-orange-600 font-medium">23 projects</span>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                name: 'Tech Summit 2024',
                                client: 'TechCorp India',
                                date: 'Dec 15-17',
                                location: 'Mumbai Convention Center',
                                items: 145,
                                value: '₹8.5L',
                                status: 'In Progress'
                            },
                            {
                                name: 'Corporate Annual Gala',
                                client: 'Finance Group Ltd',
                                date: 'Dec 18-19',
                                location: 'The Grand Hotel, Delhi',
                                items: 98,
                                value: '₹6.2L',
                                status: 'Equipment Ready'
                            },
                            {
                                name: 'Product Launch Event',
                                client: 'StartupX',
                                date: 'Dec 20',
                                location: 'Bengaluru Tech Park',
                                items: 67,
                                value: '₹4.8L',
                                status: 'Planning'
                            },
                        ].map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className="p-4 rounded-lg border border-gray-200 hover:border-orange-500 transition-all cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h4 className="font-bold text-black group-hover:text-orange-500 transition-colors">
                                            {project.name}
                                        </h4>
                                        <p className="text-sm text-gray-600 mt-1">{project.client}</p>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                        project.status === 'Equipment Ready'
                                            ? 'bg-green-100 text-green-700'
                                            : project.status === 'In Progress'
                                            ? 'bg-orange-100 text-orange-700'
                                            : 'bg-gray-100 text-gray-700'
                                    }`}>
                                        {project.status}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Calendar className="h-4 w-4" />
                                        <span>{project.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <MapPin className="h-4 w-4" />
                                        <span>{project.location}</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Package className="h-4 w-4" />
                                            <span>{project.items} items</span>
                                        </div>
                                        <span className="text-sm font-bold text-black">{project.value}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Upcoming Projects */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="rounded-xl border border-gray-200 bg-white p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <Calendar className="h-5 w-5 text-blue-500" />
                        <h3 className="font-bold text-black">Upcoming Projects</h3>
                        <span className="ml-auto text-sm text-blue-600 font-medium">12 projects</span>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                name: 'Wedding Celebration',
                                client: 'Sharma Family',
                                date: 'Dec 22-23',
                                location: 'Royal Palace Grounds',
                                items: 210,
                                value: '₹12.5L',
                                daysUntil: '7 days'
                            },
                            {
                                name: 'Music Festival',
                                client: 'EventPro Productions',
                                date: 'Dec 25-26',
                                location: 'Open Air Arena, Pune',
                                items: 180,
                                value: '₹15.8L',
                                daysUntil: '10 days'
                            },
                            {
                                name: 'Corporate Conference',
                                client: 'Global Tech Inc',
                                date: 'Dec 28',
                                location: 'Hyatt Regency, Gurgaon',
                                items: 85,
                                value: '₹5.2L',
                                daysUntil: '13 days'
                            },
                        ].map((project, index) => (
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
                                            {project.name}
                                        </h4>
                                        <p className="text-sm text-gray-600 mt-1">{project.client}</p>
                                    </div>
                                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                                        In {project.daysUntil}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Calendar className="h-4 w-4" />
                                        <span>{project.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <MapPin className="h-4 w-4" />
                                        <span>{project.location}</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Package className="h-4 w-4" />
                                            <span>{project.items} items</span>
                                        </div>
                                        <span className="text-sm font-bold text-black">{project.value}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Recent Completions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="rounded-xl border border-gray-200 bg-white p-6"
            >
                <div className="flex items-center gap-2 mb-6">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <h3 className="font-bold text-black">Recently Completed</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { name: 'Diwali Corporate Party', client: 'ACME Corp', completed: '2 days ago', revenue: '₹7.2L', rating: 5 },
                        { name: 'Fashion Show', client: 'Style Studio', completed: '5 days ago', revenue: '₹9.5L', rating: 5 },
                        { name: 'Charity Gala', client: 'Hope Foundation', completed: '1 week ago', revenue: '₹5.8L', rating: 4 },
                    ].map((project, index) => (
                        <div
                            key={index}
                            className="p-4 rounded-lg bg-gray-50 border border-gray-200"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium text-black">{project.name}</h4>
                                <CheckCircle className="h-5 w-5 text-green-500" />
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{project.client}</p>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">{project.completed}</span>
                                <span className="font-bold text-black">{project.revenue}</span>
                            </div>
                            <div className="flex items-center gap-1 mt-2">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <span key={i} className={i < project.rating ? 'text-orange-500' : 'text-gray-300'}>★</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
