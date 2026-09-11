import React from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Zap, Heart } from 'lucide-react'

export default function PersonalityStats() {
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()
  const cloudData = location.state?.cloudData

  if (!cloudData) {
    React.useEffect(() => {
      navigate('/')
    }, [])
    return null
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-b from-sky-400 via-sky-200 to-blue-50 p-4">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate(`/reveal/${id}`, { state: { cloudData } })}
          className="rounded-full bg-white/80 backdrop-blur-md p-3 shadow-md"
        >
          <ArrowLeft className="w-5 h-5 text-sky-700" />
        </button>
        <h2 className="text-xl font-bold text-white">Personality</h2>
        <div className="w-11" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-white/80 backdrop-blur-md shadow-lg border border-white/60 p-6 mb-6"
      >
        <h3 className="text-2xl font-bold text-sky-900 mb-4 text-center">
          {cloudData.character_name}
        </h3>

        <div className="bg-gradient-to-br from-sky-100 to-blue-100 rounded-2xl p-4 mb-6">
          <p className="text-sky-600 text-sm uppercase font-semibold mb-1">Personality Type</p>
          <p className="text-sky-900 text-2xl font-bold">{cloudData.personality_type}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-orange-500" />
              <p className="text-orange-600 text-sm font-semibold">Energy</p>
            </div>
            <p className="text-orange-900 text-3xl font-bold">{cloudData.energy_score}</p>
          </div>

          <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-pink-500" />
              <p className="text-pink-600 text-sm font-semibold">Cuteness</p>
            </div>
            <p className="text-pink-900 text-3xl font-bold">{cloudData.cuteness_score}</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sky-600 text-sm uppercase font-semibold mb-3">Character Stats</p>
          {Object.entries(cloudData.stats).map(([statName, value], index) => (
            <motion.div
              key={statName}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sky-900 font-medium">{statName}</span>
                <span className="text-sky-600 font-bold">{value}%</span>
              </div>
              <div className="bg-sky-100 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate(`/poll/${id}`, { state: { cloudData } })}
        className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-blue-500 text-white px-6 py-4 font-bold shadow-lg flex items-center justify-center gap-2"
      >
        What Do You Think It Is?
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </div>
  )
}
