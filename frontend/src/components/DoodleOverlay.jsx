import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Doodle SVG patterns for different cloud categories
const DOODLE_LIBRARY = {
  dinosaur: (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {/* Head */}
        <circle cx="80" cy="80" r="30" className="text-orange-400" />
        {/* Snout */}
        <ellipse cx="110" cy="75" rx="20" ry="15" className="text-orange-400" />
        {/* Eye */}
        <circle cx="85" cy="70" r="5" className="text-orange-500" fill="currentColor" />
        {/* Horn */}
        <path d="M 75 55 L 70 30 L 75 45" className="text-orange-400" />
        {/* Neck */}
        <path d="M 95 105 Q 100 120 105 140" className="text-orange-400" strokeWidth="4" />
        {/* Body */}
        <ellipse cx="110" cy="150" rx="35" ry="30" className="text-orange-400" />
        {/* Tail */}
        <path d="M 145 145 Q 170 140 180 120" className="text-orange-400" strokeWidth="3" />
        {/* Legs */}
        <line x1="95" y1="170" x2="95" y2="195" className="text-orange-400" strokeWidth="3" />
        <line x1="125" y1="170" x2="125" y2="195" className="text-orange-400" strokeWidth="3" />
      </g>
    </svg>
  ),
  dragon: (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Head */}
        <path d="M 60 80 L 90 60 L 100 90 Z" className="text-red-500" fill="currentColor" opacity="0.7" />
        {/* Horns */}
        <line x1="70" y1="55" x2="65" y2="35" className="text-red-600" />
        <line x1="85" y1="50" x2="95" y2="30" className="text-red-600" />
        {/* Eye */}
        <circle cx="80" cy="75" r="4" className="text-red-600" fill="currentColor" />
        {/* Wings */}
        <path d="M 75 90 Q 50 100 40 70" className="text-red-400" strokeWidth="2" />
        <path d="M 95 90 Q 120 100 140 70" className="text-red-400" strokeWidth="2" />
        {/* Body */}
        <path d="M 80 95 Q 85 130 75 160" className="text-red-500" strokeWidth="3" />
        {/* Tail */}
        <path d="M 75 160 Q 50 170 40 180" className="text-red-500" strokeWidth="2.5" />
        {/* Spikes */}
        <line x1="80" y1="110" x2="85" y2="100" className="text-red-600" />
        <line x1="78" y1="130" x2="83" y2="120" className="text-red-600" />
      </g>
    </svg>
  ),
  bunny: (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <g fill="currentColor" className="text-pink-400">
        {/* Head */}
        <circle cx="100" cy="110" r="35" />
        {/* Ears */}
        <ellipse cx="75" cy="50" rx="12" ry="40" />
        <ellipse cx="125" cy="50" rx="12" ry="40" />
        {/* Ear inner */}
        <ellipse cx="75" cy="60" rx="6" ry="25" className="text-pink-200" />
        <ellipse cx="125" cy="60" rx="6" ry="25" className="text-pink-200" />
        {/* Eyes */}
        <circle cx="90" cy="100" r="5" className="text-gray-800" />
        <circle cx="110" cy="100" r="5" className="text-gray-800" />
        {/* Nose */}
        <circle cx="100" cy="115" r="4" className="text-pink-600" />
        {/* Whiskers */}
        <line x1="70" y1="110" x2="50" y2="108" stroke="currentColor" strokeWidth="1.5" className="text-pink-600" />
        <line x1="130" y1="110" x2="150" y2="108" stroke="currentColor" strokeWidth="1.5" className="text-pink-600" />
        {/* Body */}
        <ellipse cx="100" cy="160" rx="25" ry="30" />
        {/* Tail pom-pom */}
        <circle cx="100" cy="192" r="8" className="text-white" />
      </g>
    </svg>
  ),
  whale: (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-blue-600">
        {/* Body */}
        <ellipse cx="100" cy="90" rx="50" ry="30" fill="currentColor" opacity="0.3" />
        {/* Head */}
        <circle cx="60" cy="85" r="25" />
        {/* Eye */}
        <circle cx="50" cy="75" r="4" fill="currentColor" />
        {/* Water spout */}
        <path d="M 95 50 Q 100 40 95 25" strokeWidth="2" />
        <path d="M 100 45 Q 105 35 100 20" strokeWidth="2" />
        {/* Fin */}
        <path d="M 120 70 Q 140 65 150 45" strokeWidth="3" />
        {/* Tail flukes */}
        <path d="M 140 95 L 170 70 L 150 105 Z" fill="currentColor" opacity="0.4" />
        <path d="M 140 95 L 170 120 L 150 105 Z" fill="currentColor" opacity="0.4" />
      </g>
    </svg>
  ),
  unicorn: (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <g fill="currentColor" className="text-purple-400">
        {/* Head */}
        <circle cx="100" cy="100" r="30" />
        {/* Snout */}
        <ellipse cx="120" cy="105" rx="15" ry="12" />
        {/* Horn */}
        <path d="M 100 65 L 100 35 L 95 60 M 100 65 L 105 60" className="text-yellow-400" fill="currentColor" />
        {/* Mane */}
        <path d="M 75 80 Q 70 70 75 55" stroke="currentColor" strokeWidth="3" fill="none" className="text-purple-500" />
        <path d="M 80 75 Q 75 65 80 50" stroke="currentColor" strokeWidth="3" fill="none" className="text-purple-500" />
        {/* Eyes */}
        <circle cx="90" cy="95" r="4" className="text-gray-800" />
        <circle cx="110" cy="95" r="4" className="text-gray-800" />
        {/* Nose */}
        <circle cx="122" cy="105" r="3" className="text-gray-800" />
        {/* Body */}
        <ellipse cx="100" cy="155" rx="28" ry="25" />
        {/* Tail */}
        <path d="M 125 145 Q 150 150 160 130" stroke="currentColor" strokeWidth="3" fill="none" className="text-purple-500" />
      </g>
    </svg>
  )
}

export default function DoodleOverlay({ imageRef, region, category, isVisible = true }) {
  const [overlayPosition, setOverlayPosition] = useState({ top: 0, left: 0, width: 0, height: 0 })

  useEffect(() => {
    if (!imageRef?.current || !region) return

    const img = imageRef.current
    const rect = img.getBoundingClientRect()

    // Convert percentage-based region coordinates to pixel coordinates
    const width = rect.width
    const height = rect.height

    const overlayWidth = (region.width / 100) * width
    const overlayHeight = (region.height / 100) * height
    const top = (region.y / 100) * height
    const left = (region.x / 100) * width

    setOverlayPosition({
      top: Math.max(0, top),
      left: Math.max(0, left),
      width: Math.min(overlayWidth, width - left),
      height: Math.min(overlayHeight, height - top)
    })
  }, [imageRef, region])

  if (!isVisible || !overlayPosition.width) {
    return null
  }

  const doodle = DOODLE_LIBRARY[category] || DOODLE_LIBRARY.bunny

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="absolute pointer-events-none"
      style={{
        top: `${overlayPosition.top}px`,
        left: `${overlayPosition.left}px`,
        width: `${overlayPosition.width}px`,
        height: `${overlayPosition.height}px`,
        padding: '8px'
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        className="w-full h-full opacity-80 hover:opacity-100 transition-opacity"
      >
        {doodle}
      </motion.div>

      {/* Glow effect */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 border-2 border-purple-400 rounded-full pointer-events-none"
      />
    </motion.div>
  )
}
