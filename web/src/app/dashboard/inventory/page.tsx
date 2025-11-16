'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Package,
    Search,
    Filter,
    Plus,
    Download,
    Upload,
    Zap,
    Building2,
    Camera,
    Sparkles,
    Armchair,
    UtensilsCrossed,
    AlertCircle,
    CheckCircle,
    Wrench,
    Eye,
    Edit,
    Trash2,
    MoreHorizontal,
    ArrowUpDown,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    QrCode,
    MapPin,
    Calendar,
    IndianRupee,
    TrendingUp,
    Clock,
    AlertTriangle,
    X,
    Copy,
    Archive,
    ArrowRightLeft,
    FileSpreadsheet,
    FileText,
    Image,
    Barcode,
    ScanLine,
    Save,
    RotateCcw,
    History,
    Settings,
    Tag,
    Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Comprehensive inventory data based on documentation
const initialInventoryItems = [
    {
        id: 1,
        name: 'LED Moving Head Light',
        code: 'ELC-001',
        barcode: 'INV-ELC-001-2024',
        category: 'Electrical',
        subcategory: 'Stage Lighting',
        quantity: 24,
        available: 18,
        inUse: 6,
        reserved: 0,
        condition: 'Excellent',
        status: 'AVAILABLE',
        purchasePrice: 45000,
        rentalPrice: 2500,
        currentValue: 38000,
        warehouse: 'Mumbai Central',
        locationPath: 'WH1 > Zone A > Rack 3',
        lastMaintenance: '2025-10-15',
        nextMaintenance: '2026-01-15',
        totalHours: 480,
        utilization: 78,
        icon: Zap,
        specs: { voltage: '220V', wattage: '230W', dmxChannels: 16 },
        notes: 'High-demand item for concerts',
        tags: ['popular', 'stage', 'lighting']
    },
    {
        id: 2,
        name: 'Truss System 10ft',
        code: 'STR-001',
        barcode: 'INV-STR-001-2024',
        category: 'Structures',
        subcategory: 'Rigging',
        quantity: 15,
        available: 10,
        inUse: 5,
        reserved: 0,
        condition: 'Good',
        status: 'AVAILABLE',
        purchasePrice: 85000,
        rentalPrice: 4500,
        currentValue: 72000,
        warehouse: 'Mumbai Central',
        locationPath: 'WH1 > Zone B > Floor',
        lastMaintenance: '2025-09-20',
        nextMaintenance: '2025-12-20',
        totalHours: 0,
        utilization: 85,
        icon: Building2,
        specs: { length: '10ft', material: 'Aluminum', loadCapacity: '500kg' },
        notes: 'Inspect before each use',
        tags: ['rigging', 'structure']
    },
    {
        id: 3,
        name: '4K Projector',
        code: 'AV-001',
        barcode: 'INV-AV-001-2024',
        category: 'AV Equipment',
        subcategory: 'Visual',
        quantity: 8,
        available: 5,
        inUse: 3,
        reserved: 0,
        condition: 'Excellent',
        status: 'AVAILABLE',
        purchasePrice: 125000,
        rentalPrice: 8000,
        currentValue: 110000,
        warehouse: 'Mumbai West',
        locationPath: 'WH2 > Zone A > Shelf 2',
        lastMaintenance: '2025-11-01',
        nextMaintenance: '2026-02-01',
        totalHours: 320,
        utilization: 72,
        icon: Camera,
        specs: { resolution: '4K', brightness: '6000 lumens', throwDistance: '2-15m' },
        notes: 'Handle with care',
        tags: ['projector', 'visual', 'high-value']
    },
    {
        id: 4,
        name: 'Crystal Centerpiece - Royal',
        code: 'DEC-001',
        barcode: 'INV-DEC-001-2024',
        category: 'Decor',
        subcategory: 'Centerpieces',
        quantity: 150,
        available: 120,
        inUse: 30,
        reserved: 0,
        condition: 'Good',
        status: 'AVAILABLE',
        purchasePrice: 3500,
        rentalPrice: 500,
        currentValue: 2800,
        warehouse: 'Mumbai Central',
        locationPath: 'WH1 > Zone C > Shelf 5',
        lastMaintenance: '2025-10-01',
        nextMaintenance: '2026-04-01',
        totalHours: 0,
        utilization: 92,
        icon: Sparkles,
        specs: { style: 'Traditional', theme: 'Royal', primaryColor: 'Gold' },
        notes: 'Clean after each event',
        tags: ['decor', 'centerpiece']
    },
    {
        id: 5,
        name: 'Chiavari Chair - Gold',
        code: 'FUR-001',
        barcode: 'INV-FUR-001-2024',
        category: 'Furniture',
        subcategory: 'Seating',
        quantity: 500,
        available: 350,
        inUse: 150,
        reserved: 0,
        condition: 'Good',
        status: 'AVAILABLE',
        purchasePrice: 2500,
        rentalPrice: 150,
        currentValue: 2000,
        warehouse: 'Mumbai East',
        locationPath: 'WH3 > Zone A > Stack 1',
        lastMaintenance: '2025-08-15',
        nextMaintenance: '2025-11-15',
        totalHours: 0,
        utilization: 88,
        icon: Armchair,
        specs: { material: 'Resin', finish: 'Gold', stackable: true },
        notes: 'Check for scratches',
        tags: ['seating', 'chair', 'gold']
    },
    {
        id: 6,
        name: 'Buffet Warmer 8ft',
        code: 'CAT-001',
        barcode: 'INV-CAT-001-2024',
        category: 'Catering',
        subcategory: 'Serving',
        quantity: 20,
        available: 15,
        inUse: 5,
        reserved: 0,
        condition: 'Good',
        status: 'AVAILABLE',
        purchasePrice: 45000,
        rentalPrice: 3500,
        currentValue: 38000,
        warehouse: 'Mumbai Central',
        locationPath: 'WH1 > Zone D > Rack 1',
        lastMaintenance: '2025-10-20',
        nextMaintenance: '2026-01-20',
        totalHours: 0,
        utilization: 76,
        icon: UtensilsCrossed,
        specs: { capacity: '8 dishes', heatingMethod: 'Electric', material: 'Stainless Steel' },
        notes: 'Test heating before dispatch',
        tags: ['catering', 'warmer']
    },
    {
        id: 7,
        name: 'Wireless Microphone Set',
        code: 'AV-002',
        barcode: 'INV-AV-002-2024',
        category: 'AV Equipment',
        subcategory: 'Audio',
        quantity: 30,
        available: 22,
        inUse: 8,
        reserved: 0,
        condition: 'Good',
        status: 'AVAILABLE',
        purchasePrice: 25000,
        rentalPrice: 1500,
        currentValue: 21000,
        warehouse: 'Mumbai West',
        locationPath: 'WH2 > Zone B > Shelf 4',
        lastMaintenance: '2025-11-05',
        nextMaintenance: '2026-02-05',
        totalHours: 0,
        utilization: 80,
        icon: Camera,
        specs: { type: 'Handheld', frequency: 'UHF', range: '100m' },
        notes: 'Check batteries',
        tags: ['audio', 'wireless', 'microphone']
    },
    {
        id: 8,
        name: 'Generator 15KVA',
        code: 'ELC-002',
        barcode: 'INV-ELC-002-2024',
        category: 'Electrical',
        subcategory: 'Power Equipment',
        quantity: 6,
        available: 4,
        inUse: 2,
        reserved: 0,
        condition: 'Good',
        status: 'AVAILABLE',
        purchasePrice: 350000,
        rentalPrice: 15000,
        currentValue: 295000,
        warehouse: 'Mumbai East',
        locationPath: 'WH3 > Zone B > Bay 2',
        lastMaintenance: '2025-11-10',
        nextMaintenance: '2025-12-10',
        totalHours: 890,
        utilization: 68,
        icon: Zap,
        specs: { kvaRating: '15KVA', fuelType: 'Diesel', runTime: '8 hours' },
        notes: 'Check oil level',
        tags: ['power', 'generator', 'heavy']
    },
    {
        id: 9,
        name: 'Round Table 6ft',
        code: 'FUR-002',
        barcode: 'INV-FUR-002-2024',
        category: 'Furniture',
        subcategory: 'Tables',
        quantity: 80,
        available: 60,
        inUse: 20,
        reserved: 0,
        condition: 'Good',
        status: 'AVAILABLE',
        purchasePrice: 8500,
        rentalPrice: 450,
        currentValue: 7200,
        warehouse: 'Mumbai Central',
        locationPath: 'WH1 > Zone E > Stack 3',
        lastMaintenance: '2025-09-01',
        nextMaintenance: '2025-12-01',
        totalHours: 0,
        utilization: 82,
        icon: Armchair,
        specs: { diameter: '6ft', seating: '10 guests', foldable: true },
        notes: 'Check legs stability',
        tags: ['table', 'round', 'foldable']
    },
    {
        id: 10,
        name: 'Stage Platform 8x4',
        code: 'STR-002',
        barcode: 'INV-STR-002-2024',
        category: 'Structures',
        subcategory: 'Staging',
        quantity: 40,
        available: 30,
        inUse: 10,
        reserved: 0,
        condition: 'Good',
        status: 'MAINTENANCE',
        purchasePrice: 12000,
        rentalPrice: 800,
        currentValue: 10200,
        warehouse: 'Mumbai Central',
        locationPath: 'WH1 > Zone B > Stack 5',
        lastMaintenance: '2025-10-25',
        nextMaintenance: '2025-11-25',
        totalHours: 0,
        utilization: 75,
        icon: Building2,
        specs: { size: '8x4 ft', height: 'Adjustable', loadCapacity: '750kg' },
        notes: 'Maintenance scheduled',
        tags: ['stage', 'platform']
    },
    {
        id: 11,
        name: 'Flower Arch Frame',
        code: 'DEC-002',
        barcode: 'INV-DEC-002-2024',
        category: 'Decor',
        subcategory: 'Backdrops',
        quantity: 12,
        available: 8,
        inUse: 4,
        reserved: 0,
        condition: 'Excellent',
        status: 'AVAILABLE',
        purchasePrice: 45000,
        rentalPrice: 5000,
        currentValue: 40000,
        warehouse: 'Mumbai West',
        locationPath: 'WH2 > Zone C > Floor',
        lastMaintenance: '2025-11-01',
        nextMaintenance: '2026-05-01',
        totalHours: 0,
        utilization: 95,
        icon: Sparkles,
        specs: { style: 'Modern', customizable: true, height: '10ft' },
        notes: 'Most popular item',
        tags: ['arch', 'backdrop', 'popular']
    },
    {
        id: 12,
        name: 'Sound System PA',
        code: 'AV-003',
        barcode: 'INV-AV-003-2024',
        category: 'AV Equipment',
        subcategory: 'Audio',
        quantity: 10,
        available: 7,
        inUse: 3,
        reserved: 0,
        condition: 'Good',
        status: 'AVAILABLE',
        purchasePrice: 185000,
        rentalPrice: 12000,
        currentValue: 157000,
        warehouse: 'Mumbai Central',
        locationPath: 'WH1 > Zone A > Rack 6',
        lastMaintenance: '2025-10-30',
        nextMaintenance: '2026-01-30',
        totalHours: 450,
        utilization: 70,
        icon: Camera,
        specs: { power: '2000W', coverage: '500 guests', wireless: true },
        notes: 'Professional grade',
        tags: ['audio', 'pa-system', 'professional']
    },
];

