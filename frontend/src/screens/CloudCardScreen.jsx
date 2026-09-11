import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Star, Sparkles } from 'lucide-react'
import DoodleOverlay from '../components/DoodleOverlay'
import Mascot from '../components/Mascot'
import FloatingClouds from '../components/FloatingClouds'
import useCloudHistory from '../hooks/useCloudHistory'

export default function CloudCardScreen() {
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()
  const imageRef = useRef(null)
  const { getCloudById } = useCloudHistory()

  const [cloudData, setCloudData] = useState(null)
  const [showOverlay, setShowOverlay] = useState(false)

  useEffect(() => {
    const data = location.state?.cloudData || getCloudById(id)

    if (!data) {
      navigate('/')
      return
    }

    setCloudData(data)

    const timer = setTimeout(() => setShowOverlay(true), 300)
    return () => clearTimeout(timer)
  }, [id, location.state, navigate, getCloudById])

  if (!cloudData) {
    return null
  }

  const personality = cloudData.personality || {}
  const region = cloudData.region || { x: 25, y: 25, width: 50, height: 50 }

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
        <h2 className="text-xl sm:text-2xl font-bold text-white">Cloud Character</h2>
        <div className="w-11" />
      </div>

      {/* Mascot */}
      <div className="flex justify-center mb-6 lg:mb-8">
        <Mascot mood="result" size="md" />
      </div>

      {/* Content Container */}
      <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full overflow-y-auto">
        {/* Cloud Image with Overlay */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-white/80 backdrop-blur-md shadow-lg border border-white/60 p-3 sm:p-4 lg:p-6 mb-4 flex flex-col"
        >
          {/* Image Container */}
          <div className="relative mb-4 rounded-2xl overflow-hidden bg-gray-200 w-full">
            {cloudData.imageData ? (
              <>
                <img
                  ref={imageRef}
                  src={cloudData.imageData}
                  alt="Cloud"
                  className="w-full h-auto object-contain"
                />
                {/* Doodle Overlay - DISABLED */}
                {/* <AnimatePresence>
                  {showOverlay && (
                    <DoodleOverlay
                      imageRef={imageRef}
                      region={region}
                      category={cloudData.category}
                      isVisible={true}
                    />
                  )}
                </AnimatePresence> */}
              </>
            ) : (
              <div className="w-full h-56 flex items-center justify-center">
                <span className="text-gray-500">No image</span>
              </div>
            )}
          </div>

          {/* Character Info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Character Name */}
            <h3 className="text-xl sm:text-2xl font-bold text-sky-900 mb-1 text-center">
              {personality.name || 'Unknown Cloud'}
            </h3>

            {/* Category & Confidence Badges */}
            <div className="flex items-center justify-center gap-2 mb-3 flex-wrap">
              <div className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1">
                <Star className="w-3 h-3 fill-white" />
                {cloudData.category?.toUpperCase()}
              </div>
              <div className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                {cloudData.confidence}%
              </div>
            </div>

            {/* Trait */}
            <div className="bg-purple-50 rounded-lg px-3 py-2 mb-3">
              <p className="text-xs sm:text-sm text-purple-700 font-semibold text-center">
                ✨ {personality.trait || 'A mysterious cloud'}
              </p>
            </div>

            {/* Quote */}
            <div className="bg-sky-50 rounded-2xl p-3 mb-3">
              <p className="text-sky-900 text-center italic text-xs sm:text-sm">
                "{personality.caption || 'Floating in the sky, full of mystery...'}"
              </p>
            </div>

            {/* Alt Category */}
            {cloudData.alt_category && (
              <div className="flex items-center justify-between text-xs sm:text-sm bg-gray-50 rounded-lg p-2">
                <span className="text-gray-600">Could also be:</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-900 font-medium">{cloudData.alt_category?.toUpperCase()}</span>
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-bold">
                    {cloudData.alt_confidence}%
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <div className="space-y-2 max-w-md mx-auto w-full">
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/stats/${id}`, { state: { cloudData } })}
            className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-blue-500 text-white px-6 py-2 sm:py-3 font-bold shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-shadow text-sm sm:text-base"
          >
            View Personality Stats
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/poll/${id}`, { state: { cloudData } })}
            className="w-full rounded-2xl bg-white/80 backdrop-blur-md text-sky-600 px-6 py-2 sm:py-3 font-semibold shadow-md flex items-center justify-center gap-2 hover:bg-white transition-colors text-sm sm:text-base"
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            Make Your Guess
          </motion.button>
        </div>
      </div>
    </div>
  )
}
