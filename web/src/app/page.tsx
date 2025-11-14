import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Package, Smartphone, Sparkles, ArrowRight, CheckCircle } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: Package,
      title: 'Track Inventory',
      description: 'Manage items across multiple warehouses with real-time tracking and barcode scanning'
    },
    {
      icon: Smartphone,
      title: 'Mobile Ready',
      description: 'Check-out and check-in items on the go with our native mobile apps for iOS and Android'
    },
    {
      icon: Sparkles,
      title: 'AI Powered',
      description: 'Get smart suggestions, automate workflows, and optimize your inventory with AI'
    }
  ]

  const vendorTypes = [
    'Electrical Equipment',
    'Structures & Fabrication',
    'AV & Production',
    'Decor & Styling',
    'Furniture & Seating',
    'Catering Equipment'
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">
              Now in Beta
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Smart Inventory Management for
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {' '}Event Businesses
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Track equipment, manage check-outs, and optimize your inventory with AI-powered insights.
              Built specifically for event, production, and rental companies in India.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  View Live Demo
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to manage inventory
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Purpose-built for event and rental businesses with complex inventory needs
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="border-2 hover:border-purple-200 transition-colors">
                  <CardHeader>
                    <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                      <Icon className="h-6 w-6 text-purple-600" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Vendor Types Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Specialized for 6 vendor types
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Custom fields and workflows for each inventory category
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
            {vendorTypes.map((type, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm border border-gray-200"
              >
                <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
                <span className="font-medium text-gray-900">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 border-0">
            <CardContent className="p-12 text-center text-white">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Ready to optimize your inventory?
              </h2>
              <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
                Join event companies across India who are saving time and reducing costs with InventoryFlow
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link href="/dashboard">
                  <Button size="lg" variant="secondary">
                    Try Demo Dashboard
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Schedule a Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-purple-600" />
              <span className="font-semibold text-gray-900">InventoryFlow</span>
            </div>
            <p className="text-sm text-gray-500">
              © 2025 InventoryFlow. Built with Next.js 16, React 19 & TypeScript.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
