import React from 'react'
import { motion } from 'framer-motion'

// SVG-based Mascot component with mood-driven animations
export default function Mascot({ mood = 'idle', size = 'lg' }) {
  const sizeMap = {
    sm: { container: 'w-24 h-24', svg: 32 },
    md: { container: 'w-32 h-32', svg: 48 },
    lg: { container: 'w-48 h-48', svg: 80 },
    xl: { container: 'w-64 h-64', svg: 96 }
  }

  const currentSize = sizeMap[size] || sizeMap.lg

  // Animation variants based on mood
  const animationVariants = {
    sleep: {
      rotate: 0,
      y: [0, -4, 0],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
    },
    idle: {
      rotate: [0, 2, -2, 0],
      y: [0, -8, 0],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
    },
    excited: {
      rotate: [0, 5, -5, 0],
      y: [0, -12, 0],
      scale: [1, 1.05, 1],
      transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
    },
    curious: {
      rotate: [-5, 5, -5],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
    },
    result: {
      y: 0,
      rotate: 0,
      scale: 1
    }
  }

  // Eye animation variants
  const eyeVariants = {
    sleep: { scaleY: 0.1, transition: { duration: 0.5 } },
    idle: {
      scaleY: 1,
      transition: { duration: 0.3 }
    },
    excited: {
      scaleY: 1,
      transition: { duration: 0.3 }
    },
    curious: {
      scaleY: 1,
      transition: { duration: 0.3 }
    },
    result: {
      scaleY: 1
    }
  }

  // Halo animation (for excited state)
  const haloVariants = {
    excited: {
      opacity: [0.5, 1, 0.5],
      scale: [0.95, 1.1, 0.95],
      rotate: 360,
      transition: { duration: 2, repeat: Infinity }
    },
    idle: {
      opacity: 0.2,
      scale: 1,
      rotate: 0
    },
    default: {
      opacity: 0,
      scale: 0.8
    }
  }

  return (
    <div className={`flex items-center justify-center ${currentSize.container}`}>
      <motion.div
        animate={animationVariants[mood] || animationVariants.idle}
        className="relative w-full h-full"
      >
        {/* Halo (for excited state) */}
        <motion.div
          animate={haloVariants[mood] || haloVariants.default}
          className="absolute inset-0 rounded-full border-4 border-yellow-300 pointer-events-none"
        />

        {/* Main SVG */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-lg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cloud body */}
          <ellipse cx="50" cy="55" rx="35" ry="28" fill="#FFFFFF" stroke="#E0F2FE" strokeWidth="2" />
          <circle cx="30" cy="50" r="18" fill="#FFFFFF" stroke="#E0F2FE" strokeWidth="2" />
          <circle cx="70" cy="50" r="18" fill="#FFFFFF" stroke="#E0F2FE" strokeWidth="2" />

          {/* Face group */}
          <g id="face">
            {/* Left eye */}
            <motion.g
              animate={eyeVariants[mood] || eyeVariants.idle}
              origin="center"
            >
              <circle cx="38" cy="48" r="6" fill="#000000" />
              <circle cx="39" cy="46" r="2" fill="#FFFFFF" />
            </motion.g>

            {/* Right eye */}
            <motion.g
              animate={eyeVariants[mood] || eyeVariants.idle}
              origin="center"
            >
              <circle cx="62" cy="48" r="6" fill="#000000" />
              <circle cx="63" cy="46" r="2" fill="#FFFFFF" />
            </motion.g>

            {/* Mouth */}
            {mood === 'sleep' ? (
              <path d="M 45 60 Q 50 58 55 60" stroke="#000000" strokeWidth="2" fill="none" strokeLinecap="round" />
            ) : mood === 'excited' ? (
              <path d="M 45 58 Q 50 62 55 58" stroke="#000000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            ) : (
              <path d="M 45 60 Q 50 61 55 60" stroke="#000000" strokeWidth="2" fill="none" strokeLinecap="round" />
            )}
          </g>

          {/* Cheeks */}
          <circle cx="28" cy="55" r="4" fill="#FFB6D9" opacity="0.6" />
          <circle cx="72" cy="55" r="4" fill="#FFB6D9" opacity="0.6" />
        </svg>
      </motion.div>
    </div>
  )
}
