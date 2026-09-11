import React, { useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CheckCircle, Home } from 'lucide-react'
import { submitPoll } from '../api'

export default function Poll() {
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()
  const cloudData = location.state?.cloudData
  const [userGuess, setUserGuess] = useState('')
  const [aiResponse, setAiResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  if (!cloudData) {
    React.useEffect(() => {
      navigate('/')
    }, [])
    return null
  }

  const handleSubmit = async () => {
    if (!userGuess.trim()) return

    setLoading(true)
    try {
      const result = await submitPoll(id, userGuess)
      setAiResponse(result)
    } catch (error) {
      console.error('Poll submission failed:', error)
      alert('Failed to submit. Please try again.')
    } finally {
      setLoading(false)
    }
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
        <h2 className="text-xl font-bold text-white">Your Turn!</h2>
        <div className="w-11" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-white/80 backdrop-blur-md shadow-lg border border-white/60 p-6 mb-6"
      >
        <div className="mb-4 rounded-2xl overflow-hidden">
          <img
            src={cloudData.original_image_url}
            alt="Cloud"
            className="w-full aspect-square object-cover"
          />
        </div>

        <h3 className="text-2xl font-bold text-sky-900 mb-4 text-center">
          What do you think it is?
        </h3>

        {!aiResponse ? (
          <>
            <div className="bg-sky-50 rounded-2xl p-4 mb-4">
              <p className="text-sky-600 text-sm mb-2">AI thinks it's:</p>
              <p className="text-sky-900 text-xl font-bold">{cloudData.top_guess}</p>
              <p className="text-sky-500 text-sm mt-2">Confidence: {cloudData.confidence_score}%</p>
            </div>

            <input
              type="text"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              placeholder="Enter your guess..."
              className="w-full px-4 py-3 rounded-xl border-2 border-sky-200 focus:border-sky-400 outline-none mb-4"
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={!userGuess.trim() || loading}
              className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-blue-500 text-white px-6 py-4 font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Guess'}
            </motion.button>
          </>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="space-y-4"
            >
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-4 flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-green-900 font-medium mb-2">AI Response:</p>
                  <p className="text-green-800">{aiResponse.ai_response}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-sky-100 rounded-xl p-3 text-center">
                  <p className="text-sky-600 text-xs mb-1">You guessed</p>
                  <p className="text-sky-900 font-bold">{aiResponse.user_guess}</p>
                </div>
                <div className="bg-blue-100 rounded-xl p-3 text-center">
                  <p className="text-blue-600 text-xs mb-1">AI guessed</p>
                  <p className="text-blue-900 font-bold">{aiResponse.ai_guess}</p>
                </div>
              </div>

              <motion.button
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/')}
                className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-blue-500 text-white px-6 py-4 font-bold shadow-lg flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </motion.button>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  )
}
