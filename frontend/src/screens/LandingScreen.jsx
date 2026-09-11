import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Cloud, Camera, History as HistoryIcon, Sparkles } from 'lucide-react'
import Mascot from '../components/Mascot'

export default function LandingScreen() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-sky-400 via-sky-200 to-blue-50 p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center">
      {/* Mascot */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="mb-8 lg:mb-12"
      >
        <Mascot mood="idle" size="lg" />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 tracking-tight text-center"
      >
        Cloudify
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sky-900 text-base sm:text-lg lg:text-xl mb-12 text-center px-4 max-w-2xl"
      >
        Discover what magical creatures hide in the clouds
      </motion.p>

      {/* CTA Buttons Container */}
      <div className="w-full max-w-md lg:max-w-lg flex flex-col gap-4">
        {/* Primary CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/capture')}
          className="rounded-full bg-white text-sky-600 px-8 py-4 sm:py-5 font-semibold text-base sm:text-lg shadow-lg flex items-center justify-center gap-3 hover:shadow-xl transition-shadow"
        >
          <Camera className="w-6 h-6" />
          Capture or Upload
        </motion.button>

        {/* Secondary CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/featured')}
          className="rounded-full bg-white/80 backdrop-blur-md text-sky-700 px-8 py-3 sm:py-4 font-medium shadow-md flex items-center justify-center gap-2 hover:bg-white transition-colors"
        >
          <Sparkles className="w-5 h-5" />
          Cloud of the Day
        </motion.button>

        {/* Tertiary CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/history')}
          className="rounded-full bg-white/60 backdrop-blur-sm text-sky-700 px-8 py-3 sm:py-4 font-medium flex items-center justify-center gap-2 hover:bg-white/80 transition-colors"
        >
          <HistoryIcon className="w-5 h-5" />
          My Clouds
        </motion.button>
      </div>
    </div>
  )
}
