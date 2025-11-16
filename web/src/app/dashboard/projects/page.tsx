'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    AlertCircle,
    X,
    Edit2,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Eye,
    Pause,
    Play,
    MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Project {
    id: string;
    name: string;
    client: string;
    startDate: string;
    endDate: string;
    location: string;
    items: number;
    value: string;
    status: 'Planning' | 'Equipment Ready' | 'In Progress' | 'Completed' | 'Paused';
    description: string;
    equipment: string[];
}

interface Client {
    id: string;
    name: string;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([
        {
            id: '1',
            name: 'Tech Summit 2024',
            client: 'TechCorp India',
            startDate: '2024-12-15',
            endDate: '2024-12-17',
            location: 'Mumbai Convention Center',
            items: 145,
            value: '₹8.5L',
            status: 'In Progress',
            description: 'Annual technology conference with keynote speakers and product demos',
            equipment: ['Projectors', 'Sound System', 'Stage Lighting', 'LED Screens']
        },
        {
            id: '2',
            name: 'Corporate Annual Gala',
            client: 'Finance Group Ltd',
            startDate: '2024-12-18',
            endDate: '2024-12-19',
            location: 'The Grand Hotel, Delhi',
            items: 98,
            value: '₹6.2L',
            status: 'Equipment Ready',
            description: 'Year-end celebration for corporate clients',
            equipment: ['Chairs', 'Tables', 'Decorations', 'Sound System']
        },
        {
            id: '3',
            name: 'Product Launch Event',
            client: 'StartupX',
            startDate: '2024-12-20',
            endDate: '2024-12-20',
            location: 'Bengaluru Tech Park',
            items: 67,
            value: '₹4.8L',
            status: 'Planning',
            description: 'New product unveiling with media coverage',
            equipment: ['Stage', 'Lighting', 'Projectors', 'Podium']
        },
        {
            id: '4',
            name: 'Industrial Equipment Expo',
            client: 'Global Tech Inc',
            startDate: '2024-12-22',
            endDate: '2024-12-23',
            location: 'Royal Palace Grounds',
            items: 210,
            value: '₹12.5L',
            status: 'Planning',
            description: 'Trade show for industrial equipment manufacturers',
            equipment: ['Exhibition Stands', 'Signage', 'Lighting', 'Sound']
        },
        {
            id: '5',
            name: 'Music Festival',
            client: 'EventPro Productions',
            startDate: '2024-12-25',
            endDate: '2024-12-26',
            location: 'Open Air Arena, Pune',
            items: 180,
            value: '₹15.8L',
            status: 'Planning',
            description: 'Multi-stage outdoor music event',
            equipment: ['Stage Systems', 'Sound Equipment', 'Lighting Rigs', 'Barriers']
        },
        {
            id: '6',
            name: 'Corporate Conference',
            client: 'Global Tech Inc',
            startDate: '2024-12-28',
            endDate: '2024-12-28',
            location: 'Hyatt Regency, Gurgaon',
            items: 85,
            value: '₹5.2L',
            status: 'Planning',
            description: 'Regional sales conference',
            equipment: ['Projectors', 'Microphones', 'Podium', 'Chairs']
        }
    ]);

    const [completedProjects] = useState([
        { id: 'c1', name: 'Diwali Corporate Party', client: 'ACME Corp', completed: '2 days ago', revenue: '₹7.2L', rating: 5 },
        { id: 'c2', name: 'Fashion Show', client: 'Style Studio', completed: '5 days ago', revenue: '₹9.5L', rating: 5 },
        { id: 'c3', name: 'Charity Gala', client: 'Hope Foundation', completed: '1 week ago', revenue: '₹5.8L', rating: 4 },
    ]);

