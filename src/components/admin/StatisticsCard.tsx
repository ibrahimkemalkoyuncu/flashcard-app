import { ReactNode } from 'react'

interface StatisticsCardProps {
  title: string
  value: string | number
  icon: ReactNode
  trend?: 'up' | 'down' | 'neutral'
}

export default function StatisticsCard({ title, value, icon, trend = 'neutral' }: StatisticsCardProps) {
  const trendColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-gray-500',
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
          <span className="text-xl">{icon}</span>
        </div>
      </div>
    </div>
  )
}