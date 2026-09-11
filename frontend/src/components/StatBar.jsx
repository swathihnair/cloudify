import React from 'react'
import { motion } from 'framer-motion'

export default function StatBar({ label, value, maxValue = 100, color = 'bg-sky-400', showPercent = true }) {
  const percentage = (value / maxValue) * 100

  // Color variants based on value
  const getColorClass = () => {
    if (color) return color
    if (value >= 80) return 'bg-emerald-400'
    if (value >= 60) return 'bg-sky-400'
    if (value >= 40) return 'bg-amber-400'
    return 'bg-rose-400'
  }

  return (
    <div className="w-full mb-4">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-semibold text-gray-700 capitalize">{label}</label>
        {showPercent && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-bold text-gray-800"
          >
            {value}%
          </motion.span>
        )}
      </div>

      {/* Background bar */}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-sm">
        {/* Animated fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
          className={`h-full ${getColorClass()} rounded-full shadow-md relative`}
        >
          {/* Shimmer effect */}
          <motion.div
            animate={{ x: ['0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
          />
        </motion.div>
      </div>
    </div>
  )
}
