import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Trash2 } from 'lucide-react'
import Mascot from '../components/Mascot'
import FloatingClouds from '../components/FloatingClouds'
import useCloudHistory from '../hooks/useCloudHistory'

const FILTERS = [
  { value: 'all', label: 'All Time' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
]

export default function CloudHistoryScreen() {
  const navigate = useNavigate()
  const { history, filterByTime, removeCloud, clearHistory } = useCloudHistory()
  const [filter, setFilter] = useState('all')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const filteredClouds = filterByTime(filter)

  const handleSelectCloud = (cloud) => {
    navigate(`/reveal/${cloud.id}`, { state: { cloudData: cloud } })
  }

  const handleDeleteCloud = (cloudId) => {
    removeCloud(cloudId)
  }

  const handleClearAll = () => {
    if (confirm('Are you sure you want to delete all clouds? This cannot be undone.')) {
      clearHistory()
      setShowDeleteConfirm(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-sky-400 via-sky-200 to-blue-50 p-4 sm:p-6 lg:p-8 flex flex-col relative">
      {/* Floating background clouds */}
      <FloatingClouds />

      {/* Header */}
      <div className="mb-6 flex items-center justify-between relative z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="rounded-full bg-white/80 backdrop-blur-md p-3 shadow-md hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-sky-700" />
        </motion.button>
        <h2 className="text-xl sm:text-2xl font-bold text-white">My Cloud Gallery</h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
          disabled={history.length === 0}
          className="rounded-full bg-red-500/80 backdrop-blur-md p-3 shadow-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 className="w-5 h-5 text-white" />
        </motion.button>
      </div>

      {/* Mascot */}
      <div className="flex justify-center mb-6 lg:mb-8 relative z-10">
        <Mascot mood={history.length > 0 ? 'idle' : 'sleep'} size="md" />
      </div>

      {/* Delete Confirmation */}
      {showDeleteConfirm && history.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-red-100 border-2 border-red-300 p-4 mb-4"
        >
          <p className="text-red-900 font-semibold mb-3">Delete all clouds?</p>
          <div className="flex gap-2">
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="flex-1 px-3 py-2 rounded-lg bg-red-200 text-red-900 font-semibold hover:bg-red-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleClearAll}
              className="flex-1 px-3 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
            >
              Delete All
            </button>
          </div>
        </motion.div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {FILTERS.map((f) => (
          <motion.button
            key={f.value}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors text-sm sm:text-base ${
              filter === f.value
                ? 'bg-white text-sky-600 shadow-md'
                : 'bg-white/60 text-sky-700 hover:bg-white/80'
            }`}
          >
            {f.label}
          </motion.button>
        ))}
      </div>

      {/* Cloud Gallery */}
      <div className="flex-1 overflow-y-auto">
        {filteredClouds.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-white/80 backdrop-blur-md shadow-sm border border-white/60 p-8 text-center h-full flex flex-col items-center justify-center max-w-4xl mx-auto"
          >
            <p className="text-sky-600 text-lg font-medium mb-2">No clouds yet</p>
            <p className="text-sky-500 text-sm mb-6">
              {history.length > 0
                ? 'No clouds in this time period'
                : 'Start scanning clouds to build your collection!'}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/capture')}
              className="px-6 py-2 rounded-full bg-sky-500 text-white font-semibold shadow-lg hover:bg-sky-600 transition-colors"
            >
              Capture Cloud
            </motion.button>
          </motion.div>
        ) : (
          <>
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 grid grid-cols-3 gap-3 max-w-4xl mx-auto w-full"
            >
              <div className="rounded-lg bg-white/80 p-3 text-center">
                <p className="text-sky-600 text-xs font-semibold mb-1">Total</p>
                <p className="text-sky-900 text-2xl font-bold">{filteredClouds.length}</p>
              </div>
              <div className="rounded-lg bg-white/80 p-3 text-center">
                <p className="text-sky-600 text-xs font-semibold mb-1">Avg Confidence</p>
                <p className="text-sky-900 text-2xl font-bold">
                  {filteredClouds.length > 0
                    ? Math.round(
                        filteredClouds.reduce((sum, c) => sum + (c.confidence || 0), 0) / filteredClouds.length
                      )
                    : 0}
                  %
                </p>
              </div>
              <div className="rounded-lg bg-white/80 p-3 text-center">
                <p className="text-sky-600 text-xs font-semibold mb-1">Categories</p>
                <p className="text-sky-900 text-2xl font-bold">
                  {new Set(filteredClouds.map((c) => c.category)).size}
                </p>
              </div>
            </motion.div>

            {/* Cloud List as Cards */}
            <div className="space-y-3 pb-4 max-w-4xl mx-auto w-full">
              {filteredClouds.map((cloud, index) => (
                <motion.div
                  key={cloud.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleSelectCloud(cloud)}
                  className="rounded-2xl bg-white/80 backdrop-blur-md shadow-sm border border-white/60 p-4 cursor-pointer hover:shadow-lg transition-shadow group"
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-sky-200 to-blue-100">
                      {cloud.imageData ? (
                        <img
                          src={cloud.imageData}
                          alt={cloud.category}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                          No image
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-sky-900 mb-1 truncate">
                        {cloud.personality?.name || cloud.category}
                      </h3>

                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="bg-gradient-to-r from-sky-400 to-blue-400 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          {cloud.category?.toUpperCase()}
                        </span>
                        <span className="bg-sky-100 text-sky-700 px-2 py-1 rounded-full text-xs font-bold">
                          {cloud.confidence}%
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-sky-600 text-xs">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(cloud.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteCloud(cloud.id)
                      }}
                      className="p-2 rounded-lg bg-red-100 text-red-500 hover:bg-red-200 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Bottom Action */}
      {filteredClouds.length > 0 && (
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/capture')}
          className="mt-6 w-full max-w-md mx-auto rounded-2xl bg-gradient-to-r from-sky-500 to-blue-500 text-white px-6 py-3 sm:py-4 font-bold shadow-lg hover:shadow-xl transition-shadow"
        >
          Scan Another Cloud ✨
        </motion.button>
      )}
    </div>
  )
}
