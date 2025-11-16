'use client';

import { motion } from 'framer-motion';
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
    Database
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-black">Settings</h1>
                <p className="text-gray-600 mt-1">Manage your account and application preferences</p>
            </motion.div>

            {/* Settings Navigation */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-2"
                >
                    {[
                        { icon: User, label: 'Profile', active: true },
                        { icon: Building2, label: 'Company', active: false },
                        { icon: Users, label: 'Team', active: false },
                        { icon: Bell, label: 'Notifications', active: false },
                        { icon: Shield, label: 'Security', active: false },
                        { icon: CreditCard, label: 'Billing', active: false },
                        { icon: Palette, label: 'Appearance', active: false },
                        { icon: Database, label: 'Data & Export', active: false },
                    ].map((item, index) => (
                        <motion.button
                            key={item.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                item.active
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-white border border-gray-200 text-gray-700 hover:border-orange-500'
                            }`}
                        >
                            <item.icon className="h-5 w-5" />
                            <span className="font-medium">{item.label}</span>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Profile Information */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="rounded-xl border border-gray-200 bg-white p-6"
                    >
                        <h3 className="font-bold text-black mb-6">Profile Information</h3>

                        <div className="flex items-start gap-6 mb-6">
                            <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center">
                                <User className="h-12 w-12 text-orange-500" />
                            </div>
                            <div className="flex-1">
                                <Button variant="outline" className="border-gray-200 hover:border-orange-500 mb-2">
                                    Upload Photo
                                </Button>
                                <p className="text-sm text-gray-600">
                                    JPG, GIF or PNG. Max size of 2MB.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                    First Name
                                </label>
                                <Input placeholder="John" defaultValue="Rajesh" />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                    Last Name
                                </label>
                                <Input placeholder="Doe" defaultValue="Kumar" />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                    <Mail className="h-4 w-4 inline mr-1" />
                                    Email Address
                                </label>
                                <Input type="email" placeholder="email@example.com" defaultValue="rajesh@company.com" />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                    <Smartphone className="h-4 w-4 inline mr-1" />
                                    Phone Number
                                </label>
                                <Input type="tel" placeholder="+91 98765 43210" defaultValue="+91 98765 43210" />
                            </div>

                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                    Job Title
                                </label>
                                <Input placeholder="Operations Manager" defaultValue="Operations Manager" />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                                Save Changes
                            </Button>
                            <Button variant="outline" className="border-gray-200">
                                Cancel
                            </Button>
                        </div>
                    </motion.div>

                    {/* Company Settings */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="rounded-xl border border-gray-200 bg-white p-6"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <Building2 className="h-5 w-5 text-orange-500" />
                            <h3 className="font-bold text-black">Company Information</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                    Company Name
                                </label>
                                <Input placeholder="Your Company Name" defaultValue="InventoryFlow Solutions Pvt Ltd" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Industry
                                    </label>
                                    <select className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-orange-500 focus:outline-none">
                                        <option>Event Equipment Rental</option>
                                        <option>AV Equipment Rental</option>
                                        <option>General Equipment Rental</option>
                                        <option>Party Supplies</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Company Size
                                    </label>
                                    <select className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-orange-500 focus:outline-none">
                                        <option>1-10 employees</option>
                                        <option>11-50 employees</option>
                                        <option>51-200 employees</option>
                                        <option>200+ employees</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                    Address
                                </label>
                                <Input placeholder="Street address" defaultValue="123 Business Park, Andheri East" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                        City
                                    </label>
                                    <Input placeholder="City" defaultValue="Mumbai" />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                        State
                                    </label>
                                    <Input placeholder="State" defaultValue="Maharashtra" />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                        PIN Code
                                    </label>
                                    <Input placeholder="400001" defaultValue="400069" />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                    GST Number
                                </label>
                                <Input placeholder="Enter GST Number" defaultValue="27AABCU9603R1Z5" />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                                Update Company Info
                            </Button>
                        </div>
                    </motion.div>

                    {/* Security Settings */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="rounded-xl border border-gray-200 bg-white p-6"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <Shield className="h-5 w-5 text-orange-500" />
                            <h3 className="font-bold text-black">Security</h3>
                        </div>

                        <div className="space-y-6">
                            {/* Password Change */}
                            <div>
                                <h4 className="font-medium text-black mb-4">Change Password</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                                            <Lock className="h-4 w-4 inline mr-1" />
                                            Current Password
                                        </label>
                                        <Input type="password" placeholder="Enter current password" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                                New Password
                                            </label>
                                            <Input type="password" placeholder="Enter new password" />
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                                Confirm Password
                                            </label>
                                            <Input type="password" placeholder="Confirm new password" />
                                        </div>
                                    </div>

                                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                                        Update Password
                                    </Button>
                                </div>
                            </div>

                            {/* Two-Factor Authentication */}
                            <div className="pt-6 border-t border-gray-200">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h4 className="font-medium text-black mb-2">Two-Factor Authentication</h4>
                                        <p className="text-sm text-gray-600">
                                            Add an extra layer of security to your account
                                        </p>
                                    </div>
                                    <Button variant="outline" className="border-gray-200 hover:border-orange-500">
                                        Enable 2FA
                                    </Button>
                                </div>
                            </div>

                            {/* Active Sessions */}
                            <div className="pt-6 border-t border-gray-200">
                                <h4 className="font-medium text-black mb-4">Active Sessions</h4>
                                <div className="space-y-3">
                                    {[
                                        { device: 'Chrome on Windows', location: 'Mumbai, India', time: 'Active now', current: true },
                                        { device: 'Safari on iPhone', location: 'Mumbai, India', time: '2 hours ago', current: false },
                                    ].map((session, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-4 rounded-lg border border-gray-200"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-gray-100">
                                                    <Globe className="h-5 w-5 text-gray-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-black">{session.device}</p>
                                                    <p className="text-sm text-gray-600">
                                                        {session.location} • {session.time}
                                                    </p>
                                                </div>
                                            </div>
                                            {session.current ? (
                                                <span className="text-sm px-2 py-1 rounded-full bg-green-100 text-green-700">
                                                    Current
                                                </span>
                                            ) : (
                                                <Button size="sm" variant="outline" className="border-gray-200 text-red-600">
                                                    Revoke
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Notification Preferences */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="rounded-xl border border-gray-200 bg-white p-6"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <Bell className="h-5 w-5 text-orange-500" />
                            <h3 className="font-bold text-black">Notification Preferences</h3>
                        </div>

                        <div className="space-y-4">
                            {[
                                { label: 'Email Notifications', desc: 'Receive email updates about your account activity', enabled: true },
                                { label: 'Low Stock Alerts', desc: 'Get notified when inventory items are running low', enabled: true },
                                { label: 'Project Updates', desc: 'Notifications about project status changes', enabled: true },
                                { label: 'Maintenance Reminders', desc: 'Alerts for upcoming equipment maintenance', enabled: true },
                                { label: 'Payment Reminders', desc: 'Notifications about pending invoices and payments', enabled: false },
                                { label: 'Weekly Reports', desc: 'Receive weekly summary reports via email', enabled: true },
                                { label: 'Marketing Updates', desc: 'News about features and product updates', enabled: false },
                            ].map((notification, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-orange-500 transition-all"
                                >
                                    <div>
                                        <p className="font-medium text-black">{notification.label}</p>
                                        <p className="text-sm text-gray-600 mt-1">{notification.desc}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            defaultChecked={notification.enabled}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Danger Zone */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="rounded-xl border-2 border-red-200 bg-red-50 p-6"
                    >
                        <h3 className="font-bold text-black mb-4">Danger Zone</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-lg bg-white border border-red-200">
                                <div>
                                    <p className="font-medium text-black">Export All Data</p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Download a complete copy of your data
                                    </p>
                                </div>
                                <Button variant="outline" className="border-gray-200">
                                    <Database className="h-4 w-4 mr-2" />
                                    Export
                                </Button>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-lg bg-white border border-red-200">
                                <div>
                                    <p className="font-medium text-black">Delete Account</p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Permanently delete your account and all data
                                    </p>
                                </div>
                                <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                                    Delete Account
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
