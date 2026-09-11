import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, Calendar } from 'lucide-react'
import { getFeaturedCloud } from '../api'

export default function CloudOfTheDay() {
  const navigate = useNavigate()
  const [cloud, setCloud] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFeaturedCloud()
      .then((data) => {
        setCloud(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Failed to fetch featured cloud:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-gradient-to-b from-sky-400 via-sky-200 to-blue-50 p-4 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <Star className="w-16 h-16 text-white" />
        </motion.div>
      </div>
    )
  }

  if (!cloud) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-gradient-to-b from-sky-400 via-sky-200 to-blue-50 p-4 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-xl font-bold mb-2">No clouds yet</p>
          <p className="text-sky-100">Upload a cloud to get started!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-b from-sky-400 via-sky-200 to-blue-50 p-4">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="rounded-full bg-white/80 backdrop-blur-md p-3 shadow-md"
        >
          <ArrowLeft className="w-5 h-5 text-sky-700" />
        </button>
        <h2 className="text-xl font-bold text-white">Featured Cloud</h2>
        <div className="w-11" />
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0, rotateY: -10 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-white shadow-2xl border-8 border-white p-4 mb-6"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-2 mb-3">
          <div className="flex items-center justify-center gap-2 text-amber-600 mb-2">
            <Star className="w-5 h-5 fill-amber-400" />
            <span className="text-sm font-bold uppercase tracking-wide">Cloud of the Day</span>
            <Star className="w-5 h-5 fill-amber-400" />
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden mb-3 border-2 border-gray-100">
          <img
            src={cloud.original_image_url}
            alt={cloud.character_name}
            className="w-full aspect-square object-cover"
          />
        </div>

        <h3 className="text-2xl font-bold text-sky-900 mb-2 text-center">
          {cloud.character_name}
        </h3>

        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
            {cloud.top_guess}
          </div>
          <div className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm font-bold">
            {cloud.confidence_score}%
          </div>
        </div>

        <div className="bg-sky-50 rounded-2xl p-3 mb-3">
          <p className="text-sky-800 text-center italic text-sm">
            "{cloud.quote}"
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-sky-600 text-xs">
          <Calendar className="w-4 h-4" />
          <span>{new Date(cloud.created_at).toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          })}</span>
        </div>

        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1 rounded-full shadow-md">
          <p className="text-sky-600 text-xs font-medium">Polaroid Edition</p>
        </div>
      </motion.div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/history')}
        className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-blue-500 text-white px-6 py-4 font-bold shadow-lg"
      >
        View My Collection
      </motion.button>
    </div>
  )
}
