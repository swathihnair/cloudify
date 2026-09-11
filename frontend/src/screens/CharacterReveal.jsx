import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Star, Sparkles } from 'lucide-react'

export default function CharacterReveal() {
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()
  const [cloudData, setCloudData] = useState(location.state?.cloudData)

  if (!cloudData) {
    useEffect(() => {
      navigate('/')
    }, [])
    return null
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
        <h2 className="text-xl font-bold text-white">Character Reveal</h2>
        <div className="w-11" />
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl bg-white/80 backdrop-blur-md shadow-lg border border-white/60 p-6 mb-6"
      >
        <div className="mb-4 rounded-2xl overflow-hidden">
          <img
            src={cloudData.original_image_url}
            alt="Cloud"
            className="w-full aspect-square object-cover"
          />
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-6xl text-center mb-3">
            {cloudData.emoji || '☁️'}
          </div>
          
          <h3 className="text-3xl font-bold text-sky-900 mb-2 text-center">
            {cloudData.character_name}
          </h3>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              {cloudData.emoji || '☁️'}
              {cloudData.top_guess}
            </div>
            <div className="bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-bold">
              {cloudData.confidence_score}%
            </div>
          </div>

          <div className="bg-sky-50 rounded-2xl p-4 mb-4">
            <p className="text-sky-900 text-center italic">
              "{cloudData.quote}"
            </p>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-sky-600">Runner-up:</span>
            <div className="flex items-center gap-2">
              <span className="text-sky-900 font-medium">{cloudData.runner_up_guess}</span>
              <span className="bg-sky-200 text-sky-700 px-2 py-1 rounded-full text-xs font-bold">
                {cloudData.runner_up_score}%
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate(`/stats/${id}`, { state: { cloudData } })}
        className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-blue-500 text-white px-6 py-4 font-bold shadow-lg flex items-center justify-center gap-2"
      >
        View Personality Stats
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </div>
  )
}
