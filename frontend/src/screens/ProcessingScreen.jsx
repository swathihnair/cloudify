import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Mascot from '../components/Mascot'
import FloatingClouds from '../components/FloatingClouds'
import usePrediction from '../hooks/usePrediction'
import useCloudHistory from '../hooks/useCloudHistory'

const STEPS = [
  { label: 'Uploading image', duration: 1000 },
  { label: 'Detecting cloud region', duration: 1500 },
  { label: 'Segmenting shape', duration: 1200 },
  { label: 'Inferring archetype', duration: 1800 },
  { label: 'Generating character', duration: 1000 },
]

export default function ProcessingScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const { predict } = usePrediction()
  const { addCloud } = useCloudHistory()

  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const file = location.state?.file
    const preview = location.state?.preview
    const huntingFor = location.state?.huntingFor // Get the shape user is hunting for

    if (!file) {
      navigate('/')
      return
    }

    const totalDuration = STEPS.reduce((sum, step) => sum + step.duration, 0)
    let elapsed = 0

    const interval = setInterval(() => {
      elapsed += 50
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100)
      setProgress(newProgress)

      let accumulatedDuration = 0
      for (let i = 0; i < STEPS.length; i++) {
        accumulatedDuration += STEPS[i].duration
        if (elapsed < accumulatedDuration) {
          setCurrentStep(i)
          break
        }
      }
    }, 50)

    predict(file, huntingFor) // Pass huntingFor to predict
      .then((result) => {
        clearInterval(interval)

        const cloudCard = addCloud({
          imageData: `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${result.outlined_image_url}`, // Use outlined version
          ...result
        })

        setTimeout(() => {
          navigate(`/reveal/${cloudCard.id}`, { state: { cloudData: cloudCard } })
        }, 300)
      })
      .catch((error) => {
        clearInterval(interval)
        console.error('Analysis failed:', error)
        setTimeout(() => {
          alert('Failed to analyze cloud. Please try again.')
          navigate('/capture')
        }, 300)
      })

    return () => clearInterval(interval)
  }, [location.state, navigate, predict, addCloud])

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-sky-400 via-sky-200 to-blue-50 p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Floating background clouds */}
      <FloatingClouds />

      {/* Mascot */}
      <div className="mb-8 lg:mb-12 relative z-50">
        <Mascot mood="processing" size="lg" />
      </div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 text-center relative z-50"
      >
        Analyzing Cloud...
      </motion.h2>

      {/* Progress Card */}
      <div className="w-full max-w-md lg:max-w-xl cloud-container p-6 sm:p-8 relative z-50">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="bg-sky-100 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-sky-400 to-blue-500"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-center text-sky-600 font-medium mt-2 text-sm sm:text-base">
            {Math.round(progress)}%
          </p>
        </div>

        {/* Step Checklist */}
        <div className="space-y-3">
          {STEPS.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: index <= currentStep ? 1 : 0.3,
                x: 0,
              }}
              className="flex items-center gap-3"
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  index < currentStep
                    ? 'bg-green-500'
                    : index === currentStep
                    ? 'bg-sky-500 animate-pulse'
                    : 'bg-gray-300'
                }`}
              >
                {index < currentStep && (
                  <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className={`text-sm sm:text-base ${index <= currentStep ? 'text-sky-900 font-medium' : 'text-sky-400'}`}>
                {step.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tip */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-white/80 text-center text-sm mt-8 px-4 relative z-50"
      >
        ✨ This usually takes 10-15 seconds...
      </motion.p>
    </div>
  )
}
