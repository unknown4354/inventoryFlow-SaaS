import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'InventoryFlow - Smart Inventory Management',
  description: 'AI-powered inventory management system for event, production, and rental businesses in India',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-black text-black dark:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="inventoryflow-theme"
          disableTransitionOnChange={false}
          forcedTheme={undefined}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
