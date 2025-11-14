import { cn } from '@/lib/utils'

interface MiniChartProps {
  data: number[]
  labels?: string[]
  color?: 'purple' | 'blue' | 'green' | 'red'
  className?: string
}

const colorConfig = {
  purple: 'from-purple-500 to-purple-300',
  blue: 'from-white0 to-white',
  green: 'from-green-500 to-green-300',
  red: 'from-white0 to-white',
}

export function MiniChart({ data, labels, color = 'purple', className }: MiniChartProps) {
  const maxValue = Math.max(...data)
  const normalizedData = data.map(v => (v / maxValue) * 100)

  return (
    <div className={cn('relative', className)}>
      <div className="flex items-end justify-between gap-1 h-24">
        {normalizedData.map((value, i) => (
          <div key={i} className="flex flex-col items-center flex-1 group">
            <div
              className={cn(
                'w-full bg-gradient-to-t rounded-t transition-all duration-300',
                `hover:scale-110 cursor-pointer`,
                colorConfig[color]
              )}
              style={{ height: `${value}%`, minHeight: '4px' }}
              title={`${data[i]}`}
            />
            {labels && labels[i] && (
              <span className="text-[10px] text-white0 mt-1 group-hover:text-black transition-colors">
                {labels[i]}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

interface ProgressRingProps {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  color?: 'purple' | 'blue' | 'green' | 'red'
  label?: string
}

export function ProgressRing({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  color = 'purple',
  label,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const percentage = (value / max) * 100
  const offset = circumference - (percentage / 100) * circumference

  const colorMap = {
    purple: '#9333ea',
    blue: '#3b82f6',
    green: '#10b981',
    red: '#ef4444',
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colorMap[color]}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-black">{Math.round(percentage)}%</span>
        {label && <span className="text-xs text-white0 mt-1">{label}</span>}
      </div>
    </div>
  )
}