    const [clients] = useState<Client[]>([
        { id: '1', name: 'TechCorp India' },
        { id: '2', name: 'Finance Group Ltd' },
        { id: '3', name: 'StartupX' },
        { id: '4', name: 'Global Tech Inc' },
        { id: '5', name: 'EventPro Productions' },
        { id: '6', name: 'ACME Corp' },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [showNewProjectModal, setShowNewProjectModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetailsDrawer, setShowDetailsDrawer] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [showDayModal, setShowDayModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date(2024, 11)); // December 2024

    const [newProject, setNewProject] = useState({
        name: '',
        client: '',
        startDate: '',
        endDate: '',
        location: '',
        description: '',
        equipment: ''
    });

    const [filterOptions, setFilterOptions] = useState({
        status: 'all',
        client: 'all',
        dateRange: 'all'
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateProjectForm = () => {
        const newErrors: Record<string, string> = {};
        if (!newProject.name.trim()) newErrors.name = 'Project name is required';
        if (!newProject.client) newErrors.client = 'Client is required';
        if (!newProject.startDate) newErrors.startDate = 'Start date is required';
        if (!newProject.endDate) newErrors.endDate = 'End date is required';
        if (!newProject.location.trim()) newErrors.location = 'Location is required';
        if (newProject.startDate && newProject.endDate && newProject.startDate > newProject.endDate) {
            newErrors.endDate = 'End date must be after start date';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateProject = () => {
        if (!validateProjectForm()) return;

        const project: Project = {
            id: Date.now().toString(),
            name: newProject.name,
            client: newProject.client,
            startDate: newProject.startDate,
            endDate: newProject.endDate,
            location: newProject.location,
            items: 0,
            value: '₹0',
            status: 'Planning',
            description: newProject.description,
            equipment: newProject.equipment.split(',').map(e => e.trim()).filter(e => e)
        };

        setProjects([...projects, project]);
        setShowNewProjectModal(false);
        setNewProject({ name: '', client: '', startDate: '', endDate: '', location: '', description: '', equipment: '' });
        setErrors({});
    };

    const handleUpdateProject = () => {
        if (!selectedProject) return;
        if (!validateProjectForm()) return;

        setProjects(projects.map(p =>
            p.id === selectedProject.id
                ? {
                    ...p,
                    name: newProject.name,
                    client: newProject.client,
                    startDate: newProject.startDate,
                    endDate: newProject.endDate,
                    location: newProject.location,
                    description: newProject.description,
                    equipment: newProject.equipment.split(',').map(e => e.trim()).filter(e => e)
                }
                : p
        ));
        setShowEditModal(false);
        setSelectedProject(null);
        setNewProject({ name: '', client: '', startDate: '', endDate: '', location: '', description: '', equipment: '' });
        setErrors({});
    };

    const handleDeleteProject = () => {
        if (!selectedProject) return;
        setProjects(projects.filter(p => p.id !== selectedProject.id));
        setShowDeleteModal(false);
        setSelectedProject(null);
    };

    const openEditModal = (project: Project) => {
        setSelectedProject(project);
        setNewProject({
            name: project.name,
            client: project.client,
            startDate: project.startDate,
            endDate: project.endDate,
            location: project.location,
            description: project.description,
            equipment: project.equipment.join(', ')
        });
        setShowEditModal(true);
    };

    const toggleProjectStatus = (projectId: string, action: 'pause' | 'resume' | 'complete') => {
        setProjects(projects.map(p => {
            if (p.id === projectId) {
                if (action === 'pause') return { ...p, status: 'Paused' as const };
                if (action === 'resume') return { ...p, status: 'In Progress' as const };
                if (action === 'complete') return { ...p, status: 'Completed' as const };
            }
            return p;
        }));
    };

    const getProjectsForDay = (day: number) => {
        return projects.filter(p => {
            const start = new Date(p.startDate);
            const end = new Date(p.endDate);
            const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            return checkDate >= start && checkDate <= end;
        });
    };

    const filteredProjects = projects.filter(p => {
        if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !p.client.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }
        if (filterOptions.status !== 'all' && p.status !== filterOptions.status) return false;
        if (filterOptions.client !== 'all' && p.client !== filterOptions.client) return false;
        return true;
    });

    const activeProjects = filteredProjects.filter(p => ['In Progress', 'Equipment Ready', 'Planning'].includes(p.status));
    const upcomingProjects = filteredProjects.filter(p => {
        const start = new Date(p.startDate);
        const today = new Date();
        return start > today && p.status !== 'Completed';
    });

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start justify-between"
            >
                <div>
                    <h1 className="text-3xl font-bold text-black dark:text-white">Projects Management</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Track and manage all your rental projects</p>
                </div>
                <Button
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => setShowNewProjectModal(true)}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    New Project
                </Button>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Active Projects', value: activeProjects.length.toString(), icon: Clock, color: 'orange', change: `+${Math.floor(activeProjects.length / 3)} this week` },
                    { label: 'Upcoming', value: upcomingProjects.length.toString(), icon: Calendar, color: 'blue', change: 'Next 7 days' },
                    { label: 'Total Revenue', value: '₹37.2L', icon: TrendingUp, color: 'green', change: '+18% MoM' },
                    { label: 'Equipment Utilization', value: '82%', icon: Package, color: 'purple', change: '925/1150 items' },
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
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{stat.change}</p>
                    </motion.div>
                ))}
            </div>

            {/* Calendar View */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6"
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-black dark:text-white text-lg">
                        {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </h3>
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-200 dark:border-gray-700"
                            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-200 dark:border-gray-700"
                            onClick={() => setCurrentMonth(new Date())}
                        >
                            Today
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-200 dark:border-gray-700"
                            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                    {/* Day headers */}
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} className="text-center text-sm font-medium text-gray-600 dark:text-gray-400 py-2">
                            {day}
                        </div>
                    ))}

                    {/* Calendar days */}
                    {Array.from({ length: 42 }, (_, i) => {
                        const firstDay = getFirstDayOfMonth(currentMonth);
                        const daysInMonth = getDaysInMonth(currentMonth);
                        const day = i - firstDay + 1;
                        const isValidDay = day > 0 && day <= daysInMonth;
                        const today = new Date();
                        const isToday = isValidDay &&
                            currentMonth.getMonth() === today.getMonth() &&
                            currentMonth.getFullYear() === today.getFullYear() &&
                            day === today.getDate();
                        const dayProjects = isValidDay ? getProjectsForDay(day) : [];

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.01 }}
                                onClick={() => {
                                    if (isValidDay && dayProjects.length > 0) {
                                        setSelectedDay(day);
                                        setShowDayModal(true);
                                    }
                                }}
                                className={`aspect-square p-2 rounded-lg border transition-all ${
                                    !isValidDay
                                        ? 'border-transparent bg-gray-50 dark:bg-gray-900/50'
                                        : isToday
                                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 cursor-pointer'
                                        : dayProjects.length > 0
                                        ? 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-orange-300 dark:hover:border-orange-700 cursor-pointer'
                                        : 'border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50'
                                }`}
                            >
                                <div className="text-sm font-medium text-black dark:text-white mb-1">
                                    {isValidDay ? day : ''}
                                </div>
                                {dayProjects.length > 0 && (
                                    <div className="space-y-1">
                                        {dayProjects.slice(0, 3).map((project, j) => (
                                            <div
                                                key={j}
                                                className={`h-1 rounded-full ${
                                                    project.status === 'In Progress' ? 'bg-orange-500' :
                                                    project.status === 'Equipment Ready' ? 'bg-green-500' :
                                                    project.status === 'Completed' ? 'bg-blue-500' :
                                                    'bg-gray-400'
                                                }`}
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
                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">In Progress</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Equipment Ready</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Planning</span>
                    </div>
                </div>
            </motion.div>

            {/* Filters and Search */}
            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search projects..."
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
                    {(filterOptions.status !== 'all' || filterOptions.client !== 'all') && (
                        <span className="ml-2 w-2 h-2 rounded-full bg-orange-500" />
                    )}
                </Button>
            </div>

            {/* Projects List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Active Projects */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <Clock className="h-5 w-5 text-orange-500" />
                        <h3 className="font-bold text-black dark:text-white">Active Projects</h3>
                        <span className="ml-auto text-sm text-orange-600 font-medium">{activeProjects.length} projects</span>
                    </div>

                    <div className="space-y-4 max-h-[500px] overflow-y-auto">
                        {activeProjects.slice(0, 5).map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 transition-all cursor-pointer group"
                                onClick={() => {
                                    setSelectedProject(project);
                                    setShowDetailsDrawer(true);
                                }}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h4 className="font-bold text-black dark:text-white group-hover:text-orange-500 transition-colors">
                                            {project.name}
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{project.client}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs px-2 py-1 rounded-full ${
                                            project.status === 'Equipment Ready'
                                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                                : project.status === 'In Progress'
                                                ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                                        }`}>
                                            {project.status}
                                        </span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openEditModal(project);
                                            }}
                                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                                        >
                                            <Edit2 className="h-3 w-3 text-gray-500" />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <Calendar className="h-4 w-4" />
                                        <span>{new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <MapPin className="h-4 w-4" />
                                        <span>{project.location}</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <Package className="h-4 w-4" />
                                            <span>{project.items} items</span>
                                        </div>
                                        <span className="text-sm font-bold text-black dark:text-white">{project.value}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        {activeProjects.length === 0 && (
                            <p className="text-center text-gray-500 dark:text-gray-400 py-8">No active projects</p>
                        )}
                    </div>
                </motion.div>

                {/* Upcoming Projects */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <Calendar className="h-5 w-5 text-blue-500" />
                        <h3 className="font-bold text-black dark:text-white">Upcoming Projects</h3>
                        <span className="ml-auto text-sm text-blue-600 font-medium">{upcomingProjects.length} projects</span>
                    </div>

                    <div className="space-y-4 max-h-[500px] overflow-y-auto">
                        {upcomingProjects.slice(0, 5).map((project, index) => {
                            const daysUntil = Math.ceil((new Date(project.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

                            return (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all cursor-pointer group"
                                    onClick={() => {
                                        setSelectedProject(project);
                                        setShowDetailsDrawer(true);
                                    }}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h4 className="font-bold text-black dark:text-white group-hover:text-blue-500 transition-colors">
                                                {project.name}
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{project.client}</p>
                                        </div>
                                        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                                            In {daysUntil} days
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <Calendar className="h-4 w-4" />
                                            <span>{new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <MapPin className="h-4 w-4" />
                                            <span>{project.location}</span>
                                        </div>
                                        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                <Package className="h-4 w-4" />
                                                <span>{project.items} items</span>
                                            </div>
                                            <span className="text-sm font-bold text-black dark:text-white">{project.value}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                        {upcomingProjects.length === 0 && (
                            <p className="text-center text-gray-500 dark:text-gray-400 py-8">No upcoming projects</p>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Recent Completions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6"
            >
                <div className="flex items-center gap-2 mb-6">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <h3 className="font-bold text-black dark:text-white">Recently Completed</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {completedProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium text-black dark:text-white">{project.name}</h4>
                                <CheckCircle className="h-5 w-5 text-green-500" />
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{project.client}</p>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-500">{project.completed}</span>
                                <span className="font-bold text-black dark:text-white">{project.revenue}</span>
                            </div>
                            <div className="flex items-center gap-1 mt-2">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <span key={i} className={i < project.rating ? 'text-orange-500' : 'text-gray-300 dark:text-gray-600'}>★</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* New Project Modal */}
            <AnimatePresence>
                {showNewProjectModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowNewProjectModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-black rounded-xl p-6 w-full max-w-lg border border-gray-200 dark:border-gray-800"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-black dark:text-white">New Project</h3>
                                <button
                                    onClick={() => setShowNewProjectModal(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg"
                                >
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Project Name *
                                    </label>
                                    <Input
                                        value={newProject.name}
                                        onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                                        placeholder="Enter project name"
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Client *
                                    </label>
                                    <select
                                        value={newProject.client}
                                        onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                                        className={`w-full p-2 border rounded-lg bg-white dark:bg-black text-black dark:text-white ${errors.client ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                                    >
                                        <option value="">Select client</option>
                                        {clients.map(c => (
                                            <option key={c.id} value={c.name}>{c.name}</option>
                                        ))}
                                    </select>
                                    {errors.client && <p className="text-red-500 text-xs mt-1">{errors.client}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Start Date *
                                        </label>
                                        <Input
                                            type="date"
                                            value={newProject.startDate}
                                            onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                                            className={errors.startDate ? 'border-red-500' : ''}
                                        />
                                        {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            End Date *
                                        </label>
                                        <Input
                                            type="date"
                                            value={newProject.endDate}
                                            onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                                            className={errors.endDate ? 'border-red-500' : ''}
                                        />
                                        {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Location *
                                    </label>
                                    <Input
                                        value={newProject.location}
                                        onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                                        placeholder="Enter event location"
                                        className={errors.location ? 'border-red-500' : ''}
                                    />
                                    {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        value={newProject.description}
                                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                        placeholder="Project description..."
                                        rows={3}
                                        className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Equipment (comma-separated)
                                    </label>
                                    <Input
                                        value={newProject.equipment}
                                        onChange={(e) => setNewProject({ ...newProject, equipment: e.target.value })}
                                        placeholder="Projectors, Sound System, Stage..."
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setShowNewProjectModal(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                                    onClick={handleCreateProject}
                                >
                                    Create Project
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Edit Project Modal */}
            <AnimatePresence>
                {showEditModal && selectedProject && (
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
                            className="bg-white dark:bg-black rounded-xl p-6 w-full max-w-lg border border-gray-200 dark:border-gray-800"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-black dark:text-white">Edit Project</h3>
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
                                        Project Name *
                                    </label>
                                    <Input
                                        value={newProject.name}
                                        onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Client *
                                    </label>
                                    <select
                                        value={newProject.client}
                                        onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                                        className={`w-full p-2 border rounded-lg bg-white dark:bg-black text-black dark:text-white ${errors.client ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                                    >
                                        {clients.map(c => (
                                            <option key={c.id} value={c.name}>{c.name}</option>
                                        ))}
                                    </select>
                                    {errors.client && <p className="text-red-500 text-xs mt-1">{errors.client}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Start Date *
                                        </label>
                                        <Input
                                            type="date"
                                            value={newProject.startDate}
                                            onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                                            className={errors.startDate ? 'border-red-500' : ''}
                                        />
                                        {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            End Date *
                                        </label>
                                        <Input
                                            type="date"
                                            value={newProject.endDate}
                                            onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                                            className={errors.endDate ? 'border-red-500' : ''}
                                        />
                                        {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Location *
                                    </label>
                                    <Input
                                        value={newProject.location}
                                        onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                                        className={errors.location ? 'border-red-500' : ''}
                                    />
                                    {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        value={newProject.description}
                                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                        rows={3}
                                        className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Equipment (comma-separated)
                                    </label>
                                    <Input
                                        value={newProject.equipment}
                                        onChange={(e) => setNewProject({ ...newProject, equipment: e.target.value })}
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
                                    onClick={handleUpdateProject}
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
                {showDeleteModal && selectedProject && (
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
                                <h3 className="text-xl font-bold text-black dark:text-white">Delete Project</h3>
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Are you sure you want to delete <span className="font-bold text-black dark:text-white">{selectedProject.name}</span>?
                                This action cannot be undone.
                            </p>

                            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 mb-6">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    <span className="font-medium">Client:</span> {selectedProject.client}<br/>
                                    <span className="font-medium">Value:</span> {selectedProject.value}<br/>
                                    <span className="font-medium">Items:</span> {selectedProject.items}
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
                                    onClick={handleDeleteProject}
                                >
                                    Delete Project
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Project Details Drawer */}
            <AnimatePresence>
                {showDetailsDrawer && selectedProject && (
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
                                    <h3 className="text-xl font-bold text-black dark:text-white">Project Details</h3>
                                    <button
                                        onClick={() => setShowDetailsDrawer(false)}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg"
                                    >
                                        <X className="h-5 w-5 text-gray-500" />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-2xl font-bold text-black dark:text-white mb-2">{selectedProject.name}</h4>
                                        <span className={`inline-block text-xs px-3 py-1 rounded-full ${
                                            selectedProject.status === 'Equipment Ready'
                                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                                : selectedProject.status === 'In Progress'
                                                ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                                                : selectedProject.status === 'Completed'
                                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                                        }`}>
                                            {selectedProject.status}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Client</p>
                                            <p className="font-bold text-black dark:text-white">{selectedProject.client}</p>
                                        </div>
                                        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Value</p>
                                            <p className="font-bold text-black dark:text-white">{selectedProject.value}</p>
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Calendar className="h-4 w-4 text-orange-500" />
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Date Range</p>
                                        </div>
                                        <p className="font-medium text-black dark:text-white">
                                            {new Date(selectedProject.startDate).toLocaleDateString()} - {new Date(selectedProject.endDate).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
                                        <div className="flex items-center gap-2 mb-2">
                                            <MapPin className="h-4 w-4 text-orange-500" />
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                                        </div>
                                        <p className="font-medium text-black dark:text-white">{selectedProject.location}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</p>
                                        <p className="text-gray-600 dark:text-gray-400">{selectedProject.description}</p>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Package className="h-4 w-4 text-orange-500" />
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Equipment ({selectedProject.items} items)
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.equipment.map((item, i) => (
                                                <span key={i} className="text-sm px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Actions</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            {selectedProject.status === 'In Progress' && (
                                                <Button
                                                    variant="outline"
                                                    onClick={() => toggleProjectStatus(selectedProject.id, 'pause')}
                                                    className="text-orange-600"
                                                >
                                                    <Pause className="h-4 w-4 mr-2" />
                                                    Pause
                                                </Button>
                                            )}
                                            {selectedProject.status === 'Paused' && (
                                                <Button
                                                    variant="outline"
                                                    onClick={() => toggleProjectStatus(selectedProject.id, 'resume')}
                                                    className="text-green-600"
                                                >
                                                    <Play className="h-4 w-4 mr-2" />
                                                    Resume
                                                </Button>
                                            )}
                                            {selectedProject.status !== 'Completed' && (
                                                <Button
                                                    variant="outline"
                                                    onClick={() => toggleProjectStatus(selectedProject.id, 'complete')}
                                                    className="text-blue-600"
                                                >
                                                    <CheckCircle className="h-4 w-4 mr-2" />
                                                    Complete
                                                </Button>
                                            )}
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setShowDetailsDrawer(false);
                                                    openEditModal(selectedProject);
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
                                <h3 className="text-xl font-bold text-black dark:text-white">Filter Projects</h3>
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
                                        Status
                                    </label>
                                    <select
                                        value={filterOptions.status}
                                        onChange={(e) => setFilterOptions({ ...filterOptions, status: e.target.value })}
                                        className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white"
                                    >
                                        <option value="all">All Statuses</option>
                                        <option value="Planning">Planning</option>
                                        <option value="Equipment Ready">Equipment Ready</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Paused">Paused</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Client
                                    </label>
                                    <select
                                        value={filterOptions.client}
                                        onChange={(e) => setFilterOptions({ ...filterOptions, client: e.target.value })}
                                        className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-black dark:text-white"
                                    >
                                        <option value="all">All Clients</option>
                                        {clients.map(c => (
                                            <option key={c.id} value={c.name}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => {
                                        setFilterOptions({ status: 'all', client: 'all', dateRange: 'all' });
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

            {/* Day Projects Modal */}
            <AnimatePresence>
                {showDayModal && selectedDay && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowDayModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-black rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-800"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-black dark:text-white">
                                    {monthNames[currentMonth.getMonth()]} {selectedDay}, {currentMonth.getFullYear()}
                                </h3>
                                <button
                                    onClick={() => setShowDayModal(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg"
                                >
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-3">
                                {getProjectsForDay(selectedDay).map(project => (
                                    <div
                                        key={project.id}
                                        className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 cursor-pointer"
                                        onClick={() => {
                                            setSelectedProject(project);
                                            setShowDayModal(false);
                                            setShowDetailsDrawer(true);
                                        }}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-medium text-black dark:text-white">{project.name}</h4>
                                            <span className={`text-xs px-2 py-1 rounded-full ${
                                                project.status === 'In Progress'
                                                    ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                                                    : project.status === 'Equipment Ready'
                                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                                            }`}>
                                                {project.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{project.client}</p>
                                        <p className="text-sm text-gray-500 mt-1">{project.location}</p>
                                    </div>
                                ))}
                            </div>

                            <Button
                                className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white"
                                onClick={() => {
                                    setShowDayModal(false);
                                    setNewProject({
                                        ...newProject,
                                        startDate: `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`,
                                        endDate: `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`
                                    });
                                    setShowNewProjectModal(true);
                                }}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Project for This Day
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
