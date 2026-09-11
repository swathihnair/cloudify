import React from 'react'
import { motion } from 'framer-motion'

/**
 * Floating Background Clouds Component
 * Renders 6 ambient SVG clouds with smooth drifting animation
 * Creates a calm, delightful atmosphere on landing page
 */
export default function FloatingClouds() {
  // Individual cloud animation configuration
  const cloudVariants = [
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
      x: 250,
      y: 120,
      opacity: 0.55,
      delay: 1,
      duration: 10,
      pathX: [-15, 20, -15],
      pathY: [-10, 15, -10],
    },
    {
      id: 3,
      x: 450,
      y: 80,
      opacity: 0.7,
      delay: 2,
      duration: 14,
      pathX: [-25, 30, -25],
      pathY: [-15, 20, -15],
    },
    {
      id: 4,
      x: 150,
      y: 280,
      opacity: 0.6,
      delay: 0.5,
      duration: 11,
      pathX: [-18, 22, -18],
      pathY: [-8, 12, -8],
    },
    {
      id: 5,
      x: 350,
      y: 240,
      opacity: 0.68,
      delay: 1.5,
      duration: 13,
      pathX: [-22, 28, -22],
      pathY: [-14, 19, -14],
    },
    {
      id: 6,
      x: 550,
      y: 180,
      opacity: 0.58,
      delay: 2.5,
      duration: 9,
      pathX: [-16, 24, -16],
      pathY: [-11, 16, -11],
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
