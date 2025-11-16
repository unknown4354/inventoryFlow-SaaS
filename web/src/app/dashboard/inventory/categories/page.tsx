'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap,
    Building2,
    Camera,
    Sparkles,
    Armchair,
    UtensilsCrossed,
    Plus,
    Edit,
    Trash2,
    X,
    Search,
    Package,
    Wrench,
    Truck,
    Monitor,
    Lightbulb,
    Speaker,
    Tent,
    type LucideIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Category {
    id: number;
    name: string;
    icon: LucideIcon;
    items: number;
    totalValue: string;
    utilization: number;
    description: string;
}

const iconOptions: { name: string; icon: LucideIcon }[] = [
    { name: 'Zap', icon: Zap },
    { name: 'Building2', icon: Building2 },
    { name: 'Camera', icon: Camera },
    { name: 'Sparkles', icon: Sparkles },
    { name: 'Armchair', icon: Armchair },
    { name: 'UtensilsCrossed', icon: UtensilsCrossed },
    { name: 'Package', icon: Package },
    { name: 'Wrench', icon: Wrench },
    { name: 'Truck', icon: Truck },
    { name: 'Monitor', icon: Monitor },
    { name: 'Lightbulb', icon: Lightbulb },
    { name: 'Speaker', icon: Speaker },
    { name: 'Tent', icon: Tent },
];

