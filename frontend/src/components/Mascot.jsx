import React, { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Ultra-Cute 3D Cloud Mascot Component
 * SVG-based volumetric cloud with Framer Motion physics
 * Supports hover interactions and multiple mood states
 */
export default function Mascot({ mood = 'idle', size = 'lg', interactive = true }) {
  const [isHovered, setIsHovered] = useState(false)

  const sizeMap = {
    sm: { container: 'w-32 h-32', svg: 32 },
    md: { container: 'w-48 h-48', svg: 48 },
    lg: { container: 'w-64 h-64', svg: 80 },
    xl: { container: 'w-80 h-80', svg: 96 },
  }

  const currentSize = sizeMap[size] || sizeMap.lg

  // Flying motion variants
  const flyingVariants = {
    idle: {
      y: [0, -16, 0],
      x: [0, 8, 0],
      rotate: [-2, 2, -2],
      transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
    },
    excited: {
      x: [0, 80, -70, 40, 0],
      y: [0, -40, -10, -50, 0],
      rotate: [-6, 8, -5, 6, -6],
      transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
    },
    processing: {
      x: [0, 60, -80, 50, 0],
      y: [0, -50, -20, -60, 0],
      rotate: [-7, 10, -4, 8, -7],
      transition: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
    },
    sleep: {
      y: [0, -4, 0],
      x: [0, 0, 0],
      rotate: [0, 0, 0],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
    },
    curious: {
      y: [0, -20, 0],
      x: [0, 6, 0],
      rotate: [-3, 3, -3],
      transition: { duration: 3.8, repeat: Infinity, ease: 'easeInOut' },
    },
    result: {
      y: 0,
      x: 0,
      rotate: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  }

  // Squish/stretch variants
  const squishVariants = {
    idle: {
      scaleX: [1, 1.03, 1],
      scaleY: [1, 0.98, 1],
      transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
    },
    excited: {
      scaleX: [1, 1.1, 0.9, 1.05, 1],
      scaleY: [1, 0.92, 1.05, 0.95, 1],
      transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
    },
    processing: {
      scaleX: [1, 1.08, 0.88, 1.06, 1],
      scaleY: [1, 0.90, 1.08, 0.94, 1],
      transition: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
    },
    sleep: {
      scaleX: [1, 1.01, 1],
      scaleY: [1, 0.99, 1],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
    },
    curious: {
      scaleX: [1, 1.05, 0.97, 1],
      scaleY: [1, 0.95, 1.03, 1],
      transition: { duration: 3.8, repeat: Infinity, ease: 'easeInOut' },
    },
    result: {
      scaleX: 1,
      scaleY: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  }

  // Eye animation variants
  const eyeVariants = {
    idle: { scaleY: 1, transition: { duration: 0.4 } },
    curious: { scaleY: 1.15, transition: { duration: 0.4 } },
    excited: { scaleY: 1.2, scale: 1.08, transition: { duration: 0.4 } },
    processing: { scaleY: 1.15, scale: 1.06, transition: { duration: 0.4 } },
    sleep: { scaleY: 0.08, transition: { duration: 0.5 } },
    result: { scaleY: 1, scale: 1, transition: { duration: 0.4 } },
    hoveredHappy: { scaleY: 1, scaleX: 1, transition: { duration: 0.3 } },
  }

  // Eye shine animations
  const shineVariants = {
    idle: { opacity: [0.5, 1, 0.5], transition: { duration: 2.5, repeat: Infinity } },
    curious: { opacity: [0.6, 1, 0.6], transition: { duration: 2, repeat: Infinity } },
    excited: { opacity: [0.7, 1, 0.7], transition: { duration: 1.5, repeat: Infinity } },
    processing: { opacity: [0.7, 1, 0.7], transition: { duration: 1.5, repeat: Infinity } },
    sleep: { opacity: 0, transition: { duration: 0.5 } },
    result: { opacity: [0.6, 1, 0.6], transition: { duration: 2.5, repeat: Infinity } },
    hoveredBright: { opacity: 1, transition: { duration: 0.3 } },
  }

  // Mouth animation variants
  const mouthVariants = {
    idle: { d: 'M 42 68 Q 60 75 78 68', transition: { duration: 0.4 } },
    curious: { d: 'M 42 65 Q 60 78 78 65', transition: { duration: 0.4 } },
    excited: { d: 'M 38 62 Q 60 82 82 62', transition: { duration: 0.3 } },
    processing: { d: 'M 38 65 Q 60 80 82 65', transition: { duration: 0.3 } },
    sleep: { d: 'M 45 70 Q 60 68 75 70', transition: { duration: 0.4 } },
    result: { d: 'M 42 68 Q 60 75 78 68', transition: { duration: 0.4 } },
    hoveredSmile: { d: 'M 45 70 Q 60 78 75 70', transition: { duration: 0.3 } },
  }

  // Blush animation variants
  const blushVariants = {
    idle: { opacity: [0.4, 0.7, 0.4], r: [10, 14, 10], transition: { duration: 2.5, repeat: Infinity } },
    curious: { opacity: [0.5, 0.8, 0.5], r: [11, 15, 11], transition: { duration: 2, repeat: Infinity } },
    excited: { opacity: [0.6, 1, 0.7], r: [12, 18, 14], transition: { duration: 1.5, repeat: Infinity } },
    processing: { opacity: [0.6, 1, 0.7], r: [12, 17, 14], transition: { duration: 1.5, repeat: Infinity } },
    sleep: { opacity: [0.2, 0.3, 0.2], r: [8, 10, 8], transition: { duration: 3, repeat: Infinity } },
    result: { opacity: [0.4, 0.7, 0.4], r: [10, 14, 10], transition: { duration: 2.5, repeat: Infinity } },
    hoveredBright: { opacity: [0.7, 1, 0.8], r: [14, 20, 16], transition: { duration: 1.5, repeat: Infinity } },
  }

  // Determine which state to use (hover overrides other states)
  const currentMood = isHovered && interactive ? 'hovered' : mood

  return (
    <motion.div
      className={`flex items-center justify-center ${currentSize.container}`}
      onHoverStart={() => interactive && setIsHovered(true)}
      onHoverEnd={() => interactive && setIsHovered(false)}
      whileHover={interactive ? { scale: 1.08 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.div
        variants={flyingVariants}
        animate={currentMood === 'hovered' ? 'idle' : mood}
        className="relative w-full h-full"
      >
        {/* Squish/Stretch wrapper */}
        <motion.div
          variants={squishVariants}
          animate={currentMood === 'hovered' ? 'idle' : mood}
          className="w-full h-full flex items-center justify-center"
        >
          {/* Glow effect background */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-200 to-transparent blur-3xl pointer-events-none"
            animate={{
              opacity: mood === 'excited' || mood === 'processing' ? [0.4, 0.7, 0.4] : [0.15, 0.25, 0.15],
              scale: mood === 'excited' || mood === 'processing' ? [0.95, 1.1, 0.95] : [0.9, 1, 0.9],
            }}
            transition={{ duration: mood === 'excited' || mood === 'processing' ? 2 : 2.5, repeat: Infinity }}
          />

          {/* Main SVG Cloud Mascot */}
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full drop-shadow-[0_20px_30px_rgba(140,190,255,0.5)] pointer-events-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* 3D volumetric gradient */}
              <radialGradient id="volumetricGrad" cx="40%" cy="35%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="40%" stopColor="#F5FAFF" stopOpacity="0.95" />
                <stop offset="70%" stopColor="#EBF5FF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#D0E4FF" stopOpacity="0.8" />
              </radialGradient>

              {/* Inner highlight for 3D effect */}
              <radialGradient id="highlight" cx="30%" cy="30%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#F8FCFF" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#F8FCFF" stopOpacity="0" />
              </radialGradient>

              {/* Soft filter */}
              <filter id="softness">
                <feGaussianBlur stdDeviation="1.2" />
              </filter>
            </defs>

            {/* Cloud body - Main ellipse */}
            <motion.ellipse
              cx="60"
              cy="70"
              rx="40"
              ry="30"
              fill="url(#volumetricGrad)"
              stroke="#E0F2FE"
              strokeWidth="0.5"
              animate={{
                rx: mood === 'excited' || mood === 'processing' ? [40, 44, 38] : [40, 41, 40],
                ry: mood === 'excited' || mood === 'processing' ? [30, 34, 28] : [30, 31, 30],
              }}
              transition={{
                duration: mood === 'excited' || mood === 'processing' ? 5 : 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Left bump - Pillow */}
            <motion.ellipse
              cx="28"
              cy="55"
              rx="26"
              ry="28"
              fill="url(#volumetricGrad)"
              stroke="#E0F2FE"
              strokeWidth="0.5"
              animate={{
                rx: mood === 'excited' || mood === 'processing' ? [26, 30, 24] : [26, 27, 26],
                ry: mood === 'excited' || mood === 'processing' ? [28, 32, 26] : [28, 29, 28],
              }}
              transition={{
                duration: mood === 'excited' || mood === 'processing' ? 5 : 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.1,
              }}
            />

            {/* Right bump - Pillow */}
            <motion.ellipse
              cx="92"
              cy="55"
              rx="26"
              ry="28"
              fill="url(#volumetricGrad)"
              stroke="#E0F2FE"
              strokeWidth="0.5"
              animate={{
                rx: mood === 'excited' || mood === 'processing' ? [26, 30, 24] : [26, 27, 26],
                ry: mood === 'excited' || mood === 'processing' ? [28, 32, 26] : [28, 29, 28],
              }}
              transition={{
                duration: mood === 'excited' || mood === 'processing' ? 5 : 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.1,
              }}
            />

            {/* Top peak - Fluffy */}
            <motion.ellipse
              cx="60"
              cy="32"
              rx="22"
              ry="24"
              fill="url(#volumetricGrad)"
              stroke="#E0F2FE"
              strokeWidth="0.5"
              animate={{
                rx: mood === 'excited' || mood === 'processing' ? [22, 26, 20] : [22, 23, 22],
                ry: mood === 'excited' || mood === 'processing' ? [24, 28, 22] : [24, 25, 24],
              }}
              transition={{
                duration: mood === 'excited' || mood === 'processing' ? 5 : 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.05,
              }}
            />

            {/* Bottom left bump */}
            <motion.ellipse
              cx="42"
              cy="88"
              rx="20"
              ry="18"
              fill="url(#volumetricGrad)"
              stroke="#E0F2FE"
              strokeWidth="0.5"
              animate={{
                rx: mood === 'excited' || mood === 'processing' ? [20, 24, 18] : [20, 21, 20],
                ry: mood === 'excited' || mood === 'processing' ? [18, 22, 16] : [18, 19, 18],
              }}
              transition={{
                duration: mood === 'excited' || mood === 'processing' ? 5 : 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.15,
              }}
            />

            {/* Bottom right bump */}
            <motion.ellipse
              cx="78"
              cy="88"
              rx="20"
              ry="18"
              fill="url(#volumetricGrad)"
              stroke="#E0F2FE"
              strokeWidth="0.5"
              animate={{
                rx: mood === 'excited' || mood === 'processing' ? [20, 24, 18] : [20, 21, 20],
                ry: mood === 'excited' || mood === 'processing' ? [18, 22, 16] : [18, 19, 18],
              }}
              transition={{
                duration: mood === 'excited' || mood === 'processing' ? 5 : 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.15,
              }}
            />

            {/* Inner highlight layer for 3D effect */}
            <ellipse
              cx="50"
              cy="50"
              rx="35"
              ry="28"
              fill="url(#highlight)"
              opacity="0.8"
            />

            {/* FACE GROUP */}
            <g id="face">
              {/* Left Eye */}
              <motion.circle
                cx="45"
                cy="62"
                r="7"
                fill="#1A1A1A"
                variants={eyeVariants}
                animate={isHovered && interactive ? 'hoveredHappy' : currentMood}
              />

              {/* Left Eye Catchlight */}
              <motion.circle
                cx="47"
                cy="59"
                r="2.5"
                fill="#FFFFFF"
                variants={shineVariants}
                animate={isHovered && interactive ? 'hoveredBright' : currentMood}
              />

              {/* Right Eye */}
              <motion.circle
                cx="75"
                cy="62"
                r="7"
                fill="#1A1A1A"
                variants={eyeVariants}
                animate={isHovered && interactive ? 'hoveredHappy' : currentMood}
              />

              {/* Right Eye Catchlight */}
              <motion.circle
                cx="77"
                cy="59"
                r="2.5"
                fill="#FFFFFF"
                variants={shineVariants}
                animate={isHovered && interactive ? 'hoveredBright' : currentMood}
              />

              {/* Mouth */}
              <motion.path
                d="M 42 68 Q 60 75 78 68"
                stroke="#1A1A1A"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                variants={mouthVariants}
                animate={isHovered && interactive ? 'hoveredSmile' : currentMood}
              />

              {/* Left Blush */}
              <motion.circle
                cx="18"
                cy="72"
                fill="#FFB7C5"
                variants={blushVariants}
                animate={isHovered && interactive ? 'hoveredBright' : currentMood}
              />

              {/* Right Blush */}
              <motion.circle
                cx="102"
                cy="72"
                fill="#FFB7C5"
                variants={blushVariants}
                animate={isHovered && interactive ? 'hoveredBright' : currentMood}
              />
            </g>

            {/* Sparkles for idle/curious states */}
            {(currentMood === 'idle' || currentMood === 'curious') && !isHovered && (
              <>
                <motion.circle
                  cx="10"
                  cy="40"
                  r="1.5"
                  fill="#FFD700"
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.circle
                  cx="110"
                  cy="40"
                  r="1.5"
                  fill="#FFD700"
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                />
              </>
            )}
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
