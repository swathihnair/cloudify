import React from 'react'
import './CloudBackground.css'

export default function CloudBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-sky-300 via-sky-200 to-blue-50 overflow-hidden">
      
      {/* Far Background - Slowest, Most Blurred */}
      <svg
        className="absolute w-full h-full opacity-30 blur-sm animate-float-slow"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="cloudGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0.2 }} />
          </linearGradient>
        </defs>
        
        {/* Cloud 1 - Far left */}
        <g transform="translate(100, 80)">
          <ellipse cx="40" cy="30" rx="45" ry="25" fill="url(#cloudGrad1)" />
          <ellipse cx="10" cy="35" rx="35" ry="22" fill="url(#cloudGrad1)" />
          <ellipse cx="70" cy="35" rx="40" ry="23" fill="url(#cloudGrad1)" />
        </g>
        
        {/* Cloud 2 - Right */}
        <g transform="translate(800, 120)">
          <ellipse cx="40" cy="30" rx="50" ry="28" fill="url(#cloudGrad1)" />
          <ellipse cx="5" cy="38" rx="38" ry="24" fill="url(#cloudGrad1)" />
          <ellipse cx="75" cy="38" rx="45" ry="26" fill="url(#cloudGrad1)" />
        </g>
      </svg>

      {/* Mid Background - Medium Speed, Medium Blur */}
      <svg
        className="absolute w-full h-full opacity-40 blur-xs animate-float-medium"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="cloudGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.7 }} />
            <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0.3 }} />
          </linearGradient>
        </defs>
        
        {/* Cloud 3 */}
        <g transform="translate(300, 150)">
          <ellipse cx="40" cy="30" rx="48" ry="26" fill="url(#cloudGrad2)" />
          <ellipse cx="8" cy="36" rx="36" ry="23" fill="url(#cloudGrad2)" />
          <ellipse cx="72" cy="36" rx="42" ry="25" fill="url(#cloudGrad2)" />
        </g>
        
        {/* Cloud 4 */}
        <g transform="translate(950, 200)">
          <ellipse cx="40" cy="30" rx="52" ry="28" fill="url(#cloudGrad2)" />
          <ellipse cx="5" cy="38" rx="40" ry="25" fill="url(#cloudGrad2)" />
          <ellipse cx="75" cy="38" rx="48" ry="27" fill="url(#cloudGrad2)" />
        </g>
      </svg>

      {/* Foreground - Fastest, Least Blurred */}
      <svg
        className="absolute w-full h-full opacity-50 blur-[0px] animate-float-fast"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="cloudGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0.4 }} />
          </linearGradient>
        </defs>
        
        {/* Cloud 5 */}
        <g transform="translate(150, 280)">
          <ellipse cx="40" cy="30" rx="46" ry="25" fill="url(#cloudGrad3)" />
          <ellipse cx="12" cy="35" rx="34" ry="22" fill="url(#cloudGrad3)" />
          <ellipse cx="68" cy="35" rx="40" ry="24" fill="url(#cloudGrad3)" />
        </g>
        
        {/* Cloud 6 */}
        <g transform="translate(700, 320)">
          <ellipse cx="40" cy="30" rx="50" ry="27" fill="url(#cloudGrad3)" />
          <ellipse cx="8" cy="37" rx="38" ry="24" fill="url(#cloudGrad3)" />
          <ellipse cx="72" cy="37" rx="44" ry="26" fill="url(#cloudGrad3)" />
        </g>
      </svg>

    </div>
  )
}
