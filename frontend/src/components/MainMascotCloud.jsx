import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function MainMascotCloud({ mood = 'idle', size = 'lg' }) {
  // Size configurations
  const sizeMap = {
    sm: { container: 'w-32 h-32', svg: 'w-32 h-32' },
    md: { container: 'w-48 h-48', svg: 'w-48 h-48' },
    lg: { container: 'w-64 h-64', svg: 'w-64 h-64' },
    xl: { container: 'w-80 h-80', svg: 'w-80 h-80' },
  }

  const currentSize = sizeMap[size] || sizeMap.lg

  // Main cloud body animation variants
  const bodyVariants = {
    idle: {
      scale: [1, 1.02, 1],
      y: [0, -8, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    excited: {
      scale: [1, 1.1, 1.08],
      y: [0, -20, -10],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    sleep: {
      scale: [1, 0.98, 1],
      y: [0, -4, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  // Eye animation variants
  const eyeVariants = {
    idle: {
      scale: [1, 1, 1],
      transition: { duration: 0.5 },
    },
    excited: {
      scale: [1, 1.2, 1.2],
      transition: { duration: 0.3, repeat: Infinity, repeatDelay: 0.5 },
    },
    sleep: {
      scaleY: [1, 0.05, 0.05],
      transition: { duration: 2, repeat: Infinity, repeatType: 'reverse' },
    },
  }

  // Mouth animation variants
  const mouthVariants = {
    idle: {
      d: 'M 75 110 Q 100 120 125 110',
      transition: { duration: 0.5 },
    },
    excited: {
      d: 'M 70 105 Q 100 130 130 105',
      transition: { duration: 0.3 },
    },
    sleep: {
      d: 'M 75 115 Q 100 108 125 115',
      transition: { duration: 0.5 },
    },
  }

  // Cheek glow animation
  const cheekVariants = {
    idle: {
      opacity: [0.5, 0.8, 0.5],
      r: [12, 15, 12],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
    },
    excited: {
      opacity: [0.7, 1, 1],
      r: [15, 18, 17],
      transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' },
    },
    sleep: {
      opacity: [0.3, 0.5, 0.3],
      r: [10, 12, 10],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
    },
  }

  // Halo animation (only visible when excited)
  const haloVariants = {
    visible: {
      opacity: [0.4, 0.8, 0.4],
      scale: [0.9, 1.2, 0.9],
      rotate: 360,
      transition: { duration: 3, repeat: Infinity, ease: 'linear' },
    },
    hidden: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className={`flex items-center justify-center ${currentSize.container}`}>
      <motion.div
        animate={bodyVariants[mood] || bodyVariants.idle}
        className="relative w-full h-full"
      >
        {/* Glow effect background */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-200 to-transparent blur-2xl"
          animate={{
            opacity: mood === 'excited' ? [0.3, 0.6, 0.3] : [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Rotating halo (visible when excited) */}
        <motion.div
          variants={haloVariants}
          animate={mood === 'excited' ? 'visible' : 'hidden'}
          className="absolute inset-0 rounded-full border-4 border-yellow-300 pointer-events-none"
        />

        {/* Main SVG Cloud */}
        <svg
          viewBox="0 0 200 200"
          className={`${currentSize.svg} drop-shadow-xl`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id="cloudGradient" cx="40%" cy="40%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0.8" />
            </radialGradient>
          </defs>

          {/* Cloud body - Main shape with 3 bumps */}
          <motion.ellipse
            cx="100"
            cy="110"
            rx="65"
            ry="50"
            fill="url(#cloudGradient)"
            stroke="#E0F2FE"
            strokeWidth="2"
            animate={{
              rx: mood === 'excited' ? [65, 70, 65] : [65, 66, 65],
              ry: mood === 'excited' ? [50, 55, 50] : [50, 51, 50],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Left bump */}
          <motion.ellipse
            cx="50"
            cy="85"
            rx="40"
            ry="45"
            fill="url(#cloudGradient)"
            stroke="#E0F2FE"
            strokeWidth="2"
            animate={{
              rx: mood === 'excited' ? [40, 45, 40] : [40, 41, 40],
              ry: mood === 'excited' ? [45, 50, 45] : [45, 46, 45],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          />

          {/* Right bump */}
          <motion.ellipse
            cx="150"
            cy="85"
            rx="40"
            ry="45"
            fill="url(#cloudGradient)"
            stroke="#E0F2FE"
            strokeWidth="2"
            animate={{
              rx: mood === 'excited' ? [40, 45, 40] : [40, 41, 40],
              ry: mood === 'excited' ? [45, 50, 45] : [45, 46, 45],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          />

          {/* Top center bump */}
          <motion.ellipse
            cx="100"
            cy="50"
            rx="35"
            ry="40"
            fill="url(#cloudGradient)"
            stroke="#E0F2FE"
            strokeWidth="2"
            animate={{
              rx: mood === 'excited' ? [35, 40, 35] : [35, 36, 35],
              ry: mood === 'excited' ? [40, 45, 40] : [40, 41, 40],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
          />

          {/* Face Group */}
          <g id="face">
            {/* Left Eye */}
            <motion.circle
              cx="75"
              cy="95"
              r="12"
              fill="#000000"
              animate={eyeVariants[mood] || eyeVariants.idle}
            />

            {/* Left Eye Shine */}
            <motion.circle
              cx="77"
              cy="92"
              r="4"
              fill="#FFFFFF"
              animate={{
                opacity: mood === 'sleep' ? 0 : [0.8, 1, 0.8],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Right Eye */}
            <motion.circle
              cx="125"
              cy="95"
              r="12"
              fill="#000000"
              animate={eyeVariants[mood] || eyeVariants.idle}
            />

            {/* Right Eye Shine */}
            <motion.circle
              cx="127"
              cy="92"
              r="4"
              fill="#FFFFFF"
              animate={{
                opacity: mood === 'sleep' ? 0 : [0.8, 1, 0.8],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Mouth */}
            <motion.path
              d="M 75 110 Q 100 120 125 110"
              stroke="#000000"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              variants={mouthVariants}
              animate={mood}
            />

            {/* Left Cheek */}
            <motion.circle
              cx="45"
              cy="110"
              fill="#FFB6D9"
              variants={cheekVariants}
              animate={mood}
            />

            {/* Right Cheek */}
            <motion.circle
              cx="155"
              cy="110"
              fill="#FFB6D9"
              variants={cheekVariants}
              animate={mood}
            />
          </g>

          {/* Decorative sparkles (idle state) */}
          {mood === 'idle' && (
            <>
              <motion.circle
                cx="35"
                cy="70"
                r="3"
                fill="#FFD700"
                animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              />
              <motion.circle
                cx="165"
                cy="70"
                r="3"
                fill="#FFD700"
                animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
            </>
          )}

          {/* Energy waves (excited state) */}
          {mood === 'excited' && (
            <>
              <motion.circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#FFC107"
                strokeWidth="2"
                animate={{ r: [80, 100, 80], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="#FFC107"
                strokeWidth="2"
                animate={{ r: [70, 90, 70], opacity: [0, 0.8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              />
            </>
          )}
        </svg>
      </motion.div>
    </div>
  )
}
