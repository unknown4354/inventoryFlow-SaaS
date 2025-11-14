import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Package,
  Warehouse,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  Plus
} from 'lucide-react'

export default function DashboardPage() {
  // Mock data for demo
  const stats = [
    { label: 'Total Items', value: '1,234', change: '+12%', icon: Package, color: 'text-purple-600' },
    { label: 'Available', value: '856', change: '+5%', icon: CheckCircle, color: 'text-green-600' },
    { label: 'In Use', value: '298', change: '+8%', icon: Clock, color: 'text-blue-600' },
    { label: 'Maintenance', value: '80', change: '-3%', icon: AlertCircle, color: 'text-yellow-600' },
  ]

  const recentItems = [
    { id: 1, name: 'LED Moving Head Light', sku: 'LED-001', status: 'available', category: 'Electrical', location: 'Warehouse A' },
    { id: 2, name: 'Wedding Mandap Structure', sku: 'STR-045', status: 'in-use', category: 'Structures', location: 'Event Site' },
    { id: 3, name: 'Sound System - 10KW', sku: 'AUD-023', status: 'available', category: 'AV Equipment', location: 'Warehouse B' },
    { id: 4, name: 'Crystal Chandelier', sku: 'DEC-089', status: 'maintenance', category: 'Decor', location: 'Repair Shop' },
    { id: 5, name: 'Round Table (10-seater)', sku: 'FUR-156', status: 'available', category: 'Furniture', location: 'Warehouse A' },
  ]

  const getStatusBadge = (status: string) => {
    const variants = {
      'available': 'success',
      'in-use': 'default',
      'maintenance': 'warning',
    } as const

    return <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
      {status.replace('-', ' ')}
    </Badge>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6 text-purple-600" />
            <h1 className="text-xl font-bold">InventoryFlow</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Warehouse className="mr-2 h-4 w-4" />
              Warehouses
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600">Welcome back! Here's your inventory overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-500">
                  <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                    {stat.change}
                  </span>{' '}
                  from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Items */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Inventory Items</CardTitle>
              <CardDescription>
                Your latest inventory additions and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>SKU: {item.sku}</span>
                        <span>•</span>
                        <span>{item.category}</span>
                        <span>•</span>
                        <span>{item.location}</span>
                      </div>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Items
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Package className="mr-2 h-4 w-4" />
                Check Out Items
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CheckCircle className="mr-2 h-4 w-4" />
                Check In Items
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertCircle className="mr-2 h-4 w-4" />
                Schedule Maintenance
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Reports
              </Button>
            </CardContent>
          </Card>

          {/* Utilization Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Inventory Utilization</CardTitle>
              <CardDescription>Last 30 days performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[200px] items-end justify-between gap-2">
                {[65, 78, 82, 70, 88, 75, 92].map((value, i) => (
                  <div key={i} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full bg-purple-500 rounded-t transition-all hover:bg-purple-600"
                      style={{ height: `${value}%` }}
                    />
                    <span className="text-xs text-gray-500 mt-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">Average utilization: <span className="font-semibold text-purple-600">78%</span></p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Demo Banner */}
        <div className="mt-6 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">🚀 Welcome to InventoryFlow!</h3>
              <p className="text-purple-100">
                This is a preview of your inventory management dashboard. Sign up to start managing your inventory!
              </p>
            </div>
            <Button variant="secondary" size="lg" className="shrink-0">
              Get Started
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
