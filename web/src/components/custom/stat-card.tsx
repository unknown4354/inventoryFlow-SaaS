import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: LucideIcon
  description?: string
  trend?: number[]
}

export function StatCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  description,
  trend,
}: StatCardProps) {
  return (
    <Card className="relative overflow-hidden transition-all hover:shadow-lg border-l-4 border-l-purple-500">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-transparent" />

      <CardHeader className="relative flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-black">
          {title}
        </CardTitle>
        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
          <Icon className="h-5 w-5 text-purple-600" />
        </div>
      </CardHeader>

      <CardContent className="relative">
        <div className="flex items-baseline gap-2">
          <div className="text-3xl font-bold text-black">{value}</div>
          {change && (
            <span
              className={cn(
                'text-sm font-medium',
                changeType === 'positive' && 'text-green-600',
                changeType === 'negative' && 'text-black',
                changeType === 'neutral' && 'text-black'
              )}
            >
              {change}
            </span>
          )}
        </div>

        {description && (
          <p className="text-xs text-white0 mt-1">{description}</p>
        )}

        {/* Mini trend line */}
        {trend && (
          <div className="flex items-end gap-1 mt-3 h-8">
            {trend.map((value, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-purple-500 to-purple-300 rounded-sm transition-all hover:from-purple-600 hover:to-purple-400"
                style={{ height: `${value}%` }}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
