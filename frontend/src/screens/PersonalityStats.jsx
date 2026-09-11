import React, { useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import StatBar from '../components/StatBar'
import Mascot from '../components/Mascot'
import FloatingClouds from '../components/FloatingClouds'
import useCloudHistory from '../hooks/useCloudHistory'

export default function PersonalityStats() {
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()
  const { getCloudById } = useCloudHistory()

  const cloudData = location.state?.cloudData || getCloudById(id)

  useEffect(() => {
    if (!cloudData) {
      navigate('/')
    }
  }, [cloudData, navigate])

  if (!cloudData) {
    return null
  }

  const personality = cloudData.personality || {}
  const stats = personality.stats || {}

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-sky-400 via-sky-200 to-blue-50 p-4 sm:p-6 lg:p-8 flex flex-col relative">
      {/* Floating background clouds */}
      <FloatingClouds />

      {/* Header */}
      <div className="mb-6 flex items-center justify-between relative z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(`/reveal/${id}`, { state: { cloudData } })}
          className="rounded-full bg-white/80 backdrop-blur-md p-3 shadow-md hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-sky-700" />
        </motion.button>
        <h2 className="text-xl sm:text-2xl font-bold text-white">Personality Stats</h2>
        <div className="w-11" />
      </div>

      {/* Mascot */}
      <div className="flex justify-center mb-6 lg:mb-8 relative z-10">
        <Mascot mood="idle" size="md" />
      </div>

      {/* Stats Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-white/80 backdrop-blur-md shadow-lg border border-white/60 p-4 sm:p-6 lg:p-8 mb-6 flex-1 overflow-y-auto max-w-4xl mx-auto w-full"
      >
        {/* Character Name */}
        <h3 className="text-2xl sm:text-3xl font-bold text-sky-900 mb-2 text-center">
          {personality.name || 'Cloud Character'}
        </h3>

        {/* Trait Badge */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 mb-6 text-center">
          <p className="text-purple-700 text-sm uppercase font-semibold mb-1">Trait</p>
          <p className="text-purple-900 text-lg font-bold">{personality.trait || 'Unknown'}</p>
        </div>

        {/* Stats Bars */}
        <div className="space-y-4">
          <p className="text-sky-600 text-xs uppercase font-semibold mb-4">Character Statistics</p>

          {Object.entries(stats).map(([statName, value], index) => (
            <motion.div
              key={statName}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <StatBar
                label={statName.replace(/_/g, ' ')}
                value={value}
                maxValue={100}
                color={getStatColor(statName)}
                showPercent={true}
              />
            </motion.div>
          ))}
        </div>

        {/* Quote Section */}
        {personality.caption && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-sky-50 rounded-2xl p-4 mt-6 border-2 border-sky-200"
          >
            <p className="text-sky-900 text-center italic text-sm sm:text-base">
              💭 "{personality.caption}"
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Action Buttons */}
      <div className="space-y-3 max-w-md mx-auto w-full">
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(`/poll/${id}`, { state: { cloudData } })}
          className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-blue-500 text-white px-6 py-3 sm:py-4 font-bold shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-shadow"
        >
          What Do You Think?
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/')}
          className="w-full rounded-2xl bg-white/60 backdrop-blur-sm text-sky-700 px-6 py-3 sm:py-4 font-semibold shadow-md hover:bg-white/80 transition-colors"
        >
          Back to Home
        </motion.button>
      </div>
    </div>
  )
}

function getStatColor(statName) {
  const name = statName.toLowerCase()
  if (name.includes('cuteness')) return 'bg-pink-400'
  if (name.includes('chaos')) return 'bg-red-400'
  if (name.includes('fluffy')) return 'bg-blue-300'
  if (name.includes('energy') || name.includes('main_character')) return 'bg-yellow-400'
  if (name.includes('dinosaur') || name.includes('dragon')) return 'bg-orange-400'
  return 'bg-sky-400'
}
