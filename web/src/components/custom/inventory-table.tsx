import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface InventoryItem {
  id: number
  name: string
  sku: string
  category: string
  location: string
  status: 'available' | 'in-use' | 'maintenance' | 'reserved'
  quantity?: number
  image?: string
}

interface InventoryTableProps {
  items: InventoryItem[]
}

const statusConfig = {
  available: { variant: 'success' as const, label: 'Available', color: 'bg-green-100 text-green-800' },
  'in-use': { variant: 'default' as const, label: 'In Use', color: 'bg-blue-100 text-blue-800' },
  maintenance: { variant: 'warning' as const, label: 'Maintenance', color: 'bg-yellow-100 text-yellow-800' },
  reserved: { variant: 'secondary' as const, label: 'Reserved', color: 'bg-purple-100 text-purple-800' },
}

export function InventoryTable({ items }: InventoryTableProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((item, idx) => (
              <tr
                key={item.id}
                className={cn(
                  'transition-colors hover:bg-gray-50 cursor-pointer',
                  idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                )}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center text-purple-600 font-semibold text-sm">
                        {item.name.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-gray-900">{item.name}</div>
                      {item.quantity && (
                        <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                  {item.sku}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {item.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={cn(
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    statusConfig[item.status].color
                  )}>
                    {statusConfig[item.status].label}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
