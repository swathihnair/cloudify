import React from 'react'
import { motion } from 'framer-motion'

/**
 * Floating Background Clouds Component
 * Renders 6 ambient SVG clouds with smooth drifting animation
 * Creates a calm, delightful atmosphere on landing page
 */
export default function FloatingClouds() {
  // Individual cloud animation configuration - Left, Right, Bottom, and Top placement
  const cloudVariants = [
    // LEFT SIDE (Top section)
    {
      id: 1,
      x: 80,
      y: 60,
      opacity: 0.65,
      delay: 0,
      duration: 12,
      pathX: [-20, 25, -20],
      pathY: [-12, 18, -12],
    },
    {
      id: 2,
      x: 120,
      y: 180,
      opacity: 0.55,
      delay: 1,
      duration: 10,
      pathX: [-15, 20, -15],
      pathY: [-10, 15, -10],
    },
    {
      id: 3,
      x: 90,
      y: 320,
      opacity: 0.7,
      delay: 2,
      duration: 14,
      pathX: [-25, 30, -25],
      pathY: [-15, 20, -15],
    },
    {
      id: 4,
      x: 110,
      y: 480,
      opacity: 0.6,
      delay: 0.5,
      duration: 11,
      pathX: [-18, 22, -18],
      pathY: [-8, 12, -8],
    },
    // LEFT SIDE (Bottom section)
    {
      id: 5,
      x: 100,
      y: 680,
      opacity: 0.68,
      delay: 1.5,
      duration: 13,
      pathX: [-22, 28, -22],
      pathY: [-14, 19, -14],
    },
    {
      id: 6,
      x: 130,
      y: 740,
      opacity: 0.58,
      delay: 2.5,
      duration: 9,
      pathX: [-16, 24, -16],
      pathY: [-11, 16, -11],
    },
    
    // CENTER-LEFT TRANSITION
    {
      id: 7,
      x: 250,
      y: 120,
      opacity: 0.62,
      delay: 1.2,
      duration: 11.5,
      pathX: [-20, 25, -20],
      pathY: [-10, 16, -10],
    },
    {
      id: 8,
      x: 280,
      y: 400,
      opacity: 0.64,
      delay: 0.8,
      duration: 13,
      pathX: [-15, 20, -15],
      pathY: [-14, 18, -14],
    },
    {
      id: 9,
      x: 260,
      y: 700,
      opacity: 0.56,
      delay: 2.1,
      duration: 10.5,
      pathX: [-22, 28, -22],
      pathY: [-12, 14, -12],
    },
    
    // RIGHT SIDE (Top section)
    {
      id: 10,
      x: 1080,
      y: 80,
      opacity: 0.6,
      delay: 1.8,
      duration: 12,
      pathX: [20, -25, 20],
      pathY: [-9, 13, -9],
    },
    {
      id: 11,
      x: 1120,
      y: 200,
      opacity: 0.67,
      delay: 2.3,
      duration: 11,
      pathX: [20, -25, 20],
      pathY: [-10, 15, -10],
    },
    {
      id: 12,
      x: 1100,
      y: 360,
      opacity: 0.54,
      delay: 0.9,
      duration: 13.5,
      pathX: [16, -22, 16],
      pathY: [-8, 12, -8],
    },
    {
      id: 13,
      x: 1090,
      y: 520,
      opacity: 0.61,
      delay: 1.4,
      duration: 11,
      pathX: [18, -24, 18],
      pathY: [-11, 14, -11],
    },
    
    // RIGHT SIDE (Bottom section)
    {
      id: 14,
      x: 1110,
      y: 700,
      opacity: 0.59,
      delay: 2.6,
      duration: 12,
      pathX: [22, -28, 22],
      pathY: [-9, 15, -9],
    },
    {
      id: 15,
      x: 1080,
      y: 750,
      opacity: 0.65,
      delay: 0.7,
      duration: 10.5,
      pathX: [19, -26, 19],
      pathY: [-10, 13, -10],
    },
    
    // CENTER-RIGHT TRANSITION
    {
      id: 16,
      x: 900,
      y: 140,
      opacity: 0.62,
      delay: 1.1,
      duration: 12,
      pathX: [20, -25, 20],
      pathY: [-10, 16, -10],
    },
    {
      id: 17,
      x: 920,
      y: 420,
      opacity: 0.64,
      delay: 1.9,
      duration: 11,
      pathX: [15, -20, 15],
      pathY: [-14, 17, -14],
    },
    {
      id: 18,
      x: 910,
      y: 720,
      opacity: 0.56,
      delay: 2.2,
      duration: 13,
      pathX: [18, -23, 18],
      pathY: [-12, 15, -12],
    },
  ]

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradient for floating clouds */}
          <radialGradient id="floatingCloudGrad" cx="35%" cy="35%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="60%" stopColor="#F8FCFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#E8F4FF" stopOpacity="0.7" />
          </radialGradient>

          {/* Soft filter for cloud softness */}
          <filter id="cloudSoftness">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* Render each floating cloud */}
        {cloudVariants.map((cloud) => (
          <motion.g
            key={cloud.id}
            animate={{
              x: cloud.pathX,
              y: cloud.pathY,
            }}
            transition={{
              duration: cloud.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: cloud.delay,
            }}
            style={{
              transformOrigin: `${cloud.x}px ${cloud.y}px`,
            }}
          >
            {/* Main cloud body - overlapping circles */}
            <g opacity={cloud.opacity} filter="url(#cloudSoftness)">
              {/* Center puff */}
              <ellipse
                cx={cloud.x}
                cy={cloud.y}
                rx="55"
                ry="42"
                fill="url(#floatingCloudGrad)"
              />
              {/* Left puff */}
              <ellipse
                cx={cloud.x - 45}
                cy={cloud.y + 5}
                rx="42"
                ry="38"
                fill="url(#floatingCloudGrad)"
              />
              {/* Right puff */}
              <ellipse
                cx={cloud.x + 45}
                cy={cloud.y + 5}
                rx="42"
                ry="38"
                fill="url(#floatingCloudGrad)"
              />
              {/* Top puff */}
              <ellipse
                cx={cloud.x}
                cy={cloud.y - 20}
                rx="38"
                ry="35"
                fill="url(#floatingCloudGrad)"
              />
            </g>
          </motion.g>
        ))}
      </svg>
    </div>
  )
}