const vendorCategories = [
    { name: 'All Items', value: 'all', icon: Package, count: 925, color: 'gray' },
    { name: 'Electrical', value: 'electrical', icon: Zap, count: 145, color: 'orange' },
    { name: 'Structures', value: 'structures', icon: Building2, count: 89, color: 'orange' },
    { name: 'AV Equipment', value: 'av', icon: Camera, count: 123, color: 'orange' },
    { name: 'Decor', value: 'decor', icon: Sparkles, count: 234, color: 'orange' },
    { name: 'Furniture', value: 'furniture', icon: Armchair, count: 178, color: 'orange' },
    { name: 'Catering', value: 'catering', icon: UtensilsCrossed, count: 156, color: 'orange' },
];

const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'AVAILABLE', label: 'Available' },
    { value: 'IN_USE', label: 'In Use' },
    { value: 'MAINTENANCE', label: 'Maintenance' },
    { value: 'RESERVED', label: 'Reserved' },
    { value: 'DAMAGED', label: 'Damaged' },
];

const conditionOptions = [
    { value: 'all', label: 'All Conditions' },
    { value: 'Excellent', label: 'Excellent' },
    { value: 'Good', label: 'Good' },
    { value: 'Fair', label: 'Fair' },
    { value: 'Poor', label: 'Poor' },
];

const warehouseOptions = [
    { value: 'all', label: 'All Warehouses' },
    { value: 'Mumbai Central', label: 'Mumbai Central' },
    { value: 'Mumbai West', label: 'Mumbai West' },
    { value: 'Mumbai East', label: 'Mumbai East' },
];

const categoryOptions = [
    { value: 'Electrical', label: 'Electrical' },
    { value: 'Structures', label: 'Structures' },
    { value: 'AV Equipment', label: 'AV Equipment' },
    { value: 'Decor', label: 'Decor' },
    { value: 'Furniture', label: 'Furniture' },
    { value: 'Catering', label: 'Catering' },
];

