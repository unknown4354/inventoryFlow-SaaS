import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatCard } from '@/components/custom/stat-card'
import { InventoryTable } from '@/components/custom/inventory-table'
import { MiniChart, ProgressRing } from '@/components/custom/charts'
import {
  Package,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Settings,
  Bell,
  User
} from 'lucide-react'

export default function DashboardPage() {
  const inventoryItems = [
    { id: 1, name: 'LED Moving Head Light - 150W', sku: 'LED-MH-150', status: 'available' as const, category: 'Electrical Equipment', location: 'Warehouse A - Shelf B3', quantity: 12 },
    { id: 2, name: 'Wedding Mandap Structure (Royal)', sku: 'MND-ROY-001', status: 'in-use' as const, category: 'Structures & Fabrication', location: 'Event Site - Bangalore' },
    { id: 3, name: 'Professional Sound System 10KW', sku: 'AUD-PS-10K', status: 'available' as const, category: 'AV & Production', location: 'Warehouse B - Section 2', quantity: 3 },
    { id: 4, name: 'Crystal Chandelier (Swarovski)', sku: 'DEC-CHA-SWR', status: 'maintenance' as const, category: 'Decor & Styling', location: 'Repair Shop'},
    { id: 5, name: 'Round Banquet Table (10-seater)', sku: 'FUR-RBT-10', status: 'available' as const, category: 'Furniture & Seating', location: 'Warehouse A - Ground Floor', quantity: 45 },
    { id: 6, name: 'Industrial Food Warmer (5-Tray)', sku: 'CAT-FW-5T', status: 'reserved' as const, category: 'Catering Equipment', location: 'Warehouse C', quantity: 8 },
  ]

  const utilizationData = [65, 78, 82, 70, 88, 75, 92, 85, 90, 87, 95, 89, 91, 88]
  const utilizationLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']

  const categoryData = [45, 68, 52, 78, 60, 35]
  const categoryLabels = ['Elec', 'Struc', 'AV', 'Decor', 'Furn', 'Cater']

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-gray-50">
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                InventoryFlow
              </h1>
              <p className="text-xs text-gray-500">Smart Inventory Management</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-[1600px] mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back! 👋
          </h2>
          <p className="text-gray-600">Here's what's happening with your inventory today.</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4" />
            Add Item
          </Button>
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Import CSV
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <div className="flex-1 min-w-[300px] max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search inventory..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard
            title="Total Items"
            value="1,234"
            change="+12.5%"
            changeType="positive"
            icon={Package}
            description="from last month"
            trend={[45, 52, 48, 61, 55, 67, 72]}
          />
          <StatCard
            title="Available"
            value="856"
            change="+5.2%"
            changeType="positive"
            icon={CheckCircle}
            description="ready to deploy"
            trend={[38, 45, 42, 49, 52, 55, 58]}
          />
          <StatCard
            title="In Use"
            value="298"
            change="+8.1%"
            changeType="positive"
            icon={Clock}
            description="currently deployed"
            trend={[25, 32, 38, 42, 45, 48, 52]}
          />
          <StatCard
            title="Maintenance"
            value="80"
            change="-3.2%"
            changeType="positive"
            icon={AlertCircle}
            description="being serviced"
            trend={[15, 12, 14, 11, 10, 9, 8]}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Inventory Utilization</CardTitle>
                  <CardDescription>Last 14 days performance metrics</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">7D</Button>
                  <Button variant="outline" size="sm" className="bg-purple-100 text-purple-700">14D</Button>
                  <Button variant="outline" size="sm">30D</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <MiniChart data={utilizationData} labels={utilizationLabels} color="purple" />
              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-purple-500" />
                  <span className="text-gray-600">Utilization Rate</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-purple-600">83.5%</div>
                  <div className="text-xs text-gray-500">Average</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
              <CardDescription>Items by vendor type</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center">
                <ProgressRing value={83} label="Overall" color="purple" />
              </div>
              <MiniChart data={categoryData} labels={categoryLabels} color="blue" className="h-20" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Electrical</span>
                  <span className="font-medium">22%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Decor</span>
                  <span className="font-medium">31%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">AV Equipment</span>
                  <span className="font-medium">25%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Inventory Items</CardTitle>
                <CardDescription>Latest additions and updates to your inventory</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <InventoryTable items={inventoryItems} />
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Check Out</div>
                  <div className="text-sm text-gray-500">Assign to event</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Check In</div>
                  <div className="text-sm text-gray-500">Return items</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-yellow-100 flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Maintenance</div>
                  <div className="text-sm text-gray-500">Schedule service</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Reports</div>
                  <div className="text-sm text-gray-500">View analytics</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 p-8 text-white shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 text-sm mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                Live Demo
              </div>
              <h3 className="text-2xl font-bold mb-2">🚀 Welcome to InventoryFlow!</h3>
              <p className="text-purple-100 text-lg">
                This is a preview dashboard showing the power of our inventory management system.
                Ready to manage your inventory like a pro?
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Button size="lg" variant="secondary" className="shadow-xl">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
