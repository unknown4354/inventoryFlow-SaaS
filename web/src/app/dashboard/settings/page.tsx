'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Settings,
    User,
    Bell,
    Shield,
    CreditCard,
    Users,
    Building2,
    Globe,
    Mail,
    Smartphone,
    Lock,
    Eye,
    Palette,
    Database,
    X,
    Check,
    Camera,
    AlertTriangle,
    QrCode,
    Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type SettingsTab = 'Profile' | 'Company' | 'Team' | 'Notifications' | 'Security' | 'Billing' | 'Appearance' | 'Data & Export';

interface Session {
    id: string;
    device: string;
    location: string;
    time: string;
    current: boolean;
}

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<SettingsTab>('Profile');
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Profile State
    const [firstName, setFirstName] = useState('Rajesh');
    const [lastName, setLastName] = useState('Kumar');
    const [email, setEmail] = useState('rajesh@company.com');
    const [phone, setPhone] = useState('+91 98765 43210');
    const [jobTitle, setJobTitle] = useState('Operations Manager');
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});

    // Company State
    const [companyName, setCompanyName] = useState('InventoryFlow Solutions Pvt Ltd');
    const [industry, setIndustry] = useState('Event Equipment Rental');
    const [companySize, setCompanySize] = useState('11-50 employees');
    const [address, setAddress] = useState('123 Business Park, Andheri East');
    const [city, setCity] = useState('Mumbai');
    const [state, setState] = useState('Maharashtra');
    const [pinCode, setPinCode] = useState('400069');
    const [gstNumber, setGstNumber] = useState('27AABCU9603R1Z5');

    // Security State
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});
    const [showEnable2FAModal, setShowEnable2FAModal] = useState(false);
    const [showRevokeSessionModal, setShowRevokeSessionModal] = useState(false);
    const [selectedSession, setSelectedSession] = useState<Session | null>(null);
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);
    const [sessions, setSessions] = useState<Session[]>([
        { id: '1', device: 'Chrome on Windows', location: 'Mumbai, India', time: 'Active now', current: true },
        { id: '2', device: 'Safari on iPhone', location: 'Mumbai, India', time: '2 hours ago', current: false },
    ]);

    // Notifications State
    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        lowStockAlerts: true,
        projectUpdates: true,
        maintenanceReminders: true,
        paymentReminders: false,
        weeklyReports: true,
        marketingUpdates: false,
    });

    // Danger Zone
    const [showExportModal, setShowExportModal] = useState(false);
    const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState('');
    const [isExporting, setIsExporting] = useState(false);
    const [exportComplete, setExportComplete] = useState(false);

    const showSuccess = (message: string) => {
        setSuccessMessage(message);
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
    };

    const validateProfile = () => {
        const errors: Record<string, string> = {};
        if (!firstName.trim()) errors.firstName = 'First name is required';
        if (!lastName.trim()) errors.lastName = 'Last name is required';
        if (!email.trim()) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Invalid email format';
        if (!phone.trim()) errors.phone = 'Phone number is required';
        setProfileErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSaveProfile = () => {
        if (!validateProfile()) return;
        showSuccess('Profile updated successfully!');
    };

    const handleSaveCompany = () => {
        showSuccess('Company information updated successfully!');
    };

    const validatePassword = () => {
        const errors: Record<string, string> = {};
        if (!currentPassword) errors.current = 'Current password is required';
        if (!newPassword) errors.new = 'New password is required';
        else if (newPassword.length < 8) errors.new = 'Password must be at least 8 characters';
        if (!confirmPassword) errors.confirm = 'Please confirm your password';
        else if (newPassword !== confirmPassword) errors.confirm = 'Passwords do not match';
        setPasswordErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChangePassword = () => {
        if (!validatePassword()) return;
        showSuccess('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setPasswordErrors({});
    };

    const handleEnable2FA = () => {
        setIs2FAEnabled(true);
        setShowEnable2FAModal(false);
        showSuccess('Two-Factor Authentication enabled!');
    };

    const handleRevokeSession = () => {
        if (selectedSession) {
            setSessions(sessions.filter(s => s.id !== selectedSession.id));
            setShowRevokeSessionModal(false);
            setSelectedSession(null);
            showSuccess('Session revoked successfully!');
        }
    };

    const handleToggleNotification = (key: keyof typeof notifications) => {
        setNotifications({ ...notifications, [key]: !notifications[key] });
    };

    const handleExportData = () => {
        setIsExporting(true);
        setTimeout(() => {
            setIsExporting(false);
            setExportComplete(true);
            setTimeout(() => {
                setShowExportModal(false);
                setExportComplete(false);
                showSuccess('Data export started!');
            }, 2000);
        }, 3000);
    };

    const handleDeleteAccount = () => {
        if (deleteConfirmation === 'DELETE') {
            showSuccess('Account deletion request submitted');
            setShowDeleteAccountModal(false);
            setDeleteConfirmation('');
        }
    };

    const getPasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    const passwordStrength = getPasswordStrength(newPassword);

    const tabItems = [
        { icon: User, label: 'Profile' as SettingsTab },
        { icon: Building2, label: 'Company' as SettingsTab },
        { icon: Users, label: 'Team' as SettingsTab },
        { icon: Bell, label: 'Notifications' as SettingsTab },
        { icon: Shield, label: 'Security' as SettingsTab },
        { icon: CreditCard, label: 'Billing' as SettingsTab },
        { icon: Palette, label: 'Appearance' as SettingsTab },
        { icon: Database, label: 'Data & Export' as SettingsTab },
    ];

    return (
        <div className="space-y-6">
            {/* Success Toast */}
            <AnimatePresence>
                {showSuccessToast && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2"
                    >
                        <Check className="h-5 w-5" />
                        {successMessage}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-black dark:text-white">Settings</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account and application preferences</p>
            </motion.div>

            {/* Settings Navigation */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-2"
                >
                    {tabItems.map((item, index) => (
                        <motion.button
                            key={item.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => setActiveTab(item.label)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                activeTab === item.label
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-white dark:bg-black border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-orange-500'
                            }`}
                        >
                            <item.icon className="h-5 w-5" />
                            <span className="font-medium">{item.label}</span>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Profile Tab */}
                    {activeTab === 'Profile' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6"
                        >
                            <h3 className="font-bold text-black dark:text-white mb-6">Profile Information</h3>

                            <div className="flex items-start gap-6 mb-6">
                                <div className="w-24 h-24 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                                    <User className="h-12 w-12 text-orange-500" />
                                </div>
                                <div className="flex-1">
                                    <Button
                                        variant="outline"
                                        className="border-gray-200 dark:border-gray-700 hover:border-orange-500 mb-2"
                                        onClick={() => setShowUploadModal(true)}
                                    >
                                        <Camera className="h-4 w-4 mr-2" />
                                        Upload Photo
                                    </Button>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        JPG, GIF or PNG. Max size of 2MB.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                        First Name
                                    </label>
                                    <Input
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="John"
                                        className="border-gray-200 dark:border-gray-700 bg-white dark:bg-black"
                                    />
                                    {profileErrors.firstName && <p className="text-red-500 text-xs mt-1">{profileErrors.firstName}</p>}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                        Last Name
                                    </label>
                                    <Input
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Doe"
                                        className="border-gray-200 dark:border-gray-700 bg-white dark:bg-black"
                                    />
                                    {profileErrors.lastName && <p className="text-red-500 text-xs mt-1">{profileErrors.lastName}</p>}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                        <Mail className="h-4 w-4 inline mr-1" />
                                        Email Address
                                    </label>
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="email@example.com"
                                        className="border-gray-200 dark:border-gray-700 bg-white dark:bg-black"
                                    />
                                    {profileErrors.email && <p className="text-red-500 text-xs mt-1">{profileErrors.email}</p>}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                        <Smartphone className="h-4 w-4 inline mr-1" />
                                        Phone Number
                                    </label>
                                    <Input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="+91 98765 43210"
                                        className="border-gray-200 dark:border-gray-700 bg-white dark:bg-black"
                                    />
                                    {profileErrors.phone && <p className="text-red-500 text-xs mt-1">{profileErrors.phone}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                        Job Title
                                    </label>
                                    <Input
                                        value={jobTitle}
                                        onChange={(e) => setJobTitle(e.target.value)}
                                        placeholder="Operations Manager"
                                        className="border-gray-200 dark:border-gray-700 bg-white dark:bg-black"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                                <Button
                                    className="bg-orange-500 hover:bg-orange-600 text-white"
                                    onClick={handleSaveProfile}
                                >
                                    Save Changes
                                </Button>
                                <Button variant="outline" className="border-gray-200 dark:border-gray-700">
                                    Cancel
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Company Tab */}
                    {activeTab === 'Company' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6"
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <Building2 className="h-5 w-5 text-orange-500" />
                                <h3 className="font-bold text-black dark:text-white">Company Information</h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                        Company Name
                                    </label>
                                    <Input
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        placeholder="Your Company Name"
                                        className="border-gray-200 dark:border-gray-700 bg-white dark:bg-black"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                            Industry
                                        </label>
                                        <select
                                            value={industry}
                                            onChange={(e) => setIndustry(e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white focus:border-orange-500 focus:outline-none"
                                        >
                                            <option>Event Equipment Rental</option>
                                            <option>AV Equipment Rental</option>
                                            <option>General Equipment Rental</option>
                                            <option>Industrial Equipment</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                            Company Size
                                        </label>
                                        <select
                                            value={companySize}
                                            onChange={(e) => setCompanySize(e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white focus:border-orange-500 focus:outline-none"
                                        >
                                            <option>1-10 employees</option>
                                            <option>11-50 employees</option>
                                            <option>51-200 employees</option>
                                            <option>200+ employees</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                        Address
                                    </label>
                                    <Input
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Street address"
                                        className="border-gray-200 dark:border-gray-700 bg-white dark:bg-black"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                            City
                                        </label>
                                        <Input
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            placeholder="City"
                                            className="border-gray-200 dark:border-gray-700 bg-white dark:bg-black"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                            State
                                        </label>
                                        <Input
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                            placeholder="State"
                                            className="border-gray-200 dark:border-gray-700 bg-white dark:bg-black"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                            PIN Code
                                        </label>
                                        <Input
                                            value={pinCode}
                                            onChange={(e) => setPinCode(e.target.value)}
                                            placeholder="400001"
                                            className="border-gray-200 dark:border-gray-700 bg-white dark:bg-black"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                        GST Number
                                    </label>
                                    <Input
                                        value={gstNumber}
                                        onChange={(e) => setGstNumber(e.target.value)}
                                        placeholder="Enter GST Number"
                                        className="border-gray-200 dark:border-gray-700 bg-white dark:bg-black"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                                <Button
                                    className="bg-orange-500 hover:bg-orange-600 text-white"
                                    onClick={handleSaveCompany}
                                >
                                    Update Company Info
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'Security' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            {/* Password Change */}
                            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6">
                                <div className="flex items-center gap-2 mb-6">
                                    <Shield className="h-5 w-5 text-orange-500" />
                                    <h3 className="font-bold text-black dark:text-white">Security</h3>
                                </div>

                                <h4 className="font-medium text-black dark:text-white mb-4">Change Password</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                            <Lock className="h-4 w-4 inline mr-1" />
                                            Current Password
                                        </label>
                                        <Input
                                            type="password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            placeholder="Enter current password"
                                            className="border-gray-200 dark:border-gray-700 bg-white dark:bg-black"
                                        />
                                        {passwordErrors.current && <p className="text-red-500 text-xs mt-1">{passwordErrors.current}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                                New Password
                                            </label>
                                            <Input
                                                type="password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                placeholder="Enter new password"
                                                className="border-gray-200 dark:border-gray-700 bg-white dark:bg-black"
                                            />
                                            {passwordErrors.new && <p className="text-red-500 text-xs mt-1">{passwordErrors.new}</p>}
                                            {newPassword && (
                                                <div className="mt-2">
                                                    <div className="flex gap-1">
                                                        {[1, 2, 3, 4].map((level) => (
                                                            <div
                                                                key={level}
                                                                className={`h-1 flex-1 rounded ${
                                                                    passwordStrength >= level
                                                                        ? passwordStrength === 1 ? 'bg-red-500'
                                                                        : passwordStrength === 2 ? 'bg-yellow-500'
                                                                        : passwordStrength === 3 ? 'bg-blue-500'
                                                                        : 'bg-green-500'
                                                                        : 'bg-gray-200 dark:bg-gray-700'
                                                                }`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {passwordStrength === 0 && 'Very weak'}
                                                        {passwordStrength === 1 && 'Weak'}
                                                        {passwordStrength === 2 && 'Fair'}
                                                        {passwordStrength === 3 && 'Good'}
                                                        {passwordStrength === 4 && 'Strong'}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                                Confirm Password
                                            </label>
                                            <Input
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="Confirm new password"
                                                className="border-gray-200 dark:border-gray-700 bg-white dark:bg-black"
                                            />
                                            {passwordErrors.confirm && <p className="text-red-500 text-xs mt-1">{passwordErrors.confirm}</p>}
                                        </div>
                                    </div>

                                    <Button
                                        className="bg-orange-500 hover:bg-orange-600 text-white"
                                        onClick={handleChangePassword}
                                    >
                                        Update Password
                                    </Button>
                                </div>

                                {/* Two-Factor Authentication */}
                                <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-800">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="font-medium text-black dark:text-white mb-2">Two-Factor Authentication</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Add an extra layer of security to your account
                                            </p>
                                            {is2FAEnabled && (
                                                <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700">
                                                    Enabled
                                                </span>
                                            )}
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="border-gray-200 dark:border-gray-700 hover:border-orange-500"
                                            onClick={() => setShowEnable2FAModal(true)}
                                            disabled={is2FAEnabled}
                                        >
                                            {is2FAEnabled ? 'Enabled' : 'Enable 2FA'}
                                        </Button>
                                    </div>
                                </div>

                                {/* Active Sessions */}
                                <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-800">
                                    <h4 className="font-medium text-black dark:text-white mb-4">Active Sessions</h4>
                                    <div className="space-y-3">
                                        {sessions.map((session) => (
                                            <div
                                                key={session.id}
                                                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900">
                                                        <Globe className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-black dark:text-white">{session.device}</p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            {session.location} • {session.time}
                                                        </p>
                                                    </div>
                                                </div>
                                                {session.current ? (
                                                    <span className="text-sm px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700">
                                                        Current
                                                    </span>
                                                ) : (
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="border-gray-200 dark:border-gray-700 text-red-600"
                                                        onClick={() => {
                                                            setSelectedSession(session);
                                                            setShowRevokeSessionModal(true);
                                                        }}
                                                    >
                                                        Revoke
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === 'Notifications' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6"
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <Bell className="h-5 w-5 text-orange-500" />
                                <h3 className="font-bold text-black dark:text-white">Notification Preferences</h3>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive email updates about your account activity' },
                                    { key: 'lowStockAlerts', label: 'Low Stock Alerts', desc: 'Get notified when inventory items are running low' },
                                    { key: 'projectUpdates', label: 'Project Updates', desc: 'Notifications about project status changes' },
                                    { key: 'maintenanceReminders', label: 'Maintenance Reminders', desc: 'Alerts for upcoming equipment maintenance' },
                                    { key: 'paymentReminders', label: 'Payment Reminders', desc: 'Notifications about pending invoices and payments' },
                                    { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Receive weekly summary reports via email' },
                                    { key: 'marketingUpdates', label: 'Marketing Updates', desc: 'News about features and product updates' },
                                ].map((notification) => (
                                    <div
                                        key={notification.key}
                                        className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 transition-all"
                                    >
                                        <div>
                                            <p className="font-medium text-black dark:text-white">{notification.label}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notification.desc}</p>
                                        </div>
                                        <button
                                            onClick={() => handleToggleNotification(notification.key as keyof typeof notifications)}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                                notifications[notification.key as keyof typeof notifications]
                                                    ? 'bg-orange-500'
                                                    : 'bg-gray-200 dark:bg-gray-700'
                                            }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                    notifications[notification.key as keyof typeof notifications]
                                                        ? 'translate-x-6'
                                                        : 'translate-x-1'
                                                }`}
                                            />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Data & Export Tab */}
                    {activeTab === 'Data & Export' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-xl border-2 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/10 p-6"
                        >
                            <h3 className="font-bold text-black dark:text-white mb-4">Danger Zone</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-lg bg-white dark:bg-black border border-red-200 dark:border-red-900">
                                    <div>
                                        <p className="font-medium text-black dark:text-white">Export All Data</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            Download a complete copy of your data
                                        </p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="border-gray-200 dark:border-gray-700"
                                        onClick={() => setShowExportModal(true)}
                                    >
                                        <Database className="h-4 w-4 mr-2" />
                                        Export
                                    </Button>
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-lg bg-white dark:bg-black border border-red-200 dark:border-red-900">
                                    <div>
                                        <p className="font-medium text-black dark:text-white">Delete Account</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            Permanently delete your account and all data
                                        </p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                        onClick={() => setShowDeleteAccountModal(true)}
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete Account
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Other tabs placeholder */}
                    {(activeTab === 'Team' || activeTab === 'Billing' || activeTab === 'Appearance') && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6"
                        >
                            <h3 className="font-bold text-black dark:text-white mb-4">{activeTab}</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {activeTab} settings will be available in a future update.
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Upload Photo Modal */}
            <AnimatePresence>
                {showUploadModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setShowUploadModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white dark:bg-black rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-800"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-black dark:text-white">Upload Profile Photo</h3>
                                <button
                                    onClick={() => setShowUploadModal(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg"
                                >
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                                <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    Drag and drop your photo here, or click to browse
                                </p>
                                <Button variant="outline" className="border-gray-200 dark:border-gray-700">
                                    Choose File
                                </Button>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button
                                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                                    onClick={() => {
                                        setShowUploadModal(false);
                                        showSuccess('Profile photo updated!');
                                    }}
                                >
                                    Upload
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setShowUploadModal(false)}
                                    className="border-gray-200 dark:border-gray-700"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Enable 2FA Modal */}
            <AnimatePresence>
                {showEnable2FAModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setShowEnable2FAModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white dark:bg-black rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-800"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-black dark:text-white">Enable Two-Factor Authentication</h3>
                                <button
                                    onClick={() => setShowEnable2FAModal(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg"
                                >
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg text-center">
                                    <QrCode className="h-32 w-32 mx-auto text-gray-800 dark:text-gray-200" />
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                                    Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                                </p>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                        Enter verification code
                                    </label>
                                    <Input
                                        placeholder="000000"
                                        className="border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-center text-2xl tracking-widest"
                                        maxLength={6}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button
                                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                                    onClick={handleEnable2FA}
                                >
                                    Enable 2FA
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setShowEnable2FAModal(false)}
                                    className="border-gray-200 dark:border-gray-700"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Revoke Session Modal */}
            <AnimatePresence>
                {showRevokeSessionModal && selectedSession && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setShowRevokeSessionModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white dark:bg-black rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-800"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-black dark:text-white">Revoke Session</h3>
                                <button
                                    onClick={() => setShowRevokeSessionModal(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg"
                                >
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                                    <p className="font-medium text-yellow-800 dark:text-yellow-200">Warning</p>
                                </div>
                                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                                    This will log out the device immediately. The user will need to sign in again.
                                </p>
                            </div>

                            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <p className="font-medium text-black dark:text-white">{selectedSession.device}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{selectedSession.location}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-500">{selectedSession.time}</p>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button
                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                                    onClick={handleRevokeSession}
                                >
                                    Revoke Session
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setShowRevokeSessionModal(false)}
                                    className="border-gray-200 dark:border-gray-700"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Export Data Modal */}
            <AnimatePresence>
                {showExportModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setShowExportModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white dark:bg-black rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-800"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-black dark:text-white">Export All Data</h3>
                                <button
                                    onClick={() => setShowExportModal(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg"
                                >
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>

                            {exportComplete ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Check className="h-8 w-8 text-green-600" />
                                    </div>
                                    <p className="text-lg font-medium text-black dark:text-white">Export Complete!</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Your data is being prepared for download.</p>
                                </div>
                            ) : isExporting ? (
                                <div className="text-center py-8">
                                    <Database className="h-12 w-12 text-orange-500 mx-auto mb-4 animate-pulse" />
                                    <p className="text-lg font-medium text-black dark:text-white">Preparing Export...</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">This may take a few moments.</p>
                                </div>
                            ) : (
                                <>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                        This will export all your account data including:
                                    </p>
                                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2 mb-6">
                                        <li>• Profile information</li>
                                        <li>• Company details</li>
                                        <li>• All inventory items</li>
                                        <li>• Projects and clients</li>
                                        <li>• Reports and analytics</li>
                                    </ul>
                                    <Button
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                                        onClick={handleExportData}
                                    >
                                        <Database className="h-4 w-4 mr-2" />
                                        Start Export
                                    </Button>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Delete Account Modal */}
            <AnimatePresence>
                {showDeleteAccountModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setShowDeleteAccountModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white dark:bg-black rounded-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-800"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-red-600">Delete Account</h3>
                                <button
                                    onClick={() => setShowDeleteAccountModal(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg"
                                >
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertTriangle className="h-5 w-5 text-red-600" />
                                    <p className="font-medium text-red-800 dark:text-red-200">This action cannot be undone</p>
                                </div>
                                <p className="text-sm text-red-700 dark:text-red-300">
                                    This will permanently delete your account and all associated data including inventory, projects, clients, and reports.
                                </p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                                    Type DELETE to confirm
                                </label>
                                <Input
                                    value={deleteConfirmation}
                                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                                    placeholder="DELETE"
                                    className="border-gray-200 dark:border-gray-700 bg-white dark:bg-black"
                                />
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button
                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                                    onClick={handleDeleteAccount}
                                    disabled={deleteConfirmation !== 'DELETE'}
                                >
                                    Delete My Account
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setShowDeleteAccountModal(false)}
                                    className="border-gray-200 dark:border-gray-700"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
