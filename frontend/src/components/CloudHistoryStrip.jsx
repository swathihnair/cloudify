import React from 'react'
import { motion } from 'framer-motion'
import { X, Download } from 'lucide-react'

export default function CloudHistoryStrip({
  clouds = [],
  onSelect,
  onDelete,
  onExport,
  isLoading = false
}) {
  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4 px-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-32 h-40 rounded-lg bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (clouds.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-sm">No clouds yet. Scan a cloud to get started!</p>
      </div>
    )
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  return (
    <div className="flex gap-3 overflow-x-auto pb-4 px-2">
      {clouds.map((cloud, index) => (
        <motion.div
          key={cloud.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onSelect?.(cloud)}
          className="flex-shrink-0 group relative"
        >
          {/* Card Container */}
          <div className="w-32 h-40 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer bg-white border border-gray-100">
            {/* Image Preview */}
            {cloud.imageData ? (
              <img
                src={cloud.imageData}
                alt={cloud.category}
                className="w-full h-24 object-cover"
              />
            ) : (
              <div className="w-full h-24 bg-gradient-to-br from-sky-200 to-blue-100 flex items-center justify-center">
                <span className="text-xs text-gray-500">No image</span>
              </div>
            )}

            {/* Card Info */}
            <div className="p-2 h-16 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-gray-800 truncate capitalize">
                  {cloud.personality?.name || cloud.category}
                </h3>
                <p className="text-xs text-gray-600 truncate">
                  {cloud.category}
                </p>
              </div>
              <p className="text-xs text-gray-500">{formatDate(cloud.timestamp)}</p>
            </div>

            {/* Hover overlay actions */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {onExport && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    onExport(cloud)
                  }}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
                  title="Export"
                >
                  <Download className="w-4 h-4 text-blue-500" />
                </motion.button>
              )}

              {onDelete && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(cloud.id)
                  }}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
                  title="Delete"
                >
                  <X className="w-4 h-4 text-red-500" />
                </motion.button>
              )}
            </div>

            {/* Confidence badge */}
            {cloud.confidence && (
              <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1 shadow-md">
                <span className="text-xs font-bold text-gray-800">
                  {cloud.confidence}%
                </span>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
