import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { analyzeCloud } from '../api'

const STEPS = [
  { label: 'Uploading image', duration: 1000 },
  { label: 'Detecting cloud region', duration: 1500 },
  { label: 'Segmenting shape', duration: 1200 },
  { label: 'Inferring archetype', duration: 1800 },
  { label: 'Generating character', duration: 1000 },
]

export default function Processing() {
  const navigate = useNavigate()
  const location = useLocation()
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const file = location.state?.file
    if (!file) {
      navigate('/')
      return
    }

    // Animate progress
    const totalDuration = STEPS.reduce((sum, step) => sum + step.duration, 0)
    let elapsed = 0

    const interval = setInterval(() => {
      elapsed += 50
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100)
      setProgress(newProgress)

      // Update current step
      let accumulatedDuration = 0
      for (let i = 0; i < STEPS.length; i++) {
        accumulatedDuration += STEPS[i].duration
        if (elapsed < accumulatedDuration) {
          setCurrentStep(i)
          break
        }
      }
    }, 50)

    // Perform actual analysis
    analyzeCloud(file)
      .then((result) => {
        setTimeout(() => {
          navigate(`/reveal/${result.id}`, { state: { cloudData: result } })
        }, totalDuration)
      })
      .catch((error) => {
        console.error('Analysis failed:', error)
        alert('Failed to analyze cloud. Please try again.')
        navigate('/')
      })

    return () => clearInterval(interval)
  }, [location.state, navigate])

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-b from-sky-400 via-sky-200 to-blue-50 p-4 flex flex-col items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="mb-8"
      >
        <CloudIcon className="w-24 h-24 text-white" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold text-white mb-8 text-center"
      >
        Analyzing Cloud...
      </motion.h2>

      <div className="w-full rounded-3xl bg-white/80 backdrop-blur-md shadow-sm border border-white/60 p-6">
        <div className="mb-6">
          <div className="bg-sky-100 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-sky-400 to-blue-500"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-center text-sky-600 font-medium mt-2">
            {Math.round(progress)}%
          </p>
        </div>

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
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
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
              <span className={`text-sm ${index <= currentStep ? 'text-sky-900 font-medium' : 'text-sky-400'}`}>
                {step.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CloudIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.5 14.25c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5c-.15 0-.29.01-.44.04A4.99 4.99 0 0 0 14 6c-1.64 0-3.09.79-4 2.01A3.5 3.5 0 0 0 6.5 11.5c0 .17.01.33.04.5A3.5 3.5 0 0 0 4 15.5c0 1.93 1.57 3.5 3.5 3.5h12c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.25-2.5-2.25z" />
    </svg>
  )
}