export default function InventoryPage() {
    const [inventoryItems, setInventoryItems] = useState(initialInventoryItems);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [conditionFilter, setConditionFilter] = useState('all');
    const [warehouseFilter, setWarehouseFilter] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Modal states
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [showScanModal, setShowScanModal] = useState(false);
    const [showTransferModal, setShowTransferModal] = useState(false);
    const [showArchiveModal, setShowArchiveModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showQuickActions, setShowQuickActions] = useState<number | null>(null);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [viewingItem, setViewingItem] = useState<any>(null);
    const [transferringItem, setTransferringItem] = useState<any>(null);
    const [archivingItem, setArchivingItem] = useState<any>(null);
    const [deletingItem, setDeletingItem] = useState<any>(null);

    // Form state for add/edit
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        barcode: '',
        category: 'Electrical',
        subcategory: '',
        quantity: 1,
        condition: 'Good',
        status: 'AVAILABLE',
        purchasePrice: 0,
        rentalPrice: 0,
        currentValue: 0,
        warehouse: 'Mumbai Central',
        locationPath: '',
        notes: '',
        tags: ''
    });

    // Import state
    const [importFile, setImportFile] = useState<File | null>(null);
    const [importPreview, setImportPreview] = useState<any[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Scan state
    const [scanMode, setScanMode] = useState<'camera' | 'manual'>('manual');
    const [manualBarcode, setManualBarcode] = useState('');
    const [scanResult, setScanResult] = useState<any>(null);

    // Transfer state
    const [transferData, setTransferData] = useState({
        targetWarehouse: 'Mumbai West',
        targetLocation: '',
        quantity: 1,
        reason: '',
        notes: ''
    });

    // Archive state
    const [archiveReason, setArchiveReason] = useState('');

    // Filter items based on all criteria
    const filteredItems = inventoryItems.filter(item => {
        const matchesCategory = selectedCategory === 'all' ||
            item.category.toLowerCase().replace(' ', '') === selectedCategory.replace('av', 'avequipment');
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.barcode.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
        const matchesCondition = conditionFilter === 'all' || item.condition === conditionFilter;
        const matchesWarehouse = warehouseFilter === 'all' || item.warehouse === warehouseFilter;

        return matchesCategory && matchesSearch && matchesStatus && matchesCondition && matchesWarehouse;
    });

    // Sort items
    const sortedItems = [...filteredItems].sort((a, b) => {
        let aVal = (a as any)[sortField];
        let bVal = (b as any)[sortField];

        if (typeof aVal === 'string') {
            aVal = aVal.toLowerCase();
            bVal = bVal.toLowerCase();
        }

        if (sortDirection === 'asc') {
            return aVal > bVal ? 1 : -1;
        } else {
            return aVal < bVal ? 1 : -1;
        }
    });

    // Pagination
    const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
    const paginatedItems = sortedItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const handleSelectAll = () => {
        if (selectedItems.length === paginatedItems.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(paginatedItems.map(item => item.id));
        }
    };

    const handleSelectItem = (id: number) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(i => i !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    // Add Item Handler
    const handleAddItem = () => {
        const newItem = {
            id: Math.max(...inventoryItems.map(i => i.id)) + 1,
            ...formData,
            available: formData.quantity,
            inUse: 0,
            reserved: 0,
            lastMaintenance: new Date().toISOString().split('T')[0],
            nextMaintenance: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            totalHours: 0,
            utilization: 0,
            icon: getCategoryIcon(formData.category),
            specs: {} as Record<string, unknown>,
            tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
        } as typeof inventoryItems[number];
        setInventoryItems([...inventoryItems, newItem]);
        setShowAddModal(false);
        resetForm();
    };

    // Edit Item Handler
    const handleEditItem = () => {
        if (!editingItem) return;
        const updatedItems = inventoryItems.map(item =>
            item.id === editingItem.id ? { ...item, ...formData, tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean) } : item
        );
        setInventoryItems(updatedItems);
        setShowEditModal(false);
        setEditingItem(null);
        resetForm();
    };

    // Delete Item Handler
    const handleDeleteItem = (id: number) => {
        setInventoryItems(inventoryItems.filter(item => item.id !== id));
        setSelectedItems(selectedItems.filter(i => i !== id));
    };

    // Duplicate Item Handler
    const handleDuplicateItem = (item: any) => {
        const newItem = {
            ...item,
            id: Math.max(...inventoryItems.map(i => i.id)) + 1,
            name: `${item.name} (Copy)`,
            code: `${item.code}-COPY`,
            barcode: `${item.barcode}-COPY`
        };
        setInventoryItems([...inventoryItems, newItem]);
        setShowQuickActions(null);
    };

    // Export Handler
    const handleExport = (format: 'csv' | 'json') => {
        const itemsToExport = selectedItems.length > 0
            ? inventoryItems.filter(item => selectedItems.includes(item.id))
            : filteredItems;

        if (format === 'csv') {
            const headers = ['ID', 'Name', 'Code', 'Barcode', 'Category', 'Subcategory', 'Quantity', 'Available', 'Status', 'Condition', 'Purchase Price', 'Rental Price', 'Current Value', 'Warehouse', 'Location', 'Utilization'];
            const csvContent = [
                headers.join(','),
                ...itemsToExport.map(item => [
                    item.id,
                    `"${item.name}"`,
                    item.code,
                    item.barcode,
                    item.category,
                    item.subcategory,
                    item.quantity,
                    item.available,
                    item.status,
                    item.condition,
                    item.purchasePrice,
                    item.rentalPrice,
                    item.currentValue,
                    item.warehouse,
                    `"${item.locationPath}"`,
                    item.utilization
                ].join(','))
            ].join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `inventory_export_${new Date().toISOString().split('T')[0]}.csv`;
            link.click();
        } else {
            const jsonContent = JSON.stringify(itemsToExport, null, 2);
            const blob = new Blob([jsonContent], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `inventory_export_${new Date().toISOString().split('T')[0]}.json`;
            link.click();
        }
    };

    // Import Handler
    const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImportFile(file);

        // Preview first few rows (mock)
        setImportPreview([
            { name: 'LED Par Light', code: 'ELC-003', quantity: 50, category: 'Electrical' },
            { name: 'Cocktail Table', code: 'FUR-003', quantity: 30, category: 'Furniture' },
            { name: 'Chafing Dish', code: 'CAT-002', quantity: 100, category: 'Catering' }
        ]);
    };

    const handleImportConfirm = () => {
        // Add imported items
        const newItems = importPreview.map((item, index) => ({
            id: Math.max(...inventoryItems.map(i => i.id)) + index + 1,
            ...item,
            barcode: `INV-${item.code}-2024`,
            subcategory: 'General',
            available: item.quantity,
            inUse: 0,
            reserved: 0,
            condition: 'Good',
            status: 'AVAILABLE',
            purchasePrice: 10000,
            rentalPrice: 500,
            currentValue: 8500,
            warehouse: 'Mumbai Central',
            locationPath: 'WH1 > Zone A > New',
            lastMaintenance: new Date().toISOString().split('T')[0],
            nextMaintenance: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            totalHours: 0,
            utilization: 0,
            icon: getCategoryIcon(item.category),
            specs: {},
            notes: 'Imported item',
            tags: ['imported']
        }));
        setInventoryItems([...inventoryItems, ...newItems]);
        setShowImportModal(false);
        setImportFile(null);
        setImportPreview([]);
    };

    // Scan Handler
    const handleScanBarcode = () => {
        const foundItem = inventoryItems.find(item => item.barcode === manualBarcode);
        if (foundItem) {
            setScanResult(foundItem);
        } else {
            setScanResult({ error: 'Item not found' });
        }
    };

    // Transfer Handler
    const handleTransfer = () => {
        if (!transferringItem) return;
        const updatedItems = inventoryItems.map(item =>
            item.id === transferringItem.id
                ? {
                    ...item,
                    warehouse: transferData.targetWarehouse,
                    locationPath: transferData.targetLocation || `${transferData.targetWarehouse} > New Location`,
                    notes: item.notes + `\n[${new Date().toLocaleDateString()}] Transferred from ${transferringItem.warehouse} to ${transferData.targetWarehouse}. Reason: ${transferData.reason}`
                }
                : item
        );
        setInventoryItems(updatedItems);
        setShowTransferModal(false);
        setTransferringItem(null);
        setTransferData({
            targetWarehouse: 'Mumbai West',
            targetLocation: '',
            quantity: 1,
            reason: '',
            notes: ''
        });
        setShowQuickActions(null);
    };

    // Archive Handler
    const handleArchive = () => {
        if (!archivingItem) return;
        const updatedItems = inventoryItems.map(item =>
            item.id === archivingItem.id
                ? {
                    ...item,
                    status: 'ARCHIVED' as any,
                    notes: item.notes + `\n[${new Date().toLocaleDateString()}] Archived. Reason: ${archiveReason}`
                }
                : item
        );
        setInventoryItems(updatedItems);
        setShowArchiveModal(false);
        setArchivingItem(null);
        setArchiveReason('');
        setShowQuickActions(null);
    };

    // Delete Handler with confirmation
    const handleConfirmDelete = () => {
        if (!deletingItem) return;
        setInventoryItems(inventoryItems.filter(item => item.id !== deletingItem.id));
        setSelectedItems(selectedItems.filter(i => i !== deletingItem.id));
        setShowDeleteModal(false);
        setDeletingItem(null);
        setShowQuickActions(null);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            code: '',
            barcode: '',
            category: 'Electrical',
            subcategory: '',
            quantity: 1,
            condition: 'Good',
            status: 'AVAILABLE',
            purchasePrice: 0,
            rentalPrice: 0,
            currentValue: 0,
            warehouse: 'Mumbai Central',
            locationPath: '',
            notes: '',
            tags: ''
        });
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Electrical': return Zap;
            case 'Structures': return Building2;
            case 'AV Equipment': return Camera;
            case 'Decor': return Sparkles;
            case 'Furniture': return Armchair;
            case 'Catering': return UtensilsCrossed;
            default: return Package;
        }
    };

    const openEditModal = (item: any) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            code: item.code,
            barcode: item.barcode,
            category: item.category,
            subcategory: item.subcategory,
            quantity: item.quantity,
            condition: item.condition,
            status: item.status,
            purchasePrice: item.purchasePrice,
            rentalPrice: item.rentalPrice,
            currentValue: item.currentValue,
            warehouse: item.warehouse,
            locationPath: item.locationPath,
            notes: item.notes || '',
            tags: item.tags?.join(', ') || ''
        });
        setShowEditModal(true);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'AVAILABLE':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Available</span>;
            case 'IN_USE':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800"><AlertCircle className="h-3 w-3 mr-1" />In Use</span>;
            case 'MAINTENANCE':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><Wrench className="h-3 w-3 mr-1" />Maintenance</span>;
            case 'RESERVED':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><Calendar className="h-3 w-3 mr-1" />Reserved</span>;
            case 'DAMAGED':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><AlertTriangle className="h-3 w-3 mr-1" />Damaged</span>;
            default:
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
        }
    };

    const getConditionBadge = (condition: string) => {
        switch (condition) {
            case 'Excellent':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">{condition}</span>;
            case 'Good':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{condition}</span>;
            case 'Fair':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">{condition}</span>;
            case 'Poor':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">{condition}</span>;
            default:
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{condition}</span>;
        }
    };

    const formatCurrency = (amount: number) => {
        if (amount >= 100000) {
            return `₹${(amount / 100000).toFixed(1)}L`;
        }
        return `₹${amount.toLocaleString('en-IN')}`;
    };

    // Calculate summary stats
    const totalItems = filteredItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalAvailable = filteredItems.reduce((sum, item) => sum + item.available, 0);
    const totalInUse = filteredItems.reduce((sum, item) => sum + item.inUse, 0);
    const totalValue = filteredItems.reduce((sum, item) => sum + (item.currentValue * item.quantity), 0);
    const avgUtilization = filteredItems.length > 0
        ? Math.round(filteredItems.reduce((sum, item) => sum + item.utilization, 0) / filteredItems.length)
        : 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-3xl font-bold text-black">Inventory Management</h1>
                    <p className="text-gray-600 mt-1">Manage all your equipment and assets across 6 vendor categories</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="border-gray-200 hover:border-orange-500"
                        onClick={() => setShowImportModal(true)}
                    >
                        <Upload className="h-4 w-4 mr-2" />
                        Import
                    </Button>
                    <Button
                        variant="outline"
                        className="border-gray-200 hover:border-orange-500"
                        onClick={() => handleExport('csv')}
                    >
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                    <Button
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                        onClick={() => setShowAddModal(true)}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Item
                    </Button>
                </div>
            </motion.div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-xl border border-gray-200 bg-white p-4"
                >
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-600">Total Items</p>
                        <Package className="h-4 w-4 text-gray-400" />
                    </div>
                    <p className="text-2xl font-bold text-black">{totalItems.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">Across {vendorCategories.length - 1} categories</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="rounded-xl border border-gray-200 bg-white p-4"
                >
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-600">Total Value</p>
                        <IndianRupee className="h-4 w-4 text-gray-400" />
                    </div>
                    <p className="text-2xl font-bold text-black">{formatCurrency(totalValue)}</p>
                    <p className="text-xs text-gray-500 mt-1">Current inventory value</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-xl border border-gray-200 bg-white p-4"
                >
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-600">Available</p>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <p className="text-2xl font-bold text-black">{totalAvailable.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">Ready to deploy</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="rounded-xl border border-gray-200 bg-white p-4"
                >
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-600">In Use</p>
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                    </div>
                    <p className="text-2xl font-bold text-black">{totalInUse.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">Currently deployed</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-xl border border-gray-200 bg-white p-4"
                >
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-600">Avg Utilization</p>
                        <TrendingUp className="h-4 w-4 text-orange-500" />
                    </div>
                    <p className="text-2xl font-bold text-black">{avgUtilization}%</p>
                    <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-orange-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${avgUtilization}%` }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        />
                    </div>
                </motion.div>
            </div>

            {/* Search and Filters */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="rounded-xl border border-gray-200 bg-white p-4"
            >
                <div className="flex items-center gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search by name, SKU, barcode, or category..."
                            className="pl-10 border-gray-200"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button
                        variant="outline"
                        className={`border-gray-200 ${showFilters ? 'border-orange-500 bg-orange-50' : 'hover:border-orange-500'}`}
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                        {(statusFilter !== 'all' || conditionFilter !== 'all' || warehouseFilter !== 'all') && (
                            <span className="ml-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {[statusFilter !== 'all', conditionFilter !== 'all', warehouseFilter !== 'all'].filter(Boolean).length}
                            </span>
                        )}
                    </Button>
                    <Button
                        variant="outline"
                        className="border-gray-200 hover:border-orange-500"
                        onClick={() => setShowScanModal(true)}
                    >
                        <QrCode className="h-4 w-4 mr-2" />
                        Scan
                    </Button>
                </div>

                {/* Advanced Filters */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4"
                        >
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Status</label>
                                <select
                                    className="w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-orange-500 focus:ring-orange-500"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    {statusOptions.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Condition</label>
                                <select
                                    className="w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-orange-500 focus:ring-orange-500"
                                    value={conditionFilter}
                                    onChange={(e) => setConditionFilter(e.target.value)}
                                >
                                    {conditionOptions.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Warehouse</label>
                                <select
                                    className="w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-orange-500 focus:ring-orange-500"
                                    value={warehouseFilter}
                                    onChange={(e) => setWarehouseFilter(e.target.value)}
                                >
                                    {warehouseOptions.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-end">
                                <Button
                                    variant="outline"
                                    className="border-gray-200 text-gray-600 hover:border-orange-500"
                                    onClick={() => {
                                        setStatusFilter('all');
                                        setConditionFilter('all');
                                        setWarehouseFilter('all');
                                    }}
                                >
                                    <X className="h-4 w-4 mr-2" />
                                    Clear Filters
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {vendorCategories.map((category, index) => (
                    <motion.button
                        key={category.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                        onClick={() => {
                            setSelectedCategory(category.value);
                            setCurrentPage(1);
                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all whitespace-nowrap ${
                            selectedCategory === category.value
                                ? 'bg-white border-orange-500 text-black shadow-sm'
                                : 'bg-white border-gray-200 text-gray-600 hover:border-orange-500'
                        }`}
                    >
                        <category.icon className={`h-4 w-4 ${selectedCategory === category.value ? 'text-orange-500' : ''}`} />
                        <span className="font-medium text-sm">{category.name}</span>
                        <span className="text-xs text-gray-500">({category.count})</span>
                    </motion.button>
                ))}
            </div>

            {/* Bulk Actions */}
            {selectedItems.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border-2 border-orange-500 bg-orange-50 p-4 flex items-center justify-between"
                >
                    <div className="flex items-center gap-2">
                        <span className="font-medium text-black">{selectedItems.length} items selected</span>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedItems([])}>
                            Clear
                        </Button>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-200"
                            onClick={() => handleExport('csv')}
                        >
                            <Download className="h-4 w-4 mr-2" />
                            Export Selected
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-200">
                            <Edit className="h-4 w-4 mr-2" />
                            Bulk Edit
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-red-200 text-red-600 hover:bg-red-50"
                            onClick={() => {
                                setInventoryItems(inventoryItems.filter(item => !selectedItems.includes(item.id)));
                                setSelectedItems([]);
                            }}
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                    </div>
                </motion.div>
            )}

            {/* Inventory Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="rounded-xl border border-gray-200 bg-white overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.length === paginatedItems.length && paginatedItems.length > 0}
                                        onChange={handleSelectAll}
                                        className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                                    />
                                </th>
                                <th
                                    className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:text-orange-500"
                                    onClick={() => handleSort('name')}
                                >
                                    <div className="flex items-center gap-1">
                                        Item
                                        <ArrowUpDown className="h-3 w-3" />
                                    </div>
                                </th>
                                <th
                                    className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:text-orange-500"
                                    onClick={() => handleSort('code')}
                                >
                                    <div className="flex items-center gap-1">
                                        SKU
                                        <ArrowUpDown className="h-3 w-3" />
                                    </div>
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th
                                    className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:text-orange-500"
                                    onClick={() => handleSort('quantity')}
                                >
                                    <div className="flex items-center gap-1">
                                        Qty
                                        <ArrowUpDown className="h-3 w-3" />
                                    </div>
                                </th>
                                <th
                                    className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:text-orange-500"
                                    onClick={() => handleSort('available')}
                                >
                                    <div className="flex items-center gap-1">
                                        Available
                                        <ArrowUpDown className="h-3 w-3" />
                                    </div>
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Condition
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Location
                                </th>
                                <th
                                    className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:text-orange-500"
                                    onClick={() => handleSort('utilization')}
                                >
                                    <div className="flex items-center gap-1">
                                        Utilization
                                        <ArrowUpDown className="h-3 w-3" />
                                    </div>
                                </th>
                                <th
                                    className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:text-orange-500"
                                    onClick={() => handleSort('rentalPrice')}
                                >
                                    <div className="flex items-center gap-1">
                                        Rental
                                        <ArrowUpDown className="h-3 w-3" />
                                    </div>
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {paginatedItems.map((item, index) => (
                                <motion.tr
                                    key={item.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 + index * 0.02 }}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.includes(item.id)}
                                            onChange={() => handleSelectItem(item.id)}
                                            className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                                        />
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-gray-100">
                                                <item.icon className="h-4 w-4 text-gray-700" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-black">{item.name}</p>
                                                <p className="text-xs text-gray-500">{item.category} • {item.subcategory}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div>
                                            <span className="font-mono text-sm text-gray-900">{item.code}</span>
                                            <p className="text-xs text-gray-500">{item.barcode}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        {getStatusBadge(item.status)}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className="text-sm font-medium text-black">{item.quantity}</span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-green-600">{item.available}</span>
                                            <span className="text-xs text-gray-500">/ {item.inUse} in use</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        {getConditionBadge(item.condition)}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-3 w-3 text-gray-400" />
                                            <div>
                                                <p className="text-sm text-gray-900">{item.warehouse}</p>
                                                <p className="text-xs text-gray-500">{item.locationPath}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${item.utilization >= 80 ? 'bg-green-500' : item.utilization >= 60 ? 'bg-orange-500' : 'bg-red-500'}`}
                                                    style={{ width: `${item.utilization}%` }}
                                                />
                                            </div>
                                            <span className="text-sm font-medium text-black">{item.utilization}%</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className="text-sm font-medium text-black">₹{item.rentalPrice.toLocaleString('en-IN')}</span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-1 relative">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="hover:bg-orange-50 hover:text-orange-600"
                                                onClick={() => {
                                                    setViewingItem(item);
                                                    setShowViewModal(true);
                                                }}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="hover:bg-gray-100"
                                                onClick={() => openEditModal(item)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="hover:bg-gray-100"
                                                onClick={() => setShowQuickActions(showQuickActions === item.id ? null : item.id)}
                                            >
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                            {/* Quick Actions Menu */}
                                            <AnimatePresence>
                                                {showQuickActions === item.id && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.95 }}
                                                        className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                                                    >
                                                        <div className="py-1">
                                                            <button
                                                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                                                                onClick={() => handleDuplicateItem(item)}
                                                            >
                                                                <Copy className="h-4 w-4" />
                                                                Duplicate
                                                            </button>
                                                            <button
                                                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                                                                onClick={() => {
                                                                    setTransferringItem(item);
                                                                    setShowTransferModal(true);
                                                                }}
                                                            >
                                                                <ArrowRightLeft className="h-4 w-4" />
                                                                Transfer
                                                            </button>
                                                            <button
                                                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                                                                onClick={() => {
                                                                    setArchivingItem(item);
                                                                    setShowArchiveModal(true);
                                                                }}
                                                            >
                                                                <Archive className="h-4 w-4" />
                                                                Archive
                                                            </button>
                                                            <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                                                                <History className="h-4 w-4" />
                                                                View History
                                                            </button>
                                                            <hr className="my-1" />
                                                            <button
                                                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                                                onClick={() => {
                                                                    setDeletingItem(item);
                                                                    setShowDeleteModal(true);
                                                                }}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                        Showing <span className="font-medium text-black">{((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, sortedItems.length)}</span> of{' '}
                        <span className="font-medium text-black">{sortedItems.length}</span> items
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-200"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Previous
                        </Button>
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum = i + 1;
                            if (totalPages > 5) {
                                if (currentPage > 3) {
                                    pageNum = currentPage - 2 + i;
                                }
                                if (currentPage > totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                }
                            }
                            return (
                                <Button
                                    key={pageNum}
                                    variant="outline"
                                    size="sm"
                                    className={currentPage === pageNum ? 'border-orange-500 text-orange-600' : 'border-gray-200'}
                                    onClick={() => setCurrentPage(pageNum)}
                                >
                                    {pageNum}
                                </Button>
                            );
                        })}
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-200"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </div>
            </motion.div>

            {/* Add Item Modal */}
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
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                                <h2 className="text-xl font-bold text-black">Add New Item</h2>
                                <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Item Name *</Label>
                                        <Input
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="e.g., LED Moving Head Light"
                                        />
                                    </div>
                                    <div>
                                        <Label>SKU Code *</Label>
                                        <Input
                                            value={formData.code}
                                            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                            placeholder="e.g., ELC-001"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Barcode</Label>
                                        <Input
                                            value={formData.barcode}
                                            onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                                            placeholder="e.g., INV-ELC-001-2024"
                                        />
                                    </div>
                                    <div>
                                        <Label>Category *</Label>
                                        <select
                                            className="w-full rounded-lg border border-gray-200 p-2 text-sm"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            {categoryOptions.map(opt => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Subcategory</Label>
                                        <Input
                                            value={formData.subcategory}
                                            onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                                            placeholder="e.g., Stage Lighting"
                                        />
                                    </div>
                                    <div>
                                        <Label>Quantity *</Label>
                                        <Input
                                            type="number"
                                            min="1"
                                            value={formData.quantity}
                                            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <Label>Purchase Price (₹)</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            value={formData.purchasePrice}
                                            onChange={(e) => setFormData({ ...formData, purchasePrice: parseInt(e.target.value) || 0 })}
                                        />
                                    </div>
                                    <div>
                                        <Label>Rental Price (₹)</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            value={formData.rentalPrice}
                                            onChange={(e) => setFormData({ ...formData, rentalPrice: parseInt(e.target.value) || 0 })}
                                        />
                                    </div>
                                    <div>
                                        <Label>Current Value (₹)</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            value={formData.currentValue}
                                            onChange={(e) => setFormData({ ...formData, currentValue: parseInt(e.target.value) || 0 })}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Condition</Label>
                                        <select
                                            className="w-full rounded-lg border border-gray-200 p-2 text-sm"
                                            value={formData.condition}
                                            onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                                        >
                                            <option value="Excellent">Excellent</option>
                                            <option value="Good">Good</option>
                                            <option value="Fair">Fair</option>
                                            <option value="Poor">Poor</option>
                                        </select>
                                    </div>
                                    <div>
                                        <Label>Status</Label>
                                        <select
                                            className="w-full rounded-lg border border-gray-200 p-2 text-sm"
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        >
                                            <option value="AVAILABLE">Available</option>
                                            <option value="IN_USE">In Use</option>
                                            <option value="MAINTENANCE">Maintenance</option>
                                            <option value="RESERVED">Reserved</option>
                                            <option value="DAMAGED">Damaged</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Warehouse *</Label>
                                        <select
                                            className="w-full rounded-lg border border-gray-200 p-2 text-sm"
                                            value={formData.warehouse}
                                            onChange={(e) => setFormData({ ...formData, warehouse: e.target.value })}
                                        >
                                            <option value="Mumbai Central">Mumbai Central</option>
                                            <option value="Mumbai West">Mumbai West</option>
                                            <option value="Mumbai East">Mumbai East</option>
                                        </select>
                                    </div>
                                    <div>
                                        <Label>Location Path</Label>
                                        <Input
                                            value={formData.locationPath}
                                            onChange={(e) => setFormData({ ...formData, locationPath: e.target.value })}
                                            placeholder="e.g., WH1 > Zone A > Rack 3"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label>Tags (comma separated)</Label>
                                    <Input
                                        value={formData.tags}
                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                        placeholder="e.g., popular, stage, lighting"
                                    />
                                </div>
                                <div>
                                    <Label>Notes</Label>
                                    <textarea
                                        className="w-full rounded-lg border border-gray-200 p-2 text-sm min-h-[100px]"
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        placeholder="Additional notes about the item..."
                                    />
                                </div>
                            </div>
                            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                                <Button variant="outline" onClick={() => setShowAddModal(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    className="bg-orange-500 hover:bg-orange-600 text-white"
                                    onClick={handleAddItem}
                                    disabled={!formData.name || !formData.code}
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    Add Item
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Edit Item Modal */}
            <AnimatePresence>
                {showEditModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowEditModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                                <h2 className="text-xl font-bold text-black">Edit Item</h2>
                                <Button variant="ghost" size="sm" onClick={() => setShowEditModal(false)}>
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Item Name *</Label>
                                        <Input
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label>SKU Code *</Label>
                                        <Input
                                            value={formData.code}
                                            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Barcode</Label>
                                        <Input
                                            value={formData.barcode}
                                            onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label>Category *</Label>
                                        <select
                                            className="w-full rounded-lg border border-gray-200 p-2 text-sm"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            {categoryOptions.map(opt => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Subcategory</Label>
                                        <Input
                                            value={formData.subcategory}
                                            onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label>Quantity *</Label>
                                        <Input
                                            type="number"
                                            min="1"
                                            value={formData.quantity}
                                            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <Label>Purchase Price (₹)</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            value={formData.purchasePrice}
                                            onChange={(e) => setFormData({ ...formData, purchasePrice: parseInt(e.target.value) || 0 })}
                                        />
                                    </div>
                                    <div>
                                        <Label>Rental Price (₹)</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            value={formData.rentalPrice}
                                            onChange={(e) => setFormData({ ...formData, rentalPrice: parseInt(e.target.value) || 0 })}
                                        />
                                    </div>
                                    <div>
                                        <Label>Current Value (₹)</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            value={formData.currentValue}
                                            onChange={(e) => setFormData({ ...formData, currentValue: parseInt(e.target.value) || 0 })}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Condition</Label>
                                        <select
                                            className="w-full rounded-lg border border-gray-200 p-2 text-sm"
                                            value={formData.condition}
                                            onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                                        >
                                            <option value="Excellent">Excellent</option>
                                            <option value="Good">Good</option>
                                            <option value="Fair">Fair</option>
                                            <option value="Poor">Poor</option>
                                        </select>
                                    </div>
                                    <div>
                                        <Label>Status</Label>
                                        <select
                                            className="w-full rounded-lg border border-gray-200 p-2 text-sm"
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        >
                                            <option value="AVAILABLE">Available</option>
                                            <option value="IN_USE">In Use</option>
                                            <option value="MAINTENANCE">Maintenance</option>
                                            <option value="RESERVED">Reserved</option>
                                            <option value="DAMAGED">Damaged</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Warehouse *</Label>
                                        <select
                                            className="w-full rounded-lg border border-gray-200 p-2 text-sm"
                                            value={formData.warehouse}
                                            onChange={(e) => setFormData({ ...formData, warehouse: e.target.value })}
                                        >
                                            <option value="Mumbai Central">Mumbai Central</option>
                                            <option value="Mumbai West">Mumbai West</option>
                                            <option value="Mumbai East">Mumbai East</option>
                                        </select>
                                    </div>
                                    <div>
                                        <Label>Location Path</Label>
                                        <Input
                                            value={formData.locationPath}
                                            onChange={(e) => setFormData({ ...formData, locationPath: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label>Tags (comma separated)</Label>
                                    <Input
                                        value={formData.tags}
                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label>Notes</Label>
                                    <textarea
                                        className="w-full rounded-lg border border-gray-200 p-2 text-sm min-h-[100px]"
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                                <Button variant="outline" onClick={() => setShowEditModal(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    className="bg-orange-500 hover:bg-orange-600 text-white"
                                    onClick={handleEditItem}
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Changes
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* View Item Modal */}
            <AnimatePresence>
                {showViewModal && viewingItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowViewModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 rounded-lg bg-gray-100">
                                        <viewingItem.icon className="h-6 w-6 text-gray-700" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-black">{viewingItem.name}</h2>
                                        <p className="text-sm text-gray-500">{viewingItem.code} • {viewingItem.barcode}</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => setShowViewModal(false)}>
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-3 gap-6 mb-6">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-600">Status</p>
                                        <div className="mt-1">{getStatusBadge(viewingItem.status)}</div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-600">Condition</p>
                                        <div className="mt-1">{getConditionBadge(viewingItem.condition)}</div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-600">Utilization</p>
                                        <p className="text-xl font-bold text-black mt-1">{viewingItem.utilization}%</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-black flex items-center gap-2">
                                            <Layers className="h-4 w-4 text-orange-500" />
                                            Inventory Details
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Total Quantity</span>
                                                <span className="font-medium">{viewingItem.quantity}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Available</span>
                                                <span className="font-medium text-green-600">{viewingItem.available}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">In Use</span>
                                                <span className="font-medium text-orange-600">{viewingItem.inUse}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Reserved</span>
                                                <span className="font-medium text-blue-600">{viewingItem.reserved}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-black flex items-center gap-2">
                                            <IndianRupee className="h-4 w-4 text-orange-500" />
                                            Pricing
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Purchase Price</span>
                                                <span className="font-medium">₹{viewingItem.purchasePrice.toLocaleString('en-IN')}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Rental Price</span>
                                                <span className="font-medium">₹{viewingItem.rentalPrice.toLocaleString('en-IN')}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Current Value</span>
                                                <span className="font-medium">₹{viewingItem.currentValue.toLocaleString('en-IN')}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Total Value</span>
                                                <span className="font-bold text-orange-600">{formatCurrency(viewingItem.currentValue * viewingItem.quantity)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 grid grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-black flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-orange-500" />
                                            Location
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Warehouse</span>
                                                <span className="font-medium">{viewingItem.warehouse}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Path</span>
                                                <span className="font-medium">{viewingItem.locationPath}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-black flex items-center gap-2">
                                            <Wrench className="h-4 w-4 text-orange-500" />
                                            Maintenance
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Last Maintenance</span>
                                                <span className="font-medium">{viewingItem.lastMaintenance}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Next Maintenance</span>
                                                <span className="font-medium">{viewingItem.nextMaintenance}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Total Hours</span>
                                                <span className="font-medium">{viewingItem.totalHours}h</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {viewingItem.specs && Object.keys(viewingItem.specs).length > 0 && (
                                    <div className="mt-6 space-y-4">
                                        <h3 className="font-semibold text-black flex items-center gap-2">
                                            <Settings className="h-4 w-4 text-orange-500" />
                                            Specifications
                                        </h3>
                                        <div className="grid grid-cols-3 gap-4">
                                            {Object.entries(viewingItem.specs).map(([key, value]) => (
                                                <div key={key} className="bg-gray-50 p-3 rounded-lg">
                                                    <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                                                    <p className="font-medium text-black">{String(value)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {viewingItem.tags && viewingItem.tags.length > 0 && (
                                    <div className="mt-6 space-y-4">
                                        <h3 className="font-semibold text-black flex items-center gap-2">
                                            <Tag className="h-4 w-4 text-orange-500" />
                                            Tags
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {viewingItem.tags.map((tag: string) => (
                                                <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {viewingItem.notes && (
                                    <div className="mt-6 space-y-4">
                                        <h3 className="font-semibold text-black">Notes</h3>
                                        <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{viewingItem.notes}</p>
                                    </div>
                                )}
                            </div>
                            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                                <Button variant="outline" onClick={() => setShowViewModal(false)}>
                                    Close
                                </Button>
                                <Button
                                    className="bg-orange-500 hover:bg-orange-600 text-white"
                                    onClick={() => {
                                        setShowViewModal(false);
                                        openEditModal(viewingItem);
                                    }}
                                >
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Item
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Import Modal */}
            <AnimatePresence>
                {showImportModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowImportModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="bg-white rounded-xl max-w-2xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                                <h2 className="text-xl font-bold text-black">Import Inventory</h2>
                                <Button variant="ghost" size="sm" onClick={() => setShowImportModal(false)}>
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-600 mb-4">
                                        Drag and drop your CSV or Excel file here, or click to browse
                                    </p>
                                    <input
                                        type="file"
                                        accept=".csv,.xlsx,.xls"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleImportFile}
                                    />
                                    <Button
                                        variant="outline"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <FileSpreadsheet className="h-4 w-4 mr-2" />
                                        Select File
                                    </Button>
                                    {importFile && (
                                        <p className="text-sm text-green-600 mt-2">
                                            Selected: {importFile.name}
                                        </p>
                                    )}
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-medium text-black mb-2">File Format Requirements</h3>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>• CSV or Excel file (.csv, .xlsx, .xls)</li>
                                        <li>• Required columns: Name, Code, Quantity, Category</li>
                                        <li>• Optional: Barcode, Subcategory, Prices, Location</li>
                                        <li>• Maximum 1000 items per import</li>
                                    </ul>
                                </div>
                                {importPreview.length > 0 && (
                                    <div className="space-y-3">
                                        <h3 className="font-medium text-black">Preview ({importPreview.length} items)</h3>
                                        <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
                                            <table className="w-full text-sm">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-4 py-2 text-left">Name</th>
                                                        <th className="px-4 py-2 text-left">Code</th>
                                                        <th className="px-4 py-2 text-left">Qty</th>
                                                        <th className="px-4 py-2 text-left">Category</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {importPreview.map((item, i) => (
                                                        <tr key={i} className="border-t border-gray-100">
                                                            <td className="px-4 py-2">{item.name}</td>
                                                            <td className="px-4 py-2 font-mono">{item.code}</td>
                                                            <td className="px-4 py-2">{item.quantity}</td>
                                                            <td className="px-4 py-2">{item.category}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                                <Button variant="outline" onClick={() => setShowImportModal(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    className="bg-orange-500 hover:bg-orange-600 text-white"
                                    disabled={importPreview.length === 0}
                                    onClick={handleImportConfirm}
                                >
                                    <Upload className="h-4 w-4 mr-2" />
                                    Import {importPreview.length} Items
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scan Modal */}
            <AnimatePresence>
                {showScanModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowScanModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="bg-white rounded-xl max-w-lg w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                                <h2 className="text-xl font-bold text-black">Scan Barcode</h2>
                                <Button variant="ghost" size="sm" onClick={() => setShowScanModal(false)}>
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="flex gap-2">
                                    <Button
                                        variant={scanMode === 'camera' ? 'default' : 'outline'}
                                        className={scanMode === 'camera' ? 'bg-orange-500 hover:bg-orange-600' : ''}
                                        onClick={() => setScanMode('camera')}
                                    >
                                        <Camera className="h-4 w-4 mr-2" />
                                        Camera
                                    </Button>
                                    <Button
                                        variant={scanMode === 'manual' ? 'default' : 'outline'}
                                        className={scanMode === 'manual' ? 'bg-orange-500 hover:bg-orange-600' : ''}
                                        onClick={() => setScanMode('manual')}
                                    >
                                        <Barcode className="h-4 w-4 mr-2" />
                                        Manual Entry
                                    </Button>
                                </div>

                                {scanMode === 'camera' ? (
                                    <div className="bg-gray-100 rounded-lg p-8 text-center">
                                        <ScanLine className="h-16 w-16 text-gray-400 mx-auto mb-4 animate-pulse" />
                                        <p className="text-gray-600 mb-2">Camera scanner simulation</p>
                                        <p className="text-sm text-gray-500">Point your camera at the barcode</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div>
                                            <Label>Enter Barcode</Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    value={manualBarcode}
                                                    onChange={(e) => setManualBarcode(e.target.value)}
                                                    placeholder="e.g., INV-ELC-001-2024"
                                                    className="font-mono"
                                                />
                                                <Button
                                                    className="bg-orange-500 hover:bg-orange-600 text-white"
                                                    onClick={handleScanBarcode}
                                                >
                                                    <Search className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {scanResult && (
                                    <div className="border border-gray-200 rounded-lg p-4">
                                        {scanResult.error ? (
                                            <div className="flex items-center gap-2 text-red-600">
                                                <AlertTriangle className="h-5 w-5" />
                                                <span>{scanResult.error}</span>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-lg bg-green-100">
                                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-black">{scanResult.name}</p>
                                                        <p className="text-sm text-gray-500">{scanResult.code}</p>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 text-sm">
                                                    <div>
                                                        <span className="text-gray-500">Status:</span>{' '}
                                                        <span className="font-medium">{scanResult.status}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-500">Available:</span>{' '}
                                                        <span className="font-medium">{scanResult.available}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-500">Location:</span>{' '}
                                                        <span className="font-medium">{scanResult.warehouse}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-500">Condition:</span>{' '}
                                                        <span className="font-medium">{scanResult.condition}</span>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 mt-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => {
                                                            setViewingItem(scanResult);
                                                            setShowScanModal(false);
                                                            setShowViewModal(true);
                                                        }}
                                                    >
                                                        <Eye className="h-4 w-4 mr-1" />
                                                        View Details
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => {
                                                            openEditModal(scanResult);
                                                            setShowScanModal(false);
                                                        }}
                                                    >
                                                        <Edit className="h-4 w-4 mr-1" />
                                                        Edit
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="p-6 border-t border-gray-200 flex justify-end">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setShowScanModal(false);
                                        setScanResult(null);
                                        setManualBarcode('');
                                    }}
                                >
                                    Close
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Transfer Modal */}
            <AnimatePresence>
                {showTransferModal && transferringItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowTransferModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="bg-white rounded-xl max-w-lg w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                                <h2 className="text-xl font-bold text-black">Transfer Item</h2>
                                <Button variant="ghost" size="sm" onClick={() => setShowTransferModal(false)}>
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-white">
                                            <transferringItem.icon className="h-5 w-5 text-gray-700" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-black">{transferringItem.name}</p>
                                            <p className="text-sm text-gray-500">{transferringItem.code}</p>
                                        </div>
                                    </div>
                                    <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                                        <MapPin className="h-4 w-4" />
                                        <span>Current: {transferringItem.warehouse} - {transferringItem.locationPath}</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <Label>Target Warehouse *</Label>
                                        <select
                                            className="w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-orange-500"
                                            value={transferData.targetWarehouse}
                                            onChange={(e) => setTransferData({ ...transferData, targetWarehouse: e.target.value })}
                                        >
                                            <option value="Mumbai Central">Mumbai Central</option>
                                            <option value="Mumbai West">Mumbai West</option>
                                            <option value="Mumbai East">Mumbai East</option>
                                        </select>
                                    </div>
                                    <div>
                                        <Label>Target Location Path</Label>
                                        <Input
                                            value={transferData.targetLocation}
                                            onChange={(e) => setTransferData({ ...transferData, targetLocation: e.target.value })}
                                            placeholder="e.g., WH2 > Zone A > Rack 5"
                                        />
                                    </div>
                                    <div>
                                        <Label>Quantity to Transfer</Label>
                                        <Input
                                            type="number"
                                            min="1"
                                            max={transferringItem.available}
                                            value={transferData.quantity}
                                            onChange={(e) => setTransferData({ ...transferData, quantity: parseInt(e.target.value) || 1 })}
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Available: {transferringItem.available} units</p>
                                    </div>
                                    <div>
                                        <Label>Reason for Transfer *</Label>
                                        <select
                                            className="w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-orange-500"
                                            value={transferData.reason}
                                            onChange={(e) => setTransferData({ ...transferData, reason: e.target.value })}
                                        >
                                            <option value="">Select reason...</option>
                                            <option value="Warehouse Optimization">Warehouse Optimization</option>
                                            <option value="Client Request">Client Request</option>
                                            <option value="Event Location">Event Location</option>
                                            <option value="Maintenance">Maintenance</option>
                                            <option value="Stock Balancing">Stock Balancing</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <Label>Additional Notes</Label>
                                        <textarea
                                            className="w-full rounded-lg border border-gray-200 p-2 text-sm min-h-[80px]"
                                            value={transferData.notes}
                                            onChange={(e) => setTransferData({ ...transferData, notes: e.target.value })}
                                            placeholder="Any additional notes about this transfer..."
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                                <Button variant="outline" onClick={() => setShowTransferModal(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    className="bg-orange-500 hover:bg-orange-600 text-white"
                                    onClick={handleTransfer}
                                    disabled={!transferData.reason}
                                >
                                    <ArrowRightLeft className="h-4 w-4 mr-2" />
                                    Transfer Item
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Archive Modal */}
            <AnimatePresence>
                {showArchiveModal && archivingItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowArchiveModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="bg-white rounded-xl max-w-md w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                                <h2 className="text-xl font-bold text-black">Archive Item</h2>
                                <Button variant="ghost" size="sm" onClick={() => setShowArchiveModal(false)}>
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                    <Archive className="h-8 w-8 text-yellow-600" />
                                    <div>
                                        <p className="font-medium text-black">Archive this item?</p>
                                        <p className="text-sm text-gray-600">
                                            Archived items are removed from active inventory but can be restored later.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-white">
                                            <archivingItem.icon className="h-5 w-5 text-gray-700" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-black">{archivingItem.name}</p>
                                            <p className="text-sm text-gray-500">{archivingItem.code} • Qty: {archivingItem.quantity}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <Label>Reason for Archiving *</Label>
                                    <select
                                        className="w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-orange-500"
                                        value={archiveReason}
                                        onChange={(e) => setArchiveReason(e.target.value)}
                                    >
                                        <option value="">Select reason...</option>
                                        <option value="End of Life">End of Life</option>
                                        <option value="Discontinued">Discontinued</option>
                                        <option value="No Longer Needed">No Longer Needed</option>
                                        <option value="Replaced by New Model">Replaced by New Model</option>
                                        <option value="Seasonal Item">Seasonal Item</option>
                                        <option value="Low Demand">Low Demand</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                                <Button variant="outline" onClick={() => setShowArchiveModal(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                                    onClick={handleArchive}
                                    disabled={!archiveReason}
                                >
                                    <Archive className="h-4 w-4 mr-2" />
                                    Archive Item
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {showDeleteModal && deletingItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowDeleteModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="bg-white rounded-xl max-w-md w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                                <h2 className="text-xl font-bold text-black">Delete Item</h2>
                                <Button variant="ghost" size="sm" onClick={() => setShowDeleteModal(false)}>
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg border border-red-200">
                                    <AlertTriangle className="h-8 w-8 text-red-600" />
                                    <div>
                                        <p className="font-medium text-black">Delete this item permanently?</p>
                                        <p className="text-sm text-gray-600">
                                            This action cannot be undone. All data associated with this item will be lost.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-white">
                                            <deletingItem.icon className="h-5 w-5 text-gray-700" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-black">{deletingItem.name}</p>
                                            <p className="text-sm text-gray-500">{deletingItem.code} • {deletingItem.barcode}</p>
                                        </div>
                                    </div>
                                    <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                                        <div>
                                            <span className="text-gray-500">Quantity:</span>{' '}
                                            <span className="font-medium">{deletingItem.quantity}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Value:</span>{' '}
                                            <span className="font-medium">₹{(deletingItem.currentValue * deletingItem.quantity).toLocaleString('en-IN')}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Location:</span>{' '}
                                            <span className="font-medium">{deletingItem.warehouse}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Status:</span>{' '}
                                            <span className="font-medium">{deletingItem.status}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-orange-50 p-3 rounded-lg">
                                    <p className="text-sm text-orange-800">
                                        <strong>Tip:</strong> Consider archiving instead of deleting to preserve historical data.
                                    </p>
                                </div>
                            </div>
                            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                                <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setArchivingItem(deletingItem);
                                        setShowArchiveModal(true);
                                    }}
                                >
                                    <Archive className="h-4 w-4 mr-2" />
                                    Archive Instead
                                </Button>
                                <Button
                                    className="bg-red-500 hover:bg-red-600 text-white"
                                    onClick={handleConfirmDelete}
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Permanently
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
