import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, Calendar, Download, Share2 } from 'lucide-react'
import Mascot from '../components/Mascot'
import FloatingClouds from '../components/FloatingClouds'
import useCloudHistory from '../hooks/useCloudHistory'

// Mock featured cloud (in real app, this would come from backend)
const MOCK_FEATURED_CLOUD = {
  id: 'featured_1',
  imageData: null,
  category: 'unicorn',
  confidence: 87,
  personality: {
    name: 'Celestial Dreamer',
    trait: 'Magical and whimsical',
    caption: 'A rare celestial being that brings wonder and enchantment to the sky.',
    stats: {
      cuteness: 92,
      chaos: 71,
      fluffiness: 85,
      main_character_energy: 89,
      unicorn_energy: 94
    }
  },
  timestamp: new Date().toISOString()
}

export default function CloudOfTheDayScreen() {
  const navigate = useNavigate()
  const { history } = useCloudHistory()
  const [cloud, setCloud] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching featured cloud
    setTimeout(() => {
      // If there are clouds in history, use the first one; otherwise use mock
      if (history.length > 0) {
        setCloud(history[0])
      } else {
        setCloud(MOCK_FEATURED_CLOUD)
      }
      setLoading(false)
    }, 800)
  }, [history])

  const handleSave = () => {
    // Would trigger confetti here
    console.log('Saving to collection...')
  }

  const handleExport = async () => {
    console.log('Exporting cloud card...')
  }

  if (loading) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-gradient-to-b from-sky-400 via-sky-200 to-blue-50 p-4 flex flex-col items-center justify-center relative">
        <FloatingClouds />
        <div className="relative z-10">
          <Mascot mood="idle" size="lg" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="mt-8"
        >
          <Star className="w-12 h-12 text-white" />
        </motion.div>
        </div>
      </div>
    )
  }

  if (!cloud) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-gradient-to-b from-sky-400 via-sky-200 to-blue-50 p-4 flex flex-col items-center justify-center relative">
        <FloatingClouds />
        <div className="relative z-10 text-center">
          <Mascot mood="sleep" size="lg" />
          <div className="text-center text-white mt-8">
            <p className="text-xl font-bold mb-2">No featured cloud yet</p>
            <p className="text-sky-100">Upload a cloud to be featured!</p>
          </div>
        </div>
      </div>
    )
  }

  const personality = cloud.personality || {}
  const formattedDate = new Date(cloud.timestamp).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

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
        <h2 className="text-xl sm:text-2xl font-bold text-white">Featured Cloud</h2>
        <div className="w-11" />
      </div>

      {/* Mascot */}
      <div className="flex justify-center mb-6 lg:mb-8 relative z-10">
        <Mascot mood="excited" size="md" />
      </div>

      {/* Polaroid Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, rotateY: -10 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-xl bg-white shadow-2xl border-8 border-white p-4 sm:p-6 mb-6 flex-1 flex flex-col max-w-4xl mx-auto w-full"
      >
        {/* Header Badge */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg p-2 mb-3"
        >
          <div className="flex items-center justify-center gap-2 text-amber-700 mb-1">
            <Star className="w-4 h-4 fill-amber-500" />
            <span className="text-xs font-bold uppercase tracking-wider">Cloud of the Day</span>
            <Star className="w-4 h-4 fill-amber-500" />
          </div>
        </motion.div>

        {/* Image */}
        {cloud.imageData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg overflow-hidden mb-3 border-2 border-gray-100 bg-gray-200 flex-1 flex items-center justify-center max-w-sm mx-auto"
          >
            <img
              src={cloud.imageData}
              alt={personality.name || 'Cloud'}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Character Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 text-center">
            {personality.name || 'Mystery Cloud'}
          </h3>

          <div className="flex items-center justify-center gap-2 mb-3 flex-wrap">
            <div className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              {cloud.category?.toUpperCase()}
            </div>
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">
              {cloud.confidence}% sure
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-3 mb-3">
            <p className="text-gray-800 text-center italic text-sm sm:text-base">
              "{personality.caption || 'A beautiful cloud in the sky'}"
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold">Polaroid Edition</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Action Buttons */}
      <div className="space-y-3 max-w-md mx-auto w-full">
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          className="w-full rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 sm:py-4 font-bold shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-shadow"
        >
          <Star className="w-5 h-5 fill-white" />
          Save to Collection
        </motion.button>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleExport}
          className="w-full rounded-2xl bg-white/80 backdrop-blur-md text-sky-600 px-6 py-3 sm:py-4 font-semibold shadow-md flex items-center justify-center gap-2 hover:bg-white transition-colors"
        >
          <Download className="w-5 h-5" />
          Export Card
        </motion.button>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/history')}
          className="w-full rounded-2xl bg-white/60 backdrop-blur-sm text-sky-700 px-6 py-3 sm:py-4 font-semibold hover:bg-white/80 transition-colors"
        >
          View My Collection
        </motion.button>
      </div>
    </div>
  )
}