const initialCategories: Category[] = [
    {
        id: 1,
        name: 'Electrical',
        icon: Zap,
        items: 145,
        totalValue: '₹24.5L',
        utilization: 72,
        description: 'Generators, Lights, Power Distribution'
    },
    {
        id: 2,
        name: 'Structures',
        icon: Building2,
        items: 89,
        totalValue: '₹18.2L',
        utilization: 85,
        description: 'Trusses, Stages, Barricades, Scaffolding'
    },
    {
        id: 3,
        name: 'AV Equipment',
        icon: Camera,
        items: 123,
        totalValue: '₹32.8L',
        utilization: 78,
        description: 'Projectors, Screens, Sound Systems, Microphones'
    },
    {
        id: 4,
        name: 'Decor',
        icon: Sparkles,
        items: 234,
        totalValue: '₹15.6L',
        utilization: 92,
        description: 'Centerpieces, Backdrops, Floral, Props'
    },
    {
        id: 5,
        name: 'Furniture',
        icon: Armchair,
        items: 178,
        totalValue: '₹28.4L',
        utilization: 88,
        description: 'Chairs, Tables, Sofas, Counters'
    },
    {
        id: 6,
        name: 'Catering',
        icon: UtensilsCrossed,
        items: 156,
        totalValue: '₹19.8L',
        utilization: 76,
        description: 'Warmers, Chafing Dishes, Beverage Dispensers'
    },
];

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showViewItemsModal, setShowViewItemsModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        selectedIcon: iconOptions[0]
    });
    const [formErrors, setFormErrors] = useState<{ name?: string; description?: string }>({});

    const totalItems = categories.reduce((sum, cat) => sum + cat.items, 0);
    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const validateForm = () => {
        const errors: { name?: string; description?: string } = {};
        if (!formData.name.trim()) {
            errors.name = 'Category name is required';
        }
        if (!formData.description.trim()) {
            errors.description = 'Description is required';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddCategory = () => {
        if (!validateForm()) return;

        const newCategory: Category = {
            id: Math.max(...categories.map(c => c.id)) + 1,
            name: formData.name,
            icon: formData.selectedIcon.icon,
            items: 0,
            totalValue: '₹0',
            utilization: 0,
            description: formData.description
        };

        setCategories([...categories, newCategory]);
        setShowAddModal(false);
        resetForm();
    };

    const handleEditCategory = () => {
        if (!validateForm() || !selectedCategory) return;

        setCategories(categories.map(cat =>
            cat.id === selectedCategory.id
                ? {
                    ...cat,
                    name: formData.name,
                    description: formData.description,
                    icon: formData.selectedIcon.icon
                }
                : cat
        ));
        setShowEditModal(false);
        resetForm();
    };

    const handleDeleteCategory = () => {
        if (!selectedCategory) return;
        setCategories(categories.filter(cat => cat.id !== selectedCategory.id));
        setShowDeleteModal(false);
        setSelectedCategory(null);
    };

    const openEditModal = (category: Category) => {
        setSelectedCategory(category);
        setFormData({
            name: category.name,
            description: category.description,
            selectedIcon: iconOptions.find(opt => opt.icon === category.icon) || iconOptions[0]
        });
        setShowEditModal(true);
    };

    const openDeleteModal = (category: Category) => {
        setSelectedCategory(category);
        setShowDeleteModal(true);
    };

    const openViewItemsModal = (category: Category) => {
        setSelectedCategory(category);
        setShowViewItemsModal(true);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            selectedIcon: iconOptions[0]
        });
        setFormErrors({});
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
                <div>
                    <h1 className="text-3xl font-bold text-black dark:text-white">Inventory Categories</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and organize your inventory types</p>
                </div>
                <Button
                    onClick={() => {
                        resetForm();
                        setShowAddModal(true);
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Category
                </Button>
            </motion.div>

            {/* Search Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="relative"
            >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                />
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-4"
                >
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Categories</p>
                    <p className="text-2xl font-bold text-black dark:text-white">{categories.length}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Inventory types</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-4"
                >
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Items</p>
                    <p className="text-2xl font-bold text-black dark:text-white">{totalItems}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Across all categories</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-4"
                >
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Utilization</p>
                    <p className="text-2xl font-bold text-black dark:text-white">
                        {Math.round(categories.reduce((sum, cat) => sum + cat.utilization, 0) / categories.length)}%
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Overall efficiency</p>
                </motion.div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {filteredCategories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            className="group rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black hover:border-orange-500 dark:hover:border-orange-500 transition-all overflow-hidden"
                        >
                            <div className="p-6">
                                {/* Icon and Name */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-900 group-hover:bg-orange-50 dark:group-hover:bg-orange-950 transition-colors">
                                        <category.icon className="h-6 w-6 text-gray-700 dark:text-gray-300 group-hover:text-orange-500 transition-colors" />
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => openEditModal(category)}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 dark:hover:bg-gray-900"
                                        >
                                            <Edit className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => openDeleteModal(category)}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-black dark:text-white mb-1">{category.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{category.description}</p>

                                {/* Stats */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Total Items</span>
                                        <span className="text-sm font-bold text-black dark:text-white">{category.items}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Total Value</span>
                                        <span className="text-sm font-bold text-black dark:text-white">{category.totalValue}</span>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Utilization</span>
                                            <span className="text-sm font-bold text-black dark:text-white">{category.utilization}%</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-gray-600 to-orange-500"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${category.utilization}%` }}
                                                transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* View Details Button */}
                            <div className="px-6 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => openViewItemsModal(category)}
                                    className="w-full hover:bg-orange-50 dark:hover:bg-orange-950 hover:text-orange-600 text-gray-700 dark:text-gray-300"
                                >
                                    View Items →
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredCategories.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                >
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">No categories found matching your search</p>
                </motion.div>
            )}

            {/* Add Category Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowAddModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-6 w-full max-w-lg"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-black dark:text-white">Add New Category</h2>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowAddModal(false)}
                                    className="hover:bg-gray-100 dark:hover:bg-gray-900"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <Label className="text-black dark:text-white">Category Name</Label>
                                    <Input
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g., Safety Equipment"
                                        className="mt-1 border-gray-200 dark:border-gray-700"
                                    />
                                    {formErrors.name && (
                                        <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <Label className="text-black dark:text-white">Description</Label>
                                    <Input
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="e.g., Helmets, Gloves, Safety Vests"
                                        className="mt-1 border-gray-200 dark:border-gray-700"
                                    />
                                    {formErrors.description && (
                                        <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
                                    )}
                                </div>

                                <div>
                                    <Label className="text-black dark:text-white mb-2 block">Select Icon</Label>
                                    <div className="grid grid-cols-6 gap-2">
                                        {iconOptions.map((option) => (
                                            <button
                                                key={option.name}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, selectedIcon: option })}
                                                className={`p-3 rounded-lg border-2 transition-all ${
                                                    formData.selectedIcon.name === option.name
                                                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-950'
                                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                                }`}
                                            >
                                                <option.icon className={`h-5 w-5 mx-auto ${
                                                    formData.selectedIcon.name === option.name
                                                        ? 'text-orange-500'
                                                        : 'text-gray-600 dark:text-gray-400'
                                                }`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 border-gray-200 dark:border-gray-700"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleAddCategory}
                                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                                >
                                    Add Category
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Edit Category Modal */}
            <AnimatePresence>
                {showEditModal && selectedCategory && (
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
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-6 w-full max-w-lg"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-black dark:text-white">Edit Category</h2>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowEditModal(false)}
                                    className="hover:bg-gray-100 dark:hover:bg-gray-900"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <Label className="text-black dark:text-white">Category Name</Label>
                                    <Input
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="mt-1 border-gray-200 dark:border-gray-700"
                                    />
                                    {formErrors.name && (
                                        <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <Label className="text-black dark:text-white">Description</Label>
                                    <Input
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="mt-1 border-gray-200 dark:border-gray-700"
                                    />
                                    {formErrors.description && (
                                        <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
                                    )}
                                </div>

                                <div>
                                    <Label className="text-black dark:text-white mb-2 block">Select Icon</Label>
                                    <div className="grid grid-cols-6 gap-2">
                                        {iconOptions.map((option) => (
                                            <button
                                                key={option.name}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, selectedIcon: option })}
                                                className={`p-3 rounded-lg border-2 transition-all ${
                                                    formData.selectedIcon.name === option.name
                                                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-950'
                                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                                }`}
                                            >
                                                <option.icon className={`h-5 w-5 mx-auto ${
                                                    formData.selectedIcon.name === option.name
                                                        ? 'text-orange-500'
                                                        : 'text-gray-600 dark:text-gray-400'
                                                }`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowEditModal(false)}
                                    className="flex-1 border-gray-200 dark:border-gray-700"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleEditCategory}
                                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
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
                {showDeleteModal && selectedCategory && (
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
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-6 w-full max-w-md"
                        >
                            <div className="text-center">
                                <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-950 rounded-full flex items-center justify-center mb-4">
                                    <Trash2 className="h-6 w-6 text-red-600" />
                                </div>
                                <h2 className="text-xl font-bold text-black dark:text-white mb-2">Delete Category</h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    Are you sure you want to delete <span className="font-semibold text-black dark:text-white">{selectedCategory.name}</span>?
                                    This will affect {selectedCategory.items} items in this category.
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 border-gray-200 dark:border-gray-700"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleDeleteCategory}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                                >
                                    Delete
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* View Items Modal */}
            <AnimatePresence>
                {showViewItemsModal && selectedCategory && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowViewItemsModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-950">
                                        <selectedCategory.icon className="h-5 w-5 text-orange-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-black dark:text-white">{selectedCategory.name}</h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{selectedCategory.items} items</p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowViewItemsModal(false)}
                                    className="hover:bg-gray-100 dark:hover:bg-gray-900"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="relative mb-4">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search items in this category..."
                                    className="pl-10 border-gray-200 dark:border-gray-700"
                                />
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-3">
                                {/* Sample items - in production these would come from API */}
                                {[
                                    { name: `${selectedCategory.name} Item 1`, sku: 'SKU-001', status: 'Available', qty: 15 },
                                    { name: `${selectedCategory.name} Item 2`, sku: 'SKU-002', status: 'In Use', qty: 8 },
                                    { name: `${selectedCategory.name} Item 3`, sku: 'SKU-003', status: 'Maintenance', qty: 3 },
                                    { name: `${selectedCategory.name} Item 4`, sku: 'SKU-004', status: 'Available', qty: 22 },
                                    { name: `${selectedCategory.name} Item 5`, sku: 'SKU-005', status: 'Reserved', qty: 10 },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-500 transition-colors"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-black dark:text-white">{item.name}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    SKU: {item.sku} • Qty: {item.qty}
                                                </p>
                                            </div>
                                            <span className={`text-xs px-2 py-1 rounded-full ${
                                                item.status === 'Available' ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400' :
                                                item.status === 'In Use' ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400' :
                                                item.status === 'Maintenance' ? 'bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400' :
                                                'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                                <Button
                                    onClick={() => setShowViewItemsModal(false)}
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                                >
                                    Close
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
