import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Cloud, Camera, History as HistoryIcon, Sparkles } from 'lucide-react'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-b from-sky-400 via-sky-200 to-blue-50 p-4 flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="mb-8"
      >
        <Cloud className="w-32 h-32 text-white drop-shadow-lg" strokeWidth={1.5} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-5xl font-bold text-white mb-3 tracking-tight"
      >
        Cloudify
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sky-900 text-lg mb-12 text-center px-4"
      >
        Discover what magical creatures hide in the clouds
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/capture')}
        className="rounded-full bg-white text-sky-600 px-8 py-4 font-semibold text-lg shadow-lg flex items-center gap-3 mb-4"
      >
        <Camera className="w-6 h-6" />
        Scan a Cloud
      </motion.button>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/featured')}
        className="rounded-full bg-white/80 backdrop-blur-md text-sky-700 px-8 py-3 font-medium shadow-md flex items-center gap-2 mb-4"
      >
        <Sparkles className="w-5 h-5" />
        Cloud of the Day
      </motion.button>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/history')}
        className="rounded-full bg-white/60 backdrop-blur-sm text-sky-700 px-8 py-3 font-medium flex items-center gap-2"
      >
        <HistoryIcon className="w-5 h-5" />
        My Clouds
      </motion.button>
    </div>
  )
}
