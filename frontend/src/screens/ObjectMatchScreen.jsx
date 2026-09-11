import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Upload, Camera, Sparkles } from 'lucide-react'
import axios from 'axios'

export default function ObjectMatchScreen() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [preview, setPreview] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState(null)
  const [showAnimation, setShowAnimation] = useState(false)

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)

    // Analyze with backend
    setAnalyzing(true)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'
      const response = await axios.post(`${API_BASE}/api/find-cloud`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 30000
      })

      setResult(response.data)
      
      // Show animation after 500ms
      setTimeout(() => {
        setShowAnimation(true)
      }, 500)
    } catch (error) {
      console.error('Analysis failed:', error)
      alert('Failed to analyze object. Please try again.')
    } finally {
      setAnalyzing(false)
    }
  }

  const handleFindClouds = () => {
    // Navigate to camera capture with the matched shape info
    navigate('/capture', { state: { lookingFor: result?.matched_shape } })
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-sky-400 via-sky-200 to-blue-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between max-w-3xl mx-auto">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="rounded-full bg-white/80 backdrop-blur-md p-3 shadow-md hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-sky-700" />
        </motion.button>
        <h2 className="text-xl sm:text-2xl font-bold text-white">Find Your Cloud</h2>
        <div className="w-11" />
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto">
        <div className="cloud-container p-6 sm:p-8 mb-6">
          <div className="text-center mb-6">
            <Sparkles className="w-12 h-12 text-sky-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-sky-900 mb-2">
              Upload an Object
            </h3>
            <p className="text-sky-700">
              Upload a photo of any animal or thing, and we'll tell you which cloud shape it matches!
            </p>
          </div>

          {/* Upload Area */}
          {!preview ? (
            <div className="space-y-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-blue-500 text-white px-6 py-4 font-bold shadow-lg flex items-center justify-center gap-3 hover:shadow-xl transition-shadow"
              >
                <Upload className="w-5 h-5" />
                Choose Photo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Preview */}
              <div className="rounded-2xl overflow-hidden bg-gray-100">
                <img src={preview} alt="Object" className="w-full h-auto object-contain max-h-96" />
              </div>

              {/* Loading */}
              {analyzing && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-500 border-t-transparent mx-auto mb-4"></div>
                  <p className="text-sky-700 font-medium">Analyzing your object...</p>
                </div>
              )}

              {/* Result */}
              {result && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200"
                >
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-3">
                      {result.matched_shape === 'IceCream' && '🍦'}
                      {result.matched_shape === 'Lion' && '🦁'}
                      {result.matched_shape === 'Dog' && '🐕'}
                      {result.matched_shape === 'Bear' && '🐻'}
                      {result.matched_shape === 'Horse' && '🐴'}
                      {result.matched_shape === 'Cat' && '🐱'}
                      {result.matched_shape === 'Rabbit' && '🐰'}
                      {result.matched_shape === 'Elephant' && '🐘'}
                      {result.matched_shape === 'Dinosaur' && '🦖'}
                      {result.matched_shape === 'Dragon' && '🐉'}
                      {result.matched_shape === 'Whale' && '🐋'}
                      {result.matched_shape === 'Bird' && '🐦'}
                      {result.matched_shape === 'Butterfly' && '🦋'}
                    </div>
                    <h4 className="text-2xl font-bold text-purple-900 mb-2">
                      {result.matched_shape === 'IceCream' 
                        ? 'Ice Cream Cloud!' 
                        : `Looks like a ${result.matched_shape}!`
                      }
                    </h4>
                    <div className="inline-block bg-purple-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                      {result.confidence}% Match
                    </div>
                  </div>

                  <p className="text-purple-700 text-center mb-4">
                    {result.message}
                  </p>

                  {/* Top Matches */}
                  {result.all_matches && (
                    <div className="bg-white/50 rounded-xl p-4">
                      <p className="text-sm font-semibold text-purple-900 mb-2">Top Matches:</p>
                      <div className="space-y-2">
                        {result.all_matches.slice(0, 5).map((match, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm">
                            <span className="text-purple-800">{match.shape}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-24 bg-purple-200 rounded-full h-2">
                                <div 
                                  className="bg-purple-500 h-2 rounded-full"
                                  style={{ width: `${match.confidence}%` }}
                                />
                              </div>
                              <span className="font-bold text-purple-900 w-12 text-right">
                                {match.confidence}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setPreview(null)
                    setResult(null)
                    setAnalyzing(false)
                    setShowAnimation(false)
                  }}
                  className="flex-1 rounded-2xl bg-white/80 backdrop-blur-md text-sky-600 px-6 py-3 font-semibold shadow-md hover:bg-white transition-colors"
                >
                  Try Another
                </button>
                {!showAnimation && (
                  <button
                    onClick={() => setShowAnimation(true)}
                    className="flex-1 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-500 text-white px-6 py-3 font-bold shadow-lg hover:shadow-xl transition-shadow"
                  >
                    Find Matching Clouds
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Animated "Let's Find Matching Cloud Pair" Screen */}
          {showAnimation && result && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="fixed inset-0 z-50 bg-gradient-to-b from-sky-400 via-purple-400 to-pink-300 flex flex-col items-center justify-center p-6"
            >
              {/* Floating clouds animation */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-9xl mb-8"
              >
                ☁️
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center mb-8"
              >
                <h2 className="text-5xl sm:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                  Let's Find
                </h2>
                <motion.h3
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                  className="text-6xl sm:text-7xl font-black text-white drop-shadow-2xl"
                >
                  Matching Cloud Pair!
                </motion.h3>
              </motion.div>

              {/* Object matched info */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.9, type: "spring" }}
                className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl mb-8 text-center"
              >
                <div className="text-7xl mb-4">
                  {result.matched_shape === 'IceCream' && '🍦'}
                  {result.matched_shape === 'Lion' && '🦁'}
                  {result.matched_shape === 'Dog' && '🐕'}
                  {result.matched_shape === 'Bear' && '🐻'}
                  {result.matched_shape === 'Horse' && '🐴'}
                  {result.matched_shape === 'Cat' && '🐱'}
                  {result.matched_shape === 'Rabbit' && '🐰'}
                  {result.matched_shape === 'Elephant' && '🐘'}
                  {result.matched_shape === 'Dinosaur' && '🦖'}
                  {result.matched_shape === 'Dragon' && '🐉'}
                  {result.matched_shape === 'Whale' && '🐋'}
                  {result.matched_shape === 'Bird' && '🐦'}
                  {result.matched_shape === 'Butterfly' && '🦋'}
                </div>
                <p className="text-2xl font-bold text-sky-900 mb-2">
                  Looking for
                </p>
                <p className="text-3xl font-black text-purple-600">
                  {result.matched_shape === 'IceCream' ? 'Fluffy Cloud' : result.matched_shape} Clouds
                </p>
              </motion.div>

              {/* Animated arrow pointing */}
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-6xl mb-6"
              >
                👇
              </motion.div>

              {/* Action button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFindClouds}
                className="bg-white text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-purple-600 px-12 py-6 rounded-full font-black text-2xl shadow-2xl border-4 border-white hover:shadow-3xl transition-all"
                style={{ backgroundColor: 'white' }}
              >
                <span className="bg-gradient-to-r from-sky-500 to-purple-600 text-transparent bg-clip-text">
                  Start Hunting! 📸
                </span>
              </motion.button>

              {/* Skip button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                onClick={() => setShowAnimation(false)}
                className="mt-6 text-white/80 hover:text-white text-sm font-medium underline"
              >
                Back to results
              </motion.button>
            </motion.div>
          )}

          {result && !showAnimation && (
            <div className="space-y-4">
              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setPreview(null)
                    setResult(null)
                    setAnalyzing(false)
                  }}
                  className="flex-1 rounded-2xl bg-white/80 backdrop-blur-md text-sky-600 px-6 py-3 font-semibold shadow-md hover:bg-white transition-colors"
                >
                  Try Another
                </button>
                <button
                  onClick={() => setShowAnimation(true)}
                  className="flex-1 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-500 text-white px-6 py-3 font-bold shadow-lg hover:shadow-xl transition-shadow"
                >
                  Find Matching Clouds
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-md">
          <h4 className="font-bold text-sky-900 mb-3">How it works:</h4>
          <ol className="space-y-2 text-sky-800">
            <li className="flex gap-2">
              <span className="font-bold">1.</span>
              <span>Upload a photo of any animal, toy, or object</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">2.</span>
              <span>Our AI analyzes what it looks like</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">3.</span>
              <span>We tell you which cloud shape to look for!</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">4.</span>
              <span>Go outside and find clouds matching that shape ☁️</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
