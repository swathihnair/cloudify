import React from 'react'

export default function CloudBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-gradient-to-b from-[#D0E8FF] via-[#E8F3FF] to-[#FFFFFF]">
      
      {/* Back Layer - Slow, large, soft clouds */}
      <div className="absolute inset-0 opacity-40 animate-float-slow">
        {/* Large cloud 1 */}
        <svg 
          className="absolute top-10 -left-20 w-96 text-white fill-current blur-[2px]" 
          viewBox="0 0 100 60"
          preserveAspectRatio="none"
        >
          <path d="M10 40 Q20 20 40 30 Q60 10 80 30 Q90 20 100 40 Z" />
        </svg>
        
        {/* Large cloud 2 */}
        <svg 
          className="absolute top-1/2 -right-20 w-[30rem] text-white fill-current blur-[2px]" 
          viewBox="0 0 100 60"
          preserveAspectRatio="none"
        >
          <path d="M10 40 Q20 20 40 30 Q60 10 80 30 Q90 20 100 40 Z" />
        </svg>
      </div>

      {/* Mid Layer - Medium speed, more visible */}
      <div className="absolute inset-0 opacity-70 animate-float-mid">
        {/* Cloud 3 */}
        <svg 
          className="absolute top-1/3 -left-10 w-80 text-white fill-current drop-shadow-sm" 
          viewBox="0 0 200 100"
          preserveAspectRatio="none"
        >
          <path d="M 20 70 A 30 30 0 0 1 70 40 A 35 35 0 0 1 140 40 A 30 30 0 0 1 180 70 Z" />
        </svg>
        
        {/* Cloud 4 */}
        <svg 
          className="absolute top-2/3 right-1/4 w-72 text-white fill-current drop-shadow-sm" 
          viewBox="0 0 200 100"
          preserveAspectRatio="none"
        >
          <path d="M 20 70 A 30 30 0 0 1 70 40 A 35 35 0 0 1 140 40 A 30 30 0 0 1 180 70 Z" />
        </svg>
      </div>

      {/* Front Accent Layer - Faster, small fluffy highlights */}
      <div className="absolute inset-0 opacity-90 animate-float-fast">
        {/* Cloud 5 */}
        <svg 
          className="absolute bottom-10 right-5 w-64 text-white fill-current drop-shadow-md" 
          viewBox="0 0 200 100"
          preserveAspectRatio="none"
        >
          <path d="M 20 70 A 25 25 0 0 1 60 45 A 30 30 0 0 1 130 45 A 25 25 0 0 1 170 70 Z" />
        </svg>
        
        {/* Cloud 6 */}
        <svg 
          className="absolute top-1/4 left-1/2 w-56 text-white fill-current drop-shadow-md" 
          viewBox="0 0 200 100"
          preserveAspectRatio="none"
        >
          <path d="M 20 70 A 25 25 0 0 1 60 45 A 30 30 0 0 1 130 45 A 25 25 0 0 1 170 70 Z" />
        </svg>
      </div>

    </div>
  )
}
