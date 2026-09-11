import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CheckCircle, Home, MessageCircle } from 'lucide-react'
import Mascot from '../components/Mascot'
import FloatingClouds from '../components/FloatingClouds'
import useCloudHistory from '../hooks/useCloudHistory'

const GUESS_OPTIONS = ['dinosaur', 'dragon', 'bunny', 'whale', 'unicorn']

export default function HumanVsAiScreen() {
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()
  const { getCloudById } = useCloudHistory()

  const cloudData = location.state?.cloudData || getCloudById(id)

  const [userGuess, setUserGuess] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [mascotMood, setMascotMood] = useState('curious')

  useEffect(() => {
    if (!cloudData) {
      navigate('/')
    }
  }, [cloudData, navigate])

  if (!cloudData) {
    return null
  }

  const handleGuessSelect = (guess) => {
    setUserGuess(guess)
  }

  const handleSubmit = () => {
    if (!userGuess) return

    setSubmitted(true)
    setMascotMood('excited')

    // Simulate AI response delay
    setTimeout(() => {
      setMascotMood(userGuess === cloudData.category ? 'excited' : 'idle')
    }, 1500)
  }

  const isCorrect = userGuess === cloudData.category

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
        <h2 className="text-xl sm:text-2xl font-bold text-white">Your Guess?</h2>
        <div className="w-11" />
      </div>

      {/* Mascot */}
      <div className="flex justify-center mb-6 lg:mb-8 relative z-10">
        <Mascot mood={mascotMood} size="lg" />
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-white/80 backdrop-blur-md shadow-lg border border-white/60 p-4 sm:p-6 lg:p-8 mb-6 flex-1 flex flex-col max-w-4xl mx-auto w-full relative z-10"
      >
        <AnimatePresence mode="wait">
          {!submitted ? (
            // Guess Selection
            <motion.div
              key="guessing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col"
            >
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-sky-900 mb-4 text-center">
                What do you think it is?
              </h3>

              {/* AI Hint */}
              <div className="bg-sky-50 rounded-2xl p-4 mb-6 border-2 border-sky-200">
                <p className="text-sky-600 text-sm mb-2 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  AI thinks it's:
                </p>
                <p className="text-sky-900 text-lg font-bold">{cloudData.category?.toUpperCase()}</p>
                <p className="text-sky-500 text-xs mt-2">
                  Confidence: {cloudData.confidence}%
                </p>
              </div>

              {/* Guess Options */}
              <div className="space-y-2 mb-4 flex-1">
                {GUESS_OPTIONS.map((option, index) => (
                  <motion.button
                    key={option}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleGuessSelect(option)}
                    className={`w-full px-4 py-3 sm:py-4 rounded-xl font-semibold transition-all text-sm sm:text-base ${
                      userGuess === option
                        ? 'bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-lg'
                        : 'bg-sky-100 text-sky-700 hover:bg-sky-200'
                    }`}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                    {userGuess === option && ' ✓'}
                  </motion.button>
                ))}
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={userGuess ? { scale: 1.02 } : {}}
                whileTap={userGuess ? { scale: 0.98 } : {}}
                onClick={handleSubmit}
                disabled={!userGuess}
                className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-blue-500 text-white px-6 py-3 sm:py-4 font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-xl"
              >
                Submit My Guess ✨
              </motion.button>
            </motion.div>
          ) : (
            // Result
            <motion.div
              key="result"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex-1 flex flex-col justify-center space-y-4"
            >
              {/* Result Feedback */}
              {isCorrect ? (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-6 sm:p-8 text-center border-2 border-green-300"
                >
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-3" />
                  <p className="text-green-900 font-bold text-lg sm:text-xl mb-2">You Got It! 🎉</p>
                  <p className="text-green-800 text-sm sm:text-base">
                    Great job! You and the AI agree!
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-6 sm:p-8 text-center border-2 border-blue-300"
                >
                  <MessageCircle className="w-16 h-16 text-blue-600 mx-auto mb-3" />
                  <p className="text-blue-900 font-bold text-lg sm:text-xl mb-2">Different Opinions! 💭</p>
                  <p className="text-blue-800 text-sm mb-4">
                    You guessed <span className="font-bold">{userGuess?.toUpperCase()}</span>
                  </p>
                  <p className="text-blue-800 text-sm">
                    The AI guessed <span className="font-bold">{cloudData.category?.toUpperCase()}</span>
                  </p>
                </motion.div>
              )}

              {/* Comparison */}
              <div className="grid grid-cols-2 gap-3 bg-white/50 rounded-2xl p-4">
                <div className="bg-blue-50 rounded-xl p-3 text-center border border-blue-200">
                  <p className="text-blue-600 text-xs font-semibold mb-2">Your Guess</p>
                  <p className="text-blue-900 font-bold text-sm sm:text-base">{userGuess?.toUpperCase()}</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-3 text-center border border-purple-200">
                  <p className="text-purple-600 text-xs font-semibold mb-2">AI Guess</p>
                  <p className="text-purple-900 font-bold text-sm sm:text-base">{cloudData.category?.toUpperCase()}</p>
                </div>
              </div>

              {/* Navigation */}
              <motion.button
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/history')}
                className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-blue-500 text-white px-6 py-3 sm:py-4 font-bold shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-shadow"
              >
                <Home className="w-5 h-5" />
                View Your Gallery
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
