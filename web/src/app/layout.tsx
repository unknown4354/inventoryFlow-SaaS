import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
