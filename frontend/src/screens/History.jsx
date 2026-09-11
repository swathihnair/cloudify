import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar } from 'lucide-react'
import { getCloudHistory } from '../api'

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'this_week', label: 'This Week' },
  { value: 'this_month', label: 'This Month' },
]

export default function History() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [clouds, setClouds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getCloudHistory(filter)
      .then((data) => {
        setClouds(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Failed to fetch cloud history:', error)
        setLoading(false)
      })
  }, [filter])

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-b from-sky-400 via-sky-200 to-blue-50 p-4">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="rounded-full bg-white/80 backdrop-blur-md p-3 shadow-md"
        >
          <ArrowLeft className="w-5 h-5 text-sky-700" />
        </button>
        <h2 className="text-xl font-bold text-white">My Clouds</h2>
        <div className="w-11" />
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {FILTERS.map((f) => (
          <motion.button
            key={f.value}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
              filter === f.value
                ? 'bg-white text-sky-600 shadow-md'
                : 'bg-white/60 text-sky-700'
            }`}
          >
            {f.label}
          </motion.button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-4 border-white border-t-transparent rounded-full"
          />
        </div>
      ) : clouds.length === 0 ? (
        <div className="rounded-3xl bg-white/80 backdrop-blur-md shadow-sm border border-white/60 p-8 text-center">
          <p className="text-sky-600 text-lg font-medium mb-2">No clouds yet</p>
          <p className="text-sky-500 text-sm">Start scanning clouds to build your collection!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {clouds.map((cloud, index) => (
            <motion.div
              key={cloud.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate(`/reveal/${cloud.id}`, { state: { cloudData: cloud } })}
              className="rounded-3xl bg-white/80 backdrop-blur-md shadow-sm border border-white/60 p-4 cursor-pointer"
            >
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                  <img
                    src={cloud.original_image_url}
                    alt={cloud.character_name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{cloud.emoji || '☁️'}</span>
                    <h3 className="text-lg font-bold text-sky-900 truncate">
                      {cloud.character_name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      {cloud.emoji || '☁️'}
                      {cloud.top_guess}
                    </span>
                    <span className="bg-sky-100 text-sky-700 px-2 py-1 rounded-full text-xs font-bold">
                      {cloud.confidence_score}%
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-sky-600 text-xs">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {new Date(cloud.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
