export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm">
        <h1 className="text-6xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
          InventoryFlow
        </h1>
        <p className="text-center text-xl text-muted-foreground mb-8">
          Smart Inventory Management for Event & Rental Businesses
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          <div className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2">📦 Track Inventory</h3>
            <p className="text-sm text-muted-foreground">
              Manage items across multiple warehouses with real-time tracking
            </p>
          </div>

          <div className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2">📱 Mobile Ready</h3>
            <p className="text-sm text-muted-foreground">
              Check-out and check-in items on the go with our mobile app
            </p>
          </div>

          <div className="p-6 border rounded-lg bg-card hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2">🤖 AI Powered</h3>
            <p className="text-sm text-muted-foreground">
              Get smart suggestions and automate your inventory workflows
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex gap-4">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
              Get Started
            </button>
            <button className="px-6 py-3 border border-input rounded-lg font-medium hover:bg-accent transition-colors">
              Learn More
            </button>
          </div>
        </div>

        <div className="mt-16 text-center text-sm text-muted-foreground">
          <p>🚀 Built with Next.js 15, React 19, TypeScript & Tailwind CSS</p>
          <p className="mt-2">Ready to deploy to Vercel</p>
        </div>
      </div>
    </main>
  )
}
